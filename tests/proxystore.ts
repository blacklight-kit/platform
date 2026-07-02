import ProxyStore from '../src/utils/proxystore.js'
import { expect } from 'chai'

describe('ProxyStore', () => {

    describe('new instance', () => {
        it('should create an instance of Proxystore', function(){
            const logger = new ProxyStore()
            expect(logger).to.be.an.instanceOf(ProxyStore)
        })

        it('should create an instance of Proxystore with a token', function(){
            const logger = new ProxyStore({
                "token_type": "Bearer",
                "scope": "XboxLive.signin",
                "expires_in": 3600,
                "ext_expires_in": 3600,
                "access_token": "access_token_test",
                "refresh_token": "refresh_token_test",
                "id_token": "id_token_test"
              })
            expect(logger).to.be.an.instanceOf(ProxyStore)
        })
    })
})