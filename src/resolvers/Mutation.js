const bcrypt = require('bcryptjs');
const { getToken, getUserId } = require('../utils');

async function signUp(parent, args, context, info) {
    const pw = await bcrypt.hash(args.password, 10);
    delete args.password;

    const user = await context.prisma.user.create({
        data:{
            ...args,
            pw,
        }
    });

    const token = getToken({userId: user.id,});

    return {
        token,
        user,
    }
}

async function signIn(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { email: args.email }})

    if (!user) {
        throw new Error('User not found');
    }

    const valid = await bcrypt.compare(args.password, user.pw);

    if (!valid) {
        throw new Error('invalid pw')
    }

    const token = getToken({userId: user.id,});

    return {
        token,
        user,
    }
}

async function createLink(parent, args, context) {
    const { userId } = context;

    const newLink = await context.prisma.link.create({
        data: {
            description: args.description,
            url: args.url,
            user: { connect: { id: userId }}
        }
    });

    context.pubSub.publish('NEW_LINK',newLink);

    return newLink;
}

module.exports = {
    signUp,
    signIn,
    createLink,
}