import React , {useEffect} from "react"; 
import "./App.css";
import Navbar from "./Components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    return (
        <>
            <Navbar/>
            <AppRoutes/>                                       
        </>      
    )
}

export default App;