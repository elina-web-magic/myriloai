import type { DashboardResult } from '@/types';

export type OutputData = DashboardResult;

export interface ResultsDashboardProps {
	reportData: OutputData[];
	dataSource: 'demo' | 'live';
}
