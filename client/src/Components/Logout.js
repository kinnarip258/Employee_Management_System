//========================== Import Modules Start ===========================

import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {LogoutUser} from "../actions/userActions";

//========================== Import Modules End =============================

//============================= Logout Component Start =============================

const Logout = () => {

    //============================= Dispatch The Api Request =============================
    const dispatch = useDispatch();
    
    useEffect(() => {
        //============================= Logout The User =============================
        dispatch(LogoutUser());      
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
