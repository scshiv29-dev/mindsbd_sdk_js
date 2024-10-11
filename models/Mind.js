class Mind {
    constructor({ name, modelName, provider, parameters, datasources }) {
        this.name = name;
        this.modelName = modelName;
        this.provider = provider;
        this.parameters = parameters;
        this.datasources = datasources;
    }
}

module.exports = Mind;
