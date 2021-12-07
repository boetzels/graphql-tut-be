function user(parent, args, context) {
    return context.prisma.link.findUnique({
        where: {
            id: parent.id
        }
    }).user();
}

module.exports = {
    user,
}