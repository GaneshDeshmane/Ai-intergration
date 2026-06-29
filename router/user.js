const express = require("express");
const {z} = require('zod')
const router = express.Router();
const {User} = require('../db')
const jwt = require('jsonwebtoken')
router.use(express.json())

router.post('/signup',async function(req,res){
    const requestBody = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    username : z.string().min(3)
})
   const Parsedata =  requestBody.safeParse(req.body)
   if(!Parsedata.success){
    res.status(401).json('invalid credintials')
    return
   }
   const userExist = await User.findOne({
    email : Parsedata.data.email
   })
   if(userExist){
    res.status(401).json('user already exist')
    return
   }
   const user = await User.create({
    email : Parsedata.data.email,
    password : Parsedata.data.password,
    username : Parsedata.data.username
   })
   res.status(201).json('signed up successfully')
})


router.post('signin',function(req,res){
    const requestBody = z.object({
        email : z.string().email(),
        password : z.string().min(6)
    })
    const Parsedata =  requestBody.safeParse(req.body)
    if(!Parsedata.success){
     res.status(401).json('invalid credintials')
     return
    }
    const userExist = await User.findOne({
     email : Parsedata.data.email,
     password : Parsedata.data.password
    })
    if(!userExist){
     res.status(401).json('user not exist')
     return
    }
    const token = jwt.sign({id : userExist._id},process.env.JWT_SECRET)
    res.status(201).json({token})
})

