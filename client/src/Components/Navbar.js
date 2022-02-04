//========================== Import Modules Start ===========================

import React from 'react';
import {  useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import queryString from "query-string";

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    //============================= Get Edited User Id =============================
    const {id} = queryString.parse(window.location.search);
    console.log(id)
    const LoginState = useSelector(state => state.LoginState)

    return (
        <>
            <div className="nav_div">

            <NavLink to = '/'> Home </NavLink>

            {
                LoginState !== false && id ? (
                    <>
                        <NavLink to = '/Dashboard'> Dashboard </NavLink>
                        <NavLink to = '/Logout'> Logout</NavLink> 
                    </>
                ) :null
            }

            {
                LoginState === false ? (
                    <>
                        <NavLink to = '/Dashboard'> Dashboard </NavLink>
                        <NavLink to = '/Logout'> Logout</NavLink> 
                    </>
                ) :null
            } 

            {
                LoginState !== false && !id ? (
                    <>
                    <NavLink to = '/Registration'> Registration </NavLink>
                    <NavLink to = '/Login'> Login </NavLink>
                    </>
                ) : null
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
