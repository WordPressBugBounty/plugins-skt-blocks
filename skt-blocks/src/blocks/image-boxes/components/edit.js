/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import times from "lodash/times";
import React from "react";
import Style from "style-it";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  MediaUpload,
  URLInput,
} = wp.editor;
const { Button, Dashicon, Icon } = wp.components;

import memoize from "memize";
import map from "lodash/map";
import { loadGoogleFont } from "../../../utils/font";

const ALLOWED_MEDIA_TYPES = ["image"];

const getCount = memoize((count) => {
  return times(count, (index) => [
    "skt-blocks/image-boxes-block-item",
    {
      placeholder: sprintf(
        /* translators: %d: a digit 1-3 */
        __("Image Box Title %d", "skt-blocks"),
        parseInt(index + 1)
      ),
    },
  ]);
});

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        counterId,
        imageboxesBlock,
        count,
        gutter,
        contentAlign,
        itemBackgroundColor,
        itemHoverBackgroundColor,
        hoverBorderColor,
        titleHeadingTag,
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
      isSelected,
      setAttributes,
    } = this.props;
    var data_copy = [...imageboxesBlock];

    setAttributes({ counterId: this.props.clientId });

    const getButtonTemplate = memoize((button_block, imageboxesBlock) => {
      return times(button_block, (n) => [
        "skt-blocks/image-boxes-block-item",
        imageboxesBlock[n],
      ]);
    });
    const classes = classnames(
      "wp-block-skt-blocks-image-boxes-block",
      {
        [`has-text-align-${contentAlign}`]: contentAlign,
      }
    );

    const innerClasses = classnames(
      "wp-block-skt-blocks-image-boxes-block__inner",
      {
        "has-columns": count > 1,
        [`has-${count}-columns`]: count,
        "has-responsive-columns": count > 1,
        [`has-${gutter}-gutter`]: gutter,
      }
    );

    let imgopacity = opacity / 100;
    let hoverImgopacity = hoverOpacity / 100;

    var tempsecondaryBackgroundColor = bgGradient
      ? secondaryBackgroundColor
      : itemBackgroundColor;
    var tempHoverSecondaryBackgroundColor = hoverBgGradient
      ? hoverSecondaryBackgroundColor
      : itemHoverBackgroundColor;

    var hoverGradient =
      "linear-gradient(" +
      hoverGradientDegree +
      "deg," +
      hexToRgba(itemHoverBackgroundColor || "#ffffff", hoverImgopacity || 0) +
      "," +
      hexToRgba(
        tempHoverSecondaryBackgroundColor || "#ffffff",
        hoverImgopacity || 0
      ) +
      ")";

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    const formattingControls = ["bold", "italic", "strikethrough"];

    return [
      // Show the block controls on focus

      <Inspector {...{ setAttributes, ...this.props }} />,
      <Style>
        {`

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} {
                background-color: ${itemBackgroundColor};
                text-align: ${contentAlign};
                border-radius:${boxRadius}px;
                justify-content:${verticalAlignment} !important;
            }

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId}:hover .components-button.skt-blocks-add-image {
                background-image: ${hoverGradient};
                border-radius:${boxRadius}px;
            }

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId}:hover {
                transform: scale(${imageHoverEffect});
            }

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .skt-blocks-imagebox-image {
                width:${imageSize}px;
                max-width:100%;
            }
        `}
      </Style>,
      <Style>
        {`
@media only screen and (min-width: 976px){
.wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .wp-block-skt-blocks-image-boxes-block-item__title {
	font-size: ${titleFontSize}px !important;
		}
}
@media only screen and (max-width: 976px){
.wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .wp-block-skt-blocks-image-boxes-block-item__title {
	font-size: ${titleFontSizeTablet}px;
		}
}
@media only screen and (max-width: 767px){
	.wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .wp-block-skt-blocks-image-boxes-block-item__title {
	font-size: ${titleFontSizeMobile}px;
		}
}
`}
      </Style>,
      <div className={classes}>
        <div className={innerClasses}>
          {imageboxesBlock.map((test, index) => (
            <div className="wp-block-skt-blocks-image-boxes-block-item-wrapper">
              <div
                className={classnames(
                  "wp-block-skt-blocks-image-boxes-block-item",
                  "editor",
                  `block-id-${counterId}`
                )}
                style={{
                  backgroundColor: `${hexToRgba(
                    itemBackgroundColor || "#fff",
                    imgopacity || 0
                  )}`,
                  backgroundImage: imageboxesBlock[index]["img_id"]
                    ? "linear-gradient(" +
                      gradientDegree +
                      "deg," +
                      hexToRgba(
                        itemBackgroundColor || "#ffffff",
                        imgopacity || 0
                      ) +
                      "," +
                      hexToRgba(
                        tempsecondaryBackgroundColor || "#ffffff",
                        imgopacity || 0
                      ) +
                      "),url(" +
                      (imageboxesBlock[index]["img_url"].sizes[imageSize]
                        ? imageboxesBlock[index]["img_url"].sizes[imageSize].url
                        : imageboxesBlock[index]["img_url"].sizes["full"].url) +
                      ")"
                    : "",
                  backgroundSize: backgroundSize,
                  backgroundRepeat: backgroundRepeat,
                  backgroundPosition: backgroundPosition,
                  paddingLeft: boxPaddingLeft,
                  paddingRight: boxPaddingRight,
                  paddingBottom: boxPaddingBottom,
                  paddingTop: boxPaddingTop,
                  height: boxHeight,
                  boxShadow:
                    generateCSSUnit(boxShadowHOffset, "px") +
                    " " +
                    generateCSSUnit(boxShadowVOffset, "px") +
                    " " +
                    generateCSSUnit(boxShadowBlur, "px") +
                    " " +
                    generateCSSUnit(boxShadowSpread, "px") +
                    " " +
                    boxShadowColor +
                    " " +
                    boxShadowPositionCSS,
                }}
              >
                <MediaUpload
                  buttonProps={{
                    className: "change-image",
                  }}
                  onSelect={(value) => {
                    var new_content = {
                      title: data_copy[index]["title"],
                      cta_url: data_copy[index]["cta_url"],
                      hover_description: data_copy[index]["hover_description"],
                      img_id: value.id,
                      img_url: value,
                    };
                    data_copy[index] = new_content;
                    setAttributes({ imageboxesBlock: data_copy });
                  }}
                  allowed={ALLOWED_MEDIA_TYPES}
                  type="image"
                  value={imageboxesBlock[index]["img_id"]}
                  render={({ open }) => (
                    <Fragment>
                      <Button
                        className="skt-blocks-add-image"
                        onClick={open}
                      ></Button>
                      {imageboxesBlock[index]["img_id"] && (
                        <Button
                          className="skt-blocks-remove-image"
                          onClick={() => {
                            var new_content = {
                              title: data_copy[index]["title"],
                              cta_url: data_copy[index]["cta_url"],
                              hover_description:
                                data_copy[index]["hover_description"],
                              img_id: null,
                              img_url: null,
                            };
                            data_copy[index] = new_content;
                            setAttributes({ imageboxesBlock: data_copy });
                          }}
                        >
                          <Dashicon icon={"dismiss"} />
                        </Button>
                      )}
                    </Fragment>
                  )}
                ></MediaUpload>
                {titleFontFamily && loadGoogleFont(titleFontFamily)}
                {descriptionFontFamily && loadGoogleFont(descriptionFontFamily)}
                <RichText
                  tagName={titleHeadingTag}
                  className="wp-block-skt-blocks-image-boxes-block-item__title"
                  value={imageboxesBlock[index]["title"]}
                  placeholder={imageboxesBlock[index]["title"]}
                  onChange={(value) => {
                    var new_content = {
                      title: value,
                      hover_description: data_copy[index]["hover_description"],
                      cta_url: data_copy[index]["cta_url"],
                      img_id: imageboxesBlock[index]["img_id"],
                      img_url: imageboxesBlock[index]["img_url"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ imageboxesBlock: data_copy });
                  }}
                  style={{
                    fontFamily: titleFontFamily,
                    fontWeight: titleFontWeight,
                    lineHeight: titleLineHeight,
                    color: titleColor,
                    marginTop: titleSpacing,
                    marginBottom: titleSpacing,
                  }}
                  formattingControls={formattingControls}
                  keepPlaceholderOnFocus
                />
                <RichText
                  tagName="p"
                  className="wp-block-skt-blocks-image-boxes-block-item__description"
                  value={imageboxesBlock[index]["hover_description"]}
                  placeholder={imageboxesBlock[index]["hover_description"]}
                  onChange={(value) => {
                    var new_content = {
                      hover_description: value,
                      title: data_copy[index]["title"],
                      cta_url: data_copy[index]["cta_url"],
                      img_id: imageboxesBlock[index]["img_id"],
                      img_url: imageboxesBlock[index]["img_url"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ imageboxesBlock: data_copy });
                  }}
                  style={{
                    fontFamily: descriptionFontFamily,
                    fontSize: descriptionFontSize,
                    fontWeight: descriptionFontWeight,
                    lineHeight: descriptionLineHeight,
                    color: descriptionColor,
                    marginTop: descriptionSpacing,
                    marginBottom: descriptionSpacing,
                  }}
                  formattingControls={formattingControls}
                  keepPlaceholderOnFocus
                />
                {hasArrow && (
                  <span
                    className="imagebox-arrow"
                    style={{
                      color: arrowColor,
                      fontSize: arrowSize,
                    }}
                  >
                    &#x21AA;
                  </span>
                )}
                {isSelected && (
                  <form
                    key="form-link"
                    onSubmit={(event) => event.preventDefault()}
                  >
                    <Dashicon icon={"admin-links"} />
                    <URLInput
                      className="button-url"
                      value={data_copy[index]["cta_url"]}
                      onChange={(value) => {
                        var new_content = {
                          cta_url: value,
                          title: data_copy[index]["title"],
                          hover_description:
                            data_copy[index]["hover_description"],

                          img_id: imageboxesBlock[index]["img_id"],
                          img_url: imageboxesBlock[index]["img_url"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ imageboxesBlock: data_copy });
                      }}
                    />
                    <Button
                      label={__("Apply", "skt-blocks")}
                      type="submit"
                    >
                      <Icon icon="editor-break" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>,
    ];
  }
}
