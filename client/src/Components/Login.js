//========================== Import Modules Start ===========================

import React from "react";
import { NavLink} from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Login_User } from "../actions/userActions";

//========================== Import Modules End =============================

//============================= Login Component Start =============================

const Login = () => {

    //============================= Dispatch The Api Request =============================
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
         
        onSubmit: (values) => {
            //============================= Login The User =============================
            dispatch(Login_User(values))     
        }
    })

    return(
        <>
            <div className="main_div">
                <div className="header_div">
                    <h1>Login Form</h1>
                </div>
                <div className="form_div">
                    <form type="submit" onSubmit={formik.handleSubmit}>
                        <label>Username </label> 
                        <input required type='email' name="email" value={formik.values.email}
                         onChange={formik.handleChange} placeholder="Enter Email ID..." />
                        
                        <label>Password </label>
                        <input required type='password' name="password" value={formik.values.password}
                         onChange={formik.handleChange} placeholder="Enter Password ..." />
                        
                        <button type="submit">Log In</button>
                    </form>
                </div>
                
            </div>
            {/* //============================= Navigate TO Register ============================= */}
            <div className="sign_div">
                <NavLink to = "/Registration">Create An Account</NavLink>
            </div>
        </>
    )
};

//============================= Login Component End =============================

//============================= Export Default Start =============================

export default Login;

//============================= Export Default End =============================