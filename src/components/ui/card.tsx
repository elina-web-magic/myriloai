import type * as React from 'react';

import { cn } from '@/lib/utils';

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			data-slot="card"
			className={cn(
				'rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-3)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]',
				className
			)}
			{...props}
		/>
	);
};

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div data-slot="card-header" className={cn('flex flex-col gap-2 p-6', className)} {...props} />
	);
};

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h3 data-slot="card-title" className={cn('t-h4 text-[var(--ink)]', className)} {...props} />
	);
};

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
	return (
		<p
			data-slot="card-description"
			className={cn('text-sm text-[var(--ink-3)]', className)}
			{...props}
		/>
	);
};

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return <div data-slot="card-content" className={cn('p-6 pt-0', className)} {...props} />;
};

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			data-slot="card-footer"
			className={cn('flex items-center p-6 pt-0', className)}
			{...props}
		/>
	);
};

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
