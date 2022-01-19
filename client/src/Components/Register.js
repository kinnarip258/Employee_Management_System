//========================== Import Modules Start ===========================

import React, {useState, useEffect} from 'react'
import {useHistory, NavLink} from "react-router-dom";
import {useFormik} from "formik";
import queryString from "query-string";
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser, SaveUpdate } from '../actions/userActions';

//========================== Import Modules End =============================

//============================= Register Component Start =============================

const Register = () => {
    //navigate the page
    const history = useHistory();
    //for store the edited user data
    const [editedObject,setEditedObject] = useState([]);
    //get edited user id
    const {id} = queryString.parse(window.location.search);
     //get response of the api request
     const user = useSelector(state => state.user)
    //dispatch the api request
    const ApiDispatch = useDispatch();
   
    const formik = useFormik({
        //initialValues form input field
        initialValues: {
            fname:"",  lname:"", email:"", phone:"", company:"", profession:"", salary1:"", salary2:"", salary3:"", password:"" , cpassword:"", 
        },

        //when the form submitted
        onSubmit: (values) =>  {
            //update the user data
            if(id){ 
                ApiDispatch(SaveUpdate(id,values))
                //navigate to about component
                history.push('/Dashboard')
            }
            //add new user
            else{
                ApiDispatch(RegisterUser(values))
                //resetform fields
                formik.resetForm();
            }
        }     
    });
    //for getting the edited user data
    useEffect(() => {
        
        const editUser = user.find((ele) => ele._id === id ? ele : null);
        setEditedObject(editUser);
    },[id]);

    //set edited user data values
    useEffect(() => {
        if(id && editedObject) {
            //setvalues
            formik.setValues(editedObject)
        }
    },[editedObject])

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

                    <label>Password </label>
                    <input required onChange={formik.handleChange} value={formik.values.password}  name="password" type='Password' placeholder="Enter Password ..." />

                    <label>Confirm Password </label>
                    <input required onChange={formik.handleChange} value={formik.values.cpassword}  name="cpassword" type='Password' placeholder="Enter Confirm Password ..." />

                    <button type="submit">{!id ? "Register" : "Update"}</button>
                </form>
            </div>
            {/*Navigate to Login Component */}
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
