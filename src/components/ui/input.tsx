import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const Input = ({ className, type = 'text', ...props }: ComponentProps<'input'>) => {
	return (
		<input
			data-slot="input"
			type={type}
			className={cn(
				'input flex h-11 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--ink)] shadow-[var(--shadow-1)] transition-colors outline-none [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] placeholder:text-[var(--ink-3)] hover:border-[var(--line-strong)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	);
};

export { Input };
