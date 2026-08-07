import type { FailureLabel } from '@/types';
import { LABEL_CONFIG } from './constants';
import type { UncertaintyBadgeProps } from './types';

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
