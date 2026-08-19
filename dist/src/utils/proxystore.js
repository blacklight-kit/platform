import { TokenStore } from 'xal-node';
import UserToken from 'xal-node/dist/lib/tokens/usertoken.js';
export default class ProxyStore extends TokenStore {
    constructor(token) {
        super();
        if (token !== undefined)
            this._userToken = new (UserToken.default || UserToken)(token);
    }
    load() {
        // @TODO: Load data and pass JSON data as string into loadJson()
        // const tokens = this._store.get('authentication.tokens', '{}') as string
        // this.loadJson(tokens)
        return true;
    }
    save() {
        // const tokens = JSON.stringify({
        //     userToken: this._userToken?.data,
        //     sisuToken: this._sisuToken?.data,
        //     jwtKeys: this._jwtKeys,
        // })
        // this._store.set('authentication.tokens', tokens)
        // @TODO: Save the token data in your store
    }
    clear() {
        this._userToken = undefined;
        this._sisuToken = undefined;
        this._jwtKeys = undefined;
        // @TODO: Remove actual data from your store
    }
    removeAll() {
        this._userToken = undefined;
        this._sisuToken = undefined;
        this._jwtKeys = undefined;
    }
}
