import { evaluateSubmitSuccessSchema, standardizedErrorSchema } from '@/lib/contracts/evaluation';
import { ERRORS } from '@/lib/errors';
import { sanitizeText } from '@/lib/guardrails/output-rails';
import { type RunState, runStateMeta } from '@/lib/store/prompt-store';
import type { MockScenarioId, StandardizedError } from '@/types';

export const getErrorMessage = (errorValue: StandardizedError | null): string | null => {
	if (errorValue === null) {
		return null;
	}

	return errorValue.field ? `${errorValue.field}: ${errorValue.message}` : errorValue.message;
};

export const getErrorDetails = (errorValue: StandardizedError | null): string[] => {
	if (errorValue?.details === undefined) {
		return [];
	}

	return Object.entries(errorValue.details).flatMap(([key, value]) => {
		if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
			return [`${key}: ${String(value)}`];
		}

		if (Array.isArray(value)) {
			return [`${key}: ${value.length} item(s)`];
		}

		if (value !== null && typeof value === 'object') {
			return [`${key}: object payload`];
		}

		return [];
	});
};

export const getSeverityBadgeVariant = (
	severity: StandardizedError['severity']
): 'secondary' | 'warning' | 'error' | 'success' => {
	if (severity === 'warning') {
		return 'warning';
	}

	if (severity === 'error') {
		return 'error';
	}

	return 'secondary';
};

export interface ExecuteEvaluationRunParams {
	prompt: string;
	runLabel: string;
	selectedModel: string;
	selectedDataset: string;
	projectInstructions: string;
	selectedMockScenario: MockScenarioId;
	setSubmitError: (error: StandardizedError | null) => void;
	setRunOutput: (output: string) => void;
	setRunNotice: (notice: string) => void;
	setLastResponseMeta: (
		meta: {
			runId: string;
			scenario: string;
			source: 'mock';
			score: number;
		} | null
	) => void;
	setActiveRunState: (state: RunState) => void;
}

export const executeEvaluationRun = async ({
	prompt,
	runLabel,
	selectedModel,
	selectedDataset,
	projectInstructions,
	selectedMockScenario,
	setSubmitError,
	setRunOutput,
	setRunNotice,
	setLastResponseMeta,
	setActiveRunState,
}: ExecuteEvaluationRunParams) => {
	if (prompt.trim().length === 0) {
		const promptError = ERRORS.EMPTY_PROMPT();

		setSubmitError(promptError);
		setRunOutput(`Error: ${promptError.message}`);
		setRunNotice('Add a prompt, then submit again.');
		setLastResponseMeta(null);
		setActiveRunState('failed');
		return;
	}

	setSubmitError(null);
	setLastResponseMeta(null);
	setRunOutput(runStateMeta.queued.output);
	setRunNotice(runStateMeta.queued.notice);
	setActiveRunState('queued');

	setRunOutput(runStateMeta.sending.output);
	setRunNotice(runStateMeta.sending.notice);
	setActiveRunState('sending');

	try {
		const response = await fetch('/api/evaluate/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				runLabel,
				model: selectedModel,
				dataset: selectedDataset,
				projectInstructions,
				prompt,
				mockScenarioId: selectedMockScenario,
			}),
		});

		setRunOutput(runStateMeta.streaming.output);
		setRunNotice(runStateMeta.streaming.notice);
		setActiveRunState('streaming');

		const responseBody: unknown = await response.json();

		if (!response.ok) {
			const errorResult = standardizedErrorSchema.safeParse(responseBody);
			const submitFailure = errorResult.success
				? errorResult.data
				: ERRORS.UNEXPECTED_EVALUATION_ERROR('Evaluation submit failed.');

			throw submitFailure;
		}

		const submitResponse = evaluateSubmitSuccessSchema.parse(responseBody);
		const parsedResponse = submitResponse.response.parsedResponse;
		const topRisks = parsedResponse.topRisks.map((risk) => `- ${risk}`).join('\n');
		const mitigations = parsedResponse.mitigations.map((item) => `- ${item}`).join('\n');

		setRunOutput(
			[
				`Scenario: ${submitResponse.response.scenario}`,
				`Run ID: ${submitResponse.response.runId}`,
				`Source: ${submitResponse.source}`,
				`Score: ${parsedResponse.score}/40`,
				'',
				`Summary: ${parsedResponse.summary}`,
				'',
				'Top risks:',
				topRisks,
				'',
				'Mitigations:',
				mitigations,
				'',
				'Parsed from raw response payload:',
				sanitizeText(submitResponse.response.rawResponse),
			].join('\n')
		);
		setRunNotice('Mock registry response submitted and parsed through the API route.');
		setLastResponseMeta({
			runId: submitResponse.response.runId,
			scenario: submitResponse.response.scenario,
			source: submitResponse.source,
			score: parsedResponse.score,
		});
		setActiveRunState('completed');
	} catch (error) {
		let normalizedError: StandardizedError;
		const fallbackError = ERRORS.UNEXPECTED_EVALUATION_ERROR(
			error instanceof Error ? error.message : 'Evaluation submit failed unexpectedly.'
		);

		if (
			error !== null &&
			typeof error === 'object' &&
			'code' in error &&
			'message' in error &&
			'severity' in error
		) {
			normalizedError = standardizedErrorSchema.parse(error);
		} else {
			normalizedError = fallbackError;
		}

		setSubmitError(normalizedError);
		setRunOutput(`Error: ${normalizedError.message}`);
		setRunNotice('Review the request payload or environment mode and try again.');
		setLastResponseMeta(null);
		setActiveRunState('failed');
	}
};
