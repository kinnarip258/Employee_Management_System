//========================== Import Modules Start ===========================

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CheckCookie } from '../actions/userActions';


//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    const LoginState = useSelector(state => state.LoginState)
    
    return (
        <>
            <div className="nav_div">

            <NavLink to = '/'> Home </NavLink>

                {
                    LoginState !== false && (

                        <>

                            <NavLink to = '/Registration'> Registration </NavLink>

                            <NavLink to = '/Login'> Login </NavLink>
                            
                        </>
                        
                    ) 
                }
                { 
                    LoginState === false &&  (
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
