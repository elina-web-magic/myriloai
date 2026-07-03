import type { Story } from '@ladle/react';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import {
	DialogBackdrop,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPopup,
	DialogPortal,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from './dialog';
import { GlassCard } from './glass-card';
import { Input } from './input';
import { Textarea } from './textarea';

export const Buttons: Story = () => (
	<div className="flex flex-col gap-4 p-8">
		<div className="flex gap-4 items-center">
			<Button variant="default">Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
		<div className="flex gap-4 items-center">
			<Button variant="default" size="sm">
				Small
			</Button>
			<Button variant="default" size="default">
				Default
			</Button>
			<Button variant="default" size="lg">
				Large
			</Button>
			<Button variant="default" size="icon">
				Icon
			</Button>
		</div>
	</div>
);

export const Badges: Story = () => (
	<div className="flex gap-4 p-8">
		<Badge variant="default">Default</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="outline">Outline</Badge>
	</div>
);

export const FormInputs: Story = () => (
	<div className="flex flex-col gap-6 p-8 max-w-sm">
		<div className="flex flex-col gap-2">
			<label className="text-sm font-medium">Standard Input</label>
			<Input placeholder="Text input..." />
		</div>
		<div className="flex flex-col gap-2">
			<label className="text-sm font-medium">Disabled Input</label>
			<Input disabled placeholder="Disabled input..." />
		</div>
		<div className="flex flex-col gap-2">
			<label className="text-sm font-medium">Textarea</label>
			<Textarea placeholder="Type your message here..." />
		</div>
		<div className="flex flex-col gap-2">
			<label className="text-sm font-medium">Disabled Textarea</label>
			<Textarea disabled placeholder="Disabled textarea..." />
		</div>
	</div>
);

export const Cards: Story = () => (
	<div className="flex flex-col gap-8 p-8 max-w-lg">
		<Card>
			<CardHeader>
				<CardTitle>Standard Card</CardTitle>
				<CardDescription>This is a standard shadcn card.</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm">Card content goes here.</p>
			</CardContent>
			<CardFooter>
				<Button>Action</Button>
			</CardFooter>
		</Card>

		<GlassCard>
			<CardHeader>
				<CardTitle>Glass Card</CardTitle>
				<CardDescription>Aurora Glass styled card.</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm">This uses our custom glass styling tokens.</p>
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Button variant="ghost">Cancel</Button>
				<Button variant="secondary">Save</Button>
			</CardFooter>
		</GlassCard>
	</div>
);

export const Dialogs: Story = () => (
	<div className="p-8">
		<DialogRoot>
			<DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
			<DialogPortal>
				<DialogBackdrop />
				<DialogPopup>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your account.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<Input placeholder="Type confirmation..." />
					</div>
					<DialogFooter>
						<DialogClose render={<Button variant="ghost">Cancel</Button>} />
						<Button variant="default">Confirm</Button>
					</DialogFooter>
				</DialogPopup>
			</DialogPortal>
		</DialogRoot>
	</div>
);
