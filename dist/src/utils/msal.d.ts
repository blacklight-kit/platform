import { Msal } from 'xal-node';
import type { IUserToken } from 'xal-node/dist/lib/tokens/usertoken.js';
/** MSAL device-code tokens omit expires_on; xal-node treats that as expired and races parallel refreshes. */
export declare function normalizeUserTokenForMsal(token: IUserToken): IUserToken;
export declare function normalizeForceRegionIp(forceRegionIp?: string): string | undefined;
export declare function configureMsalHeaders(msal: Msal, forceRegionIp?: string): void;
export declare function createMsal(token?: IUserToken, forceRegionIp?: string): Msal;
//# sourceMappingURL=msal.d.ts.map