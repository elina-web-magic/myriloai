import fallbackData from '@/data/output.json';
import {
	dashboardResultSchema,
	evaluationParsedResponseSchema,
	evaluationResponseSchema,
	standardizedErrorSchema,
} from '@/lib/contracts/evaluation';
import {
	deferredMockScenarios,
	mockErrorFixtures,
	mockSuccessFixtures,
} from '@/lib/dev/fixtures/mock-evaluation';
import type {
	DashboardResult,
	EvaluationRequest,
	EvaluationResponse,
	MockScenarioId,
} from '@/types';

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

const getSelectedMockScenarioId = (request: EvaluationRequest): MockScenarioId => {
	return request.mockScenarioId ?? 'success_perfect';
};

const getDeferredMockScenarios = () => deferredMockScenarios;

const getMockEvaluationSubmitState = (request: EvaluationRequest): MockEvaluationSubmitState => {
	logMockRegistryResponse('evaluate_submit');

	const selectedScenarioId = getSelectedMockScenarioId(request);
	const normalizedPrompt = request.prompt.trim();
	const normalizedInstructions = request.projectInstructions.trim();

	if (selectedScenarioId === 'error_missing_context') {
		throw standardizedErrorSchema.parse({
			...mockErrorFixtures.error_missing_context,
			details: {
				...mockErrorFixtures.error_missing_context.details,
				runLabel: request.runLabel,
			},
		});
	}

	if (selectedScenarioId === 'error_malformed_json') {
		const malformedRawResponse = mockErrorFixtures.error_malformed_json.rawResponse ?? '';

		try {
			parseMockEvaluationResponse(malformedRawResponse);
		} catch {
			throw standardizedErrorSchema.parse({
				...mockErrorFixtures.error_malformed_json,
				details: {
					...mockErrorFixtures.error_malformed_json.details,
					rawPreview: malformedRawResponse,
				},
			});
		}
	}

	const selectedFixture = mockSuccessFixtures.success_perfect;
	const rawResponse = JSON.stringify({
		summary:
			normalizedPrompt.length > 0
				? `${selectedFixture.summary} Prompt focus: ${normalizedPrompt.slice(0, 80)}`
				: selectedFixture.summary,
		topRisks: selectedFixture.topRisks,
		mitigations:
			normalizedInstructions.length > 0
				? [...selectedFixture.mitigations, 'keep evaluator instructions concise']
				: selectedFixture.mitigations,
		score: selectedFixture.score,
	});

	return {
		response: evaluationResponseSchema.parse({
			runId: selectedFixture.runId,
			scenario: selectedFixture.scenario,
			rawResponse,
			parsedResponse: parseMockEvaluationResponse(rawResponse),
		}),
		source: 'mock',
	};
};

export {
	getDashboardMockState,
	getDeferredMockScenarios,
	getMockEvaluationSubmitState,
	isMockModeEnabled,
};
