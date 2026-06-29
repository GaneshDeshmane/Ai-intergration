const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    username : String,
    email : String,
    password : String,
})

const CareerSchema = new Schema({
    title : String,
    description : String,
   
})

const InterviewSchema = new Schema({
    userId : {ref : 'User', type : ObjectId},
    CareerId : {ref : 'Career', type : ObjectId},
    score : Number,
    date : Date
})
const QuestionSchema = new Schema({
    question : String,
    answer : String,
    CareerId : {ref : 'Career', type : ObjectId}
})

const AnswerSchema = new Schema({
    userId : {ref : 'User', type : ObjectId},
    questionId : {ref : 'Question', type : ObjectId},
    userAnswer:String,

    aiFeedback:String,

    score:Number,

    answeredAt:Date

})

const User = mongoose.model('User',UserSchema)
const Career = mongoose.model('Career',CareerSchema)
const Interview = mongoose.model('Interview',InterviewSchema)
const Question = mongoose.model('Question',QuestionSchema)
const Answer = mongoose.model('Answer',AnswerSchema)

module.exports = {
    User,
    Career,
    Interview,
    Question,
    Answer
}


