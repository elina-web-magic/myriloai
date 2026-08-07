'use client';

import { Activity, Brain, ListChecks, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { DetailSplitPane } from '@/components/dashboard/DetailSplitPane';
import { ScoreChart } from '@/components/dashboard/ScoreChart';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { UncertaintyBadge } from '@/components/ui/uncertainty-badge';

import type { DashboardResult } from '@/types';

export type OutputData = DashboardResult;

import { getScoreColor } from './utils';

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
						<div className="stat-card__avatar avatar flex items-center justify-center w-14 h-14 bg-[var(--surface-2)] text-[var(--accent)]">
							<ListChecks size={28} />
						</div>
						<div className="stat-card__content">
							<p className="stat-card__label meta mb-1">Total Test Cases</p>
							<p className="stat-card__value t-h2 font-mono">{totalTests}</p>
						</div>
					</div>
					<div className="stat-card card flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
						<div className="stat-card__avatar avatar flex items-center justify-center w-14 h-14 bg-[var(--surface-2)] text-[var(--success)]">
							<Activity size={28} />
						</div>
						<div className="stat-card__content">
							<p className="stat-card__label meta mb-1">Average Score</p>
							<p className="stat-card__value t-h2 font-mono">
								{averageScore}{' '}
								<span className="stat-card__value-max t-h4 text-[var(--ink-3)]">/ 40</span>
							</p>
						</div>
					</div>
					<div className="stat-card card flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
						<div className="stat-card__avatar avatar flex items-center justify-center w-14 h-14 bg-[var(--surface-2)] text-[var(--warning)]">
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
						<Activity size={32} className="text-[var(--accent)]" />
						Evaluation Results
					</h2>
				) : null}

				{isDemoData && !hasPersistedResults ? (
					<GlassCard className="results-dashboard__data-state flex flex-col gap-2 p-4">
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
					</GlassCard>
				) : null}

				{!hasPersistedResults ? (
					<GlassCard className="results-dashboard__empty-state flex flex-col gap-3 p-8">
						<p className="results-dashboard__empty-state-label meta">No results yet</p>
						<h3 className="results-dashboard__empty-state-title t-h3">
							Run an evaluation to populate this dashboard
						</h3>
						<p className="results-dashboard__empty-state-copy text-sm text-[var(--ink-2)]">
							When a run is saved, scenarios and their detailed scores will appear here
							automatically.
						</p>
					</GlassCard>
				) : null}

				{reportData.length > 0 ? (
					<GlassCard className="results-dashboard__chart p-5">
						<ScoreChart reportData={reportData} />
					</GlassCard>
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
											const hasInjectionFlags =
												Array.isArray(row.injectionFlags) && row.injectionFlags.length > 0;

											return (
												<Button
													key={row.test_case.scenario}
													onClick={() => setSelectedScenarioIndex(index)}
													variant="secondary"
													className={`results-dashboard__scenario-item flex h-auto flex-col gap-2 rounded-[var(--radius)] border p-3 text-left transition-all ${
														isActive
															? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_10px_24px_rgba(4,120,87,0.12)]'
															: 'border-[var(--line)] bg-[var(--surface)] shadow-[0_6px_18px_rgba(148,163,184,0.08)]'
													}`}
													aria-pressed={isActive}
												>
													<div className="results-dashboard__scenario-item-top flex items-start justify-between gap-3">
														<span className="results-dashboard__scenario-item-title text-sm font-semibold text-[var(--ink)]">
															{row.test_case.scenario}
														</span>
														<div className="flex items-center gap-1.5 shrink-0">
															{hasInjectionFlags && (
																<span
																	title={`Injection flags: ${(row.injectionFlags ?? []).join(', ')}`}
																	className="results-dashboard__scenario-item-injection flex items-center gap-1 rounded-full border border-[var(--error)] bg-[var(--error-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--error)]"
																>
																	<ShieldAlert size={10} />
																	Injection
																</span>
															)}
															<span
																className={`results-dashboard__scenario-item-score rounded-full border px-2 py-0.5 text-xs font-semibold ${getScoreColor(row.total_score)}`}
															>
																{row.total_score}/40
															</span>
														</div>
													</div>
													<p className="results-dashboard__scenario-item-meta t-small line-clamp-2 text-[var(--ink-3)]">
														{row.test_case.solution_criteria.join(' • ')}
													</p>
													<UncertaintyBadge labels={row.failureLabels ?? []} />
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
