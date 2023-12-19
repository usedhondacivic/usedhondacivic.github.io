const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const tm = require('markdown-it-texmath');
var md = require('markdown-it')({ html: true }).use(tm, {
    engine: require('katex'),
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});
var argv = require('minimist')(process.argv.slice(2));

const homepage_entry_template = fs.readFileSync(path.resolve(__dirname, '../templates/homepage_entry.html'), 'utf8');
const index_template = fs.readFileSync(path.resolve(__dirname, '../templates/index.html'), 'utf8');

var sources = argv.i.split(" ");
var homepage_entries_bits = [];
var homepage_entries = [];

sources.map((filename) => {
	var info = JSON.parse(fs.readFileSync(filename));
	info.project_name = filename.split("/")[1];
	return info;
}).sort(function (a, b) {
	return new Date(b.date) - new Date(a.date);
}).forEach((info) => {
	var homepage_entry = homepage_entry_template.replaceAll("<!-- TITLE -->", info.title)
		.replace("<!-- DATE -->", info.date)
		.replace("<!-- DESCRIPTION -->", info.description)
		.replace("<!-- TECH -->", info.tech ? "Technologies used: " + info.tech : "")
		.replace("<!-- TOOLS -->", info.tools ? "Tools used: " + info.tools : "")
		.replaceAll("post_link", "./" + info.project_name).replace("snapshot_link", "./" + info.project_name + "/assets/snapshot.webp");
	if (info.bits) {
		homepage_entries_bits.push(homepage_entry);
	} else {
		homepage_entries.push(homepage_entry);
	}
})

// Write the home page to the docs folder
var content = index_template.replace("<!-- PROJECTS -->", homepage_entries.join("\n"))
	.replace("<!-- BITS -->", homepage_entries_bits.join("\n"));
fs.writeFileSync(path.resolve(__dirname, '../' + argv.o), content);

