import Axios from 'axios';

//Register User action
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

//Save Update action
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

//Login User action
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

//Delete User action
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

//get Login User Detail action 
export const getUserDetailsUser = (page) => {
    
    return (dispatch) => {
        Axios.get(`/getUsers/page=${page}`) 
        .then(res => {
            const userData = res.data;
            dispatch({type: "getUserDetails_User", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}

//Logout User action
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


//Search User action
export const SearchUser = (searchUser) => {
    return (dispatch) => {
        Axios.get(`/searchuser=${searchUser}`)
        .then(res => {
            const userData = res.data;
            dispatch({type: "Search_User", payload: userData}) 
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}

//Ascending User action
export const AscendingName = () => {
    return (dispatch) => {
        Axios.get(`/ascending`)
        .then(res => {
            const userData = res.data;
            dispatch({type: "Ascending_Name", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}

//Descending User action
export const DescendingName = () => {
    return (dispatch) => {
        Axios.get(`/descending`)
        .then(res => {
            const userData = res.data;
            dispatch({type: "Descending_Name", payload: userData})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}