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
    
    const {fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword,country, state, city } = req.body;

    //============================= Details Are Filled Properly =============================
    if(!fname || !lname || !email || !phone || !company || !profession || !salary1 || !salary2 || !salary3  || !password || !cpassword || !city || !state || !country){
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
            await new User({fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword, country, state, city,}).save();

            //============================= Send Email To Register User =============================
            //sendMail({toUser: user.email, user: user})

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
                res.send(userLogin);
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

router.put('/updateUser/:id', async (req,res) => {
    try{
        const {fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword, country, state, city} = req.body;

        //============================= Save Employee Updated Details =============================
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
                country: country, 
                state: state, 
                city: city,
            },
            {
                new: false
            },
        );

        //============================= Country Exist =============================
        const CountryExist = await Country.findOne({CountryName: country.toUpperCase()});
        if(!CountryExist){
            await new Country({CountryName: country.toUpperCase()}).save();
        }
 
        //============================= State Exist =============================
        const StateExist = await State.findOne({StateName: state.toLowerCase()});
        if(!StateExist){
            await new State({StateName: State.toLowerCase(), CountryName: country.toUpperCase()}).save();
        }

        //============================= City Exist =============================
        const CityExist = await City.findOne({CityName: city.toLowerCase()});
        if(!CityExist){
            await new City({CityName: city.toLowerCase(), StateName: state.toLowerCase()}).save();
        } 

        //============================= Send Response =============================
        res.json({msg: "Employee Updated Sucessfully!"})
            
    }
    catch(err) {
        //============================= Send Error Message =============================
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
router.get('/getUser', async (req,res) => {
    try{

        let {Page, Request, CitySearchList} = req.query;
        let skip = (Page-1) * 10;

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
        
        //============================= Get Countries From Country Collection =============================
        const countries = await Country.find()

        if(CitySearchList){
            
        //============================= Get States From State Collection =============================
        
            const states = await State.find({CountryName: CitySearchList});
        
        //============================= Get Cities From City Collection =============================

            const cities = await City.find({StateName: CitySearchList});
            

        //============================= Get Users From City Collection =============================
            const citySearchUsers = await City.findOne({CityName: CitySearchList});
            
            if(citySearchUsers){
                console.log("CitySearchList", CitySearchList);
                console.log("citySearchUsers.CityName", citySearchUsers.CityName)
                aggregateQuery.push(
                    {
                        $match: {
                            city: CitySearchList
                        }
                    }   
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
            const users = await User.aggregate([aggregateQuery]);
            console.log(users)
            //============================= Send Response =============================
            res.send({users, totalPage, countries, states, cities});
            
        }
        else{

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
            const users = await User.aggregate([aggregateQuery]);

            //============================= Send Response =============================
            res.send({users, totalPage, countries});

        }
        
    }
    catch(err){
        //============================= Send Error Massage =============================
        res.status(500).send(err);  
    }
});

router.post('/addCountry', async (req,res) => {
    
    const { CountryName, CountryID} = req.body;
   
    await new Country({CountryName, CountryID}).save();
    
    res.send({msg: "country"})
})

//========================== Export Module Start ===========================

module.exports = router;

//========================== Export module end ==================================