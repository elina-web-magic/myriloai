import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	serverExternalPackages: [
		'@prisma/client',
		'prisma',
		'@prisma/client-runtime-utils',
		'@/generated/prisma',
	],
};

export default nextConfig;
