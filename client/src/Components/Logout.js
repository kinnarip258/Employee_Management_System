//========================== Import Modules Start ===========================

import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {LogoutUser} from "../actions/userActions";
import {useHistory} from 'react-router-dom';

//========================== Import Modules End =============================

//============================= Logout Component Start =============================

const Logout = () => {

    //============================= Dispatch The Api Request =============================
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        //============================= Logout The User =============================
        dispatch(LogoutUser());
        history.push('/Login');
    }, []);

    return(
        <>
        </>
    )
};

//============================= Logout Component End =============================

//============================= Export Default Start =============================

export default Logout;

//============================= Export Default End =============================
