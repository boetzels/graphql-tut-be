const { ApolloServer } = require('apollo-server');

const { PrismaClient } = require('@prisma/client');

const fs = require('fs');
const path = require('path');

const { APP_SECRET, getUserId } = require('./utils');

// resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');

const prisma = new PrismaClient()

/*const links = [
    {
        id: 0,
        description: 'this is a link',
        url: 'http://www.link.com',
    },
    {
        id: 1,
        description: 'this is another link',
        url: 'http://www.google.com',
    },
    {
        id: 2,
        description: 'this is a last link',
        url: 'http://www.meta.com',
    },
];*/


const resolvers = {
    Query,
    Mutation,
    Link,
    User,
}

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
            userId: 
                req && req.headers.authorization ? getUserId(req) : null
        };
    },
});

server.listen().then(({ url }) => console.log(`Server is listening on ${ url }`));