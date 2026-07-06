import type { MockScenarioId } from '@/types';

type MockSuccessFixture = {
	runId: string;
	scenario: string;
	summary: string;
	topRisks: readonly string[];
	mitigations: readonly string[];
	score: number;
};

type MockErrorFixture = {
	code: string;
	message: string;
	field?: string;
	severity: 'warning' | 'error';
	details?: Record<string, unknown>;
	rawResponse?: string;
};

type DeferredMockScenario = {
	id: 'success_partial' | 'error_provider_timeout' | 'error_prompt_injection';
	deferUntil: 'post-MVP';
	reason: string;
};

const mockSuccessFixtures: Record<
	Extract<MockScenarioId, 'success_perfect'>,
	MockSuccessFixture
> = {
	success_perfect: {
		runId: 'mock-eval-001',
		scenario: 'Static registry manual evaluation',
		summary:
			'The rollout risks cluster around stale flags, unclear ownership, and missing cleanup checkpoints.',
		topRisks: ['stale flag cleanup', 'inconsistent naming', 'missing ownership boundaries'],
		mitigations: [
			'assign explicit owners',
			'set expiry dates',
			'review flags in release checklists',
		],
		score: 34,
	},
};

const mockErrorFixtures: Record<
	Extract<MockScenarioId, 'error_malformed_json' | 'error_missing_context'>,
	MockErrorFixture
> = {
	error_malformed_json: {
		code: 'MOCK_MALFORMED_JSON',
		message: 'Mock model output could not be parsed as valid JSON.',
		severity: 'error',
		details: {
			scenario: 'error_malformed_json',
			expectation: 'response parsing should fail cleanly',
		},
		rawResponse: '{"summary":"Broken payload","topRisks":["stale flags"]',
	},
	error_missing_context: {
		code: 'MOCK_MISSING_CONTEXT',
		message: 'Mock evaluation is missing required context for scoring.',
		field: 'projectInstructions',
		severity: 'warning',
		details: {
			scenario: 'error_missing_context',
			missingKeys: ['rubric', 'evaluation_context'],
		},
	},
};

const _deferredMockScenarios: readonly DeferredMockScenario[] = [
	{
		id: 'success_partial',
		deferUntil: 'post-MVP',
		reason: 'MVP only needs one stable happy path before modeling partial-quality outcomes.',
	},
	{
		id: 'error_provider_timeout',
		deferUntil: 'post-MVP',
		reason: 'Provider/network simulation belongs after the core offline contract loop is stable.',
	},
	{
		id: 'error_prompt_injection',
		deferUntil: 'post-MVP',
		reason: 'Prompt-injection resilience needs the later trust-boundary hardening pass.',
	},
] as const;

export { mockErrorFixtures, mockSuccessFixtures };
