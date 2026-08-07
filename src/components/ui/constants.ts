import type { FailureLabel } from '@/types';
import type { LabelConfig } from './types';

export const LABEL_CONFIG: Record<FailureLabel, LabelConfig> = {
	SCORE_WITHOUT_EVIDENCE: {
		label: 'No Evidence',
		colorClass: 'border-[var(--warning)] bg-[var(--warning-soft)] text-[var(--warning)]',
	},
	FORMATTING_DRIFT: {
		label: 'Format Drift',
		colorClass: 'border-[var(--info)] bg-[var(--info-soft)] text-[var(--info)]',
	},
	EVALUATOR_DISAGREEMENT: {
		label: 'Panel Disagree',
		colorClass: 'border-[var(--info)] bg-[var(--info-soft)] text-[var(--info)]',
	},
	GROUNDING_FAILURE: {
		label: 'Hallucination',
		colorClass: 'border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)]',
	},
	HALLUCINATION: {
		label: 'Hallucination',
		colorClass: 'border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)]',
	},
	IRRELEVANCE: {
		label: 'Irrelevance',
		colorClass: 'border-[var(--warning)] bg-[var(--warning-soft)] text-[var(--warning)]',
	},
	REFUSAL: {
		label: 'Refusal',
		colorClass: 'border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)]',
	},
};
