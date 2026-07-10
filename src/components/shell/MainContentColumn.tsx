import type { ReactNode } from 'react';
import { MobileHeader } from '@/components/shell/MobileHeader';
import { PromptInputZone } from '@/components/shell/PromptInputZone';
import { GlassCard } from '@/components/ui/glass-card';

interface MainContentColumnProps {
	children: ReactNode;
}

export const MainContentColumn = ({ children }: MainContentColumnProps) => (
	<div className="app-wrapper min-w-0 h-full overflow-y-auto w-full mx-auto flex flex-col">
		<MobileHeader />

		<div className="p-6 md:p-12 flex flex-col gap-4">
			<PromptInputZone />

			<GlassCard
				className="app__review-section flex flex-col gap-6 p-6 md:p-8 mx-auto"
				aria-labelledby="app-review-title"
			>
				<ReviewWorkspaceHeader />
				{children}
			</GlassCard>
		</div>
	</div>
);

const ReviewWorkspaceHeader = () => (
	<div className="app__section-header flex flex-col gap-2">
		<p className="app__section-eyebrow meta">Review Workspace</p>
		<div className="app__section-copy flex flex-col gap-1">
			<h2 id="app-review-title" className="app__section-title t-h2">
				Inspect run quality, scores, and raw output
			</h2>
			<p className="app__section-description lead max-w-3xl">
				This area is dashboard-first: scan scenarios, compare scores, and open raw model output only
				when you need detail.
			</p>
		</div>
	</div>
);
