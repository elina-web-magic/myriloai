const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export type LogContext = Record<string, unknown>;

export type SerializedError = {
	name: string;
	message: string;
	stack?: string;
	code?: string;
	severity?: 'info' | 'warning' | 'error';
	field?: string;
	details?: Record<string, unknown>;
};

export type LogSink = {
	write: (event: LogEvent) => void;
};

export type LoggerOptions = {
	scope: string;
	minLevel: LogLevel;
	defaultContext?: LogContext;
	sinks: LogSink[];
};

export type LogEvent = {
	timestamp: string;
	level: LogLevel;
	scope: string;
	message: string;
	context?: LogContext;
	error?: SerializedError;
};
