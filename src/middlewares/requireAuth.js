const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User'); 

module.exports = (req, res, next) => {
    //next is a signal that the request can move on to the next middleware inside our chain. If there are no more
    //middlewares, it will run final request handler in Index.js

    //for users to share their jwt with us, they must do it in a specific header called Authorization and as a 
    //value they must provide Bearer space token
    const { authorization } = req.headers; 
    //authorization === 'Bearer skdjflsjfldsjf'

    if(!authorization){
        return res.status(401).send({ error: 'You must be logged in' }); 
    }
    const token = authorization.replace('Bearer ', ''); 
    jwt.verify(token, 'MY_SECRET_KEY', async(err, payload) => {
        if(err){
            return res.status(401).send({ error: 'You must be logged in.' }); 
        }

        const { userId } = payload;

        const user = await User.findById(userId); 
        req.user = user; 
        next(); 
    }); 
}; 