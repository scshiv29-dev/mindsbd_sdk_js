import Datasource from './Datasource';

declare class DatasourcesService {
    constructor(api: any);

    create(dsConfig: object, replace?: boolean): Promise<Datasource>;
    list(): Promise<Datasource[]>;
    get(name: string): Promise<Datasource>;
    drop(name: string): Promise<void>;
}

export default DatasourcesService;
