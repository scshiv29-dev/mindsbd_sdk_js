
// src/examples.js

const Datasource = require('./models/Datasource');

const exampleDatasource = new Datasource({
    name: 'example_ds',
    engine: 'postgres',
    description: 'Minds example database',
    connectionData: {
        user: 'demo_user',
        password: 'demo_password',
        host: 'samples.mindsdb.com',
        port: '5432',
        database: 'demo',
        schema: 'demo_data',
    },
    tables: ['table1', 'table2']
});

module.exports = {
    exampleDatasource,
};
