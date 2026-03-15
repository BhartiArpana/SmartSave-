import jwt from 'jsonwebtoken'
export async function userAuth(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Anauthorized",
            succes:false,
            err:"Token not provided"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()

    }catch(err){
        return res.status(401).json({
            message:"Anauthorized",
            succes:false,
            err:'Invalid token'
        })
    }
}