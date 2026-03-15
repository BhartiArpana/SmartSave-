import userModel from "../models/auth.model.js";
import bcrypt from 'bcryptjs'
import { sendMail } from "../services/mail.service.js";
import jwt from 'jsonwebtoken'

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

    const emailVerificationToken = jwt.sign({
        email:user.email
    },process.env.JWT_SECRET_KEY)

    await sendMail({
        to:user.email,
        subject:"welcome to SmartSave",
        html:`<h1>Hii, ${username}!</h1>
        <p>Thank you for registering with us. We're excited to have you on board and look forward to helping you achieve your financial goals.</p><p>If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The SmartSave Team</p>
          <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
        `,
    })

    res.status(200).json({
        message:'User register successfully!',
        success:true,
        user
    })


}

export async function verifyMail(req,res){
    const token = req.query.token

    if(!token){
        return res.status(409).json({
            message:'Token not provided',
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await userModel.findOne({email:decoded.email})

    if(!user){
        return res.status(409).json({
            message:"Inavlid token",
            error:'User not found'
        })
    }

    user.verified = true
    await user.save()

    const html = `
    <p>Email verified successfully!</p>
    <p>Your eamil has been verified . Now you can login in to your account.</p>
    <a href='http:localhost:3000/api/auth/login'/>Go to login</a>
    `
    res.send(html)
}

export async function login(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return res.status(401).json({
            message:'User not found.'
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)

    if(!isPasswordCorrect){
        return res.status(409).json({
            message:"Incorrect Password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message:"Please verify your email before loggin .",
            success:false,
            error:'Email not verified'
        })
    }

    const token  = jwt.sign({
        email:user.email
    },process.env.JWT_SECRET_KEY)

     res.cookie('token',token)
     res.status(200).json({
        message:'user loggedin successfully!',
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            verified:user.verified
        }
     })
}

export async function getMe(req,res){
    const email = req.user.email
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message:'UnAuthorized ',
            success:false,
            err:"User not found"
        })
    }

    res.status(200).json({
        message:"User fetched seccessfully!",
        user
    })


}