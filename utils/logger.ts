const levels = ['error', 'warn', 'info', 'debug'] as const;
type LogLevel = (typeof levels)[number];

const levelPriority: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const defaultLevel: LogLevel = 'warn';
const requestedLevel = (process.env.LOG_LEVEL?.toLowerCase() || defaultLevel) as LogLevel;
const currentLevel: LogLevel = levels.includes(requestedLevel) ? requestedLevel : defaultLevel;

function shouldLog(level: LogLevel) {
  return levelPriority[level] <= levelPriority[currentLevel];
}

function formatMessage(level: LogLevel, message: string, args: unknown[]) {
  const prefix = `[playwright:${level.toUpperCase()}]`;
  return [prefix, message, ...args];
}

export function error(message: string, ...args: unknown[]) {
  if (!shouldLog('error')) return;
  console.error(...formatMessage('error', message, args));
}

export function warn(message: string, ...args: unknown[]) {
  if (!shouldLog('warn')) return;
  console.warn(...formatMessage('warn', message, args));
}

export function info(message: string, ...args: unknown[]) {
  if (!shouldLog('info')) return;
  console.log(...formatMessage('info', message, args));
}

export function debug(message: string, ...args: unknown[]) {
  if (!shouldLog('debug')) return;
  console.debug(...formatMessage('debug', message, args));
}

export function getLogLevel() {
  return currentLevel;
}
