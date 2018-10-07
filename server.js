import express                from 'express'
import { ApolloServer, gql }  from 'apollo-server-express'
import { execute, subscribe } from 'graphql'
import { createServer }       from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import { typeDefs, schema }    from './src/schema'
import { resolvers } from './src/resolvers'

const PORT         = process.env.PORT || 3000;
const app          = express();
const ws           = createServer(app);
const apolloServer = new ApolloServer({ typeDefs, resolvers })

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
