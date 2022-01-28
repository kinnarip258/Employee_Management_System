//========================== Import Modules Start ===========================

import React, {useState, useEffect} from 'react'
import {useHistory, NavLink} from "react-router-dom";
import {useFormik} from "formik";
import queryString from "query-string";
import { useDispatch, useSelector } from 'react-redux';
import { GetCountryStateCity, RegisterUser, SaveUpdate, CheckCookie } from '../actions/userActions';

//========================== Import Modules End =============================

//============================= Register Component Start =============================

const Register = () => {
    //============================= Navigate the Page =============================
    const history = useHistory();
    //============================= Store Edite Employee Data =============================
    const [editedObject,setEditedObject] = useState([]);

    //============================= Get Edited User Id =============================
    const {id} = queryString.parse(window.location.search);

    //============================= Get Response Of The Api =============================
    const user = useSelector(state => state.user)
    
    //============================= Get List Of Country, States, City =============================
    const Country = useSelector(state => state.Country);
    const States = useSelector(state => state.States);
    const City = useSelector(state => state.City)

    //============================= Search Country, State, City =============================
    const [search, setSearch] = useState("Country");

    //============================= CountryID =============================
    const [CountryID, setCountryID] = useState("");

    //============================= StateID =============================
    const [StateID, setStateID] = useState("");
    
    //============================= dispatch Api Request =============================
    const dispatch = useDispatch();
    //============================= UseFormik =============================
    const formik = useFormik({
        //============================= Initial Values =============================
        initialValues: {
            fname:"",  lname:"", email:"", phone:"", company:"", profession:"", 
            salary1:"", salary2:"", salary3:"", password:"" , cpassword:"",
            country:"", state:"", city:"" 
        },

        //============================= Submit The Form =============================
        onSubmit: (values) =>  {
            //============================= Dispatch Updated User Data =============================
            if(id){ 
                dispatch(SaveUpdate(id,values))
                //============================= Navigate To Dashboard =============================
                history.push('/Dashboard')
            }
            //============================= Dispatch New User Data =============================
            else{
                dispatch(RegisterUser(values))
                //============================= Reset Fields =============================
                formik.resetForm();
            }
        }     
    });
    
    //============================= UseEffect For Get EditUser Data =============================
    useEffect(() => {
        if(id){
            const editUser = user.find((ele) => ele._id === id ? ele : null);
            console.log(editUser);
            setEditedObject(editUser);
        }
    },[id]);

    //============================= Set Edited User Data to InitialValues =============================
    useEffect(() => {
        if(id && editedObject) {
            //setvalues
            formik.setValues(editedObject)
        }
    },[editedObject])

    useEffect(() => {
        if(formik.values.country !== ""){
            setSearch("State");
            setCountryID(formik.values.country)
        }
        if(formik.values.state !== ""){
            setSearch("City");
            setStateID(formik.values.state)
        }  
        dispatch(GetCountryStateCity(search, CountryID, StateID));  
    }, [search,CountryID, StateID,formik.values.country,formik.values.state])

    return (
        <div>
            <div className="header_div">
                <h1>Employee Form</h1>
            </div>

             <div className="form_div">
                <form className="register_form" id="register_form" onSubmit={formik.handleSubmit}>
                    <label>First Name </label> 
                    <input required onChange={formik.handleChange} value={formik.values.fname}  name="fname"  type='text' placeholder="Enter First Name..." />

                    <label>Last Name </label> 
                    <input required onChange={formik.handleChange} value={formik.values.lname}  name="lname"  type='text' placeholder="Enter Last Name..." />
                                            
                    <label>Email ID </label>
                    <input required onChange={formik.handleChange} value={formik.values.email}  name="email" type='Email' placeholder="Enter Email ..." />

                    <label>Phone Number</label>
                    <input required onChange={formik.handleChange} value={formik.values.phone}  name="phone" type='number' placeholder="Enter Phone Number ..." />

                    <label>Company </label>
                    <input required onChange={formik.handleChange} value={formik.values.company}  name="company" type='text' placeholder="Enter Company ..." />

                    <label>Profession </label>
                    <input required onChange={formik.handleChange} value={formik.values.profession}  name="profession" type='text' placeholder="Enter Profession ..." />

                    <label>Salary (1st Month)</label>
                    <input required onChange={formik.handleChange} value={formik.values.salary1}  name="salary1" type='number' placeholder="Enter 1st Month Salary ..." />

                    <label>Salary (2nd Month)</label>
                    <input required onChange={formik.handleChange} value={formik.values.salary2}  name="salary2" type='number' placeholder="Enter 2nd Month Salary ..." />

                    <label>Salary (3rd Month)</label>
                    <input required onChange={formik.handleChange} value={formik.values.salary3}  name="salary3" type='number' placeholder="Enter 3rd Month Salary ..." />
                    
                    <label>Country </label><br/>
                    <select required onChange={formik.handleChange} value={formik.values.country} name="country">
                        <option selected>Select Country...</option> 
                        { Country ?
                            Country.map((ele) => { 
                                return(
                                    <>
                                        <option value= {ele.CountryID}>{ele.CountryName}</option>
                                    </>
                                )
                            }) : null
                        }
                    </select>
                    <br/>
                    <label>State </label><br/>
                    <select required onChange={formik.handleChange} value={formik.values.state}  name="state">
                        <option selected>Select State...</option>
                        { States ?
                            States.map((ele) => { 
                                return(
                                    <>
                                        <option value= {ele.StateID}>{ele.StateName}</option>
                                    </>
                                )
                            }) : null
                        }
                    </select>
                    <br/>
                    <label>City </label><br/>
                    <select required onChange={formik.handleChange} value={formik.values.city} name="city"> 
                        <option selected>Select City...</option>
                        { City ?
                            City.map((ele) => { 
                                return(
                                    <>
                                        <option value= {ele.CityID}>{ele.CityName}</option>
                                    </>
                                )
                            }) : null
                        }
                    </select> 
                    <br/>
                    <label>Password </label>
                    <input required onChange={formik.handleChange} value={formik.values.password}  name="password" type='Password' placeholder="Enter Password ..." />

                    <label>Confirm Password </label>
                    <input required onChange={formik.handleChange} value={formik.values.cpassword}  name="cpassword" type='Password' placeholder="Enter Confirm Password ..." />

                    <button type="submit">{!id ? "Register" : "Update"}</button>
                </form>
            </div>
            {/* ============================= Navigate To Login ============================= */}
            <div className="sign_div">
                <NavLink to = "/Login">Already Sign In</NavLink>
            </div>
        </div>
    )
}

//============================= Register Component Start =============================

//============================= Export Default Start =============================

export default Register;

//============================= Export Default End =============================
