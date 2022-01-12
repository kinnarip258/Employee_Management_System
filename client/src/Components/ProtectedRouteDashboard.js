import React from 'react'
import {Route, Redirect} from 'react-router-dom';

//protected route
//authstate: authenticate state
//component: componenet connected with route
//...rest: rest of the properties
const ProtectedRouteDashboard = ({authStatus, component: Component, ...rest}) => {
    console.log("authstatus, ", authStatus);
    
    return (
        <>  
            <Route {...rest} render= {(props) => {
                //authState is true then show the component
                if(authStatus) {
                    return <Component {...props}/>;
                }
                else{
                    return <Redirect to='/Login' />;
                }
            }}/> 
        </>
    )   
}

export default ProtectedRouteDashboard;
