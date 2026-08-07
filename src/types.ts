import type { z } from 'zod';

import type {
	dashboardResultSchema,
	evaluationRequestSchema,
	evaluationResponseSchema,
	mockScenarioIdSchema,
	standardizedErrorSchema,
} from '@/lib/contracts/evaluation';

export type DashboardResult = z.infer<typeof dashboardResultSchema>;
export type EvaluationRequest = z.infer<typeof evaluationRequestSchema>;
export type EvaluationResponse = z.infer<typeof evaluationResponseSchema>;
export type MockScenarioId = z.infer<typeof mockScenarioIdSchema>;
export type StandardizedError = z.infer<typeof standardizedErrorSchema>;

// ───────────────────────────────────────────────
// HALLUCINATION FLAG TAXONOMY (6.6)
// ───────────────────────────────────────────────

import type { FAILURE_LABELS } from '@/constants';

export type FailureLabel = (typeof FAILURE_LABELS)[number];

// ───────────────────────────────────────────────
// SHARED UI / PAGE TYPES
// ───────────────────────────────────────────────
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeProviderProps = {
	attribute?: string;
	children: ReactNode;
	defaultTheme?: Theme;
	enableSystem?: boolean;
};

export type ThemeContextValue = {
	resolvedTheme: Theme;
	setTheme: (theme: Theme) => void;
};

export type DashboardDataState = {
	reportData: DashboardResult[];
	source: 'demo' | 'live';
};
