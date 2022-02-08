//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//========================== Load Modules End =============================

//============================= Model Schema Of User =============================

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
    salary1: {
        type: Number,
        required: true
    },
    salary2: {
        type: Number,
        required: true
    },
    salary3: {
        type: Number,
        required: true
    },
    city:{
        type: Number,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    country:{
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
    filename: {
        type: String,  
    },
    filepath: {
        type: String, 
    },
    cloudinary_id: {
        type: String, 
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

//============================= Hashing Password =============================
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//============================= Generate Token =============================
userSchema.methods.generateAuthToken = async function() {
    try{
        //============================= Generate Token =============================
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        //============================= Concat Token With Tokens =============================
        this.Tokens = this.Tokens.concat({token});
        //============================= Save Token =============================  
        await this.save();
        return token;
    }
    catch (err) {
        //============================= Error Response =============================
        console.log(err);
    }
}

//============================= User Model =============================
const User = mongoose.model('User', userSchema);

//========================== Export Module Start ===========================

module.exports = User;

//========================== Export module end ==================================