import type { DashboardResult } from '@/types';

export interface DimensionAvg {
	dimension: string;
	avg: number;
	fill: string;
}

export type OutputData = DashboardResult;

export interface ResultsDashboardProps {
	reportData: OutputData[];
	dataSource: 'demo' | 'live';
}
