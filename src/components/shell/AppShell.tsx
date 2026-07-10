'use client';

import type { ReactNode } from 'react';
import { usePromptStore } from '@/lib/store/prompt-store';

interface AppShellProps {
	children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
	const isZoneCollapsed = usePromptStore((state) => state.isZoneCollapsed);

	const gridCols = isZoneCollapsed
		? 'lg:grid-cols-[5rem_minmax(0,1fr)_5rem]'
		: 'lg:grid-cols-[5rem_minmax(0,1.2fr)_minmax(22rem,0.7fr)]';

	return (
		<main className={`app h-screen relative z-10 overflow-hidden lg:grid ${gridCols}`}>
			{children}
		</main>
	);
};
