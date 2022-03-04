const fetchAgain = {
	type: 'confirm',
	name: 'again',
	message: 'Do you want to fetch more data?',
};

const fetchOptions = {
	type: 'list',
	name: 'method',
	message: 'What type of fetch?',
	choices: ['daily', 'page breakdown', 'source breakdown'],
};

const metricOptions = {
	type: 'checkbox',
	name: 'options',
	message: 'What data do you want to fetch?',
	choices: [
		{ name: 'visitors', message: '# visitors' },
		{ name: 'pageviews', message: '# pageviews ' },
		{ name: 'bounce_rate', message: '% bounce rate ' },
		{
			name: 'visit_duration',
			message: '# visit duration ',
		},
	],
};

const setupQuestions = [
	{ type: 'input', name: 'google_id', message: 'Google Spreadsheet id (can be found in the url).' },
	{ type: 'input', name: 'tab_title', message: 'Google Spreadsheet tab title' },
	{ type: 'input', name: 'id', message: 'Domain (site_id) registered on plausible.' },
	{
		type: 'input',
		name: 'token',
		message: 'Authentication code from Plausbile site (can be found in settings - API keys)',
	},
	{
		type: 'input',
		name: 'start_date',
		message: 'Enter the start date (yyyy-mm-dd) from the timeperiod you want to fetch from.',
	},
	{
		type: 'input',
		name: 'end_date',
		message: 'Enter the end date (yyyy-mm-dd) from the timeperiod you want to fetch from. (only needed for the day-to-day report)',
	},
	fetchOptions,
	metricOptions,
];

module.exports = { setupQuestions, metricOptions, fetchAgain };
