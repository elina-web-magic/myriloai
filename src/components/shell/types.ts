import type { ReactNode } from 'react';
import type { RunState } from '@/lib/store/prompt-store';
import type { MockScenarioId, StandardizedError } from '@/types';

export interface AppShellProps {
	children: ReactNode;
}

export interface MainContentColumnProps {
	children: ReactNode;
}

export interface PromptConsoleActionsProps {
	isZoneCollapsed: boolean;
	runStates: readonly string[];
	activeRunState: string;
	currentRunState: {
		label: string;
		helper: string;
		output: string;
		notice: string;
		badgeVariant: 'secondary' | 'soft' | 'success' | 'error';
	};
	runOutput: string;
	runNotice: string;
	submitError: StandardizedError | null;
	lastResponseMeta: {
		runId: string;
		scenario: string;
		source: string;
		score: number;
	} | null;
}

export interface PromptSurfaceProps {
	isZoneCollapsed: boolean;
	prompt: string;
	setPrompt: (value: string) => void;
	handleRun: () => void;
	submitError: StandardizedError | null;
	setSubmitError: (error: StandardizedError | null) => void;
	isAdvancedOpen: boolean;
	setIsAdvancedOpen: (value: boolean) => void;
	runLabel: string;
	setRunLabel: (value: string) => void;
	selectedModel: string;
	setSelectedModel: (value: string) => void;
	modelOptions: readonly string[];
	selectedDataset: string;
	setSelectedDataset: (value: string) => void;
	datasetOptions: readonly string[];
	selectedMockScenario: MockScenarioId;
	setSelectedMockScenario: (value: MockScenarioId) => void;
	mockScenarioOptions: readonly { value: MockScenarioId; label: string; description: string }[];
	projectInstructions: string;
	setProjectInstructions: (value: string) => void;
}

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
