//========================== Import Modules Start ===========================

import React from 'react';
import Home from "../Components/Home";
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Error404 from "../Components/Error";
import Register from "../Components/Register";
import Logout from '../Components/Logout';
import ProtectedRoute from '../Components/ProtectedRoute';
import { Switch,Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

//========================== Import Modules End =============================

//============================= Routes Component Start =============================

const AppRoutes = () => {

    // for login-logout status
    const LoginState = useSelector(state => state.LoginState)

        return (
            <div>
                    <Switch>
                        <Route exact path = '/' component={Home} />
                        <Route exact path = '/Registration' component={Register} />
                        <Route exact path = '/editUser/:id' component={Register} />
                        <ProtectedRoute exact path = '/Logout' component={Logout} authStatus={!LoginState}/>
                        <ProtectedRoute exact path= '/Dashboard' component={Dashboard} authStatus={!LoginState}/>
                        {
                            LoginState ? (
                                <> 
                                    <Route exact path = '/Login' component={Login} />
                                </>
                            ) : <Redirect to= "/Dashboard"/>
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
