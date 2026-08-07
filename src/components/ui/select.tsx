import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const Select = ({ className, children, ...props }: ComponentProps<'select'>) => {
	return (
		<div className="relative">
			<select
				data-slot="select"
				className={cn(
					'input min-h-11 w-full appearance-none rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-4 py-2 pr-10 text-sm text-[var(--ink)] shadow-[var(--shadow-1)] transition-colors outline-none glass hover:border-[var(--line-strong)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				{...props}
			>
				{children}
			</select>
			<svg
				aria-hidden="true"
				viewBox="0 0 16 16"
				fill="none"
				className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--ink-3)]"
			>
				<path
					d="M4 6L8 10L12 6"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};

export { Select };
