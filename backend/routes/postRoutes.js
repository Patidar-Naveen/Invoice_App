const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');
const jwtSecret="asd889asds5656asdas887";
const catModel = require('../db/userSchema')
const productModel = require('../db/productSchema')
const nodemailer=require('nodemailer');
const multer = require('multer')

const storage=multer.memoryStorage();
var upload =multer({storage:storage})

router.post("/addpost",(req,res)=>{
    let ins = new catModel({name:req.body.name,contact:req.body.contact,firmname:req.body.firmname ,email:req.body.email, password:req.body.password, cpassword:req.body.cpassword})
    console.log(ins)
    ins.save((e)=>{
        if(e){
            res.send("Already added")
        }
        else{
            res.send("category added")
        }
    })
})

router.post("/fetchdata",(req,res)=>{
    let email=req.body.email;
    console.log(email)
    console.log(req.body.email)

    productModel.find({email:email},(err,data)=>{
        if(err) throw err;
        else{
        res.send(data)
        }
       })
})

router.post("/validate", (req, res) => {
    let email=req.body.email;
    let password=req.body.password;
    catModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            console.log(data)
            let payload={
                id:data._id,
                email:data.email,name:data.name, contact:data.contact, firmname:data.firmname
            }
            console.log(payload,"in")
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})

router.post("/addinvoice",(req,res)=>{
      let productdata = new productModel({
          rname:req.body.rname, 
          remail:req.body.remail, 
          raddress:req.body.raddress, 
          rdate:req.body.rdate, 
          email:req.body.email,
          product:req.body.product, 
          status:req.body.status
        })
      productdata.save((e)=>{
        if(e){
            res.send("Already added")
        }
        else{
            res.send("category added")
        }
    })
})

router.post("/deleteinvoice",(req,res)=>{
    console.log(req.body, "In post routes")
    productModel.deleteOne({_id:req.body._id},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})

router.post("/updateinvoice",(req,res)=>{
    console.log(req.body, "In post routes")
    productModel.updateOne({_id:req.body._id},{$set:{status:'PAID'}},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
router.post("/updateuser",(req,res)=>{
    let email= req.body.email
    console.log(req.body, "in update")
    catModel.findOneAndUpdate({_id:req.body.id},{$set:{name:req.body.name, contact:req.body.contact, email:req.body.email,firmname:req.body.firmname }},{new:true},(err,data)=>{
        if(err) throw err;
        else {
            console.log(data,"in line 102")
            let payload={
                id:data._id,
                email:data.email,name:data.name, contact:data.contact, firmname:data.firmname
            }
            console.log(payload,"payload")
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
            
        }
    })
})
router.post('/email/:remail',upload.single('file') , (req,res)=>{
    console.log(req.body.remail)
 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'novydevyjones@gmail.com',
        pass: 'Novy@6132'
      }
    });

    var mailOptions = {
      from: 'novydevyjones@gmail.com',
      to: req.params.remail,
      subject: 'Invoice PDF',
      text:
       
       `Dear Customer,

       Your Have Successfully downloaded the pdf and We have attached the pdf here. Please find Attached PDF.
       
       Thank You!`,
       attachments: [{
        filename: 'invoice.pdf',
        content: req.file.buffer,
      }],

    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send("Email Sent!")
  })
module.exports=router;