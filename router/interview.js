const express = require("express");
const interviewRouter = express.Router();
const {Interview} = require('../db')
interviewRouter.use(express.json())
const {authMiddleware} = require('../middlewares/authMiddleware')
interviewRouter.use(express.json())
interviewRouter.use(authMiddleware)
interviewRouter.post('/start',async function(req,res){
    const userId = req.userId
    const interview = await Interview.create({
        userId : userId,
        status : 'started'
    })
    res.status(201).json({interviewId : interview._id})
})

interviewRouter.post('/end',async function(req,res){
    const interviewId = req.body.interviewId
    const interview = await Interview.findById(interviewId)
    if(!interview){
        res.status(404).json('interview not found')
        return
    }
    interview.status = 'ended'
    await interview.save()
    res.status(201).json('interview ended successfully')
})

interviewRouter.get('/questions',async function(req,res){
    const interviewId = req.query.interviewId
    const userId = req.userId
    if(!interviewId){
        res.status(400).json('interviewId is not found')
        return
    }
    if(interview.userId !== userId){
        res.status(403).json('access denied')
        return
    }
    const interview = await Interview.findById(interviewId)
    const questions = await Interview.questions.find({interviewId : interviewId})
    res.status(200).json({questions})
})
inteviewRouter.post('/questions',async function(req,res){
    const interviewId = req.body.interviewId
    const userId = req.userId
    
})



module.exports = { interviewRouter : interviewRouter }

