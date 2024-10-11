const Datasource = require('../models/Datasource');
const { ObjectNotFound, ObjectNotSupported } = require('../models/Exceptions');

class DatasourcesService {
    constructor(api) {
        this.api = api;
    }

    // Create a new datasource
    async create(dsConfig, replace = false) {
        const name = dsConfig.name;

        if (replace) {
            try {
                await this.get(name);
                await this.drop(name);
            } catch (error) {
                if (!(error instanceof ObjectNotFound)) {
                    throw error;
                }
            }
        }

        await this.api.post('/datasources', dsConfig);
        return this.get(name);
    }

    // List all datasources
    async list() {
        const response = await this.api.get('/datasources');
        const data = response.data;  // Ensure we access the response data correctly
        const dsList = [];

        for (const item of data) {
            if (!item.engine) continue; // Skip non-SQL datasources
            dsList.push(new Datasource(item));
        }

        return dsList;
    }

    // Get a datasource by name
    async get(name) {
        const response = await this.api.get(`/datasources/${name}`);
        const data = response.data;  // Ensure we access the response data correctly

        if (!data.engine) {
            throw new ObjectNotSupported(`Wrong type of datasource: ${name}`);
        }

        return new Datasource(data);
    }

    // Drop (delete) a datasource by name
    async drop(name) {
        await this.api.delete(`/datasources/${name}`);
    }
}

module.exports = DatasourcesService;
