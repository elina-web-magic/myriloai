import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				'input flex min-h-24 w-full resize-y rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--ink)] shadow-[var(--shadow-1)] transition-colors outline-none [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] placeholder:text-[var(--ink-3)] hover:border-[var(--line-strong)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	);
};

export { Textarea };
