const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
	surveyResult: { type: Schema.Types.Mixed, required: true },
	createdAt: { type: Date, default: Date.now },
});

const Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;
