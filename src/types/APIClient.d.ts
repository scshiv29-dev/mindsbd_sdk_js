declare class APIClient {
    constructor(apiKey: string, baseUrl?: string);

    get(url: string): Promise<object>;
    post(url: string, data: object): Promise<object>;
    patch(url: string, data: object): Promise<object>;
    delete(url: string): Promise<object>;

    private _headers(): object;
    private _handleResponse(response: object): object;
    private _handleError(error: object): void;
}

export default APIClient;
