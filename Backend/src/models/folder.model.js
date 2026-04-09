import mongoose  from "mongoose";

const folderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    folderName:{
        type:String,
        required:true,

    },

},{
    timestamps:true
})

const folderModel = mongoose.model('folder',folderSchema)

export default folderModel