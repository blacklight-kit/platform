import { appRouter as trpcAppRouter, createCallerFactory as trpcCreateCallerFactory } from './trpc.js'

export default class BlacklightPlatform {
    appRouter = trpcAppRouter
}

export const appRouter: typeof trpcAppRouter = trpcAppRouter
export const createCallerFactory: typeof trpcCreateCallerFactory = trpcCreateCallerFactory