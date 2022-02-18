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
const cloudinary = require('../fileupload/cloudinary');
const upload = require('../fileupload/multer');
const path = require('path');

//========================== Load Modules End =============================

//============================= Register =============================

router.post('/signUp', async (req,res) => {
   
    const {fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword,country, state, city} = req.body;
    
    try{
        //============================= User Exist =============================
        const emailExist = await User.findOne({email: email});
        const phoneExist = await User.findOne({phone: phone})
        if(emailExist || phoneExist) {
            return res.status(400).send({error: "User Already Exist!"});
        } 

        else{

            //============================= Save Register User =============================
            await new User({fname, lname, email, phone, company, profession, salary1, salary2, salary3, password, cpassword, country, state, city}).save();

            //============================= Send Email To Register User =============================
            //sendMail({toUser: user.email, user: user})

            res.send({msg:"User Register Successfully!"});

        }   
    } 
    catch (err) {
        //============================= Error Message =============================
        res.send(err)
    }  
})

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
                        $match: {
                            $and: [
                                {StateID: parseInt(StateID)},
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
        res.send(err);
    }
})

//============================= Login =============================

router.post('/signIn', async (req,res) => {
   try{
        let token ;

        const { email, password } = req.body;

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
   }
})

//============================= Get Employees =============================

router.get('/getUser',authenticate, async (req,res) => {
    try{

        let {Page, Limit, Sort, Search} = req.query;
        console.log("Limit", Limit);
        let skip = (Page-1) * Limit;
        const LoginUser = req.authenticateUser;

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

        //============================= Search Employee =============================
        if(Search !== ""){

            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            {fname: RegExp("^" + Search, 'i')},
                            {lname: RegExp("^" + Search, 'i')},
                            {profession: RegExp("^" + Search, 'i')},
                            {company: RegExp("^" + Search, 'i')},
                            {email: RegExp("^" + Search, 'i')},
                            {phone: parseInt(Search)},
                            {"CountryName.CountryName": RegExp("^" + Search, 'i')},
                            {"StateName.StateName": RegExp("^" + Search, 'i')},
                            {"CityName.CityName": RegExp("^" + Search, 'i')}
                        ]   
                    }
                },    
            )
            
            //============================= Apply AggreagteQuery In User Collection =============================
            const matchUser = await User.aggregate([aggregateQuery]);

            //============================= Count Total Pages of SearchUser =============================
            let totalPage = Math.ceil(matchUser.length/Limit);
            
            aggregateQuery.push(
                //============================= Sorting =============================
                {$sort: { fname : Sort === "descending" ? -1 : 1}},

                //============================= Pagination =============================
                {
                    $skip: skip
                },
                {
                    $limit: parseInt(Limit) 
                }  
                     
            )

            //============================= Apply AggreagteQuery In User Collection =============================
            const users = await User.aggregate([aggregateQuery])
            
            //============================= Send Response =============================
            res.send({users, totalPage, LoginUser});  
        } 
        else if(Search === ""){

            //============================= Count Total Documents =============================
            const total = await User.countDocuments({});

            //============================= Count Total Pages =============================
            let totalPage = Math.ceil(total/Limit);

            aggregateQuery.push(
                
                //============================= Sorting =============================
                {$sort: { fname : Sort === "descending" ? -1 : 1}},

                //============================= Pagination =============================
                {
                    $skip: skip
                },
                {
                    $limit: parseInt(Limit)  
                }  
            )
            //============================= Apply AggreagteQuery In User Collection =============================
            const users = await User.aggregate([aggregateQuery]);
            
            //============================= Send Response =============================
            res.send({users, totalPage, LoginUser});   
        }           
    }
    catch(err){
        //============================= Send Error Massage =============================
        res.status(500).send(err);
        console.log(err) 
    }
});


//============================= Update Employee Details =============================

router.put('/updateUser', authenticate, async (req,res) => {
    try{
        
        if(req.body.email !== req.query.editUser){
            const emailExist = await User.findOne({email: req.body.email});
    
            if(emailExist) {
                return res.status(400).send({error: "user already exist!"});
            } 
            else{
                //============================= Save Employee Updated Details =============================
                await User.findByIdAndUpdate(req.query.ID, req.body,
                    {
                        new: false
                    },
                );
                
                //============================= Send Response =============================
                res.send({msg: "Employee Updated Sucessfully!" })
            }
        }
        else{

            //============================= Save Employee Updated Details =============================
            await User.findByIdAndUpdate(req.query.ID, req.body,
                {
                    new: false
                },
            );
            
            //============================= Send Response =============================
            res.json({msg: "Employee Updated Sucessfully!" })
        }
            
    }
    catch(err) {
        //============================= Send Error Message =============================
        res.send(err);
    };
});


