const jwt = require('jsonwebtoken');
 
 module.exports = (req, res, next) => {
    try {
        const token =  req.headers.authorization.split(' ')[1];
        const jwtVerifyied = jwt.verify(token,'RANDOM_ACCESS_MEMORY');
        const userId = jwtVerifyied.userId;
       req.auth = {
           userId: userId
       };
	next();
    } catch(error) {
        res.status(401).json({ error:" test " });
    }
 };