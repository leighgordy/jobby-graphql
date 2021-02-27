const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const {
  retrieveJob,
  retrieveJobs,
  updateJob,
  createJob,
} = require('./datalayer/fake-database');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input JobInput {
    title: String!
    description: String!
    email: String!
  },
  type Job {
    id: Float
    title: String
    description: String
    email: String
    created: Float
  },
  type Query {
    job(id: Float!): Job
    jobs: [Job]
  },
  type Mutation {
    updateJob(id: Float!, input: JobInput): Job
    createJob(input: JobInput): Job
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  job: ({id}) => retrieveJob(id),
  jobs: retrieveJobs,
  updateJob: ({id, input}) => updateJob(id, input),
  createJob: ({input}) => createJob(input),
};

module.exports = (app, path = '') => {
  app.use(`${path}/graphql`, graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  return app;
};
