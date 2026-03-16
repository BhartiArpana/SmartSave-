import mongoose, { mongo } from "mongoose";

const folderContentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"UserId required for creating an object"]    
    },
    folderId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Userfolders",
         required:[true,'folder name required ']
    },
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    tags:[String]
},{
    timestamps:true
})
const folderContentModel  = mongoose.model('folderContent',folderContentSchema)
export default folderContentModel