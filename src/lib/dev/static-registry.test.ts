import { describe, expect, it } from 'vitest';
import type { EvaluationRequest } from '@/types';
import { getMockEvaluationSubmitState } from './static-registry';

describe('Static Registry Mock Submit', () => {
	const baseRequest: EvaluationRequest = {
		runLabel: 'Test Run',
		model: 'Claude Sonnet',
		dataset: 'Manual session',
		projectInstructions: 'Instructions',
		prompt: 'Test prompt',
	};

	it('returns a perfect success response when success_perfect is selected', () => {
		const request: EvaluationRequest = {
			...baseRequest,
			mockScenarioId: 'success_perfect',
		};

		const result = getMockEvaluationSubmitState(request);
		expect(result.source).toBe('mock');
		expect(result.response.scenario).toBe('Static registry manual evaluation');
		expect(result.response.parsedResponse.score).toBeGreaterThan(0);
	});

	it('throws a standardized error when error_missing_context is selected', () => {
		const request: EvaluationRequest = {
			...baseRequest,
			mockScenarioId: 'error_missing_context',
		};

		expect(() => getMockEvaluationSubmitState(request)).toThrowError();
		try {
			getMockEvaluationSubmitState(request);
		} catch (error: unknown) {
			const err = error as { code: string };
			expect(err.code).toBe('MOCK_MISSING_CONTEXT');
		}
	});

	it('throws a standardized error when error_malformed_json is selected', () => {
		const request: EvaluationRequest = {
			...baseRequest,
			mockScenarioId: 'error_malformed_json',
		};

		expect(() => getMockEvaluationSubmitState(request)).toThrowError();
		try {
			getMockEvaluationSubmitState(request);
		} catch (error: unknown) {
			const err = error as { code: string };
			expect(err.code).toBe('MOCK_MALFORMED_JSON');
		}
	});
});
