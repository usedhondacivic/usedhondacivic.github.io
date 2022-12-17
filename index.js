const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const index_template = fs.readFileSync(path.resolve(__dirname, 'templates/index.html'), 'utf8');
const project_entry_template = fs.readFileSync(path.resolve(__dirname, 'templates/project_entry.html'), 'utf8');
const content_template = fs.readFileSync(path.resolve(__dirname, 'templates/sidebar_entry.html'), 'utf8');

fsExtra.emptyDirSync(path.resolve(__dirname, 'build'));