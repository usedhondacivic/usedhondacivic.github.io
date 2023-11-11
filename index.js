const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const glob = require("glob");
const sharp = require("sharp");
const tm = require('markdown-it-texmath');
var md = require('markdown-it')({ html: true }).use(tm, {
    engine: require('katex'),
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});


// Grab the templates
const index_template = fs.readFileSync(path.resolve(__dirname, 'templates/index.html'), 'utf8');
const homepage_entry_template = fs.readFileSync(path.resolve(__dirname, 'templates/homepage_entry.html'), 'utf8');
const sidebar_entry_template = fs.readFileSync(path.resolve(__dirname, 'templates/sidebar_entry.html'), 'utf8');
const content_template = fs.readFileSync(path.resolve(__dirname, 'templates/content.html'), 'utf8');

// Clean the docs directory
fsExtra.emptyDirSync(path.resolve(__dirname, 'docs'));

// Copy over styles
fsExtra.copySync(path.resolve(__dirname, 'styles'), path.resolve(__dirname, 'docs/styles'));

// Copy over fonts
fsExtra.copySync(path.resolve(__dirname, 'fonts'), path.resolve(__dirname, 'docs/fonts'))

var pages = new Object();
var info_arr = [];
var sidebar = [];
var sidebar_bits = [];
var homepage_entries = [];
var homepage_entries_bits = [];

// Copy a folder of images, and convert them to WebP to reduce loading time
function resize_and_relocate(src_dir, target_dir) {
    fs.mkdirSync(target_dir, { recursive: true });
    glob(src_dir + "/**", function (er, files) {
        files.forEach(path_name => {
            let file_split = path_name.split("/");
            let file_name = file_split[file_split.length - 1];
            if (file_name == "assets") return;
            if (file_name.split(".")[1] === "svg" || file_name.split(".")[1] === "gif") {
                fs.copyFileSync(path_name, target_dir + "/" + file_name);
            }
            sharp(path_name).toFile(target_dir + "/" + file_name.split(".")[0] + ".webp");
        })
    })
}

// Iterate over all of the posts
glob("projects/*/*.md", function (er, files) {
    files.forEach(path_name => {
        var info = JSON.parse(fs.readFileSync(path.resolve(__dirname, path_name.replace("content.md", "info.json"))));
        // Populate the content of a project page
        var contents_md = fs.readFileSync(path.resolve(__dirname, path_name), 'utf8');
        contents_md = contents_md.replaceAll(".png", ".webp").replaceAll(".jpg", ".webp").replaceAll(".jpeg", ".webp");
        var contents_html = md.render(contents_md);
        var contents_page = content_template.replaceAll("<!-- TITLE -->", info.title)
            .replace("<!-- CONTENT -->", contents_html)
            .replace("<!-- DATE -->", info.date)
            .replace("<!-- DESCRIPTION -->", info.description);
        var new_path = path_name.replace("projects", "docs").replace("/content.md", "");
        pages[new_path] = contents_page;
        // Copy assets
        resize_and_relocate(path_name.replace("/content.md", "/assets"), new_path + '/assets');
        info.rel_post_link = new_path.replace("docs", "");
        info.rel_snapshot_link = new_path.replace("docs", "") + "/assets/snapshot.webp";
        info_arr.push(info);
    })
    info_arr.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    })
    info_arr.forEach(info => {
        // Create sidebar entry
        var sidebar_entry = sidebar_entry_template.replaceAll("<!-- TITLE -->", info.title)
            .replace("<!-- DATE -->", info.date)
            .replaceAll("project_link", ".." + info.rel_post_link)
            .replace("snapshot_link", ".." + info.rel_snapshot_link);
        if (info.bits) {
            sidebar_bits.push(sidebar_entry);
        } else {
            sidebar.push(sidebar_entry);
        }
        // Create home page entry
        var homepage_entry = homepage_entry_template.replaceAll("<!-- TITLE -->", info.title)
            .replace("<!-- DATE -->", info.date)
            .replace("<!-- DESCRIPTION -->", info.description)
            .replace("<!-- TECH -->", info.tech ? "Technologies used: " + info.tech : "")
            .replace("<!-- TOOLS -->", info.tools ? "Tools used: " + info.tools : "")
            .replaceAll("post_link", "." + info.rel_post_link)
            .replace("snapshot_link", "." + info.rel_snapshot_link);
        if (info.bits) {
            homepage_entries_bits.push(homepage_entry);
        } else {
            homepage_entries.push(homepage_entry);
        }
    })
    // Write the html files for each project to the docs folder
    for (const [path_loc, html] of Object.entries(pages)) {
        var content = html.replace("<!-- NAV -->", sidebar.join("\n"))
            .replace("<!-- NAV_BITS -->", sidebar_bits.join("\n"));
        fs.mkdirSync(path_loc, { recursive: true });
        fs.writeFileSync(path.resolve(__dirname, path_loc, "index.html"), content);
    }
    // Write the home page to the docs folder
    var content = index_template.replace("<!-- PROJECTS -->", homepage_entries.join("\n"))
        .replace("<!-- BITS -->", homepage_entries_bits.join("\n"));
    fs.writeFileSync(path.resolve(__dirname, "docs/index.html"), content);
    // Write global assets to the docs folder
    fsExtra.copySync(path.resolve(__dirname, "global_assets"), path.resolve(__dirname, "docs/global_assets"));
    // Write CNAME to the docs folder
    fs.writeFileSync(path.resolve(__dirname, "docs/CNAME"), "michael-crum.com");
})