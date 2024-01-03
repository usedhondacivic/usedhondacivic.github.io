const fs = require('fs');
const path = require('path');
const tm = require('markdown-it-texmath');

var argv = require('minimist')(process.argv.slice(2));
const sources = argv.i.split(" ").filter(name => {name.split(".")[1] === "json"});
const output = argv.o;

const bits = output.includes("bits");

const sidebar_entry_template = fs.readFileSync(path.resolve(__dirname, '../templates/sidebar_entry.html'), 'utf8');
const index_template = fs.readFileSync(path.resolve(__dirname, '../templates/index.html'), 'utf8');

var sidebar = [];

sources.map((filename) => {
	var info = JSON.parse(fs.readFileSync(filename));
	info.project_name = filename.split("/")[1];
	return info;
}).sort(function (a, b) {
	return new Date(b.date) - new Date(a.date);
}).forEach((info) => {
	// Create sidebar entry
	var sidebar_entry = sidebar_entry_template.replaceAll("<!-- TITLE -->", info.title)
		.replace("<!-- DATE -->", info.date)
		.replaceAll("project_link", "../" + info.project_name)
		.replace("snapshot_link", "../" + info.project_name + "/assets/snapshot.webp");
	if ((info.bits && bits) || (info.bits === undefined && !bits)) {
		sidebar.push(sidebar_entry);
	}
})

// Write the home page to the docs folder
fs.writeFileSync(path.resolve(__dirname, '../' + output), sidebar.join("\n"));

