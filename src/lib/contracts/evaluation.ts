import { z } from 'zod';

const errorSeveritySchema = z.enum(['info', 'warning', 'error']);

const standardizedErrorSchema = z.object({
	code: z.string().min(1),
	message: z.string().min(1),
	field: z.string().min(1).optional(),
	severity: errorSeveritySchema,
	details: z.record(z.string(), z.unknown()).optional(),
});

const evaluationRequestSchema = z.object({
	runLabel: z.string().trim().min(1),
	model: z.string().trim().min(1),
	dataset: z.string().trim().min(1),
	projectInstructions: z.string().trim(),
	prompt: z.string().trim().min(1),
});

const evaluationParsedResponseSchema = z.object({
	summary: z.string().trim().min(1),
	topRisks: z.array(z.string().trim().min(1)),
	mitigations: z.array(z.string().trim().min(1)),
	score: z.number().finite().min(0).max(40),
});

const evaluationResponseSchema = z.object({
	runId: z.string().trim().min(1),
	scenario: z.string().trim().min(1),
	rawResponse: z.string().min(1),
	parsedResponse: evaluationParsedResponseSchema,
});

const dashboardResultSchema = z.object({
	output: z.string().min(1),
	test_case: z.object({
		scenario: z.string().trim().min(1),
		prompt_inputs: z.record(z.string(), z.string()),
		solution_criteria: z.array(z.string().trim().min(1)),
		task_description: z.string().trim().min(1).optional(),
	}),
	total_score: z.number().finite().min(0).max(40),
	scores: z.record(z.string(), z.number().finite()),
	reasoning: z.string(),
	strengths: z.array(z.string()),
	weaknesses: z.array(z.string()),
});

const evaluateSubmitSuccessSchema = z.object({
	response: evaluationResponseSchema,
	source: z.literal('mock'),
});

export {
	dashboardResultSchema,
	evaluateSubmitSuccessSchema,
	evaluationParsedResponseSchema,
	evaluationRequestSchema,
	evaluationResponseSchema,
	standardizedErrorSchema,
};
