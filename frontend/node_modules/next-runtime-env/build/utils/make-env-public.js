"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEnvPublic = void 0;
const log_1 = require("../helpers/log");
function prefixKey(key) {
    // Check if key is available in process.env.
    if (!process.env[key]) {
        (0, log_1.warn)(`Skipped prefixing environment variable '${key}'. Variable not in process.env`);
        return;
    }
    // Check if key is already public.
    if (/^NEXT_PUBLIC_/i.test(key)) {
        (0, log_1.warn)(`Environment variable '${key}' is already public`);
    }
    const prefixedKey = `NEXT_PUBLIC_${key}`;
    process.env[prefixedKey] = process.env[key];
    // eslint-disable-next-line no-console
    (0, log_1.event)(`Prefixed environment variable '${key}'`);
}
/**
 * Make a private environment variable public, so that it can be accessed in the
 * browser.
 *
 * Usage:
 * ```ts
 * // Make a single variable public.
 * makeEnvPublic('FOO');
 *
 * // Make multiple variables public.
 * makeEnvPublic(['FOO', 'BAR', 'BAZ']);
 * ```
 */
function makeEnvPublic(key) {
    if (typeof key === 'string') {
        prefixKey(key);
    }
    else {
        key.forEach(prefixKey);
    }
}
exports.makeEnvPublic = makeEnvPublic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS1lbnYtcHVibGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL21ha2UtZW52LXB1YmxpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBNkM7QUFFN0MsU0FBUyxTQUFTLENBQUMsR0FBVztJQUM1Qiw0Q0FBNEM7SUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN0QixJQUFBLFVBQUksRUFDRiwyQ0FBMkMsR0FBRyxnQ0FBZ0MsQ0FDL0UsQ0FBQztRQUVGLE9BQU87SUFDVCxDQUFDO0lBRUQsa0NBQWtDO0lBQ2xDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDL0IsSUFBQSxVQUFJLEVBQUMseUJBQXlCLEdBQUcscUJBQXFCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsTUFBTSxXQUFXLEdBQUcsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUV6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFNUMsc0NBQXNDO0lBQ3RDLElBQUEsV0FBSyxFQUFDLGtDQUFrQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxTQUFnQixhQUFhLENBQUMsR0FBc0I7SUFDbEQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUM1QixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztTQUFNLENBQUM7UUFDTixHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7QUFDSCxDQUFDO0FBTkQsc0NBTUMifQ==