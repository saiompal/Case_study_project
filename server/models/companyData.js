const mongoose = require('mongoose');

const Schema = mongoose.Schema
const companySchema = new Schema({
    company:String,
    price:Number,
    change_percent:Number
})

module.exports=mongoose.model('companyData',companySchema,'CompanyData')