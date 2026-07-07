import { NextResponse } from 'next/server';
import { evaluationRequestSchema } from '@/lib/contracts/evaluation';
import { getMockEvaluationSubmitState, isMockModeEnabled } from '@/lib/dev/static-registry';
import { ERRORS } from '@/lib/errors';
import { evaluateResponse, generateOutput } from '@/lib/evaluator';
import { Logger } from '@/lib/logger/logger';
import { ConsoleSink } from '@/lib/logger/sinks';
import { prisma } from '@/lib/prisma';

const logger = new Logger({
	scope: 'api:posts',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
});

export async function POST(req: Request) {
	const requestId = crypto.randomUUID();
	const log = logger.child({ requestId });

	try {
		const body = await req.json();
		const parsedRequest = evaluationRequestSchema.parse(body);

		// Short-circuit to mock data if running in dev with ALLOW_MOCK_DATA
		if (isMockModeEnabled()) {
			const mockState = getMockEvaluationSubmitState(parsedRequest);
			return NextResponse.json(mockState);
		}

		// 1. Retrieve project context (assume first active project for MVP)
		const project = await prisma.project.findFirst();
		if (!project) {
			throw new Error('No active project found in database.');
		}

		// 2. Retrieve scenario context
		const scenario = await prisma.scenario.findFirst({
			where: { dataset: { projectId: project.id }, name: parsedRequest.dataset },
		});
		if (!scenario) {
			throw new Error(`Scenario not found: ${parsedRequest.dataset}`);
		}

		const overrides = await prisma.evaluatorOverride.findMany({
			where: { projectId: project.id, isActive: true },
			select: { instruction: true, priority: true },
		});

		// 3. Generate raw output from target model
		const systemPrompt = parsedRequest.projectInstructions || 'You are a helpful assistant.';
		const rawOutput = await generateOutput(parsedRequest.model, systemPrompt, parsedRequest.prompt);

		// 4. Evaluate output using Judge model
		let scoringMetrics: string[] = [];
		if (Array.isArray(scenario.scoringMetrics)) {
			scoringMetrics = scenario.scoringMetrics.filter((m) => typeof m === 'string') as string[];
		}

		const judgeModels = [
			'claude-3-5-sonnet-20241022',
			'claude-3-5-haiku-20241022',
			'claude-3-haiku-20240307',
		];
		const parsedResponse = await evaluateResponse(
			judgeModels,
			scenario.taskDescription,
			scoringMetrics,
			rawOutput,
			overrides
		);

		// 5. Persist Run and Result to Database
		const run = await prisma.evaluationRun.create({
			data: {
				projectId: project.id,
				status: 'COMPLETED',
				promptSnapshot: {
					systemPrompt,
					userPrompt: parsedRequest.prompt,
				},
				model: parsedRequest.model,
				judgeModel: 'poll-anthropic-v1',
				maxTotalTokens: 8000,
				results: {
					create: [
						{
							scenarioId: scenario.id,
							rawOutput,
							totalScore: parsedResponse.score,
							scores: { overall: parsedResponse.score },
							reasoning: parsedResponse.summary,
							rubricSnapshot: scenario.scoringMetrics
								? JSON.parse(JSON.stringify(scenario.scoringMetrics))
								: [],
						},
					],
				},
			},
		});

		// 6. Return standard EvaluationResponse
		const resultPayload = {
			response: {
				runId: run.id,
				scenario: scenario.name,
				rawResponse: rawOutput,
				parsedResponse,
			},
			source: 'live',
		};

		return NextResponse.json(resultPayload);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'An unexpected error occurred during evaluation';

		log.error(`Cannot get AI result: ${message}`);

		// Return StandardizedError format
		const stdError = ERRORS.INTERNAL_ERROR(message);
		return NextResponse.json(stdError, { status: 500 });
	}
}
