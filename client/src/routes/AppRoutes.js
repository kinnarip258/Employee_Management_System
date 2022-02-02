//========================== Import Modules Start ===========================

import React, { useEffect } from 'react';
import Home from "../Components/Home";
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Error404 from "../Components/Error";
import Register from "../Components/Register";
import Logout from '../Components/Logout';
import ProtectedRoute from '../Components/ProtectedRoute';
import { Switch,Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { CheckCookie } from '../actions/userActions';


//========================== Import Modules End =============================

//============================= Routes Component Start =============================

const AppRoutes = () => {

    //============================= For Dispatch Action =============================
    const dispatch = useDispatch();

    //============================= CheckCookie For Login State =============================
    useEffect(() => {
        dispatch(CheckCookie())
    },[dispatch])
    
    //============================= For Login-Logout Status =============================
    const LoginState = useSelector(state => state.LoginState)
    console.log("LoginState", LoginState)
        return (
            <div>
                    <Switch>
                        <Route exact path = '/' component={Home} />
                        <ProtectedRoute exact path = '/EditUser/:id' component={Register} authStatus={!LoginState}/>
                        
                        <ProtectedRoute exact path = '/Registration' component={Register} authStatus={LoginState}/>

                        <ProtectedRoute exact path = '/Login' component={Login} authStatus={LoginState}/>
                        
                        {
                            LoginState === false ? (
                                <>

                                    <Route exact path = '/Logout' component={Logout} />

                                    <Route exact path= '/Dashboard' component={Dashboard} />
                                </>
                            ) : <Redirect to='/' />
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
