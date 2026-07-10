import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Myrilo AI',
	description: 'Prompt evaluation',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<head>
				<script>
					{`
						(function() {
							try {
								var storedTheme = window.localStorage.getItem('myrilo-theme');
								if (storedTheme === 'light' || storedTheme === 'dark') {
									document.documentElement.setAttribute('data-theme', storedTheme);
									document.documentElement.style.colorScheme = storedTheme;
								} else {
									document.documentElement.setAttribute('data-theme', 'dark');
									document.documentElement.style.colorScheme = 'dark';
								}
							} catch (e) {}
						})();
					`}
				</script>
			</head>
			<body className="min-h-full flex flex-col" suppressHydrationWarning>
				<ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
