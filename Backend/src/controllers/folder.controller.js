import folderModel from "../models/folder.model.js";
import {generateFolder} from '../services/ai.service.js'

export async function createFolder (req,res){
     const {title,link,description,type} = req.body
     const user = req.user
    //  console.log(user);
     

     const response = await generateFolder({title,link,description,type})
     if(!response){
        return res.status(400).json({
            message:"No response"
        })
     }

     const isFolderExist = await folderModel.findOne({folderName:response})
     if(isFolderExist){
        return res.status(409).json({
            message:"folder already exist "
        })
     }
     const folder = await folderModel.create({
        userId:user._id,
        folderName:response
     })
     res.status(201).json({
        message:"response : ",
        folder
     })
}

export async function createInsideContent(req,res){
    
}