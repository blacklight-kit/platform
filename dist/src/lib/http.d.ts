import { IncomingHttpHeaders } from 'http';
export default class Http {
    getRequest(host: string, path: string, headers: any, method?: string): Promise<HttpResponse<any>>;
    deleteRequest(host: string, path: string, headers: any): Promise<HttpResponse<any>>;
    postRequest(host: string, path: string, headers: any, data: any, method?: string): Promise<HttpResponse<any>>;
    putRequest(host: string, path: string, headers: any, data: any): Promise<HttpResponse<any>>;
    createRequest(options: any, resolve: any, reject: any): import("node:http").ClientRequest;
}
export declare class HttpResponse<T = any> {
    data: T;
    headers: IncomingHttpHeaders;
    options: any;
    constructor(data: any, headers: IncomingHttpHeaders, options: any);
    header(): IncomingHttpHeaders;
    body(): T;
}
//# sourceMappingURL=http.d.ts.map