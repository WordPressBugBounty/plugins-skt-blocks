/**
 * Inspector Controls
 */

import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import BoxShadowControl from "../../../utils/components/box-shadow";
import icons from "./../../../utils/components/icons";
import renderSVG from "../../../renderIcon";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  RichText,
  AlignmentToolbar,
  BlockControls,
  MediaUpload,
  ColorPalette,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  ToggleControl,
  RangeControl,
  SelectControl,
  TextControl,
  BaseControl,
  Button,
  ButtonGroup,
  Icon,
  TabPanel,
  Dashicon,
} = wp.components;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.getIfbIcon = this.getIfbIcon.bind(this);
    this.toggleTarget = this.toggleTarget.bind(this);
    this.toggleResponsive = this.toggleResponsive.bind(this);
    this.getCtaicon = this.getCtaicon.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
  }

  getIfbIcon(value) {
    this.props.setAttributes({ icon: value });
  }

  getCtaicon(value) {
    this.props.setAttributes({ ctaIcon: value });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectImage(media) {
    const { iconImage } = this.props.attributes;
    const { setAttributes } = this.props;

    if (!media || !media.url) {
      setAttributes({ iconImage: null });
      return;
    }

    if (!media.type || "image" !== media.type) {
      setAttributes({ iconImage: null });
      return;
    }
    setAttributes({ iconImage: media });
  }

  /*
   * Event to set Image as null while removing.
   */
  onRemoveImage() {
    const { setAttributes } = this.props;

    setAttributes({ iconImage: null });
  }

  /**
   * Function Name: toggleTarget.
   */
  toggleTarget() {
    const { resctaTarget } = this.props.attributes;
    const { setAttributes } = this.props;

    setAttributes({ resctaTarget: !resctaTarget });
  }

  /**
   * Function Name: toggleResponsive.
   */
  toggleResponsive() {
    const { responsiveDesign } = this.props.attributes;
    const { setAttributes } = this.props;

    setAttributes({ responsiveDesign: !responsiveDesign });
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        resheadingAlign,
        resheadingColor,
        ressubheadingColor,
        resprefixColor,
        resprefixFontSize,
        resprefixFontWeight,
        resprefixLineHeight,
        resheadingTag,
        resheadFontFamily,
        resheadFontSize,
        resheadFontSizeMobile,
        resheadFontSizeTablet,
        resheadFontWeight,
        resheadLineHeight,
        ressubHeadFontFamily,
        ressubHeadFontSize,
        ressubHeadFontSizeTablet,
        ressubHeadFontSizeMobile,
        ressubHeadFontWeight,
        ressubHeadLineHeight,
        resseparatorWidthType,
        resseperatorSpace,
        resheadSpace,
        ressubHeadSpace,
        icon,
        iconColor,
        resIconSize,
        imgiconPosition,
        source_type,
        ressourceAlign,
        resseperatorPosition,
        resseperatorStyle,
        resseperatorWidth,
        resseperatorColor,
        resseperatorThickness,
        resctaType,
        resctaText,
        resctaLink,
        resctaTarget,
        ctaIcon,
        resctaLinkColor,
        resctaFontSize,
        resctaFontWeight,
        resctaBtnLinkColor,
        resctaBgColor,
        ctaBtnVertPadding,
        ctaBtnHrPadding,
        resctaBorderStyle,
        resctaBorderColor,
        resctaBorderWidth,
        resctaBorderRadius,
        resprefixSpace,
        iconLeftMargin,
        iconRightMargin,
        iconTopMargin,
        iconBottomMargin,
        iconImage,
        imageSize,
        imageWidth,
        imageWidthTablet,
        imageWidthMobile,
        imageWidthType,
        stack,
        resshowPrefix,
        resshowTitle,
        resshowDesc,
        inheritFromTheme,
        blockBorderStyle,
        blockBorderWidth,
        blockBorderRadius,
        blockBorderColor,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        imageBoxShadowColor,
        imageBoxShadowHOffset,
        imageBoxShadowVOffset,
        imageBoxShadowBlur,
        imageBoxShadowSpread,
        imageBoxShadowPosition,
        boxBackgroundColor,
        contentPadding,
        opacity,
        dimRatio,
        imgURL,
        imgID,
        hoverctaBtnLinkColor,
        hoverctaBgColor,
        hoverctaBorderColor,
        imagePosition,
        imageRepeat,
        thumbsize,
        backgroundAttachment,
        sepSpace,
        icon_color,
        icon_hcolor,
        resImageBorderColor,
        resImageBorderRadius,
        resImageBorderWidth,
        resImageBorderStyle,
        alignment,
          imageopacity,
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
    // Update color values
    const onChangeBackgroundColor = (value) =>
      setAttributes({ boxBackgroundColor: value });

    // Change the image
    const onSelectBgImage = (img) => {
      setAttributes({
        imgID: img.id,
        imgURL: img.url,
        imgAlt: img.alt,
      });
    };

    // Clear the image
    const onRemoveBgImage = () => {
      setAttributes({
        imgID: null,
        imgURL: null,
        imgAlt: null,
      });
    };

    // Icon properties.
    const icon_props = {
      icons: svg_icons,
      value: icon,
      onChange: this.getIfbIcon,
      isMulti: false,
      renderFunc: renderSVG,
      noSelectedPlaceholder: __(
        "Select Icon",
        "skt-blocks"
      ),
    };

    // Settings for icon.
    const iconControls = (
      <Fragment>
        <FontIconPicker {...icon_props} />
        <RangeControl
          label={__("Icon Size", "skt-blocks")}
          value={resIconSize}
          onChange={(value) =>
            setAttributes({ resIconSize: value !== undefined ? value : 40 })
          }
          min={10}
          max={300}
          beforeIcon=""
          allowReset
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
    );

    let image_name = __("Select Image", "skt-blocks");
    if (iconImage) {
      if (iconImage.url == null || iconImage.url == "") {
        image_name = __("Select Image", "skt-blocks");
      } else {
        image_name = __("Replace Image", "skt-blocks");
      }
    }

    // Update color values
    const onChangeiconColor = (value) => setAttributes({ iconColor: value });
    var advancedControls;
    var boxShadowAdvancedControls;
    var resetBoxShadowAdvancedControls;
    advancedControls = (
      <Fragment>
        <p className="skt-blocks-setting-label">
          {__("Color", "skt-blocks")}
          <span className="components-base-control__label">
            <span
              className="component-color-indicator"
              style={{ backgroundColor: imageBoxShadowColor }}
            ></span>
          </span>
        </p>
        <ColorPalette
          value={imageBoxShadowColor}
          onChange={(colorValue) =>
            setAttributes({
              imageBoxShadowColor: colorValue !== undefined ? colorValue : "",
            })
          }
          allowReset
        />
        <h2>{__("Horizontal", "skt-blocks")}</h2>
        <RangeControl
          value={imageBoxShadowHOffset}
          onChange={(value) =>
            setAttributes({
              imageBoxShadowHOffset: value !== undefined ? value : 0,
            })
          }
          min={-100}
          max={100}
          allowReset
        />
        <h2>{__("Vertical", "skt-blocks")}</h2>
        <RangeControl
          value={imageBoxShadowVOffset}
          onChange={(value) =>
            setAttributes({
              imageBoxShadowVOffset: value !== undefined ? value : 0,
            })
          }
          min={-100}
          max={100}
          allowReset
        />
        <h2>{__("Blur", "skt-blocks")}</h2>
        <RangeControl
          value={imageBoxShadowBlur}
          onChange={(value) =>
            setAttributes({
              imageBoxShadowBlur: value !== undefined ? value : 0,
            })
          }
          min={0}
          max={100}
          allowReset
        />
        <h2>{__("Spread", "skt-blocks")}</h2>
        <RangeControl
          value={imageBoxShadowSpread}
          onChange={(value) =>
            setAttributes({
              imageBoxShadowSpread: value !== undefined ? value : 0,
            })
          }
          min={0}
          max={100}
          allowReset
        />
        <SelectControl
          label={__("Position", "skt-blocks")}
          value={imageBoxShadowPosition}
          onChange={(value) => setAttributes({ imageBoxShadowPosition: value })}
          options={[
            { value: "inset", label: __("Inset") },
            { value: "outset", label: __("Outset") },
          ]}
        />
      </Fragment>
    );

    const imageControls = (
      <Fragment>
        <BaseControl
          className="editor-bg-image-control"
          label={__("Image", "skt-blocks")}
        >
          <MediaUpload
            title={__("Select Image", "skt-blocks")}
            onSelect={this.onSelectImage}
            allowedTypes={["image"]}
            value={iconImage}
            render={({ open }) => (
              <Button isDefault onClick={open}>
                {image_name}
              </Button>
            )}
          />
          {iconImage && iconImage.url !== "null" && iconImage.url !== "" && (
            <Button
              className="skt-blocks-rm-btn"
              onClick={this.onRemoveImage}
              isLink
              isDestructive
            >
              {__("Remove Image", "skt-blocks")}
            </Button>
          )}
          {iconImage && iconImage.url !== "null" && iconImage.url !== "" && (
          <RangeControl
              label={__("Image Opacity", "skt-blocks")}
              value={imageopacity}
              onChange={(value) =>
              setAttributes({ imageopacity: value !== undefined ? value : 100 })
          }
              min={0}
              max={100}
              allowReset
              />
          )}
        </BaseControl>
        {iconImage && iconImage.url !== "null" && iconImage.url !== "" && (
          <Fragment>
            <ToggleControl
              label={__("Custom Width", "skt-blocks")}
              checked={imageWidthType}
              onChange={(value) =>
                setAttributes({ imageWidthType: !imageWidthType })
              }
              help={__(
                "Turn this off to inherit the natural width of Image.",
                "skt-blocks"
              )}
            />
            {imageWidthType && (
              <TabPanel
                className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
                activeClass="active-tab"
                tabs={[
                  {
                    name: "desktop",
                    title: <Dashicon icon="desktop" />,
                    className:
                      " responsive-desktop-tab  responsive-responsive-tabs",
                  },
                  {
                    name: "tablet",
                    title: <Dashicon icon="tablet" />,
                    className:
                      " responsive-tablet-tab  responsive-responsive-tabs",
                  },
                  {
                    name: "mobile",
                    title: <Dashicon icon="smartphone" />,
                    className:
                      " responsive-mobile-tab  responsive-responsive-tabs",
                  },
                ]}
              >
                {(tab) => {
                  let tabout;

                  if ("mobile" === tab.name) {
                    tabout = (
                      <Fragment>
                        <RangeControl
                          label={__(
                            "Width (px)",
                            "skt-blocks"
                          )}
                          value={imageWidthMobile}
                          onChange={(value) =>
                            setAttributes({
                              imageWidthMobile: value,
                            })
                          }
                          min={0}
                          max={1000}
                          beforeIcon=""
                        />
                      </Fragment>
                    );
                  } else if ("tablet" === tab.name) {
                    tabout = (
                      <Fragment>
                        <RangeControl
                          label={__(
                            "Width (px)",
                            "skt-blocks"
                          )}
                          value={imageWidthTablet}
                          onChange={(value) =>
                            setAttributes({
                              imageWidthTablet: value,
                            })
                          }
                          min={0}
                          max={1000}
                          beforeIcon=""
                        />
                      </Fragment>
                    );
                  } else {
                    tabout = (
                      <Fragment>
                        <RangeControl
                          label={__(
                            "Width (px)",
                            "skt-blocks"
                          )}
                          value={imageWidth}
                          onChange={(value) =>
                            setAttributes({
                              imageWidth: value,
                            })
                          }
                          min={0}
                          max={1000}
                          beforeIcon=""
                        />
                      </Fragment>
                    );
                  }

                  return <div>{tabout}</div>;
                }}
              </TabPanel>
            )}
            <PanelBody
              title={__(
                "Image Border Settings",
                "skt-blocks"
              )}
              initialOpen={false}
            >
              <SelectControl
                label={__("Border Style", "skt-blocks")}
                value={resImageBorderStyle}
                onChange={(value) =>
                  setAttributes({ resImageBorderStyle: value })
                }
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
              {"none" != resImageBorderStyle && (
                <Fragment>
                  <RangeControl
                    label={__("Border Width", "skt-blocks")}
                    value={resImageBorderWidth}
                    onChange={(value) =>
                      setAttributes({
                        resImageBorderWidth: value !== undefined ? value : 2,
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
                          style={{ backgroundColor: resImageBorderColor }}
                        ></span>
                      </span>
                    </p>
                    <ColorPalette
                      value={resImageBorderColor}
                      onChange={(colorValue) =>
                        setAttributes({
                          resImageBorderColor:
                            colorValue !== undefined ? colorValue : "#000",
                        })
                      }
                      allowReset
                    />
                  </Fragment>

                  <RangeControl
                    label={__(
                      "Border Radius",
                      "skt-blocks"
                    )}
                    value={resImageBorderRadius}
                    onChange={(value) =>
                      setAttributes({
                        resImageBorderRadius: value !== undefined ? value : "",
                      })
                    }
                    min={0}
                    max={100}
                    allowReset
                  />
                </Fragment>
              )}
            </PanelBody>
            <PanelBody
              title={__("Image Box Shadow", "skt-blocks")}
              initialOpen={false}
            >
              {advancedControls}
            </PanelBody>
          </Fragment>
        )}
      </Fragment>
    );

    return (
      <InspectorControls key="inspector">
        <PanelBody title={__("Image/Icon", "skt-blocks")}>
          <SelectControl
            label={__("Select Position", "skt-blocks")}
            value={imgiconPosition}
            onChange={(value) => setAttributes({ imgiconPosition: value })}
            options={[
              {
                value: "above-title",
                label: __("Above Title", "skt-blocks"),
              },
              {
                value: "below-title",
                label: __("Below Title", "skt-blocks"),
              },
              {
                value: "left-title",
                label: __("Left of Title", "skt-blocks"),
              },
              {
                value: "right-title",
                label: __("Right of Title", "skt-blocks"),
              },
              {
                value: "left",
                label: __(
                  "Left of Text and Title",
                  "skt-blocks"
                ),
              },
              {
                value: "right",
                label: __(
                  "Right of Text and Title",
                  "skt-blocks"
                ),
              },
            ]}
          />
          {(imgiconPosition == "left" || imgiconPosition == "right") && (
            <Fragment>
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
                help={__(
                  "Note: Choose on what breakpoint the Info Box will stack."
                )}
                onChange={(value) => setAttributes({ stack: value })}
              />
              <p>
                {__("Alignment when stacked", "skt-blocks")}
              </p>
              <AlignmentToolbar
                value={alignment}
                onChange={(value) =>
                  setAttributes({
                    alignment: value,
                  })
                }
                controls={["left", "center", "right", "full"]}
                isCollapsed={false}
              />
            </Fragment>
          )}
          <hr className="skt-blocks-editor__separator" />

          <SelectControl
            label={__("Select Source", "skt-blocks")}
            value={source_type}
            onChange={(value) => setAttributes({ source_type: value })}
            options={[
              {
                value: "none",
                label: __("None", "skt-blocks"),
              },
              {
                value: "icon",
                label: __("Icon", "skt-blocks"),
              },
              {
                value: "image",
                label: __("Image", "skt-blocks"),
              },
            ]}
          />

          {imgiconPosition &&
            imgiconPosition !== "above-title" &&
            imgiconPosition !== "below-title" && (
              <SelectControl
                label={__(
                  "Vertical Alignment",
                  "skt-blocks"
                )}
                value={ressourceAlign}
                onChange={(value) => setAttributes({ ressourceAlign: value })}
                options={[
                  {
                    value: "top",
                    label: __("Top", "skt-blocks"),
                  },
                  {
                    value: "middle",
                    label: __("Middle", "skt-blocks"),
                  },
                ]}
              />
            )}

          {source_type && source_type == "icon" && iconControls}

          {source_type && source_type == "image" && imageControls}
        </PanelBody>

        <PanelBody
          title={__("Background Options", "skt-blocks")}
          initialOpen={false}
        >
          <p>
            {__("Select a background image:", "skt-blocks")}
          </p>
          <MediaUpload
            onSelect={onSelectBgImage}
            type="image"
            value={imgID}
            render={({ open }) => (
              <div>
                <Button
                  className="skt-blocks-cta-inspector-media"
                  label={__("Edit image", "skt-blocks")}
                  onClick={open}
                >
                  <Icon icon="format-image" />
                  {__("Select Image", "skt-blocks")}
                </Button>

                {imgURL && !!imgURL.length && (
                  <Button
                    className="skt-blocks-cta-inspector-media"
                    label={__("Remove Image", "skt-blocks")}
                    onClick={onRemoveBgImage}
                  >
                    <Icon icon="dismiss" />
                    {__("Remove", "skt-blocks")}
                  </Button>
                )}
              </div>
            )}
          ></MediaUpload>

          {imgURL && !!imgURL.length && (
            <RangeControl
              label={__("Image Opacity", "skt-blocks")}
              value={dimRatio}
              onChange={(value) =>
                this.props.setAttributes({
                  dimRatio: value,
                })
              }
              min={0}
              max={100}
              step={10}
            />
          )}
          {imgURL && !!imgURL.length && (
            <PanelBody
              title={__("Image Settings", "skt-blocks")}
              initialOpen={false}
            >
                         {" "}
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
                    value: "center top",
                    label: __("Center Top", "skt-blocks"),
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
                    label: __(
                      "Bottom Center",
                      "skt-blocks"
                    ),
                  },
                  {
                    value: "bottom right",
                    label: __("Bottom Right", "skt-blocks"),
                  },
                ]}
              />
              <SelectControl
                label={__("Attachment")}
                value={backgroundAttachment}
                onChange={(value) =>
                  setAttributes({ backgroundAttachment: value })
                }
                options={[
                  { value: "fixed", label: __("Fixed") },
                  { value: "scroll", label: __("Scroll") },
                ]}
              />
                         {" "}
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
                         {" "}
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
                       {" "}
            </PanelBody>
          )}
          <PanelColorSettings
            title={__("Background Color", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: boxBackgroundColor,
                onChange: onChangeBackgroundColor,
                label: __("Background Color", "skt-blocks"),
              },
            ]}
          >
            <RangeControl
              label={__("Opacity", "skt-blocks")}
              value={opacity}
              onChange={(value) =>
                setAttributes({ opacity: value !== undefined ? value : 100 })
              }
              min={0}
              max={100}
              allowReset
            />
          </PanelColorSettings>
        </PanelBody>

        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Content Padding", "atomic-blocks")}
            value={contentPadding}
            onChange={(value) =>
              setAttributes({
                contentPadding: value !== undefined ? value : 0,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__("Prefix Bottom Margin", "skt-blocks")}
            value={resprefixSpace}
            onChange={(value) =>
              setAttributes({ resprefixSpace: value !== undefined ? value : 5 })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__("Title Bottom Margin", "skt-blocks")}
            value={resheadSpace}
            onChange={(value) =>
              setAttributes({ resheadSpace: value !== undefined ? value : 10 })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__(
              "Separator Bottom Margin",
              "skt-blocks"
            )}
            value={sepSpace}
            onChange={(value) =>
              setAttributes({ sepSpace: value !== undefined ? value : 10 })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__(
              "Description Bottom Margin",
              "skt-blocks"
            )}
            value={ressubHeadSpace}
            onChange={(value) =>
              setAttributes({
                ressubHeadSpace: value !== undefined ? value : 10,
              })
            }
            min={0}
            max={50}
            allowReset
          />
          <hr className="skt-blocks-editor__separator" />
          <h3>{__("Image/Icon Margin", "skt-blocks")}</h3>
          <RangeControl
            label={__("Top Margin", "skt-blocks")}
            value={iconTopMargin}
            onChange={(value) => setAttributes({ iconTopMargin: value })}
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Bottom Margin", "skt-blocks")}
            value={iconBottomMargin}
            onChange={(value) => setAttributes({ iconBottomMargin: value })}
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Left Margin", "skt-blocks")}
            value={iconLeftMargin}
            onChange={(value) => setAttributes({ iconLeftMargin: value })}
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Right Margin", "skt-blocks")}
            value={iconRightMargin}
            onChange={(value) => setAttributes({ iconRightMargin: value })}
            min={0}
            max={50}
          />
        </PanelBody>

        <PanelBody
          title={__("Border", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style")}
            value={blockBorderStyle}
            onChange={(value) => setAttributes({ blockBorderStyle: value })}
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
                label: __(
                  "Double",
                  "skt-blocks",
                  "skt-blocks"
                ),
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
          {"none" != blockBorderStyle && (
            <RangeControl
              label={__("Border Width", "skt-blocks")}
              value={blockBorderWidth}
              onChange={(value) =>
                setAttributes({
                  blockBorderWidth: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={50}
              allowReset
            />
          )}
          <RangeControl
            label={__("Border Radius", "skt-blocks")}
            value={blockBorderRadius}
            onChange={(value) =>
              setAttributes({
                blockBorderRadius: value !== undefined ? value : null,
              })
            }
            min={0}
            max={1000}
            allowReset
          />
          {"none" != blockBorderStyle && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Border Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: blockBorderColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={blockBorderColor}
                onChange={(colorValue) =>
                  setAttributes({ blockBorderColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}
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

        <PanelBody
          title={__("Separator", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Position", "skt-blocks")}
            value={resseperatorPosition}
            onChange={(value) => setAttributes({ resseperatorPosition: value })}
            options={[
              {
                value: "after_icon",
                label: __("After Icon/Image", "skt-blocks"),
              },
              {
                value: "after_prefix",
                label: __("After Prefix", "skt-blocks"),
              },
              {
                value: "after_title",
                label: __("After Title", "skt-blocks"),
              },
              {
                value: "after_desc",
                label: __(
                  "After Description",
                  "skt-blocks"
                ),
              },
            ]}
          />
          <SelectControl
            label={__("Style", "skt-blocks")}
            value={resseperatorStyle}
            onChange={(value) => setAttributes({ resseperatorStyle: value })}
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
                value: "double",
                label: __("Double", "skt-blocks"),
              },
              {
                value: "dashed",
                label: __("Dashed", "skt-blocks"),
              },
              {
                value: "dotted",
                label: __("Dotted", "skt-blocks"),
              },
            ]}
          />
          {"none" !== resseperatorStyle && (
            <Fragment>
              <RangeControl
                label={__("Thickness", "skt-blocks")}
                value={resseperatorThickness}
                onChange={(value) =>
                  setAttributes({
                    resseperatorThickness: value !== undefined ? value : 2,
                  })
                }
                min={1}
                max={100}
                beforeIcon=""
                allowReset
              />
              <ButtonGroup
                className="skt-blocks-size-type-field"
                aria-label={__("Size Type", "skt-blocks")}
              >
                <Button
                  key={"px"}
                  className="skt-blocks-size-btn"
                  isSmall
                  isPrimary={resseparatorWidthType === "px"}
                  aria-pressed={resseparatorWidthType === "px"}
                  onClick={() => setAttributes({ resseparatorWidthType: "px" })}
                >
                  {"px"}
                </Button>
                <Button
                  key={"%"}
                  className="skt-blocks-size-btn"
                  isSmall
                  isPrimary={resseparatorWidthType === "%"}
                  aria-pressed={resseparatorWidthType === "%"}
                  onClick={() => setAttributes({ resseparatorWidthType: "%" })}
                >
                  {"%"}
                </Button>
              </ButtonGroup>
              <RangeControl
                label={__("Width", "skt-blocks")}
                value={resseperatorWidth}
                onChange={(value) =>
                  setAttributes({
                    resseperatorWidth: value !== undefined ? value : 30,
                  })
                }
                min={0}
                max={"%" == resseparatorWidthType ? 100 : 500}
                beforeIcon=""
                allowReset
              />
              <p className="skt-blocks-setting-label">
                {__("Separator Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: resseperatorColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={resseperatorColor}
                onChange={(colorValue) =>
                  setAttributes({ resseperatorColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}
        </PanelBody>

        <PanelBody
          title={__("Call To Action", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Type")}
            value={resctaType}
            onChange={(value) => setAttributes({ resctaType: value })}
            options={[
              {
                value: "none",
                label: __("None", "skt-blocks"),
              },
              {
                value: "text",
                label: __("Text", "skt-blocks"),
              },
              {
                value: "button",
                label: __("Button", "skt-blocks"),
              },
            ]}
          />
          {(resctaType === "text" || resctaType === "button") && (
            <Fragment>
              <TextControl
                label={__("Text", "skt-blocks")}
                value={resctaText}
                onChange={(value) => setAttributes({ resctaText: value })}
              />
            </Fragment>
          )}
          {resctaType !== "none" && (
            <Fragment>
              <TextControl
                label={__("Link", "skt-blocks")}
                value={resctaLink}
                onChange={(value) => setAttributes({ resctaLink: value })}
              />
              <ToggleControl
                label={__(
                  "Open in new Window",
                  "skt-blocks"
                )}
                checked={resctaTarget}
                onChange={this.toggleTarget}
              />
            </Fragment>
          )}

          {resctaType == "button" && (
            <Fragment>
              <h2>{__("Button Padding", "skt-blocks")}</h2>
              <RangeControl
                label={__("Vertical Padding", "skt-blocks")}
                value={ctaBtnVertPadding}
                onChange={(value) =>
                  setAttributes({
                    ctaBtnVertPadding: value !== undefined ? value : 10,
                  })
                }
                min={0}
                max={100}
                className={"skt-blocks-margin-control"}
                allowReset
              />
              <RangeControl
                label={__(
                  "Horizontal Padding",
                  "skt-blocks"
                )}
                value={ctaBtnHrPadding}
                onChange={(value) =>
                  setAttributes({
                    ctaBtnHrPadding: value !== undefined ? value : 14,
                  })
                }
                min={0}
                max={100}
                className={"skt-blocks-margin-control"}
                allowReset
              />
              <hr className="skt-blocks-editor__separator" />
              <h2>{__("Button Border", "skt-blocks")}</h2>
              <SelectControl
                label={__("Style", "skt-blocks")}
                value={resctaBorderStyle}
                onChange={(value) =>
                  setAttributes({ resctaBorderStyle: value })
                }
                options={[
                  {
                    value: "none",
                    label: __(
                      "None",
                      "skt-blocks",
                      "skt-blocks"
                    ),
                  },
                  {
                    value: "solid",
                    label: __("Solid", "skt-blocks"),
                  },
                  {
                    value: "double",
                    label: __("Double", "skt-blocks"),
                  },
                  {
                    value: "dashed",
                    label: __("Dashed", "skt-blocks"),
                  },
                  {
                    value: "dotted",
                    label: __("Dotted", "skt-blocks"),
                  },
                ]}
              />

              {resctaBorderStyle !== "none" && (
                <Fragment>
                  <RangeControl
                    label={__("Width", "skt-blocks")}
                    value={resctaBorderWidth}
                    onChange={(value) =>
                      setAttributes({
                        resctaBorderWidth: value !== undefined ? value : 1,
                      })
                    }
                    min={0}
                    max={100}
                    beforeIcon=""
                    allowReset
                  />
                </Fragment>
              )}
              <RangeControl
                label={__("Rounded Corner", "skt-blocks")}
                value={resctaBorderRadius}
                onChange={(value) =>
                  setAttributes({
                    resctaBorderRadius: value !== undefined ? value : 0,
                  })
                }
                min={0}
                max={50}
                beforeIcon=""
                allowReset
              />
              <hr className="skt-blocks-editor__separator" />
            </Fragment>
          )}

          {resctaType === "text" && (
            <Fragment>
              <p className="skt-blocks-setting-label">
                {__("Text Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: resctaLinkColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={resctaLinkColor}
                onChange={(colorValue) =>
                  setAttributes({ resctaLinkColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}

          {resctaType == "button" && (
            <Fragment>
              <p className="skt-blocks-setting-label">
                {__("Text Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: resctaBtnLinkColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={resctaBtnLinkColor}
                onChange={(colorValue) =>
                  setAttributes({ resctaBtnLinkColor: colorValue })
                }
                allowReset
              />
              <p className="skt-blocks-setting-label">
                {__("Background Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: resctaBgColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={resctaBgColor}
                onChange={(colorValue) =>
                  setAttributes({ resctaBgColor: colorValue })
                }
                allowReset
              />

              <p className="skt-blocks-setting-label">
                {__("Text Hover Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: hoverctaBtnLinkColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={hoverctaBtnLinkColor}
                onChange={(colorValue) =>
                  setAttributes({ hoverctaBtnLinkColor: colorValue })
                }
                allowReset
              />
              <p className="skt-blocks-setting-label">
                {__("Background Hover Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: hoverctaBgColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={hoverctaBgColor}
                onChange={(colorValue) =>
                  setAttributes({ hoverctaBgColor: colorValue })
                }
                allowReset
              />
              {resctaBorderStyle !== "none" && (
                <Fragment>
                  <p className="skt-blocks-setting-label">
                    {__("Border Color", "skt-blocks")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: resctaBorderColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={resctaBorderColor}
                    onChange={(colorValue) =>
                      setAttributes({ resctaBorderColor: colorValue })
                    }
                    allowReset
                  />
                  <p className="skt-blocks-setting-label">
                    {__("Border Hover Color", "skt-blocks")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: hoverctaBorderColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={hoverctaBorderColor}
                    onChange={(colorValue) =>
                      setAttributes({ hoverctaBorderColor: colorValue })
                    }
                    allowReset
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </PanelBody>

        <PanelBody title={__("Content")} initialOpen={false}>
          <ToggleControl
            label={__("Enable Prefix", "skt-blocks")}
            checked={resshowPrefix}
            onChange={(value) =>
              setAttributes({ resshowPrefix: !resshowPrefix })
            }
          />
          {resshowPrefix && (
            <Fragment>
              <p className="skt-blocks-setting-label">
                {__("Prefix Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: resprefixColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={resprefixColor}
                onChange={(colorValue) =>
                  setAttributes({ resprefixColor: colorValue })
                }
                allowReset
              />
              <hr className="skt-blocks-editor__separator" />
            </Fragment>
          )}

          <ToggleControl
            label={__("Enable Title", "skt-blocks")}
            checked={resshowTitle}
            onChange={(value) => setAttributes({ resshowTitle: !resshowTitle })}
          />
          {resshowTitle && (
            <Fragment>
              <SelectControl
                label={__("Title Tag", "skt-blocks")}
                value={resheadingTag}
                onChange={(value) => setAttributes({ resheadingTag: value })}
                options={[
                  {
                    value: "h1",
                    label: __("H1", "skt-blocks"),
                  },
                  {
                    value: "h2",
                    label: __("H2", "skt-blocks"),
                  },
                  {
                    value: "h3",
                    label: __("H3", "skt-blocks"),
                  },
                  {
                    value: "h4",
                    label: __("H4", "skt-blocks"),
                  },
                  {
                    value: "h5",
                    label: __("H5", "skt-blocks"),
                  },
                  {
                    value: "h6",
                    label: __("H6", "skt-blocks"),
                  },
                ]}
              />
              <SelectControl
                label={__("Font Family", "skt-blocks")}
                options={fontOptions}
                value={resheadFontFamily}
                onChange={(value) => {
                  setAttributes({
                    resheadFontFamily: value,
                  }),
                    loadGoogleFont(value);
                }}
              />
              <TabPanel
                className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
                activeClass="active-tab"
                tabs={[
                  {
                    name: "desktop",
                    title: <Dashicon icon="desktop" />,
                    className:
                      " responsive-desktop-tab  responsive-responsive-tabs",
                  },
                  {
                    name: "tablet",
                    title: <Dashicon icon="tablet" />,
                    className:
                      " responsive-tablet-tab  responsive-responsive-tabs",
                  },
                  {
                    name: "mobile",
                    title: <Dashicon icon="smartphone" />,
                    className:
                      " responsive-mobile-tab  responsive-responsive-tabs",
                  },
                ]}
              >
                {(tab) => {
                  let tabout;

                  if ("mobile" === tab.name) {
                    tabout = (
                      <Fragment>
                        <RangeControl
                          label={__(
                            "Font Size",
                            "skt-blocks"
                          )}
                          min={0}
                          max={500}
                          value={resheadFontSizeMobile}
                          onChange={(value) =>
                            setAttributes({
                              resheadFontSizeMobile: value,
                            })
                          }
                        />
                      </Fragment>
                    );
                  } else if ("tablet" === tab.name) {
                    tabout = (
                      <Fragment>
                        <RangeControl
                          label={__(
                            "Font Size",
                            "skt-blocks"
                          )}
                          min={0}
                          max={500}
                          value={resheadFontSizeTablet}
                          onChange={(value) =>
                            setAttributes({
                              resheadFontSizeTablet: value,
                            })
                          }
                        />
                      </Fragment>
                    );
                  } else {
                    tabout = (
                      <Fragment>
                        <RangeControl
                          label={__(
                            "Font Size",
                            "skt-blocks"
                          )}
                          min={0}
                          max={500}
                          value={resheadFontSize}
                          onChange={(value) =>
                            setAttributes({
                              resheadFontSize: value,
                            })
                          }
                        />
                      </Fragment>
                    );
                  }

                  return <div>{tabout}</div>;
                }}
              </TabPanel>
              <SelectControl
                label={__("Font Weight", "skt-blocks")}
                options={fontWeightOptions}
                value={resheadFontWeight}
                onChange={(value) =>
                  setAttributes({
                    resheadFontWeight: value,
                  })
                }
              />

              <p className="skt-blocks-setting-label">
                {__("Title Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: resheadingColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={resheadingColor}
                onChange={(colorValue) =>
                  setAttributes({ resheadingColor: colorValue })
                }
                allowReset
              />
              <hr class="skt-blocks-editor__separator" />
            </Fragment>
          )}
          <ToggleControl
            label={__("Enable Description", "skt-blocks")}
            checked={resshowDesc}
            onChange={(value) => setAttributes({ resshowDesc: !resshowDesc })}
          />
          <SelectControl
            label={__("Font Family", "skt-blocks")}
            options={fontOptions}
            value={ressubHeadFontFamily}
            onChange={(value) => {
              setAttributes({
                ressubHeadFontFamily: value,
              }),
                loadGoogleFont(value);
            }}
          />
          <TabPanel
            className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
            activeClass="active-tab"
            tabs={[
              {
                name: "desktop",
                title: <Dashicon icon="desktop" />,
                className:
                  " responsive-desktop-tab  responsive-responsive-tabs",
              },
              {
                name: "tablet",
                title: <Dashicon icon="tablet" />,
                className: " responsive-tablet-tab  responsive-responsive-tabs",
              },
              {
                name: "mobile",
                title: <Dashicon icon="smartphone" />,
                className: " responsive-mobile-tab  responsive-responsive-tabs",
              },
            ]}
          >
            {(tab) => {
              let tabout;

              if ("mobile" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__("Font Size", "skt-blocks")}
                      min={0}
                      max={500}
                      value={ressubHeadFontSizeMobile}
                      onChange={(value) =>
                        setAttributes({
                          ressubHeadFontSizeMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__("Font Size", "skt-blocks")}
                      min={0}
                      max={500}
                      value={ressubHeadFontSizeTablet}
                      onChange={(value) =>
                        setAttributes({
                          ressubHeadFontSizeTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__("Font Size", "skt-blocks")}
                      min={0}
                      max={500}
                      value={ressubHeadFontSize}
                      onChange={(value) =>
                        setAttributes({
                          ressubHeadFontSize: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
          <SelectControl
            label={__("Font Weight", "skt-blocks")}
            options={fontWeightOptions}
            value={ressubHeadFontWeight}
            onChange={(value) =>
              setAttributes({
                ressubHeadFontWeight: value,
              })
            }
          />
          {resshowDesc && (
            <Fragment>
              <p className="skt-blocks-setting-label">
                {__("Description Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: ressubheadingColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={ressubheadingColor}
                onChange={(colorValue) =>
                  setAttributes({ ressubheadingColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}
        </PanelBody>
      </InspectorControls>
    );
  }
}
