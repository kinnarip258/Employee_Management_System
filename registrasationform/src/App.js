import React , {useEffect} from "react"; 
import "./App.css";
import Navbar from "./Components/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {

    return (
        <>
            <Navbar/>
            <AppRoutes/>                                       
        </>      
    )
}

export default App;