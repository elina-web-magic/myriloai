const mockEvaluationFixture = {
	runId: 'mock-eval-001',
	scenario: 'Static registry manual evaluation',
	summary:
		'The rollout risks cluster around stale flags, unclear ownership, and missing cleanup checkpoints.',
	topRisks: ['stale flag cleanup', 'inconsistent naming', 'missing ownership boundaries'],
	mitigations: ['assign explicit owners', 'set expiry dates', 'review flags in release checklists'],
	score: 34,
} as const satisfies {
	runId: string;
	scenario: string;
	summary: string;
	topRisks: readonly string[];
	mitigations: readonly string[];
	score: number;
};

export { mockEvaluationFixture };
