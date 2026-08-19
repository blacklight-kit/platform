import { appRouter as trpcAppRouter, createCallerFactory as trpcCreateCallerFactory } from './trpc.js';
export default class BlacklightPlatform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appRouter = trpcAppRouter;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appRouter = trpcAppRouter;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCallerFactory = trpcCreateCallerFactory;
