import { appRouter as trpcAppRouter, createCallerFactory as trpcCreateCallerFactory } from './trpc.js'

export default class BlacklightPlatform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appRouter: any = trpcAppRouter
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appRouter: any = trpcAppRouter
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCallerFactory: any = trpcCreateCallerFactory