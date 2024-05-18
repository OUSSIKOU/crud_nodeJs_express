const User = require('../models/user');
const hachage = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup = (req, res, next) => {
    const body = req.body ;
    hachage.hash(body.password ,10 ) 
    .then(hash => {
    const user = new User({
        email:body.email ,
        password : hash
    }) 
    user.save()
      .then(()=> res.status(201).json({mesg:"user created with success"}))
      .catch((er)=>res.status(500).json({er}))
})
.catch(error=> res.status(400).json({error:error}))
};

exports.login = (req, res, next) => {
    const body = req.body
User.findOne({email:body.email})
.then(user => {
if(!user)
{
    res.status(401).json({message:"unautorized"});
}
    hachage.compare(body.password , user.password)
     .then(password =>{
        
            if (!password){
             return res.status(401).json({message:"unautorized"});
            }else{
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign({userId:user._id},'RANDOM_ACCESS_MEMORY',{expiresIn:24})
                });
            }

        
})
     .catch(err => res.status(500).json({err}))


})
.catch(err => res.status(500).json({err}))
};