//========================== Import Modules Start ===========================
import Axios from 'axios';
//========================== Import Modules End =============================

//============================= Actions =============================

//============================= Register User Action Start =============================
export const RegisterUser = (values) => {
    return (dispatch) => {
        Axios.post(`/signUp`, values)
        .then(res => {
            const userData = res.data;
            alert("Register Successfully!")
            dispatch({type: "Register_User", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
            alert("Invalid Credentials!");
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
            const userData = res.data;
            alert("Login Successfully!")
            dispatch({type: "Login_User", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
            alert("Invalid Credentials!")
        });
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
export const GetUserDetails = (Page, Request) => {
    
    return (dispatch) => {
        Axios.get(`/getUser/?Page=${Page}&Request=${Request}`) 
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

