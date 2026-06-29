const express = require("express");
const {z} = require('zod')
const userRouter = express.Router();
const {User} = require('../db')
const jwt = require('jsonwebtoken')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET
app.use(express.json());


userRouter.post('/signup',async function(req,res){
    const requestBody = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    username : z.string().min(3)
})
   const Parsedata =  requestBody.safeParse(req.body)
   if(!Parsedata.success){
    res.status(400).json('invalid credintials')
    return
   }
   const userExist = await User.findOne({
    email : Parsedata.data.email
   })
   if(userExist){
    res.status(400).json({msg : 'user already exist'})
    return
   }
   const user = await User.create({
    email : Parsedata.data.email,
    password : Parsedata.data.password,
    username : Parsedata.data.username
   })
   res.status(201).json({msg : 'signed up successfully'})
})


userRouter.post('/signin',async function(req,res){
    const requestBody = z.object({
        email : z.string().email(),
        password : z.string().min(6)
    })
    const Parsedata =  requestBody.safeParse(req.body)
    if(!Parsedata.success){
     res.status(400).json({msg : 'invalid credintials'})
     return
    }
    const userExist = await User.findOne({
     email : Parsedata.data.email,
     password : Parsedata.data.password
    })
    if(!userExist){
     res.status(401).json({msg : 'user not exist'})
     return
    }
    const token = jwt.sign({id : userExist._id},process.env.JWT_USER_SECRET)
    res.status(201).json({token})
})


module.exports = { userRouter }