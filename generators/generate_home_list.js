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

var sources = argv.i.split(" ");
var homepage_entries_bits = [];
var hompage_entries = [];

sources.forEach((filename) => {
	var info = JSON.parse(fs.readFileSync(filename));
	
	var homepage_entry = homepage_entry_template.replaceAll("<!-- TITLE -->", info.title)
		.replace("<!-- DATE -->", info.date)
		.replace("<!-- DESCRIPTION -->", info.description)
		.replace("<!-- TECH -->", info.tech ? "Technologies used: " + info.tech : "")
		.replace("<!-- TOOLS -->", info.tools ? "Tools used: " + info.tools : "")
		.replaceAll("post_link", "." + info.rel_post_link) .replace("snapshot_link", "." + info.rel_snapshot_link);
	if (info.bits) {
		homepage_entries_bits.push(homepage_entry);
	} else {
		homepage_entries.push(homepage_entry);
	}
})


