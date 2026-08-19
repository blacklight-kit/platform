export default class TitleManager {
    private _queue;
    private _httpClient;
    private _titles;
    queueItems(items: string[]): Promise<void>;
    processQueue(token: string): Promise<void>;
    processQueueAndReturn(items: string[], token: string): Promise<any[]>;
}
//# sourceMappingURL=titlemanager.d.ts.map