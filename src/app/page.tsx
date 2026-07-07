import { ResultsDashboard } from '@/components/dashboard/ResultsDashboard';
import { ConsoleSidebar } from '@/components/shell/ConsoleSidebar';
import { PromptInputZone } from '@/components/shell/PromptInputZone';
import { Sidebar } from '@/components/shell/Sidebar';
import { GlassCard } from '@/components/ui/glass-card';
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

import { MobileHeader } from '@/components/shell/MobileHeader';

export default async function Home() {
	const { reportData, source } = await getDashboardReportData();

	return (
		<main className="app flex flex-col lg:grid lg:grid-cols-[auto_1fr_auto] h-screen relative z-10 overflow-hidden">
			<Sidebar />

			<div className="app-wrapper h-full overflow-y-auto w-full max-w-7xl mx-auto flex flex-col">
				<MobileHeader />

				<div className="p-6 md:p-12 flex flex-col gap-4">
					<section
						className="app__composer-section flex flex-col gap-4"
						aria-labelledby="app-composer-title"
					>
						<PromptInputZone />
					</section>

					<GlassCard
						className="app__review-section flex flex-col gap-6 p-6 md:p-8 w-full max-w-7xl mx-auto"
						aria-labelledby="app-review-title"
					>
						<div className="app__section-header flex flex-col gap-2">
							<p className="app__section-eyebrow meta">Review Workspace</p>
							<div className="app__section-copy flex flex-col gap-1">
								<h2 id="app-review-title" className="app__section-title t-h2">
									Inspect run quality, scores, and raw output
								</h2>
								<p className="app__section-description lead max-w-3xl">
									This area is dashboard-first: scan scenarios, compare scores, and open raw model
									output only when you need detail.
								</p>
							</div>
						</div>

						<ResultsDashboard reportData={reportData} dataSource={source} />
					</GlassCard>
				</div>
			</div>
			<ConsoleSidebar />
		</main>
	);
}
