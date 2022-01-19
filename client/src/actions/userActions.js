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
            console.log("userData from actions register: ", userData);
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
        Axios.put(`/updateUser/${id}`, values) 
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
        Axios.delete(`/deleteUser/${id}`)
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
export const getUserDetailsUser = (page, Request) => {
    
    return (dispatch) => {
        Axios.get(`/getUser/page=${page}/${Request}`) 
        .then(res => {
            const userData = res.data;
            dispatch({type: "getUserDetails_User", payload: userData})
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
