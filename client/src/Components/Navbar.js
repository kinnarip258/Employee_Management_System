//========================== Import Modules Start ===========================

import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    const cookie = Cookies.get('jwt');

    const LoginState = useSelector(state => state.LoginState);  
    console.log("LoginState", LoginState);
    return (
        <>
            <div className="nav_div">

            {
                cookie !== undefined && (
                    <>
                        <NavLink to = '/Dashboard'> Dashboard </NavLink>
                        <NavLink to = '/Files'> Files </NavLink>
                        <NavLink to = '/Logout'> Logout</NavLink> 
                    </>
                ) 
            }

            {
                (LoginState && cookie === undefined) && (
                    <>
                        <NavLink to = '/'> Home </NavLink>
                        <NavLink to = '/Registration'> Registration </NavLink>
                        <NavLink to = '/Login'> Login </NavLink>
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
