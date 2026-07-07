import { describe, expect, it } from 'vitest';
import { parseEvaluationXML } from './evaluator';

describe('parseEvaluationXML', () => {
	it('should successfully parse a valid XML response', () => {
		const xml = `
			<evaluation>
				<reasoning>The output meets all the criteria specified.</reasoning>
				<summary>Excellent response</summary>
				<risks>
					<risk>Slight hallucination on dates</risk>
				</risks>
				<mitigations>
					<mitigation>Add a fact-check step</mitigation>
				</mitigations>
				<score>38</score>
			</evaluation>
		`;

		const parsed = parseEvaluationXML(xml);
		expect(parsed).toEqual({
			summary: 'Excellent response',
			topRisks: ['Slight hallucination on dates'],
			mitigations: ['Add a fact-check step'],
			score: 38,
		});
	});

	it('should handle missing optional lists gracefully', () => {
		const xml = `
			<evaluation>
				<reasoning>Perfect.</reasoning>
				<summary>No issues found.</summary>
				<risks></risks>
				<mitigations></mitigations>
				<score>40</score>
			</evaluation>
		`;

		const parsed = parseEvaluationXML(xml);
		expect(parsed).toEqual({
			summary: 'No issues found.',
			topRisks: [],
			mitigations: [],
			score: 40,
		});
	});

	it('should throw if required tags are missing', () => {
		const xml = `
			<evaluation>
				<reasoning>Missing score and summary</reasoning>
			</evaluation>
		`;

		expect(() => parseEvaluationXML(xml)).toThrow(/missing required/);
	});
});
