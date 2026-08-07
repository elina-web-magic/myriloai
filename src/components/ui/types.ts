import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { badgeVariants } from './badge';

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

export interface DialogProps {
	/** Controlled or uncontrolled open state. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Everything rendered inside the popup. */
	children: ReactNode;
	className?: string;
}

export type LabelConfig = {
	label: string;
	colorClass: string;
};

export type UncertaintyBadgeProps = {
	labels: string[];
	className?: string;
};
