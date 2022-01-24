//========================== Import Modules Start ===========================

import React from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux";

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

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

//============================= Navbar Component End =============================

//============================= Export Default Start =============================

export default Navbar;

//============================= Export Default End =============================
