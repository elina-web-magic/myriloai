'use client';

import { Activity, Brain, ListChecks } from 'lucide-react';
import { useState } from 'react';
import { DetailSplitPane } from '@/components/dashboard/DetailSplitPane';
import { Button } from '@/components/ui/button';

import type { DashboardResult } from '@/types';

export type OutputData = DashboardResult;

const getScoreColor = (score: number): string => {
	if (score >= 35) return 'text-[var(--success)] border-[var(--success)] bg-[var(--success-soft)]';
	if (score >= 25) return 'text-[var(--warning)] border-[var(--warning)] bg-[var(--warning-soft)]';
	return 'text-[var(--error)] border-[var(--error)] bg-[var(--error-soft)]';
};

export function ResultsDashboard({
	reportData,
	dataSource,
}: {
	reportData: OutputData[];
	dataSource: 'demo' | 'live';
}) {
	const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

	const totalTests = reportData.length;
	const averageScore =
		totalTests > 0
			? (reportData.reduce((acc, curr) => acc + curr.total_score, 0) / totalTests).toFixed(1)
			: 0;
	const passRate =
		totalTests > 0
			? ((reportData.filter((row) => row.total_score >= 30).length / totalTests) * 100).toFixed(1)
			: 0;
	const selectedScenario = reportData[selectedScenarioIndex] ?? reportData[0];
	const isDemoData = dataSource === 'demo';
	const hasPersistedResults = dataSource === 'live' && reportData.length > 0;

	return (
		<>
			{hasPersistedResults ? (
				<section className="app__stats grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="stat-card card flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
						<div
							className="stat-card__avatar avatar flex items-center justify-center"
							style={{
								width: '56px',
								height: '56px',
								background: 'var(--surface-2)',
								color: 'var(--accent)',
							}}
						>
							<ListChecks size={28} />
						</div>
						<div className="stat-card__content">
							<p className="stat-card__label meta mb-1">Total Test Cases</p>
							<p className="stat-card__value t-h2 font-mono">{totalTests}</p>
						</div>
					</div>
					<div className="stat-card card flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
						<div
							className="stat-card__avatar avatar flex items-center justify-center"
							style={{
								width: '56px',
								height: '56px',
								background: 'var(--surface-2)',
								color: 'var(--success)',
							}}
						>
							<Activity size={28} />
						</div>
						<div className="stat-card__content">
							<p className="stat-card__label meta mb-1">Average Score</p>
							<p className="stat-card__value t-h2 font-mono">
								{averageScore}{' '}
								<span className="stat-card__value-max t-h4" style={{ color: 'var(--ink-3)' }}>
									/ 40
								</span>
							</p>
						</div>
					</div>
					<div className="stat-card card flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
						<div
							className="stat-card__avatar avatar flex items-center justify-center"
							style={{
								width: '56px',
								height: '56px',
								background: 'var(--surface-2)',
								color: 'var(--warning)',
							}}
						>
							<Brain size={28} />
						</div>
						<div className="stat-card__content">
							<p className="stat-card__label meta mb-1">Pass Rate (&ge;30)</p>
							<p className="stat-card__value t-h2 font-mono">{passRate}%</p>
						</div>
					</div>
				</section>
			) : null}

			<section className="app__results flex flex-col gap-8 mt-4">
				{hasPersistedResults ? (
					<h2 className="app__results-title t-h2 flex items-center gap-3">
						<Activity size={32} style={{ color: 'var(--accent)' }} />
						Evaluation Results
					</h2>
				) : null}

				{isDemoData && !hasPersistedResults ? (
					<div className="results-dashboard__data-state card flex flex-col gap-2 p-4">
						<div className="results-dashboard__data-state-row flex items-center justify-between gap-3">
							<p className="results-dashboard__data-state-label meta">Data source</p>
							<span className="results-dashboard__data-state-badge rounded-full border border-[var(--warning)] bg-[var(--warning-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--warning)]">
								Demo
							</span>
						</div>
						<p className="results-dashboard__data-state-copy text-sm text-[var(--ink-2)]">
							No evaluation results were found in the database yet. The dashboard is showing demo
							results until a real run is saved.
						</p>
					</div>
				) : null}

				{!hasPersistedResults ? (
					<div className="results-dashboard__empty-state card flex flex-col gap-3 p-8">
						<p className="results-dashboard__empty-state-label meta">No results yet</p>
						<h3 className="results-dashboard__empty-state-title t-h3">
							Run an evaluation to populate this dashboard
						</h3>
						<p className="results-dashboard__empty-state-copy text-sm text-[var(--ink-2)]">
							When a run is saved, scenarios and their detailed scores will appear here
							automatically.
						</p>
					</div>
				) : null}

				{hasPersistedResults ? (
					<div className="results-dashboard card overflow-hidden">
						<div className="results-dashboard__layout grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
							<aside className="results-dashboard__scenario-list border-b border-[var(--line)] bg-[var(--surface)] lg:border-r lg:border-b-0">
								<div className="results-dashboard__scenario-list-header border-b border-[var(--line)] p-4">
									<p className="results-dashboard__scenario-list-label meta">Scenarios</p>
									<p className="results-dashboard__scenario-list-copy t-small text-[var(--ink-3)]">
										Select a scenario to inspect the detailed evaluation pane.
									</p>
								</div>

								<div className="results-dashboard__scenario-list-body max-h-[720px] overflow-auto p-3">
									<div className="results-dashboard__scenario-items flex flex-col gap-3">
										{reportData.map((row, index) => {
											const isActive = index === selectedScenarioIndex;

											return (
												<Button
													key={row.test_case.scenario}
													onClick={() => setSelectedScenarioIndex(index)}
													variant="secondary"
													className="results-dashboard__scenario-item flex h-auto flex-col gap-2 rounded-[var(--radius)] border p-3 text-left transition-all"
													style={{
														borderColor: isActive ? 'var(--accent)' : 'var(--line)',
														background: isActive ? 'var(--accent-soft)' : 'var(--surface)',
														boxShadow: isActive
															? '0 10px 24px rgba(4, 120, 87, 0.12)'
															: '0 6px 18px rgba(148, 163, 184, 0.08)',
													}}
													aria-pressed={isActive}
												>
													<div className="results-dashboard__scenario-item-top flex items-start justify-between gap-3">
														<span className="results-dashboard__scenario-item-title text-sm font-semibold text-[var(--ink)]">
															{row.test_case.scenario}
														</span>
														<span
															className={`results-dashboard__scenario-item-score rounded-full border px-2 py-0.5 text-xs font-semibold ${getScoreColor(row.total_score)}`}
														>
															{row.total_score}/40
														</span>
													</div>
													<p className="results-dashboard__scenario-item-meta t-small line-clamp-2 text-[var(--ink-3)]">
														{row.test_case.solution_criteria.join(' • ')}
													</p>
												</Button>
											);
										})}
									</div>
								</div>
							</aside>

							<div className="results-dashboard__detail min-h-[720px]">
								{selectedScenario ? (
									<DetailSplitPane row={selectedScenario} />
								) : (
									<div className="results-dashboard__empty flex h-full items-center justify-center p-8 text-[var(--ink-3)]">
										No scenario selected.
									</div>
								)}
							</div>
						</div>
					</div>
				) : null}
			</section>
		</>
	);
}
