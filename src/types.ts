import type { z } from 'zod';

import type {
	dashboardResultSchema,
	evaluationRequestSchema,
	evaluationResponseSchema,
	mockScenarioIdSchema,
	standardizedErrorSchema,
} from '@/lib/contracts/evaluation';

export type DashboardResult = z.infer<typeof dashboardResultSchema>;
export type EvaluationRequest = z.infer<typeof evaluationRequestSchema>;
export type EvaluationResponse = z.infer<typeof evaluationResponseSchema>;
export type MockScenarioId = z.infer<typeof mockScenarioIdSchema>;
export type StandardizedError = z.infer<typeof standardizedErrorSchema>;

// ───────────────────────────────────────────────
// HALLUCINATION FLAG TAXONOMY (6.6)
// ───────────────────────────────────────────────

const FAILURE_LABELS = [
	'HALLUCINATION',
	'IRRELEVANCE',
	'REFUSAL',
	'FORMATTING_DRIFT',
	'GROUNDING_FAILURE',
	'SCORE_WITHOUT_EVIDENCE',
	'EVALUATOR_DISAGREEMENT',
] as const;

export type FailureLabel = (typeof FAILURE_LABELS)[number];
