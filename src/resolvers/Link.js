function user(parent, args, context) {
    return context.prisma.link.findUnique({
        where: {
            id: parent.id
        }
    }).user();
}
function votes(parent, args, context) {
    return context.prisma.vote.findUnique({
        where: {
            id: parent.id
        }
    }).votes();
}

module.exports = {
    user,
    votes,
}