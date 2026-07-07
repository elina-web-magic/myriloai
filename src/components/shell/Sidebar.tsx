'use client';

import { Moon, PanelLeftClose, PanelLeftOpen, Sun } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import logoSvg from '@/app/myrilo-ai-logo.svg';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { usePromptStore } from '@/lib/store/prompt-store';

export function Sidebar() {
	const { resolvedTheme, setTheme } = useTheme();
	const [isCollapsed, setIsCollapsed] = useState(true);

	const isMobileSidebarOpen = usePromptStore((state) => state.isMobileSidebarOpen);
	const setIsMobileSidebarOpen = usePromptStore((state) => state.setIsMobileSidebarOpen);

	const activeTheme = resolvedTheme === 'light' ? 'light' : 'dark';
	const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
	const ThemeIcon = activeTheme === 'dark' ? Sun : Moon;
	const toggleLabel = activeTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
	const mobileTooltipLabel = activeTheme === 'dark' ? 'Light theme' : 'Dark theme';

	return (
		<>
			{/* Mobile Overlay */}
			<div
				className={`fixed inset-0 z-40 bg-[rgba(2,6,23,0.5)] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
					isMobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsMobileSidebarOpen(false)}
				aria-hidden="true"
			/>

			<aside
				className={`sidebar fixed lg:sticky left-0 top-0 z-50 flex h-screen flex-col border-r border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-3)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] transition-all duration-300 ${
					isCollapsed ? 'lg:w-20' : 'lg:w-80'
				} w-80 lg:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
			>
				<div
					className={`sidebar__header flex p-4 transition-all ${isCollapsed ? 'lg:flex-col lg:gap-4 lg:items-center items-center justify-between' : 'items-center justify-between'}`}
				>
					<div className="sidebar__brand flex items-center gap-3 overflow-hidden">
						<div className="sidebar__logo-icon shrink-0">
							<Image src={logoSvg} alt="Myrilo AI Logo" width={32} height={32} priority />
						</div>
						<div
							className={`sidebar__brand-copy flex flex-col transition-all duration-300 ${
								isCollapsed
									? 'lg:hidden lg:w-0 lg:opacity-0 w-auto opacity-100'
									: 'w-auto opacity-100'
							}`}
						>
							<h1 className="sidebar__title t-h2 text-gradient-heading whitespace-nowrap">
								Myrilo AI
							</h1>
						</div>
					</div>

					<Button
						onClick={() => setIsCollapsed(!isCollapsed)}
						variant="ghost"
						size="icon"
						className="sidebar__toggle shrink-0 hidden lg:inline-flex"
						aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
					>
						{isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
					</Button>
				</div>

				<div className="sidebar__content flex-1 overflow-y-auto p-4">
					{/* Navigation links or other content can go here in the future */}
				</div>

				<div
					className={`sidebar__footer flex p-4 ${isCollapsed ? 'lg:justify-center justify-start' : 'justify-start'}`}
				>
					<div className="sidebar__theme-toggle-group group relative">
						<Button
							onClick={() => setTheme(nextTheme)}
							variant="secondary"
							size="icon"
							className="sidebar__theme-toggle size-11 border-[rgba(255,255,255,0.55)] bg-[rgba(255,255,255,0.3)] text-[var(--ink)] shadow-[0_10px_24px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.36)] hover:bg-[rgba(255,255,255,0.38)] focus-visible:ring-[var(--ring)]"
							aria-label={toggleLabel}
							aria-pressed={activeTheme === 'light'}
						>
							<ThemeIcon
								size={18}
								className={
									activeTheme === 'dark'
										? 'sidebar__theme-icon sidebar__theme-icon--light text-[var(--warning)]'
										: 'sidebar__theme-icon sidebar__theme-icon--dark text-[var(--accent)]'
								}
							/>
						</Button>
						<span className="sidebar__theme-tooltip pointer-events-none absolute right-0 bottom-full z-10 mb-2 rounded-md border border-[var(--line-strong)] bg-[var(--surface)] px-2 py-1 text-xs whitespace-nowrap text-[var(--ink)] opacity-0 shadow-[var(--shadow-2)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
							<span className="hidden sm:inline">{toggleLabel}</span>
							<span className="sm:hidden">{mobileTooltipLabel}</span>
						</span>
					</div>
				</div>
			</aside>
		</>
	);
}
