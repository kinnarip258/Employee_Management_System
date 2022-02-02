//========================== Import Modules Start ===========================

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {
    
    const LoginState = useSelector(state => state.LoginState)
    
    return (
        <>
            <div className="nav_div">

                {
                    LoginState === false ? (

                        <>
                            <NavLink to = '/Dashboard'> Dashboard </NavLink>

                            <NavLink to = '/Logout'> Logout</NavLink>
                        </>
                        
                    ) : (
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
