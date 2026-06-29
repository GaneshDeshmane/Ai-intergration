const express = require("express");
const interviewRouter = express.Router();
const {
    Interview,
    Question,
    Answer,
    CareerModel
} = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { generateQuestions } = require("../model");
const app = express();
app.use(express.json());
app.use(authMiddleware);

//
// START INTERVIEW
//
interviewRouter.post("/start", async (req, res) => {

    try {

        const { CareerId } = req.body;

        const Career = await CareerModel.findById(CareerId);

        if (!Career) {
            return res.status(404).json({
                message: "Career not found"
            });
        }

        const interview = await Interview.create({
            userId: req.userId,
            CareerId,
            status: "started",
            date: new Date()
        });

        const generatedQuestions =
            await generateQuestions(Career.title);

        for (const q of generatedQuestions) {

            await Question.create({
                interviewId: interview._id,
                question: q
            });

        }

        res.status(201).json({
            interviewId: interview._id
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });

    }

});

//
// GET QUESTIONS
//
interviewRouter.get("/questions", async (req, res) => {

    try {

        const { interviewId } = req.query;

        const interview =
            await Interview.findOne(interviewId);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found"
            });
        }

        if (interview.userId.toString() !== req.userId) {

            return res.status(403).json({
                message: "Access denied"
            });

        }

        const questions =
            await Question.find({
                interviewId
            });

        res.json({
            questions
        });

    } catch (err) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

//
// SUBMIT ANSWER
//
interviewRouter.post("/answer", async (req, res) => {

    try {

        const {
            interviewId,
            questionId,
            userAnswer
        } = req.body;

        const interview =
            await Interview.findById(interviewId);

        if (!interview) {

            return res.status(404).json({
                message: "Interview not found"
            });

        }

        if (interview.userId.toString() !== req.userId) {

            return res.status(403).json({
                message: "Access denied"
            });

        }

        const question =
            await Question.findById(questionId);

        if (!question) {

            return res.status(404).json({
                message: "Question not found"
            });

        }

        // TODO:
        // Call Gemini here to evaluate the answer

        const aiFeedback = "Good explanation.";
        const score = 8;

        await Answer.create({

            interviewId,

            userId: req.userId,

            questionId,

            userAnswer,

            aiFeedback,

            score,

            answeredAt: new Date()

        });

        res.json({

            message: "Answer submitted",

            aiFeedback,

            score

        });

    } catch (err) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

//
// END INTERVIEW
//
interviewRouter.post("/end", async (req, res) => {

    try {

        const { interviewId } = req.body;

        const interview =
            await Interview.findById(interviewId);

        if (!interview) {

            return res.status(404).json({
                message: "Interview not found"
            });

        }

        if (interview.userId.toString() !== req.userId) {

            return res.status(403).json({
                message: "Access denied"
            });

        }

        const answers =
            await Answer.find({
                interviewId
            });

        let total = 0;

        answers.forEach(answer => {

            total += answer.score;

        });

        interview.score = total;
        interview.status = "ended";

        await interview.save();

        res.json({

            message: "Interview ended",

            score: total

        });

    } catch (err) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

module.exports = {
    interviewRouter
};