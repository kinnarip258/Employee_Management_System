const express = require('express');
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");


//config file path
dotenv.config({path: './config.env'});

//database connection path
require('./db/conn');

//passes the cookie which is realated to user
app.use(cookieParser());

//convert data to json data
app.use(express.json());


//link the router file
app.use(require('./router/routes'));


//port of the server
const PORT = process.env.PORT;

//run the app in port
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
});