const Mind = require('../models/Mind');

class MindsService {
    constructor(api) {
        this.api = api;
    }

    async list() {
        const response = await this.api.get('/projects/mindsdb/minds');
        return response.data.map(item => new Mind(item));
    }

    async get(name) {
        const response = await this.api.get(`/projects/mindsdb/minds/${name}`);
        return new Mind(response.data);
    }

    async create(name, options = {}, replace = false) {
        if (replace) {
            try {
                await this.get(name);
                await this.drop(name);
            } catch (error) {
                if (error.response && error.response.status !== 404) throw error;
            }
        }

        const { modelName, provider, promptTemplate, datasources, parameters } = options;
        const data = {
            name,
            modelName,
            provider,
            parameters: { ...parameters, promptTemplate },
            datasources
        };

        await this.api.post('/projects/mindsdb/minds', data);
        return this.get(name);
    }

    async drop(name) {
        await this.api.delete(`/projects/mindsdb/minds/${name}`);
    }
}

module.exports = MindsService;
