'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import type { DialogProps } from './types';

// ─── Root ─────────────────────────────────────────────────────────────────────

const DialogRoot = DialogPrimitive.Root;

// ─── Trigger ──────────────────────────────────────────────────────────────────

const DialogTrigger = DialogPrimitive.Trigger;

// ─── Portal ───────────────────────────────────────────────────────────────────

const DialogPortal = DialogPrimitive.Portal;

// ─── Backdrop ─────────────────────────────────────────────────────────────────

const DialogBackdrop = ({
	className,
	...props
}: ComponentProps<typeof DialogPrimitive.Backdrop>) => (
	<DialogPrimitive.Backdrop
		data-slot="dialog-backdrop"
		className={cn(
			'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
			'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 transition-opacity duration-200',
			className
		)}
		{...props}
	/>
);

// ─── Popup ────────────────────────────────────────────────────────────────────

const DialogPopup = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Popup>) => (
	<DialogPrimitive.Popup
		data-slot="dialog-popup"
		className={cn(
			// layout
			'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
			'w-[calc(100vw-2rem)] max-w-lg',
			// Aurora Glass surface
			'rounded-[var(--radius-xl)] border border-[var(--line)] bg-[var(--surface)]',
			'[backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]',
			'shadow-[var(--shadow-3)]',
			// enter / exit animations
			'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
			'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
			'transition-[opacity,transform] duration-200',
			className
		)}
		{...props}
	/>
);

// ─── Header ───────────────────────────────────────────────────────────────────

const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
	<div
		data-slot="dialog-header"
		className={cn(
			'dialog__header flex items-start justify-between gap-4 border-b border-[var(--line)] px-6 py-5',
			className
		)}
		{...props}
	/>
);

// ─── Title ────────────────────────────────────────────────────────────────────

const DialogTitle = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) => (
	<DialogPrimitive.Title
		data-slot="dialog-title"
		className={cn('dialog__title t-h5 text-[var(--ink)]', className)}
		{...props}
	/>
);

// ─── Description ──────────────────────────────────────────────────────────────

const DialogDescription = ({
	className,
	...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
	<DialogPrimitive.Description
		data-slot="dialog-description"
		className={cn('dialog__description t-small text-[var(--ink-3)]', className)}
		{...props}
	/>
);

// ─── Close ────────────────────────────────────────────────────────────────────

const DialogClose = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Close>) => (
	<DialogPrimitive.Close
		data-slot="dialog-close"
		aria-label="Close dialog"
		className={cn(
			'dialog__close inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full',
			'border border-transparent text-[var(--ink-3)] transition-colors',
			'hover:border-[var(--line)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]',
			'focus-visible:ring-2 focus-visible:ring-[color:var(--accent-soft)] outline-none',
			className
		)}
		{...props}
	>
		<X size={16} />
	</DialogPrimitive.Close>
);

// ─── Body ─────────────────────────────────────────────────────────────────────

const DialogBody = ({ className, ...props }: ComponentProps<'div'>) => (
	<div
		data-slot="dialog-body"
		className={cn('dialog__body flex flex-col gap-4 px-6 py-5', className)}
		{...props}
	/>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const DialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
	<div
		data-slot="dialog-footer"
		className={cn(
			'dialog__footer flex flex-wrap items-center justify-end gap-3 border-t border-[var(--line)] px-6 py-4',
			className
		)}
		{...props}
	/>
);

// ─── Composed helper: Dialog (wraps Portal + Backdrop + Popup) ────────────────

/**
 * Convenience wrapper that handles Portal + Backdrop + Popup boilerplate.
 *
 * Usage:
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogHeader>
 *     <DialogTitle>Title</DialogTitle>
 *     <DialogClose />
 *   </DialogHeader>
 *   <DialogBody>…</DialogBody>
 *   <DialogFooter>…</DialogFooter>
 * </Dialog>
 * ```
 */
const Dialog = ({ open, onOpenChange, children, className }: DialogProps) => (
	<DialogRoot open={open} onOpenChange={onOpenChange}>
		<DialogPortal>
			<DialogBackdrop />
			<DialogPopup className={className}>{children}</DialogPopup>
		</DialogPortal>
	</DialogRoot>
);

export {
	Dialog,
	DialogBackdrop,
	DialogBody,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPopup,
	DialogPortal,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
};
