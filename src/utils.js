const jwt = require('jsonwebtoken');
const APP_SECRET = 'GRAPHQL-is-aw3som3';

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.header.authorization;

        console.log('authHeader', authHeader);

        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');

            if (!token) {
                throw new Error('No token found');
            }

            const { userId } = getTokenPayload(token);
            return userId;
        }
    }
    else if (authToken) {
        const { userId } = getTokenPayload(token);
        return userId;
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId,
}
