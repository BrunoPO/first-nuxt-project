const ms = require('ms');
const path = require('path');
const session = require('express-session');
const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./graphql/resolvers/resolvers');

const SECRET = 'someRandomSecretHere';

// context
const context = (req) => ({
  req: req.request,
});

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'graphql/schemas', 'schema.graphql'),
  resolvers,
  context,
});

// session middleware
server.express.use(session({
  name: 'qid',
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false, // key
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms('1d'),
  },
}));

const options = {
  port: 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000'],
    allowHeaders: ['Content-Type'],
  },
};

// eslint-disable-next-line no-console
server.start(options, ({ port }) => console.log(
  `Server started, http://localhost:${port} for incoming requests.`,
));
