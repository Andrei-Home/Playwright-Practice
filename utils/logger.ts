const levels = ['error', 'warn', 'info', 'debug'] as const;
type LogLevel = (typeof levels)[number];

const levelPriority: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

export class Logger {
  private readonly context: string;
  private readonly currentLevel: LogLevel;

  constructor(context: string = 'playwright') {
    this.context = context;
    
    const defaultLevel: LogLevel = 'warn';
    const requestedLevel = (process.env.LOG_LEVEL?.toLowerCase() || defaultLevel) as LogLevel;
    this.currentLevel = levels.includes(requestedLevel) ? requestedLevel : defaultLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return levelPriority[level] <= levelPriority[this.currentLevel];
  }

  private formatMessage(level: LogLevel, message: string, args: unknown[]) {
    const prefix = `[${this.context}:${level.toUpperCase()}]`;
    return [prefix, message, ...args];
  }

  error(message: string, ...args: unknown[]) {
    if (!this.shouldLog('error')) return;
    console.error(...this.formatMessage('error', message, args));
  }

  warn(message: string, ...args: unknown[]) {
    if (!this.shouldLog('warn')) return;
    console.warn(...this.formatMessage('warn', message, args));
  }

  info(message: string, ...args: unknown[]) {
    if (!this.shouldLog('info')) return;
    console.log(...this.formatMessage('info', message, args));
  }

  debug(message: string, ...args: unknown[]) {
    if (!this.shouldLog('debug')) return;
    console.debug(...this.formatMessage('debug', message, args));
  }

  getLogLevel(): LogLevel {
    return this.currentLevel;
  }
}

// Create a default instance for global use
const defaultLogger = new Logger();

// Export named functions to maintain backward compatibility with existing imports
export const error = (message: string, ...args: unknown[]) => defaultLogger.error(message, ...args);
export const warn = (message: string, ...args: unknown[]) => defaultLogger.warn(message, ...args);
export const info = (message: string, ...args: unknown[]) => defaultLogger.info(message, ...args);
export const debug = (message: string, ...args: unknown[]) => defaultLogger.debug(message, ...args);
export const getLogLevel = () => defaultLogger.getLogLevel();

// Default export of the logger instance
export default defaultLogger;
