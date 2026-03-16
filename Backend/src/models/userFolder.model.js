import mongoose, { mongo } from 'mongoose'

const userFolderSchema = new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"UserId required for creating an object"]
   },
   folders:{
    type:String,
    required:[true,"Foldername required "],
    unique:true
   }
},{
    timestamps:true
})

const userFolderModel = mongoose.model('Userfolders',userFolderSchema)

export default userFolderModel