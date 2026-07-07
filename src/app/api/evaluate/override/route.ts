import { NextResponse } from 'next/server';
import { overrideSubmitSchema } from '@/lib/contracts/evaluation';
import { ERRORS } from '@/lib/errors';
import { Logger } from '@/lib/logger/logger';
import { ConsoleSink } from '@/lib/logger/sinks';

const logger = new Logger({
	scope: 'api:override',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
});

export async function POST(req: Request) {
	const requestId = crypto.randomUUID();
	const log = logger.child({ requestId });

	try {
		log.debug('Received manual score override request');

		let body: unknown;
		try {
			body = await req.json();
		} catch {
			const err = ERRORS.INVALID_EVALUATION_REQUEST();
			log.error(err.message, undefined, err);
			return NextResponse.json({ error: err }, { status: 400 });
		}

		const parsed = overrideSubmitSchema.safeParse(body);
		if (!parsed.success) {
			const err = ERRORS.INVALID_EVALUATION_REQUEST(parsed.error.issues);
			log.warn(err.message, { error: err });
			return NextResponse.json({ error: err }, { status: 400 });
		}

		const data = parsed.data;

		// Emit log trace for the override
		log.info('Human override applied', {
			context: {
				evaluationResultId: data.evaluationResultId,
				originalScore: data.originalScore,
				overriddenScore: data.overriddenScore,
				comment: data.comment,
				overriddenAt: new Date().toISOString(),
			},
		});

		// For MVP, we do not persist to the DB, just return success
		return NextResponse.json({ success: true, logged: true });
	} catch {
		const err = ERRORS.INTERNAL_ERROR('Failed to process override request');
		log.error(err.message, undefined, err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
