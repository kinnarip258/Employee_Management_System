//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');

//========================== Load Modules End =============================

//============================= Model Schema Of City =============================

const stateSchema = new mongoose.Schema({
    
    StateName : {
        type: String,
        required:true
    },
    StateID : {
        type: Number,
        required:true
    },
    CountryID : {
        type: Number,
        required:true
    }
   
})

//============================= User Model =============================
const State = mongoose.model('State', stateSchema);

//========================== Export Module Start ===========================

module.exports = State;

//========================== Export module end ==================================