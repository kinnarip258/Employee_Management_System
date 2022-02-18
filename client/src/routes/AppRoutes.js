//========================== Import Modules Start ===========================

import React, { useEffect, useState } from 'react';
import Home from "../Components/Home";
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Error404 from "../Components/Error";
import Register from "../Components/Register";
import Logout from '../Components/Logout';
import ProtectedRoute from '../Components/ProtectedRoute';
import { Switch,Route, Redirect } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { CheckCookie } from '../actions/userActions';
import FileUpload from '../Components/FileUpload';
import Cookies from 'js-cookie'

//========================== Import Modules End =============================

//============================= Routes Component Start =============================

const AppRoutes = () => {

    const cookie = Cookies.get('jwt'); 

    const Loading = useSelector(state => state.Loading);
    const LoginUser = useSelector(state => state.LoginUser);

        return (
            <div>
                    <Switch>
                        <Route exact path = '/' component={Home} />
                        
                        <Route exact path = '/EditUser/:id' component={Register} />

                        <ProtectedRoute exact path = '/Files' component={FileUpload} authStatus={cookie}/>

                        <ProtectedRoute exact path= '/Dashboard' component={Dashboard} authStatus={cookie}/>
                        
                        
                        {
                            Loading ? null : <ProtectedRoute exact path = '/Logout' component={Logout} authStatus={cookie}/>
                        }
                        
                        {
                            LoginUser === "" && cookie === undefined ? (
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
