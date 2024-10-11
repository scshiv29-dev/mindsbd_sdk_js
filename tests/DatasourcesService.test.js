const DatasourcesService = require('../services/DatasourcesService');
const { ObjectNotFound, ObjectNotSupported } = require('../models/Exceptions');

jest.mock('axios');

describe('DatasourcesService', () => {
    let api;
    let datasourcesService;

    beforeEach(() => {
        api = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn(),
        };
        datasourcesService = new DatasourcesService(api);
    });

    it('should create a new datasource', async () => {
        const mockDatasource = { name: 'my_datasource', engine: 'postgres' };
        api.get.mockResolvedValueOnce({ data: mockDatasource });
        api.post.mockResolvedValueOnce({});

        const datasource = await datasourcesService.create(mockDatasource);
        expect(datasource.name).toBe('my_datasource');
        expect(api.post).toHaveBeenCalledWith('/datasources', mockDatasource);
    });

    it('should list all datasources', async () => {
        const mockResponse = { data: [{ name: 'datasource1', engine: 'postgres' }, { name: 'datasource2', engine: 'mysql' }] };
        api.get.mockResolvedValueOnce(mockResponse);

        const datasources = await datasourcesService.list();
        expect(datasources.length).toBe(2);
        expect(datasources[0].name).toBe('datasource1');
    });

    it('should get a datasource by name', async () => {
        const mockDatasource = { name: 'my_datasource', engine: 'postgres' };
        api.get.mockResolvedValueOnce({ data: mockDatasource });

        const datasource = await datasourcesService.get('my_datasource');
        expect(datasource.name).toBe('my_datasource');
    });

    it('should delete a datasource by name', async () => {
        api.delete.mockResolvedValueOnce({});

        await datasourcesService.drop('my_datasource');
        expect(api.delete).toHaveBeenCalledWith('/datasources/my_datasource');
    });

    it('should throw ObjectNotSupported for invalid datasource type', async () => {
        const mockDatasource = { name: 'my_datasource', engine: null };
        api.get.mockResolvedValueOnce({ data: mockDatasource });

        await expect(datasourcesService.get('my_datasource')).rejects.toThrow(ObjectNotSupported);
    });
});
