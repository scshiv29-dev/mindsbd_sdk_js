const axios = require('axios');
const { ObjectNotFound, Forbidden, Unauthorized, UnknownError } = require('../../src/models/Exceptions');

/**
 * API Client for making HTTP requests to the MindsDB API.
 */
class APIClient {
    /**
     * @param {string} apiKey - The API key used for authentication.
     * @param {string} [baseUrl='https://mdb.ai/api'] - The base URL for the API.
     */
    constructor(apiKey, baseUrl = 'https://mdb.ai/api') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    /**
     * Generate headers for HTTP requests.
     * @returns {Object} - The headers including authorization.
     * @private
     */
    _headers() {
        return { Authorization: `Bearer ${this.apiKey}` };
    }

    /**
     * Make a GET request to the specified URL.
     * @param {string} url - The endpoint URL.
     * @returns {Promise<Object>} - The response data.
     */
    async get(url) {
        try {
            const response = await axios.get(`${this.baseUrl}${url}`, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Make a POST request to the specified URL.
     * @param {string} url - The endpoint URL.
     * @param {Object} data - The data to post.
     * @returns {Promise<Object>} - The response data.
     */
    async post(url, data) {
        try {
            const response = await axios.post(`${this.baseUrl}${url}`, data, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Make a PATCH request to the specified URL.
     * @param {string} url - The endpoint URL.
     * @param {Object} data - The data to patch.
     * @returns {Promise<Object>} - The response data.
     */
    async patch(url, data) {
        try {
            const response = await axios.patch(`${this.baseUrl}${url}`, data, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Make a DELETE request to the specified URL.
     * @param {string} url - The endpoint URL.
     * @returns {Promise<Object>} - The response data.
     */
    async delete(url) {
        try {
            const response = await axios.delete(`${this.baseUrl}${url}`, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Handle HTTP responses.
     * @param {Object} response - The HTTP response.
     * @returns {Object} - The response data.
     * @private
     */
    _handleResponse(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    }

    /**
     * Handle HTTP errors.
     * @param {Object} error - The error object.
     * @throws {Error} - The error depending on the response status.
     * @private
     */
    _handleError(error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data.message || error.response.statusText;

            if (status === 404) {
                throw new ObjectNotFound(message);
            } else if (status === 403) {
                throw new Forbidden(message);
            } else if (status === 401) {
                throw new Unauthorized(message);
            } else {
                throw new UnknownError(`Error: ${message}`);
            }
        } else if (error.request) {
            throw new UnknownError('No response received from the API.');
        } else {
            throw new UnknownError(`Unexpected error: ${error.message}`);
        }
    }
}

module.exports = APIClient;
