//========================== Import Modules Start ===========================

import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

//========================== Import Modules End =============================

//============================= Actions =============================

//============================= Register User Action Start =============================
export const RegisterUser = (values) => {
    return (dispatch) => {
        Axios.post(`/signUp`, values)
        .then(res => {
            const userData = res.data;
            toast.success("Register Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: "Register_User", payload: userData})  
        })
        .catch(err => {
            console.log("error: ", err);
            toast.error("Email Or Phone Number Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
        
    }
}
//============================= End =============================

//============================= Save Updated Detils Of Employee Action Start =============================
export const SaveUpdate = (id,values) => {
    return (dispatch) => {
        Axios.put(`/updateUser/?ID=${id}`, values) 
        .then(res => {
            const userData = res.data;
            dispatch({type: "Save_Update", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }     
}
//============================= End =============================

//============================= Login User Action Start =============================
export const LoginUser = (values) => {
    
    return (dispatch) => {
        Axios.post(`/signIn`, values) 
        .then(res => {
            toast.success("Login Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: "Login_User"})
        })
        .catch(err => {
            console.log("error: ", err);
            toast.error("Invalid Credentials!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        });;
    }
}
//============================= End =============================

//============================= Delete Employee Action Start =============================
export const DeleteUser = (id) =>{
    return (dispatch) => {
        Axios.delete(`/deleteUser/?ID=${id}`)
        .then(res => {
            const userData = res.data;
            dispatch({type: "Delete_User", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }  
}
//============================= End =============================

//============================= Get Employees Details Action Start =============================
export const GetUserDetails = (Page,Sort, Request) => {
    
    return (dispatch) => {
        Axios.get(`/getUser/?Page=${Page}&Sort=${Sort}&Request=${Request}`) 
        .then(res => {
            const userData = res.data;
            dispatch({type: "Get_UserDetails", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}
//============================= End =============================

//============================= Logout User Action Start =============================
export const LogoutUser = () => {

    return (dispatch) => {
        Axios.get(`/logout`)
        .then(res => {
            const userData = res.data;
            dispatch({type: "Logout_User", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}
//============================= End =============================


//============================= Get Country, State, City =============================
export const GetCountryStateCity = (Search, CountryID, StateID) => {
    
    return (dispatch) => {
        Axios.get(`/getCountryStateCity/?Search=${Search}&CountryID=${CountryID}&StateID=${StateID}`)
        .then(res => {
            const userData = res.data;
            dispatch({type: "Get_CountryStateCity", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}
//============================= End =============================


//============================= Get Country, State, City =============================
export const CheckCookie = () => {
    
    return (dispatch) => {
        Axios.get(`/checkCookie`)
        .then(res => {
            const userData = res.data;
            dispatch({type: "CheckCookie", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}
//============================= End =============================

