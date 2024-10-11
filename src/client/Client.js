const APIClient = require('./APIClient');
const MindsService = require('../services/MindsService');
const DatasourcesService = require('../services/DatasourcesService');

/**
 * Main Client for interacting with MindsDB services.
 */
class Client {
    /**
     * @param {string} apiKey - The API key for MindsDB.
     * @param {string} [baseUrl] - The base URL for the API.
     */
    constructor(apiKey, baseUrl) {
        this.api = new APIClient(apiKey, baseUrl);
        this.minds = new MindsService(this.api);
        this.datasources = new DatasourcesService(this.api);
    }
}

module.exports = Client;
