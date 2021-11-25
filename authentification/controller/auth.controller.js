const userSchema = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, "CECIESTUNTOKEN", {
        expiresIn: 3600
    })
}

module.exports.addUser = async function(req, res) {
    const user = new userSchema();
    user.mail = req.body.mail;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.name = req.body.name;
    user.save(function(err) {
        if(err) {
            console.log(err);
            res.sendStatus(500)
            return
        }
        res.status(200).send({user : user})
    });
}
module.exports.login = async function(req, res) {
    const queryParam = {mail : req.body.mail}
    const user = await userSchema.findOne(queryParam).exec();
    const token = createToken(user._id)

    checkIfUserExist(user, res)
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send('incorrect password')
        res.end()
        return
    }
    res.status(200).send({auth: true, user: user, token: token})
}

module.exports.getUser = async function(req, res) {
    const queryParam = {_id: req.params.id}
    const user = await userSchema.findOne(queryParam).exec();
    if (!checkIfUserExist(user, res)) {
        return
    }
    res.status(200).send({user: user})
}


module.exports.updateUser = async function(req, res) {
    const queryParam =  req.body
    if (queryParam.password) {
        queryParam.password = bcrypt.hashSync(queryParam.password, 8)
    }
    await userSchema.updateOne({_id: req.body.id}, req.body);
    const user = await userSchema.findOne(queryParam)
    if (!checkIfUserExist(user, res)) {
        return
    }
    res.status(200).send({updated: true, user: user})
}

module.exports.deleteUser = async function(req, res) {
    await userSchema.deleteOne({_id: req.body.id});
    const user = await userSchema.findOne({_id: req.body.id})
    if(!user) {
        res.status(200).send('User successfully deleted')
        res.end()
        return
    }
    res.status(418).send("User " + user._id + " not deleted")
}

function checkIfUserExist(user, res) {
    if(!user) {
        res.status(404).send('unknown user')
        res.end()
        return false
    }
    return true
}
