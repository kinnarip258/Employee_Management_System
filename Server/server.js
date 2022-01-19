//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const express = require('express');
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");

//========================== Load Modules End =============================

//============================= Config File Path =============================
dotenv.config({path: './config.env'});

//============================= Load Database Connection File =============================
require('./db/conn');

//passes the cookie which is realated to user
app.use(cookieParser());

//============================= Convert Data to Json data =============================
app.use(express.json());


//============================= Link Router File =============================
app.use(require('./router/routes'));


//============================= Server Port =============================
const PORT = process.env.PORT;

//============================= Run App =============================
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
});