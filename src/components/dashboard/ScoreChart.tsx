'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { DashboardResult } from '@/types';
import { SCORE_COLORS, SCORE_THRESHOLDS } from './constants';
import { buildDimensionData } from './utils';

type DimensionAvg = { dimension: string; avg: number; fill: string };

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

export const ScoreChart = ({ reportData }: { reportData: DashboardResult[] }) => {
	const data = buildDimensionData(reportData);

	if (data.length === 0) return null;

	return (
		<div className="score-chart flex flex-col gap-3">
			<div className="score-chart__header flex items-center justify-between">
				<p className="score-chart__title meta">Avg Score by Dimension</p>
				<div className="score-chart__legend flex items-center gap-3 text-[11px] text-[#64748b]">
					<span className="flex items-center gap-1">
						<span
							className="inline-block h-2 w-2 rounded-sm"
							style={{ backgroundColor: SCORE_COLORS.GOOD }}
						/>
						≥{SCORE_THRESHOLDS.GOOD}
					</span>
					<span className="flex items-center gap-1">
						<span
							className="inline-block h-2 w-2 rounded-sm"
							style={{ backgroundColor: SCORE_COLORS.WARNING }}
						/>
						{SCORE_THRESHOLDS.WARNING}–{SCORE_THRESHOLDS.GOOD - 1}
					</span>
					<span className="flex items-center gap-1">
						<span
							className="inline-block h-2 w-2 rounded-sm"
							style={{ backgroundColor: SCORE_COLORS.CRITICAL }}
						/>
						&lt;{SCORE_THRESHOLDS.WARNING}
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
					<Bar
						dataKey="avg"
						shape={(props: unknown) => {
							const { fill, payload, ...rest } = props as Record<string, unknown> & {
								payload: { fill: string };
							};
							return <Rectangle {...rest} fill={payload.fill} radius={[4, 4, 0, 0]} />;
						}}
						maxBarSize={40}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
