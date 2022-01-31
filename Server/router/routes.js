//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const sendMail = require("../mail/nodemailer")
require('../db/conn');
const User = require('../models/userSchema');
const City  = require('../models/citySchema');
const State = require('../models/stateSchema');
const Country = require('../models/countrySchema');

//========================== Load Modules End =============================

//============================= Register =============================

router.post('/signUp', async (req,res) => {
    console.log("req.body", req.body)
    const {fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword,country, state, city} = req.body;

    //============================= Details Are Filled Properly =============================
    if(!fname || !lname || !email || !phone || !company || !profession || !salary1 || !salary2 || !salary3 
         || !password || !cpassword || !city || !state || !country){
        return res.status(422 ).send({error: "please fill the field properly"});
    }
    try{
        //============================= User Exist =============================
        const userExist = await User.findOne({email: email});

        if(userExist) {
            return res.status(422).send({error: "email already exist!"});
        } 
        //============================= Password And Confirm Password Matching =============================
        else if(password !== cpassword){
            return res.status(422).send({ error: "password are not matching!"});
        } 
        
        else{
            //============================= Save Register User =============================
            await new User({fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword, country, state, city}).save();

            //============================= Send Email To Register User =============================
            //sendMail({toUser: user.email, user: user})

            res.send({msg: "User Register Successfully!"});

        }       
    } 
    catch (err) {
        //============================= Error Message =============================
        res.send(err)
        console.log(err);
    }  
})

//============================= Login =============================

router.post('/signIn', async (req,res) => {
   try{
        let token ;
        const { email, password } = req.body;

        //============================= Details Are Filled Properly =============================
        if(!email || !password) {
            return res.status(400).send({ error: "please filled the data field!"});
        }
        //============================= User Exist =============================
        const userLogin = await User.findOne({ email: email});

        
        if(userLogin){
            //============================= Login User PassWord Matching=============================
            const isMatch = await bcrypt.compare(password, userLogin.password);
            
            if(!isMatch){
                res.status(400).send({ error: "Invalid Credientials!"});
            }
            else {
                //============================= Generate Token =============================
                token = await userLogin.generateAuthToken();

                //============================= Store Token In Cookie =============================
                res.cookie("jwt", token , {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true
                });
                //============================= Send Login User =============================
                res.send({msg: "User Login Successfully!"});
            }
        }
        else{
            //============================= Send Response =============================
            res.status(400).send({ error: "Invalid Credientials!"});
        }      
   } catch (err) {
       //============================= Send Error Message =============================
        res.send(err)
        console.log(err);
   }
})

//============================= Update Employee Details =============================

router.put('/updateUser', authenticate, async (req,res) => {
    try{
        console.log(req.query.ID)
        console.log(req.body);
        //============================= Save Employee Updated Details =============================
        await User.findByIdAndUpdate(req.query.ID, req.body ,
            {
                new: false
            },
        );
        
        //============================= Send Response =============================
        res.json({msg: "Employee Updated Sucessfully!" })
            
    }
    catch(err) {
        //============================= Send Error Message =============================
        console.log(err);
        res.send(err);
    };
});

//============================= Delete Employee =============================

router.delete('/deleteUser', authenticate, async (req,res) => {
    
    try{
        
        //============================= Delete Employee =============================
        await User.findByIdAndRemove(req.query.ID);
        //============================= Send Response =============================
        res.send({msg: "User Deleted!"})
    }
    catch(err) {
        console.log("error: ", err)
        res.send("error" + err)
    };
});

//============================= Logout =============================

router.get('/logout', authenticate, async (req,res) => {
    try{

        //============================= Remove Token From Database =============================
        req.authenticateUser.Tokens = req.authenticateUser.Tokens.filter((ele) => {
            return ele.token !== req.token
        })
        //============================= Clear Cookie =============================
        res.clearCookie("jwt");
        //============================= Save Authenticate User =============================
        await req.authenticateUser.save();
        //============================= Send Response =============================
        res.status(200).send("User Logout");
    }
    catch(err){
        //============================= Send Error Message =============================
        res.status(500).send(err);
    }
    
});

//============================= Get Employees =============================

