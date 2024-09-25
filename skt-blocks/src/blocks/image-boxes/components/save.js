/**
 * Internal dependencies
 */
import classnames from "classnames";
import map from "lodash/map";
import React from "react";
import Style from "style-it";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { InnerBlocks, RichText } = wp.editor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      counterId,
      imageboxesBlock,
      contentAlign,
      count,
      title,
      descriptions,
      textColor,
      itemBackgroundColor,
      itemHoverBackgroundColor,
      hoverBorderColor,
      titleHeadingTag,
      gutter,
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
      boxMarginRight,
      boxMarginLeft,
      boxPaddingTop,
      boxPaddingBottom,
      boxMarginTop,
      boxMarginBottom,
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
      arrowSize,
      arrowColor,
    } = this.props.attributes;

    const classes = classnames({
      [`has-text-align-${contentAlign}`]: contentAlign,
    });

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

    return [
      <Style type="text/css">
        {`
            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .wp-block-skt-blocks-image-boxes-block-item__description,
            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .wp-block-skt-blocks-image-boxes-block-item__title {
                color: ${textColor};
            }

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} {
                background-color: ${itemBackgroundColor};
                color: ${textColor};
                text-align: ${contentAlign};
                border-radius:${boxRadius}px;
                justify-content:${verticalAlignment} !important;
            }

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId}:hover .skt-blocks-add-image {
                background-image: ${hoverGradient};
                border-radius:${boxRadius}px;
            }

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId}:hover .skt-blocks-imagebox-image-wrap.front {
                transform: scale(${imageHoverEffect});
            }

            .wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .skt-blocks-imagebox-image-wrap.front img {
                width:${imageSize}px !important;
                max-width:100%;
            }
        `}
      </Style>,
      <Style>
        {`
@media only screen and (min-width: 976px){
.wp-block-skt-blocks-image-boxes-block-item.block-id-${counterId} .wp-block-skt-blocks-image-boxes-block-item__title {
	font-size: ${titleFontSize}px;
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
            <a href={imageboxesBlock[index]["cta_url"]}>
              <div
                className={classnames(
                  "wp-block-skt-blocks-image-boxes-block-item",
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
                  marginLeft: boxMarginLeft,
                  marginRight: boxMarginRight,
                  marginBottom: boxMarginBottom,
                  marginTop: boxMarginTop,
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
                <div className="skt-blocks-add-image"></div>
                <RichText.Content
                  tagName={titleHeadingTag}
                  className="wp-block-skt-blocks-image-boxes-block-item__title"
                  value={imageboxesBlock[index]["title"]}
                  style={{
                    fontFamily: titleFontFamily,
                    fontWeight: titleFontWeight,
                    lineHeight: titleLineHeight,
                    color: titleColor,
                    marginTop: titleSpacing,
                    marginBottom: titleSpacing,
                  }}
                />
                <RichText.Content
                  tagName="p"
                  className="wp-block-skt-blocks-image-boxes-block-item__description"
                  value={imageboxesBlock[index]["hover_description"]}
                  style={{
                    fontFamily: descriptionFontFamily,
                    fontSize: descriptionFontSize,
                    fontWeight: descriptionFontWeight,
                    lineHeight: descriptionLineHeight,
                    color: descriptionColor,
                    marginTop: descriptionSpacing,
                    marginBottom: descriptionSpacing,
                  }}
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
              </div>
            </a>
          ))}
        </div>
      </div>,
    ];
  }
}
