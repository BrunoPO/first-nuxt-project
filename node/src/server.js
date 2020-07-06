const ms = require('ms');
const path = require('path');
const session = require('express-session');
const { GraphQLServer } = require('graphql-yoga');
// const cors = require('cors');
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

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  console.log(req._headers);
  console.log('---------------------------');
  res.header('Accept', 'application/json');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,Content-Type,If-Modified-Since,Cache-Control,Allow-Origin');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  console.log(res._headers);
  next();
};

server.express.use(allowCrossDomain);

server.express.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['POST'],
  credentials: true, // enable set cookie
  allowHeaders: ['Content-Type'],
}));

const options = {
  port: 4000,
};

// eslint-disable-next-line no-console
server.start(options, ({ port }) => console.log(
  `Server started, http://localhost:${port} for incoming requests.`,
));

// server.start();
