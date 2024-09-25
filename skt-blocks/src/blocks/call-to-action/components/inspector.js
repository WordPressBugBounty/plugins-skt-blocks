/**
 * Inspector Controls
 */
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import BoxShadowControl from "../../../utils/components/box-shadow";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../renderIcon";
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
} = wp.blockEditor;

// Import Inspector components
const {
  Button,
  Icon,
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
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
  }

  render() {
    // Setup the attributes
    const {
      buttonBackgroundColor,
      buttonTextColor,
      buttonSize,
      buttonShape,
      buttonTarget,
      ctaTitleFontFamily,
      ctaTitleFontSize,
      ctaTitleFontSizeMobile,
      ctaTitleFontSizeTablet,
      ctaTextFontFamily,
      ctaTextFontSize,
      ctaBackgroundColor,
      ctaTextColor,
      dimRatio,
      imgURL,
      imgID,
      opacity,
      headingLineHeight,
      headingFontWeight,
      contentLineHeight,
      contentFontWeight,
      buttonvPadding,
      buttonhPadding,
      buttonborderWidth,
      buttonborderStyle,
      icon,
      iconPosition,
      hbuttonBackgroundColor,
      hbuttonTextColor,
      buttonborderColor,
      buttonborderHColor,
      resctaType,
      titleSpace,
      subtitleSpace,
      iconSpace,
      backgroundType,
      gradientDirection,
      colorLocation1,
      colorLocation2,
      backgroundColor1,
      backgroundColor2,
      buttonbackgroundType,
      buttongradientDirection,
      buttoncolorLocation1,
      buttoncolorLocation2,
      buttonbackgroundColor1,
      buttonbackgroundColor2,
      buttonSpace,
      borderRadius,
      boxShadowColor,
      boxShadowHOffset,
      boxShadowVOffset,
      boxShadowBlur,
      boxShadowSpread,
      boxShadowPosition,
      icon_color,
      topPadding,
      bottomPadding,
      leftPadding,
      rightPadding,
      imagePosition,
      imageRepeat,
      thumbsize,
    } = this.props.attributes;
    const { setAttributes } = this.props;

    // Button size values
    const buttonSizeOptions = [
      {
        value: "skt-blocks-cta-button-size-small",
        label: __("Small"),
      },
      {
        value: "skt-blocks-cta-button-size-medium",
        label: __("Medium"),
      },
      {
        value: "skt-blocks-cta-button-size-large",
        label: __("Large"),
      },
      {
        value: "skt-blocks-cta-button-size-extralarge",
        label: __("Extra Large"),
      },
    ];

    // Button shape
    const buttonShapeOptions = [
      {
        value: "skt-blocks-cta-button-shape-square",
        label: __("Square"),
      },
      {
        value: "skt-blocks-cta-button-shape-rounded",
        label: __("Rounded Square"),
      },
      {
        value: "skt-blocks-cta-button-shape-circular",
        label: __("Circular"),
      },
    ];

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

    // Change the image
    const onSelectImage = (img) => {
      setAttributes({
        imgID: img.id,
        imgURL: img.url,
        imgAlt: img.alt,
      });
    };

    // Clear the image
    const onRemoveImage = () => {
      setAttributes({
        imgID: null,
        imgURL: null,
        imgAlt: null,
      });
    };

    // Update color values
    const onChangeBackgroundColor = (value) =>
      setAttributes({ ctaBackgroundColor: value });
    const onChangeTextColor = (value) => setAttributes({ ctaTextColor: value });
    const onChangeButtonColor = (value) =>
      setAttributes({ buttonBackgroundColor: value });
    const onChangeButtonTextColor = (value) =>
      setAttributes({ buttonTextColor: value });

    const onChangeBorderColor = (value) =>
      setAttributes({ buttonborderColor: value });
    const onChangeBorderHoverColor = (value) =>
      setAttributes({ buttonborderHColor: value });
    const onChangeButtonTexthColor = (value) =>
      setAttributes({ hbuttonTextColor: value });
    const onChangeButtonhColor = (value) =>
      setAttributes({ hbuttonBackgroundColor: value });

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

    // Background Type Options
    const buttonbackgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
    ];

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={true}
        >
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
        <PanelBody
          title={__("Typography Options", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Title Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={ctaTitleFontFamily}
              onChange={(value) => {
                setAttributes({
                  ctaTitleFontFamily: value,
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
                        value={ctaTitleFontSizeMobile}
                        onChange={(value) =>
                          setAttributes({
                            ctaTitleFontSizeMobile: value,
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
                        value={ctaTitleFontSizeTablet}
                        onChange={(value) =>
                          setAttributes({
                            ctaTitleFontSizeTablet: value,
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
                        value={ctaTitleFontSize}
                        onChange={(value) =>
                          setAttributes({
                            ctaTitleFontSize: value,
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
                  headingLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
          </PanelBody>
          <PanelBody
            title={__(
              "Description Typography",
              "skt-blocks"
            )}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={ctaTextFontFamily}
              onChange={(value) => {
                setAttributes({
                  ctaTextFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Text Font Size", "skt-blocks")}
              value={ctaTextFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaTextFontSize: value,
                })
              }
              min={10}
              max={100}
              step={1}
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
                  contentLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
          </PanelBody>

          <PanelColorSettings
            title={__("Text Color", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: ctaTextColor,
                onChange: onChangeTextColor,
                label: __("Text Color", "skt-blocks"),
              },
            ]}
          ></PanelColorSettings>
        </PanelBody>
        <PanelBody
          title={__("Background Options", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Background Type", "skt-blocks")}
            value={backgroundType}
            onChange={(value) => setAttributes({ backgroundType: value })}
            options={backgroundTypeOptions}
          />
          {"image" == backgroundType && (
            <Fragment>
              <p>
                {__(
                  "Select a background image:",
                  "skt-blocks"
                )}
              </p>
              <MediaUpload
                onSelect={onSelectImage}
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
                        label={__(
                          "Remove Image",
                          "skt-blocks"
                        )}
                        onClick={onRemoveImage}
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

              <PanelBody
                title={__("Image Settings", "skt-blocks")}
                initialOpen={false}
              >
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
              </PanelBody>
            </Fragment>
          )}

          {"color" == backgroundType && (
            <PanelColorSettings
              title={__("Background Color", "skt-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: ctaBackgroundColor,
                  onChange: onChangeBackgroundColor,
                  label: __("", "skt-blocks"),
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
        </PanelBody>
        <PanelBody
          title={__("Button Options", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={__(
              "Open link in new window",
              "skt-blocks"
            )}
            checked={buttonTarget}
            onChange={() =>
              this.props.setAttributes({
                buttonTarget: !buttonTarget,
              })
            }
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

          <SelectControl
            label={__("Button Shape", "skt-blocks")}
            value={buttonShape}
            options={buttonShapeOptions.map(({ value, label }) => ({
              value,
              label,
            }))}
            onChange={(value) => {
              this.props.setAttributes({
                buttonShape: value,
              });
            }}
          />

          <SelectControl
            label={__("Type")}
            value={resctaType}
            onChange={(value) => setAttributes({ resctaType: value })}
            options={[
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
          {resctaType === "button" && (
            <PanelBody
              title={__("Border", "skt-blocks")}
              initialOpen={false}
            >
              <SelectControl
                label={__("Style", "skt-blocks")}
                value={buttonborderStyle}
                options={[
                  { value: "none", label: __("None") },
                  { value: "solid", label: __("Solid") },
                  { value: "dotted", label: __("Dotted") },
                  { value: "dashed", label: __("Dashed") },
                  { value: "double", label: __("Double") },
                ]}
                onChange={(value) => {
                  setAttributes({ buttonborderStyle: value });
                }}
              />
              {buttonborderStyle != "none" && (
                <RangeControl
                  label={__("Thickness", "skt-blocks")}
                  value={buttonborderWidth}
                  onChange={(value) => {
                    setAttributes({ buttonborderWidth: value });
                  }}
                  min={0}
                  max={20}
                />
              )}
              <RangeControl
                label={__("Vertical Padding", "skt-blocks")}
                value={buttonvPadding}
                onChange={(value) => {
                  setAttributes({ buttonvPadding: value });
                }}
                min={0}
                max={200}
              />
              <RangeControl
                label={__(
                  "Horizontal Padding",
                  "skt-blocks"
                )}
                value={buttonhPadding}
                onChange={(value) => {
                  setAttributes({ buttonhPadding: value });
                }}
                min={0}
                max={200}
              />
            </PanelBody>
          )}
          {resctaType === "button" && (
            <Fragment>
              <PanelBody
                title={__(
                  "Background Color Settings",
                  "skt-blocks"
                )}
                initialOpen={false}
              >
                <Fragment>
                  <PanelBody
                    title={__(
                      "Color Options",
                      "skt-blocks"
                    )}
                    initialOpen={false}
                  >
                    <SelectControl
                      label={__(
                        "Background Type",
                        "skt-blocks"
                      )}
                      value={buttonbackgroundType}
                      onChange={(value) =>
                        setAttributes({ buttonbackgroundType: value })
                      }
                      options={buttonbackgroundTypeOptions}
                    />
                    {"color" == buttonbackgroundType && (
                      <Fragment>
                        <PanelColorSettings
                          title={__(
                            "Button Color",
                            "skt-blocks"
                          )}
                          initialOpen={false}
                          colorSettings={[
                            {
                              value: buttonBackgroundColor,
                              onChange: onChangeButtonColor,
                              label: __(
                                "Button Color",
                                "skt-blocks"
                              ),
                            },
                          ]}
                        ></PanelColorSettings>
                        <PanelColorSettings
                          title={__(
                            "Button Hover Color",
                            "skt-blocks"
                          )}
                          initialOpen={false}
                          colorSettings={[
                            {
                              value: hbuttonBackgroundColor,
                              onChange: onChangeButtonhColor,
                              label: __(
                                "Button Hover Color",
                                "skt-blocks"
                              ),
                            },
                          ]}
                        ></PanelColorSettings>
                      </Fragment>
                    )}
                    {"gradient" == buttonbackgroundType && (
                      <Fragment>
                        <p className="responsive-setting-label">
                          {__("Color 1", "skt-blocks")}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{
                                backgroundColor: buttonbackgroundColor1,
                              }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={buttonbackgroundColor1}
                          onChange={(colorValue) =>
                            setAttributes({
                              buttonbackgroundColor1: colorValue,
                            })
                          }
                          allowReset
                        />

                        <p className="responsive-setting-label">
                          {__("Color 2", "skt-blocks")}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{
                                backgroundColor: buttonbackgroundColor2,
                              }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={buttonbackgroundColor2}
                          onChange={(colorValue) =>
                            setAttributes({
                              buttonbackgroundColor2: colorValue,
                            })
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
                    <PanelColorSettings
                      title={__(
                        "Button Border Color",
                        "skt-blocks"
                      )}
                      initialOpen={false}
                      colorSettings={[
                        {
                          value: buttonborderColor,
                          onChange: onChangeBorderColor,
                          label: __(
                            "Button Border Color",
                            "skt-blocks"
                          ),
                        },
                      ]}
                    ></PanelColorSettings>
                    <PanelColorSettings
                      title={__(
                        "Button Border Hover Color",
                        "skt-blocks"
                      )}
                      initialOpen={false}
                      colorSettings={[
                        {
                          value: buttonborderHColor,
                          onChange: onChangeBorderHoverColor,
                          label: __(
                            "Button Border Hover Color",
                            "skt-blocks"
                          ),
                        },
                      ]}
                    ></PanelColorSettings>
                  </PanelBody>
                </Fragment>
              </PanelBody>
            </Fragment>
          )}
          <PanelColorSettings
            title={__("Button Text Color", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: buttonTextColor,
                onChange: onChangeButtonTextColor,
                label: __(
                  "Button Text Color",
                  "skt-blocks"
                ),
              },
            ]}
          ></PanelColorSettings>
          <PanelColorSettings
            title={__(
              "Button Text Hover Color",
              "skt-blocks"
            )}
            initialOpen={false}
            colorSettings={[
              {
                value: hbuttonTextColor,
                onChange: onChangeButtonTexthColor,
                label: __(
                  "Button Text Hover Color",
                  "skt-blocks"
                ),
              },
            ]}
          ></PanelColorSettings>
        </PanelBody>
        {resctaType === "button" && (
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
              <SelectControl
                label={__("Icon Position")}
                value={iconPosition}
                onChange={(value) => setAttributes({ iconPosition: value })}
                options={[
                  { value: "before", label: __("Before Text") },
                  { value: "after", label: __("After Text") },
                ]}
              />
              <RangeControl
                label={__("Icon Spacing", "skt-blocks")}
                value={iconSpace}
                onChange={(value) =>
                  setAttributes({ iconSpace: value !== undefined ? value : 8 })
                }
                min={-100}
                max={100}
                allowReset
              />
            </Fragment>
          </PanelBody>
        )}
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Spacing", "skt-blocks")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Top Padding", "skt-blocks")}
              value={topPadding}
              onChange={(value) =>
                setAttributes({ topPadding: value !== undefined ? value : 20 })
              }
              min={0}
              max={2000}
              allowReset
            />
            <RangeControl
              label={__("Bottom Padding", "skt-blocks")}
              value={bottomPadding}
              onChange={(value) =>
                setAttributes({
                  bottomPadding: value !== undefined ? value : 20,
                })
              }
              min={0}
              max={2000}
              allowReset
            />
            <RangeControl
              label={__("Left Padding", "skt-blocks")}
              value={leftPadding}
              onChange={(value) =>
                setAttributes({ leftPadding: value !== undefined ? value : 20 })
              }
              min={0}
              max={2000}
              allowReset
            />
            <RangeControl
              label={__("Right Padding", "skt-blocks")}
              value={rightPadding}
              onChange={(value) =>
                setAttributes({
                  rightPadding: value !== undefined ? value : 20,
                })
              }
              min={0}
              max={2000}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Margin", "skt-blocks")}
            initialOpen={false}
          >
            <RangeControl
              label={__(
                "Title Bottom Margin",
                "skt-blocks"
              )}
              value={titleSpace}
              onChange={(value) =>
                setAttributes({ titleSpace: value !== undefined ? value : 25 })
              }
              min={-100}
              max={100}
              allowReset
            />
            <RangeControl
              label={__(
                "Description Bottom Margin",
                "skt-blocks"
              )}
              value={subtitleSpace}
              onChange={(value) =>
                setAttributes({
                  subtitleSpace: value !== undefined ? value : 28,
                })
              }
              min={-100}
              max={100}
              allowReset
            />
            <RangeControl
              label={__(
                "Button Bottom Margin",
                "skt-blocks"
              )}
              value={buttonSpace}
              onChange={(value) =>
                setAttributes({ buttonSpace: value !== undefined ? value : 20 })
              }
              min={-100}
              max={100}
              allowReset
            />
          </PanelBody>
        </PanelBody>
      </InspectorControls>
    );
  }
}
