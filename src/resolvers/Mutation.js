const bcrypt = require('bcryptjs');
const { APP_SECRET, getUserId } = require('../utils');

async function signUp(parent, args, context, info) {
    const pw = await bcrypt.hash(args.password, 10);
    console.log('pw', pw);

    const user = await context.prisma.user.create(data:{
        ...args,
        pw,
    });

    const token = jwt.sign({userId: user.id,}, APP_SECRET);

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

    const token = jwt.sign({userId: user.id,}, APP_SECRET);

    return {
        token,
        user,
    }
}

async function createLink(parent, args, context) {
    const { userId } = context;

    return await context.prisma.link.create({
        data: {
            description: args.description,
            url: args.url,
            user_id: { connect: { id: userId }}
        }
    });
}

module.exports = {
    signUp,
    signIn,
    createLink,
}