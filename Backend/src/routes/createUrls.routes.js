import Router from 'express'
import {userAuth} from '../middleware/userAuth.middleware.js'
import multer from 'multer'
import {createUrl} from '../controllers/createUrls.controllers.js'

const upload = multer({storage:multer.memoryStorage()})
const routes = Router()

// @ post /api/create/imageUrl
routes.post('/file',userAuth,upload.single("file"),createUrl)




export default routes