const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth'); 
const HealthInfo = mongoose.model('HealthInfo');

const router = express.Router(); 

router.use(requireAuth); 

router.get('/HealthInfo', async(req, res) => {
    //remember that the req property has a user in it, which we stored in the requireAuth middleware
    //after we successfully confirmed that he user had the correct JWT and is who they say they are. 
    //Therefore, we can access the individual user by taking their id (_id is the name of the random
    //id that mongoDB automatically gives to every single one of its components) through req.user._id
    const healthInfo = await HealthInfo.find({ userId: req.user._id}); 
    res.send(healthInfo); 
}); 

router.post('/HealthInfo', async(req, res) => {
    const { year, height, weight, LDL, HDL, Sodium, Glucose, Iron, 
        Magnesium, Calcium} = req.body; 
    if(!year || !height || !weight) {
        return res.status(422).send({error: "You must provide a year and height and weight"}); 
    }

    try{
        const healthInfo = new HealthInfo({ year, height, weight, LDL, HDL, Sodium, Glucose, Iron, 
            Magnesium, Calcium, userId: req.user._id }); 
        await healthInfo.save(); 
        res.send(healthInfo); 
    }catch(err) {
        console.log("message: " + err.message)
        res.status(422).send({error: err.message}); 
    }
}); 

module.exports = router; 
