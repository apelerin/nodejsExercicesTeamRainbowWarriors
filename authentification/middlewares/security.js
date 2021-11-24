const jwt = require('jsonwebtoken');
const SECRET_KEY = "CECIESTUNTOKEN";
const userSchema = require('../model/user');

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

exports.checkAdmin = async (req, res, next) => {
    const user = await userSchema.findOne({mail: req.body.mail}).exec();
    console.log(user)
    if (user) {
        if (user.isAdmin) {
            next()
        } else {
            return res.status(401).json("no authorize")
        }
    }
    console.log( "test")
}