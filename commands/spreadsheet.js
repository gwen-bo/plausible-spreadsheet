const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../google-creds.json');

async function uploadData(setup, data) {
	const doc = new GoogleSpreadsheet(setup.token);
	console.log(data);

	await doc.useServiceAccountAuth(creds);
	await doc.loadInfo(); // loads document properties and worksheets. required.
	try {
		const sheet = doc.sheetsByTitle[setup.tab];
		const res = await sheet.addRows(data);
		return;
	} catch (err) {
		console.error('error ocurred in processing ');
		console.error(err);
		return;
	}
}

module.exports = { uploadData };
