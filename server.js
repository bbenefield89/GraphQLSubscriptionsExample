const express                = require('express');
const { ApolloServer, gql }  = require('apollo-server-express')
const { execute, subscribe } = require('graphql');
const { createServer }       = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const { schema }    = require('./src/schema');
const { resolvers } = require('./src/resolvers')

const PORT         = process.env.PORT || 3000;
const app          = express();
const ws           = createServer(app);
const apolloServer = new ApolloServer({ schema, resolvers })

import { graphqlExpress } from 'apollo-server-express';

console.log(graphqlExpress)

// allows express to serve the '/graphql' endpoint/graphiql-playground
apolloServer.applyMiddleware({ app })

ws.listen(PORT, () => {
  console.log(`WS listening at http://localhost:${ PORT }`)
});

SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: ws,
    path: '/graphql'
  }
)
