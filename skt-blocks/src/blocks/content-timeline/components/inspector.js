/**
 * Inspector Controls
 */

import times from "lodash/times";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import icons from "./../../../utils/components/icons";
import renderSVG from "../../../renderIcon";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { dateI18n, __experimentalGetSettings } = wp.date;

// Import block components
const { InspectorControls, PanelColorSettings, ColorPalette } = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
  TextControl,
  TabPanel,
  Icon,
} = wp.components;
let svg_icons = Object.keys(ResponsiveBlocksIcon);
/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.getIfbIcon = this.getIfbIcon.bind(this);
  }
  getIfbIcon(value) {
    this.props.setAttributes({ icon: value });
  }

  saveDate(value, index) {
    const { attributes, setAttributes } = this.props;
    const { t_date } = attributes;

    const newItems = t_date.map((item, thisIndex) => {
      if (index === thisIndex) {
        item = { ...item, ...value };
      }

      return item;
    });

    setAttributes({
      t_date: newItems,
    });
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        count,
        displayPostDate,
        timelineItems,
        t_date,
        timelinAlignment,
        dateFormat,
        dateBottomspace,
        dateColor,
        backgroundColor,
        headingColor,
        contentColor,
        dateFontFamily,
        headingFontFamily,
        contentFontFamily,
        dateLineHeight,
        dateFontWeight,
        dateFontSize,
        headingLineHeight,
        headingFontWeight,
        headingFontSize,
        contentLineHeight,
        contentFontWeight,
        contentFontSize,
        headingTag,
        itemBorderRadius,
        itemPadding,
        horizontalSpace,
        verticalSpace,
        itemBorderWidth,
        itemBorderStyle,
        itemBorderColor,
        opacity,
        separatorColor,
        iconColor,
        separatorBg,
        separatorBorder,
        separatorFillColor,
        iconFocus,
        iconBgFocus,
        borderFocus,
        iconSize,
        connectorBgsize,
        borderwidth,
        separatorwidth,
        icon,
        headingBottomMargin,
        stack,
        arrowlinAlignment,
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
    // Heading Tag Options
    const headingTagOptions = [
      {
        value: "h1",
        label: __("h1", "skt-blocks"),
      },
      {
        value: "h2",
        label: __("h2", "skt-blocks"),
      },
      {
        value: "h3",
        label: __("h3", "skt-blocks"),
      },
      {
        value: "h4",
        label: __("h4", "skt-blocks"),
      },
      {
        value: "h5",
        label: __("h5", "skt-blocks"),
      },
      {
        value: "h6",
        label: __("h6", "skt-blocks"),
      },
      {
        value: "p",
        label: __("p", "skt-blocks"),
      },
      {
        value: "span",
        label: __("span", "skt-blocks"),
      },
    ];

    var today = new Date();

    // Update color value
    const onChangeDateColor = (value) => setAttributes({ dateColor: value });
    const onChangeBackgroundColor = (value) =>
      setAttributes({ backgroundColor: value });
    const onChangeHeadingColor = (value) =>
      setAttributes({ headingColor: value });
    const onChangeContentColor = (value) =>
      setAttributes({ contentColor: value });

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

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Number of Items", "skt-blocks")}
            value={count}
            onChange={(newCount) => {
              let cloneContent = [...timelineItems];
              let cloneDate = [...t_date];

              if (cloneContent.length < newCount) {
                const incAmount = Math.abs(newCount - cloneContent.length);

                // Save date.
                {
                  times(incAmount, (n) => {
                    cloneDate.push({
                      title: cloneDate[0].title,
                    });
                  });
                }

                setAttributes({ t_date: cloneDate });

                //Save content
                {
                  times(incAmount, (n) => {
                    cloneContent.push({
                      time_heading: __("Timeline Heading ") + newCount,
                      time_desc: __(
                        "This is Timeline description, you can change me anytime click here "
                      ),
                    });
                  });
                }
                setAttributes({ timelineItems: cloneContent });
              } else {
                const incAmount = Math.abs(newCount - cloneContent.length);
                let data_new = cloneContent;
                for (var i = 0; i < incAmount; i++) {
                  data_new.pop();
                }
                setAttributes({ timelineItems: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={100}
            step={1}
          />
          <SelectControl
            label={__("Orientation", "skt-blocks")}
            value={timelinAlignment}
            onChange={(value) => setAttributes({ timelinAlignment: value })}
            options={[
              {
                value: "left",
                label: __("Left", "skt-blocks"),
              },
              {
                value: "right",
                label: __("Right", "skt-blocks"),
              },
              {
                value: "center",
                label: __("Center", "skt-blocks"),
              },
            ]}
          />
          <SelectControl
            label={__("Arrow Alignment", "skt-blocks")}
            value={arrowlinAlignment}
            options={[
              {
                value: "top",
                label: __("Top", "skt-blocks"),
              },
              {
                value: "bottom",
                label: __("Bottom", "skt-blocks"),
              },
              {
                value: "center",
                label: __("Center", "skt-blocks"),
              },
            ]}
            onChange={(value) => setAttributes({ arrowlinAlignment: value })}
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
        </PanelBody>

        <PanelBody
          title={__("Timeline Item", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Heading Tag", "skt-blocks")}
            options={headingTagOptions}
            value={headingTag}
            onChange={(value) =>
              this.props.setAttributes({
                headingTag: value,
              })
            }
          />

          <SelectControl
            label={__("Border Style", "skt-blocks")}
            value={itemBorderStyle}
            onChange={(value) => setAttributes({ itemBorderStyle: value })}
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
          {"none" != itemBorderStyle && (
            <Fragment>
              <RangeControl
                label={__("Border Width", "skt-blocks")}
                value={itemBorderWidth}
                onChange={(value) =>
                  this.props.setAttributes({
                    itemBorderWidth: value !== undefined ? value : 1,
                  })
                }
                min={1}
                max={100}
                step={1}
                allowReset
              />
              <RangeControl
                label={__("Border Radius", "skt-blocks")}
                value={itemBorderRadius}
                onChange={(value) =>
                  this.props.setAttributes({
                    itemBorderRadius: value,
                  })
                }
                min={1}
                max={100}
                step={1}
              />
            </Fragment>
          )}
          {"none" != itemBorderStyle && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Border Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: itemBorderColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={itemBorderColor}
                onChange={(colorValue) =>
                  setAttributes({ itemBorderColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}
          <RangeControl
            label={__("Padding", "skt-blocks")}
            value={itemPadding}
            onChange={(value) =>
              this.props.setAttributes({
                itemPadding: value !== undefined ? value : 20,
              })
            }
            min={1}
            max={200}
            step={1}
            allowReset
          />
        </PanelBody>

        <PanelBody
          title={__("Date Settings", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Display Post Date")}
            checked={displayPostDate}
            onChange={() =>
              this.props.setAttributes({
                displayPostDate: !displayPostDate,
              })
            }
          />
          {displayPostDate && (
            <SelectControl
              label={__("Date Format")}
              value={dateFormat}
              onChange={(value) => setAttributes({ dateFormat: value })}
              options={[
                { value: "M j, Y", label: dateI18n("M j, Y", today) },
                { value: "F j, Y", label: dateI18n("F j, Y", today) },
                { value: "m/d/Y", label: dateI18n("m/d/Y", today) },
                { value: "m-d-Y", label: dateI18n("m-d-Y", today) },
                { value: "m.d.Y", label: dateI18n("m.d.Y", today) },
                { value: "d M Y", label: dateI18n("d M Y", today) },
                { value: "d F Y", label: dateI18n("d F Y", today) },
                { value: "d-m-Y", label: dateI18n("d-m-Y", today) },
                { value: "d.m.Y", label: dateI18n("d.m.Y", today) },
                { value: "d/m/Y", label: dateI18n("d/m/Y", today) },
                { value: "Y-m-d", label: dateI18n("Y-m-d", today) },
                { value: "Y.m.d", label: dateI18n("Y.m.d", today) },
                { value: "Y/m/d", label: dateI18n("Y/m/d", today) },
                { value: "M, Y", label: dateI18n("M, Y", today) },
                { value: "M Y", label: dateI18n("M Y", today) },
                { value: "F, Y", label: dateI18n("F, Y", today) },
                { value: "F Y", label: dateI18n("F Y", today) },
                { value: "custom", label: __("Normal Text") },
              ]}
            />
          )}

          {displayPostDate &&
            times(count, (n) => (
              <Fragment key={n}>
                <TextControl
                  label={__("Date") + " " + (n + 1) + " " + __("Settings")}
                  value={t_date[n].title}
                  onChange={(value) => {
                    this.saveDate({ title: value }, n);
                  }}
                />
              </Fragment>
            ))}

          {displayPostDate && timelinAlignment !== "center" && (
            <RangeControl
              label={__("Date Bottom Spacing")}
              value={dateBottomspace}
              onChange={(value) =>
                setAttributes({
                  dateBottomspace: value !== undefined ? value : 5,
                })
              }
              min={0}
              max={50}
              allowReset
            />
          )}
        </PanelBody>
        <PanelBody title={__("Connector")} initialOpen={false}>
          <FontIconPicker {...icon_props} />

          <RangeControl
            label={__("Icon Size")}
            value={iconSize}
            onChange={(value) =>
              setAttributes({ iconSize: value !== undefined ? value : 20 })
            }
            min={0}
            max={30}
            allowReset
          />
          <RangeControl
            label={__("Icon Background Size")}
            value={connectorBgsize}
            onChange={(value) =>
              setAttributes({
                connectorBgsize: value !== undefined ? value : 35,
              })
            }
            min={25}
            max={90}
            allowReset
          />
          <RangeControl
            label={__("Border Width")}
            value={borderwidth}
            onChange={(value) =>
              setAttributes({ borderwidth: value !== undefined ? value : 0 })
            }
            min={1}
            max={10}
            allowReset
          />
          <RangeControl
            label={__("Connector Width")}
            value={separatorwidth}
            onChange={(value) =>
              setAttributes({ separatorwidth: value !== undefined ? value : 3 })
            }
            min={1}
            max={10}
            allowReset
          />
          <PanelBody title={__("Connector Color Settings")} initialOpen={true}>
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
                  name: "focus",
                  title: __("Focus"),
                  className: "rbea-focus-tab",
                },
              ]}
            >
              {(tabName) => {
                let tabout;
                if ("focus" === tabName.name) {
                  tabout = (
                    <PanelColorSettings
                      title={__("Color Settings")}
                      initialOpen={true}
                      colorSettings={[
                        {
                          value: separatorFillColor,
                          onChange: (colorValue) =>
                            setAttributes({ separatorFillColor: colorValue }),
                          label: __("Line Color"),
                        },
                        {
                          value: iconFocus,
                          onChange: (colorValue) =>
                            setAttributes({ iconFocus: colorValue }),
                          label: __("Icon Color"),
                        },
                        {
                          value: iconBgFocus,
                          onChange: (colorValue) =>
                            setAttributes({ iconBgFocus: colorValue }),
                          label: __("Background Color"),
                        },
                        {
                          value: borderFocus,
                          onChange: (colorValue) =>
                            setAttributes({ borderFocus: colorValue }),
                          label: __("Border Color"),
                        },
                      ]}
                    ></PanelColorSettings>
                  );
                } else {
                  tabout = (
                    <PanelColorSettings
                      title={__("Color Settings")}
                      initialOpen={true}
                      colorSettings={[
                        {
                          value: separatorColor,
                          onChange: (colorValue) =>
                            setAttributes({ separatorColor: colorValue }),
                          label: __("Line Color"),
                        },
                        {
                          value: iconColor,
                          onChange: (colorValue) =>
                            setAttributes({ iconColor: colorValue }),
                          label: __("Icon Color"),
                        },
                        {
                          value: separatorBg,
                          onChange: (colorValue) =>
                            setAttributes({ separatorBg: colorValue }),
                          label: __("Background Color"),
                        },
                        {
                          value: separatorBorder,
                          onChange: (colorValue) =>
                            setAttributes({ separatorBorder: colorValue }),
                          label: __("Border Color"),
                        },
                      ]}
                    ></PanelColorSettings>
                  );
                }
                return <div>{tabout}</div>;
              }}
            </TabPanel>
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Horizontal Spacing", "skt-blocks")}
            value={horizontalSpace}
            onChange={(value) =>
              this.props.setAttributes({
                horizontalSpace: value !== undefined ? value : 0,
              })
            }
            min={0}
            max={50}
            step={1}
            allowReset
          />
          <RangeControl
            label={__("Vertical Spacing", "skt-blocks")}
            value={verticalSpace}
            onChange={(value) =>
              this.props.setAttributes({
                verticalSpace: value !== undefined ? value : 15,
              })
            }
            min={0}
            max={50}
            step={1}
            allowReset
          />
          <RangeControl
            label={__(
              "Heading Bottom Margin",
              "skt-blocks"
            )}
            value={headingBottomMargin}
            onChange={(value) =>
              this.props.setAttributes({
                headingBottomMargin: value !== undefined ? value : 15,
              })
            }
            min={0}
            max={50}
            step={1}
            allowReset
          />
        </PanelBody>

        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Date Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={dateFontFamily}
              onChange={(value) => {
                setAttributes({
                  dateFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={dateFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  dateFontSize: value !== undefined ? value : 16,
                })
              }
              min={0}
              max={50}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={dateFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  dateFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={dateLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  dateLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Heading Typography", "skt-blocks")}
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
              min={0}
              max={50}
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
              min={0}
              max={50}
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
        <PanelColorSettings
          title={__("Color Settings", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: backgroundColor,
              onChange: onChangeBackgroundColor,
              label: __("Background Color", "skt-blocks"),
            },
            {
              value: headingColor,
              onChange: onChangeHeadingColor,
              label: __("Heading Color", "skt-blocks"),
            },
            {
              value: contentColor,
              onChange: onChangeContentColor,
              label: __("Content Color", "skt-blocks"),
            },
            {
              value: dateColor,
              onChange: onChangeDateColor,
              label: __("Date Color", "skt-blocks"),
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
      </InspectorControls>
    );
  }
}
