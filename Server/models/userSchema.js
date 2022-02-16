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
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    company: {
        type: String,
    },
    profession: {
        type: String,
    },
    salary1: {
        type: Number,
    },
    salary2: {
        type: Number,
    },
    salary3: {
        type: Number,
    },
    city:{
        type: Number,
    },
    state: {
        type: Number,
    },
    country:{
        type: Number,
    },
    password: {
        type: String,
    },
    cpassword: {
        type: String,
    },
    Files: [
        {
            filename: {
                type: String
            },
            filepath: {
                type: String
            },
            filetype: {
                type: String
            },
            public_id: {
                type: String
            } ,
            createAt:{
                type: Date,
                default: Date.now()
            }
        }
    ],
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