import type { OutputData } from '@/components/dashboard/ResultsDashboard';

import fallbackData from '@/data/output.json';

type DashboardMockState = {
	reportData: OutputData[];
	source: 'demo';
};

const getDashboardMockState = (): DashboardMockState => {
	return {
		reportData: fallbackData as OutputData[],
		source: 'demo',
	};
};

export { getDashboardMockState };
