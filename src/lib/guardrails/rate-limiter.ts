import { ERRORS } from '@/lib/errors';
import type { StandardizedError } from '@/types';

// ── Configuration ─────────────────────────────────────────────────────────────

export const RATE_LIMITS = {
	/** Maximum evaluation runs a single user may create within the window. */
	USER_RUNS_PER_HOUR: 20,
	/** Sliding window duration in milliseconds. */
	USER_WINDOW_MS: 60 * 60 * 1000,
	/** Maximum concurrent runs allowed per project at any moment. */
	PROJECT_MAX_CONCURRENT: 3,
} as const;

// ── Per-user sliding window ───────────────────────────────────────────────────

/** Timestamps (ms) of run creation events, keyed by userId. */
const userTimestamps = new Map<string, number[]>();

/**
 * Records a new run attempt for `userId` and checks the hourly limit.
 * Returns a `StandardizedError` if the limit is exceeded, `null` when allowed.
 *
 * Uses a sliding window: only timestamps within the last hour are counted.
 */
export const checkUserRunLimit = (userId: string, nowMs = Date.now()): StandardizedError | null => {
	const windowStart = nowMs - RATE_LIMITS.USER_WINDOW_MS;
	const timestamps = (userTimestamps.get(userId) ?? []).filter((t) => t >= windowStart);

	if (timestamps.length >= RATE_LIMITS.USER_RUNS_PER_HOUR) {
		const oldestInWindow = timestamps[0];
		const retryAfterSeconds = Math.ceil(
			(oldestInWindow + RATE_LIMITS.USER_WINDOW_MS - nowMs) / 1000
		);
		return ERRORS.RATE_LIMIT_EXCEEDED({
			reason: `User "${userId}" has reached ${RATE_LIMITS.USER_RUNS_PER_HOUR} runs/hour`,
			limit: RATE_LIMITS.USER_RUNS_PER_HOUR,
			retryAfterSeconds,
		});
	}

	timestamps.push(nowMs);
	userTimestamps.set(userId, timestamps);
	return null;
};

// ── Per-project concurrent run limit ─────────────────────────────────────────

/** Active concurrent run count, keyed by projectId. */
const projectConcurrent = new Map<string, number>();

/**
 * Attempts to acquire a concurrent run slot for `projectId`.
 * Returns a `StandardizedError` if the project is at capacity, `null` when a
 * slot was successfully acquired.
 *
 * Always call `releaseProjectSlot(projectId)` in a finally block after the run
 * completes or errors to avoid leaking the slot counter.
 */
export const acquireProjectSlot = (projectId: string): StandardizedError | null => {
	const current = projectConcurrent.get(projectId) ?? 0;

	if (current >= RATE_LIMITS.PROJECT_MAX_CONCURRENT) {
		return ERRORS.RATE_LIMIT_EXCEEDED({
			reason: `Project "${projectId}" already has ${RATE_LIMITS.PROJECT_MAX_CONCURRENT} concurrent runs`,
			limit: RATE_LIMITS.PROJECT_MAX_CONCURRENT,
			retryAfterSeconds: 60,
		});
	}

	projectConcurrent.set(projectId, current + 1);
	return null;
};

/**
 * Releases a previously acquired concurrent slot for `projectId`.
 * Safe to call even if the project has no tracked slots (no-op).
 */
export const releaseProjectSlot = (projectId: string): void => {
	const current = projectConcurrent.get(projectId) ?? 0;
	const next = Math.max(0, current - 1);
	if (next === 0) {
		projectConcurrent.delete(projectId);
	} else {
		projectConcurrent.set(projectId, next);
	}
};

// ── Test helpers ──────────────────────────────────────────────────────────────

/** Resets all in-memory state. For use in tests only. */
export const _resetRateLimiterState = (): void => {
	userTimestamps.clear();
	projectConcurrent.clear();
};
