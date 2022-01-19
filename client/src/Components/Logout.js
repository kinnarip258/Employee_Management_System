//========================== Import Modules Start ===========================

import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {LogoutUser} from "../actions/userActions";
import {useHistory} from 'react-router-dom';

//========================== Import Modules End =============================

//============================= Logout Component Start =============================

const Logout = () => {

    //dispatch the api request
    const ApiDispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        //dispatch logout request
        ApiDispatch(LogoutUser());
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
