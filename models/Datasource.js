class Datasource {
    constructor({ name, engine, description, connectionData = {}, tables = [] }) {
        this.name = name;
        this.engine = engine;
        this.description = description;
        this.connectionData = connectionData;
        this.tables = tables;
    }
}

module.exports = Datasource;
