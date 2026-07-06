import { describe, expect, it } from 'vitest';
import { evaluationParsedResponseSchema, evaluationRequestSchema } from './evaluation';

describe('Evaluation Contracts', () => {
	it('validates a correct evaluation request', () => {
		const validRequest = {
			runLabel: 'Test Run',
			model: 'Claude Sonnet',
			dataset: 'Manual session',
			projectInstructions: 'Keep it concise.',
			prompt: 'Summarize this text.',
			mockScenarioId: 'success_perfect',
		};

		const result = evaluationRequestSchema.safeParse(validRequest);
		expect(result.success).toBe(true);
	});

	it('rejects an evaluation request with an empty prompt', () => {
		const invalidRequest = {
			runLabel: 'Test Run',
			model: 'Claude Sonnet',
			dataset: 'Manual session',
			projectInstructions: 'Keep it concise.',
			prompt: '   ',
		};

		const result = evaluationRequestSchema.safeParse(invalidRequest);
		expect(result.success).toBe(false);
	});

	it('validates a correct parsed response', () => {
		const validResponse = {
			summary: 'Good summary',
			topRisks: ['Risk 1'],
			mitigations: ['Mitigation 1'],
			score: 35,
		};

		const result = evaluationParsedResponseSchema.safeParse(validResponse);
		expect(result.success).toBe(true);
	});

	it('rejects an invalid score in parsed response', () => {
		const invalidResponse = {
			summary: 'Good summary',
			topRisks: ['Risk 1'],
			mitigations: ['Mitigation 1'],
			score: 45, // Max is 40
		};

		const result = evaluationParsedResponseSchema.safeParse(invalidResponse);
		expect(result.success).toBe(false);
	});
});
