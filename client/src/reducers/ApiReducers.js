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
    toggle: false, 
    deleteToggle: false,
    registerToggle: false

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

        case "Save_Update": 
        
            return {
                ...state,
                Country: [],
                States: [],
                City: [],
                toggle: true
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
                toggle: false,
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