//============================= Delete Employee =============================

router.delete('/deleteUser', authenticate, async (req,res) => {
    
    try{

        if(req.authenticateUser.email === req.query.Email){
            //============================= Clear Cookie =============================
            res.clearCookie("jwt");
            const LoginState = true
            //============================= Delete Employee =============================
            await User.findOneAndDelete({email: req.query.Email});
            //============================= Send Response =============================
            res.send(LoginState)
        }
        else{
            const LoginState = false
            //============================= Delete Employee =============================
            await User.findOneAndDelete({email: req.query.Email});
            //============================= Send Response =============================
            res.send(LoginState)
        } 
    }
    catch(err) {
        res.send("error" + err)
    };
});



//============================= Upload Files =============================

router.post(`/uploadFile`,authenticate, upload.array('multi-files'), async (req,res) => {

    try{

        const files = req.files;

        const notValideFiles = [];
        const ValideFiles = [];
        
        for (const file of files) {
                    
            const type = path.extname(file.originalname)
            
            if(type !== '.jpg' && type !== '.jpeg' && type !== '.png' && type !== '.pdf' && type !== '.doc' && type !== '.txt' && type !== '.docx'){
                
                notValideFiles.push(
                    
                    file.originalname
                    
                )
            }
            else{
                const uploadFiles = await cloudinary.uploader.upload( file.path, { resource_type: 'raw'});

                const File = {
                    filename: file.originalname,
                    filepath: uploadFiles.secure_url,
                    filetype: type,
                    public_id: uploadFiles.public_id,
                
                }

                ValideFiles.push(
                    
                    file.originalname
                    
                );

                await User.updateOne({email: req.authenticateUser.email}, { $push: { Files: File} });
            }
        
        };
        
        if(notValideFiles !== []){
            
            res.send({notValideFiles, ValideFiles});
        }
        else{
            res.json({ValideFiles});
        }
        

    } catch(err){
        res.send(err);
    }
})

//============================= Get Files =============================

router.get(`/files`, authenticate, async (req,res) => {

    try{
        const Page = req.query.Page;
        const Limit = req.query.Limit;
        let skip = (Page-1) * Limit;
        const totalfiles = req.authenticateUser.Files;
        const LoginUser = req.authenticateUser;

        //============================= Count Total Pages of SearchUser =============================
        let totalPage = Math.ceil(totalfiles.length/Limit);

        const aggreagteQuery = [];

        aggreagteQuery.push(
            {
                $match: {
                    Files: req.authenticateUser.Files
                }
            },
            {
                $project: {
                    _id: 0, SortFiles: {
                        $slice: ["$Files", skip, parseInt(Limit)],
                    },
                }
            },
        );
        const files = await User.aggregate([aggreagteQuery]);

        res.send({files, totalPage, LoginUser})

    } catch(err){
        res.send(err);
    }
})

//============================= Delete Files =============================

router.delete(`/deleteFiles`,authenticate, async (req,res) => {

    try{
    
        const file = req.query.ID;
        
        await cloudinary.uploader.destroy(file, {invalidate: true, resource_type: "raw"});
         
        await User.updateOne(
            { email: req.authenticateUser.email },
            { $pull: { Files: { public_id: file } } }
        )
        
        res.send({msg: "delete successfully!"});
        
    } catch(err){
        res.send(err);
    }
})


//============================= Delete Multiple Files =============================

router.put(`/deleteMultiFiles`,authenticate, async (req,res) => {

    try{

        const files = req.body;

        for (const file of files) { 

            await cloudinary.uploader.destroy(file, {invalidate: true, resource_type: "raw"});
            await User.updateOne(
                { email: req.authenticateUser.email },
                { $pull: { Files: { public_id: file } } }
            ) 
        }

        res.send({msg: "delete successfully!"})
        
    } catch(err){
        res.send(err);
    }
})


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

//============================= Add Country =============================

router.post(`/addCountry`, async (req,res) => {
    
    try{
        console.log(req.body);
        const { CountryName, CountryID} = req.body;
        await new Country({CountryName, CountryID}).save();
        
        res.send({msg: "country"})
    }
    catch(err){
        res.send(err);
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
        res.send(err);
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
        res.send(err);
    }
})

//========================== Export Module Start ===========================

module.exports = router;

//========================== Export module end ==================================