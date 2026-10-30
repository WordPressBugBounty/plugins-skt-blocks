/**
 * Inspector Controls
 */

import times from "lodash/times";
import BoxShadowControl from "../../../utils/components/box-shadow";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../renderIcon";
import {
  DEVICE_TABS,
  deviceSuffix,
  inherited,
  setPreviewDevice,
} from "./responsive-utils";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
  ColorPalette,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
  BaseControl,
  Button,
  TabPanel,
} = wp.components;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onSelectTestImage = this.onSelectTestImage.bind(this);
    this.getImageName = this.getImageName.bind(this);
    this.onRemoveTestImage = this.onRemoveTestImage.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
  }
  /*
   * Event to set Image as while adding.
   */
  onSelectTestImage(media, index) {
    const { cardsArray } = this.props.attributes;
    const { setAttributes } = this.props;

    let imag_url = null;
    if (!media || !media.url) {
      imag_url = null;
    } else {
      imag_url = media;
    }

    if (!media.type || "image" !== media.type) {
      imag_url = null;
    }

    const newItems = cardsArray.map((item, thisIndex) => {
      if (index === thisIndex) {
        (item["image"] = imag_url), (item["imageUrl"] = imag_url);
      }
      return item;
    });

    setAttributes({
      cardsArray: newItems,
    });
  }

  /*
   * Event to set Image as null while removing.
   */
  onRemoveTestImage(index) {
    const { cardsArray } = this.props.attributes;
    const { setAttributes } = this.props;

    const newItems = cardsArray.map((item, thisIndex) => {
      if (index === thisIndex) {
        item["image"] = null;
      }
      return item;
    });

    setAttributes({
      cardsArray: newItems,
    });
  }

  /*
   * Event to set Image selectot label.
   */
  getImageName(image) {
    const { cardsArray } = this.props.attributes;

    let image_name = __("Select Image");
    if (image) {
      if (image.url == null || image.url == "") {
        image_name = __("Select Image");
      } else {
        image_name = __("Replace Image");
      }
    }
    return image_name;
  }

  /*
   * Event to set Image as null while removing.
   */
  onRemoveImage() {
    const { setAttributes } = this.props;

    setAttributes({ backgroundImage: null });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectImage(media) {
    const { setAttributes } = this.props;

    if (!media || !media.url) {
      setAttributes({ backgroundImage: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ backgroundImage: media });
  }
  render() {
    // Setup the attributes
    const {
      attributes: {
        count,
        gutter,
        cardsArray,
        textColor,
        itemBackgroundColor,
        buttonTarget,
        borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        titleSpace,
        subtitleSpace,
        contentSpace,
        buttonSpace,
        buttonColor,
        buttonTextColor,
        stack,
        opacity,
        resshowImage,
        imageopacity,
        backgroundType,
        backgroundImage,
        gradientDirection,
        colorLocation1,
        colorLocation2,
        backgroundColor1,
        backgroundColor2,
        imageSize,
        imagePosition,
        imageRepeat,
        thumbsize,
        imageheight,
        blockzindex,
        blockmargin,
        icon,
        iconPosition,
        icon_color,
        buttonhColor,
        buttonhTextColor,
        butopacity,
        vPadding,
        hPadding,
        vMargin,
        hMargin,
        butborderWidth,
        butborderRadius,
        butborderStyle,
        buttonSize,
        buttonbackgroundType,
        buttongradientDirection,
        buttoncolorLocation1,
        buttoncolorLocation2,
        buttonbackgroundColor1,
        buttonbackgroundColor2,
        icon_hcolor,
        subFontFamily,
        subLineHeight,
        subFontWeight,
        subFontSize,
        headingFontFamily,
        headingLineHeight,
        headingFontWeight,
        headingFontSize,
        contentFontFamily,
        contentLineHeight,
        contentFontWeight,
        contentFontSize,
        contenttopSpace,
        blockbotmargin,
        blockleftmargin,
        blockrightmargin,
        bgimageSize,
        bgimagePosition,
        bgimageRepeat,
        bgthumbsize,
      },
      setAttributes,
    } = this.props;

    // Font Weight Options
    const fontWeightOptions = [
      {
        value: "100",
        label: __("100", "skt-blocks"),
      },
      {
        value: "200",
        label: __("200", "skt-blocks"),
      },
      {
        value: "300",
        label: __("300", "skt-blocks"),
      },
      {
        value: "400",
        label: __("400", "skt-blocks"),
      },
      {
        value: "500",
        label: __("500", "skt-blocks"),
      },
      {
        value: "600",
        label: __("600", "skt-blocks"),
      },
      {
        value: "700",
        label: __("700", "skt-blocks"),
      },
      {
        value: "800",
        label: __("800", "skt-blocks"),
      },
      {
        value: "900",
        label: __("900", "skt-blocks"),
      },
    ];

    // Button size values
    const buttonSizeOptions = [
      {
        value: "skt-blocks-button-size-small",
        label: __("Small"),
      },
      {
        value: "skt-blocks-button-size-medium",
        label: __("Medium"),
      },
      {
        value: "skt-blocks-button-size-large",
        label: __("Large"),
      },
      {
        value: "skt-blocks-button-size-extralarge",
        label: __("Extra Large"),
      },
    ];

    // Background Type Options
    const buttonbackgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
    ];
    // Image Size Options
    const imageSizeOptions = [
      {
        value: "thumbnail",
        label: __("Thumbnail", "skt-blocks"),
      },
      {
        value: "medium",
        label: __("Medium", "skt-blocks"),
      },
      { value: "large", label: __("Large", "skt-blocks") },
      { value: "full", label: __("Full", "skt-blocks") },
    ];

    const tmControls = (index) => {
      let image_val = null;
      if (cardsArray[index] && typeof cardsArray[index] !== "undefined") {
        image_val = cardsArray[index]["image"];
      }
      return (
        <PanelBody
          key={index}
          title={__("Image") + " " + (index + 1) + " " + __("Settings")}
          initialOpen={true}
          className={"rbea-repeater-panel"}
        >
          <BaseControl className="editor-bg-image-control" label={__("")}>
            <MediaUpload
              title={__("Select Image" + (index + 1))}
              onSelect={(media) => {
                this.onSelectTestImage(media, index);
              }}
              allowedTypes={["image"]}
              value={image_val}
              render={({ open }) => (
                <Button isDefault onClick={open}>
                  {this.getImageName(cardsArray[index]["image"])}
                </Button>
              )}
            />
            {image_val &&
              cardsArray[index]["image"].url !== null &&
              cardsArray[index]["image"].url !== "" && (
                <Button
                  className="rbea-rm-btn"
                  key={index}
                  onClick={(value) => {
                    this.onRemoveTestImage(index);
                  }}
                  isLink
                  isDestructive
                >
                  {__("Remove Image")}
                </Button>
              )}
          </BaseControl>
        </PanelBody>
      );
    };

    // Update color value
    const onChangeTextColor = (value) => setAttributes({ textColor: value });
    const onChangeBackgroundColor = (value) =>
      setAttributes({ itemBackgroundColor: value });

    // Background Type Options
    const backgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
      { value: "image", label: __("Image", "skt-blocks") },
    ];

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Number of Cards", "skt-blocks")}
            value={count}
            onChange={(newCount) => {
              let clonecardsArray = [...cardsArray];
              if (clonecardsArray.length < newCount) {
                const incsubtitle = Math.abs(newCount - clonecardsArray.length);

                {
                  times(incsubtitle, (n) => {
                    clonecardsArray.push({
                      title: "Title ",
                      subtitle: "Subtitle",
                      content:
                        "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
                      button: "Button" + newCount,
                    });
                  });
                }
                setAttributes({ cardsArray: clonecardsArray });
              } else {
                const incsubtitle = Math.abs(newCount - clonecardsArray.length);
                let data_new = clonecardsArray;
                for (var i = 0; i < incsubtitle; i++) {
                  data_new.pop();
                }
                setAttributes({ cardsArray: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={4}
            step={1}
          />
          <SelectControl
            label={__("Stack on", "skt-blocks")}
            value={stack}
            options={[
              {
                value: "none",
                label: __("None", "skt-blocks"),
              },
              {
                value: "tablet",
                label: __("Tablet", "skt-blocks"),
              },
              {
                value: "mobile",
                label: __("Mobile", "skt-blocks"),
              },
            ]}
            onChange={(value) => setAttributes({ stack: value })}
            help={__(
              "Note: Choose on what breakpoint the columns will stack.",
              "skt-blocks"
            )}
          />
          <RangeControl
            label={__("Z-Index", "skt-blocks")}
            value={blockzindex}
            onChange={(value) =>
              setAttributes({ blockzindex: value !== undefined ? value : 1 })
            }
            min={0}
            max={9999}
            allowReset
          />
        </PanelBody>
        <PanelBody
          title={__("Image", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Enable Image", "skt-blocks")}
            checked={resshowImage}
            onChange={(value) => setAttributes({ resshowImage: !resshowImage })}
          />
        </PanelBody>
        {resshowImage && (
          <PanelBody
            title={__("Select Image", "skt-blocks")}
            initialOpen={false}
          >
            {times(count, (n) => tmControls(n))}
          </PanelBody>
        )}
        {resshowImage && (
          <PanelBody
            title={__("Image Settings", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Image Size", "skt-blocks")}
              value={imageSize}
              onChange={(value) => setAttributes({ imageSize: value })}
              options={imageSizeOptions}
            />

            <SelectControl
              label={__("Image Position", "skt-blocks")}
              value={imagePosition}
              onChange={(value) => setAttributes({ imagePosition: value })}
              options={[
                {
                  value: "top left",
                  label: __("Top Left", "skt-blocks"),
                },
                {
                  value: "top center",
                  label: __("Top Center", "skt-blocks"),
                },
                {
                  value: "top right",
                  label: __("Top Right", "skt-blocks"),
                },
                {
                  value: "center left",
                  label: __("Center Left", "skt-blocks"),
                },
                {
                  value: "center center",
                  label: __("Center Center", "skt-blocks"),
                },
                {
                  value: "center right",
                  label: __("Center Right", "skt-blocks"),
                },
                {
                  value: "bottom left",
                  label: __("Bottom Left", "skt-blocks"),
                },
                {
                  value: "bottom center",
                  label: __("Bottom Center", "skt-blocks"),
                },
                {
                  value: "bottom right",
                  label: __("Bottom Right", "skt-blocks"),
                },
              ]}
            />
            <SelectControl
              label={__("Image Repeat", "skt-blocks")}
              value={imageRepeat}
              onChange={(value) => setAttributes({ imageRepeat: value })}
              options={[
                {
                  value: "no-repeat",
                  label: __("No Repeat", "skt-blocks"),
                },
                {
                  value: "repeat",
                  label: __("Repeat", "skt-blocks"),
                },
                {
                  value: "repeat-x",
                  label: __("Repeat-X", "skt-blocks"),
                },
                {
                  value: "repeat-y",
                  label: __("Repeat-Y", "skt-blocks"),
                },
              ]}
            />
            <SelectControl
              label={__("Image Size", "skt-blocks")}
              value={thumbsize}
              onChange={(value) => setAttributes({ thumbsize: value })}
              options={[
                {
                  value: "cover",
                  label: __("Cover", "skt-blocks"),
                },
                {
                  value: "auto",
                  label: __("Auto", "skt-blocks"),
                },
                {
                  value: "contain",
                  label: __("Contain", "skt-blocks"),
                },
              ]}
            />
            <TabPanel
            className="rbea-inspect-tabs rbea-inspect-tabs-col-3"
            activeClass="active-tab"
            initialTabName={(this.props.deviceType || "Desktop").toLowerCase()}
            onSelect={setPreviewDevice}
            tabs={DEVICE_TABS.map((t) => ({ ...t, className: "rbea-normal-tab" }))}
          >
            {(tab) => {
              const sfx = deviceSuffix(tab.name);
              const field = (base, label, min, max, def) => (
                <RangeControl
                  label={label}
                  value={inherited(this.props.attributes, base, sfx)}
                  onChange={(value) =>
                    setAttributes({
                      [base + sfx]:
                        value !== undefined ? value : sfx ? undefined : def,
                    })
                  }
                  min={min}
                  max={max}
                  allowReset
                />
              );
              return (
                <div>
                  {field("imageheight", __("Custom Height", "skt-blocks"), 0, 1000, 200)}
                </div>
              );
            }}
          </TabPanel>
          </PanelBody>
        )}

        <PanelBody
          title={__("Column Background", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Background Type", "skt-blocks")}
            value={backgroundType}
            onChange={(value) => setAttributes({ backgroundType: value })}
            options={backgroundTypeOptions}
          />
          {"color" == backgroundType && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Background Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: itemBackgroundColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={itemBackgroundColor}
                onChange={onChangeBackgroundColor}
                allowReset
              />
              <RangeControl
                label={__("Opacity", "skt-blocks")}
                value={opacity}
                onChange={(value) =>
                  setAttributes({
                    opacity: value !== undefined ? value : 0,
                  })
                }
                min={0}
                max={100}
                allowReset
              />
            </Fragment>
          )}
          {"gradient" == backgroundType && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Color 1", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: backgroundColor1 }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={backgroundColor1}
                onChange={(colorValue) =>
                  setAttributes({ backgroundColor1: colorValue })
                }
                allowReset
              />

              <p className="responsive-setting-label">
                {__("Color 2", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: backgroundColor2 }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={backgroundColor2}
                onChange={(colorValue) =>
                  setAttributes({ backgroundColor2: colorValue })
                }
                allowReset
              />
              <RangeControl
                label={__("Color Location 1", "skt-blocks")}
                value={colorLocation1}
                min={0}
                max={100}
                onChange={(value) =>
                  setAttributes({
                    colorLocation1: value !== undefined ? value : 0,
                  })
                }
              />
              <RangeControl
                label={__("Color Location 2", "skt-blocks")}
                value={colorLocation2}
                min={0}
                max={100}
                onChange={(value) =>
                  setAttributes({
                    colorLocation2: value !== undefined ? value : 100,
                  })
                }
              />
              <RangeControl
                label={__(
                  "Gradient Direction",
                  "skt-blocks"
                )}
                value={gradientDirection}
                min={0}
                max={100}
                onChange={(value) =>
                  setAttributes({
                    gradientDirection: value !== undefined ? value : 90,
                  })
                }
              />
            </Fragment>
          )}
          {"image" == backgroundType && (
            <Fragment>
              <BaseControl
                className="editor-bg-image-control"
                label={__("Background Image", "skt-blocks")}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "skt-blocks"
                  )}
                  onSelect={this.onSelectImage}
                  allowedTypes={["image"]}
                  value={backgroundImage}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImage
                        ? __(
                            "Select Background Image",
                            "skt-blocks"
                          )
                        : __("Replace image", "skt-blocks")}
                    </Button>
                  )}
                />
                {backgroundImage && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImage}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "skt-blocks")}
                  </Button>
                )}
              </BaseControl>
              <RangeControl
                label={__("Opacity", "skt-blocks")}
                value={imageopacity}
                onChange={(value) =>
                  setAttributes({
                    imageopacity: value !== undefined ? value : 20,
                  })
                }
                min={0}
                max={100}
                allowReset
              />
              <PanelBody
                title={__(
                  "Background Image Settings",
                  "skt-blocks"
                )}
                initialOpen={false}
              >
                <SelectControl
                  label={__("Image Position", "skt-blocks")}
                  value={bgimagePosition}
                  onChange={(value) =>
                    setAttributes({ bgimagePosition: value })
                  }
                  options={[
                    {
                      value: "top left",
                      label: __("Top Left", "skt-blocks"),
                    },
                    {
                      value: "top center",
                      label: __("Top Center", "skt-blocks"),
                    },
                    {
                      value: "top right",
                      label: __("Top Right", "skt-blocks"),
                    },
                    {
                      value: "center left",
                      label: __(
                        "Center Left",
                        "skt-blocks"
                      ),
                    },
                    {
                      value: "center top",
                      label: __("Center Top", "skt-blocks"),
                    },
                    {
                      value: "center right",
                      label: __(
                        "Center Right",
                        "skt-blocks"
                      ),
                    },
                    {
                      value: "bottom left",
                      label: __(
                        "Bottom Left",
                        "skt-blocks"
                      ),
                    },
                    {
                      value: "bottom center",
                      label: __(
                        "Bottom Center",
                        "skt-blocks"
                      ),
                    },
                    {
                      value: "bottom right",
                      label: __(
                        "Bottom Right",
                        "skt-blocks"
                      ),
                    },
                  ]}
                />
                <SelectControl
                  label={__("Image Repeat", "skt-blocks")}
                  value={bgimageRepeat}
                  onChange={(value) => setAttributes({ bgimageRepeat: value })}
                  options={[
                    {
                      value: "no-repeat",
                      label: __("No Repeat", "skt-blocks"),
                    },
                    {
                      value: "repeat",
                      label: __("Repeat", "skt-blocks"),
                    },
                    {
                      value: "repeat-x",
                      label: __("Repeat-X", "skt-blocks"),
                    },
                    {
                      value: "repeat-y",
                      label: __("Repeat-Y", "skt-blocks"),
                    },
                  ]}
                />
                <SelectControl
                  label={__("Image Size", "skt-blocks")}
                  value={bgthumbsize}
                  onChange={(value) => setAttributes({ bgthumbsize: value })}
                  options={[
                    {
                      value: "cover",
                      label: __("Cover", "skt-blocks"),
                    },
                    {
                      value: "auto",
                      label: __("Auto", "skt-blocks"),
                    },
                    {
                      value: "contain",
                      label: __("Contain", "skt-blocks"),
                    },
                  ]}
                />
              </PanelBody>
            </Fragment>
          )}
        </PanelBody>

        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Title Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={headingFontFamily}
              onChange={(value) => {
                setAttributes({
                  headingFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={headingFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  headingFontSize: value !== undefined ? value : 20,
                })
              }
              min={1}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={headingFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  headingFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={headingLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  headingLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Subtitle Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={subFontFamily}
              onChange={(value) => {
                setAttributes({
                  subFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={subFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  subFontSize: value !== undefined ? value : 16,
                })
              }
              min={1}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={subFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  subFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={subLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  subLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Content Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={contentFontFamily}
              onChange={(value) => {
                setAttributes({
                  contentFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={contentFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontSize: value !== undefined ? value : 16,
                })
              }
              min={1}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={contentFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={contentLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentLineHeight: value !== undefined ? value : 2,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
        </PanelBody>

        <PanelBody
          title={__("Button Settings", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Open link in new tab")}
            checked={buttonTarget}
            onChange={() => {
              setAttributes({ buttonTarget: !buttonTarget });
            }}
          />
          <SelectControl
            label={__("Button Size", "skt-blocks")}
            value={buttonSize}
            options={buttonSizeOptions.map(({ value, label }) => ({
              value,
              label,
            }))}
            onChange={(value) => {
              this.props.setAttributes({
                buttonSize: value,
              });
            }}
          />
          <PanelBody
            title={__("Border", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Style", "skt-blocks")}
              value={butborderStyle}
              options={[
                { value: "none", label: __("None") },
                { value: "solid", label: __("Solid") },
                { value: "dotted", label: __("Dotted") },
                { value: "dashed", label: __("Dashed") },
                { value: "double", label: __("Double") },
              ]}
              onChange={(value) => {
                setAttributes({ butborderStyle: value });
              }}
            />
            {borderStyle != "none" && (
              <RangeControl
                label={__("Thickness", "skt-blocks")}
                value={butborderWidth}
                onChange={(value) => {
                  setAttributes({ butborderWidth: value });
                }}
                min={0}
                max={20}
              />
            )}
            <RangeControl
              label={__("Rounded Corners", "skt-blocks")}
              value={butborderRadius}
              onChange={(value) => {
                setAttributes({ butborderRadius: value });
              }}
              min={0}
              max={50}
            />
            <TabPanel
            className="rbea-inspect-tabs rbea-inspect-tabs-col-3"
            activeClass="active-tab"
            initialTabName={(this.props.deviceType || "Desktop").toLowerCase()}
            onSelect={setPreviewDevice}
            tabs={DEVICE_TABS.map((t) => ({ ...t, className: "rbea-normal-tab" }))}
          >
            {(tab) => {
              const sfx = deviceSuffix(tab.name);
              const field = (base, label, min, max, def) => (
                <RangeControl
                  label={label}
                  value={inherited(this.props.attributes, base, sfx)}
                  onChange={(value) =>
                    setAttributes({
                      [base + sfx]:
                        value !== undefined ? value : sfx ? undefined : def,
                    })
                  }
                  min={min}
                  max={max}
                  allowReset
                />
              );
              return (
                <div>
                  {field("vPadding", __("Vertical Padding", "skt-blocks"), 0, 200, 10)}
                  {field("hPadding", __("Horizontal Padding", "skt-blocks"), 0, 200, 14)}
                  {field("vMargin", __("Vertical Margin", "skt-blocks"), 0, 200, 10)}
                  {field("hMargin", __("Horizontal Margin", "skt-blocks"), 0, 200, 0)}
                </div>
              );
            }}
          </TabPanel>
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Button Color Settings", "skt-blocks")}
          initialOpen={false}
        >
          <Fragment>
            <PanelBody
              title={__("Background", "skt-blocks")}
              initialOpen={false}
            >
              <SelectControl
                label={__("Background Type", "skt-blocks")}
                value={buttonbackgroundType}
                onChange={(value) =>
                  setAttributes({ buttonbackgroundType: value })
                }
                options={buttonbackgroundTypeOptions}
              />
              {"color" == buttonbackgroundType && (
                <Fragment>
                  <p className="skt-blocks-setting-label">
                    {__("Background Color", "skt-blocks")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonColor}
                    onChange={(colorValue) =>
                      setAttributes({ buttonColor: colorValue })
                    }
                    allowReset
                  />
                  <p className="skt-blocks-setting-label">
                    {__(
                      "Background Hover Color",
                      "skt-blocks"
                    )}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonhColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonhColor}
                    onChange={(colorValue) =>
                      setAttributes({ buttonhColor: colorValue })
                    }
                    allowReset
                  />
                  <RangeControl
                    label={__("Opacity", "skt-blocks")}
                    value={butopacity}
                    onChange={(value) =>
                      setAttributes({
                        butopacity: value !== undefined ? value : 100,
                      })
                    }
                    min={0}
                    max={100}
                    allowReset
                  />
                </Fragment>
              )}
              {"gradient" == buttonbackgroundType && (
                <Fragment>
                  <p className="responsive-setting-label">
                    {__("Color 1", "skt-blocks")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonbackgroundColor1 }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonbackgroundColor1}
                    onChange={(colorValue) =>
                      setAttributes({ buttonbackgroundColor1: colorValue })
                    }
                    allowReset
                  />

                  <p className="responsive-setting-label">
                    {__("Color 2", "skt-blocks")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonbackgroundColor2 }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonbackgroundColor2}
                    onChange={(colorValue) =>
                      setAttributes({ buttonbackgroundColor2: colorValue })
                    }
                    allowReset
                  />
                  <RangeControl
                    label={__(
                      "Color Location 1",
                      "skt-blocks"
                    )}
                    value={buttoncolorLocation1}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      setAttributes({ buttoncolorLocation1: value })
                    }
                  />
                  <RangeControl
                    label={__(
                      "Color Location 2",
                      "skt-blocks"
                    )}
                    value={buttoncolorLocation2}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      setAttributes({ buttoncolorLocation2: value })
                    }
                  />
                  <RangeControl
                    label={__(
                      "Gradient Direction",
                      "skt-blocks"
                    )}
                    value={buttongradientDirection}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      setAttributes({ buttongradientDirection: value })
                    }
                  />
                </Fragment>
              )}
            </PanelBody>
          </Fragment>
          <Fragment>
            <PanelBody
              title={__("Text", "skt-blocks")}
              initialOpen={false}
            >
              <p className="skt-blocks-setting-label">
                {__("Text Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: buttonColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={buttonTextColor}
                onChange={(colorValue) =>
                  setAttributes({ buttonTextColor: colorValue })
                }
                allowReset
              />
              <p className="skt-blocks-setting-label">
                {__("Text HoverColor", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: buttonhTextColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={buttonhTextColor}
                onChange={(colorValue) =>
                  setAttributes({ buttonhTextColor: colorValue })
                }
                allowReset
              />
            </PanelBody>
          </Fragment>
        </PanelBody>

        <PanelBody title={__("Icon Settings")} initialOpen={false}>
          <Fragment>
            <p className="components-base-control__label">{__("Icon")}</p>
            <FontIconPicker
              icons={svg_icons}
              renderFunc={renderSVG}
              theme="default"
              value={icon}
              onChange={(value) => setAttributes({ icon: value })}
              isMulti={false}
              noSelectedPlaceholder={__("Select Icon")}
            />
            <SelectControl
              label={__("Icon Position")}
              value={iconPosition}
              onChange={(value) => setAttributes({ iconPosition: value })}
              options={[
                { value: "before", label: __("Before Text") },
                { value: "after", label: __("After Text") },
              ]}
            />
            <p className="skt-blocks-setting-label">
              {__("Icon Color", "skt-blocks")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: icon_color }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={icon_color}
              onChange={(value) => setAttributes({ icon_color: value })}
              allowReset
            />
            <p className="skt-blocks-setting-label">
              {__("Icon Hover Color", "skt-blocks")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: icon_hcolor }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={icon_hcolor}
              onChange={(value) => setAttributes({ icon_hcolor: value })}
              allowReset
            />
          </Fragment>
        </PanelBody>

        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <TabPanel
            className="rbea-inspect-tabs rbea-inspect-tabs-col-3"
            activeClass="active-tab"
            initialTabName={(this.props.deviceType || "Desktop").toLowerCase()}
            onSelect={setPreviewDevice}
            tabs={DEVICE_TABS.map((t) => ({ ...t, className: "rbea-normal-tab" }))}
          >
            {(tab) => {
              const sfx = deviceSuffix(tab.name);
              const field = (base, label, min, max, def) => (
                <RangeControl
                  label={label}
                  value={inherited(this.props.attributes, base, sfx)}
                  onChange={(value) =>
                    setAttributes({
                      [base + sfx]:
                        value !== undefined ? value : sfx ? undefined : def,
                    })
                  }
                  min={min}
                  max={max}
                  allowReset
                />
              );
              return (
                <div>
                  {field("titleSpace", __("Title Bottom Margin", "skt-blocks"), -100, 100, 8)}
                  {field("subtitleSpace", __("Subtitle Bottom Margin", "skt-blocks"), -100, 100, 16)}
                  {field("contenttopSpace", __("Content Top Margin", "skt-blocks"), -100, 100, 16)}
                  {field("contentSpace", __("Content Bottom Margin", "skt-blocks"), -100, 100, 16)}
                  {field("blockmargin", __("Block Top Margin", "skt-blocks"), -100, 200, 2)}
                  {field("blockbotmargin", __("Block Bottom Margin", "skt-blocks"), -100, 200, 2)}
                  {field("blockleftmargin", __("Block Left Margin", "skt-blocks"), -100, 200, 0)}
                  {field("blockrightmargin", __("Block Right Margin", "skt-blocks"), -100, 200, 0)}
                </div>
              );
            }}
          </TabPanel>
        </PanelBody>

        <PanelBody
          title={__("Border Settings", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style", "skt-blocks")}
            value={borderStyle}
            onChange={(value) => setAttributes({ borderStyle: value })}
            options={[
              {
                value: "none",
                label: __("None", "skt-blocks"),
              },
              {
                value: "solid",
                label: __("Solid", "skt-blocks"),
              },
              {
                value: "dotted",
                label: __("Dotted", "skt-blocks"),
              },
              {
                value: "dashed",
                label: __("Dashed", "skt-blocks"),
              },
              {
                value: "double",
                label: __("Double", "skt-blocks"),
              },
              {
                value: "groove",
                label: __("Groove", "skt-blocks"),
              },
              {
                value: "inset",
                label: __("Inset", "skt-blocks"),
              },
              {
                value: "outset",
                label: __("Outset", "skt-blocks"),
              },
              {
                value: "ridge",
                label: __("Ridge", "skt-blocks"),
              },
            ]}
          />
          {"none" != borderStyle && (
            <Fragment>
              <RangeControl
                label={__("Border Width", "skt-blocks")}
                value={borderWidth}
                onChange={(value) =>
                  setAttributes({
                    borderWidth: value !== undefined ? value : 0,
                  })
                }
                min={0}
                max={50}
                allowReset
              />
              <Fragment>
                <p>
                  {__("Border Color", "skt-blocks")}
                  <span className="components-base-control__label">
                    <span
                      className="component-color-indicator"
                      style={{ backgroundColor: borderColor }}
                    ></span>
                  </span>
                </p>
                <ColorPalette
                  value={borderColor}
                  onChange={(colorValue) =>
                    setAttributes({ borderColor: colorValue })
                  }
                  allowReset
                />
              </Fragment>
            </Fragment>
          )}
          <RangeControl
            label={__("Border Radius", "skt-blocks")}
            value={borderRadius}
            onChange={(value) =>
              setAttributes({ borderRadius: value !== undefined ? value : 12 })
            }
            min={0}
            max={50}
            allowReset
          />
          <BoxShadowControl
            setAttributes={setAttributes}
            label={__("Box Shadow", "skt-blocks")}
            boxShadowColor={{ value: boxShadowColor, label: __("Color") }}
            boxShadowHOffset={{
              value: boxShadowHOffset,
              label: __("Horizontal", "skt-blocks"),
            }}
            boxShadowVOffset={{
              value: boxShadowVOffset,
              label: __("Vertical", "skt-blocks"),
            }}
            boxShadowBlur={{
              value: boxShadowBlur,
              label: __("Blur", "skt-blocks"),
            }}
            boxShadowSpread={{
              value: boxShadowSpread,
              label: __("Spread", "skt-blocks"),
            }}
            boxShadowPosition={{
              value: boxShadowPosition,
              label: __("Position", "skt-blocks"),
            }}
          />
        </PanelBody>

        <PanelColorSettings
          title={__("Text Color Settings", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: textColor,
              onChange: onChangeTextColor,
              label: __("Text Color", "skt-blocks"),
            },
          ]}
        ></PanelColorSettings>
        <PanelBody title={__("Visibility", "skt-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Hide on Desktop", "skt-blocks")}
            checked={!!this.props.attributes.hideDesktop}
            onChange={(value) => setAttributes({ hideDesktop: value })}
          />
          <ToggleControl
            label={__("Hide on Tablet", "skt-blocks")}
            checked={!!this.props.attributes.hideTablet}
            onChange={(value) => setAttributes({ hideTablet: value })}
          />
          <ToggleControl
            label={__("Hide on Mobile", "skt-blocks")}
            checked={!!this.props.attributes.hideMobile}
            onChange={(value) => setAttributes({ hideMobile: value })}
          />
          <ToggleControl
            label={__("Hide from Logged-in Users", "skt-blocks")}
            checked={!!this.props.attributes.hideLoggedIn}
            onChange={(value) => setAttributes({ hideLoggedIn: value })}
          />
          <ToggleControl
            label={__("Hide from Logged-out Users", "skt-blocks")}
            checked={!!this.props.attributes.hideLoggedOut}
            onChange={(value) => setAttributes({ hideLoggedOut: value })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
