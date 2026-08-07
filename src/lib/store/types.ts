import type { StandardizedError } from '@/types';

import type { runStates } from './constants';
export type RunState = (typeof runStates)[number];

export interface PromptStore {
	isZoneCollapsed: boolean;
	setIsZoneCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;

	isMobileSidebarOpen: boolean;
	setIsMobileSidebarOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;

	isMobileConsoleOpen: boolean;
	setIsMobileConsoleOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;

	activeRunState: RunState;
	setActiveRunState: (state: RunState) => void;

	runOutput: string;
	setRunOutput: (output: string) => void;

	runNotice: string;
	setRunNotice: (notice: string) => void;

	submitError: StandardizedError | null;
	setSubmitError: (error: StandardizedError | null) => void;

	lastResponseMeta: {
		runId: string;
		scenario: string;
		source: 'mock';
		score: number;
	} | null;
	setLastResponseMeta: (meta: PromptStore['lastResponseMeta']) => void;
}
