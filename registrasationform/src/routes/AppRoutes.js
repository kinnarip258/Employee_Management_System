import React, { useEffect } from 'react'
import Home from "../Components/Home";
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Error404 from "../Components/Error";
import Register from "../Components/Register";
import Logout from '../Components/Logout';
import ProtectedRoute from "../Components/ProtectedRoute";
import { Switch,Route} from "react-router-dom";
import {useSelector} from "react-redux";

const AppRoutes = () => {

    //loginState for login-logout status
    const LoginState = useSelector(state => state.LoginState);
    
    return (
        <div>
                <Switch>
                    <Route exact path = "/" component={Home} />
                    <Route exact path = "/Registration" component={Register} />
                    <Route exact path = "/editUser/:id" component={Register} />               
                    <ProtectedRoute exact path = "/Login" component={Login} authStatus={!LoginState}/>
                    <ProtectedRoute exact path= "/About" component={Dashboard} authStatus={LoginState}/>
                    <ProtectedRoute exact path = "/Logout" component={Logout} authStatus={LoginState}/>
                    <Route component={Error404} />    
                </Switch>   
        </div>
    )
}

export default AppRoutes
