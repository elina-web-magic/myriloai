import * as React from 'react';
import { cn } from '@/lib/utils';

const GlassCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		interactive?: boolean;
	}
>(({ className, interactive, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				'rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-3)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]',
				interactive &&
					'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] hover:shadow-[var(--shadow-interactive)]',
				className
			)}
			{...props}
		/>
	);
});
GlassCard.displayName = 'GlassCard';

const GlassCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
	)
);
GlassCardHeader.displayName = 'GlassCardHeader';

const GlassCardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3 ref={ref} className={cn('t-h3 text-gradient-accent', className)} {...props} />
));
GlassCardTitle.displayName = 'GlassCardTitle';

const GlassCardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('t-small', className)} style={{ color: 'var(--ink-3)' }} {...props} />
));
GlassCardDescription.displayName = 'GlassCardDescription';

const GlassCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
	)
);
GlassCardContent.displayName = 'GlassCardContent';

const GlassCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
	)
);
GlassCardFooter.displayName = 'GlassCardFooter';

export {
	GlassCard,
	GlassCardContent,
	GlassCardDescription,
	GlassCardFooter,
	GlassCardHeader,
	GlassCardTitle,
};
