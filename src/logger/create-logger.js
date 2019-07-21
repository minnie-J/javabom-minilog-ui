export const LOG_LEVEL = {
  DEBUG: 0,
  LOG: 0,
  WARN: 1,
  ERROR: 2,
  SILENT: Infinity
};
const LOG_FUNC_NAME = {
  DEBUG: "log",
  LOG: "log",
  WARN: "warn",
  ERROR: "error"
};

const createLoggerFunction = (state, type) => (...args) => {
  const LEVEL = LOG_LEVEL[type];
  const FUNC_NAME = LOG_FUNC_NAME[type];

  if (state.level > LEVEL) return;
  const f = console[FUNC_NAME];
  if (typeof f !== "function") return;
  try {
    return f(...args);
  } catch {}
};

export function createLogger() {
  const state = {
    level: LOG_LEVEL.SILENT
  };

  const setLevel = level => {
    state.level = level;
    return level;
  };
  const getLevel = () => state.level;

  const debug = createLoggerFunction(state, "DEBUG");
  const log = createLoggerFunction(state, "LOG");
  const warn = createLoggerFunction(state, "WARN");
  const error = createLoggerFunction(state, "ERROR");

  return {
    LOG_LEVEL,
    setLevel,
    getLevel,
    debug,
    log,
    warn,
    error
  };
}
