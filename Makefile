SRC=projects
BUILD=docs

SRC_PROJECT_PATHS = $(wildcard $(SRC)/*)
TARGET_PROJECT_PATHS = $(subst $(SRC),$(BUILD),$(SRC_PROJECT_PATHS))
PROJECT_PAGES = $(TARGET_PROJECT_PATHS:=/index.html)

STYLES=styles
FONTS=fonts
GLOBAL_ASSETS=global_assets

all: setup pages assets
	@echo "All done :)"

setup: 
	@echo "Copying styles, fonts, global assets ect..."
	@mkdir -p "$(BUILD)/$(STYLES)"
	@cp -r -f "$(STYLES)" "$(BUILD)"
	@mkdir -p "$(BUILD)/$(FONTS)"
	@cp -r -f "$(FONTS)" "$(BUILD)"
	@mkdir -p "$(BUILD)/$(GLOBAL_ASSETS)"
	@cp -r -f "$(GLOBAL_ASSETS)" "$(BUILD)"

pages: docs/index.html $(PROJECT_PAGES)
	
docs/index.html: $(wildcard projects/*/info.json) 
	@echo "Generating home page..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_home.js -i "$^" -o "$@"

$(BUILD)/%/index.html: $(SRC)/%/content.md docs/sidebar.html docs/sidebar_bits.html $(SRC)/%/info.json
	@echo "Generating project page $<..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_article.js -i "$^" -o "$@" 

docs/sidebar.html docs/sidebar_bits.html: $(wildcard projects/*/info.json) 
	@echo "Generating sidebar..."
	@mkdir -p "$(@D)"
	@touch "$@"
	@node generators/generate_sidebar.js -i "$^" -o "$@"

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
	@rm docs/sidebar.html
