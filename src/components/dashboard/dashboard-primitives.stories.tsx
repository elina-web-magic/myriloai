import type { Story } from '@ladle/react';

import fallbackData from '@/data/output.json';

import { DetailSplitPane } from './DetailSplitPane';
import { ResultsDashboard } from './ResultsDashboard';
import type { OutputData } from './types';

const reportData = fallbackData as unknown as OutputData[];

export const ResultsDashboardLiveState: Story = () => (
	<div className="min-h-screen p-8">
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			<div className="flex flex-col gap-2">
				<p className="meta">Dashboard Primitives</p>
				<h2 className="t-h2">Results Dashboard — Persisted Run</h2>
				<p className="lead max-w-3xl">
					Preview the dashboard-first evaluator workspace with summary cards, scenario list, and
					detail pane populated from sample results.
				</p>
			</div>

			<ResultsDashboard reportData={reportData} dataSource="live" />
		</div>
	</div>
);

export const DetailSplitPaneReasoningState: Story = () => (
	<div className="min-h-screen p-8">
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			<div className="flex flex-col gap-2">
				<p className="meta">Dashboard Primitives</p>
				<h2 className="t-h2">Detail Split Pane — Review Summary</h2>
				<p className="lead max-w-3xl">
					Preview the master-detail review pane in its default reasoning-first state with persisted
					sample data.
				</p>
			</div>

			<div className="card min-h-[720px] overflow-hidden">
				<DetailSplitPane row={reportData[0]} />
			</div>
		</div>
	</div>
);

export const ResultsDashboardEmptyState: Story = () => (
	<div className="min-h-screen p-8">
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			<div className="flex flex-col gap-2">
				<p className="meta">Dashboard Primitives</p>
				<h2 className="t-h2">Results Dashboard — Empty Persisted State</h2>
				<p className="lead max-w-3xl">
					Preview the review workspace before any persisted evaluation results exist in the
					database.
				</p>
			</div>

			<ResultsDashboard reportData={[]} dataSource="live" />
		</div>
	</div>
);

export const ResultsDashboardDemoState: Story = () => (
	<div className="min-h-screen p-8">
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			<div className="flex flex-col gap-2">
				<p className="meta">Dashboard Primitives</p>
				<h2 className="t-h2">Results Dashboard — Demo Data State</h2>
				<p className="lead max-w-3xl">
					Preview the review workspace when demo results are shown because no persisted evaluation
					run exists yet.
				</p>
			</div>

			<ResultsDashboard reportData={reportData} dataSource="demo" />
		</div>
	</div>
);
