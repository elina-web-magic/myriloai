import type { FailureLabel } from '@/types';

// Minimum character length for reasoning to be considered evidenced.
const REASONING_MIN_LENGTH = 100;

// Maximum characters stored as sanitizedOutput in DB (avoids unbounded blobs).
const MAX_OUTPUT_LENGTH = 32_000;

/**
 * Removes null bytes and non-printable control characters from a string,
 * then truncates to MAX_OUTPUT_LENGTH.
 *
 * Safe to use server-side before DB persistence and client-side before rendering.
 * Built via String.fromCharCode to avoid Biome noControlCharactersInRegex rule.
 * Strips C0 (U+0000-U+0008, U+000B, U+000C, U+000E-U+001F), DEL (U+007F),
 * and C1 (U+0080-U+009F). Preserves tab (U+0009), LF (U+000A), CR (U+000D).
 */
const buildControlCharRe = (): RegExp => {
	const c = String.fromCharCode;
	const ranges = `${c(0x00)}-${c(0x08)}${c(0x0b)}${c(0x0c)}${c(0x0e)}-${c(0x1f)}${c(0x7f)}-${c(0x9f)}`;
	return new RegExp(`[${ranges}]`, 'g');
};
const CONTROL_CHAR_RE = buildControlCharRe();

export const sanitizeText = (text: string): string => {
	const cleaned = text.replace(CONTROL_CHAR_RE, '');
	return cleaned.length > MAX_OUTPUT_LENGTH
		? `${cleaned.slice(0, MAX_OUTPUT_LENGTH)}\n[output truncated]`
		: cleaned;
};

/**
 * Wraps a parse attempt with a single retry on failure.
 * Returns the parsed result and whether a retry was required.
 */
export const parseWithRetry = <T>(parse: () => T): { result: T; didRetry: boolean } => {
	try {
		return { result: parse(), didRetry: false };
	} catch {
		// First attempt failed — retry once before surfacing the error.
		return { result: parse(), didRetry: true };
	}
};

// Score spread above this threshold (out of 40) triggers EVALUATOR_DISAGREEMENT.
const DISAGREEMENT_THRESHOLD = 8;

/**
 * Returns true when the spread between the highest and lowest judge scores
 * exceeds DISAGREEMENT_THRESHOLD, indicating panel inconsistency.
 */
export const detectDisagreement = (scores: number[]): boolean => {
	if (scores.length < 2) return false;
	const max = Math.max(...scores);
	const min = Math.min(...scores);
	return max - min > DISAGREEMENT_THRESHOLD;
};

/**
 * Extracts double-quoted substrings from text.
 * Used to identify evidence citations in judge reasoning.
 */
const extractQuotes = (text: string): string[] => {
	const matches = text.match(/"([^"]{3,})"/g);
	return matches ? matches.map((m) => m.slice(1, -1)) : [];
};

/**
 * Returns true when the judge reasoning cites no evidence that can be
 * verified against the evaluated output.
 *
 * Fails (returns true) when:
 * - No quoted phrases found in reasoning (no evidence cited at all), OR
 * - Quoted phrases are present but none appear in rawOutput (hallucinated citations).
 */
export const detectGroundingFailure = (reasoning: string, rawOutput: string): boolean => {
	const quotes = extractQuotes(reasoning);
	if (quotes.length === 0) return true;
	const lowerOutput = rawOutput.toLowerCase();
	return !quotes.some((q) => lowerOutput.includes(q.toLowerCase()));
};

/**
 * Detects and returns applicable failure labels for a given evaluation output.
 *
 * @param reasoning       - The raw reasoning text returned by the judge model.
 * @param parsedWithRetry - Whether the Zod parse required a retry to succeed.
 * @param judgeScores     - Individual scores per judge for disagreement detection.
 * @param rawOutput       - The original model output being evaluated (for groundedness check).
 */
export const detectFailureLabels = (
	reasoning: string,
	parsedWithRetry: boolean,
	judgeScores: number[] = [],
	rawOutput = ''
): FailureLabel[] => {
	const labels: FailureLabel[] = [];

	if (reasoning.trim().length < REASONING_MIN_LENGTH) {
		labels.push('SCORE_WITHOUT_EVIDENCE');
	}

	if (parsedWithRetry) {
		labels.push('FORMATTING_DRIFT');
	}

	if (detectDisagreement(judgeScores)) {
		labels.push('EVALUATOR_DISAGREEMENT');
	}

	if (rawOutput && detectGroundingFailure(reasoning, rawOutput)) {
		labels.push('GROUNDING_FAILURE');
	}

	return labels;
};
