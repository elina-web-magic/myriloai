import type { OutputData } from '@/components/dashboard/ResultsDashboard';
import { ResultsDashboard } from '@/components/dashboard/ResultsDashboard';
import { HeaderBar } from '@/components/shell/HeaderBar';
import { PromptInputZone } from '@/components/shell/PromptInputZone';
import type { JsonValue } from '@/generated/prisma/runtime/client';
import { getDashboardMockState } from '@/lib/dev/static-registry';
import { prisma } from '@/lib/prisma';
import fallbackData from '../data/output.json';

type DashboardDataState = {
	reportData: OutputData[];
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
	if (process.env.NODE_ENV === 'development') {
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
		return {
			reportData: fallbackData as OutputData[],
			source: 'demo',
		};
	}

	return {
		reportData: latestRun.results.map((result) => ({
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
		})),
		source: 'live',
	};
}

export default async function Home() {
	const { reportData, source } = await getDashboardReportData();

	return (
		<main className="app min-h-screen p-6 md:p-12 lg:p-24 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
			<HeaderBar />

			<section
				className="app__composer-section flex flex-col gap-4"
				aria-labelledby="app-composer-title"
			>
				<div className="app__section-header flex flex-col gap-2">
					<p className="app__section-eyebrow meta">Compose Run</p>
					<div className="app__section-copy flex flex-col gap-1">
						<h2 id="app-composer-title" className="app__section-title t-h2">
							Write the next prompt to evaluate
						</h2>
						<p className="app__section-description lead max-w-3xl">
							Use this area to compose the next run. Evaluation results appear separately in the
							review workspace below.
						</p>
					</div>
				</div>

				<PromptInputZone />
			</section>

			<section
				className="app__review-section flex flex-col gap-4"
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
			</section>
		</main>
	);
}
