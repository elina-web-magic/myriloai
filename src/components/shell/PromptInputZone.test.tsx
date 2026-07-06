import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PromptInputZone } from './PromptInputZone';

describe('PromptInputZone', () => {
	it('renders structured error when prompt is empty', async () => {
		const user = userEvent.setup();
		render(<PromptInputZone />);

		// The prompt starts with a default value. We need to clear it.
		const promptInput = screen.getByLabelText('Prompt');
		await user.clear(promptInput);

		// Click the Run button
		const runButton = screen.getByRole('button', { name: /Run/i });
		await user.click(runButton);

		// Verify structured error panel appears
		expect(screen.getByText('Structured error')).toBeInTheDocument();
		expect(
			screen.getAllByText('prompt: Prompt is required before an evaluation can start.')[0]
		).toBeInTheDocument();
		expect(screen.getByText('EMPTY_PROMPT')).toBeInTheDocument();
	});

	it('renders structured error on fetch failure', async () => {
		const user = userEvent.setup();
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			json: () =>
				Promise.resolve({
					code: 'UNEXPECTED_EVALUATION_ERROR',
					message: 'Custom server error',
					severity: 'error',
				}),
		});
		global.fetch = mockFetch;

		render(<PromptInputZone />);

		const runButton = screen.getByRole('button', { name: /^Run$/i });
		await user.click(runButton);

		await waitFor(() => {
			expect(screen.getByText('Structured error')).toBeInTheDocument();
		});

		expect(screen.getAllByText('Custom server error')[0]).toBeInTheDocument();
		expect(screen.getByText('UNEXPECTED_EVALUATION_ERROR')).toBeInTheDocument();
	});
});
