const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    title: 'Drink Hub API',
    description: 'Drink Hub API documentation'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';

const routes = [
  '../http/express/routes/beverages.router.ts', 
  '../http/express/routes/bookmarks.router.ts', 
  '../http/express/routes/categories.router.ts', 
  '../http/express/routes/users.router.ts'
];

swaggerAutogen(outputFile, routes, doc);