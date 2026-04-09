import { Router } from "express";
import {createFolder} from '../controllers/folder.controller.js'
import { userAuth } from "../middleware/userAuth.middleware.js";

const router = Router()

router.post('/folder',userAuth,createFolder)

export default router