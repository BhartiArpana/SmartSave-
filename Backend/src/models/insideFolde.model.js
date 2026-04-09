import mongoose from "mongoose";

const insideFolderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    folderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'folder',
        required:true
    },
    title:String,
    url:String,
    description:String,
    type:String,
    tags:{
        type:String,
        default:[]
    }
},{
    timestamps:true
})

const insideFolderModel = mongoose.model('insideFolder',insideFolderSchema)

export default insideFolderModel;