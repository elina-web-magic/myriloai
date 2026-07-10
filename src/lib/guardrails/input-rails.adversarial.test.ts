import { describe, expect, it } from 'vitest';
import {
	ADVERSARIAL_SUFFIX_FIXTURES,
	FRONTMATTER_FIXTURES,
	SINGLE_PATTERN_FIXTURES,
	STACKED_FIXTURES,
} from './__fixtures__/adversarial-inputs';
import { scanForInjection } from './input-rails';

// ── Single-pattern fixture sweep ──────────────────────────────────────────────

describe('Red-team fixture sweep — single pattern detection', () => {
	const misses: string[] = [];

	it.each(SINGLE_PATTERN_FIXTURES)('$label', ({ input, expectedPattern, label }) => {
		const result = scanForInjection(input);
		const detected = result.matches.some((m) => m.pattern === expectedPattern);
		if (!detected) misses.push(label);
		expect(result.flagged).toBe(true);
		expect(detected).toBe(true);
	});

	it('miss rate is 0% across all single-pattern fixtures', () => {
		if (misses.length > 0) {
			console.warn(`[adversarial] MISSES (${misses.length}/${SINGLE_PATTERN_FIXTURES.length}):`);
			for (const m of misses) console.warn(` — ${m}`);
		} else {
			console.info(
				`[adversarial] Single-pattern: 0 misses / ${SINGLE_PATTERN_FIXTURES.length} fixtures`
			);
		}
		expect(misses).toHaveLength(0);
	});
});

// ── Frontmatter fixture sweep ─────────────────────────────────────────────────

describe('Red-team fixture sweep — frontmatter injection', () => {
	it.each(FRONTMATTER_FIXTURES)('$label', ({ input, expectedPattern }) => {
		const result = scanForInjection(input);
		expect(result.flagged).toBe(true);
		expect(result.matches.some((m) => m.pattern === expectedPattern)).toBe(true);
	});
});

// ── Adversarial suffix fixture sweep ─────────────────────────────────────────

describe('Red-team fixture sweep — adversarial suffix (6.16.c)', () => {
	it.each(ADVERSARIAL_SUFFIX_FIXTURES)('$label', ({ input, expectedPattern }) => {
		const result = scanForInjection(input);
		expect(result.flagged).toBe(true);
		expect(result.matches.some((m) => m.pattern === expectedPattern)).toBe(true);
	});
});

// ── Stacked attack fixture sweep ──────────────────────────────────────────────

describe('Red-team fixture sweep — stacked attacks (6.16.b)', () => {
	it.each(STACKED_FIXTURES)('$label', ({ input, expectedPatterns, expectStackedAttack }) => {
		const result = scanForInjection(input);
		expect(result.flagged).toBe(true);
		expect(result.stackedAttack).toBe(expectStackedAttack);
		for (const pattern of expectedPatterns) {
			expect(
				result.matches.some((m) => m.pattern === pattern),
				`expected pattern "${pattern}" to be detected`
			).toBe(true);
		}
	});
});
