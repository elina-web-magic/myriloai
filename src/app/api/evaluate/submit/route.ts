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

	try {
		const mockState = getMockEvaluationSubmitState(requestBody.data);

		return Response.json(mockState);
	} catch (error) {
		const standardizedError = standardizedErrorSchema.safeParse(error);

		return Response.json(
			standardizedError.success
				? standardizedError.data
				: standardizedErrorSchema.parse({
						code: 'MOCK_SCENARIO_EXECUTION_FAILED',
						message: 'Mock scenario execution failed unexpectedly.',
						severity: 'error',
					}),
			{ status: 422 }
		);
	}
}
