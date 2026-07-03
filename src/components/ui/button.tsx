import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shadow-sm",
	{
		variants: {
			variant: {
				default:
					'border border-white/20 bg-[image:var(--accent-gradient)] text-white shadow-[var(--shadow-2)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-3)] dark:shadow-[var(--shadow-3)]',
				secondary:
					'border border-[var(--line-strong)] bg-[var(--surface-2)] text-[var(--ink)] shadow-[var(--shadow-1)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-2)]',
				outline:
					'border border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] shadow-[var(--shadow-1)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] hover:bg-[var(--accent-soft)]',
				ghost:
					'border border-transparent bg-transparent text-[var(--ink-2)] shadow-none hover:bg-[var(--surface-2)]',
				destructive:
					'border border-[var(--error)] bg-[var(--error-soft)] text-[var(--error)] shadow-[var(--shadow-1)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] hover:-translate-y-0.5 hover:border-[var(--error)] hover:bg-[var(--error-soft)] hover:shadow-[var(--shadow-2)]',
				link: 'bg-transparent p-0 text-[var(--accent)] underline-offset-4 shadow-none hover:underline',
			},
			size: {
				default: 'h-10 px-5 py-2.5 gap-2',
				xs: 'h-7 rounded-md px-3 text-xs gap-1',
				sm: 'h-9 rounded-md px-4 text-xs gap-1.5',
				lg: 'h-12 rounded-full px-8 text-base gap-2',
				icon: 'size-10',
				'icon-sm': 'size-8',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

const Button = ({
	className,
	variant = 'default',
	size = 'default',
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
};

export { Button, buttonVariants };
