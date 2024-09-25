/**
 * Inspector Controls
 */

// Setup the block
import times from "lodash/times";
import BoxShadowControl from "../../../utils/components/box-shadow";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";
import BoxShadowControlHelper from "../../../utils/components/box-shadow-helper";

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
  ColorPalette,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
  Button,
  BaseControl,
  TabPanel,
  Dashicon,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
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

  render() {
    const fontWeightOptions = [
      {
        value: "",
        label: __("Default", "skt-blocks"),
      },
      {
        value: 100,
        label: __("100", "skt-blocks"),
      },
      {
        value: 200,
        label: __("200", "skt-blocks"),
      },
      {
        value: 300,
        label: __("300", "skt-blocks"),
      },
      {
        value: 400,
        label: __("400", "skt-blocks"),
      },
      {
        value: 500,
        label: __("500", "skt-blocks"),
      },
      {
        value: 600,
        label: __("600", "skt-blocks"),
      },
      {
        value: 700,
        label: __("700", "skt-blocks"),
      },
      {
        value: 800,
        label: __("800", "skt-blocks"),
      },
      {
        value: 900,
        label: __("900", "skt-blocks"),
      },
    ];

    const textTransformOptions = [
      {
        value: "",
        label: __("Default", "skt-blocks"),
      },
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

    // Cite Alignment Options
    const citeAlignOptions = [
      {
        value: "left-aligned",
        label: __("Left Aligned", "skt-blocks"),
      },
      {
        value: "center-aligned",
        label: __("Center Aligned", "skt-blocks"),
      },
      {
        value: "right-aligned",
        label: __("Right Aligned", "skt-blocks"),
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
      {
        value: "blob1",
        label: __("Blob1", "skt-blocks"),
        shortName: __("Blob1", "skt-blocks"),
      }
    ];

    // Setup the attributes
    const {
      attributes: {
        count,
        gutter,
        testimonialBlock,
        testimonialBackgroundColor,
        testimonialTextColor,
        testimonialTitleColor,
        testimonialNameColor,
        testimonialCiteAlign,
        borderRadius,
        borderColor,
        borderWidth,
        borderStyle,
        padding,
        paddingTablet,
        paddingMobile,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        hoverboxShadowColor,
        backgroundImage,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        secondaryBackgroundColor,
        gradientDegree,
        bgGradient,
        opacity,
        titleFontSize,
        titleFontFamily,
        titleLineHeight,
        titleFontWeight,
        titleTextTransform,
        nameFontSize,
        nameFontFamily,
        nameLineHeight,
        nameFontWeight,
        nameTextTransform,
        contentFontFamily,
        contentFontSize,
        contentLineHeight,
        contentFontWeight,
        contentTextTransform,
        imageShape,
        imageSize,
        imageWidth,
        contentSpacing,
        titleSpacing,
        nameSpacing,
        imageSpacing,
      },
      setAttributes,
    } = this.props;

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__(
              "Number of Boxes",
              "skt-blocks"
            )}
            value={count}
            onChange={(newCount) => {
              let cloneTest_block = [...testimonialBlock];
              if (cloneTest_block.length < newCount) {
                const incAmount = Math.abs(newCount - cloneTest_block.length);

                {
                  times(incAmount, (n) => {
                    cloneTest_block.push({
                      title: "Team Title " + newCount,
                      descriptions: "",
                    });
                  });
                }
                setAttributes({ testimonialBlock: cloneTest_block });
              } else {
                const incAmount = Math.abs(newCount - cloneTest_block.length);
                let data_new = cloneTest_block;
                for (var i = 0; i < incAmount; i++) {
                  data_new.pop();
                }
                setAttributes({ testimonialBlock: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={3}
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
            label={__("Cite Alignment", "skt-blocks")}
            description={__(
              "Left, center or right align the cite name and title.",
              "skt-blocks"
            )}
            options={citeAlignOptions}
            value={testimonialCiteAlign}
            onChange={(value) =>
              this.props.setAttributes({
                testimonialCiteAlign: value,
              })
            }
          />
        </PanelBody>
        <PanelColorSettings
          title={__("Colors and Background", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              label: __("Text Color", "skt-blocks"),
              value: testimonialTextColor,
              onChange: (colorValue) =>
                setAttributes({ testimonialTextColor: colorValue }),
            },
            {
              label: __("Name Color", "skt-blocks"),
              value: testimonialNameColor,
              onChange: (colorValue) =>
                setAttributes({ testimonialNameColor: colorValue }),
            },
            {
              label: __(
                "Title/Designation Color",
                "skt-blocks"
              ),
              value: testimonialTitleColor,
              onChange: (colorValue) =>
                setAttributes({ testimonialTitleColor: colorValue }),
            },
            {
              label: __("Background Color", "skt-blocks"),
              value: testimonialBackgroundColor,
              onChange: (colorValue) =>
                setAttributes({ testimonialBackgroundColor: colorValue }),
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
          {bgGradient && [
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
                  onChange: (colorValue) =>
                    setAttributes({ secondaryBackgroundColor: colorValue }),
                },
              ]}
            ></PanelColorSettings>,
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
            />,
          ]}
          <RangeControl
            label={__(
              "Background Color Opacity",
              "skt-blocks"
            )}
            value={opacity}
            onChange={(value) =>
              this.props.setAttributes({
                opacity: value !== undefined ? value : 1,
              })
            }
            min={0}
            step={0.01}
            max={1}
            allowReset
          />
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
                className="uagb-rm-btn"
                onClick={this.onRemoveImage}
                isLink
                isDestructive
              >
                {__("Remove Image", "skt-blocks")}
              </Button>
            )}
          </BaseControl>
          <SelectControl
            label={__("Background Position")}
            value={backgroundPosition}
            onChange={(value) => setAttributes({ backgroundPosition: value })}
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
            onChange={(value) => setAttributes({ backgroundRepeat: value })}
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
            onChange={(value) => setAttributes({ backgroundSize: value })}
            options={[
              { value: "initial", label: __("Initial") },
              { value: "cover", label: __("Cover") },
              { value: "contain", label: __("Contain") },
              { value: "auto", label: __("Auto") },
              { value: "inherit", label: __("Inherit") },
            ]}
          />
        </PanelColorSettings>
        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Content", "skt-blocks")}
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
                  contentFontSize: value,
                })
              }
              min={0}
              max={100}
              step={1}
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
                  contentLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={0.01}
            />
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={contentTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  contentTextTransform: value,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Name", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={nameFontFamily}
              onChange={(value) => {
                setAttributes({
                  nameFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={nameFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  nameFontSize: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={nameFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  nameFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={nameLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  nameLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={0.01}
            />
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={nameTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  nameTextTransform: value,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Title", "skt-blocks")}
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
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={titleTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  titleTextTransform: value,
                })
              }
            />
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Image", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Shape", "skt-blocks")}
            value={imageShape}
            options={imageShapeOptions}
            onChange={(newImageShape) =>
              setAttributes({ imageShape: newImageShape })
            }
          />
          <SelectControl
            label={__("Size", "skt-blocks")}
            value={imageSize}
            options={[
              { value: "full", label: __("Full Size") },
              { value: "thumbnail", label: __("Thumbnail") },
              { value: "medium", label: __("Medium") },
              { value: "large", label: __("Large") },
            ]}
            onChange={(newImageSize) =>
              setAttributes({ imageSize: newImageSize })
            }
          />
          <RangeControl
            label={__("Width", "skt-blocks")}
            value={imageWidth}
            onChange={(value) =>
              this.props.setAttributes({
                imageWidth: value,
              })
            }
            min={0}
            max={300}
            step={1}
          />
        </PanelBody>
        <PanelBody
          title={__("Border", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style", "skt-blocks")}
            value={borderStyle}
            onChange={(value) => setAttributes({ borderStyle: value })}
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
          {"none" != borderStyle && (
            <Fragment>
              <RangeControl
                label={__("Border Width", "skt-blocks")}
                value={borderWidth}
                onChange={(value) =>
                  setAttributes({
                    borderWidth: value,
                  })
                }
                min={0}
                max={50}
              />
              <RangeControl
                label={__("Border Radius", "skt-blocks")}
                value={borderRadius}
                onChange={(value) =>
                  this.props.setAttributes({
                    borderRadius: value,
                  })
                }
                min={0}
                max={50}
                step={1}
              />
            </Fragment>
          )}
          {"none" != borderStyle && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Border Color", "skt-blocks")}
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
          )}
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
          <BoxShadowControlHelper
            setAttributes={setAttributes}
            label={__("Hover Box Shadow")}
            attrNameTemplate="hover%s"
            boxShadowColor={{ value: hoverboxShadowColor }}
          />
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
                        "Padding Mobile",
                        "skt-blocks"
                      )}
                      value={paddingMobile}
                      onChange={(value) =>
                        this.props.setAttributes({
                          paddingMobile: value,
                        })
                      }
                      min={0}
                      max={50}
                      step={1}
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Padding Tablet",
                        "skt-blocks"
                      )}
                      value={paddingTablet}
                      onChange={(value) =>
                        this.props.setAttributes({
                          paddingTablet: value,
                        })
                      }
                      min={0}
                      max={50}
                      step={1}
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__("Padding", "skt-blocks")}
                      value={padding}
                      onChange={(value) =>
                        this.props.setAttributes({
                          padding: value,
                        })
                      }
                      min={0}
                      max={50}
                      step={1}
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
          <RangeControl
            label={__("Content", "skt-blocks")}
            value={contentSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                contentSpacing: value !== undefined ? value : 8,
              })
            }
            min={-50}
            max={100}
            step={1}
          />
          <RangeControl
            label={__("Name", "skt-blocks")}
            value={nameSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                nameSpacing: value !== undefined ? value : -5,
              })
            }
            min={-50}
            max={100}
            step={1}
          />
          <RangeControl
            label={__("Image", "skt-blocks")}
            value={imageSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                imageSpacing: value,
              })
            }
            min={-50}
            max={100}
            step={1}
          />
          <RangeControl
            label={__("Title", "skt-blocks")}
            value={titleSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                titleSpacing: value,
              })
            }
            min={-50}
            max={100}
            step={1}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
