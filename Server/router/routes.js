const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const sendMail = require("../mail/nodemailer")
require('../db/conn');
const User = require('../models/userSchema');


//register route
router.post('/signUp', async (req,res) => {

    const {fname, lname, email, phone,company, profession, salary1, salary2, salary3, password, cpassword} = req.body;

    if(!fname || !lname || !email || !phone || !company || !profession || !salary1 || !salary2 || !salary3  || !password || !cpassword){
        return res.status(422 ).send({error: "please fill the field properly"});
    }
    try{

        const userExist = await User.findOne({email: email});

        if(userExist) {
            return res.status(422).send({error: "email already exist!"});
        } 
        else if(password !== cpassword){
            return res.status(422).send({ error: "password are not matching!"});
        } 
        else{
            
            const user = await new User({fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword}).save();
            //sendMail({toUser: user.email, user: user})
            res.status(201).send({ message: "User sucessfully register."});  
        }       
    } 
    catch (err) {
        console.log(err);
    }
    
})

//login route
router.post('/signIn', async (req,res) => {
   try{
        let token ;
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).send({ error: "please filled the data field!"});
        }

        const userLogin = await User.findOne({ email: email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if(!isMatch){
                res.status(400).send({ error: "Invalid Credientials!"});
            }
            else {
                token = await userLogin.generateAuthToken();

                //store the token in cookie
                res.cookie("jwt", token , {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true
                });

                res.send(userLogin);
            }
        }
        else{
            res.status(400).send({ error: "Invalid Credientials!"});
        }      
   } catch (err) {
    console.log(err);
   }
})

//update user
router.put('/updateUser/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.email= req.body.email;
        user.salary1= req.body.salary1;
        user.salary2= req.body.salary2;
        user.salary3= req.body.salary3;
        user.phone= req.body.phone;
        user.company= req.body.company;
        user.profession= req.body.profession;
        user.password = req.body.password;
        user.cpassword = req.body.cpassword;
        
        const e1 = await user.save();
        res.send((e1));
    }
    catch(err) {
        console.log("error: ", err)
        res.send("error" + err)
    };
});

//delete user
router.delete('/deleteUser/:id',authenticate, async (req,res) => {
    
    try{
        res.clearCookie("jwt");
        await User.findById(req.params.id).remove();
        res.send({msg: "User Deleted!"})
    }
    catch(err) {
        console.log("error: ", err)
        res.send("error" + err)
    };
});

//for logout
router.get('/logout',authenticate, async (req,res) => {
    try{
        console.log("jwt cookie: ", req.cookies.jwt)
        //remove token from database
        req.authenticateUser.Tokens = req.authenticateUser.Tokens.filter((ele) => {
            return ele.token !== req.token
        })
        //clear cookie
        res.clearCookie("jwt");
        await req.authenticateUser.save();
        res.status(200).send("User Logout");
    }
    catch(err){
        res.status(500).send(err);
    }
    
});

//for pagination
router.get('/getUsers/page=:page', authenticate , async (req,res) => {
    try{
        let page= req.params.page
        let size = 10
        if(!page){
            page=1
        }
        const limit = parseInt(size);
        const skip = (page-1) * size;

        //const users = await User.find({}, {}, {limit: limit, skip:skip})
        const users = await User.find().limit(limit).skip(skip);
        res.send(users)
    }
    catch(err) {
        console.log("error: ", err);
        res.send("error" + err);
    }
})

//for searchEmployee
router.get('/searchuser=:Employee', async (req,res) => {
    try{
        const searchUser = new RegExp(req.params.Employee, 'i')

        const user = await User.find({
            $or: [
                { fname: searchUser},
                { company: searchUser},
            ]
        })
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send(err);
    }
})

//for sorting in  ascending
router.get('/ascending', async (req,res) => {
    try{
        const asc = {fname: 1}
        const user = await User.find().sort(asc)
        res.send(user);
    }
    catch(err){
        res.status(500).send(err); 
    }
})

//for sorting in descending
router.get('/descending', async (req,res) => {
    try{
    
        const asc = {fname: -1}
        const user = await User.find().sort(asc)
        res.send(user);
    }
    catch(err){
        res.status(500).send(err); 
    }
})

module.exports = router;
