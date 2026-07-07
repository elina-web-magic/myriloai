import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { StandardizedError } from '@/types';

interface PromptConsoleActionsProps {
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
	getErrorMessage: (errorValue: StandardizedError | null) => string | null;
	getErrorDetails: (errorValue: StandardizedError | null) => string[];
	getSeverityBadgeVariant: (
		severity: StandardizedError['severity']
	) => 'secondary' | 'warning' | 'error' | 'success';
}

export function PromptConsoleActions({
	isZoneCollapsed,
	runStates,
	activeRunState,
	currentRunState,
	runOutput,
	runNotice,
	submitError,
	lastResponseMeta,
	getErrorMessage,
	getErrorDetails,
	getSeverityBadgeVariant,
}: PromptConsoleActionsProps) {
	return (
		<div className="prompt-input-zone__header-actions flex min-w-full flex-col gap-3 lg:min-w-[16rem] lg:max-w-[18rem]">
			{!isZoneCollapsed && (
				<div className="prompt-input-zone__rail cell flex flex-col gap-2 p-4">
					<p className="prompt-input-zone__rail-label meta">Run status</p>
					<div className="prompt-input-zone__rail-row flex items-center gap-2">
						<Sparkles size={16} className="text-[var(--accent)]" />
						<span className="prompt-input-zone__rail-value text-sm text-[var(--ink-2)]">
							{currentRunState.helper}
						</span>
					</div>
					<p className="prompt-input-zone__rail-note t-small text-[var(--ink-3)]">
						Local sandbox route is active when mock mode is enabled.
					</p>
				</div>
			)}

			{!isZoneCollapsed && activeRunState !== 'queued' && (
				<div className="prompt-input-zone__output cell flex flex-col gap-4 p-4 md:p-5 mt-4">
					<div className="prompt-input-zone__output-header flex items-start justify-between gap-3">
						<div className="prompt-input-zone__output-copy">
							<p className="prompt-input-zone__output-label meta">Output preview</p>
							<h3 className="prompt-input-zone__output-title t-h5">Run lifecycle</h3>
						</div>
						<Badge variant={currentRunState.badgeVariant}>{currentRunState.label}</Badge>
					</div>

					<div className="prompt-input-zone__output-states flex flex-wrap gap-2">
						{runStates.map((runState) => {
							const isActive = runState === activeRunState;

							return (
								<Button
									key={runState}
									variant="secondary"
									size="xs"
									className="prompt-input-zone__output-state capitalize shadow-[0_8px_20px_rgba(148,163,184,0.1),inset_0_1px_0_rgba(255,255,255,0.26)]"
									style={{
										borderColor: isActive ? 'rgba(4, 120, 87, 0.7)' : 'rgba(255, 255, 255, 0.5)',
										background: isActive
											? 'linear-gradient(145deg, rgba(52, 211, 153, 0.16) 0%, rgba(255, 255, 255, 0.22) 100%)'
											: 'linear-gradient(145deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.18) 100%)',
										color: isActive ? 'var(--accent)' : 'var(--ink)',
									}}
									aria-pressed={isActive}
									disabled
								>
									{runState}
								</Button>
							);
						})}
					</div>

					<p className="prompt-input-zone__output-helper t-small text-[var(--ink-3)]">
						{currentRunState.helper}
					</p>

					<div className="prompt-input-zone__output-window rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
						<pre className="prompt-input-zone__output-text text-sm leading-6 whitespace-pre-wrap text-[var(--ink-2)]">
							{runOutput}
						</pre>
					</div>

					{submitError ? (
						<div className="prompt-input-zone__error-panel rounded-[var(--radius)] border border-[var(--error)] bg-[var(--error-soft)] p-4">
							<div className="prompt-input-zone__error-panel-header flex items-start justify-between gap-3">
								<div className="prompt-input-zone__error-panel-copy flex flex-col gap-1">
									<p className="prompt-input-zone__error-panel-label meta text-[var(--error)]">
										Structured error
									</p>
									<p className="prompt-input-zone__error-panel-message text-sm text-[var(--error)]">
										{getErrorMessage(submitError)}
									</p>
								</div>
								<Badge variant={getSeverityBadgeVariant(submitError.severity)}>
									{submitError.severity}
								</Badge>
							</div>

							<div className="prompt-input-zone__error-panel-meta mt-3 flex flex-wrap gap-2">
								<Badge variant="error">{submitError.code}</Badge>
								{submitError.field ? <Badge variant="secondary">{submitError.field}</Badge> : null}
							</div>

							{getErrorDetails(submitError).length > 0 ? (
								<ul className="prompt-input-zone__error-panel-details mt-3 flex flex-col gap-1 text-sm text-[var(--error)]">
									{getErrorDetails(submitError).map((detail) => (
										<li key={detail}>{detail}</li>
									))}
								</ul>
							) : null}
						</div>
					) : null}

					{lastResponseMeta ? (
						<div className="prompt-input-zone__output-meta rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-2">
							<p className="prompt-input-zone__output-meta-text t-small text-[var(--ink-3)]">
								Latest parsed response: {lastResponseMeta.scenario} · {lastResponseMeta.score}/40 ·{' '}
								{lastResponseMeta.source} · {lastResponseMeta.runId}
							</p>
						</div>
					) : null}

					<div
						className="prompt-input-zone__output-notice rounded-[var(--radius)] border px-3 py-2"
						style={{
							borderColor: activeRunState === 'failed' ? 'var(--error)' : 'var(--line)',
							background: activeRunState === 'failed' ? 'var(--error-soft)' : 'var(--surface)',
						}}
					>
						<p
							className="prompt-input-zone__output-notice-text t-small"
							style={{
								color: activeRunState === 'failed' ? 'var(--error)' : 'var(--ink-3)',
							}}
						>
							{getErrorMessage(submitError) ?? runNotice}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
