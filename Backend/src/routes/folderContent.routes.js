import express from 'express'
import { userAuth } from '../middleware/userAuth.middleware.js'
import { createFolder, addContent} from '../controllers/addContent.controller.js'

const router =express.Router()

// post /api/create/folder
router.post('/folder',userAuth,createFolder)

//  post  /api/create/content
router.post('/content',userAuth,addContent)



export default router