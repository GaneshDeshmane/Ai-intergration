const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const CareerSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const InterviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    careerId: {
        type: Schema.Types.ObjectId,
        ref: "Career",
        required: true
    },

    status: {
        type: String,
        enum: ["started", "ended"],
        default: "started"
    },

    score: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const QuestionSchema = new Schema({
    interviewId: {
        type: Schema.Types.ObjectId,
        ref: "Interview",
        required: true
    },

    question: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const AnswerSchema = new Schema({
    interviewId: {
        type: Schema.Types.ObjectId,
        ref: "Interview",
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },

    userAnswer: {
        type: String,
        required: true
    },

    aiFeedback: {
        type: String,
        default: ""
    },

    score: {
        type: Number,
        default: 0
    },

    answeredAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", UserSchema);
const CareerModel = mongoose.model("Career", CareerSchema);
const Interview = mongoose.model("Interview", InterviewSchema);
const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = {
    User,
    CareerModel,
    Interview,
    Question,
    Answer
};