#! /usr/bin/env node
const { uploadData } = require('../commands/spreadsheet');
const { fetchData } = require('../commands/plausible');
const { setupQuestions, metricOptions } = require('../questions');

const commander = require('commander');
const program = new commander.Command();
const inquirer = require('inquirer');

// setup data variables
let plausibleSetup = {};
let spreadsheetSetup = {};

const fetch = async () => {
	return await fetchData(plausibleSetup, spreadsheetSetup.tab);
};

const upload = async (data) => {
	console.log(uploadData);
	return await uploadData(spreadsheetSetup, data);
};

program
	.command('connect')
	.description('Connect with plausible')
	.action((options) => {
		inquirer.prompt(setupQuestions).then(async (answers) => {
			spreadsheetSetup.token = answers.google_id;
			spreadsheetSetup.tab = answers.tab_title;
			plausibleSetup.general = answers;
			plausibleSetup.method = answers.method;

			console.log('fetching data and uploading to databox...');
			const data = await fetch();
			return await upload(data);
		});
	});

program.parse();
