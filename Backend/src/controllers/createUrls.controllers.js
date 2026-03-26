import cloudinary from "../config/cloudinaryConfig.js"
import streamifier from 'streamifier';




export async function createUrl(req, res){
const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    try {
         if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
        const streamUpload = (req) => {
            let rType;
            let flags=undefined
            let format = undefined
            return new Promise((resolve, reject) => {
                if(fileExtension=="pdf"){rType='raw'
                    flags= "attachment:false"
                    format= "pdf" 
                }
                else{rType="auto"}
                const stream = cloudinary.uploader.upload_stream( { resource_type:rType,flags:flags,format:format},(error, result) => {
                    // {resource_type: 'auto'}
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