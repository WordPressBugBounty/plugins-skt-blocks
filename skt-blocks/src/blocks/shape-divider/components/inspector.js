/**
 * Internal dependencies
 */
import applyWithColors from "./colors";
import ResponsiveBaseControl from "../../../utils/components/responsive-base-control";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import {
  InspectorControls,
  PanelColorSettings,
  ColorPalette,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, SelectControl } from "@wordpress/components";

/**
 * Inspector controls
 */
class Inspector extends Component {
  constructor() {
    super(...arguments);

    this.setSizeControl = this.setSizeControl.bind(this);
  }

  setSizeControl(value) {
    this.props.setAttributes({ horizontalFlip: value });
  }

  render() {
    const {
      attributes,
      setAttributes,
      setColor,
      color,
      backgroundColor,
      setBackgroundColor,
    } = this.props;

    const {
      shapeHeight,
      shapeHeightTablet,
      shapeHeightMobile,
      backgroundHeight,
      backgroundHeightMobile,
      backgroundHeightTablet,
      syncHeight,
      backgroundColor1,
      backgroundColor2,
      colorLocation1,
      colorLocation2,
      gradientDirection,
      backgroundType,
    } = attributes;

    // Background Type Options
    const backgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
    ];

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("Divider settings", "skt-blocks")}
          >
            <ResponsiveBaseControl
              {...this.props}
              label={__(
                "Shape height in pixels",
                "skt-blocks"
              )}
              height={shapeHeight}
              heightTablet={shapeHeightTablet}
              heightMobile={shapeHeightMobile}
              onChange={(event) => {
                setAttributes({
                  shapeHeight: parseInt(event.target.value, 10),
                });
              }}
              onChangeTablet={(event) => {
                setAttributes({
                  shapeHeightTablet: parseInt(event.target.value, 10),
                });
              }}
              onChangeMobile={(event) => {
                setAttributes({
                  shapeHeightMobile: parseInt(event.target.value, 10),
                });
              }}
              sync={syncHeight}
              type="shapeHeight"
              min="40"
            />
            <ResponsiveBaseControl
              {...this.props}
              label={__(
                "Background height in pixels",
                "skt-blocks"
              )}
              height={backgroundHeight}
              heightTablet={backgroundHeightTablet}
              heightMobile={backgroundHeightMobile}
              onChange={(event) => {
                setAttributes({
                  backgroundHeight: parseInt(event.target.value, 10),
                });
              }}
              onChangeTablet={(event) => {
                setAttributes({
                  backgroundHeightTablet: parseInt(event.target.value, 10),
                });
              }}
              onChangeMobile={(event) => {
                setAttributes({
                  backgroundHeightMobile: parseInt(event.target.value, 10),
                });
              }}
              sync={syncHeight}
              type="backgroundHeight"
              min="20"
            />
          </PanelBody>
          <PanelBody
            title={__("Background", "skt-blocks")}
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
                <PanelColorSettings
                  title={__(
                    "Background Color",
                    "skt-blocks"
                  )}
                  initialOpen={false}
                  colorSettings={[
                    {
                      value: backgroundColor.color,
                      onChange: setBackgroundColor,
                      label: __(
                        "Background color",
                        "skt-blocks"
                      ),
                    },
                  ]}
                ></PanelColorSettings>
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
                  onChange={(value) => setAttributes({ colorLocation1: value })}
                />
                <RangeControl
                  label={__(
                    "Color Location 2",
                    "skt-blocks"
                  )}
                  value={colorLocation2}
                  min={0}
                  max={100}
                  onChange={(value) => setAttributes({ colorLocation2: value })}
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
          <PanelColorSettings
            title={__("Shape Color", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: color.color,
                onChange: setColor,
                label: __("Shape color", "skt-blocks"),
              },
            ]}
          ></PanelColorSettings>
        </InspectorControls>
      </Fragment>
    );
  }
}

export default compose([applyWithColors])(Inspector);
