build: homepage sidebar articles

SRC=projects
BUILD=docs

SRCS = $(wildcard $(SRC)/*/content.md)
TARGETS = $(subst content.md,index.html,$(subst $(SRC),$(BUILD),$(SRCS)))

SRC_ASSETS = $(wildcard $(SRC)/*/assets/*)
TARGET_ASSETS = $(subst $(SRC),$(BUILD),$(SRC_ASSETS))
CONVERT_ASSET_TARGETS = $(filter %.png %.jpg %.jpeg %.webp, $(TARGET_ASSETS))
COPY_ASSET_TARGETS = $(filter %.svg %.gif, $(TARGET_ASSETS))

test:
	echo "$(TARGETS)"

all: docs/index.html $(TARGETS) 
	
docs/index.html: docs/home_list.txt $(CONVERT_ASSET_TARGETS) $(COPY_ASSET_TARGETS)
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_home.js

$(TARGETS): $(SRCS) docs/sidebar.txt $(CONVERT_ASSET_TARGETS) $(COPY_ASSET_TARGETS)
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_articles.js -in "$^" -out "$@" 

docs/sidebar.txt: $(wildcard projects/*/info.json) 
	@mkdir -p "$(@D)"
	@touch "$@"
	@echo $^
	@node generators/generate_sidebar.js -in "$^"

docs/home_list.txt: $(wildcard projects/*/info.json)
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_home_list.js

$(CONVERT_ASSET_TARGETS): $(SRC_ASSETS)
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/image_conversion.js -in "$^" -out "$@" 

$(COPY_ASSET_TARGETS): $(SRC_ASSETS)
	@mkdir -p "$(@D)"
	@cp -f $< "$@"

clean:
	rm docs/sidebar.txt docs/home_list.txt
