//========================== Import Modules Start ===========================

import React from 'react';
import {  useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    const LoginState = useSelector(state => state.LoginState)
    console.log("LoginState",LoginState)

    const LoginUser = useSelector(state => state.LoginUser)

    return (
        <>
            <div className="nav_div">

            {LoginUser ? 
                <h3>{`Sign in as ${LoginUser.fname} ${LoginUser.lname}`}</h3> 
            : null}

            {
                !LoginState && (
                    <>
                        <NavLink to = '/Logout'> Logout</NavLink> 
                    </>
                ) 
            }

            {
                LoginState && (
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
