const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 5000
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
const postRoutes= require('./routes/postRoutes')
app.use("/posts",postRoutes)
const db="mongodb://localhost:27017/invoice_pdf"  

const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MondoDB connected")
    }
    catch(err){
        console.log(err.message)
    }
}
connectDB();

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`)
})