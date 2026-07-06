import { evaluationRequestSchema, standardizedErrorSchema } from '@/lib/contracts/evaluation';
import { getMockEvaluationSubmitState, isMockModeEnabled } from '@/lib/dev/static-registry';

export async function POST(request: Request) {
	const payload: unknown = await request.json();
	const requestBody = evaluationRequestSchema.safeParse(payload);

	if (!requestBody.success) {
		return Response.json(
			standardizedErrorSchema.parse({
				code: 'INVALID_EVALUATION_REQUEST',
				message: 'Invalid evaluation request payload.',
				severity: 'error',
				details: {
					issues: requestBody.error.issues,
				},
			}),
			{ status: 400 }
		);
	}

	if (!isMockModeEnabled()) {
		return Response.json(
			standardizedErrorSchema.parse({
				code: 'LIVE_EVALUATION_NOT_IMPLEMENTED',
				message: 'Live evaluation submit is not implemented yet.',
				severity: 'warning',
			}),
			{ status: 501 }
		);
	}

	const mockState = getMockEvaluationSubmitState(requestBody.data);

	return Response.json(mockState);
}
