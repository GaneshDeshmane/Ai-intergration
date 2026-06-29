const { GoogleGenAI } = require("@google/genai");
const dotenv = require('dotenv');

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateQuestions(career){
    const prompt = `Generate 10 interview questions for the career: ${career}. Please provide the questions in a JSON array format.`;
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    });
    const cleanText = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    const questions = JSON.parse(cleanText);
    
    return questions;
}
module.exports = { generateQuestions : generateQuestions }