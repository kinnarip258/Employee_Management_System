//========================== Import Modules Start ===========================

import React from "react";
import { NavLink} from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Login_User } from "../actions/userActions";
import * as Yup from 'yup';

//========================== Import Modules End =============================

//============================= Login Component Start =============================

const Login = () => {


    //============================= Dispatch The Api Request =============================
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema:Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string()
              .min(8, 'Too Short!')
              .max(100, 'Too Long!')
              .required('Required'), 
        }), 
         
        onSubmit: (values) => {
            //============================= Login The User =============================
            dispatch(Login_User(values))     
        }
    });
    
    return(
        <>
            <div className="main_div">
                <div className="header_div">
                    <h1>Login Form</h1>
                </div>
                <div className="form_div">
                    <form type="submit" onSubmit={formik.handleSubmit}>
                        <label>Username </label> 
                        <input type='email' name="email" value={formik.values.email}
                         {...formik.getFieldProps("email")} placeholder="Enter Email ID..." />

                        {formik.errors.email && formik.touched.email ? (
                        <div className = "error">{formik.errors.email}</div>
                        ) : null}
                        
                        <label>Password </label>
                        <input type='password' name="password" value={formik.values.password}
                         {...formik.getFieldProps("password")} placeholder="Enter Password ..." />
                         
                        {formik.errors.password && formik.touched.password ? (
                        <div className = "error">{formik.errors.password}</div>
                        ) : null}

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