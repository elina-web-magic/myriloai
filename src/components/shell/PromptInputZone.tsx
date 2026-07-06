'use client';

import { ChevronDown, ChevronUp, GitBranch, Play, Settings2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { evaluateSubmitSuccessSchema, standardizedErrorSchema } from '@/lib/contracts/evaluation';
import type { StandardizedError } from '@/types';

const modelOptions = ['Claude Sonnet', 'GPT-4.1', 'Gemini 2.5 Pro'] as const;
const datasetOptions = ['Manual session', 'Ailens seed set', 'Custom dataset'] as const;
const runStates = ['queued', 'sending', 'streaming', 'completed', 'failed'] as const;

type RunState = (typeof runStates)[number];

const runStateMeta: Record<
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

export function PromptInputZone() {
	const [projectInstructions, setProjectInstructions] = useState(
		'Score the answer against the rubric, surface tradeoffs clearly, and keep the reasoning concise.'
	);
	const [prompt, setPrompt] = useState(
		'Summarize the rollout risks for a new feature flag system and propose mitigations.'
	);
	const [runLabel, setRunLabel] = useState('Flag rollout risk review');
	const [selectedModel, setSelectedModel] = useState<(typeof modelOptions)[number]>(
		modelOptions[0]
	);
	const [selectedDataset, setSelectedDataset] = useState<(typeof datasetOptions)[number]>(
		datasetOptions[0]
	);
	const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
	const [isZoneCollapsed, setIsZoneCollapsed] = useState(false);
	const [activeRunState, setActiveRunState] = useState<RunState>('completed');
	const [runOutput, setRunOutput] = useState(runStateMeta.completed.output);
	const [runNotice, setRunNotice] = useState(runStateMeta.completed.notice);
	const [submitError, setSubmitError] = useState<StandardizedError | null>(null);
	const [lastResponseMeta, setLastResponseMeta] = useState<{
		runId: string;
		scenario: string;
		source: 'mock';
		score: number;
	} | null>(null);

	const currentRunState = runStateMeta[activeRunState];

	const getErrorMessage = (errorValue: StandardizedError | null): string | null => {
		if (errorValue === null) {
			return null;
		}

		return errorValue.field ? `${errorValue.field}: ${errorValue.message}` : errorValue.message;
	};

	const getErrorDetails = (errorValue: StandardizedError | null): string[] => {
		if (errorValue?.details === undefined) {
			return [];
		}

		return Object.entries(errorValue.details).flatMap(([key, value]) => {
			if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
				return [`${key}: ${String(value)}`];
			}

			if (Array.isArray(value)) {
				return [`${key}: ${value.length} item(s)`];
			}

			if (value !== null && typeof value === 'object') {
				return [`${key}: object payload`];
			}

			return [];
		});
	};

	const getSeverityBadgeVariant = (
		severity: StandardizedError['severity']
	): 'secondary' | 'warning' | 'error' | 'success' => {
		if (severity === 'warning') {
			return 'warning';
		}

		if (severity === 'error') {
			return 'error';
		}

		if (severity === 'info') {
			return 'secondary';
		}

		return 'success';
	};

	const handleRun = async () => {
		if (prompt.trim().length === 0) {
			const promptError: StandardizedError = {
				code: 'EMPTY_PROMPT',
				message: 'Prompt is required before an evaluation can start.',
				field: 'prompt',
				severity: 'error',
			};

			setSubmitError(promptError);
			setRunOutput(`Error: ${promptError.message}`);
			setRunNotice('Add a prompt, then submit again.');
			setLastResponseMeta(null);
			setActiveRunState('failed');
			return;
		}

		setSubmitError(null);
		setLastResponseMeta(null);
		setRunOutput(runStateMeta.queued.output);
		setRunNotice(runStateMeta.queued.notice);
		setActiveRunState('queued');

		setRunOutput(runStateMeta.sending.output);
		setRunNotice(runStateMeta.sending.notice);
		setActiveRunState('sending');

		try {
			const response = await fetch('/api/evaluate/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					runLabel,
					model: selectedModel,
					dataset: selectedDataset,
					projectInstructions,
					prompt,
				}),
			});

			setRunOutput(runStateMeta.streaming.output);
			setRunNotice(runStateMeta.streaming.notice);
			setActiveRunState('streaming');

			const responseBody: unknown = await response.json();

			if (!response.ok) {
				const errorResult = standardizedErrorSchema.safeParse(responseBody);
				const submitFailure = errorResult.success
					? errorResult.data
					: ({
							code: 'UNEXPECTED_EVALUATION_ERROR',
							message: 'Evaluation submit failed.',
							severity: 'error',
						} satisfies StandardizedError);

				throw submitFailure;
			}

			const submitResponse = evaluateSubmitSuccessSchema.parse(responseBody);
			const parsedResponse = submitResponse.response.parsedResponse;
			const topRisks = parsedResponse.topRisks.map((risk) => `- ${risk}`).join('\n');
			const mitigations = parsedResponse.mitigations.map((item) => `- ${item}`).join('\n');

			setRunOutput(
				[
					`Scenario: ${submitResponse.response.scenario}`,
					`Run ID: ${submitResponse.response.runId}`,
					`Source: ${submitResponse.source}`,
					`Score: ${parsedResponse.score}/40`,
					'',
					`Summary: ${parsedResponse.summary}`,
					'',
					'Top risks:',
					topRisks,
					'',
					'Mitigations:',
					mitigations,
					'',
					'Parsed from raw response payload:',
					submitResponse.response.rawResponse,
				].join('\n')
			);
			setRunNotice('Mock registry response submitted and parsed through the API route.');
			setLastResponseMeta({
				runId: submitResponse.response.runId,
				scenario: submitResponse.response.scenario,
				source: submitResponse.source,
				score: parsedResponse.score,
			});
			setActiveRunState('completed');
		} catch (error) {
			let normalizedError: StandardizedError;
			const fallbackError: StandardizedError = {
				code: 'UNEXPECTED_EVALUATION_ERROR',
				message: error instanceof Error ? error.message : 'Evaluation submit failed unexpectedly.',
				severity: 'error',
			};

			if (
				error !== null &&
				typeof error === 'object' &&
				'code' in error &&
				'message' in error &&
				'severity' in error
			) {
				normalizedError = standardizedErrorSchema.parse(error);
			} else {
				normalizedError = fallbackError;
			}

			setSubmitError(normalizedError);
			setRunOutput(`Error: ${normalizedError.message}`);
			setRunNotice('Review the request payload or environment mode and try again.');
			setLastResponseMeta(null);
			setActiveRunState('failed');
		}
	};

	return (
		<section
			className="prompt-input-zone card flex flex-col gap-6 p-6 md:p-8"
			aria-labelledby="prompt-input-zone-title"
		>
			<div className="prompt-input-zone__header flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<div className="prompt-input-zone__copy flex flex-col gap-2">
					<div className="prompt-input-zone__eyebrow flex items-center gap-2">
						<Badge variant="soft" className="prompt-input-zone__badge">
							Manual testing
						</Badge>
						<Badge variant={currentRunState.badgeVariant} className="prompt-input-zone__status">
							{currentRunState.label}
						</Badge>
					</div>
					<div className="prompt-input-zone__title-wrap">
						<h2
							id="prompt-input-zone-title"
							className="prompt-input-zone__title t-h2 text-gradient-accent"
						>
							Test a prompt manually
						</h2>
						<p className="prompt-input-zone__subtitle lead max-w-3xl">
							Start with the prompt you want to test. Keep evaluator instructions in advanced
							settings, not in the main writing flow.
						</p>
					</div>
				</div>

				<div className="prompt-input-zone__header-actions flex min-w-full flex-col gap-3 lg:min-w-[16rem] lg:max-w-[18rem]">
					<Button
						type="button"
						variant="secondary"
						size="default"
						onClick={() => setIsZoneCollapsed((currentValue) => !currentValue)}
					>
						{isZoneCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
						{isZoneCollapsed ? 'Expand console' : 'Collapse console'}
					</Button>

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
				</div>
			</div>

			{isZoneCollapsed ? (
				<div className="prompt-input-zone__collapsed cell flex flex-col gap-2 p-4">
					<p className="prompt-input-zone__collapsed-label meta">Console summary</p>
					<p className="prompt-input-zone__collapsed-copy text-sm text-[var(--ink-2)]">
						Prompt console is collapsed. Expand it to edit the prompt, adjust advanced settings, or
						inspect the output lifecycle panel.
					</p>
				</div>
			) : (
				<div className="prompt-input-zone__surface grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
					<div className="prompt-input-zone__main cell flex flex-col gap-4 p-4 md:p-5">
						<div className="prompt-input-zone__field field">
							<label htmlFor="prompt-input-zone-prompt" className="prompt-input-zone__field-label">
								Prompt
							</label>
							<Textarea
								id="prompt-input-zone-prompt"
								className="prompt-input-zone__textarea min-h-64"
								rows={12}
								value={prompt}
								onChange={(event) => setPrompt(event.target.value)}
								placeholder="Describe the task or message you want to test"
							/>
						</div>

						<div className="prompt-input-zone__primary-actions flex flex-wrap items-center gap-3">
							<Button type="button" size="default" onClick={handleRun}>
								<Play size={16} />
								Run
							</Button>
							<Button
								type="button"
								variant="secondary"
								size="default"
								onClick={() => setIsAdvancedOpen(true)}
								aria-haspopup="dialog"
								aria-expanded={isAdvancedOpen}
							>
								<Settings2 size={16} />
								Advanced
							</Button>
							<Button type="button" variant="secondary" size="default">
								<GitBranch size={16} />
								Chain
							</Button>
						</div>

						{/* ── Advanced settings Dialog ─────────────────────────────────── */}
						<Dialog open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
							<DialogHeader>
								<div className="prompt-input-zone__dialog-copy flex flex-col gap-1">
									<DialogTitle>Advanced settings</DialogTitle>
									<DialogDescription>
										Configure the model, dataset, and persistent evaluator instructions for this
										run.
									</DialogDescription>
								</div>
								<DialogClose />
							</DialogHeader>

							<DialogBody>
								<div className="prompt-input-zone__field field">
									<label
										htmlFor="prompt-input-zone-run-label"
										className="prompt-input-zone__field-label"
									>
										Run label
									</label>
									<Input
										id="prompt-input-zone-run-label"
										className="prompt-input-zone__input"
										value={runLabel}
										onChange={(event) => setRunLabel(event.target.value)}
										placeholder="Name this manual run"
									/>
								</div>

								<div className="prompt-input-zone__advanced-controls grid grid-cols-1 gap-3 md:grid-cols-2">
									<div className="prompt-input-zone__control field">
										<label
											htmlFor="prompt-input-zone-model"
											className="prompt-input-zone__control-label"
										>
											Model
										</label>
										<Select
											id="prompt-input-zone-model"
											value={selectedModel}
											onChange={(event) =>
												setSelectedModel(event.target.value as (typeof modelOptions)[number])
											}
										>
											{modelOptions.map((modelOption) => (
												<option key={modelOption} value={modelOption}>
													{modelOption}
												</option>
											))}
										</Select>
									</div>

									<div className="prompt-input-zone__control field">
										<label
											htmlFor="prompt-input-zone-dataset"
											className="prompt-input-zone__control-label"
										>
											Dataset
										</label>
										<Select
											id="prompt-input-zone-dataset"
											value={selectedDataset}
											onChange={(event) =>
												setSelectedDataset(event.target.value as (typeof datasetOptions)[number])
											}
										>
											{datasetOptions.map((datasetOption) => (
												<option key={datasetOption} value={datasetOption}>
													{datasetOption}
												</option>
											))}
										</Select>
									</div>
								</div>

								<div className="prompt-input-zone__field field">
									<label
										htmlFor="prompt-input-zone-project-instructions"
										className="prompt-input-zone__field-label"
									>
										Project instructions
									</label>
									<Textarea
										id="prompt-input-zone-project-instructions"
										className="prompt-input-zone__textarea min-h-36"
										rows={5}
										value={projectInstructions}
										onChange={(event) => setProjectInstructions(event.target.value)}
										placeholder="Add reusable evaluator instructions"
									/>
								</div>
							</DialogBody>

							<DialogFooter>
								<Button
									type="button"
									variant="secondary"
									size="sm"
									onClick={() => setIsAdvancedOpen(false)}
								>
									Cancel
								</Button>
								<Button type="button" size="sm" onClick={() => setIsAdvancedOpen(false)}>
									Save settings
								</Button>
							</DialogFooter>
						</Dialog>
					</div>

					<div className="prompt-input-zone__output cell flex flex-col gap-4 p-4 md:p-5">
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
									{submitError.field ? (
										<Badge variant="secondary">{submitError.field}</Badge>
									) : null}
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
									Latest parsed response: {lastResponseMeta.scenario} · {lastResponseMeta.score}/40
									· {lastResponseMeta.source} · {lastResponseMeta.runId}
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
				</div>
			)}
		</section>
	);
}
