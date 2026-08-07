import type { FailureLabel } from '@/types';

import type { LabelConfig, UncertaintyBadgeProps } from './types';

const LABEL_CONFIG: Record<FailureLabel, LabelConfig> = {
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
		colorClass: 'border-[var(--warning)] bg-[var(--warning-soft)] text-[var(--warning)]',
	},
	GROUNDING_FAILURE: {
		label: 'Grounding Fail',
		colorClass: 'border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)]',
	},
	HALLUCINATION: {
		label: 'Hallucination',
		colorClass: 'border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)]',
	},
	IRRELEVANCE: {
		label: 'Irrelevant',
		colorClass: 'border-[var(--warning)] bg-[var(--warning-soft)] text-[var(--warning)]',
	},
	REFUSAL: {
		label: 'Refusal',
		colorClass: 'border-[var(--info)] bg-[var(--info-soft)] text-[var(--info)]',
	},
};

export const UncertaintyBadge = ({ labels, className = '' }: UncertaintyBadgeProps) => {
	if (labels.length === 0) return null;

	return (
		<div className={`uncertainty-badge flex flex-wrap gap-1 ${className}`}>
			{labels.map((label) => {
				const config = LABEL_CONFIG[label as FailureLabel];
				if (!config) return null;
				return (
					<span
						key={label}
						title={label}
						className={`uncertainty-badge__pill rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.colorClass}`}
					>
						{config.label}
					</span>
				);
			})}
		</div>
	);
};
