//========================== Import Modules Start ===========================

//========================== Import Modules End =============================

//========================== InitialState Start ===========================

const initialState = {
    user: [],
    page: [],
    Country: [], 
    States: [],
    City: [],  
    LoginState: true,
    LoginUser: "",
    updatetoggle: false, 
    deleteToggle: false,
    registerToggle: false,
    Files: [],
    Gallary: [],
    Loding: true,
    filePage: []

}
//========================== InitialState End =============================

//============================= Reducers Start =============================

const Reducers = (state = initialState, action) => {
    switch (action.type) {

        case "Register_User":
            return {
                ...state,
                registerToggle: true
            }

        case "Register_Toggle":
            
            return {
                ...state,
                registerToggle: false
            }

        case "Get_File":

            return {
                ...state,
                Files: action.payload.files,
                filePage: action.payload.totalPage,
                deleteToggle: false,    
            }

        case "Upload_File":
            
            return {
                ...state,
                Loding: false
            }
            
        case "Loading_Toggle":
            
            return {
                ...state,
                Loding: true
            }
        case "Delete_File":
            
            return {
                ...state,
                deleteToggle: true,
            }
        case "Save_Update": 
        
            return {
                ...state,
                Country: [],
                States: [],
                City: [],
                updatetoggle: true
            }

        case "Login_User":

            return {
                ...state,
                LoginState: false,
                registerToggle: false
            }

        case "Delete_User":
            
            return  {
                ...state,
                LoginState: action.payload,
                deleteToggle: true,
                LoginUser: ''
            }

        case "Get_UserDetails":

            return {
                ...state,
                user: action.payload.users,
                page: action.payload.totalPage,
                LoginUser: action.payload.LoginUser,
                updatetoggle: false,
                deleteToggle: false,
            }

        case "Get_CountryStateCity":

            return {
                ...state,
                Country: action.payload.countries,
                States: action.payload.states,
                City: action.payload.cities
            }
    
        case "Logout_User":
            
            return {
                ...state,
                LoginState: true,
                LoginUser: ''
            }

        case "CheckCookie":
            
        return {
            ...state,
            LoginState: action.payload.LoginState,

        }

        default:
            return state;
    }
}

//============================= Reducers End =============================

//============================= Export Default Start =============================

export default Reducers;

//============================= Export Default End =============================