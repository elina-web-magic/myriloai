import type { z } from 'zod';
import type { StandardizedError } from '@/types';

type InputTooLargeContext = {
	field: string;
	actual: Record<string, number>;
	limit: Record<string, number>;
	reason: string;
};

type RateLimitContext = {
	reason: string;
	limit: number;
	retryAfterSeconds: number;
};

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

	INPUT_TOO_LARGE: (ctx: InputTooLargeContext): StandardizedError => ({
		code: 'INPUT_TOO_LARGE',
		message: `Input too large on field "${ctx.field}": ${ctx.reason}.`,
		field: ctx.field,
		severity: 'error',
		details: { actual: ctx.actual, limit: ctx.limit },
	}),

	RATE_LIMIT_EXCEEDED: (ctx: RateLimitContext): StandardizedError => ({
		code: 'RATE_LIMIT_EXCEEDED',
		message: `Rate limit exceeded: ${ctx.reason}. Retry after ${ctx.retryAfterSeconds}s.`,
		severity: 'error',
		details: { limit: ctx.limit, retryAfterSeconds: ctx.retryAfterSeconds },
	}),
} as const;
