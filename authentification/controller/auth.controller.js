const userSchema = require('../model/user')

const bcrypt = require('bcrypt')

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
    if(!user) {
        res.status(404).send('unknown user')
        res.end()
        return
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send('incorrect password')
        res.end()
        return
    } 
    res.status(200).send({auth : true, user: user})
}

module.exports.updateUser = async function(req, res) {
    
    

}