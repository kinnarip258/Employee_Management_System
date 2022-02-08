//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const express = require('express');
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');

//========================== Load Modules End =============================

//============================= Config File Path =============================
dotenv.config({path: './config.env'});

//============================= Load Database Connection File =============================
require('./db/conn');

//passes the cookie which is realated to user
app.use(cookieParser());

//============================= Convert Data to Json data =============================
app.use(express.json());

// app.use(bodyParser.urlencoded({extended: false, limit: "50mb"}));

// app.use(bodyParser.json({limit: "50mb"}));

//============================= Link Router File =============================
app.use(require('./router/routes'));


//============================= Server Port =============================
const PORT = process.env.PORT;

//============================= Run App =============================
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
});