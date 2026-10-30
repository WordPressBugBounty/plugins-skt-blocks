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
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TabPanel,
  ToggleControl,
} from "@wordpress/components";

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
      customColor,
      customBackgroundColor,
      hideDesktop,
      hideTablet,
      hideMobile,
      hideLoggedIn,
      hideLoggedOut,
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
            <TabPanel
              className="skt-shape-divider-device-tabs"
              tabs={[
                { name: "desktop", title: __("Desktop", "skt-blocks") },
                { name: "tablet", title: __("Tablet", "skt-blocks") },
                { name: "mobile", title: __("Mobile", "skt-blocks") },
              ]}
            >
              {(tab) => {
                const s =
                  tab.name === "desktop"
                    ? ""
                    : tab.name === "tablet"
                    ? "Tablet"
                    : "Mobile";
                const shapeVal = attributes["shapeHeight" + s];
                const bgVal = attributes["backgroundHeight" + s];
                return (
                  <Fragment>
                    <RangeControl
                      label={__("Shape height in pixels", "skt-blocks")}
                      value={shapeVal}
                      onChange={(value) =>
                        setAttributes({
                          ["shapeHeight" + s]:
                            value === undefined
                              ? s === ""
                                ? 100
                                : undefined
                              : value,
                        })
                      }
                      min={40}
                      max={1000}
                      step={1}
                      allowReset
                    />
                    <RangeControl
                      label={__("Background height in pixels", "skt-blocks")}
                      value={bgVal}
                      onChange={(value) =>
                        setAttributes({
                          ["backgroundHeight" + s]:
                            value === undefined
                              ? s === ""
                                ? 50
                                : undefined
                              : value,
                        })
                      }
                      min={20}
                      max={1000}
                      step={1}
                      allowReset
                    />
                  </Fragment>
                );
              }}
            </TabPanel>
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
                      value: backgroundColor.color || customBackgroundColor,
                      onChange: (value) =>
                        setAttributes({
                          backgroundColor: undefined,
                          customBackgroundColor: value,
                        }),
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
            <PanelColorSettings
              title={__("Shape Color", "skt-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: color.color || customColor,
                  onChange: (value) =>
                    setAttributes({ color: undefined, customColor: value }),
                  label: __("Shape color", "skt-blocks"),
                },
              ]}
            ></PanelColorSettings>
          </PanelBody>
          <PanelBody
            title={__("Visibility", "skt-blocks")}
            initialOpen={false}
          >
            <ToggleControl
              label={__("Hide on Desktop", "skt-blocks")}
              checked={hideDesktop}
              onChange={(value) => setAttributes({ hideDesktop: value })}
            />
            <ToggleControl
              label={__("Hide on Tablet", "skt-blocks")}
              checked={hideTablet}
              onChange={(value) => setAttributes({ hideTablet: value })}
            />
            <ToggleControl
              label={__("Hide on Mobile", "skt-blocks")}
              checked={hideMobile}
              onChange={(value) => setAttributes({ hideMobile: value })}
            />
            <ToggleControl
              label={__("Hide from Logged-in Users", "skt-blocks")}
              checked={hideLoggedIn}
              onChange={(value) => setAttributes({ hideLoggedIn: value })}
            />
            <ToggleControl
              label={__("Hide from Logged-out Users", "skt-blocks")}
              checked={hideLoggedOut}
              onChange={(value) => setAttributes({ hideLoggedOut: value })}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  }
}

export default compose([applyWithColors])(Inspector);