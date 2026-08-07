'use client';

import { useState } from 'react';
import { usePromptStore } from '@/lib/store/prompt-store';
import type { MockScenarioId } from '@/types';
import { PromptSurface } from './PromptSurface';
import { executeEvaluationRun } from './utils';

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

	const handleRun = () => {
		executeEvaluationRun({
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
		});
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
