import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { select } = wp.data;

const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  BaseControl,
  ToggleControl,
  TabPanel,
  Dashicon,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  componentDidMount() {
    // Pushing Style tag for this block css.
    const $style = document.createElement("style");
    $style.setAttribute(
      "id",
      "skt-blocks-style-icon-list-" + this.props.clientId
    );
    document.head.appendChild($style);

    this.changeChildAttr(this.props.attributes.hideLabel);
  }

  changeChildAttr(value) {
    const { setAttributes } = this.props;
    const getChildBlocks = select("core/block-editor").getBlocks(
      this.props.clientId
    );

    getChildBlocks.forEach((iconChild, key) => {
      iconChild.attributes.hideLabel = value;
    });
    setAttributes({ hideLabel: value });
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        align,
        icon_count,
        icons,
        gap,
        inner_gap,
        icon_layout,
        iconPosition,
        size,
        hideLabel,
        borderRadius,
        bgSize,
        border,
        fontSize,
        labelFontFamily,
        labelFontWeight,
        labelFontLineHeight,
        labelFontSize,
        labelFontSizeTablet,
        labelFontSizeMobile,
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

    const labelClass = hideLabel
      ? "skt-blocks-icon-list__no-label"
      : "";

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("General", "skt-blocks")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Layout")}
              value={icon_layout}
              options={[
                {
                  value: "horizontal",
                  label: __("Horizontal", "skt-blocks"),
                },
                {
                  value: "vertical",
                  label: __("Vertical", "skt-blocks"),
                },
              ]}
              onChange={(value) => setAttributes({ icon_layout: value })}
            />

            <ToggleControl
              label={__("Hide Labels", "skt-blocks")}
              checked={hideLabel}
              onChange={(value) => this.changeChildAttr(value)}
            />
            <hr className="skt-blocks-editor__separator" />
            <RangeControl
              label={__("Gap between Items", "skt-blocks")}
              value={gap}
              onChange={(value) => setAttributes({ gap: value })}
              help={__(
                "Note: For better editing experience, the gap between items might look larger than applied.  Viewing in frontend will show the actual results."
              )}
              min={0}
              max={100}
            />
            {!hideLabel && (
              <Fragment>
                <SelectControl
                  label={__("Font Family", "skt-blocks")}
                  options={fontOptions}
                  value={labelFontFamily}
                  onChange={(value) => {
                    setAttributes({
                      labelFontFamily: value,
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
                              "Labels Font Size Mobile",
                              "skt-blocks"
                            )}
                            min={0}
                            max={500}
                            value={labelFontSizeMobile}
                            onChange={(value) =>
                              setAttributes({
                                labelFontSizeMobile: value,
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
                              "Labels Font Size Tablet",
                              "skt-blocks"
                            )}
                            min={0}
                            max={500}
                            value={labelFontSizeTablet}
                            onChange={(value) =>
                              setAttributes({
                                labelFontSizeTablet: value,
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
                              "Labels Font Size",
                              "skt-blocks"
                            )}
                            min={0}
                            max={500}
                            value={labelFontSize}
                            onChange={(value) =>
                              setAttributes({
                                labelFontSize: value,
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
                  label={__(
                    "Labels Font Weight",
                    "skt-blocks"
                  )}
                  options={fontWeightOptions}
                  value={labelFontWeight}
                  onChange={(value) =>
                    this.props.setAttributes({
                      labelFontWeight: value,
                    })
                  }
                />

                <RangeControl
                label={__("Labels Line Height", "skt-blocks")}
                value={labelFontLineHeight}
                onChange={(value) =>
                  this.props.setAttributes({
                    labelFontLineHeight: value !== undefined ? value : 1,
                  })
                }
                min={0}
                max={100}
                step={1}
                allowReset
                />
              </Fragment>
            )}
            {!hideLabel && (
              <RangeControl
                label={__("Gap between Icon and Label")}
                value={inner_gap}
                onChange={(value) => setAttributes({ inner_gap: value })}
                min={0}
                max={100}
              />
            )}
            <hr className="skt-blocks-editor__separator" />
            <SelectControl
              label={__("Icon Alignment")}
              value={iconPosition}
              options={[
                { value: "top", label: __("Top") },
                { value: "middle", label: __("Middle") },
              ]}
              onChange={(value) => setAttributes({ iconPosition: value })}
            />
            <hr className="skt-blocks-editor__separator" />
            <RangeControl
              label={__("Icon Size", "skt-blocks")}
              value={size}
              onChange={(value) =>
                setAttributes({ size: value !== undefined ? value : 16 })
              }
              min={0}
              max={500}
              allowReset
            />
            <hr className="skt-blocks-editor__separator" />
            <RangeControl
              label={__("Background Size", "skt-blocks")}
              value={bgSize}
              onChange={(value) => setAttributes({ bgSize: value })}
              help={__(
                "Note: Background Size option is useful when one adds background color to the icons."
              )}
              min={0}
              max={500}
            />
            <RangeControl
              label={__("Border", "skt-blocks")}
              value={border}
              onChange={(value) => setAttributes({ border: value })}
              help={__(
                "Note: Border option is useful when one adds border color to the icons."
              )}
              min={0}
              max={10}
            />
            <RangeControl
              label={__("Border Radius", "skt-blocks")}
              value={borderRadius}
              onChange={(value) => setAttributes({ borderRadius: value })}
              help={__(
                "Note: Border Radius option is useful when one adds background color to the icons."
              )}
              min={0}
              max={500}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  }
}
