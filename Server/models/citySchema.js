//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');

//========================== Load Modules End =============================

//============================= Model Schema Of City =============================

const citySchema = new mongoose.Schema({

    CityName : {
        type: String,
        required:true
    },
    CityID: {
        type: Number,
        required:true
    },
    StateID: {
        type: Number,
        required:true
    },
})

//============================= User Model =============================
const City = mongoose.model('City', citySchema);

//========================== Export Module Start ===========================

module.exports = City;

//========================== Export module end ==================================