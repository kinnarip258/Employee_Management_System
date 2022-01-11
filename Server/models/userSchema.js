const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true  
    },
    Tokens: [
        {
            token: {
                type: String,
                required: true  
            }
        }
    ]
});

//hasing the password
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function() {
    try{
        //generate the token
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        //concat the token with Tokens
        this.Tokens = this.Tokens.concat({token});
        //save the token  
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

//model for users collection
const User = mongoose.model('User', userSchema);

module.exports = User;

