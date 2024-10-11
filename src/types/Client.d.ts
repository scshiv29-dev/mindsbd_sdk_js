import MindsService from '../services/MindsService';
import DatasourcesService from '../services/DatasourcesService';

declare class Client {
    constructor(apiKey: string, baseUrl?: string);

    api: APIClient;
    minds: MindsService;
    datasources: DatasourcesService;
}

export default Client;
