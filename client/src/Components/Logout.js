//========================== Import Modules Start ===========================

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Logout_User} from "../actions/userActions";
import {useHistory} from "react-router-dom";
//========================== Import Modules End =============================

//============================= Logout Component Start =============================

const Logout = () => {

    //============================= Dispatch The Api Request =============================
    const dispatch = useDispatch();

    const LoginState = useSelector(state => state.LoginState)
    //============================= Navigate the Page =============================
    const history = useHistory();

    useEffect(() => {
        //============================= Logout The User =============================
        dispatch(Logout_User());  
        
    }, [dispatch]);

    useEffect(() => {
        if(LoginState === true){
            history.push('/'); 
        }   
    }, [LoginState])

    return(
        <>
        </>
    )
};

//============================= Logout Component End =============================

//============================= Export Default Start =============================

export default Logout;

//============================= Export Default End =============================
