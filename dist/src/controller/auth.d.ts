import type { IUserToken } from 'xal-node/dist/lib/tokens/usertoken.js';
export default class authController {
    startMsalAuth(forceRegionIp?: string): Promise<any>;
    verifyDeviceCode(devicecode: string, timeout?: number, forceRegionIp?: string): Promise<any>;
    refreshUserToken(token: IUserToken, forceRegionIp?: string): Promise<any>;
    getStreamingTokens(token: IUserToken, forceRegionIp?: string): Promise<{
        xHomeToken: any;
        xCloudToken: any;
    }>;
    getWebToken(token: IUserToken, forceRegionIp?: string): Promise<any>;
}
//# sourceMappingURL=auth.d.ts.map