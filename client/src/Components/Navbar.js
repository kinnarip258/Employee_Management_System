//========================== Import Modules Start ===========================

import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    const cookie = Cookies.get('jwt');

    const LoginUser = useSelector(state => state.LoginUser);  
    
    const Loading = useSelector(state => state.Loading);

    return (
        <>
            <div className="nav_div">

            {
                cookie !== undefined && (
                    <>
                        <NavLink to = '/Dashboard'> Dashboard </NavLink>
                        <NavLink to = '/Files'> Files </NavLink>
                        {
                            Loading ? null : <NavLink to = '/Logout'> Logout</NavLink>
                        } 
                    </>
                ) 
            }

            {
                LoginUser === "" && cookie === undefined && (
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
