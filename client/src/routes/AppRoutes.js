//========================== Import Modules Start ===========================

import React, { useEffect } from 'react';
import Home from "../Components/Home";
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Error404 from "../Components/Error";
import Register from "../Components/Register";
import Logout from '../Components/Logout';
import ProtectedRoute from '../Components/ProtectedRoute';
import { Switch,Route, Redirect, NavLink} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { CheckCookie } from '../actions/userActions';



//========================== Import Modules End =============================

//============================= Routes Component Start =============================

const AppRoutes = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CheckCookie());
    }, [Route, ProtectedRoute])

    //============================= For Login-Logout Status =============================
    const LoginState = useSelector(state => state.LoginState)

    console.log("LoginState", LoginState)
        return (
            <div>
                    <Switch>
                        <Route exact path = '/' component={Home} />
                        
                        <ProtectedRoute exact path = '/EditUser/:id' component={Register} authStatus={LoginState}/>

                        <ProtectedRoute exact path = '/Logout' component={Logout} authStatus={LoginState}/>

                        <ProtectedRoute exact path= '/Dashboard' component={Dashboard} authStatus={LoginState}/>
                        
                        {
                            LoginState !== false ? (
                                <>
                                    <Route exact path = '/Login' component={Login} /> 

                                    <Route exact path = '/Registration' component={Register} />
                                </>
                            ) : <Redirect to='/Dashboard' />
                        }
      
                        <Route component={Error404} />    
                    </Switch>   
            </div>
        )
    
}

//============================= Routes Component End =============================

//============================= Export Default Start =============================

export default AppRoutes;

//============================= Export Default End =============================
