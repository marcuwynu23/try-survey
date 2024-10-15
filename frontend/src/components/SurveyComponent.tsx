import React from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";
import { BorderlessLightPanelless } from "survey-core/themes";

// Survey JSON with 30 questions about programming languages
const surveyJSON = {
	title: "Programming Language Test",
	description: "Test your knowledge in various programming languages!",
	completedHtml:
		"<h2>Thank you for your feedback!</h2><p>We appreciate your time and effort in completing this survey. Your input is valuable to us.</p>",
	pages: [
		{
			name: "page1",
			elements: [
				// Multiple choice question
				{
					type: "radiogroup",
					name: "javascriptScope",
					title: "What is the scope of a variable declared with `let` in JavaScript?",
					isRequired: true,
					choices: [
						{ value: "block", text: "Block scope" },
						{ value: "function", text: "Function scope" },
						{ value: "global", text: "Global scope" },
					],
				},
				// True/False question
				{
					type: "boolean",
					name: "pythonInterpreted",
					title: "Python is an interpreted language.",
					isRequired: true,
				},
				// Text input question
				{
					type: "comment",
					name: "defineRecursion",
					title: "Define recursion in programming.",
					isRequired: true,
				},
				// More questions
				{
					type: "radiogroup",
					name: "javaInheritance",
					title: "In Java, what keyword is used to inherit a class?",
					isRequired: true,
					choices: [
						{ value: "inherit", text: "inherit" },
						{ value: "extends", text: "extends" },
						{ value: "super", text: "super" },
					],
				},
				{
					type: "radiogroup",
					name: "pythonIndentation",
					title: "How many spaces does Python recommend for indentation?",
					isRequired: true,
					choices: [
						{ value: "2", text: "2 spaces" },
						{ value: "4", text: "4 spaces" },
						{ value: "8", text: "8 spaces" },
					],
				},
				{
					type: "radiogroup",
					name: "cSharpInterfaces",
					title: "How do you define an interface in C#?",
					isRequired: true,
					choices: [
						{ value: "interface", text: "interface" },
						{ value: "struct", text: "struct" },
						{ value: "class", text: "class" },
					],
				},
				// Add more questions here to total 30
			],
		},
		{
			name: "page2",
        
			elements: [
				// Multiple choice question
				{
					type: "radiogroup",
					name: "javascriptScope",
					title: "What is the scope of a variable declared with `let` in JavaScript?",
					isRequired: true,
					choices: [
						{ value: "block", text: "Block scope" },
						{ value: "function", text: "Function scope" },
						{ value: "global", text: "Global scope" },
					],
				},
				// True/False question
				{
					type: "boolean",
					name: "pythonInterpreted",
					title: "Python is an interpreted language.",
					isRequired: true,
				},
				// Text input question
				{
					type: "comment",
					name: "defineRecursion",
					title: "Define recursion in programming.",
					isRequired: true,
				},
				// More questions
				{
					type: "radiogroup",
					name: "javaInheritance",
					title: "In Java, what keyword is used to inherit a class?",
					isRequired: true,
					choices: [
						{ value: "inherit", text: "inherit" },
						{ value: "extends", text: "extends" },
						{ value: "super", text: "super" },
					],
				},
				{
					type: "radiogroup",
					name: "pythonIndentation",
					title: "How many spaces does Python recommend for indentation?",
					isRequired: true,
					choices: [
						{ value: "2", text: "2 spaces" },
						{ value: "4", text: "4 spaces" },
						{ value: "8", text: "8 spaces" },
					],
				},
				{
					type: "radiogroup",
					name: "cSharpInterfaces",
					title: "How do you define an interface in C#?",
					isRequired: true,
					choices: [
						{ value: "interface", text: "interface" },
						{ value: "struct", text: "struct" },
						{ value: "class", text: "class" },
					],
				},
				// Add more questions here to total 30
			],
		},
	],
};

const SurveyComponent = () => {
	const survey = new Model(surveyJSON);
	survey.applyTheme(BorderlessLightPanelless);

	// Handle survey completion
	survey.onComplete.add((result: any) => {
		fetch("https://test-api.cloudmateria.com/api/survey", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(result.data),
		})
			.then((response) => response.json())
			.then((data) => console.log("Survey saved:", data))
			.catch((error) => console.error("Error:", error));
	});

	return (
		<div>
			<h1>Programming Language Test</h1>
			<Survey model={survey} />
		</div>
	);
};

export default SurveyComponent;
