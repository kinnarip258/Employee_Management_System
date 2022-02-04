//========================== Import Modules Start ===========================

import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Logout_User} from "../actions/userActions";

//========================== Import Modules End =============================

//============================= Logout Component Start =============================

const Logout = () => {

    //============================= Dispatch The Api Request =============================
    const dispatch = useDispatch();

    console.log("run")
    
    useEffect(() => {
        //============================= Logout The User =============================
        dispatch(Logout_User());      
    }, [dispatch]);

    return(
        <>
        </>
    )
};

//============================= Logout Component End =============================

//============================= Export Default Start =============================

export default Logout;

//============================= Export Default End =============================
