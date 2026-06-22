'use client';

import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import logoSvg from '@/app/myrilo-ai-logo.svg';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';

export function HeaderBar() {
	const { resolvedTheme, setTheme } = useTheme();

	const activeTheme = resolvedTheme === 'light' ? 'light' : 'dark';
	const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
	const ThemeIcon = activeTheme === 'dark' ? Sun : Moon;
	const toggleLabel = activeTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
	const mobileTooltipLabel = activeTheme === 'dark' ? 'Light theme' : 'Dark theme';

	return (
		<header className="header-bar card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
			<div className="header-bar__identity flex flex-col gap-2">
				<div className="header-bar__brand flex items-center gap-3">
					<div className="header-bar__logo-icon flex items-center justify-center">
						<Image src={logoSvg} alt="Myrilo AI Logo" width={48} height={48} priority />
					</div>
					<div className="header-bar__brand-copy flex flex-col gap-1">
						<h1 className="header-bar__title t-h1 text-gradient-1">Myrilo AI</h1>
						<p className="header-bar__tagline lead">Your Agentic LLM Evaluation Platform</p>
					</div>
				</div>
			</div>

			<div className="header-bar__actions flex w-full items-center justify-end gap-3 md:w-auto">
				<div className="header-bar__theme-toggle-group group relative">
					<Button
						onClick={() => setTheme(nextTheme)}
						variant="secondary"
						size="icon"
						className="header-bar__theme-toggle size-11 border-[rgba(255,255,255,0.55)] bg-[rgba(255,255,255,0.3)] text-[var(--ink)] shadow-[0_10px_24px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.36)] hover:bg-[rgba(255,255,255,0.38)] focus-visible:ring-[var(--ring)]"
						aria-label={toggleLabel}
						aria-pressed={activeTheme === 'light'}
					>
						<ThemeIcon
							size={18}
							className={
								activeTheme === 'dark'
									? 'header-bar__theme-icon header-bar__theme-icon--light text-[var(--warning)]'
									: 'header-bar__theme-icon header-bar__theme-icon--dark text-[var(--accent)]'
							}
						/>
					</Button>
					<span className="header-bar__theme-tooltip pointer-events-none absolute right-0 bottom-full z-10 mb-2 rounded-md border border-[var(--line-strong)] bg-[var(--surface)] px-2 py-1 text-xs whitespace-nowrap text-[var(--ink)] opacity-0 shadow-[var(--shadow-2)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
						<span className="hidden sm:inline">{toggleLabel}</span>
						<span className="sm:hidden">{mobileTooltipLabel}</span>
					</span>
				</div>
			</div>
		</header>
	);
}
