import { Msal } from 'xal-node';
import ProxyStore from './proxystore.js';
/** MSAL device-code tokens omit expires_on; xal-node treats that as expired and races parallel refreshes. */
export function normalizeUserTokenForMsal(token) {
    if (token.expires_on?.trim()) {
        return token;
    }
    const expiresIn = Number(token.expires_in);
    if (!Number.isFinite(expiresIn) || expiresIn <= 0) {
        return token;
    }
    return {
        ...token,
        expires_on: new Date(Date.now() + expiresIn * 1000).toISOString()
    };
}
export function normalizeForceRegionIp(forceRegionIp) {
    const ip = forceRegionIp?.trim();
    return ip || undefined;
}
export function configureMsalHeaders(msal, forceRegionIp) {
    const ip = normalizeForceRegionIp(forceRegionIp);
    if (ip) {
        msal.setDefaultHeaders({ 'X-Forwarded-For': ip });
    }
    else {
        msal.setDefaultHeaders({});
    }
}
export function createMsal(token, forceRegionIp) {
    const normalized = token ? normalizeUserTokenForMsal(token) : undefined;
    const tokenStore = new ProxyStore(normalized);
    const msal = new Msal(tokenStore);
    configureMsalHeaders(msal, forceRegionIp);
    return msal;
}
