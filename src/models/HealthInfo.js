const mongoose = require('mongoose');

const HealthInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        //the ref states that there is a specific user that this id is tied to
    },
    year: {
        type: Number,
        default: new Date().getFullYear()
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    LDL: {
        type: Number
    },
    HDL: {
        type: Number
    },
    Sodium: {
        type: Number
    },
    Glucose: {
        type: Number
    },
    Iron: {
        type: Number
    }, 
    Magnesium: {
        type: Number
    },
    Calcium: {
        type: Number
    }
});

mongoose.model('HealthInfo', HealthInfoSchema); 
//mongoose.model is the step that ties the data in this file to mognoDB