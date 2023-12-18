SRC=projects
BUILD=docs

SRC_PROJECT_PATHS = $(wildcard $(SRC)/*)
TARGET_PROJECT_PATHS = $(subst $(SRC),$(BUILD),$(SRC_PROJECT_PATHS))
PROJECT_PAGES = $(TARGET_PROJECT_PATHS:=/index.html)

all: setup pages assets

setup: node_modules/ 
	npm install

pages: docs/index.html $(PROJECT_PAGES)
	
docs/index.html: docs/home_list.txt docs/home_list.txt
	@echo "Generating home page..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_home.js

$(BUILD)/%/index.html: $(SRC)/%/content.md docs/sidebar.txt 
	@echo "Generating project page $<..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_articles.js -i "$^" -o "$@" 

docs/sidebar.txt: $(wildcard projects/*/info.json) 
	@echo "Generating sidebar..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_sidebar.js -i "$^"

docs/home_list.txt: $(wildcard projects/*/info.json)
	@echo "Generating home project listing..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_home_list.js -i "$^"

ALL_SRC_ASSETS = $(wildcard $(SRC)/*/assets/*)
ALL_TARGET_ASSETS = $(subst $(SRC),$(BUILD),$(ALL_SRC_ASSETS))
CONVERT_ASSET_TARGETS = $(addsuffix .webp,$(basename $(filter %.png %.jpg %.jpeg, $(ALL_TARGET_ASSETS))))
COPY_ASSET_TARGETS = $(filter %.svg %.gif %.webp, $(ALL_TARGET_ASSETS))

assets: $(CONVERT_ASSET_TARGETS) $(COPY_ASSET_TARGETS)

define convert_image
	@echo "Optimizing asset $^..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/image_conversion.js -i "$^" -o "$@" 
endef

$(BUILD)/%.webp: $(SRC)/%.png
	$(convert_image)

$(BUILD)/%.webp: $(SRC)/%.jpg
	$(convert_image)
	
$(BUILD)/%.webp: $(SRC)/%.jpeg
	$(convert_image)

define move_image
	@echo "Transfering asset $^..."
	@mkdir -p "$(@D)"
	@cp -f "$<" "$@"
endef

$(BUILD)/%.webp: $(SRC)/%.webp
	$(move_image)

$(BUILD)/%.svg: $(SRC)/%.svg
	$(move_image)

$(BUILD)/%.gif: $(SRC)/%.gif
	$(move_image)

clean:
	@rm docs/sidebar.txt docs/home_list.txt
