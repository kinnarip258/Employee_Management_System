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
    
    const {fname, lname, email, phone,company, profession, salary1, salary2, salary3, password, cpassword, city, state, country} = req.body;

    if(!fname || !lname || !email || !phone || !company || !profession || !salary1 || !salary2 || !salary3  || !password || !cpassword || !city || !state || !country){
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
            await new User({fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword, city, state, country }).save();

            await new City({city, state, country}).save();
            //============================= Send Email To Register User =============================
            //sendMail({toUser: user.email, user: user})
    
            res.status(201).send({ message: "User sucessfully register."});  
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
                //============================= Generate Token =============================
                token = await userLogin.generateAuthToken();

                //============================= Store Token In Cookie =============================
                res.cookie("jwt", token , {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true
                });
                //============================= Send Login User =============================
                res.send(userLogin);
            }
        }
        else{
            res.status(400).send({ error: "Invalid Credientials!"});
        }      
   } catch (err) {
    res.send(err)
    console.log(err);
   }
})

//============================= Update Employee Details =============================

router.put('/updateUser/:id', async (req,res) => {
    try{
        const {fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword} = req.body;
        await User.findByIdAndUpdate(req.params.id,
            {
                fname : fname,
                lname : lname,
                email: email,
                salary1: salary1,
                salary2: salary2,
                salary3: salary3,
                phone: phone,
                company: company,
                profession: profession,
                password : password,
                cpassword : cpassword,
            },
            {
                new: false
            },
        );
        res.json({msg: "Employee Updated Sucessfully!"})
    }
    catch(err) {
        console.log(err);
        res.send(err);
    };
});

//============================= Delete Employee =============================

router.delete('/deleteUser/:id', authenticate,async (req,res) => {
    
    try{
        //============================= Clear Cookie =============================
        res.clearCookie("jwt");
        //============================= Delete Employee =============================
        await User.findByIdAndRemove(req.params.id);
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
        console.log("jwt cookie: ", req.cookies.jwt)
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


//authenticate,
router.get('/getUser/:page/:Request', async (req,res) => {
    try{
        let {page, Request} = req.params;
        let skip = (page-1) * 10;

        //============================= Count Total Documents =============================
        const total = await User.countDocuments({});
        //============================= Count Total Pages =============================
        let totalPage = Math.ceil(total/10);

        //============================= Create Array =============================
        let aggregateQuery = [];
       
        //============================= Sort In Ascending Order =============================
        if(Request === "ascending" || Request === "descending"){
           aggregateQuery.push(
               {$sort: { fname : Request === "ascending" ? 1 : -1}}
           ) 
        }
        //============================= Search Employee =============================
        else if(Request !== "Employees" ){
            const searchUser = Request;
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            {fname: new RegExp("^" + searchUser, 'i')},
                            {company: new RegExp("^" + searchUser, 'i')},
                            {salary1: parseInt(searchUser)},
                            {salary2: parseInt(searchUser)},
                            {salary3: parseInt(searchUser)}
                        ]
                    }
                },
                                       
            )
        }
        //============================= Pagination =============================
        aggregateQuery.push(
            {
                $skip: skip
            },
            {
                $limit: 10  
            }
        )
        //============================= Apply AggreagteQuery In User Collection =============================
        const users = await User.aggregate([aggregateQuery])

        //============================= Send Response =============================
        res.send({users, totalPage})
        
    }
    catch(err){
        //============================= Send Error Massage =============================
        res.status(500).send(err);  
    }
});

//============================= Add Event =============================


router.post('/addEvent', async (req,res) => {
    const {event, date, employeeId} = req.body;
        console.log(event, date, employeeId)
        if(!event || !date || !employeeId) {
            return res.status(422).send({error: "please fill the field properly"})
        }
    try{
        await new Event({event, date, employeeId}).save();

        res.status(201).send({ message: "Event Added Successfully!"});
    }
    catch(err){
        //============================= Send Error Message =============================
        res.status(500).send(err);
    }
    
});


//============================= Add City =============================


router.post('/addCity', async (req,res) => {
    const {CityID, CityName, StateID} = req.body;
    try{
        await new City({CityID, CityName, StateID}).save();

        res.status(201).send({ message: "city Added Successfully!"});
        
    }
    catch(err){
        //============================= Send Error Message =============================
        console.log(err)
        res.status(500).send(err);
    }
    
});


//============================= Add State =============================


router.post('/addState', async (req,res) => {
    const {StateID, StateName, CountryID} = req.body;
    try{
        await new State({StateID, StateName, CountryID}).save();

        res.status(201).send({ message: "state Added Successfully!"});
        
    }
    catch(err){
        //============================= Send Error Message =============================
        console.log(err)
        res.status(500).send(err);
    }
    
});


//============================= Add Country =============================


router.post('/addCountry', async (req,res) => {
    const {CountryID, CountryName} = req.body;
    try{
        await new Country({CountryID, CountryName}).save();

        res.status(201).send({ message: "country Added Successfully!"});
        
    }
    catch(err){
        //============================= Send Error Message =============================
        console.log(err)
        res.status(500).send(err);
    }
    
});


//============================= Get Country, State, List =============================


router.get('/getCountry', async (req,res) => {
    
    try{

        const countries = await Country.find()
        res.send(countries)
        
    }
    catch(err){
        //============================= Send Error Message =============================
        console.log(err)
        res.status(500).send(err);
    }
    
});

router.get('/getState/:ID', async (req,res) => {
    
    try{
        const ID = req.params.ID;
        
        const states = await State.aggregate([
            {
                $match: {
                    CountryID: parseInt(ID)
                }
            }
        ])
        res.send(states)
           
    }
    catch(err){
        //============================= Send Error Message =============================
        console.log(err)
        res.status(500).send(err);
    }
    
});

router.get('/getCity/:ID', async (req,res) => {
    
    try{

        let ID = req.params.ID;

            const cities = await City.aggregate([
                {
                    $match: {
                        StateID: parseInt(ID)
                    }
                }
            ])
            res.send(cities) 
        
    }
    catch(err){
        //============================= Send Error Message =============================
        console.log(err)
        res.status(500).send(err);
    }
    
});



//========================== Export Module Start ===========================

module.exports = router;

//========================== Export module end ==================================