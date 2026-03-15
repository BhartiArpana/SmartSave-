import { Router } from "express";
import {register,verifyMail,login,getMe} from '../controllers/auth.controllers.js'
import { registerValidationRules } from "../validators/register.validator.js";
import {userAuth} from '../middleware/userAuth.middleware.js'
import { get } from "mongoose";

const router = Router()

// @routes post /auth/api/register
router.post('/register',registerValidationRules(),register)

// @routes get /auth/api/verify-email
router.get('/verify-email',verifyMail)

// @ post /api/auth/login
router.post("/login",login) 

// @get /api/auth/get-me
router.get('/get-me',userAuth,getMe)

export default router