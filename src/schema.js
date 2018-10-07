const {  makeExecutableSchema } = require('graphql-tools');

const { resolvers } = require('./resolvers'); // Will be implemented at a later stage.

const typeDefs = `
  type Channel {
    id: ID!                # "!" denotes a required field
    name: String
    messages: [Message]!
  }

  type Message {
    id: ID!
    text: String
  }

  # This type specifies the entry points into our API. 
  type Query {
    channels: [Channel]    # "[]" means this is a list of channels
    channel(id: ID!): Channel
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    # A mutation to add a new channel to the list of channels
    addChannel(name: String!): Channel
  }

  # The subscription root type, specifying what we can subscribe to
  type Subscription {
      channelAdded: Channel    # subscription operation.
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };