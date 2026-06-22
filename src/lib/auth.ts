import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/prisma';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
	throw new Error('Missing GITHUB_ID or GITHUB_SECRET environment variables');
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma as never),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.sub) {
				(session.user as { id?: string | null }).id = token.sub;
			}
			return session;
		},
	},
};
