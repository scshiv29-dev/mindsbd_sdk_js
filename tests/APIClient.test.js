
const APIClient = require('../client/APIClient');
const axios = require('axios');
const { ObjectNotFound, Forbidden, Unauthorized, UnknownError } = require('../models/Exceptions');

jest.mock('axios');

describe('APIClient', () => {
    let apiClient;

    beforeEach(() => {
        apiClient = new APIClient('your_key');
    });

    it('should successfully make a GET request', async () => {
        const mockResponse = { data: { message: 'Success' }, status: 200 };
        axios.get.mockResolvedValueOnce(mockResponse);

        const result = await apiClient.get('/test-endpoint');
        expect(result.message).toBe('Success');
    });

    it('should throw ObjectNotFound for 404 error', async () => {
        const mockError = { response: { status: 404, data: { message: 'Not found' } } };
        axios.get.mockRejectedValueOnce(mockError);

        await expect(apiClient.get('/non-existent')).rejects.toThrow(ObjectNotFound);
    });

    it('should throw Forbidden for 403 error', async () => {
        const mockError = { response: { status: 403, data: { message: 'Forbidden' } } };
        axios.get.mockRejectedValueOnce(mockError);

        await expect(apiClient.get('/forbidden')).rejects.toThrow(Forbidden);
    });

    it('should throw Unauthorized for 401 error', async () => {
        const mockError = { response: { status: 401, data: { message: 'Unauthorized' } } };
        axios.get.mockRejectedValueOnce(mockError);

        await expect(apiClient.get('/unauthorized')).rejects.toThrow(Unauthorized);
    });

    it('should throw UnknownError for other errors', async () => {
        const mockError = { response: { status: 500, data: { message: 'Server error' } } };
        axios.get.mockRejectedValueOnce(mockError);

        await expect(apiClient.get('/server-error')).rejects.toThrow(UnknownError);
    });
});
