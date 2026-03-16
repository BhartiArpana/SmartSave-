import Router from 'express'
import { userAuth } from '../middleware/userAuth.middleware.js'
import { getFolder,getContentByFolder } from '../controllers/addContent.controller.js'

const router = Router()

// get /api/get/folder
router.get('/folder',userAuth,getFolder)

// get /api/get/content:folderId
router.get('/content/:folderId',userAuth,getContentByFolder)
export default router