const jwt = require('jsonwebtoken');
const SECRET_KEY = "CECIESTUNTOKEN";

exports.checkJwt = async (req, res, next) => {
    console.log('hello le token')
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } 
            next()
        
        });
    } else {
        return res.status(401).json('token_required');
    }


}