import { WorkerEntrypoint } from 'cloudflare:workers';
export default class TRPCCloudflareWorkerExample extends WorkerEntrypoint {
    fetch(request: Request): Promise<Response>;
}
//# sourceMappingURL=worker.d.ts.map