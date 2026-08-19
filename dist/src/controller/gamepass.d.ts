import { xHomeToken } from '../types/webtoken';
export default class gamepassController {
    private _httpClient;
    private _defaultCoreHost;
    private _sigls;
    private _coreHost;
    getTitles(token: xHomeToken): Promise<import("../lib/http.js").HttpResponse<any>>;
    getRecentTitles(token: xHomeToken): Promise<import("../lib/http.js").HttpResponse<any>>;
    getNewTitles(token: xHomeToken): Promise<import("../lib/http.js").HttpResponse<any>>;
    resolveTitles(token: xHomeToken, productIds: string[]): Promise<import("../lib/http.js").HttpResponse<any>>;
    resolveTitle(token: xHomeToken, productId: string): Promise<import("../lib/http.js").HttpResponse<any>>;
}
//# sourceMappingURL=gamepass.d.ts.map