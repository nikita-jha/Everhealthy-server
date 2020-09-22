const express = require('express');
const mongoose = require('mongoose');
//JsonWebToken is used to validate users to make sure they are who they say they are
const jwt = require('jsonwebtoken'); 
const User = mongoose.model('User'); 
//The user model above is how we interact with all the users in our database

const router = express.Router(); 

router.post('/signup', async (req, res)=>{
    //remember that req contains all the information associated with the post request (the information you are
    //requestiong to do something with)
    //remember that res is what is being sent out as a response to the request that you made 
    const { email, password } = req.body; 

    try{
    const user = new User({ email, password }); 
    await user.save(); 

    //MY_SECRET_KEY is a secret value that we cannot share with anyone else otherwise, malicious users will be
    //able to use any random userId and get the jwt for it
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY'); 
    res.send({token}); 
    } catch(err){
        return res.status(422).send(err.message); 
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body; 

    if(!email || !password){
        return res.status(422).send({ error: 'Must provide email and password'});
    }

    const user = await User.findOne({ email }); 
    if(!user) {
        return res.status(422).send({ error: 'Invalid password or email'}); 
    }
    try{
    await user.comparePassword(password); 
    const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY'); 
    res.send({token}); 
    } catch(err){
        return res.status(422).send({ error: 'Invalid password or email' }); 
    }
}); 

module.exports = router; 