router.get('/getUser',authenticate, async (req,res) => {
    try{

        let {Page, Request } = req.query;
        let limit = 8;
        let skip = (Page-1) * limit;

        //============================= Count Total Documents =============================
        const total = await User.countDocuments({});
        //============================= Count Total Pages =============================
        let totalPage = Math.ceil(total/limit);

        //============================= Create Array =============================
        let aggregateQuery = [];

        //============================= Add Field TotalSalary =============================
        aggregateQuery.push(
            {
                $addFields: {
                    totalSalary: {
                        $add: ["$salary1","$salary2","$salary3"]
                    }
                }
            },
            //============================= Get CountryName =============================
            {
                $lookup:{
                    from: "countries",
                    localField: "country",
                    foreignField: "CountryID",
                    as: "CountryName"
                }
            },
            //============================= Get StateName =============================
            {
                $lookup:{
                    from: "states",
                    localField: "state",
                    foreignField: "StateID",
                    as: "StateName"
                }
            },
            //============================= Get CityName =============================
            {
                $lookup:{
                    from: "cities",
                    localField: "city",
                    foreignField: "CityID",
                    as: "CityName"
                }
            },
        )
        //============================= Sort The Employees =============================
        if(Request === "ascending" || Request === "descending"){
            aggregateQuery.push(
                {$sort: { fname : Request === "ascending" ? 1 : -1}}
            ) 
        }
        //============================= Search Employee =============================
        else if(Request !== "ascending" || Request !== "descending"){
            const searchUser = Request;
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            {fname: new RegExp("^" + searchUser, 'i')},
                            {company: new RegExp("^" + searchUser, 'i')},
                            {salary1: parseInt(searchUser)},
                            {salary2: parseInt(searchUser)},
                            {salary3: parseInt(searchUser)},
                            {"CountryName.CountryName": new RegExp("^" + searchUser, 'i')},
                            {"StateName.StateName": new RegExp("^" + searchUser, 'i')},
                            {"CityName.CityName": new RegExp("^" + searchUser, 'i')}
                        ]   
                    }
                },                                
            )
        }
        //============================= Get Countries From Country Collection =============================
        const countries = await Country.find()

        //============================= Pagination =============================
        aggregateQuery.push(
            {
                $skip: skip
            },
            {
                $limit: limit  
            }
        )

        //============================= Apply AggreagteQuery In User Collection =============================
        const users = await User.aggregate([aggregateQuery]);

        //============================= Send Response =============================
        res.send({users, totalPage, countries});    
    
    }
    catch(err){
        //============================= Send Error Massage =============================
        res.status(500).send(err);  
    }
});


//============================= Get Country, State, City =============================

router.get(`/getCountryStateCity`, async (req,res) => {
    
    try{
        const {Search, CountryID, StateID} = req.query;

        //============================= Get Countries From Country Collection =============================
        const countries = await Country.find()
        
        if(CountryID || StateID){
            //============================= Get States From State Collection =============================
            const states = await State.find({CountryID: CountryID});
            
            if(Search === "City"){

                //============================= Get Cities From City Collection =============================

                const aggreagteQuery = [];

                aggreagteQuery.push(
                    {
                        $lookup:{
                            from: "states",
                            localField: "StateID",
                            foreignField: "StateID",
                            as: "CountryDetails"
                        }
                    },
                    {
                        $match: {
                            $and: [
                                {StateID: parseInt(StateID)},
                                {"CountryDetails.CountryID" : parseInt(CountryID)}
                            ]
                        }
                    },
                )
                const cities = await City.aggregate([aggreagteQuery])
                res.send({countries, states, cities})

            }
            else{
                res.send({countries, states});
            }
        }
        else{
            res.send({countries}); 
        }       
    }
    catch(err){
        console.log(err);
    }
})

//============================= Check Cookie =============================

router.get(`/checkCookie`, async (req,res) => {
    
    try{ 
       
        if(req.cookies.jwt){
            //============================= Set LoginState =============================
            const LoginState = false;
            res.send(LoginState)
        }
        else {
            //============================= Set LoginState =============================
            const LoginState = true;
            res.send(LoginState)
        }
    }     
    catch(err){
        console.log(err);
    }
})


//============================= Add Country =============================

router.post(`/addCountry`, async (req,res) => {
    
    try{
        console.log(req.body);
        const { CountryName, CountryID} = req.body;
        await new Country({CountryName, CountryID}).save();
        
        res.send({msg: "country"})
    }
    catch(err){
        console.log(err);
    }
})

//============================= Add State =============================

router.post('/addState', async (req,res) => {
    
    try{
        console.log(req.body);
        const { StateName, StateID, CountryID} = req.body;
        await new State({StateName, StateID, CountryID}).save();
        
        res.send({msg: "state"})
    }
    catch(err){
        console.log(err);
    }
})

//============================= Add City =============================

router.post('/addCity', async (req,res) => {

    try{
        console.log(req.body);
        const { CityName, CityID, StateID} = req.body;
        await new City({CityName, CityID, StateID}).save();
        
        res.send({msg: "city"})
    }
    catch(err){
        console.log(err);
    }
})

//========================== Export Module Start ===========================

module.exports = router;

//========================== Export module end ==================================