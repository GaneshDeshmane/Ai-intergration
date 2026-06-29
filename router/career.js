const express = require('express')
const careerRouter = express.Router()
careerRouter.use(express.json())
const {authMiddleware} = require('../middlewares/authMiddleware')

careerRouter.post('/career',authMiddleware,function(req,res){
    const career = req.body.career
    res.status(201).json({career})
})

module.exports = { careerRouter : careerRouter }