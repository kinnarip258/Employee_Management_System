import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux";
const Navbar = () => {

    const LoginState = useSelector(state => state.LoginState);

    return (
        <>
            <div className="nav_div">
                        
                <NavLink to = '/'> Home </NavLink>
               
                <NavLink to = '/Registration'> Registration </NavLink>
                         
                
                {
                    LoginState && (
                        <>
                        <NavLink to = '/Login'> Login </NavLink>
                        </>
                    )
                }
                {
                    !LoginState && (
                        <>
                            <NavLink to = '/Dashboard'> Dashboard </NavLink>
                            <NavLink to = '/Logout'> Logout</NavLink>
                        </>
                    )
                } 
                                
            </div>
        
            <hr/>  
        </>
    )
}

export default Navbar;
