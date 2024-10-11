
const axios = require('axios');
const { ObjectNotFound, Forbidden, Unauthorized, UnknownError } = require('../models/Exceptions');

class APIClient {
    constructor(apiKey, baseUrl = 'https://mdb.ai/api') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    _headers() {
        return { Authorization: `Bearer ${this.apiKey}` };
    }

    async get(url) {
        try {
            const response = await axios.get(`${this.baseUrl}${url}`, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    async post(url, data) {
        try {
            const response = await axios.post(`${this.baseUrl}${url}`, data, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    async patch(url, data) {
        try {
            const response = await axios.patch(`${this.baseUrl}${url}`, data, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    async delete(url) {
        try {
            const response = await axios.delete(`${this.baseUrl}${url}`, { headers: this._headers() });
            return this._handleResponse(response);
        } catch (error) {
            this._handleError(error);
        }
    }

    _handleResponse(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    }

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
