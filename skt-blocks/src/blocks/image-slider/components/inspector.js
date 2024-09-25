/**
 * Internal dependencies
 */
import SliderPanel from "../../../utils/components/slider-panel";
import ResponsiveTabsControl from "../../../utils/components/responsive-tabs-control";
import SizeControl from "../../../utils/components/size-control";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import {
  InspectorControls,
  InspectorAdvancedControls,
  PanelColorSettings,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  BaseControl,
  SelectControl,
} from "@wordpress/components";

/**
 * Inspector controls
 */
class Inspector extends Component {
  constructor() {
    super(...arguments);
    this.setSizeControl = this.setSizeControl.bind(this);
    this.setRadiusTo = this.setRadiusTo.bind(this);
    this.setHeightTo = this.setHeightTo.bind(this);
    this.state = {
      temporaryInput: null,
    };
  }

  setRadiusTo(value) {
    this.props.setAttributes({ radius: value });
  }

  setSizeControl(value) {
    this.props.setAttributes({ gridSize: value });
  }

  setHeightTo(value) {
    this.props.setAttributes({ height: value });
  }

  setTemporayInput(value) {
    this.setState({ temporaryInput: value });
  }

    getSmallImageNavigationHelp(checked) {
    return checked
      ? __("Turn this OFF if you are using larger images.", "skt-blocks")
      : __("Turn this ON if you are using smaller images.", "skt-blocks");
  }
getThumbnailNavigationHelp(checked) {
    return checked
      ? __("Showing thumbnail navigation.", "skt-blocks")
      : __("Toggle to show thumbnails.", "skt-blocks");
  }

  getResponsiveHeightHelp(checked) {
    return checked
      ? __(
          "Percentage based height is activated.",
          "skt-blocks"
        )
      : __(
          "Toggle for percentage based height.",
          "skt-blocks"
        );
  }

  getLightboxHelp(checked) {
    return checked
      ? __("Image lightbox is enabled.", "skt-blocks")
      : __(
          "Toggle to enable the image lightbox.",
          "skt-blocks"
        );
  }

