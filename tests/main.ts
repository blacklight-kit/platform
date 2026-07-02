import Platform from '../src/index'
import { expect } from 'chai'
import { createCallerFactory } from '../src/trpc.js'

import { version } from '../package.json'

describe('Platform', () => {

    describe('new instance', () => {
        it('should create an instance of Platform', function(){
            const platform = new Platform()
            expect(platform).to.be.an.instanceOf(Platform)
        })
        
        it('should be able to query platform version', async function(){
            const platform = new Platform()
            const caller = createCallerFactory(platform.appRouter)({})

            const response = await caller.version()
            expect(response).to.equal(version)
        })

        it('should be able to ping appRouter', async function(){
            const platform = new Platform()
            const caller = createCallerFactory(platform.appRouter)({})

            const response = await caller.ping()

            expect(response).to.equal('pong')
        })
    })
})