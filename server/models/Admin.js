const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
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
    role:{
        type:String,
        default:'admin'
    }
})

const Admin = mongoose.model('admin',AdminSchema);
module.exports = Admin;