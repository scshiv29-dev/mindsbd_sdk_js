
const MindsService = require('../services/MindsService');
const axios = require('axios');

jest.mock('axios');

describe('MindsService', () => {
    let api;
    let mindsService;

    beforeEach(() => {
        api = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn(),
        };
        mindsService = new MindsService(api);
    });

    it('should create a new mind', async () => {
        const mockMind = { name: 'my_mind', modelName: 'gpt-3' };
        api.get.mockResolvedValueOnce({ data: mockMind });
        api.post.mockResolvedValueOnce({});

        const mind = await mindsService.create('my_mind', { modelName: 'gpt-3' });
        expect(mind.name).toBe('my_mind');
        expect(api.post).toHaveBeenCalledWith('/projects/mindsdb/minds', expect.any(Object));
    });

    it('should list all minds', async () => {
        const mockResponse = [{ name: 'mind1' }, { name: 'mind2' }];
        api.get.mockResolvedValueOnce({ data: mockResponse });

        const minds = await mindsService.list();
        expect(minds.length).toBe(2);
        expect(minds[0].name).toBe('mind1');
    });

    it('should get a mind by name', async () => {
        const mockMind = { name: 'my_mind', modelName: 'gpt-3' };
        api.get.mockResolvedValueOnce({ data: mockMind });

        const mind = await mindsService.get('my_mind');
        expect(mind.name).toBe('my_mind');
    });

    it('should delete a mind by name', async () => {
        api.delete.mockResolvedValueOnce({});

        await mindsService.drop('my_mind');
        expect(api.delete).toHaveBeenCalledWith('/projects/mindsdb/minds/my_mind');
    });
});
