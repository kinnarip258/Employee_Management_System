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
    Loading: false,
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
        case "Get_CountryStateCity":

            return {
                ...state,
                Country: action.payload.countries,
                States: action.payload.states,
                City: action.payload.cities
            }

        case "Login_User":

            return {
                ...state,
                LoginState: false,
                registerToggle: false
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
    
        case "Save_Update": 
        
            return {
                ...state,
                Country: [],
                States: [],
                City: [],
                updatetoggle: true
            }

        case "Delete_User":
            
            return  {
                ...state,
                LoginState: action.payload,
                deleteToggle: true,
                LoginUser: ''
            }
            
        case "Upload_File":
            
            return {
                ...state,
                Loading: false
            }
            
        case "Loading_Toggle":
            
            return {
                ...state,
                Loading: true
            }

        case "Get_File":
            return {
                ...state,
                Files: action.payload.files,
                filePage: action.payload.totalPage,
                LoginUser: action.payload.LoginUser,
                deleteToggle: false,    
            }
    
        case "Delete_File":
            
            return {
                ...state,
                Loading: false,
            }

        case "DeleteMulti_File":
            
            return {
                ...state,
                Loading: false,
            }
        
        case "Logout_User":
            
            return {
                ...state,
                LoginState: true,
                LoginUser: '',
                user: [],
                Files: [],
                filePage: []
            }

        default:
            return state;
    }
}

//============================= Reducers End =============================

//============================= Export Default Start =============================

export default Reducers;

//============================= Export Default End =============================