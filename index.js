const express = require("express");
const userRouter = require('./router/user')
const interviewRouter = require('./router/interview')
const careerRouter = require('./router/career')
const app = express();
app.use(express.json());
app.use('/user',userRouter)
app.use('/interview',interviewRouter)
app.use('/career',careerRouter)

app.listen(3000)