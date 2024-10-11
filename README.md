# JavaScript SDK for MindsDB
This SDK provides a JavaScript interface to interact with MindsDB, allowing you to manage minds, datasources, and perform queries. The SDK handles API interactions, error handling, and provides an easy-to-use interface for creating, listing, updating, and deleting minds and datasources.

 ## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Error Handling](#error-handling)

- [API Reference](#api-reference)

- [Client](#client)

- [Minds](#minds)

- [Datasources](#datasources)

- [Examples](#examples)

- [Running Tests](#running-tests)

- [Publishing the SDK](#publishing-the-sdk)

  

## Installation
To install the SDK, use npm:
```bash
npm install  mindsdb-sdk
```
## Usage

### Initializing the SDK
```javascript
const Client = require('mindsdb-sdk');
// Initialize the client
const client = new Client('YOUR_API_KEY');
```
### Managing Minds
#### Create a Mind

```javascript
const mind = await client.minds.create('my_mind', {
	modelName: 'gpt-3',
	provider: 'OpenAI',
	datasources: ['datasource1', 'datasource2'],
	promptTemplate: 'You are a coding assistant',
});

```
#### List Minds

```javascript
const minds = await client.minds.list();
console.log(minds);
```

#### Get a Mind by Name
```javascript
const mind = await client.minds.get('my_mind');
```
  
#### Delete a Mind

```javascript
await client.minds.drop('my_mind');
```

### Managing Datasources

  

#### Create a Datasource

```javascript

const datasourceConfig = {
	name: 'my_datasource',
	engine: 'postgres',
	description: 'Sample Postgres datasource',
	connectionData: {
	user: 'demo_user',
	password: 'demo_password',
	host: 'samples.mindsdb.com',
	port: 5432,
	database: 'demo',
	schema: 'demo_data',
},

	tables: ['table1', 'table2'],

};
const datasource = await client.datasources.create(datasourceConfig);

```
#### List Datasources
```javascript
const datasources = await client.datasources.list();
console.log(datasources);

```
 #### Get a Datasource by Name
```javascript
const datasource = await client.datasources.get('my_datasource');
```

#### Delete a Datasource

```javascript
await client.datasources.drop('my_datasource');
```

## Error Handling

The SDK includes built-in error handling. Common error types are:

-  **ObjectNotFound**: Thrown when a resource (mind or datasource) cannot be found.

-  **Forbidden**: Thrown for a `403` Forbidden response.

-  **Unauthorized**: Thrown for a `401` Unauthorized response.

-  **UnknownError**: Thrown for any other unhandled errors.

```javascript
try {

	const mind = await client.minds.get('non_existent_mind');

} catch (error) {

if (error instanceof ObjectNotFound) {

	console.error('Mind not found');

	}
}
```


## API Reference
### Client

-  **`Client(apiKey, baseUrl)`**: Initializes the SDK client.

-  `apiKey`: Your MindsDB API key.

-  `baseUrl`: Optional base URL for custom MindsDB instances.

### Minds

-  **`client.minds.create(name, options)`**: Creates a new mind.

-  **`client.minds.list()`**: Lists all minds.

-  **`client.minds.get(name)`**: Retrieves a mind by name.

-  **`client.minds.drop(name)`**: Deletes a mind.

### Datasources

-  **`client.datasources.create(config, replace = false)`**: Creates a new datasource.

-  **`client.datasources.list()`**: Lists all datasources.

-  **`client.datasources.get(name)`**: Retrieves a datasource by name.

-  **`client.datasources.drop(name)`**: Deletes a datasource.
