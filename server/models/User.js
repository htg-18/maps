const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNo: {
        type: String,
     },
})

const User = mongoose.model('user',UserSchema);
// User.createIndexes(); // stops entry of dublicate values
module.exports = User;