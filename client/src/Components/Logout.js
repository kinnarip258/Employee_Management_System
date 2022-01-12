import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {LogoutUser} from "../actions/userActions"
import {useHistory} from 'react-router-dom'

const Logout = () => {
    
    //dispatch the api request
    const ApiDispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        //dispatch logout request
        ApiDispatch(LogoutUser());
        history.push('/')
    }, [])

    return(
        <>
        </>
    )
}

export default Logout;
