const APIClient = require('./APIClient');
const MindsService = require('../services/MindsService');
const DatasourcesService = require('../services/DatasourcesService');

class Client {
    constructor(apiKey, baseUrl) {
        this.api = new APIClient(apiKey, baseUrl);
        this.minds = new MindsService(this.api);
        this.datasources = new DatasourcesService(this.api);
    }
}

module.exports = Client;
