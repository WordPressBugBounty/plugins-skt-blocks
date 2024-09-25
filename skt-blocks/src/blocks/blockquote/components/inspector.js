/**
 * Inspector Controls
 */
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import renderSVG from "../renderQuoteIcon";
import ResponsiveBlocksQuoteIcon from "../ResponsiveBlocksQuoteIcon.json";
import BoxShadowControl from "../../../utils/components/box-shadow";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

let svg_icons = Object.keys(ResponsiveBlocksQuoteIcon);
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
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onRemoveVideo = this.onRemoveVideo.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.onSelectVideo = this.onSelectVideo.bind(this);
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
   * Event to set Video as null while removing.
   */
  onRemoveVideo() {
    const { setAttributes } = this.props;

    setAttributes({ backgroundVideo: null });
  }

  /*
   * Event to set Video while adding.
   */
  onSelectVideo(media) {
    const { setAttributes } = this.props;

    if (!media || !media.url) {
      setAttributes({ backgroundVideo: null });
      return;
    }
    if (!media.type || "video" != media.type) {
      return;
    }
    setAttributes({ backgroundVideo: media });
  }

  render() {
    // Background Type Options
    const backgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
      { value: "image", label: __("Image", "skt-blocks") },
      { value: "video", label: __("Video", "skt-blocks") },
    ];
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

    // Setup the attributes
    const {
      attributes: {
        quoteBackgroundColor,
        quoteTextColor,
        quoteFontFamily,
        quoteFontSize,
        quoteFontWeight,
        quoteLineHeight,
        quoteAlign,
        quoteSize,
        quoteColor,
        quoteHposition,
        quoteVposition,
        quoteOpacity,
        showQuote,
        leftPadding,
        rightPadding,
        topPadding,
        bottomPadding,
        borderStyle,
        borderWidth,
        blockBorderRadius,
        borderColor,
        backgroundColor,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        backgroundType,
        backgroundImage,
        backgroundVideo,
        opacity,
        icon,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
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
      setAttributes({ quoteBackgroundColor: value });
    const onChangeTextColor = (value) =>
      setAttributes({ quoteTextColor: value });

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Font Family", "skt-blocks")}
            options={fontOptions}
            value={quoteFontFamily}
            onChange={(value) => {
              setAttributes({
                quoteFontFamily: value,
              }),
                loadGoogleFont(value);
            }}
          />
          <RangeControl
            label={__("Font Size", "skt-blocks")}
            value={quoteFontSize}
            onChange={(value) =>
              this.props.setAttributes({
                quoteFontSize: value,
              })
            }
            min={10}
            max={100}
            step={1}
          />
          <SelectControl
            label={__("Font Weight", "skt-blocks")}
            options={fontWeightOptions}
            value={quoteFontWeight}
            onChange={(value) =>
              this.props.setAttributes({
                quoteFontWeight: value,
              })
            }
          />
          <RangeControl
            label={__("Line Height", "skt-blocks")}
            value={quoteLineHeight}
            onChange={(value) =>
              this.props.setAttributes({
                quoteLineHeight: value,
              })
            }
            min={0}
            max={100}
            step={1}
          />
          <SelectControl
            label={__("Alignment", "skt-blocks")}
            description={__(
              "Left or right align the cite name and title.",
              "skt-blocks"
            )}
            options={citeAlignOptions}
            value={quoteAlign}
            onChange={(value) =>
              this.props.setAttributes({
                quoteAlign: value,
              })
            }
          />
        </PanelBody>
        <PanelBody
          title={__("Quotation Mark", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Show Quotation Mark", "skt-blocks")}
            checked={showQuote}
            onChange={() =>
              this.props.setAttributes({
                showQuote: !showQuote,
              })
            }
          />
          <Fragment>
            <p className="components-base-control__label">{__("Icon")}</p>
            <FontIconPicker
              icons={svg_icons}
              renderFunc={renderSVG}
              theme="default"
              value={icon}
              onChange={(value) => this.props.setAttributes({ icon: value })}
              isMulti={false}
              noSelectedPlaceholder={__("Select Icon")}
            />
          </Fragment>
          <RangeControl
            label={__("Size", "skt-blocks")}
            value={quoteSize}
            onChange={(value) =>
              this.props.setAttributes({
                quoteSize: value,
              })
            }
            min={0}
            max={400}
            step={1}
          />
          <p>
            {__("Quote Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: quoteColor }}
              ></span>
            </span>
          </p>

          <ColorPalette
            title={__("Color", "skt-blocks")}
            value={quoteColor}
            onChange={(colorValue) => setAttributes({ quoteColor: colorValue })}
            allowReset
          />
          <RangeControl
            label={__("Horizontal Position", "skt-blocks")}
            value={quoteHposition}
            onChange={(value) =>
              this.props.setAttributes({
                quoteHposition: value !== undefined ? value : 30,
              })
            }
            min={0}
            max={400}
            step={1}
            allowReset
          />
          <RangeControl
            label={__("Vertical Position", "skt-blocks")}
            value={quoteVposition}
            onChange={(value) =>
              this.props.setAttributes({
                quoteVposition: value !== undefined ? value : 20,
              })
            }
            min={0}
            max={400}
            step={1}
            allowReset
          />
          <RangeControl
            label={__("Opacity", "skt-blocks")}
            value={quoteOpacity}
            onChange={(value) =>
              this.props.setAttributes({
                quoteOpacity: value !== undefined ? value : 100,
              })
            }
            min={0}
            max={100}
            allowReset
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
                max={100}
                onChange={(value) =>
                  setAttributes({
                    gradientDirection: value !== undefined ? value : 90,
                  })
                }
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
            </Fragment>
          )}
          {"video" == backgroundType && (
            <BaseControl
              className="editor-bg-video-control"
              label={__("Background Video")}
            >
              <MediaUpload
                title={__("Select Background Video")}
                onSelect={this.onSelectVideo}
                allowedTypes={["video"]}
                value={backgroundVideo}
                render={({ open }) => (
                  <Button isDefault onClick={open}>
                    {!backgroundVideo
                      ? __("Select Background Video")
                      : __("Replace Video")}
                  </Button>
                )}
              />
              {backgroundVideo && (
                <Button onClick={this.onRemoveVideo} isLink isDestructive>
                  {__("Remove Video")}
                </Button>
              )}
            </BaseControl>
          )}
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
        </PanelBody>
        <PanelBody title={__("Border Settings")} initialOpen={false}>
          <SelectControl
            label={__("Border Style")}
            value={borderStyle}
            onChange={(value) => setAttributes({ borderStyle: value })}
            options={[
              { value: "none", label: __("None") },
              { value: "solid", label: __("Solid") },
              { value: "dotted", label: __("Dotted") },
              { value: "dashed", label: __("Dashed") },
              { value: "double", label: __("Double") },
              { value: "groove", label: __("Groove") },
              { value: "inset", label: __("Inset") },
              { value: "outset", label: __("Outset") },
              { value: "ridge", label: __("Ridge") },
            ]}
          />
          {"none" != borderStyle && (
            <Fragment>
              <RangeControl
                label={__("Border Width")}
                value={borderWidth}
                onChange={(value) => setAttributes({ borderWidth: value })}
                min={0}
                max={50}
                allowReset
              />
              <Fragment>
                <p>
                  {__("Border Color")}
                  <span className="components-base-control__label">
                    <span
                      className="component-color-indicator"
                      style={{ backgroundColor: borderColor }}
                    ></span>
                  </span>
                </p>
                <ColorPalette
                  value={borderColor}
                  onChange={(colorValue) =>
                    setAttributes({ borderColor: colorValue })
                  }
                  allowReset
                />
              </Fragment>
            </Fragment>
          )}
          <RangeControl
            label={__("Border Radius")}
            value={blockBorderRadius}
            onChange={(value) =>
              setAttributes({
                blockBorderRadius: value !== undefined ? value : 0,
              })
            }
            min={0}
            max={50}
            allowReset
          />
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

        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Top Padding", "skt-blocks")}
            value={topPadding}
            onChange={(value) =>
              this.props.setAttributes({
                topPadding: value !== undefined ? value : 70,
              })
            }
            min={0}
            max={100}
            step={1}
            allowReset
          />
          <RangeControl
            label={__("Bottom Padding", "skt-blocks")}
            value={bottomPadding}
            onChange={(value) =>
              this.props.setAttributes({
                bottomPadding: value !== undefined ? value : 70,
              })
            }
            min={0}
            max={100}
            step={1}
            allowReset
          />
          <RangeControl
            label={__("Left Padding", "skt-blocks")}
            value={leftPadding}
            onChange={(value) =>
              this.props.setAttributes({
                leftPadding: value !== undefined ? value : 60,
              })
            }
            min={0}
            max={100}
            step={1}
            allowReset
          />
          <RangeControl
            label={__("Right Padding", "skt-blocks")}
            value={rightPadding}
            onChange={(value) =>
              this.props.setAttributes({
                rightPadding: value !== undefined ? value : 60,
              })
            }
            min={0}
            max={100}
            step={1}
            allowReset
          />
        </PanelBody>

        <PanelColorSettings
          title={__("Color Settings", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: quoteTextColor,
              onChange: onChangeTextColor,
              label: __("Text Color", "skt-blocks"),
            },
          ]}
        ></PanelColorSettings>
      </InspectorControls>
    );
  }
}
