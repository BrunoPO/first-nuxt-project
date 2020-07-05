const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./graphql/resolvers/resolvers');

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'graphql/schemas', 'schema.graphql'),
  resolvers,
});

server.start();
