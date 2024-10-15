import React, { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
} from "recharts";

// Define the type for the survey results
type SurveyResult = {
	surveyResult: {
		[key: string]: any; // SurveyResult can have multiple dynamic keys
	};
};

const SurveyDashboard = () => {
	const [surveyData, setSurveyData] = useState<SurveyResult[]>([]);

	useEffect(() => {
		fetch("https://test-api.cloudmateria.com/api/survey-results")
			.then((response) => response.json())
			.then((data: SurveyResult[]) => setSurveyData(data))
			.catch((error) => console.error("Error fetching survey data:", error));
	}, []);

	// Aggregating data for chart display
	const aggregateData = (field: string) => {
		const count: { [key: string]: number } = {};
		surveyData.forEach((item) => {
			const value = item.surveyResult[field];
			count[value] = (count[value] || 0) + 1;
		});
		return Object.entries(count).map(([name, value]) => ({ name, value }));
	};

	const experienceData = aggregateData("javascriptScope");
	const recommendData = aggregateData("pythonInterpreted");

	return (
		<div>
			<h1>Survey Results</h1>

			<h3>JavaScript Scope Understanding</h3>
			<BarChart width={500} height={300} data={experienceData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="value" fill="#8884d8" />
			</BarChart>

			<h3>Python: Interpreted or Not</h3>
			<PieChart width={400} height={400}>
				<Pie data={recommendData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
					{recommendData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={index === 0 ? "#0088FE" : "#FF8042"} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</div>
	);
};

export default SurveyDashboard;
