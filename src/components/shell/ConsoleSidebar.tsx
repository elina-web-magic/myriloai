'use client';

import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { runStateMeta, runStates, usePromptStore } from '@/lib/store/prompt-store';
import { PromptConsoleActions } from './PromptConsoleActions';

export function ConsoleSidebar() {
	const isZoneCollapsed = usePromptStore((state) => state.isZoneCollapsed);
	const setIsZoneCollapsed = usePromptStore((state) => state.setIsZoneCollapsed);
	const activeRunState = usePromptStore((state) => state.activeRunState);
	const runOutput = usePromptStore((state) => state.runOutput);
	const runNotice = usePromptStore((state) => state.runNotice);
	const submitError = usePromptStore((state) => state.submitError);
	const lastResponseMeta = usePromptStore((state) => state.lastResponseMeta);

	const currentRunState = runStateMeta[activeRunState];

	const isMobileConsoleOpen = usePromptStore((state) => state.isMobileConsoleOpen);
	const setIsMobileConsoleOpen = usePromptStore((state) => state.setIsMobileConsoleOpen);

	return (
		<>
			{/* Mobile Overlay */}
			<div
				className={`fixed inset-0 z-40 bg-[rgba(2,6,23,0.5)] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
					isMobileConsoleOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsMobileConsoleOpen(false)}
				aria-hidden="true"
			/>

			<aside
				className={`console-zone fixed lg:sticky right-0 top-0 h-screen border-l border-[var(--line)] bg-paper shadow-[var(--shadow-3)] transition-all z-50 lg:z-40 ${
					isZoneCollapsed ? 'w-20' : 'w-auto'
				} lg:translate-x-0 ${isMobileConsoleOpen ? 'translate-x-0' : 'translate-x-full'}`}
			>
				<div className="console-zone__wrapper flex h-full w-full flex-col bg-[var(--surface)] glass p-4 overflow-y-auto">
					<div
						className={`console-zone__header flex mb-4 transition-all ${isZoneCollapsed ? 'lg:justify-center justify-start' : 'justify-start'}`}
					>
						<Button
							onClick={() => setIsZoneCollapsed(!isZoneCollapsed)}
							variant="ghost"
							size="icon"
							className="console-zone__toggle shrink-0 hidden lg:inline-flex"
							aria-label={isZoneCollapsed ? 'Expand console' : 'Collapse console'}
						>
							{isZoneCollapsed ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
						</Button>

						<Button
							onClick={() => setIsMobileConsoleOpen(false)}
							variant="ghost"
							size="icon"
							className="console-zone__toggle shrink-0 lg:hidden"
							aria-label="Close console"
						>
							<PanelRightClose size={18} />
						</Button>
					</div>

					<PromptConsoleActions
						isZoneCollapsed={isZoneCollapsed}
						runStates={runStates}
						activeRunState={activeRunState}
						currentRunState={currentRunState}
						runOutput={runOutput}
						runNotice={runNotice}
						submitError={submitError}
						lastResponseMeta={lastResponseMeta}
					/>
				</div>
			</aside>
		</>
	);
}
