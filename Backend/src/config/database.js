import mongoose from 'mongoose'

 function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to database  ');
        
    }).catch((err)=>{
        console.log(err);
        
    })
}

export default connectToDb