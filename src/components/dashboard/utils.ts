import type { DashboardResult } from '@/types';

export const getScoreColor = (score: number): string => {
	if (score >= 35) return 'text-[var(--success)] border-[var(--success)] bg-[var(--success-soft)]';
	if (score >= 25) return 'text-[var(--warning)] border-[var(--warning)] bg-[var(--warning-soft)]';
	return 'text-[var(--error)] border-[var(--error)] bg-[var(--error-soft)]';
};

export const getWidthClass = (score: number): string => {
	const w = Math.round(score) * 10;
	if (w === 0) return 'w-0';
	if (w === 10) return 'w-[10%]';
	if (w === 20) return 'w-[20%]';
	if (w === 30) return 'w-[30%]';
	if (w === 40) return 'w-[40%]';
	if (w === 50) return 'w-[50%]';
	if (w === 60) return 'w-[60%]';
	if (w === 70) return 'w-[70%]';
	if (w === 80) return 'w-[80%]';
	if (w === 90) return 'w-[90%]';
	if (w >= 100) return 'w-[100%]';
	return 'w-0';
};

export interface DimensionAvg {
	dimension: string;
	avg: number;
}

export const getDimensionFill = (avg: number): string => {
	if (avg >= 8) return '#10b981';
	if (avg >= 5) return '#f59e0b';
	return '#ef4444';
};

export const buildDimensionData = (reportData: DashboardResult[]) => {
	if (reportData.length === 0) return [];

	const totals: Record<string, { sum: number; count: number }> = {};

	for (const row of reportData) {
		for (const [dim, score] of Object.entries(row.scores)) {
			if (!totals[dim]) totals[dim] = { sum: 0, count: 0 };
			totals[dim].sum += score as number;
			totals[dim].count += 1;
		}
	}

	return Object.entries(totals).map(([dimension, { sum, count }]) => {
		const avg = Number((sum / count).toFixed(1));
		return {
			dimension: dimension.replace(/_/g, ' '),
			avg,
			fill: getDimensionFill(avg),
		};
	});
};
