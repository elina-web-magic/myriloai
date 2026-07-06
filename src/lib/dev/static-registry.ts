import fallbackData from '@/data/output.json';
import {
	dashboardResultSchema,
	evaluationParsedResponseSchema,
	evaluationResponseSchema,
} from '@/lib/contracts/evaluation';
import { mockEvaluationFixture } from '@/lib/dev/fixtures/mock-evaluation';
import type { DashboardResult, EvaluationRequest, EvaluationResponse } from '@/types';

type DashboardMockState = {
	reportData: DashboardResult[];
	source: 'demo';
};

type MockEvaluationSubmitState = {
	response: EvaluationResponse;
	source: 'mock';
};

const logMockRegistryResponse = (registryKey: 'dashboard_read' | 'evaluate_submit'): void => {
	// biome-ignore lint/suspicious/noConsole: explicit offline observability is required for mock registry flows
	console.info(`[Mock Registry] Response served for ${registryKey}`);
};

// Explicit opt-in flag instead of relying on NODE_ENV alone: a misconfigured
// deploy target or test runner that leaves NODE_ENV=development set on a real
// deployment must not silently serve demo data as if it were live.
const ALLOW_MOCK_DATA = process.env.ALLOW_MOCK_DATA === 'true';

if (ALLOW_MOCK_DATA && process.env.NODE_ENV === 'production') {
	throw new Error('ALLOW_MOCK_DATA must never be enabled when NODE_ENV=production');
}

const isMockModeEnabled = (): boolean => ALLOW_MOCK_DATA;

const getDashboardMockState = (): DashboardMockState => {
	logMockRegistryResponse('dashboard_read');

	return {
		reportData: dashboardResultSchema.array().parse(fallbackData),
		source: 'demo',
	};
};

const parseMockEvaluationResponse = (rawResponse: string) => {
	const parsedValue: unknown = JSON.parse(rawResponse);

	return evaluationParsedResponseSchema.parse(parsedValue);
};

const getMockEvaluationSubmitState = (request: EvaluationRequest): MockEvaluationSubmitState => {
	logMockRegistryResponse('evaluate_submit');

	const normalizedPrompt = request.prompt.trim();
	const normalizedInstructions = request.projectInstructions.trim();

	const rawResponse = JSON.stringify({
		summary:
			normalizedPrompt.length > 0
				? `${mockEvaluationFixture.summary} Prompt focus: ${normalizedPrompt.slice(0, 80)}`
				: mockEvaluationFixture.summary,
		topRisks: mockEvaluationFixture.topRisks,
		mitigations:
			normalizedInstructions.length > 0
				? [...mockEvaluationFixture.mitigations, 'keep evaluator instructions concise']
				: mockEvaluationFixture.mitigations,
		score: mockEvaluationFixture.score,
	});

	return {
		response: evaluationResponseSchema.parse({
			runId: mockEvaluationFixture.runId,
			scenario: mockEvaluationFixture.scenario,
			rawResponse,
			parsedResponse: parseMockEvaluationResponse(rawResponse),
		}),
		source: 'mock',
	};
};

export { getDashboardMockState, getMockEvaluationSubmitState, isMockModeEnabled };
