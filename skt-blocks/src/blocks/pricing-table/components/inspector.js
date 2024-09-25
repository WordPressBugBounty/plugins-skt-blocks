/**
 * Inspector Controls
 */

import times from "lodash/times";
import BoxShadowControl from "../../../utils/components/box-shadow";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  ColorPalette,
  MediaUpload,
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

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.onRemoveBlockImage = this.onRemoveBlockImage.bind(this);
    this.onSelectBlockImage = this.onSelectBlockImage.bind(this);
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
    const { backgroundImage } = this.props.attributes;

    if (!media || !media.url) {
      setAttributes({ backgroundImage: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ backgroundImage: media.url });
  }
  /*
   * Event to set Image as null while removing.
   */
  onRemoveBlockImage() {
    const { setAttributes } = this.props;

    setAttributes({ blockbackgroundImage: null });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectBlockImage(media) {
    const { setAttributes } = this.props;
    const { blockbackgroundImage } = this.props.attributes;

    if (!media || !media.url) {
      setAttributes({ blockbackgroundImage: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ blockbackgroundImage: media.url });
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        count,
        gutter,
        pricingTable,
        textColor,
        titleColor,
        prefixColor,
        priceColor,
        suffixColor,
        subpriceColor,
        featuresColor,
        itemBackgroundColor,
        buttonTarget,
        blockBorderStyle,
        blockBorderWidth,
        blockBorderRadius,
        blockBorderColor,
        sectionTag,
        backgroundColor,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        backgroundType,
        backgroundImage,
        opacity,
        blockbackgroundColor,
        blockbackgroundColor1,
        blockbackgroundColor2,
        blockcolorLocation1,
        blockcolorLocation2,
        blockgradientDirection,
        blockbackgroundType,
        blockbackgroundImage,
        blockopacity,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        buttonBoxShadowColor,
        buttonBoxShadowHOffset,
        buttonBoxShadowVOffset,
        buttonBoxShadowBlur,
        buttonBoxShadowSpread,
        buttonBoxShadowPosition,
        ctaColor,
        ctaBackColor,
        ctaHoverColor,
        ctaHoverBackColor,
        ctaBorderColor,
        ctaBorderRadius,
        ctaBorderWidth,
        ctaBorderStyle,
        ctaHpadding,
        ctaVpadding,
        buttonbackgroundType,
        buttongradientDirection,
        buttoncolorLocation1,
        buttoncolorLocation2,
        buttonbackgroundColor1,
        buttonbackgroundColor2,
        buttonHbackgroundType,
        buttonHgradientDirection,
        buttonHcolorLocation1,
        buttonHcolorLocation2,
        buttonHbackgroundColor1,
        buttonHbackgroundColor2,

        titleFontFamily,
        titleFontSize,
        titleFontWeight,
        titleLineHeight,
        amountFontFamily,
        amountFontSize,
        amountFontWeight,
        amountLineHeight,
        prefixFontFamily,
        prefixFontSize,
        prefixFontWeight,
        prefixLineHeight,
        suffixFontFamily,
        suffixFontSize,
        suffixFontWeight,
        suffixLineHeight,
        subpriceFontFamily,
        subpriceFontSize,
        subpriceFontWeight,
        subpriceLineHeight,
        subpriceTextTransform,
        featuresFontFamily,
        featuresFontSize,
        featuresFontWeight,
        featuresLineHeight,
        ctaFontFamily,
        ctaFontSize,
        ctaFontWeight,
        ctaLineHeight,
        blockTopPadding,
        blockBottomPadding,
        blockLeftPadding,
        blockRightPadding,
        columnTopPadding,
        columnBottomPadding,
        columnLeftPadding,
        columnRightPadding,
        blockBackColorOpacity,
        columnBackColorOpacity,
        showImage,
        showTitle,
        showPrefix,
        showPrice,
        showSuffix,
        showSubprice,
        showFeatures,
        showButton,
        titleSpace,
        priceSpace,
        subpriceSpace,
        buttonSpace,
        featuresSpace,
        blockAlign,
        imageSize,
        imageShape,
        imageWidth,
      },
      setAttributes,
    } = this.props;

    // Cite Alignment Options
    const citeAlignOptions = [
      {
        value: "left",
        label: __("Left", "skt-blocks"),
      },
      {
        value: "center",
        label: __("Center", "skt-blocks"),
      },
      {
        value: "right",
        label: __("Right", "skt-blocks"),
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

    const textTransformOptions = [
      {
        value: "uppercase",
        label: __("Uppercase", "skt-blocks"),
      },
      {
        value: "lowercase",
        label: __("Lowercase", "skt-blocks"),
      },
      {
        value: "capitalize",
        label: __("Capitalize", "skt-blocks"),
      },
    ];
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

    // Button Background Type Options
    const buttonbackgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
    ];

    const gutterOptions = [
      {
        value: "no",
        label: __("None", "skt-blocks"),
        shortName: __("None", "skt-blocks"),
      },
      {
        value: "small",
        /* translators: abbreviation for small size */
        label: __("S", "skt-blocks"),
        tooltip: __("Small", "skt-blocks"),
      },
      {
        value: "medium",
        /* translators: abbreviation for medium size */
        label: __("M", "skt-blocks"),
        tooltip: __("Medium", "skt-blocks"),
      },
      {
        value: "large",
        /* translators: abbreviation for large size */
        label: __("L", "skt-blocks"),
        tooltip: __("Large", "skt-blocks"),
      },
      {
        value: "huge",
        /* translators: abbreviation for largest size */
        label: __("XL", "skt-blocks"),
        tooltip: __("Huge", "skt-blocks"),
      },
    ];

    const imageShapeOptions = [
      {
        value: "default",
        label: __("Default", "skt-blocks"),
        shortName: __("Default", "skt-blocks"),
      },
      {
        value: "circle",
        label: __("Circle", "skt-blocks"),
        shortName: __("Circle", "skt-blocks"),
      },
      {
        value: "square",
        label: __("Square", "skt-blocks"),
        shortName: __("Square", "skt-blocks"),
      },
      {
        value: "blob",
        label: __("Blob", "skt-blocks"),
        shortName: __("Blob", "skt-blocks"),
      },
    ];

    // Update color value
    const onChangeTextColor = (value) => setAttributes({ textColor: value });
    const onChangeBackgroundColor = (value) =>
      setAttributes({ itemBackgroundColor: value });

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__(
              "Number of Pricing Tables",
              "skt-blocks"
            )}
            value={count}
            onChange={(newCount) => {
              let cloneTest_block = [...pricingTable];
              if (cloneTest_block.length < newCount) {
                const incAmount = Math.abs(newCount - cloneTest_block.length);

                {
                  times(incAmount, (n) => {
                    cloneTest_block.push({
                      title: "Plan " + newCount,
                      amount: "99",
                      currency: "$",
                      price_suffix: ".00",
                      sub_price: "SUB PRICE",
                      features: "",
                      button: "Button" + newCount,
                      buttonURL: "",
                    });
                  });
                }
                setAttributes({ pricingTable: cloneTest_block });
              } else {
                const incAmount = Math.abs(newCount - cloneTest_block.length);
                let data_new = cloneTest_block;
                for (var i = 0; i < incAmount; i++) {
                  data_new.pop();
                }
                setAttributes({ pricingTable: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={4}
            step={1}
          />
          {count > 1 && (
            <SelectControl
              label={__("Gutter", "skt-blocks")}
              value={gutter}
              options={gutterOptions}
              onChange={(newGutter) => setAttributes({ gutter: newGutter })}
            />
          )}
          <SelectControl
            label={__("Alignment", "skt-blocks")}
            options={citeAlignOptions}
            value={blockAlign}
            onChange={(value) =>
              this.props.setAttributes({
                blockAlign: value,
              })
            }
          />
          <Fragment>
            <ToggleControl
              label={__("Image", "skt-blocks")}
              checked={showImage}
              onChange={() =>
                this.props.setAttributes({
                  showImage: !showImage,
                })
              }
            />
            <ToggleControl
              label={__("Title", "skt-blocks")}
              checked={showTitle}
              onChange={() =>
                this.props.setAttributes({
                  showTitle: !showTitle,
                })
              }
            />
            <ToggleControl
              label={__("Price Prefix", "skt-blocks")}
              checked={showPrefix}
              onChange={() =>
                this.props.setAttributes({
                  showPrefix: !showPrefix,
                })
              }
            />
            <ToggleControl
              label={__("Price", "skt-blocks")}
              checked={showPrice}
              onChange={() =>
                this.props.setAttributes({
                  showPrice: !showPrice,
                })
              }
            />
            <ToggleControl
              label={__("Price Suffix", "skt-blocks")}
              checked={showSuffix}
              onChange={() =>
                this.props.setAttributes({
                  showSuffix: !showSuffix,
                })
              }
            />
            <ToggleControl
              label={__("Sub Price", "skt-blocks")}
              checked={showSubprice}
              onChange={() =>
                this.props.setAttributes({
                  showSubprice: !showSubprice,
                })
              }
            />
            <ToggleControl
              label={__("Features", "skt-blocks")}
              checked={showFeatures}
              onChange={() =>
                this.props.setAttributes({
                  showFeatures: !showFeatures,
                })
              }
            />
            <ToggleControl
              label={__("Button", "skt-blocks")}
              checked={showButton}
              onChange={() =>
                this.props.setAttributes({
                  showButton: !showButton,
                })
              }
            />
          </Fragment>
        </PanelBody>
        <PanelBody
          title={__("Image Settings", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Image Shape", "skt-blocks")}
            value={imageShape}
            options={imageShapeOptions}
            onChange={(newImageShape) =>
              setAttributes({ imageShape: newImageShape })
            }
          />
          <SelectControl
            label={__("Image Size", "skt-blocks")}
            value={imageSize}
            onChange={(value) => setAttributes({ imageSize: value })}
            options={[
              { value: "full", label: __("Full Size") },
              { value: "thumbnail", label: __("Thumbnail") },
              { value: "medium", label: __("Medium") },
              { value: "large", label: __("Large") },
            ]}
          />
          <RangeControl
            label={__("Image Width")}
            value={imageWidth}
            onChange={(value) => setAttributes({ imageWidth: value })}
            min={0}
            max={500}
          />
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
          <RangeControl
            label={__("Horizontal Padding")}
            value={ctaHpadding}
            onChange={(value) => setAttributes({ ctaHpadding: value })}
            min={0}
            max={100}
          />
          <RangeControl
            label={__("Vertical Padding")}
            value={ctaVpadding}
            onChange={(value) => setAttributes({ ctaVpadding: value })}
            min={0}
            max={100}
          />
          <PanelBody
            title={__("Border Settings", "skt-blocks")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Border Style", "skt-blocks")}
              value={ctaBorderStyle}
              onChange={(value) => setAttributes({ ctaBorderStyle: value })}
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
            {"none" != ctaBorderStyle && (
              <Fragment>
                <RangeControl
                  label={__("Border Width", "skt-blocks")}
                  value={ctaBorderWidth}
                  onChange={(value) =>
                    setAttributes({
                      ctaBorderWidth: value !== undefined ? value : 2,
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
                        style={{ backgroundColor: ctaBorderColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={ctaBorderColor}
                    onChange={(colorValue) =>
                      setAttributes({
                        ctaBorderColor:
                          colorValue !== undefined ? colorValue : "#000",
                      })
                    }
                    allowReset
                  />
                </Fragment>

                <RangeControl
                  label={__("Border Radius", "skt-blocks")}
                  value={ctaBorderRadius}
                  onChange={(value) =>
                    setAttributes({
                      ctaBorderRadius: value !== undefined ? value : "",
                    })
                  }
                  min={0}
                  max={100}
                  allowReset
                />
              </Fragment>
            )}
          </PanelBody>
          <TabPanel
            className="rbea-inspect-tabs rbea-inspect-tabs-col-2"
            activeClass="active-tab"
            tabs={[
              {
                name: "normal",
                title: __("Normal"),
                className: "rbea-normal-tab",
              },
              {
                name: "hover",
                title: __("Hover"),
                className: "rbea-focus-tab",
              },
            ]}
          >
            {(tabName) => {
              let tabout;
              if ("hover" === tabName.name) {
                tabout = (
                  <Fragment>
                    <Fragment>
                      <p className="responsive-setting-label">
                        {__("Text Color")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{
                              backgroundColor: ctaHoverColor,
                            }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={ctaHoverColor}
                        onChange={(value) =>
                          this.props.setAttributes({
                            ctaHoverColor: value,
                          })
                        }
                        allowReset
                      />
                    </Fragment>
                    <SelectControl
                      label={__(
                        "Background Type",
                        "skt-blocks"
                      )}
                      value={buttonHbackgroundType}
                      onChange={(value) =>
                        setAttributes({ buttonHbackgroundType: value })
                      }
                      options={buttonbackgroundTypeOptions}
                    />
                    {"color" == buttonHbackgroundType && (
                      <Fragment>
                        <p className="responsive-setting-label">
                          {__("Hover Background Color")}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{
                                backgroundColor: ctaHoverBackColor,
                              }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={ctaHoverBackColor}
                          onChange={(value) =>
                            this.props.setAttributes({
                              ctaHoverBackColor: value,
                            })
                          }
                          allowReset
                        />
                      </Fragment>
                    )}
                    {"gradient" == buttonHbackgroundType && (
                      <Fragment>
                        <p className="responsive-setting-label">
                          {__("Color 1", "skt-blocks")}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{
                                backgroundColor: buttonHbackgroundColor1,
                              }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={buttonHbackgroundColor1}
                          onChange={(colorValue) =>
                            setAttributes({
                              buttonHbackgroundColor1: colorValue,
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
                                backgroundColor: buttonHbackgroundColor2,
                              }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={buttonHbackgroundColor2}
                          onChange={(colorValue) =>
                            setAttributes({
                              buttonHbackgroundColor2: colorValue,
                            })
                          }
                          allowReset
                        />
                        <RangeControl
                          label={__(
                            "Color Location 1",
                            "skt-blocks"
                          )}
                          value={buttonHcolorLocation1}
                          min={0}
                          max={100}
                          onChange={(value) =>
                            setAttributes({ buttonHcolorLocation1: value })
                          }
                        />
                        <RangeControl
                          label={__(
                            "Color Location 2",
                            "skt-blocks"
                          )}
                          value={buttonHcolorLocation2}
                          min={0}
                          max={100}
                          onChange={(value) =>
                            setAttributes({ buttonHcolorLocation2: value })
                          }
                        />
                        <RangeControl
                          label={__(
                            "Gradient Direction",
                            "skt-blocks"
                          )}
                          value={buttonHgradientDirection}
                          min={0}
                          max={100}
                          onChange={(value) =>
                            setAttributes({ buttonHgradientDirection: value })
                          }
                        />
                      </Fragment>
                    )}
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <p className="responsive-setting-label">
                      {__("Text Color")}
                      <span className="components-base-control__label">
                        <span
                          className="component-color-indicator"
                          style={{
                            backgroundColor: ctaColor,
                          }}
                        ></span>
                      </span>
                    </p>
                    <ColorPalette
                      value={ctaColor}
                      onChange={(value) =>
                        this.props.setAttributes({
                          ctaColor: value,
                        })
                      }
                      allowReset
                    />

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
                        <p className="responsive-setting-label">
                          {__("Background Color")}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{
                                backgroundColor: ctaBackColor,
                              }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={ctaBackColor}
                          onChange={(value) =>
                            this.props.setAttributes({
                              ctaBackColor: value,
                            })
                          }
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
                  </Fragment>
                );
              }
              return <div>{tabout}</div>;
            }}
          </TabPanel>
        </PanelBody>
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
                    style={{ backgroundColor: backgroundColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={backgroundColor}
                onChange={(colorValue) =>
                  setAttributes({ backgroundColor: colorValue })
                }
                allowReset
              />
              <RangeControl
                label={__("Opacity", "skt-blocks")}
                value={columnBackColorOpacity}
                onChange={(value) =>
                  setAttributes({
                    columnBackColorOpacity: value !== undefined ? value : 100,
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
                max={360}
                onChange={(value) =>
                  setAttributes({
                    gradientDirection: value !== undefined ? value : 90,
                  })
                }
              />
              <RangeControl
                label={__("Opacity", "skt-blocks")}
                value={columnBackColorOpacity}
                onChange={(value) =>
                  setAttributes({
                    columnBackColorOpacity: value !== undefined ? value : 100,
                  })
                }
                min={0}
                max={100}
                allowReset
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
                value={opacity}
                onChange={(value) =>
                  setAttributes({ opacity: value !== undefined ? value : 20 })
                }
                min={0}
                max={100}
                allowReset
              />
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
              value={titleFontFamily}
              onChange={(value) => {
                setAttributes({
                  titleFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={titleFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  titleFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={titleFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={titleLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__(
              "Price Prefix Typography",
              "skt-blocks"
            )}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={prefixFontFamily}
              onChange={(value) => {
                setAttributes({
                  prefixFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={prefixFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  prefixFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={prefixFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  prefixFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={prefixLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  prefixLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Price Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={amountFontFamily}
              onChange={(value) => {
                setAttributes({
                  amountFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={amountFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  amountFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={amountFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  amountFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={amountLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  amountLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__(
              "Price Suffix Typography",
              "skt-blocks"
            )}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={suffixFontFamily}
              onChange={(value) => {
                setAttributes({
                  suffixFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={suffixFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  suffixFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={suffixFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  suffixFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={suffixLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  suffixLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Sub Price Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={subpriceFontFamily}
              onChange={(value) => {
                setAttributes({
                  subpriceFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={subpriceFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  subpriceFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={subpriceFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  subpriceFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={subpriceLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  subpriceLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={subpriceTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  subpriceTextTransform: value,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Features Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={featuresFontFamily}
              onChange={(value) => {
                setAttributes({
                  featuresFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={featuresFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  featuresFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={featuresFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  featuresFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={featuresLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  featuresLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("CTA Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={ctaFontFamily}
              onChange={(value) => {
                setAttributes({
                  ctaFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={ctaFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={ctaFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={ctaLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaLineHeight: value !== undefined ? value : 1,
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
          title={__("Border", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style", "skt-blocks")}
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
          {"none" != blockBorderStyle && (
            <Fragment>
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

              <RangeControl
                label={__("Border Radius", "skt-blocks")}
                value={blockBorderRadius}
                onChange={(value) =>
                  setAttributes({
                    blockBorderRadius: value !== undefined ? value : 0,
                  })
                }
                min={0}
                max={1000}
                allowReset
              />
            </Fragment>
          )}
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
            label={__("Box Shadow")}
            boxShadowColor={{ value: boxShadowColor, label: __("Color") }}
            boxShadowHOffset={{
              value: boxShadowHOffset,
              label: __("Horizontal"),
            }}
            boxShadowVOffset={{
              value: boxShadowVOffset,
              label: __("Vertical"),
            }}
            boxShadowBlur={{ value: boxShadowBlur, label: __("Blur") }}
            boxShadowSpread={{ value: boxShadowSpread, label: __("Spread") }}
            boxShadowPosition={{
              value: boxShadowPosition,
              label: __("Position"),
            }}
          />
        </PanelBody>
        <PanelColorSettings
          title={__("Color Settings", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: textColor,
              onChange: (colorValue) =>
                setAttributes({ textColor: colorValue }),
              label: __("Text Color", "skt-blocks"),
            },
            {
              value: titleColor,
              onChange: (colorValue) =>
                setAttributes({ titleColor: colorValue }),
              label: __("Title Color", "skt-blocks"),
            },
            {
              value: prefixColor,
              onChange: (colorValue) =>
                setAttributes({ prefixColor: colorValue }),
              label: __("Price Prefix Color", "skt-blocks"),
            },
            {
              value: priceColor,
              onChange: (colorValue) =>
                setAttributes({ priceColor: colorValue }),
              label: __("Price Color", "skt-blocks"),
            },
            {
              value: suffixColor,
              onChange: (colorValue) =>
                setAttributes({ suffixColor: colorValue }),
              label: __("Price Suffix Color", "skt-blocks"),
            },
            {
              value: subpriceColor,
              onChange: (colorValue) =>
                setAttributes({ subpriceColor: colorValue }),
              label: __("Sub Price Color", "skt-blocks"),
            },
            {
              value: featuresColor,
              onChange: (colorValue) =>
                setAttributes({ featuresColor: colorValue }),
              label: __("Features Color", "skt-blocks"),
            },
          ]}
        ></PanelColorSettings>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Block Spacing", "skt-blocks")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Top Padding", "skt-blocks")}
              value={blockTopPadding}
              onChange={(value) =>
                setAttributes({
                  blockTopPadding: value !== undefined ? value : 0,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Bottom Padding", "skt-blocks")}
              value={blockBottomPadding}
              onChange={(value) =>
                setAttributes({
                  blockBottomPadding: value !== undefined ? value : 0,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Left Padding", "skt-blocks")}
              value={blockLeftPadding}
              onChange={(value) =>
                setAttributes({
                  blockLeftPadding: value !== undefined ? value : 0,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Right Padding", "skt-blocks")}
              value={blockRightPadding}
              onChange={(value) =>
                setAttributes({
                  blockRightPadding: value !== undefined ? value : 0,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Column Spacing", "skt-blocks")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Top Padding", "skt-blocks")}
              value={columnTopPadding}
              onChange={(value) =>
                setAttributes({
                  columnTopPadding: value !== undefined ? value : 64,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Bottom Padding", "skt-blocks")}
              value={columnBottomPadding}
              onChange={(value) =>
                setAttributes({
                  columnBottomPadding: value !== undefined ? value : 64,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Left Padding", "skt-blocks")}
              value={columnLeftPadding}
              onChange={(value) =>
                setAttributes({
                  columnLeftPadding: value !== undefined ? value : 24,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Right Padding", "skt-blocks")}
              value={columnRightPadding}
              onChange={(value) =>
                setAttributes({
                  columnRightPadding: value !== undefined ? value : 24,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </PanelBody>
          <RangeControl
            label={__("Title")}
            value={titleSpace}
            onChange={(value) => setAttributes({ titleSpace: value })}
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Price")}
            value={priceSpace}
            onChange={(value) => setAttributes({ priceSpace: value })}
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Sub Price")}
            value={subpriceSpace}
            onChange={(value) => setAttributes({ subpriceSpace: value })}
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Button")}
            value={buttonSpace}
            onChange={(value) => setAttributes({ buttonSpace: value })}
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Features")}
            value={featuresSpace}
            onChange={(value) => setAttributes({ featuresSpace: value })}
            min={0}
            max={50}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
