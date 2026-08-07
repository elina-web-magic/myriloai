'use client';

import { Brain, Database, Edit2, ListChecks } from 'lucide-react';
import { useState } from 'react';
import type { OutputData } from '@/components/dashboard/ResultsDashboard';
import { Button } from '@/components/ui/button';
import {
	DialogBackdrop,
	DialogBody,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogPopup,
	DialogPortal,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UncertaintyBadge } from '@/components/ui/uncertainty-badge';

const CopyButton = ({ text }: { text: string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<Button
			onClick={handleCopy}
			variant="secondary"
			size="icon-sm"
			className="copy-btn absolute top-2 right-2 border-[var(--line)] bg-[var(--surface-2)] p-0 glass"
			title="Copy to clipboard"
			aria-label="Copy to clipboard"
		>
			{copied ? (
				<span className="copy-btn__icon copy-btn__icon--success text-[var(--success)]">✓</span>
			) : (
				<span className="copy-btn__icon copy-btn__icon--idle text-[var(--ink-2)]">⧉</span>
			)}
		</Button>
	);
};

import { getScoreColor, getWidthClass } from './utils';

export function DetailSplitPane({ row }: { row: OutputData }) {
	const [activeTab, setActiveTab] = useState<'reasoning' | 'output'>('reasoning');
	const [isOverrideOpen, setIsOverrideOpen] = useState(false);
	const [overrideScore, setOverrideScore] = useState<number | ''>(row.total_score);
	const [overrideNote, setOverrideNote] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [localScore, setLocalScore] = useState(row.total_score);
	const [isOverridden, setIsOverridden] = useState(false);

	const handleOverrideSubmit = async () => {
		if (overrideScore === '' || !overrideNote.trim()) return;
		setIsSubmitting(true);
		try {
			const res = await fetch('/api/evaluate/override', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					evaluationResultId: row.test_case.scenario,
					originalScore: localScore,
					overriddenScore: Number(overrideScore),
					comment: overrideNote,
				}),
			});
			if (res.ok) {
				setLocalScore(Number(overrideScore));
				setIsOverridden(true);
				setIsOverrideOpen(false);
				setOverrideNote('');
			}
		} catch (_e) {
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="detail-split-pane flex h-full flex-col overflow-hidden">
			<div className="detail-split-pane__header flex flex-col gap-4 border-b border-[var(--line)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:justify-between">
				<div className="detail-split-pane__header-info">
					<h3 className="detail-split-pane__title t-h3 text-gradient-1">
						{row.test_case.scenario}
					</h3>
					<div className="detail-split-pane__inputs mt-2 flex flex-wrap gap-2">
						{Object.entries(row.test_case.prompt_inputs).map(([key, val]) => (
							<span
								key={key}
								className="detail-split-pane__input-badge t-small rounded-[var(--r-sm)] border border-[var(--line)] bg-[var(--info-soft)] px-2.5 py-1 font-mono text-[var(--info)] transition-colors"
							>
								{key}: {val}
							</span>
						))}
					</div>
				</div>

				<div className="detail-split-pane__score-container flex flex-col items-end gap-2">
					<div className="flex items-center gap-3">
						<div
							className={`detail-split-pane__score flex flex-col items-center justify-center rounded-xl border px-5 py-2 text-nowrap shadow-sm ${getScoreColor(localScore)} ${isOverridden ? 'ring-2 ring-violet-500/50 ring-offset-1 ring-offset-[var(--surface)]' : ''}`}
						>
							<div className="detail-split-pane__score-row flex items-baseline gap-1">
								<span className="detail-split-pane__score-value text-2xl font-black">
									{localScore}
								</span>
								<span className="detail-split-pane__score-max text-sm font-medium opacity-70">
									/ 40
								</span>
							</div>
							{isOverridden && (
								<span className="detail-split-pane__score-badge text-[10px] font-bold uppercase tracking-wider opacity-80">
									Overridden
								</span>
							)}
						</div>

						<DialogRoot open={isOverrideOpen} onOpenChange={setIsOverrideOpen}>
							<DialogTrigger
								render={
									<Button
										variant="secondary"
										size="icon"
										title="Override Score"
										className="h-10 w-10 shrink-0 shadow-sm border-[var(--line)]"
									>
										<Edit2 size={16} className="text-[var(--ink-2)]" />
									</Button>
								}
							/>
							<DialogPortal>
								<DialogBackdrop />
								<DialogPopup className="w-full max-w-md">
									<DialogHeader>
										<DialogTitle>Override Evaluation Score</DialogTitle>
									</DialogHeader>
									<DialogBody className="flex flex-col gap-4">
										<div className="flex flex-col gap-2">
											<label
												htmlFor="override-score"
												className="text-sm font-medium text-[var(--ink-2)]"
											>
												New Score (0-40)
											</label>
											<Input
												id="override-score"
												type="number"
												min={0}
												max={40}
												value={overrideScore}
												onChange={(e) =>
													setOverrideScore(e.target.value === '' ? '' : Number(e.target.value))
												}
												placeholder="Enter new score"
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label
												htmlFor="override-note"
												className="text-sm font-medium text-[var(--ink-2)]"
											>
												Reasoning / Text Note
											</label>
											<Textarea
												id="override-note"
												value={overrideNote}
												onChange={(e) => setOverrideNote(e.target.value)}
												placeholder="Explain why the AI judge's score was incorrect..."
												className="min-h-[100px] resize-y"
											/>
										</div>
									</DialogBody>
									<DialogFooter>
										<DialogClose render={<Button variant="ghost">Cancel</Button>} />
										<Button
											onClick={handleOverrideSubmit}
											disabled={isSubmitting || overrideScore === '' || !overrideNote.trim()}
										>
											{isSubmitting ? 'Saving...' : 'Save Override'}
										</Button>
									</DialogFooter>
								</DialogPopup>
							</DialogPortal>
						</DialogRoot>
					</div>

					{/* 6.10.b+c: confidence indicator — failure labels below the score */}
					<UncertaintyBadge labels={row.failureLabels ?? []} />
				</div>
			</div>

			<div className="detail-split-pane__body grid flex-1 grid-cols-1 gap-0 divide-y border-[var(--line)] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
				<div className="detail-split-pane__column detail-split-pane__column--metrics flex flex-col gap-6 p-6">
					<div className="detail-split-pane__criteria-section">
						<h4 className="detail-split-pane__criteria-title meta mb-3 flex items-center gap-2">
							<ListChecks size={16} /> Criteria
						</h4>
						<ul className="detail-split-pane__criteria-list checklist">
							{row.test_case.solution_criteria.map((criteria) => (
								<li key={criteria} className="detail-split-pane__criteria-item">
									{criteria}
								</li>
							))}
						</ul>
					</div>

					<div className="detail-split-pane__breakdown-section">
						<h4 className="detail-split-pane__breakdown-title meta mb-3">Score Breakdown</h4>
						<div className="detail-split-pane__breakdown-grid grid grid-cols-2 gap-3">
							{Object.entries(row.scores).map(([metric, score]) => {
								const textColor =
									score >= 8
										? 'text-[var(--success)]'
										: score >= 5
											? 'text-[var(--warning)]'
											: 'text-[var(--error)]';
								const bgColor =
									score >= 8
										? 'bg-[var(--success)]'
										: score >= 5
											? 'bg-[var(--warning)]'
											: 'bg-[var(--error)]';

								return (
									<div
										key={metric}
										className="detail-split-pane__breakdown-cell cell flex flex-col gap-2 bg-[var(--surface)] p-3 transition-colors"
									>
										<div className="detail-split-pane__breakdown-header flex items-center justify-between">
											<span
												className="detail-split-pane__breakdown-metric t-small truncate"
												title={metric}
											>
												{metric.replace(/_/g, ' ')}
											</span>
											<span
												className={`detail-split-pane__breakdown-value font-mono text-sm font-bold ${textColor}`}
											>
												{score}/10
											</span>
										</div>
										<div className="detail-split-pane__breakdown-bar-wrapper h-1 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
											<div
												className={`detail-split-pane__breakdown-bar-fill h-full ${bgColor} ${getWidthClass(score)}`}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="detail-split-pane__column detail-split-pane__column--content flex flex-col gap-4 bg-[var(--surface-2)] p-6">
					<div className="detail-split-pane__content-intro cell flex flex-col gap-2 p-4">
						<div className="detail-split-pane__content-intro-top flex items-center justify-between gap-3">
							<p className="detail-split-pane__content-intro-label meta">Review flow</p>
							<span className="detail-split-pane__content-intro-badge rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
								Reasoning first
							</span>
						</div>
						<p className="detail-split-pane__content-intro-copy t-small text-[var(--ink-3)]">
							Start with evaluator reasoning and score context. Open raw output only when you need
							the exact model text.
						</p>
					</div>

					<div className="detail-split-pane__tabs flex border-b border-[var(--line)]">
						<Button
							onClick={() => setActiveTab('reasoning')}
							variant="ghost"
							size="sm"
							className={`detail-split-pane__tab detail-split-pane__tab--reasoning rounded-none border-b-2 px-4 py-2 t-h6 transition-colors ${
								activeTab === 'reasoning'
									? 'border-[var(--accent)] text-[var(--accent)]'
									: 'border-transparent text-[var(--ink-2)]'
							}`}
						>
							<span className="detail-split-pane__tab-inner flex items-center gap-2">
								<Brain size={16} /> Review Summary
							</span>
						</Button>
						<Button
							onClick={() => setActiveTab('output')}
							variant="ghost"
							size="sm"
							className={`detail-split-pane__tab detail-split-pane__tab--output rounded-none border-b-2 px-4 py-2 t-h6 transition-colors ${
								activeTab === 'output'
									? 'border-[var(--info)] text-[var(--info)]'
									: 'border-transparent text-[var(--ink-2)]'
							}`}
						>
							<span className="detail-split-pane__tab-inner flex items-center gap-2">
								<Database size={16} /> Inspect Raw Output
							</span>
						</Button>
					</div>

					<div className="detail-split-pane__content relative h-[320px] flex-1">
						{activeTab === 'reasoning' ? (
							<div className="detail-split-pane__reasoning absolute inset-0 overflow-auto custom-scrollbar pr-2">
								<div className="detail-split-pane__reasoning-panel flex flex-col gap-4">
									<div className="detail-split-pane__reasoning-card cell flex flex-col gap-2 p-4">
										<p className="detail-split-pane__reasoning-label meta">Evaluator reasoning</p>
										<div className="detail-split-pane__reasoning-text t-body leading-relaxed">
											{row.reasoning}
										</div>
									</div>
									<div className="detail-split-pane__reasoning-note rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink-3)]">
										Use raw output for wording checks, formatting issues, or exact-copy review.
									</div>
								</div>
							</div>
						) : (
							<div className="detail-split-pane__raw-output absolute inset-0 flex flex-col gap-3 overflow-hidden bg-[var(--surface)]">
								<div className="detail-split-pane__raw-output-header cell relative flex flex-col gap-2 p-4 pr-14">
									<CopyButton text={row.output} />
									<p className="detail-split-pane__raw-output-label meta">Raw model output</p>
									<p className="detail-split-pane__raw-output-copy t-small text-[var(--ink-3)]">
										Secondary inspection view for exact text, formatting, and copy validation.
									</p>
								</div>
								<div className="detail-split-pane__output-scroll cell flex-1 overflow-auto p-4 custom-scrollbar">
									<pre className="detail-split-pane__output-text t-small whitespace-pre-wrap break-words font-mono">
										{row.output}
									</pre>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
