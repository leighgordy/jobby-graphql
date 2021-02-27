const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { retrieveJob, retrieveJobs } = require('./datalayer/fake-database');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    job(id: Int!): Job
    jobs: [Job]
  },
  type Job {
    id: Int
    title: String
    description: String
    email: String
    created: Int
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  job: ({id}) => retrieveJob(id),
  jobs: retrieveJobs,
};

module.exports = (app, path = '') => {
  app.use(`${path}/graphql`, graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  return app;
};
