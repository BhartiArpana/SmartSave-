import { ImageKit, toFile } from "@imagekit/nodejs"
import cloudinary from "../config/cloudinaryConfig.js"
import streamifier from 'streamifier';


const imagekit= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
export async function createImageUrl(req,res){
        const file=await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:'Test',
        folder:'cohort_insta_clone'

    })
   
    res.status(201).json({
        message:"image url created successfully!",
        file:file.url
    })
}

export async function createPdfUrl(req, res){

    try {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream( { resource_type: 'raw' },(error, result) => {
                    {resource_type: 'raw'}
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        const result = await streamUpload(req);
        res.json({
            message: 'pdf uploaded successfully',
            url: result.secure_url,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
}