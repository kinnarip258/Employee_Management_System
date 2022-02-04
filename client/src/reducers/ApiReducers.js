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
    toggle: false
}

//========================== InitialState End =============================

//============================= Reducers Start =============================

const Reducers = (state = initialState, action) => {
    switch (action.type) {

        case "Register_User":
            return {
                ...state,
                LoginState: true, 
            }

        case "Save_Update": 
        
            return {
                ...state,
                toggle: true
            }

        case "Login_User":

            return {
                ...state,
                LoginState: false,
            
            }

        case "Delete_User":
            
            return  {
                ...state,
                LoginState: action.payload  
            }

        case "Get_UserDetails":

            return {
                ...state,
                user: action.payload.users,
                page: action.payload.totalPage,
                LoginUser: action.payload.LoginUser
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
            }

        case "CheckCookie":
            
        return {
            ...state,
            LoginState: action.payload.LoginState,
            cookie: action.payload.cookie

        }
        default:
            return state;
    }
}

//============================= Reducers End =============================

//============================= Export Default Start =============================

export default Reducers;

//============================= Export Default End =============================