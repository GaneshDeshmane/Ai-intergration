const express = require("express");
const {userRouter} = require('./router/user')
const {interviewRouter} = require('./router/interview')
const {CareerRouter} = require('./router/career')
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use('/user',userRouter)
app.use('/interview',interviewRouter)
app.use('/Career',CareerRouter)
mongoose.connect(process.env.mongodb)
app.listen(3000)