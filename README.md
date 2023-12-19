# Michael Crum's Portfolio Website

Uses GNU Make paired with Node.js as a static website generator.

Articles are stored in `/projects`, which is crawled by make. 
Component generators in `/generators` insert project data into the templates in `/templates`. Image assets are converted to `.webp` using ffmpeg for optimization. Everything is saved under `/docs`, where GitHub Pages is convigured to serve the website.

Run `npm install && make` to build the website. Subsequent calls to `make` will only rebuild files that have been edited since the last build.

The system was designed for simplicity and maintainability, aiming to avoid the head-ache inducing hellscape that is javascript frameworks.

Check it out at [michael-crum.com](https://michael-crum.com)

Read my write-up about the system at [https://michael-crum.com/static_page_gen/](https://michael-crum.com/static_page_gen/)
