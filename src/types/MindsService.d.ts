import Mind from './Mind';

declare class MindsService {
    constructor(api: any);

    list(): Promise<Mind[]>;
    get(name: string): Promise<Mind>;
    create(
        name: string,
        options?: {
            modelName?: string;
            provider?: string;
            promptTemplate?: string;
            datasources?: string[];
            parameters?: object;
            replace?: boolean;
        }
    ): Promise<Mind>;
    drop(name: string): Promise<void>;
}

export default MindsService;
