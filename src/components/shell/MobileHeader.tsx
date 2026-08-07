'use client';

import { Menu, Terminal } from 'lucide-react';
import Image from 'next/image';
import logoSvg from '@/app/myrilo-ai-logo.svg';
import { Button } from '@/components/ui/button';
import { usePromptStore } from '@/lib/store/prompt-store';

export const MobileHeader = () => {
	const isMobileSidebarOpen = usePromptStore((state) => state.isMobileSidebarOpen);
	const setIsMobileSidebarOpen = usePromptStore((state) => state.setIsMobileSidebarOpen);

	const isMobileConsoleOpen = usePromptStore((state) => state.isMobileConsoleOpen);
	const setIsMobileConsoleOpen = usePromptStore((state) => state.setIsMobileConsoleOpen);

	return (
		<header className="mobile-header sticky top-0 z-40 flex w-full items-center justify-between border-b border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm glass lg:hidden">
			<Button
				variant="ghost"
				size="icon"
				className="mobile-header__menu-toggle"
				onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
				aria-label="Toggle navigation menu"
			>
				<Menu size={20} />
			</Button>

			<div className="mobile-header__brand flex items-center gap-2">
				<Image
					src={logoSvg}
					alt="Myrilo AI Logo"
					width={24}
					height={24}
					priority
					className="mobile-header__logo"
				/>
				<h1 className="mobile-header__title t-h5 text-gradient-heading m-0 whitespace-nowrap font-bold">
					Myrilo AI
				</h1>
			</div>

			<Button
				variant="ghost"
				size="icon"
				className="mobile-header__console-toggle"
				onClick={() => setIsMobileConsoleOpen(!isMobileConsoleOpen)}
				aria-label="Toggle console sidebar"
			>
				<Terminal size={20} />
			</Button>
		</header>
	);
};
