import { TokenStore } from 'xal-node';
import { IUserToken } from 'xal-node/dist/lib/tokens/usertoken.js';
export default class ProxyStore extends TokenStore {
    constructor(token?: IUserToken);
    load(): boolean;
    save(): void;
    clear(): void;
    removeAll(): void;
}
//# sourceMappingURL=proxystore.d.ts.map