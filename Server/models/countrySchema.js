//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');

//========================== Load Modules End =============================

//============================= Model Schema Of City =============================

const countrySchema = new mongoose.Schema({
    
    CountryName : {
        type: String,
        required:true
    },
    CountryID: {
        type: Number,
        required:true
    }
})

//============================= User Model =============================
const Country = mongoose.model('Country', countrySchema);

//========================== Export Module Start ===========================

module.exports = Country;

//========================== Export module end ==================================