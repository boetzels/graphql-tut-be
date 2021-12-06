const { ApolloServer } = require('apollo-server');

const { PrismaClient } = require('@prisma/client');
const { APP_SECRET, getUserId } = require('../utils');

const fs = require('fs');
const path = require('path');

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
    Query: {
        info: () => `This is a GraphQL-API test`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany();
        },
        link: (id) => links[id],
    },

    Mutation: {
        createLink: (parent, args, context) => {
            return newLink = context.prisma.link.create({
                data: {
                    description: args.description,
                    url: args.url,
                }
            });
        },

        updateLink: (parent, args, context) => {
            return newLink = context.prisma.link.update({
                data: {
                    description: args.description,
                    url: args.url,
                }
            });
        },

        deleteLink: (parent, args) => {
            return newLink = context.prisma.link.update({
                data: {
                    description: args.description,
                    url: args.url,
                }
            });
        },
    },
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