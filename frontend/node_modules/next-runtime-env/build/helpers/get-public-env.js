"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicEnv = void 0;
/**
 * Gets a list of environment variables that start with `NEXT_PUBLIC_`.
 */
function getPublicEnv() {
    const publicEnv = Object.keys(process.env)
        .filter((key) => /^NEXT_PUBLIC_/i.test(key))
        .reduce((env, key) => ({
        ...env,
        [key]: process.env[key],
    }), {});
    return publicEnv;
}
exports.getPublicEnv = getPublicEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXB1YmxpYy1lbnYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9nZXQtcHVibGljLWVudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTs7R0FFRztBQUNILFNBQWdCLFlBQVk7SUFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1NBQ3ZDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNDLE1BQU0sQ0FDTCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDYixHQUFHLEdBQUc7UUFDTixDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQ3hCLENBQUMsRUFDRixFQUFnQixDQUNqQixDQUFDO0lBRUosT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVpELG9DQVlDIn0=