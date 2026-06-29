const express = require("express");
const careerRouter = express.Router();

const { Career } = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");

careerRouter.use(express.json());

careerRouter.post("/career", authMiddleware, async (req, res) => {
    try {

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const existingCareer = await Career.findOne({ title });

        if (existingCareer) {
            return res.status(409).json({
                message: "Career already exists"
            });
        }

        const career = await Career.create({
            title,
            description
        });

        res.status(201).json({
            message: "Career created successfully",
            career
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal server error"
        });

    }
});

careerRouter.get("/career", authMiddleware, async (req, res) => {
    try {

        const careers = await Career.find();

        res.status(200).json({
            careers
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error"
        });

    }
});

careerRouter.get("/career/:id", authMiddleware, async (req, res) => {
    try {

        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({
                message: "Career not found"
            });
        }

        res.status(200).json({
            career
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error"
        });

    }
});

module.exports = {
    careerRouter
};
module.exports = { careerRouter : careerRouter }