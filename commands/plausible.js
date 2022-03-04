const axios = require('axios').default;

let auth_token = '';
let site_id = '';
let options = '';
let per_page = undefined;

function setCreditials(id, token) {
	auth_token = token;
	site_id = id;
	axios.defaults.headers.common = { Authorization: `Bearer ${auth_token}` };
}

function setOptions(selected) {
	// set options to fetch from plausible
	options = selected.toString();
}

async function fetch(url) {
	try {
		const { data } = await axios.get(url);
		return data.results;
	} catch (error) {
		return err;
	}
}
async function getDailyMetrics(options, start_date, end_date) {
	console.log('fetching daily data');
	return await fetch(`https://plausible.io/api/v1/stats/timeseries?site_id=${site_id}&period=custom&metrics=${options}&date=${start_date},${end_date}`);
}

async function getPageBreakdown(options, start_date) {
	console.log('fetching page breakdown-data');
	const res = await fetch(`https://plausible.io/api/v1/stats/breakdown?site_id=${site_id}&period=month&date=${start_date}&property=event:page&metrics=${options}`);
	const dateObj = new Date(start_date);
	const month = dateObj.getUTCMonth() + 1;
	var year = dateObj.getUTCFullYear();

	res.map((data) => {
		data.date = `${month.toString().padStart(2, 0)} - ${year}`;
	});
	return res;
}

async function getSourceBreakdown(options, start_date) {
	console.log('fetching source breakdown-data');
	const res = await fetch(`https://plausible.io/api/v1/stats/breakdown?site_id=${site_id}&period=month&date=${start_date}&property=visit:source&metrics=${options}`);
	const dateObj = new Date(start_date);
	const month = dateObj.getUTCMonth() + 1;
	var year = dateObj.getUTCFullYear();

	res.map((data) => {
		data.date = `${month.toString().padStart(2, 0)} - ${year}`;
	});
	return res;
}

async function fetchData({ general, method }) {
	const { id, token, options, start_date, end_date } = general;
	setCreditials(id, token);
	setOptions(options);

	switch (method) {
		case 'daily':
			return await getDailyMetrics(options, start_date, end_date);
		case 'page breakdown':
			return await getPageBreakdown(options, start_date);
		case 'source breakdown':
			return await getSourceBreakdown(options, start_date);

		default:
			return 'no method provided';
	}
}

module.exports = { fetchData };
