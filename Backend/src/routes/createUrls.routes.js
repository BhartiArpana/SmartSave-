import Router from 'express'
import {userAuth} from '../middleware/userAuth.middleware.js'
import multer from 'multer'
import {createImageUrl,createPdfUrl} from '../controllers/createUrls.controllers.js'

const upload = multer({storage:multer.memoryStorage()})
const routes = Router()

// @ post /api/create/imageUrl
routes.post('/imageUrl',upload.single("image"),userAuth,createImageUrl)

// @ post /api/create/pdfUrl
routes.post('/pdfUrl', upload.single('pdf'),userAuth,createPdfUrl)


export default routes