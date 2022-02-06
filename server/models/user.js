const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    type:String,
    username:String,
    email:String,
    password:String,
    confirmpassowrd:String,
    watchlist:[String]
})

module.exports=mongoose.model('user',userSchema,'Users')