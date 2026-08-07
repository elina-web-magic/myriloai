import { create } from 'zustand';
import { runStateMeta, runStates } from './constants';
import type { PromptStore, RunState } from './types';

export type { PromptStore, RunState };
export { runStateMeta, runStates };

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
