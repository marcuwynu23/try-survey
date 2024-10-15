const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Survey = require("./models");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection (Replace with your MongoDB URI)
const mongoURI = "mongodb://localhost:27017/surveyApp";
mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// POST route to save survey responses
app.post("/api/survey", async (req, res) => {
	try {
		console.log(req.body);
		const newSurvey = new Survey({
			surveyResult: req.body,
		});
		const savedSurvey = await newSurvey.save();
		res.json(savedSurvey);
	} catch (error) {
		res.status(500).json({ message: "Failed to save survey response" });
	}
});

// GET route to fetch survey responses
app.get("/api/survey-results", async (req, res) => {
	try {
		const Surveys = await Survey.find({});
		res.json(Surveys);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch survey responses" });
	}
});

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
