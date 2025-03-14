"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = exports.info = exports.warn = exports.error = exports.prefixes = void 0;
const picocolors_1 = require("../lib/picocolors");
exports.prefixes = {
    error: (0, picocolors_1.red)((0, picocolors_1.bold)('⨯')),
    warn: (0, picocolors_1.yellow)((0, picocolors_1.bold)('⚠')),
    info: (0, picocolors_1.white)((0, picocolors_1.bold)(' ')),
    event: (0, picocolors_1.green)((0, picocolors_1.bold)('✓')),
};
const suffix = '(next-runtime-env)';
const LOGGING_METHOD = {
    log: 'log',
    warn: 'warn',
    error: 'error',
};
function prefixedLog(prefixType, message) {
    const consoleMethod = prefixType in LOGGING_METHOD
        ? LOGGING_METHOD[prefixType]
        : 'log';
    const prefix = exports.prefixes[prefixType];
    // eslint-disable-next-line no-console
    console[consoleMethod](` ${prefix}`, message, suffix);
}
function error(message) {
    prefixedLog('error', message);
}
exports.error = error;
function warn(message) {
    prefixedLog('warn', message);
}
exports.warn = warn;
function info(message) {
    prefixedLog('info', message);
}
exports.info = info;
function event(message) {
    prefixedLog('event', message);
}
exports.event = event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtEQUFvRTtBQUV2RCxRQUFBLFFBQVEsR0FBRztJQUN0QixLQUFLLEVBQUUsSUFBQSxnQkFBRyxFQUFDLElBQUEsaUJBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixJQUFJLEVBQUUsSUFBQSxtQkFBTSxFQUFDLElBQUEsaUJBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixJQUFJLEVBQUUsSUFBQSxrQkFBSyxFQUFDLElBQUEsaUJBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixLQUFLLEVBQUUsSUFBQSxrQkFBSyxFQUFDLElBQUEsaUJBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztDQUNmLENBQUM7QUFFWCxNQUFNLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztBQUVwQyxNQUFNLGNBQWMsR0FBRztJQUNyQixHQUFHLEVBQUUsS0FBSztJQUNWLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLE9BQU87Q0FDTixDQUFDO0FBRVgsU0FBUyxXQUFXLENBQUMsVUFBaUMsRUFBRSxPQUFlO0lBQ3JFLE1BQU0sYUFBYSxHQUNqQixVQUFVLElBQUksY0FBYztRQUMxQixDQUFDLENBQUMsY0FBYyxDQUFDLFVBQXlDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVaLE1BQU0sTUFBTSxHQUFHLGdCQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFcEMsc0NBQXNDO0lBQ3RDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLE9BQWU7SUFDbkMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsc0JBRUM7QUFFRCxTQUFnQixJQUFJLENBQUMsT0FBZTtJQUNsQyxXQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGRCxvQkFFQztBQUVELFNBQWdCLElBQUksQ0FBQyxPQUFlO0lBQ2xDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUZELG9CQUVDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLE9BQWU7SUFDbkMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsc0JBRUMifQ==