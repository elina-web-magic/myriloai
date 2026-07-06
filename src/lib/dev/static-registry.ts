import type { OutputData } from '@/components/dashboard/ResultsDashboard';

import fallbackData from '@/data/output.json';

type DashboardMockState = {
	reportData: OutputData[];
	source: 'demo';
};

// Explicit opt-in flag instead of relying on NODE_ENV alone: a misconfigured
// deploy target or test runner that leaves NODE_ENV=development set on a real
// deployment must not silently serve demo data as if it were live.
const ALLOW_MOCK_DATA = process.env.ALLOW_MOCK_DATA === 'true';

if (ALLOW_MOCK_DATA && process.env.NODE_ENV === 'production') {
	throw new Error('ALLOW_MOCK_DATA must never be enabled when NODE_ENV=production');
}

const isMockModeEnabled = (): boolean => ALLOW_MOCK_DATA;

const getDashboardMockState = (): DashboardMockState => {
	return {
		reportData: fallbackData as OutputData[],
		source: 'demo',
	};
};

export { getDashboardMockState, isMockModeEnabled };
