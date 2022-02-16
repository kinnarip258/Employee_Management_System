//========================== Import Modules Start ===========================
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

//========================== Import Modules End =============================

//============================= Actions =============================

//============================= Register User Action Start =============================
export const Register_User = (values) => {

    return (dispatch) => {
        Axios.post(`/signUp`, values)
        .then(() => {
            toast.success("Register Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: "Register_User"});
        })
        .catch(() => {
            toast.error("Email Or Phone Number Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
        
    }
}
//============================= End =============================

//============================= Register Toggle Action Start =============================
export const Register_Toggle = () => {

    return (dispatch) => {
        dispatch({type: "Register_Toggle"})        
    }
}
//============================= End =============================



//============================= Save Updated Detils Of Employee Action Start =============================
export const Save_Update = (id,values, editUser) => {

    return (dispatch) => {
        Axios.put(`/updateUser/?ID=${id}&editUser=${editUser}`, values)
        .then(() => {
            toast.success("Data Updated Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: "Save_Update"})
        })
        .catch(() => {
            toast.error("Email Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        });
    }     
}
//============================= End =============================

//============================= Login User Action Start =============================
export const Login_User = (values) => {
    
    return (dispatch) => {
        Axios.post(`/signIn`, values) 
        .then(() => {
            toast.success("Login Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: "Login_User"})
        })
        .catch(() => {
            toast.error("Invalid Credentials!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        });;
    }
}
//============================= End =============================

//============================= Delete Employee Action Start =============================
export const Delete_User = (email) =>{

    return (dispatch) => {
        Axios.delete(`/deleteUser/?Email=${email}`)
        .then((res) => {
            toast.success("Deleted Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            dispatch({type: "Delete_User", payload: res.data})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }  
}
//============================= End =============================

//============================= Get Employees Details Action Start =============================
export const Get_UserDetails = (Page,Sort, Search) => {
    
    return (dispatch) => {
        Axios.get(`/getUser/?Page=${Page}&Sort=${Sort}&Search=${Search}`) 
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
export const Logout_User = () => {

    return (dispatch) => {
        Axios.get(`/logout`)
        .then(() => {
            toast.success("Logout Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            dispatch({type: "Logout_User"})
        })
        .catch(err => {
            console.log("error: ", err);
        });
    }
}
//============================= End =============================


//============================= Get Country, State, City =============================
export const Get_CountryStateCity = (Search, CountryID, StateID) => {
    
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


//============================= Upload File =============================
export const Upload_File  = (file) => {
    
    return (dispatch) => {
        Axios.post(`/uploadFile`, file)
        .then((res) => {
            console.log("res", res.data);
            if(res.data.length <= 0){
                toast.success("File Upload Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
            else{
                toast.success(`${res.data} not Uploaded!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
            dispatch({type: "Upload_File"})
        })
        .catch((err) => {
            dispatch({type: "Upload_File"});

            toast.error("File Type Not Supported!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }
}
//============================= End =============================


//============================= Get File =============================
export const Get_File  = (page) => {
    
    return (dispatch) => {
        Axios.get(`/files/?&Page=${page}`)
        .then((res) => {
            dispatch({type: "Get_File", payload: res.data})
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
//============================= End =============================

//============================= Delete File =============================
export const Delete_File  = (id) => {
    
    return (dispatch) => {
        Axios.delete(`/deleteFiles/?ID=${id}`)
        .then(() => {
            toast.success("File Delete Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: "Delete_File"});
        })
        .catch(() => {
            dispatch({type: "DeleteMulti_File"});
            
            toast.error("File Not Deleted!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        });
    }
}
//============================= End =============================



//============================= Delete Multiple File =============================
export const DeleteMulti_File  = (files) => {

    return (dispatch) => {
        Axios.put(`/deleteMultiFiles`, files)
        .then(() => {
            toast.success("File Delete Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: "DeleteMulti_File"});
        })
        .catch(() => {
            dispatch({type: "DeleteMulti_File"});
            
            toast.error("File Not Deleted!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        });
    }
}
//============================= End =============================

//============================= Upload File Toggle Action Start =============================
export const Loading_Toggle = () => {

    return (dispatch) => {
        dispatch({type: "Loading_Toggle"})        
    }
}
//============================= End =============================

