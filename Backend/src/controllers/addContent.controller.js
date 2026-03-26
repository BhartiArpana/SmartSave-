import userFolderModel from "../models/userFolder.model.js";
import folderContentModel from '../models/folderContent.model.js' 

export async function createFolder(req,res){
    const {folders} = req.body
    const user = req.user
    // console.log(user._id);
    

    const isFolderxist = await userFolderModel.findOne({
        folders:folders,
        userId:user._id
    })
    if(isFolderxist){
        return res.status(409).json({
            message:"Folder already exist"
        })
    }
    const folder = await userFolderModel.create({
        userId:user._id,
        folders:folders,
        
    }) 
    res.status(201).json({
        message:'Folder created successfully!',
        folder
    })
}

export async function addContent(req,res){
    const {folderId,type,title,url,tags,description } = req.body
    const user = req.user

    const isFolderExist = await userFolderModel.findOne({
        _id:folderId,
        userId:user._id
    })

    if(!isFolderExist){
        return res.status(404).json({
            message:"Folder does not exist "
        })
    }

    const createContent = await folderContentModel.create({
        userId:user._id,
        folderId:folderId,
        type:type,
        title:title,
        url:url || null,
        tags:tags || [],
        description:description || null
    })

    res.status(201).json({
        message:"Content save successfully!",
        createContent
    })
}

export async function getFolder(req,res){
    const user = req.user
    
    const folder = await userFolderModel.find({userId:user._id})

    if(!folder){
        return res.status(200).json({
            message:"Folder not found!"
        })
    }

    res.status(200).json({
        message:'folder fetch successfully!',
        folder
    })
}

export async function getContentByFolder(req,res){
    const {folderId}=req.params
    const user = req.user

    const isFolderExist = await userFolderModel.findOne({
        userId:user._id,
        _id:folderId
    })
    if(!isFolderExist){
        return res.status(404).json({
            message:"Folder doen't exist"
        })
    }

    const folderContent = await folderContentModel.find({
        userId:user._id,
        folderId:folderId
    })

    if(!folderContent){
        return res.status(200).json({
            message:"No content available ."
        })
    }

    res.status(200).json({
        message:'content found',
        folderContent
    })
}