/**
 * Inspector Controls
 */
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import ResponsiveBlocksIcon from "../../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../../renderIcon";
import BoxShadowControl from "../../../../utils/components/box-shadow";
import fontOptions from "../../../../utils/googlefonts";
import { loadGoogleFont } from "../../../../utils/font";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  ColorPalette,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  BaseControl,
  TabPanel,
  ToggleControl,
  Dashicon,
  ButtonGroup,
  Button,
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
      attributes: {
        buttonAlignment,
        label,
        link,
        iconsize,
        vPadding,
        vPaddingTablet,
        vPaddingMobile,
        hPadding,
        hPaddingTablet,
        hPaddingMobile,
        vMargin,
        hMargin,
        vMarginTablet,
        hMarginTablet,
        vMarginMobile,
        hMarginMobile,
        borderWidth,
        borderRadius,
        borderStyle,
        borderColor,
        borderHColor,
        color,
        background,
        hColor,
        sizeType,
        sizeMobile,
        sizeTablet,
        lineHeight,
        lineHeightType,
        lineHeightMobile,
        lineHeightTablet,
        target,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        backgroundType,
        opacity,
        icon,
        iconPosition,
        buttonLineHeight,
        buttonFontFamily,
        buttonFontSize,
        buttonFontSizeTablet,
        buttonFontSizeMobile,
        buttonFontWeight,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        hoverEffect,
        icon_color,
        icon_hover_color,
        hbackground,
        iconSpace,
        inheritFromTheme,
      },
      setAttributes,
    } = this.props;

    // Background Type Options
    const backgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
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

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("Button Settings")}
          initialOpen={true}
          className="skt-blocks__url-panel-body"
        >
          <ToggleControl
            label={__("Inherit from Theme")}
            checked={inheritFromTheme}
            onChange={(value) =>
              setAttributes({ inheritFromTheme: !inheritFromTheme })
            }
          />
          <ToggleControl
            label={__("Open link in new tab")}
            checked={target}
            onChange={() => {
              setAttributes({ target: !target });
            }}
          />
          <SelectControl
            label={__("Hover Effect", "skt-blocks")}
            value={hoverEffect}
            onChange={(value) => setAttributes({ hoverEffect: value })}
            options={[
              {
                value: "",
                label: __("None", "skt-blocks"),
              },
              {
                value: "lift",
                label: __("Lift", "skt-blocks"),
              },
              {
                value: "scale",
                label: __("Scale", "skt-blocks"),
              },
              {
                value: "lift-scale",
                label: __("Lift & Scale", "skt-blocks"),
              },
              {
                value: "scale-more",
                label: __("Scale More", "skt-blocks"),
              },
              {
                value: "lift-scale-more",
                label: __(
                  "Lift & Scale More",
                  "skt-blocks"
                ),
              },
            ]}
          />
          {!inheritFromTheme && (
            <Fragment>
              <PanelBody
                title={__("Color Settings", "skt-blocks")}
                initialOpen={false}
              >
                <TabPanel
                  className="skt-blocks-inspect-tabs skt-blocks-inspect-tabs-col-2"
                  activeClass="active-tab"
                  tabs={[
                    {
                      name: "normal",
                      title: __("Normal"),
                      className: "skt-blocks-normal-tab",
                    },
                    {
                      name: "hover",
                      title: __("Hover"),
                      className: "skt-blocks-hover-tab",
                    },
                  ]}
                >
                  {(tabName) => {
                    let btn_color_tab;
                    if ("normal" === tabName.name) {
                      btn_color_tab = (
                        <Fragment>
                          <p className="skt-blocks-setting-label">
                            {__("Text Color", "skt-blocks")}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{ color: color }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={color}
                            onChange={(value) =>
                              setAttributes({ color: value })
                            }
                            allowReset
                          />
                          <p className="skt-blocks-setting-label">
                            {__(
                              "Border Color",
                              "skt-blocks"
                            )}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{ borderColor: borderColor }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={borderColor}
                            onChange={(value) =>
                              setAttributes({ borderColor: value })
                            }
                            allowReset
                          />
                        </Fragment>
                      );
                    } else {
                      btn_color_tab = (
                        <Fragment>
                          <p className="skt-blocks-setting-label">
                            {__(
                              "Text Hover Color",
                              "skt-blocks"
                            )}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{ color: hColor }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={hColor}
                            onChange={(value) =>
                              setAttributes({ hColor: value })
                            }
                            allowReset
                          />
                          <p className="skt-blocks-setting-label">
                            {__(
                              "Border Hover Color",
                              "skt-blocks"
                            )}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{ borderColor: borderHColor }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={borderHColor}
                            onChange={(value) =>
                              setAttributes({ borderHColor: value })
                            }
                            allowReset
                          />
                        </Fragment>
                      );
                    }
                    return <div>{btn_color_tab}</div>;
                  }}
                </TabPanel>
                <RangeControl
                  label={__("Opacity", "skt-blocks")}
                  value={opacity}
                  onChange={(value) => setAttributes({ opacity: value })}
                  min={0}
                  max={100}
                />
              </PanelBody>
              <PanelBody
                title={__("Background", "skt-blocks")}
                initialOpen={false}
              >
                <SelectControl
                  label={__(
                    "Background Type",
                    "skt-blocks"
                  )}
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
                          style={{ backgroundColor: background }}
                        ></span>
                      </span>
                    </p>
                    <ColorPalette
                      value={background}
                      onChange={(colorValue) =>
                        setAttributes({ background: colorValue })
                      }
                      allowReset
                    />
                    <p className="responsive-setting-label">
                      {__(
                        "Background Hover Color",
                        "skt-blocks"
                      )}
                      <span className="components-base-control__label">
                        <span
                          className="component-color-indicator"
                          style={{ backgroundColor: hbackground }}
                        ></span>
                      </span>
                    </p>
                    <ColorPalette
                      value={hbackground}
                      onChange={(colorValue) =>
                        setAttributes({ hbackground: colorValue })
                      }
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
                      label={__(
                        "Color Location 1",
                        "skt-blocks"
                      )}
                      value={colorLocation1}
                      min={0}
                      max={100}
                      onChange={(value) =>
                        setAttributes({ colorLocation1: value })
                      }
                    />
                    <RangeControl
                      label={__(
                        "Color Location 2",
                        "skt-blocks"
                      )}
                      value={colorLocation2}
                      min={0}
                      max={100}
                      onChange={(value) =>
                        setAttributes({ colorLocation2: value })
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
                        setAttributes({ gradientDirection: value })
                      }
                    />
                  </Fragment>
                )}
              </PanelBody>
              <PanelBody
                title={__("Border", "skt-blocks")}
                initialOpen={false}
              >
                <SelectControl
                  label={__("Style", "skt-blocks")}
                  value={borderStyle}
                  options={[
                    { value: "none", label: __("None") },
                    { value: "solid", label: __("Solid") },
                    { value: "dotted", label: __("Dotted") },
                    { value: "dashed", label: __("Dashed") },
                    { value: "double", label: __("Double") },
                  ]}
                  onChange={(value) => {
                    setAttributes({ borderStyle: value });
                  }}
                />
                {borderStyle != "none" && (
                  <RangeControl
                    label={__("Thickness", "skt-blocks")}
                    value={borderWidth}
                    onChange={(value) => {
                      setAttributes({ borderWidth: value });
                    }}
                    min={0}
                    max={20}
                  />
                )}
                <RangeControl
                  label={__(
                    "Rounded Corners",
                    "skt-blocks"
                  )}
                  value={borderRadius}
                  onChange={(value) => {
                    setAttributes({ borderRadius: value });
                  }}
                  min={0}
                  max={50}
                />
              </PanelBody>
            </Fragment>
          )}
        </PanelBody>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
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
                      label={__(
                        "Vertical Padding Mobile",
                        "skt-blocks"
                      )}
                      value={vPaddingMobile}
                      onChange={(value) => {
                        setAttributes({ vPaddingMobile: value });
                      }}
                      min={0}
                      max={100}
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Vertical Padding Tablet",
                        "skt-blocks"
                      )}
                      value={vPaddingTablet}
                      onChange={(value) => {
                        setAttributes({ vPaddingTablet: value });
                      }}
                      min={0}
                      max={100}
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Vertical Padding",
                        "skt-blocks"
                      )}
                      value={vPadding}
                      onChange={(value) => {
                        setAttributes({ vPadding: value });
                      }}
                      min={0}
                      max={100}
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                      label={__(
                        "Horizontal Padding Mobile",
                        "skt-blocks"
                      )}
                      value={hPaddingMobile}
                      onChange={(value) => {
                        setAttributes({ hPaddingMobile: value });
                      }}
                      min={0}
                      max={100}
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Horizontal Padding Tablet",
                        "skt-blocks"
                      )}
                      value={hPaddingTablet}
                      onChange={(value) => {
                        setAttributes({ hPaddingTablet: value });
                      }}
                      min={0}
                      max={100}
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Horizontal Padding",
                        "skt-blocks"
                      )}
                      value={hPadding}
                      onChange={(value) => {
                        setAttributes({ hPadding: value });
                      }}
                      min={0}
                      max={100}
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                      label={__(
                        "Vertical Margin Mobile",
                        "skt-blocks"
                      )}
                      min={0}
                      max={200}
                      value={vMarginMobile}
                      onChange={(value) =>
                        setAttributes({
                          vMarginMobile: value,
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
                        "Vertical Margin Tablet",
                        "skt-blocks"
                      )}
                      min={0}
                      max={200}
                      value={vMarginTablet}
                      onChange={(value) =>
                        setAttributes({
                          vMarginTablet: value,
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
                        "Vertical Margin",
                        "skt-blocks"
                      )}
                      min={0}
                      max={200}
                      value={vMargin}
                      onChange={(value) =>
                        setAttributes({
                          vMargin: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                      label={__(
                        "Horizontal Margin Mobile",
                        "skt-blocks"
                      )}
                      min={0}
                      max={200}
                      value={hMarginMobile}
                      onChange={(value) =>
                        setAttributes({
                          hMarginMobile: value,
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
                        "Horizontal Margin Tablet",
                        "skt-blocks"
                      )}
                      min={0}
                      max={200}
                      value={hMarginTablet}
                      onChange={(value) =>
                        setAttributes({
                          hMarginTablet: value,
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
                        "Horizontal Margin",
                        "skt-blocks"
                      )}
                      min={0}
                      max={200}
                      value={hMargin}
                      onChange={(value) =>
                        setAttributes({
                          hMargin: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
            <RangeControl
              label={__("Icon Size", "skt-blocks")}
              value={iconsize}
              onChange={(value) =>
                setAttributes({ iconsize: value !== undefined ? value : 16 })
              }
              min={5}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Icon Spacing", "skt-blocks")}
              value={iconSpace}
              onChange={(value) =>
                setAttributes({ iconSpace: value !== undefined ? value : 8 })
              }
              min={0}
              max={50}
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
                  style={{ backgroundColor: icon_hover_color }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={icon_hover_color}
              onChange={(value) => setAttributes({ icon_hover_color: value })}
              allowReset
            />
          </Fragment>
        </PanelBody>
        {!inheritFromTheme && (
          <Fragment>
            <PanelBody
              title={__("Button Typography", "skt-blocks")}
              initialOpen={false}
            >
              <SelectControl
                label={__("Font Family", "skt-blocks")}
                options={fontOptions}
                value={buttonFontFamily}
                onChange={(value) => {
                  setAttributes({
                    buttonFontFamily: value,
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
                          max={100}
                          step={1}
                          value={buttonFontSizeMobile}
                          onChange={(value) =>
                            setAttributes({
                              buttonFontSizeMobile: value,
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
                          max={100}
                          step={1}
                          value={buttonFontSizeTablet}
                          onChange={(value) =>
                            setAttributes({
                              buttonFontSizeTablet: value,
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
                          max={100}
                          step={1}
                          value={buttonFontSize}
                          onChange={(value) =>
                            setAttributes({
                              buttonFontSize: value,
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
                value={buttonFontWeight}
                onChange={(value) =>
                  this.props.setAttributes({
                    buttonFontWeight: value,
                  })
                }
              />
              <RangeControl
                label={__("Line Height", "skt-blocks")}
                value={buttonLineHeight}
                onChange={(value) =>
                  this.props.setAttributes({
                    buttonLineHeight: value,
                  })
                }
                min={0}
                max={100}
                step={1}
              />
            </PanelBody>
            <PanelBody
              title={__("Box Shadow", "skt-blocks")}
              initialOpen={false}
            >
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
                boxShadowSpread={{
                  value: boxShadowSpread,
                  label: __("Spread"),
                }}
                boxShadowPosition={{
                  value: boxShadowPosition,
                  label: __("Position"),
                }}
              />
            </PanelBody>
          </Fragment>
        )}
      </InspectorControls>
    );
  }
}
