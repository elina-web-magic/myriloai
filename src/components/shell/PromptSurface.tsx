import { GitBranch, Play, Settings2 } from 'lucide-react';
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
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ERRORS } from '@/lib/errors';
import { INPUT_LIMITS } from '@/lib/guardrails/input-rails';
import type { MockScenarioId, StandardizedError } from '@/types';

interface PromptSurfaceProps {
	isZoneCollapsed: boolean;
	prompt: string;
	setPrompt: (value: string) => void;
	handleRun: () => void;
	submitError: StandardizedError | null;
	setSubmitError: (error: StandardizedError | null) => void;
	isAdvancedOpen: boolean;
	setIsAdvancedOpen: (value: boolean) => void;
	runLabel: string;
	setRunLabel: (value: string) => void;
	selectedModel: string;
	setSelectedModel: (value: string) => void;
	modelOptions: readonly string[];
	selectedDataset: string;
	setSelectedDataset: (value: string) => void;
	datasetOptions: readonly string[];
	selectedMockScenario: MockScenarioId;
	setSelectedMockScenario: (value: MockScenarioId) => void;
	mockScenarioOptions: readonly { value: MockScenarioId; label: string; description: string }[];
	projectInstructions: string;
	setProjectInstructions: (value: string) => void;
}

export function PromptSurface({
	isZoneCollapsed,
	prompt,
	setPrompt,
	handleRun,
	submitError,
	setSubmitError,
	isAdvancedOpen,
	setIsAdvancedOpen,
	runLabel,
	setRunLabel,
	selectedModel,
	setSelectedModel,
	modelOptions,
	selectedDataset,
	setSelectedDataset,
	datasetOptions,
	selectedMockScenario,
	setSelectedMockScenario,
	mockScenarioOptions,
	projectInstructions,
	setProjectInstructions,
}: PromptSurfaceProps) {
	if (isZoneCollapsed) {
		return (
			<div className="prompt-input-zone__collapsed cell flex flex-col gap-2 p-4">
				<p className="prompt-input-zone__collapsed-label meta">Console summary</p>
				<p className="prompt-input-zone__collapsed-copy text-sm text-[var(--ink-2)]">
					Prompt console is collapsed. Expand it to edit the prompt, adjust advanced settings, or
					inspect the output lifecycle panel.
				</p>
			</div>
		);
	}

	return (
		<div className="prompt-input-zone__surface grid grid-cols-1 gap-4">
			<GlassCard className="prompt-input-zone__main flex flex-col gap-4 p-4 md:p-5">
				<div className="prompt-input-zone__field field">
					<label htmlFor="prompt-input-zone-prompt" className="prompt-input-zone__field-label">
						Prompt
					</label>
					<Textarea
						id="prompt-input-zone-prompt"
						className="prompt-input-zone__textarea min-h-64 bg-white/50 dark:bg-black/20 shadow-inner"
						rows={12}
						value={prompt}
						onChange={(event) => {
							const value = event.target.value;
							setPrompt(value);
							if (value.length > INPUT_LIMITS.SCENARIO_MAX_CHARS) {
								setSubmitError(
									ERRORS.INPUT_TOO_LARGE({
										field: 'prompt',
										actual: { chars: value.length },
										limit: { chars: INPUT_LIMITS.SCENARIO_MAX_CHARS },
										reason: 'Prompt exceeds maximum character limit',
									})
								);
							} else if (submitError?.code === 'INPUT_TOO_LARGE') {
								setSubmitError(null);
							}
						}}
						placeholder="Describe the task or message you want to test"
					/>
				</div>

				<div className="prompt-input-zone__primary-actions flex flex-wrap items-center gap-3">
					<Button
						type="button"
						size="default"
						onClick={handleRun}
						disabled={submitError?.code === 'INPUT_TOO_LARGE'}
					>
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
								Configure the model, dataset, and persistent evaluator instructions for this run.
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
									onChange={(event) => setSelectedModel(event.target.value)}
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
									onChange={(event) => setSelectedDataset(event.target.value)}
								>
									{datasetOptions.map((datasetOption) => (
										<option key={datasetOption} value={datasetOption}>
											{datasetOption}
										</option>
									))}
								</Select>
							</div>
						</div>

						<div className="prompt-input-zone__control field">
							<label
								htmlFor="prompt-input-zone-mock-scenario"
								className="prompt-input-zone__control-label"
							>
								Mock scenario
							</label>
							<Select
								id="prompt-input-zone-mock-scenario"
								value={selectedMockScenario}
								onChange={(event) => setSelectedMockScenario(event.target.value as MockScenarioId)}
							>
								{mockScenarioOptions.map((mockScenarioOption) => (
									<option key={mockScenarioOption.value} value={mockScenarioOption.value}>
										{mockScenarioOption.label}
									</option>
								))}
							</Select>
							<p className="prompt-input-zone__control-note t-small mt-2 text-[var(--ink-3)]">
								{
									mockScenarioOptions.find(
										(mockScenarioOption) => mockScenarioOption.value === selectedMockScenario
									)?.description
								}
							</p>
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
								className="prompt-input-zone__textarea min-h-36 bg-white/50 dark:bg-black/20 shadow-inner"
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
			</GlassCard>
		</div>
	);
}
