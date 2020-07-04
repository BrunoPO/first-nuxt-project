//change import to require to do not need to use babel ECS6
// import { GraphQLServer } from 'graphql-yoga';
// import path from 'path';

const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./graphql/resolvers/resolvers');

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'graphql/schemas', 'schema.graphql'),
    resolvers: resolvers
});

server.start();

//translations:
// user: User! - mandatory to be user Type 
// users:[Users!]! - mandatory to return an array (null is not acceptable) only of User

//request query eg:
//# Write your query or mutation here
// query {
//     users{email}
//       user (id: 2) {
//       id
//       name
//       email
//     }
//   }
// mutation {
//     createUser(name: "Diego", email: "diego@rocketseat.com.br") {
//         id
//       name
//       email
//     }
//   }
