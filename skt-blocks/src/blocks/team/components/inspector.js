/**
 * Inspector Controls
 */

import times from "lodash/times";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings, MediaUpload } = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
  BaseControl,
  Button,
  ToggleControl,
} = wp.components;
import BoxShadowControl from "../../../utils/components/box-shadow";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

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
    const iconSizeOptions = [
      {
        value: "1.5em",
        label: __("Normal", "skt-blocks"),
        shortName: __("Normal", "skt-blocks"),
      },
      {
        value: "1em",
        /* translators: abbreviation for small size */
        label: __("Small", "skt-blocks"),
        tooltip: __("Small", "skt-blocks"),
      },
      {
        value: "2em",
        /* translators: abbreviation for medium size */
        label: __("Medium", "skt-blocks"),
        tooltip: __("Medium", "skt-blocks"),
      },
      {
        value: "3em",
        /* translators: abbreviation for large size */
        label: __("Large", "skt-blocks"),
        tooltip: __("Large", "skt-blocks"),
      },
      {
        value: "0.8em",
        /* translators: abbreviation for largest size */
        label: __("Tiny", "skt-blocks"),
        tooltip: __("Tiny", "skt-blocks"),
      },
    ];

    // Setup the attributes
    const {
      attributes: {
        count,
        gutter,
        teamBlock,
        imageSize,
        designationColor,
        descriptionColor,
        socialIconColor,
        titleFontSize,
        titleFontFamily,
        descriptionFontFamily,
        designationFontFamily,
        designationFontSize,
        descriptionFontSize,
        titleFontWeight,
        designationFontWeight,
        descriptionFontWeight,
        titleLineHeight,
        designationLineHeight,
        descriptionLineHeight,
        titleSpacing,
        designationSpacing,
        descriptionSpacing,
        socialIconSpacing,
        imageMarginTop,
        imageMarginBottom,
        titleColor,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        padding,
        imageShape,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        opacity,
        secondaryBackgroundColor,
        gradientDegree,
        colorLocation1,
        colorLocation2,
        bgGradient,
        backgroundImage,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        backgroundAttachment,
        facebook,
        twitter,
        linkedin,
        instagram,
        email,
        youtube,
        pinterest,
        iconSize,
        imageWidth,
          showImage,
          showName,
          showDesignation,
          showDescription,
          showSocialIcons,
      },
      setAttributes,
    } = this.props;

    // Update color values
    const onChangeDesignationColor = (value) =>
      setAttributes({ designationColor: value });
    const onChangeDescriptionColor = (value) =>
      setAttributes({ descriptionColor: value });
    const onChangeSocialIconColor = (value) =>
      setAttributes({ socialIconColor: value });
    const onChangetitleColor = (value) => setAttributes({ titleColor: value });
    const onChangeBackgroundColor = (value) =>
      setAttributes({ backgroundColor: value });
    const onChangeBorderColor = (value) =>
      setAttributes({ borderColor: value });
    const onChangeSecondaryBackgroundColor = (value) =>
      setAttributes({ secondaryBackgroundColor: value });

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
    ];

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__(
              "Number of Team Member Boxes",
              "skt-blocks"
            )}
            value={count}
            onChange={(newCount) => {
              let cloneTest_block = [...teamBlock];
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
                setAttributes({ teamBlock: cloneTest_block });
              } else {
                const incAmount = Math.abs(newCount - cloneTest_block.length);
                let data_new = cloneTest_block;
                for (var i = 0; i < incAmount; i++) {
                  data_new.pop();
                }
                setAttributes({ teamBlock: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={4}
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
          <RangeControl
            label={__("Border Width", "skt-blocks")}
            value={borderWidth}
            onChange={(value) =>
              this.props.setAttributes({
                borderWidth: value,
              })
            }
            min={0}
            max={50}
            step={1}
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
          <PanelColorSettings
            title={__("Column Background", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: onChangeBackgroundColor,
                label: __("Background Color", "skt-blocks"),
              },
            ]}
          >
            <RangeControl
              label={__(
                "Background Color Opacity",
                "skt-blocks"
              )}
              value={opacity}
              onChange={(value) =>
                this.props.setAttributes({
                  opacity: value !== undefined ? value : 50,
                })
              }
              min={0}
              max={100}
              allowReset
            />
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
              <Fragment>
                <PanelColorSettings
                  title={__("Primary Color", "skt-blocks")}
                  initialOpen={false}
                  colorSettings={[
                    {
                      value: backgroundColor,
                      onChange: onChangeBackgroundColor,
                      label: __(
                        "Primary Color",
                        "skt-blocks"
                      ),
                    },
                  ]}
                ></PanelColorSettings>
                <PanelColorSettings
                  title={__(
                    "Secondary Color",
                    "skt-blocks"
                  )}
                  initialOpen={false}
                  colorSettings={[
                    {
                      label: __(
                        "Secondary Color",
                        "skt-blocks"
                      ),
                      value: secondaryBackgroundColor,
                      onChange: onChangeSecondaryBackgroundColor,
                    },
                  ]}
                ></PanelColorSettings>
                <RangeControl
                  label={__(
                    "Color Location 1",
                    "skt-blocks"
                  )}
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
                  label={__(
                    "Color Location 2",
                    "skt-blocks"
                  )}
                  value={colorLocation2}
                  min={0}
                  max={100}
                  onChange={(value) =>
                    setAttributes({
                      colorLocation2: value !== undefined ? value : 100,
                    })
                  }
                />
              </Fragment>
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
              onChange={(newBackgroundPosition) =>
                setAttributes({ backgroundPosition: newBackgroundPosition })
              }
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
              onChange={(newBackgroundRepeat) =>
                setAttributes({ backgroundRepeat: newBackgroundRepeat })
              }
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
              value={backgroundAttachment}
              onChange={(newBackgroundAttachment) =>
                setAttributes({ backgroundAttachment: newBackgroundAttachment })
              }
              options={[
                { value: "fixed", label: __("Fixed") },
                { value: "scroll", label: __("Scroll") },
              ]}
            />
            <SelectControl
              label={__("Background Size")}
              value={backgroundSize}
              onChange={(newBackgroundSize) =>
                setAttributes({ backgroundSize: newBackgroundSize })
              }
              options={[
                { value: "initial", label: __("Initial") },
                { value: "cover", label: __("Cover") },
                { value: "contain", label: __("Contain") },
                { value: "auto", label: __("Auto") },
                { value: "inherit", label: __("Inherit") },
              ]}
            />
          </PanelColorSettings>
        </PanelBody>

        <PanelBody
          title={__("Content", "skt-blocks")}
          initialOpen={false}
        >
              <ToggleControl
      label="Image"
      checked={showImage}
      onChange={() =>
      this.props.setAttributes({
          showImage: !showImage,
      })
  }
      />
         <ToggleControl
      label="Name"
      checked={showName}
      onChange={() =>
      this.props.setAttributes({
          showName: !showName,
      })
  }
      />
         <ToggleControl
      label="Designation"
      checked={showDesignation}
      onChange={() =>
      this.props.setAttributes({
          showDesignation: !showDesignation,
      })
  }
      />
         <ToggleControl
      label="Description"
      checked={showDescription}
      onChange={() =>
      this.props.setAttributes({
          showDescription: !showDescription,
      })
  }
      />
          <ToggleControl
      label="Social Icons"
      checked={showSocialIcons}
      onChange={() =>
      this.props.setAttributes({
          showSocialIcons: !showSocialIcons,
      })
  }
      />
         </PanelBody>
         <PanelBody
          title={__("Image", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Image Shape", "skt-blocks")}
            value={imageShape}
            options={imageShapeOptions}
            onChange={(newImageShape) =>
              setAttributes({ imageShape: newImageShape })
            }
          />
          <SelectControl
            label={__("Image Size")}
            value={imageSize}
            onChange={(newImageSize) =>
              setAttributes({ imageSize: newImageSize })
            }
            options={[
              { value: "full", label: __("Full Size") },
              { value: "thumbnail", label: __("Thumbnail") },
              { value: "medium", label: __("Medium") },
              { value: "large", label: __("Large") },
            ]}
          />
          <RangeControl
            label={__("Image Width", "skt-blocks")}
            value={imageWidth}
            onChange={(value) =>
              this.props.setAttributes({
                imageWidth: value,
              })
            }
            min={0}
            max={500}
            step={10}
          />
        </PanelBody>
        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
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
              max={50}
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
              step={1}
            />
          </PanelBody>
          <PanelBody
            title={__(
              "Designation Typography",
              "skt-blocks"
            )}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={designationFontFamily}
              onChange={(value) => {
                setAttributes({
                  designationFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={designationFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  designationFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={designationFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  designationFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={designationLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  designationLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
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
              max={50}
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
              max={100}
              step={1}
            />
          </PanelBody>
        </PanelBody>

        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Title Bottom Spacing", "skt-blocks")}
            value={titleSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                titleSpacing: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__(
              "Designation Bottom Spacing",
              "skt-blocks"
            )}
            value={designationSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                designationSpacing: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__(
              "Description Bottom Spacing",
              "skt-blocks"
            )}
            value={descriptionSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                descriptionSpacing: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__(
              "Inter Social Icon Spacing",
              "skt-blocks"
            )}
            value={socialIconSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                socialIconSpacing: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__("Image Margin Top", "skt-blocks")}
            value={imageMarginTop}
            onChange={(value) =>
              this.props.setAttributes({
                imageMarginTop: value,
              })
            }
            min={0}
            max={200}
            step={1}
          />
          <RangeControl
            label={__("Image Margin Bottom", "skt-blocks")}
            value={imageMarginBottom}
            onChange={(value) =>
              this.props.setAttributes({
                imageMarginBottom: value,
              })
            }
            min={0}
            max={200}
            step={1}
          />
        </PanelBody>
        <PanelBody
          title={__("Social", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Hide Social Icons", "skt-blocks")}
            initialOpen={true}
          >
            <ToggleControl
              label="Twitter"
              checked={twitter}
              onChange={() =>
                this.props.setAttributes({
                  twitter: !twitter,
                })
              }
            />
            <ToggleControl
              label="Facebook"
              checked={facebook}
              onChange={() =>
                this.props.setAttributes({
                  facebook: !facebook,
                })
              }
            />
            <ToggleControl
              label="Linkedin"
              checked={linkedin}
              onChange={() =>
                this.props.setAttributes({
                  linkedin: !linkedin,
                })
              }
            />
            <ToggleControl
              label="Instagram"
              checked={instagram}
              onChange={() =>
                this.props.setAttributes({
                  instagram: !instagram,
                })
              }
            />
            <ToggleControl
              label="Email"
              checked={email}
              onChange={() =>
                this.props.setAttributes({
                  email: !email,
                })
              }
            />
            <ToggleControl
              label="Youtube"
              checked={youtube}
              onChange={() =>
                this.props.setAttributes({
                  youtube: !youtube,
                })
              }
            />
            <ToggleControl
              label="Pinterest"
              checked={pinterest}
              onChange={() =>
                this.props.setAttributes({
                  pinterest: !pinterest,
                })
              }
            />
          </PanelBody>
          <PanelColorSettings
            title={__("Colors", "skt-blocks")}
            initialOpen={true}
            colorSettings={[
              {
                value: socialIconColor,
                onChange: onChangeSocialIconColor,
                label: __(
                  "Social Icon Color",
                  "skt-blocks"
                ),
              },
            ]}
          ></PanelColorSettings>
          <SelectControl
            label={__("Icon Size", "skt-blocks")}
            value={iconSize}
            options={iconSizeOptions}
            onChange={(newIconSize) => setAttributes({ iconSize: newIconSize })}
          />
        </PanelBody>
        <PanelColorSettings
          title={__("Color Settings", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              value: borderColor,
              onChange: onChangeBorderColor,
              label: __("Border Color", "skt-blocks"),
            },
            {
              value: titleColor,
              onChange: onChangetitleColor,
              label: __("Title Color", "skt-blocks"),
            },
            {
              value: designationColor,
              onChange: onChangeDesignationColor,
              label: __("Designation Color", "skt-blocks"),
            },
            {
              value: descriptionColor,
              onChange: onChangeDescriptionColor,
              label: __("Description Color", "skt-blocks"),
            },
          ]}
        ></PanelColorSettings>
      </InspectorControls>
    );
  }
}
