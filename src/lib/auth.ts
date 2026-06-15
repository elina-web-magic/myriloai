import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
	// biome-ignore lint/suspicious/noExplicitAny: NextAuth v4 adapter type mismatch
	adapter: PrismaAdapter(prisma) as any,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || 'mock_id',
			clientSecret: process.env.GITHUB_SECRET || 'mock_secret',
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.sub) {
				;(session.user as { id?: string | null }).id = token.sub
			}
			return session
		},
	},
}
