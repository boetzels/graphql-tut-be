const { ApolloServer } = require('apollo-server');

const links = [
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
];


const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }

    type Mutation {
        createLink: (
            url: String!,
            description: String!
        ): Link!
    }
`


const resolvers = {
    Query: {
        info: () => `This is a GraphQL-API test`,
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => console.log(`Server is listening on ${ url }`));