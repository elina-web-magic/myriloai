import type { z } from 'zod';

import type {
	dashboardResultSchema,
	evaluationRequestSchema,
	evaluationResponseSchema,
	standardizedErrorSchema,
} from '@/lib/contracts/evaluation';

export type DashboardResult = z.infer<typeof dashboardResultSchema>;
export type EvaluationRequest = z.infer<typeof evaluationRequestSchema>;
export type EvaluationResponse = z.infer<typeof evaluationResponseSchema>;
export type StandardizedError = z.infer<typeof standardizedErrorSchema>;
