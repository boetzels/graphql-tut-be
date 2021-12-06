const jwt = require('jsonwebtoken');
const APP_SECRET = 'GRAPHQL-is-aw3som3';

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;

        console.log('using authHeader: ', authHeader);

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
        console.log('using authToken', authToken);
        const { userId } = getTokenPayload(token);
        return userId;
    }

    throw new Error('Not authenticated');
}

function getToken(signArgs) {
    return jwt.sign(signArgs, APP_SECRET)
}

module.exports = {
    APP_SECRET,
    getUserId,
    getToken,
}
