import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shadow-sm",
	{
		variants: {
			variant: {
				default:
					'bg-[image:var(--accent-gradient)] text-white border border-white/20 shadow-[0_4px_12px_rgba(4,120,87,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(4,120,87,0.4)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]',
				secondary:
					'text-foreground border-[var(--line-strong)] hover:border-[var(--ink-3)] bg-transparent',
				outline: 'border-accent text-accent bg-transparent shadow-none hover:bg-accent/10',
				ghost: 'hover:bg-[var(--surface-2)] text-[var(--ink-2)] bg-transparent shadow-none',
				destructive:
					'bg-[image:linear-gradient(135deg,#ef4444,#7f1d1d)] text-white border border-white/20 shadow-[0_4px_12px_rgba(239,68,68,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(239,68,68,0.4)]',
				link: 'text-accent underline-offset-4 hover:underline shadow-none bg-transparent p-0',
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
)

function Button({
	className,
	variant = 'default',
	size = 'default',
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
