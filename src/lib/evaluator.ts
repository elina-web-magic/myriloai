import Anthropic from '@anthropic-ai/sdk';
import type { z } from 'zod';
import { evaluationParsedResponseSchema } from '@/lib/contracts/evaluation';
import { Logger } from '@/lib/logger/logger';
import { ConsoleSink } from '@/lib/logger/sinks';

const logger = new Logger({
	scope: 'lib:evaluator',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
});

// Initialize the Anthropic client lazily so it doesn't crash test environments immediately
let _anthropic: Anthropic | null = null;
function getAnthropicClient() {
	if (!_anthropic) {
		_anthropic = new Anthropic({
			apiKey: process.env.ANTHROPIC_API_KEY || '',
			dangerouslyAllowBrowser: process.env.NODE_ENV === 'test',
		});
	}
	return _anthropic;
}

/**
 * Parses the XML response from the judge model into a structured object
 * matching the evaluationParsedResponseSchema.
 */
export function parseEvaluationXML(
	xmlString: string
): z.infer<typeof evaluationParsedResponseSchema> {
	// Helper to extract text between tags
	const extractTag = (xml: string, tag: string): string | null => {
		const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 's');
		const match = xml.match(regex);
		return match ? match[1].trim() : null;
	};

	// Helper to extract all list items within a parent tag
	const extractList = (xml: string, parentTag: string, childTag: string): string[] => {
		const parentContent = extractTag(xml, parentTag);
		if (!parentContent) return [];

		const regex = new RegExp(`<${childTag}>(.*?)</${childTag}>`, 'sg');
		const matches = Array.from(parentContent.matchAll(regex));
		return matches.map((m) => m[1].trim()).filter(Boolean);
	};

	const reasoning = extractTag(xmlString, 'reasoning');
	const summary = extractTag(xmlString, 'summary');
	const scoreStr = extractTag(xmlString, 'score');
	const risks = extractList(xmlString, 'risks', 'risk');
	const mitigations = extractList(xmlString, 'mitigations', 'mitigation');

	if (!reasoning || !summary || !scoreStr) {
		throw new Error(
			'Failed to parse evaluation XML: missing required reasoning, summary, or score tags'
		);
	}

	const score = parseInt(scoreStr, 10);
	if (Number.isNaN(score)) {
		throw new Error('Failed to parse evaluation XML: score is not a valid number');
	}

	const parsed = {
		summary: summary,
		topRisks: risks,
		mitigations: mitigations,
		score: score,
	};

	return evaluationParsedResponseSchema.parse(parsed);
}

/**
 * Generates the raw output from the target model based on the provided prompt.
 */
export async function generateOutput(
	model: string,
	systemPrompt: string,
	userPrompt: string
): Promise<string> {
	const client = getAnthropicClient();

	try {
		const response = await client.messages.create({
			model: model,
			max_tokens: 4096,
			system: systemPrompt,
			messages: [{ role: 'user', content: userPrompt }],
		});

		if (response.content[0].type === 'text') {
			return response.content[0].text;
		}
		return '';
	} catch (error) {
		logger.error('Anthropic API Error (generateOutput)', {}, error);
		throw error;
	}
}

/**
 * Evaluates a raw response using a judge model and returns the parsed XML results.
 */
export async function evaluateResponse(
	judgeModel: string,
	taskDescription: string | undefined,
	scoringMetrics: string[],
	rawResponse: string,
	overrides: { instruction: string; priority: number }[] = []
): Promise<z.infer<typeof evaluationParsedResponseSchema>> {
	const client = getAnthropicClient();

	const sortedOverrides = [...overrides].sort((a, b) => b.priority - a.priority);

	const systemPrompt = `You are an expert AI judge evaluating a model's response.
You must objectively score the response against the following criteria:
${scoringMetrics.map((m) => `- ${m}`).join('\n')}

${taskDescription ? `The task description is:\n${taskDescription}\n` : ''}
${
	sortedOverrides.length > 0
		? `\nCRITICAL OVERRIDES (Highest priority must be respected first):\n${sortedOverrides
				.map((o) => `- ${o.instruction}`)
				.join('\n')}\n`
		: ''
}

Your only output should be a single XML block following exactly this structure:
<evaluation>
  <reasoning>Detailed step-by-step reasoning evaluating each metric.</reasoning>
  <summary>Short summary of the response quality.</summary>
  <risks>
    <risk>Risk 1</risk>
  </risks>
  <mitigations>
    <mitigation>Mitigation 1</mitigation>
  </mitigations>
  <score>Numeric score out of 40</score>
</evaluation>

Important:
- Provide ONLY the XML. Do not use markdown wrappers.
- If there are no risks, omit the <risks> and <mitigations> blocks entirely or leave them empty.
- Ensure the score is an integer between 0 and 40.
`;

	const userPrompt = `Evaluate the following untrusted response:
<untrusted_content>
${rawResponse}
</untrusted_content>
`;

	try {
		const response = await client.messages.create({
			model: judgeModel,
			max_tokens: 4096,
			system: systemPrompt,
			messages: [{ role: 'user', content: userPrompt }],
		});

		if (response.content[0].type === 'text') {
			return parseEvaluationXML(response.content[0].text);
		}
		throw new Error('Unexpected response format from Judge model');
	} catch (error) {
		logger.error('Anthropic API Error (evaluateResponse)', {}, error);
		throw error;
	}
}
