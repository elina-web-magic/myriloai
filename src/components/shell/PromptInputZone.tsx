'use client';

import { useState } from 'react';
import { evaluateSubmitSuccessSchema, standardizedErrorSchema } from '@/lib/contracts/evaluation';
import { ERRORS } from '@/lib/errors';
import { sanitizeText } from '@/lib/guardrails/output-rails';
import type { MockScenarioId, StandardizedError } from '@/types';

const modelOptions = ['Claude Sonnet', 'GPT-4.1', 'Gemini 2.5 Pro'] as const;
const datasetOptions = ['Manual session', 'Ailens seed set', 'Custom dataset'] as const;
const mockScenarioOptions = [
	{
		value: 'success_perfect',
		label: 'Success perfect',
		description: 'Valid parsed response with full scoring data.',
	},
	{
		value: 'error_malformed_json',
		label: 'Error malformed JSON',
		description: 'Simulate model output that breaks response parsing.',
	},
	{
		value: 'error_missing_context',
		label: 'Error missing context',
		description: 'Simulate a scenario that cannot score due to missing context.',
	},
] as const satisfies ReadonlyArray<{
	value: MockScenarioId;
	label: string;
	description: string;
}>;

import { runStateMeta, usePromptStore } from '@/lib/store/prompt-store';
import { PromptSurface } from './PromptSurface';

export function PromptInputZone() {
	const [projectInstructions, setProjectInstructions] = useState(
		'Score the answer against the rubric, surface tradeoffs clearly, and keep the reasoning concise.'
	);
	const [prompt, setPrompt] = useState(
		'Summarize the rollout risks for a new feature flag system and propose mitigations.'
	);
	const [runLabel, setRunLabel] = useState('Flag rollout risk review');
	const [selectedModel, setSelectedModel] = useState<(typeof modelOptions)[number]>(
		modelOptions[0]
	);
	const [selectedDataset, setSelectedDataset] = useState<(typeof datasetOptions)[number]>(
		datasetOptions[0]
	);
	const [selectedMockScenario, setSelectedMockScenario] =
		useState<MockScenarioId>('success_perfect');
	const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

	const isZoneCollapsed = usePromptStore((state) => state.isZoneCollapsed);
	const setActiveRunState = usePromptStore((state) => state.setActiveRunState);
	const setRunOutput = usePromptStore((state) => state.setRunOutput);
	const setRunNotice = usePromptStore((state) => state.setRunNotice);
	const submitError = usePromptStore((state) => state.submitError);
	const setSubmitError = usePromptStore((state) => state.setSubmitError);
	const setLastResponseMeta = usePromptStore((state) => state.setLastResponseMeta);

	const handleRun = async () => {
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

	return (
		<div className="prompt-input-zone flex-1 w-full max-w-7xl mx-auto">
			<PromptSurface
				isZoneCollapsed={isZoneCollapsed}
				prompt={prompt}
				setPrompt={setPrompt}
				handleRun={handleRun}
				submitError={submitError}
				setSubmitError={setSubmitError}
				isAdvancedOpen={isAdvancedOpen}
				setIsAdvancedOpen={setIsAdvancedOpen}
				runLabel={runLabel}
				setRunLabel={setRunLabel}
				selectedModel={selectedModel}
				setSelectedModel={(val) => setSelectedModel(val as (typeof modelOptions)[number])}
				modelOptions={modelOptions}
				selectedDataset={selectedDataset}
				setSelectedDataset={(val) => setSelectedDataset(val as (typeof datasetOptions)[number])}
				datasetOptions={datasetOptions}
				selectedMockScenario={selectedMockScenario}
				setSelectedMockScenario={setSelectedMockScenario}
				mockScenarioOptions={mockScenarioOptions}
				projectInstructions={projectInstructions}
				setProjectInstructions={setProjectInstructions}
			/>
		</div>
	);
}
