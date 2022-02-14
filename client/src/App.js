//========================== Import Modules Start ===========================

import React from "react"; 
import "./App.css";
import Navbar from "./Components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
//========================== Import Modules End =============================

//============================= App Start =============================

const App = () => {

    return (
        <>
            <Navbar/>
            <AppRoutes/>                                       
        </>      
    )
}

//============================= App End =============================

//============================= Export Default Start =============================

export default App;

//============================= Export Default End =============================