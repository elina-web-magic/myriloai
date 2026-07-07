'use client';

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
	attribute?: string;
	children: ReactNode;
	defaultTheme?: Theme;
	enableSystem?: boolean;
};

type ThemeContextValue = {
	resolvedTheme: Theme;
	setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = 'myrilo-theme';
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
	if (typeof window === 'undefined') {
		return 'dark';
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
	children,
	defaultTheme = 'dark',
	enableSystem = false,
}: ThemeProviderProps) {
	const [resolvedTheme, setResolvedTheme] = useState<Theme>(defaultTheme);

	useEffect(() => {
		Promise.resolve().then(() => {
			try {
				const storedTheme = window.localStorage.getItem(STORAGE_KEY);

				if (storedTheme === 'light' || storedTheme === 'dark') {
					setResolvedTheme(storedTheme);
					return;
				}
			} catch {}

			if (enableSystem) {
				setResolvedTheme(getSystemTheme());
			}
		});
	}, [enableSystem]);

	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		const rootElement = document.documentElement;

		rootElement.setAttribute('data-theme', resolvedTheme);
		rootElement.style.colorScheme = resolvedTheme;
	}, [resolvedTheme]);

	useEffect(() => {
		if (!enableSystem) {
			return;
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			try {
				const storedTheme = window.localStorage.getItem(STORAGE_KEY);

				if (storedTheme === 'light' || storedTheme === 'dark') {
					return;
				}
			} catch {}

			setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
		};

		handleChange();
		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [enableSystem]);

	const contextValue = useMemo<ThemeContextValue>(
		() => ({
			resolvedTheme,
			setTheme: (theme) => {
				setResolvedTheme(theme);

				try {
					window.localStorage.setItem(STORAGE_KEY, theme);
				} catch {}
			},
		}),
		[resolvedTheme]
	);

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const contextValue = useContext(ThemeContext);

	if (!contextValue) {
		throw new Error('useTheme must be used within ThemeProvider');
	}

	return contextValue;
}
