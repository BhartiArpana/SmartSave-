import userModel from "../models/auth.model.js";
import bcrypt from 'bcryptjs'
import { sendMail } from "../services/mail.service.js";

export async function register(req,res){
    const {username,email,password} = req.body

     const isUserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
     })

     if(isUserExist){
        return res.status(400).json({
            message:'user already exists.',
            success:false
        })
     }
     const hash=await bcrypt.hash(password,10)
  
    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    await sendMail({
        to:user.email,
        subject:"welcome to SmartSave",
        html:`<h1>Hii, ${username}!</h1><p>Thank you for registering with us. We're excited to have you on board and look forward to helping you achieve your financial goals.</p><p>If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The SmartSave Team</p>`,
    })

    res.status(200).json({
        message:'User register successfully!',
        success:true,
        user
    })


}