import { evaluationRequestSchema, standardizedErrorSchema } from '@/lib/contracts/evaluation';
import { getMockEvaluationSubmitState, isMockModeEnabled } from '@/lib/dev/static-registry';
import { ERRORS } from '@/lib/errors';

export async function POST(request: Request) {
	const payload: unknown = await request.json();
	const requestBody = evaluationRequestSchema.safeParse(payload);

	if (!requestBody.success) {
		return Response.json(ERRORS.INVALID_EVALUATION_REQUEST(requestBody.error.issues), {
			status: 400,
		});
	}

	if (!isMockModeEnabled()) {
		return Response.json(ERRORS.LIVE_EVALUATION_NOT_IMPLEMENTED(), { status: 501 });
	}

	try {
		const mockState = getMockEvaluationSubmitState(requestBody.data);

		return Response.json(mockState);
	} catch (error) {
		const standardizedError = standardizedErrorSchema.safeParse(error);

		return Response.json(
			standardizedError.success ? standardizedError.data : ERRORS.MOCK_SCENARIO_EXECUTION_FAILED(),
			{ status: 422 }
		);
	}
}
