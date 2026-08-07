import { create } from 'zustand';

import type { PromptStore, RunState } from './types';
import { runStates } from './types';

export type { PromptStore, RunState };
export { runStates };

export const runStateMeta: Record<
	RunState,
	{
		label: string;
		helper: string;
		output: string;
		notice: string;
		badgeVariant: 'secondary' | 'soft' | 'success' | 'error';
	}
> = {
	queued: {
		label: 'Queued',
		helper: 'The request is staged and waiting to start.',
		output: 'Run queued. The console is reserving a worker for this prompt.',
		notice: 'No tokens yet.',
		badgeVariant: 'secondary',
	},
	sending: {
		label: 'Sending',
		helper: 'Project instructions and prompt are being sent to the model.',
		output: 'Sending prompt payload with selected model and dataset context…',
		notice: 'Network and auth checks happen here.',
		badgeVariant: 'soft',
	},
	streaming: {
		label: 'Streaming',
		helper: 'Tokens are arriving and the response is still in progress.',
		output:
			'Initial assessment: the rollout risks cluster around migration order, stale flags, and missing ownership boundaries…',
		notice: 'Streaming preview is simulated for now.',
		badgeVariant: 'soft',
	},
	completed: {
		label: 'Completed',
		helper: 'The run finished successfully and is ready for review.',
		output:
			'Top risks: stale flag cleanup, inconsistent naming, and unbounded fallback logic. Mitigations: ownership policy, TTLs, and release checklists.',
		notice: 'Ready to compare with evaluator results.',
		badgeVariant: 'success',
	},
	failed: {
		label: 'Failed',
		helper: 'The run could not complete and needs attention.',
		output: 'Error: Evaluation submit failed before a result could be parsed.',
		notice: 'Show inline failures early so the user can recover fast.',
		badgeVariant: 'error',
	},
};

export const usePromptStore = create<PromptStore>((set) => ({
	isZoneCollapsed: false,
	setIsZoneCollapsed: (collapsed) =>
		set((state) => ({
			isZoneCollapsed:
				typeof collapsed === 'function' ? collapsed(state.isZoneCollapsed) : collapsed,
		})),

	isMobileSidebarOpen: false,
	setIsMobileSidebarOpen: (isOpen) =>
		set((state) => ({
			isMobileSidebarOpen:
				typeof isOpen === 'function' ? isOpen(state.isMobileSidebarOpen) : isOpen,
		})),

	isMobileConsoleOpen: false,
	setIsMobileConsoleOpen: (isOpen) =>
		set((state) => ({
			isMobileConsoleOpen:
				typeof isOpen === 'function' ? isOpen(state.isMobileConsoleOpen) : isOpen,
		})),

	activeRunState: 'completed',
	setActiveRunState: (state) => set({ activeRunState: state }),

	runOutput: runStateMeta.completed.output,
	setRunOutput: (output) => set({ runOutput: output }),

	runNotice: runStateMeta.completed.notice,
	setRunNotice: (notice) => set({ runNotice: notice }),

	submitError: null,
	setSubmitError: (error) => set({ submitError: error }),

	lastResponseMeta: null,
	setLastResponseMeta: (meta) => set({ lastResponseMeta: meta }),
}));
