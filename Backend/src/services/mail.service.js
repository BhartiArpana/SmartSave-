import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN
    }
})

transporter.verify()
.then(()=>console.log('Transpoter is ready to send mail'))
.catch((error)=>console.log('Transpoter is failed to send mail',error)
)


export async function sendMail({to,subject,html, text}){
    const mailOption={
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }
    const detils = await transporter.sendMail(mailOption)
    console.log(detils);
    
}