import type { z } from 'zod';
import type { StandardizedError } from '@/types';

export const ERRORS = {
	MOCK_SCENARIO_EXECUTION_FAILED: (): StandardizedError => ({
		code: 'MOCK_SCENARIO_EXECUTION_FAILED',
		message: 'Mock scenario execution failed unexpectedly.',
		severity: 'error',
	}),

	EMPTY_PROMPT: (): StandardizedError => ({
		code: 'EMPTY_PROMPT',
		message: 'Prompt is required before an evaluation can start.',
		field: 'prompt',
		severity: 'error',
	}),

	UNEXPECTED_EVALUATION_ERROR: (message?: string): StandardizedError => ({
		code: 'UNEXPECTED_EVALUATION_ERROR',
		message: message ?? 'Evaluation submit failed unexpectedly.',
		severity: 'error',
	}),

	INVALID_EVALUATION_REQUEST: (issues?: z.ZodIssue[]): StandardizedError => ({
		code: 'INVALID_EVALUATION_REQUEST',
		message: 'Invalid evaluation request payload.',
		severity: 'error',
		...(issues && { details: { issues } }),
	}),

	LIVE_EVALUATION_NOT_IMPLEMENTED: (): StandardizedError => ({
		code: 'LIVE_EVALUATION_NOT_IMPLEMENTED',
		message: 'Live evaluation submit is not implemented yet.',
		severity: 'warning',
	}),

	INTERNAL_ERROR: (message: string): StandardizedError => ({
		code: 'INTERNAL_ERROR',
		message,
		severity: 'error',
	}),
} as const;
