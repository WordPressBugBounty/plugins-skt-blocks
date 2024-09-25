import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.editor;

// Import Inspector components
const { PanelBody, RangeControl, SelectControl, ToggleControl } = wp.components;

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
        showTitle,
        linkSpace,
        textSpace,
        titleSpace,
        titleFontFamily,
        titleFontSize,
        titleFontWeight,
        titleLineHeight,
        textFontFamily,
        textFontSize,
        textFontWeight,
        textLineHeight,
        linkFontFamily,
        linkFontSize,
        linkFontWeight,
        linkLineHeight,
        textColor,
        linkColor,
        titleColor,
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
    const onChangeTextColor = (value) => setAttributes({ textColor: value });
    const onChangeLinkColor = (value) => setAttributes({ linkColor: value });
    const onChangeTitleColor = (value) => setAttributes({ titleColor: value });

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Title", "skt-blocks")}
            checked={showTitle}
            onChange={() =>
              this.props.setAttributes({
                showTitle: !showTitle,
              })
            }
          />
        </PanelBody>
        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
          {showTitle && (
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
                    titleFontSize: value,
                  })
                }
                min={0}
                max={100}
                step={1}
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
                    titleLineHeight: value,
                  })
                }
                min={0}
                max={100}
                step={0.01}
              />
            </PanelBody>
          )}
          <PanelBody
            title={__("Text Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={textFontFamily}
              onChange={(value) => {
                setAttributes({
                  textFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={textFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  textFontSize: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={textFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  textFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={textLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  textLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={0.01}
            />
          </PanelBody>
          <PanelBody
            title={__("Link Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={linkFontFamily}
              onChange={(value) => {
                setAttributes({
                  linkFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={linkFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  linkFontSize: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={linkFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  linkFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={linkLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  linkLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={0.01}
            />
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__(
              "Title - Margin Bottom",
              "skt-blocks"
            )}
            value={titleSpace}
            onChange={(value) =>
              setAttributes({ titleSpace: value !== undefined ? value : 28 })
            }
            min={-100}
            max={100}
            allowReset
          />
          <RangeControl
            label={__("Text - Margin Bottom", "skt-blocks")}
            value={textSpace}
            onChange={(value) =>
              setAttributes({ textSpace: value !== undefined ? value : 20 })
            }
            min={-100}
            max={100}
            allowReset
          />
          <RangeControl
            label={__("Link - Margin Botton", "skt-blocks")}
            value={linkSpace}
            onChange={(value) =>
              setAttributes({ linkSpace: value !== undefined ? value : 18 })
            }
            min={-100}
            max={100}
            allowReset
          />
        </PanelBody>
        <PanelColorSettings
          title={__("Color Setting", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: textColor,
              onChange: onChangeTextColor,
              label: __("Text Color", "skt-blocks"),
            },
            {
              value: linkColor,
              onChange: onChangeLinkColor,
              label: __("Link Color", "skt-blocks"),
            },
            {
              value: titleColor,
              onChange: onChangeTitleColor,
              label: __("Title Color", "skt-blocks"),
            },
          ]}
        ></PanelColorSettings>
      </InspectorControls>
    );
  }
}
