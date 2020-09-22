const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}); 

//using function keyword instead of arrow function because we want "this" to refer to the current user being 
//the one we are trying to manipulate rather than the context of this inside the file
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')){
        return next(); 
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err); 
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }
            user.password = hash; 
            next(); 
        });
    }); 
}); 

//candidatePassword === what the user is trying to login with
userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    const user = this; 
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch)=> {
            if(err) {
                return reject(err); 
            }
            if(!isMatch){
                return reject(false); 
            }
            resolve(true); 
        }); 
    }); 
};

mongoose.model('User', userSchema); 