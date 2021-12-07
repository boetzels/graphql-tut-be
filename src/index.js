const { ApolloServer, PubSub } = require('apollo-server');

const { PrismaClient } = require('@prisma/client');

const fs = require('fs');
const path = require('path');

const { APP_SECRET, getUserId } = require('./utils');

// Prisma
// resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote');

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Link,
    User,
    Vote,
}

// apollo
const pubSub = new PubSub();
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8',
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            pubSub,
            userId: 
                req && req.headers.authorization ? getUserId(req) : null
        };
    },
});

server.listen().then(({ url }) => console.log(`Server is listening on ${ url }`));