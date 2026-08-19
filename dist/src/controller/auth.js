import { createMsal } from '../utils/msal.js';
export default class authController {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async startMsalAuth(forceRegionIp) {
        const msal = createMsal(undefined, forceRegionIp);
        return await msal.doDeviceCodeAuth();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async verifyDeviceCode(devicecode, timeout, forceRegionIp) {
        const msal = createMsal(undefined, forceRegionIp);
        return await msal.doPollForDeviceCodeAuth(devicecode, timeout);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async refreshUserToken(token, forceRegionIp) {
        const msal = createMsal(token, forceRegionIp);
        return await msal.refreshUserToken();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getStreamingTokens(token, forceRegionIp) {
        const msal = createMsal(token, forceRegionIp);
        const gssvToken = await msal.getGssvToken();
        if (gssvToken === undefined) {
            throw new Error('No gssv token found. Please authenticate first.');
        }
        const _xhomeToken = await msal.getStreamToken(gssvToken.data.Token, 'xhome');
        let _xcloudToken;
        try {
            _xcloudToken = await msal.getStreamToken(gssvToken.data.Token, 'xgpuweb');
        }
        catch (error) {
            try {
                _xcloudToken = await msal.getStreamToken(gssvToken.data.Token, 'xgpuwebf2p');
            }
            catch (error) {
                console.log('Failed to retrieve xCloud token. (Also F2P. Cloud gaming down?)');
            }
        }
        return { xHomeToken: _xhomeToken, xCloudToken: _xcloudToken };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getWebToken(token, forceRegionIp) {
        const msal = createMsal(token, forceRegionIp);
        return await msal.getWebToken();
    }
}
