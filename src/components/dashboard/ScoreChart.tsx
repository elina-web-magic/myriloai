'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { DashboardResult } from '@/types';

type DimensionAvg = { dimension: string; avg: number; fill: string };

function getDimensionFill(avg: number): string {
	if (avg >= 8) return '#10b981';
	if (avg >= 5) return '#f59e0b';
	return '#ef4444';
}

function buildDimensionData(reportData: DashboardResult[]): DimensionAvg[] {
	if (reportData.length === 0) return [];

	const totals: Record<string, { sum: number; count: number }> = {};

	for (const row of reportData) {
		for (const [dim, score] of Object.entries(row.scores)) {
			if (!totals[dim]) totals[dim] = { sum: 0, count: 0 };
			totals[dim].sum += score;
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
}

const CustomTooltip = ({
	active,
	payload,
}: {
	active?: boolean;
	payload?: Array<{ value: number; payload: DimensionAvg }>;
}) => {
	if (!active || !payload?.length) return null;
	const { dimension, avg } = payload[0].payload;
	return (
		<div className="score-chart__tooltip rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2 shadow-xl">
			<p className="score-chart__tooltip-dim text-xs font-semibold text-[#94a3b8]">{dimension}</p>
			<p className="score-chart__tooltip-val font-mono text-sm font-bold text-white">
				{avg} <span className="font-normal text-[#64748b]">/ 10</span>
			</p>
		</div>
	);
};

export function ScoreChart({ reportData }: { reportData: DashboardResult[] }) {
	const data = buildDimensionData(reportData);

	if (data.length === 0) return null;

	return (
		<div className="score-chart flex flex-col gap-3">
			<div className="score-chart__header flex items-center justify-between">
				<p className="score-chart__title meta">Avg Score by Dimension</p>
				<div className="score-chart__legend flex items-center gap-3 text-[11px] text-[#64748b]">
					<span className="flex items-center gap-1">
						<span className="inline-block h-2 w-2 rounded-sm bg-[#10b981]" />
						≥8
					</span>
					<span className="flex items-center gap-1">
						<span className="inline-block h-2 w-2 rounded-sm bg-[#f59e0b]" />
						5–7
					</span>
					<span className="flex items-center gap-1">
						<span className="inline-block h-2 w-2 rounded-sm bg-[#ef4444]" />
						&lt;5
					</span>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={180}>
				<BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
					<XAxis
						dataKey="dimension"
						tick={{ fontSize: 10, fill: '#64748b' }}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						domain={[0, 10]}
						ticks={[0, 5, 10]}
						tick={{ fontSize: 10, fill: '#64748b' }}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
					<Bar dataKey="avg" radius={[4, 4, 0, 0]} maxBarSize={40}>
						{data.map((entry) => (
							<Cell key={entry.dimension} fill={entry.fill} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
