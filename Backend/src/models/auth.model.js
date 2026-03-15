import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username required for registeration'],
    },
    email:{
        type:String,
        required:[true,'Email required for registration'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password required for registration'],
        select:false
    },
    verified:{
        type:String,
        default:false
    }
})

const userModel = mongoose.model('users',authSchema)

export default userModel