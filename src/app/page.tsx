import { ResultsDashboard } from '@/components/dashboard/ResultsDashboard';
import { AppShell } from '@/components/shell/AppShell';
import { ConsoleSidebar } from '@/components/shell/ConsoleSidebar';
import { MainContentColumn } from '@/components/shell/MainContentColumn';
import { Sidebar } from '@/components/shell/Sidebar';
import type { JsonValue } from '@/generated/prisma/runtime/client';
import { dashboardResultSchema } from '@/lib/contracts/evaluation';
import { getDashboardMockState, isMockModeEnabled } from '@/lib/dev/static-registry';
import { prisma } from '@/lib/prisma';
import type { DashboardResult } from '@/types';

type DashboardDataState = {
	reportData: DashboardResult[];
	source: 'demo' | 'live';
};

function getStringRecord(value: JsonValue): Record<string, string> {
	if (value === null || typeof value !== 'object' || Array.isArray(value)) {
		return {};
	}

	const entries = Object.entries(value);
	const stringEntries = entries.flatMap(([key, entryValue]) =>
		typeof entryValue === 'string' ? [[key, entryValue] as const] : []
	);

	return Object.fromEntries(stringEntries);
}

function getNumberRecord(value: JsonValue): Record<string, number> {
	if (value === null || typeof value !== 'object' || Array.isArray(value)) {
		return {};
	}

	const entries = Object.entries(value);
	const numberEntries = entries.flatMap(([key, entryValue]) =>
		typeof entryValue === 'number' ? [[key, entryValue] as const] : []
	);

	return Object.fromEntries(numberEntries);
}

function getStringArray(value: JsonValue): string[] {
	if (!Array.isArray(value)) {
		return [];
	}

	return value.filter((entryValue): entryValue is string => typeof entryValue === 'string');
}

async function getDashboardReportData(): Promise<DashboardDataState> {
	if (isMockModeEnabled()) {
		return getDashboardMockState();
	}

	const latestRun = await prisma.evaluationRun.findFirst({
		orderBy: { createdAt: 'desc' },
		include: {
			results: {
				include: {
					scenario: true,
				},
			},
		},
	});

	if (!latestRun || latestRun.results.length === 0) {
		return getDashboardMockState();
	}

	return {
		reportData: dashboardResultSchema.array().parse(
			latestRun.results.map((result) => ({
				output: result.sanitizedOutput ?? result.rawOutput,
				test_case: {
					scenario: result.scenario.name,
					prompt_inputs: getStringRecord(result.scenario.promptInputs),
					solution_criteria: getStringArray(result.scenario.scoringMetrics),
					task_description: result.scenario.taskDescription,
				},
				total_score: result.totalScore,
				scores: getNumberRecord(result.scores),
				reasoning: result.reasoning,
				strengths: [],
				weaknesses: [],
				failureLabels: result.failureLabels,
				injectionFlags: result.injectionFlags ? getStringArray(result.injectionFlags) : null,
			}))
		),
		source: 'live',
	};
}

export default async function Home() {
	const { reportData, source } = await getDashboardReportData();

	return (
		<AppShell>
			<Sidebar />
			<MainContentColumn>
				<ResultsDashboard reportData={reportData} dataSource={source} />
			</MainContentColumn>
			<ConsoleSidebar />
		</AppShell>
	);
}