  render() {
    const { attributes, isSelected, setAttributes } = this.props;

    const {
      align,
      gridSize,
      gutter,
      height,
      radius,
      thumbnails,
        isSmallImage,
      responsiveHeight,
      lightbox,
      borderWidth,
      borderColor,
      borderStyle,
      iconBackgroundColor,
      iconColor,
      iconBackgroundRadius,
      iconBackgroundOpacity,
      width,
      customWidth,
    } = attributes;

    const { temporaryInput } = this.state;

    return (
      isSelected && (
        <Fragment>
          <InspectorControls>
            <PanelBody
              title={__("Image Carousel", "skt-blocks")}
              initialOpen={false}
            >
              <SizeControl
                {...this.props}
                type={"grid"}
                label={__("Size")}
                onChange={this.setSizeControl}
                value={gridSize}
                resetValue={"xlrg"}
              />
              {gridSize !== null && (align === "wide" || align === "full") && (
                <ResponsiveTabsControl
                  {...this.props}
                  label={__("Gutter", "skt-blocks")}
                  max={20}
                />
              )}
              {gridSize !== "xlrg" && !align && (
                <ResponsiveTabsControl
                  {...this.props}
                  label={__("Gutter", "skt-blocks")}
                  max={50}
                />
              )}
              {gutter > 0 && (
                <RangeControl
                  label={__("Radius", "skt-blocks")}
                  value={radius}
                  onChange={this.setRadiusTo}
                  min={0}
                  max={50}
                  step={1}
                />
              )}
              <ToggleControl
                label={__("Custom Width", "skt-blocks")}
                checked={!!customWidth}
                onChange={() => setAttributes({ customWidth: !customWidth })}
              />
              {!!customWidth && (
                <RangeControl
                  label={__(
                    "Width in pixels",
                    "skt-blocks"
                  )}
                  value={width}
                  onChange={(value) =>
                    setAttributes({
                      width: value,
                    })
                  }
                  min={0}
                  max={1000}
                  step={1}
                />
              )}
              {!responsiveHeight && (
                <BaseControl
                  label={__(
                    "Height in pixels",
                    "skt-blocks"
                  )}
                  className={"block-height-control"}
                >
                  <input
                    type="number"
                    className={"block-height-control__input"}
                    onChange={(event) => {
                      const unprocessedValue = event.target.value;
                      const inputValue =
                        unprocessedValue !== ""
                          ? parseInt(event.target.value, 10)
                          : undefined;
                      if (inputValue < 0 && inputValue !== undefined) {
                        this.setTemporayInput(inputValue);
                        this.setHeightTo(0);
                        return;
                      }
                      this.setTemporayInput(null);
                      this.setHeightTo(inputValue);
                    }}
                    value={temporaryInput || height}
                    min={0}
                    step="10"
                  />
                </BaseControl>
              )}
              <ToggleControl
                label={__("Small Images", "skt-blocks")}
                checked={!!isSmallImage}
                onChange={() => setAttributes({ isSmallImage: !isSmallImage })}
                help={this.getSmallImageNavigationHelp}
              />
              <ToggleControl
                label={__("Thumbnails", "skt-blocks")}
                checked={!!thumbnails}
                onChange={() => setAttributes({ thumbnails: !thumbnails })}
                help={this.getThumbnailNavigationHelp}
              />
              <ToggleControl
                label={__("Lightbox", "skt-blocks")}
                checked={!!lightbox}
                onChange={() => setAttributes({ lightbox: !lightbox })}
                help={this.getLightboxHelp}
              />
            </PanelBody>
            <PanelColorSettings
              title={__("Arrow", "skt-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: iconColor,
                  onChange: (newIconColor) =>
                    setAttributes({ iconColor: newIconColor }),
                  label: __("Color", "skt-blocks"),
                },
                {
                  value: iconBackgroundColor,
                  onChange: (newiconBackgroundColor) =>
                    setAttributes({
                      iconBackgroundColor: newiconBackgroundColor,
                    }),
                  label: __(
                    "Background Color",
                    "skt-blocks"
                  ),
                },
              ]}
            >
              <RangeControl
                label={__(
                  "Background Opacity",
                  "skt-blocks"
                )}
                value={iconBackgroundOpacity}
                onChange={(newiconBackgroundOpacity) =>
                  setAttributes({
                    iconBackgroundOpacity: newiconBackgroundOpacity,
                  })
                }
                min={0}
                max={100}
                step={1}
              />
              <RangeControl
                label={__(
                  "Background Radius",
                  "skt-blocks"
                )}
                value={iconBackgroundRadius}
                onChange={(newiconBackgroundradius) =>
                  setAttributes({
                    iconBackgroundRadius: newiconBackgroundradius,
                  })
                }
                min={0}
                max={50}
                step={1}
              />
            </PanelColorSettings>
            <PanelColorSettings
              title={__("Border", "skt-blocks")}
              initialOpen={false}
              colorSettings={[
                {
                  value: borderColor,
                  onChange: (newBorderColor) =>
                    setAttributes({ borderColor: newBorderColor }),
                  label: __("Border Color", "skt-blocks"),
                },
              ]}
            >
              <SelectControl
                label={__("Border Style", "skt-blocks")}
                value={borderStyle}
                options={[
                  {
                    value: "none",
                    /* translators: abbreviation for medium size */
                    label: __("None", "skt-blocks"),
                    tooltip: __("None", "skt-blocks"),
                  },
                  {
                    value: "solid",
                    label: __("Solid", "skt-blocks"),
                    shortName: __("Solid", "skt-blocks"),
                  },
                  {
                    value: "dotted",
                    /* translators: abbreviation for small size */
                    label: __("Dotted", "skt-blocks"),
                    tooltip: __("Dotted", "skt-blocks"),
                  },
                  {
                    value: "dashed",
                    /* translators: abbreviation for medium size */
                    label: __("Dashed", "skt-blocks"),
                    tooltip: __("Dashed", "skt-blocks"),
                  },
                ]}
                onChange={(newborderStyle) =>
                  setAttributes({ borderStyle: newborderStyle })
                }
              />
              <RangeControl
                label={__("Border Size", "skt-blocks")}
                value={borderWidth}
                onChange={(newBorderWidth) =>
                  setAttributes({ borderWidth: newBorderWidth })
                }
                min={0}
                max={20}
                step={1}
              />
            </PanelColorSettings>
            <SliderPanel {...this.props} />
          </InspectorControls>
          <InspectorAdvancedControls>
            <ToggleControl
              label={__("Responsive height", "skt-blocks")}
              checked={!!responsiveHeight}
              onChange={() =>
                setAttributes({ responsiveHeight: !responsiveHeight })
              }
              help={this.getResponsiveHeightHelp}
            />
          </InspectorAdvancedControls>
        </Fragment>
      )
    );
  }
}

export default Inspector;
