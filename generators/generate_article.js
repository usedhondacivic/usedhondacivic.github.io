const fs = require('fs');
const path = require('path');
const tm = require('markdown-it-texmath');
var md = require('markdown-it')({ html: true }).use(tm, {
    engine: require('katex'),
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});
const argv = require('minimist')(process.argv.slice(2));
const inputs = argv.i.split(" ");
const output = argv.o;

const content_template = fs.readFileSync(path.resolve(__dirname, '../templates/content.html'), 'utf8');

var contents_md = fs.readFileSync(path.resolve(__dirname, '../' + inputs[0]), 'utf8');
contents_md = contents_md.replaceAll(".png", ".webp").replaceAll(".jpg", ".webp").replaceAll(".jpeg", ".webp");
const sidebar = fs.readFileSync(path.resolve(__dirname, '../' + inputs[1]), 'utf8');
const sidebar_bits = fs.readFileSync(path.resolve(__dirname, '../' + inputs[2]), 'utf8');
const info = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../' + inputs[3])));

// Populate the content of a project page
var contents_html = md.render(contents_md);
var contents_page = content_template.replaceAll("<!-- TITLE -->", info.title)
	.replace("<!-- CONTENT -->", contents_html)
	.replace("<!-- DATE -->", info.date)
	.replace("<!-- DESCRIPTION -->", info.description);

// Add the sidebar
var content = contents_page.replace("<!-- NAV -->", sidebar)
	.replace("<!-- NAV_BITS -->", sidebar_bits);

// Write the article to file
fs.writeFileSync(path.resolve(__dirname, '../' + output), content);
