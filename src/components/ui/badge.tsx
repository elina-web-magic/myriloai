import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold font-[family-name:var(--font-mono)] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-[0_8px_20px_rgba(148,163,184,0.08)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]',
				solid: 'border border-white/20 bg-[image:var(--accent-gradient)] text-white shadow-sm',
				soft: 'border border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]',
				secondary:
					'border-[var(--line-strong)] bg-[var(--surface-2)] text-[var(--ink-2)] shadow-[0_8px_20px_rgba(148,163,184,0.08)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]',
				destructive:
					'border border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)] shadow-[0_8px_20px_rgba(239,68,68,0.12)]',
				outline: 'border-[var(--line-strong)] bg-transparent text-[var(--ink)]',
				success: 'border border-[var(--success)] bg-[var(--success-soft)] text-[var(--success)]',
				warning: 'border border-[var(--warning)] bg-[var(--warning-soft)] text-[var(--warning)]',
				error: 'border border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)]',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};

export { Badge, badgeVariants };
