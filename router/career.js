const express = require("express");
const CareerRouter = express.Router();

const {CareerModel } = require("../db")
const { authMiddleware } = require("../middlewares/authMiddleware");

CareerRouter.use(express.json());

CareerRouter.post("/Career", authMiddleware, async (req, res) => {
    try {

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const existingCareer = await CareerModel.findOne({ title });

        if (existingCareer) {
            return res.status(409).json({
                message: "Career already exists"
            });
        }

        const Career = await CareerModel.create({
            title,
            description
        });

        res.status(201).json({
            message: "Career created successfully",
            career: Career
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal server error"
        });

    }
});

CareerRouter.get("/Career", authMiddleware, async (req, res) => {
    try {

        const Careers = await CareerModel.find();

        res.status(200).json({
            Careers: Careers
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error"
        });

    }
});

CareerRouter.get("/Career/:id", authMiddleware, async (req, res) => {
    try {

        const Career = await CareerModel.findById(req.params.id);

        if (!Career) {
            return res.status(404).json({
                message: "Career not found"
            });
        }

        res.status(200).json({
            Career
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error"
        });

    }
});

module.exports = {
    CareerRouter
};
module.exports = { CareerRouter : CareerRouter }