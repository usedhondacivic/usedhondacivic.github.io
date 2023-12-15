build: homepage sidebar articles

SRC=projects
BUILD=docs

SRCS=$(wildcard $(SRC)/*/content.md)
BUILDS=$(wildcard $(SRC)/*/content.md)

docs/index.html:
	node generate_home.js

docs/sidebar.txt:
	node generators/generate_sidebar.js

docs/home_list.txt:
	node generators/generate_home_list.js

docs/:
	node generators/generate_articles.js

clean:
	rm docs/sidebar.txt docs/home_list.txt
