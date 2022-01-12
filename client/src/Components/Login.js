import React from "react";
import { NavLink} from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { LoginUser} from "../actions/userActions";


const Login = () => {

    //dispatch the api request
    const ApiDispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },

        onSubmit: (values) => {

            //login the user
            ApiDispatch(LoginUser(values))     
        }
    })

    return(
        <>
            <div className="main_div">
                <div className="header_div">
                    <h1>Login Form</h1>
                </div>
                <div className="form_div">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Username </label> 
                        <input required type='text' name="email" value={formik.values.email}
                         onChange={formik.handleChange} placeholder="Enter Email ID..." />
                        
                        <label>Password </label>
                        <input required type='password' name="password" value={formik.values.password}
                         onChange={formik.handleChange} placeholder="Enter Password ..." />
                        
                        <button type="submit">Log In</button>
                    </form>
                </div>
                
            </div>
            <div className="sign_div">
                <NavLink to = "/Registration">Create An Account</NavLink>
            </div>
        </>
    )
}

export default Login;