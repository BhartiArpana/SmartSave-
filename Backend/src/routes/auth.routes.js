import { Router } from "express";
import {register} from '../controllers/auth.controllers.js'
import { registerValidationRules } from "../validators/register.validator.js";

const router = Router()

// @routes post /auth/api/register
router.post('/register',registerValidationRules(),register)

export default router