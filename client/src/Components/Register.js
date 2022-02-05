//========================== Import Modules Start ===========================

import React, {useState, useEffect} from 'react'
import {useHistory, NavLink} from "react-router-dom";
import {useFormik} from "formik";
import queryString from "query-string";
import { useDispatch, useSelector } from 'react-redux';
import { Get_CountryStateCity, Register_Toggle, Register_User, Save_Update} from '../actions/userActions';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

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
    const user = useSelector(state => state.user);

    //============================= Get Response Of The Api =============================
    const toggle = useSelector(state => state.toggle);

    //============================= Get Response Of The Api =============================
    const registerToggle = useSelector(state => state.registerToggle);

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
        validationSchema:  Yup.object().shape({
            fname: Yup.string()
              .min(1, 'Too Short!')
              .max(15, 'Too Long!')
              .required('Required'),
            lname: Yup.string()
              .min(1, 'Too Short!')
              .max(15, 'Too Long!')
              .required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string()
              .min(10, 'Too Short!')
              .max(12, 'Too Long!')
              .required('Required'),
            company: Yup.string()
              .min(2, 'Too Short!')
              .max(40, 'Too Long!')
              .required('Required'),
            profession: Yup.string()
              .min(2, 'Too Short!')
              .max(20, 'Too Long!')
              .required('Required'),
            salary1: Yup.string()
              .min(3, 'Too Short!')
              .max(10, 'Too Long!')
              .required('Required'),
            salary2: Yup.string()
              .min(3, 'Too Short!')
              .max(10, 'Too Long!')
              .required('Required'),
            salary3: Yup.string()
              .min(3, 'Too Short!')
              .max(10, 'Too Long!')
              .required('Required'),
            country: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            password: Yup.string()
              .min(8, 'Too Short!')
              .max(100, 'Too Long!')
              .required('Required'),  
            cpassword: Yup.string()
              .min(8, 'Too Short!')
              .max(100, 'Too Long!')
              .required('Required'), 
          }),

        //============================= Submit The Form =============================
        onSubmit: (values) =>  {
            //============================= Dispatch Updated User Data =============================
            if(id){

                dispatch(Save_Update(id, values, editedObject.email))
            }
            //============================= Dispatch New User Data =============================
            else{
                if(formik.values.password !== formik.values.cpassword){
                    toast.warning("Password Not Match")
                }
                else{
                    dispatch(Register_User(values))
                }
            }        
        }     
    });

    useEffect(() => {
        if(toggle === true){
            //============================= Navigate to Dashboard =============================
            history.push('/Dashboard')
        }
    }, [toggle])

    useEffect(() => {
        if(registerToggle === true){
            //============================= Navigate to Login =============================
            history.push('/Login')
            console.log("registerToggle",registerToggle)
            dispatch(Register_Toggle());
        }
    }, [registerToggle])

    //============================= UseEffect For Get EditUser Data =============================
    useEffect(() => {
        if(id){
            //============================= get Edited User Data =============================
            const editUser = user.find((ele) => ele._id === id ? ele : null);
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
        dispatch( Get_CountryStateCity(search, CountryID, StateID));
          
    }, [search,CountryID, StateID, formik.values.country,formik.values.state])


    return (
        <div>
            <div className="header_div">
                <h1>Employee Form</h1>
            </div>

             <div className="form_div">

                    <form className="register_form" id="register_form" onSubmit={formik.handleSubmit}>
                    <label>First Name </label> 
                    <input {...formik.getFieldProps("fname")} value={formik.values.fname}  name="fname"  type='text' placeholder="Enter First Name..." />
                    {formik.errors.fname && formik.touched.fname ? (
                        <div className = "error">{formik.errors.fname}</div>
                    ) : null}

                    <label>Last Name </label> 
                    <input {...formik.getFieldProps("lname")} value={formik.values.lname}  name="lname"  type='text' placeholder="Enter Last Name..." />
                    {formik.errors.lname && formik.touched.lname ? (
                        <div className = "error">{formik.errors.lname}</div>
                    ) : null}

                    <label>Email ID </label>
                    <input {...formik.getFieldProps("email")} value={formik.values.email}  name="email" type='Email' placeholder="Enter Email ..." />
                    {formik.errors.email && formik.touched.email ? (
                        <div className = "error">{formik.errors.email}</div>
                    ) : null}

                    <label>Phone Number</label>
                    <input {...formik.getFieldProps("phone")} value={formik.values.phone}  name="phone" type='number' placeholder="Enter Phone Number ..." />
                    {formik.errors.phone && formik.touched.phone ? (
                        <div className = "error">{formik.errors.phone}</div>
                    ) : null}

                    <label>Company </label>
                    <input {...formik.getFieldProps("company")} value={formik.values.company}  name="company" type='text' placeholder="Enter Company ..." />
                    {formik.errors.company && formik.touched.company ? (
                        <div className = "error">{formik.errors.company}</div>
                    ) : null}

                    <label>Profession </label>
                    <input {...formik.getFieldProps("profession")} value={formik.values.profession}  name="profession" type='text' placeholder="Enter Profession ..." />
                    {formik.errors.profession && formik.touched.profession ? (
                        <div className = "error">{formik.errors.profession}</div>
                    ) : null}

                    <label>Salary (1st Month)</label>
                    <input {...formik.getFieldProps("salary1")} value={formik.values.salary1}  name="salary1" type='number' placeholder="Enter 1st Month Salary ..." />
                    {formik.errors.salary1 && formik.touched.salary1 ? (
                        <div className = "error">{formik.errors.salary1}</div>
                    ) : null}

                    <label>Salary (2nd Month)</label>
                    <input {...formik.getFieldProps("salary2")} value={formik.values.salary2}  name="salary2" type='number' placeholder="Enter 2nd Month Salary ..." />
                    {formik.errors.salary2 && formik.touched.salary2 ? (
                        <div className = "error">{formik.errors.salary2}</div>
                    ) : null}

                    <label>Salary (3rd Month)</label>
                    <input {...formik.getFieldProps("salary3")} value={formik.values.salary3}  name="salary3" type='number' placeholder="Enter 3rd Month Salary ..." />
                    {formik.errors.salary3 && formik.touched.salary3 ? (
                        <div className = "error">{formik.errors.salary3}</div>
                    ) : null}

                    <label>Total Salary </label>
                    <p name="totalsalary" placeholder="Enter 3rd Month Salary ..." >{formik.values.salary1 + formik.values.salary2 + formik.values.salary3}</p>
                
                    <label>Country </label><br/>
                    <select {...formik.getFieldProps("country")} value={formik.values.country} name="country">
                        <option>Select Country...</option> 
                        { Country ?
                            Country.map((ele) => { 
                                return(
                                    <>
                                        <option value= {ele.CountryID} key={ele.CountryID}>{ele.CountryName}</option>
                                    </>
                                )
                            }) : null
                        }
                    </select>
                    {formik.errors.country && formik.touched.country ? (
                        <div className = "error">{formik.errors.country}</div>
                    ) : null}
                    <br/>
                    <label>State </label><br/>
                    <select {...formik.getFieldProps("state")} value={formik.values.state}  name="state">
                        <option >Select State...</option>
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
                    {formik.errors.state && formik.touched.state ? (
                        <div className = "error">{formik.errors.state}</div>
                    ) : null}
                    <br/>
                    <label>City </label><br/>
                    <select {...formik.getFieldProps("city")} value={formik.values.city} name="city"> 
                        <option >Select City...</option>
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
                    {formik.errors.city && formik.touched.city ? (
                        <div className = "error">{formik.errors.city}</div>
                    ) : null} 
                    <br/>
                    <label>Password </label>
                    <input {...formik.getFieldProps("password")} value={formik.values.password}  name="password" type='Password' placeholder="Enter Password ..." />
                    {formik.errors.password && formik.touched.password ? (
                        <div className = "error">{formik.errors.password}</div>
                    ) : null}

                    <label>Confirm Password </label>
                    <input {...formik.getFieldProps("cpassword")} value={formik.values.cpassword}  name="cpassword" type='Password' placeholder="Enter Confirm Password ..." />
                    {formik.errors.cpassword && formik.touched.cpassword ? (
                        <div className = "error">{formik.errors.cpassword}</div>
                    ) : null}

                    <button type="submit">{!id ? "Register" : "Update"}</button>
                </form>
                
            </div>
            {/* ============================= Navigate To Login ============================= */}

            {
                !id ? (
                    <div className="sign_div">
                        <NavLink to = "/Login">Already Sign In</NavLink>
                    </div>
                ) : null
            }
            
        </div>
    )
}

//============================= Register Component Start =============================

//============================= Export Default Start =============================

export default Register;

//============================= Export Default End =============================
