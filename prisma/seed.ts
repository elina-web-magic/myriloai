import fs from 'node:fs';
import path from 'node:path';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '@/generated/prisma';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
	// 1. Ensure user exists
	const user = await prisma.user.upsert({
		where: { email: 'dev@myrilo.ai' },
		update: {},
		create: {
			name: 'Myrilo Developer',
			email: 'dev@myrilo.ai',
		},
	});

	// 2. Ensure project exists
	const project = await prisma.project.create({
		data: {
			name: 'Default Workspace',
			description: 'Main workspace for prompt engineering',
			userId: user.id,
		},
	});

	// 3. Seed Categories
	const categories = [
		'Code Generation',
		'Creative Writing',
		'Data Analysis',
		'Translation',
		'Roleplay',
		'Technical Writing',
		'Mathematics',
		'General',
	];
	for (const name of categories) {
		await prisma.category.upsert({
			where: { name },
			update: {},
			create: { name },
		});
	}

	// 4. Seed Prompt Snippets
	await prisma.promptSnippet.createMany({
		data: [
			{
				projectId: project.id,
				name: 'JSON Format Constraint',
				content:
					'Output strictly in valid JSON format. Do not use markdown code blocks or any other wrapping text. Only the JSON object.',
			},
			{
				projectId: project.id,
				name: 'Step-by-step Reasoning',
				content: 'Think step-by-step and show your reasoning before providing the final answer.',
			},
			{
				projectId: project.id,
				name: 'Expert Persona',
				content:
					'Act as a senior distinguished engineer with deep expertise in system architecture, performance optimization, and scalable design.',
			},
		],
	});

	// 5. Seed Dataset & Scenarios
	type ScenarioItem = {
		scenario: string;
		task_description: string;
		prompt_inputs: Record<string, string>;
		solution_criteria: string[];
	};

	const datasetPath = path.join(process.cwd(), 'evaluation-scripts', 'dataset_ailens.json');
	if (fs.existsSync(datasetPath)) {
		const rawData = fs.readFileSync(datasetPath, 'utf8');
		const scenarios = JSON.parse(rawData) as ScenarioItem[];

		await prisma.dataset.create({
			data: {
				name: 'AILens Benchmark Dataset',
				projectId: project.id,
				scenarios: {
					create: scenarios.map((s) => ({
						name: s.scenario,
						taskDescription: s.task_description,
						promptInputs: s.prompt_inputs,
						scoringMetrics: s.solution_criteria,
					})),
				},
			},
		});
	} else {
	}
}

main()
	.catch((_e) => {
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
