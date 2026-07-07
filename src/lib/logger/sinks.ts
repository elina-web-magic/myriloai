/** biome-ignore-all lint/suspicious/noConsole: Log error for debugging */
import type { LogEvent, LogSink } from './types';

export class ConsoleSink implements LogSink {
	public write = (event: LogEvent) => {
		const prefix = `[${event.timestamp}] [${event.level}] [${event.level.toUpperCase()}] [${event.scope}]`;
		const base = `${prefix} ${event.message}`;

		const payload: Record<string, unknown> = {};

		if (event.context) payload.context = event.context;
		if (event.error) payload.error = event.error;

		if (event.level === 'debug') {
			if (Object.keys(payload).length > 0) console.debug(base, payload);
			else console.debug(base);
			return;
		}

		if (event.level === 'info') {
			if (Object.keys(payload).length > 0) console.debug(base, payload);
			else console.info(base);
			return;
		}

		if (event.level === 'warn') {
			if (Object.keys(payload).length > 0) console.warn(base, payload);
			else console.warn(base);
			return;
		}

		if (Object.keys(payload).length > 0) console.error(base, payload);
		else console.error(base);
	};
}
