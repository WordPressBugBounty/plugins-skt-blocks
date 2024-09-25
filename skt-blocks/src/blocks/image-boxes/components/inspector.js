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
const { InspectorControls, PanelColorSettings, ColorPalette } = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
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

  render() {
    // Setup the attributes
    const {
      attributes: {
        count,
        imageboxesBlock,
        itemBackgroundColor,
        itemHoverBackgroundColor,
        titleHeadingTag,
        contentAlign,
        boxRadius,
        hasArrow,
        opacity,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        boxPaddingRight,
        boxPaddingLeft,
        boxPaddingTop,
        boxPaddingBottom,
        boxHeight,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        secondaryBackgroundColor,
        hoverSecondaryBackgroundColor,
        gradientDegree,
        bgGradient,
        hoverGradientDegree,
        hoverBgGradient,
        imageHoverEffect,
        hoverOpacity,
        titleFontFamily,
        titleFontSize,
        titleFontSizeMobile,
        titleFontSizeTablet,
        titleFontWeight,
        titleLineHeight,
        titleColor,
        descriptionFontFamily,
        descriptionFontSize,
        descriptionFontWeight,
        descriptionLineHeight,
        descriptionColor,
        imageSize,
        verticalAlignment,
        titleSpacing,
        descriptionSpacing,
        arrowColor,
        arrowSize,
      },
      setAttributes,
    } = this.props;

    const fontWeightOptions = [
      {
        value: "",
        label: __("Default", "skt-blocks"),
      },
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

    // Update color value
    const onChangeBackgroundColor = (value) =>
      setAttributes({ itemBackgroundColor: value });
    const onChangeHoverBackgroundColor = (value) =>
      setAttributes({ itemHoverBackgroundColor: value });
    const onChangeSecondaryBackgroundColor = (value) =>
      setAttributes({ secondaryBackgroundColor: value });
    const onChangeHoverSecondaryBackgroundColor = (value) =>
      setAttributes({ hoverSecondaryBackgroundColor: value });
    const onChangeTitleHeadingTag = (value) =>
      setAttributes({ titleHeadingTag: value });
    const onChangeContentAlign = (value) =>
      setAttributes({ contentAlign: value });
    const onChangeImageHoverEffect = (value) =>
      setAttributes({ imageHoverEffect: value });
    const onChangeBackgroundPosition = (value) =>
      setAttributes({ backgroundPosition: value });
    const onChangeBackgroundRepeat = (value) =>
      setAttributes({ backgroundRepeat: value });
    const onChangeBackgroundSize = (value) =>
      setAttributes({ backgroundSize: value });
    const onChangeImageSize = (value) => setAttributes({ imageSize: value });
    const onChangeVerticalAlignment = (value) =>
      setAttributes({ verticalAlignment: value });
    const onChangeArrowColor = (value) => setAttributes({ arrowColor: value });

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__(
              "Number of Image Boxes Blocks",
              "skt-blocks"
            )}
            value={count}
            onChange={(newCount) => {
              let cloneTest_block = [...imageboxesBlock];
              if (cloneTest_block.length < newCount) {
                const incAmount = Math.abs(newCount - cloneTest_block.length);

                {
                  times(incAmount, (n) => {
                    cloneTest_block.push({
                      title: "Image Box Title " + newCount,
                      descriptions: "",
                    });
                  });
                }
                setAttributes({ imageboxesBlock: cloneTest_block });
              } else {
                const incAmount = Math.abs(newCount - cloneTest_block.length);
                let data_new = cloneTest_block;
                for (var i = 0; i < incAmount; i++) {
                  data_new.pop();
                }
                setAttributes({ imageboxesBlock: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={4}
            step={1}
          />
          <RangeControl
            label={__("Height", "skt-blocks")}
            value={boxHeight}
            onChange={(newCount) => {
              setAttributes({ boxHeight: newCount });
            }}
            min={100}
            max={700}
            step={1}
          />
          <RangeControl
            label={__("Border Radius", "skt-blocks")}
            value={boxRadius}
            onChange={(newCount) => {
              setAttributes({ boxRadius: newCount });
            }}
            min={1}
            max={50}
            step={1}
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
          title={__("Alignment", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Horizontal Alignment")}
            value={contentAlign}
            onChange={onChangeContentAlign}
            options={[
              { value: "center", label: __("Center") },
              { value: "left", label: __("Left") },
              { value: "right", label: __("Right") },
            ]}
          />
          <SelectControl
            label={__("Vertical Alignment")}
            value={verticalAlignment}
            onChange={onChangeVerticalAlignment}
            options={[
              { value: "center", label: __("Center") },
              { value: "flex-start", label: __("Top") },
              { value: "flex-end", label: __("Bottom") },
            ]}
          />
        </PanelBody>
        <PanelBody
          title={__("Image", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Image Size")}
            value={imageSize}
            onChange={onChangeImageSize}
            options={[
              { value: "full", label: __("Full Size") },
              { value: "thumbnail", label: __("Thumbnail") },
              { value: "medium", label: __("Medium") },
              { value: "large", label: __("Large") },
            ]}
          />
          <SelectControl
            label={__("Background Position")}
            value={backgroundPosition}
            onChange={onChangeBackgroundPosition}
            options={[
              { value: "left top", label: __("Left Top") },
              { value: "left center", label: __("Left Center") },
              { value: "left bottom", label: __("Left Bottom") },
              { value: "right top", label: __("Right Top") },
              { value: "right center", label: __("Right Center") },
              { value: "right bottom", label: __("Right Bottom") },
              { value: "center top", label: __("Center Top") },
              { value: "center center", label: __("Center Center") },
              { value: "center bottom", label: __("Center Bottom") },
            ]}
          />
          <SelectControl
            label={__("Background Repeat")}
            value={backgroundRepeat}
            onChange={onChangeBackgroundRepeat}
            options={[
              { value: "initial", label: __("Initial") },
              { value: "repeat", label: __("Repeat") },
              { value: "no-repeat", label: __("No-Repeat") },
              { value: "round", label: __("Round") },
              { value: "inherit", label: __("Inherit") },
              { value: "space", label: __("Space") },
              { value: "repeat-y", label: __("Repeat Y") },
              { value: "repeat-x", label: __("Repeat X") },
            ]}
          />
          <SelectControl
            label={__("Background Size")}
            value={backgroundSize}
            onChange={onChangeBackgroundSize}
            options={[
              { value: "initial", label: __("Initial") },
              { value: "cover", label: __("Cover") },
              { value: "contain", label: __("Contain") },
              { value: "auto", label: __("Auto") },
              { value: "inherit", label: __("Inherit") },
            ]}
          />
        </PanelBody>
        <PanelColorSettings
          title={__("Overlay Color", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: itemBackgroundColor,
              onChange: onChangeBackgroundColor,
              label: __("Background Color", "skt-blocks"),
            },
          ]}
        >
          <ToggleControl
            label="Gradient Background"
            checked={bgGradient}
            onChange={() =>
              this.props.setAttributes({
                bgGradient: !bgGradient,
              })
            }
          />
          {bgGradient && (
            <PanelColorSettings
              title={__(
                "Secondary Background Color",
                "skt-blocks"
              )}
              initialOpen={true}
              colorSettings={[
                {
                  label: __(
                    "Secondary Background Color",
                    "skt-blocks"
                  ),
                  value: secondaryBackgroundColor,
                  onChange: onChangeSecondaryBackgroundColor,
                },
              ]}
            ></PanelColorSettings>
          )}
          {bgGradient && (
            <RangeControl
              label={__("Gradient Degree", "skt-blocks")}
              value={gradientDegree}
              onChange={(value) =>
                setAttributes({
                  gradientDegree: value !== undefined ? value : 100,
                })
              }
              min={0}
              max={360}
            />
          )}
          <RangeControl
            label={__(
              "Background Color Opacity",
              "skt-blocks"
            )}
            value={opacity}
            onChange={(value) =>
              setAttributes({ opacity: value !== undefined ? value : 70 })
            }
            min={0}
            max={100}
            allowReset
          />
        </PanelColorSettings>
        <PanelColorSettings
          title={__("Hover Overlay Color", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: itemHoverBackgroundColor,
              onChange: onChangeHoverBackgroundColor,
              label: __(
                "Hover Background Color",
                "skt-blocks"
              ),
            },
          ]}
        >
          <ToggleControl
            label="Gradient Background"
            checked={hoverBgGradient}
            onChange={() =>
              this.props.setAttributes({
                hoverBgGradient: !hoverBgGradient,
              })
            }
          />
          {hoverBgGradient && (
            <PanelColorSettings
              title={__(
                "Secondary Background Color",
                "skt-blocks"
              )}
              initialOpen={true}
              colorSettings={[
                {
                  label: __(
                    "Secondary Background Color",
                    "skt-blocks"
                  ),
                  value: hoverSecondaryBackgroundColor,
                  onChange: onChangeHoverSecondaryBackgroundColor,
                },
              ]}
            ></PanelColorSettings>
          )}
          {hoverBgGradient && (
            <RangeControl
              label={__("Gradient Degree", "skt-blocks")}
              value={hoverGradientDegree}
              onChange={(value) =>
                setAttributes({
                  hoverGradientDegree: value !== undefined ? value : 100,
                })
              }
              min={0}
              max={360}
            />
          )}
          <RangeControl
            label={__(
              "Background Color Opacity",
              "skt-blocks"
            )}
            value={hoverOpacity}
            onChange={(value) =>
              setAttributes({ hoverOpacity: value !== undefined ? value : 70 })
            }
            min={0}
            max={100}
            allowReset
          />
        </PanelColorSettings>
        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Title Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Title Heading Tag")}
              value={titleHeadingTag}
              onChange={onChangeTitleHeadingTag}
              options={[
                { value: "h1", label: __("H1") },
                { value: "h2", label: __("H2") },
                { value: "h3", label: __("H3") },
                { value: "h4", label: __("H4") },
                { value: "h5", label: __("H5") },
                { value: "h6", label: __("H6") },
              ]}
            />
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
                        value={titleFontSizeMobile}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSizeMobile: value,
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
                        value={titleFontSizeTablet}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSizeTablet: value,
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
                        value={titleFontSize}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSize: value,
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
              max={200}
              step={1}
            />
            <ColorPalette
              label={__("Text Color", "skt-blocks")}
              value={titleColor}
              onChange={(colorValue) =>
                setAttributes({ titleColor: colorValue })
              }
              allowReset
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
              value={descriptionFontFamily}
              onChange={(value) => {
                setAttributes({
                  descriptionFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={descriptionFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  descriptionFontSize: value,
                })
              }
              min={0}
              max={200}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={descriptionFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  descriptionFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={descriptionLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  descriptionLineHeight: value,
                })
              }
              min={0}
              max={200}
              step={1}
            />
            <ColorPalette
              label={__("Text Color", "skt-blocks")}
              value={descriptionColor}
              onChange={(colorValue) =>
                setAttributes({ descriptionColor: colorValue })
              }
              allowReset
            />
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Padding", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Box Top Padding", "skt-blocks")}
            value={boxPaddingTop}
            onChange={(newCount) => {
              setAttributes({ boxPaddingTop: newCount });
            }}
            min={1}
            max={500}
            step={1}
          />
          <RangeControl
            label={__("Box Left Padding", "skt-blocks")}
            value={boxPaddingLeft}
            onChange={(newCount) => {
              setAttributes({ boxPaddingLeft: newCount });
            }}
            min={1}
            max={500}
            step={1}
          />
          <RangeControl
            label={__("Box Right Padding", "skt-blocks")}
            value={boxPaddingRight}
            onChange={(newCount) => {
              setAttributes({ boxPaddingRight: newCount });
            }}
            min={1}
            max={50}
            step={1}
          />
          <RangeControl
            label={__("Box Bottom Padding", "skt-blocks")}
            value={boxPaddingBottom}
            onChange={(newCount) => {
              setAttributes({ boxPaddingBottom: newCount });
            }}
            min={1}
            max={50}
            step={1}
          />
        </PanelBody>
        <PanelBody
          title={__("Hover Effect", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Hover Effect")}
            value={imageHoverEffect}
            onChange={onChangeImageHoverEffect}
            options={[
              { value: "", label: __("Default") },
              { value: "1.04", label: __("Zoom Out") },
              { value: "1", label: __("Zoom In") },
            ]}
          />
        </PanelBody>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Title Spacing", "skt-blocks")}
            value={titleSpacing}
            onChange={(newCount) => {
              setAttributes({ titleSpacing: newCount });
            }}
            min={-50}
            max={100}
            step={1}
          />
          <RangeControl
            label={__("Description Spacing", "skt-blocks")}
            value={descriptionSpacing}
            onChange={(newCount) => {
              setAttributes({ descriptionSpacing: newCount });
            }}
            min={-50}
            max={100}
            step={1}
          />
        </PanelBody>
        <PanelBody
          title={__("Arrow", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label="Arrow After Content"
            checked={hasArrow}
            onChange={() =>
              this.props.setAttributes({
                hasArrow: !hasArrow,
              })
            }
          />
          <PanelColorSettings
            title={__("Color", "skt-blocks")}
            initialOpen={true}
            colorSettings={[
              {
                value: arrowColor,
                onChange: onChangeArrowColor,
                label: __("Color", "skt-blocks"),
              },
            ]}
          ></PanelColorSettings>
          <RangeControl
            label={__("Arrow Size", "skt-blocks")}
            value={arrowSize}
            onChange={(newCount) => {
              setAttributes({ arrowSize: newCount });
            }}
            min={0}
            max={100}
            step={1}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
