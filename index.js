require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path =require('path')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

//Routes
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))
app.use('/api',require('./routes/paymentRouter'))

//Connect to mongodb
const URI=process.env.MONGODB_URL

const PORT = process.env.PORT || 5000;

mongoose.connect(URI).then(()=> {
    console.log('connected to MongoDB'); 
    app.listen(PORT,()=>{
        console.log('Server  is running on port',PORT);
    })
}).catch((err)=> {
    if (err) throw err; 
    console.log('no connection')
});


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}
// app.get('/',(req,res)=>{
//     res.json({msg:"Welcome to my channel , please subscribe for us. Thanks"})
// })



