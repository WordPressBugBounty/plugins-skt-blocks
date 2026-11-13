/**
 * Internal dependencies
 */
import classnames from "classnames";
import map from "lodash/map";
import generateCSSUnit from "../../../generateCSSUnit";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../renderIcon";
import React from "react";
import Style from "style-it";
import { hexToRgba } from "../../../utils/index.js";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { Dashicon } = wp.components;
const { RichText } = wp.editor;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      cardsArray,
      contentAlignment,
      count,
      gutter,
      textColor,
      itemBackgroundColor,
      borderStyle,
      borderWidth,
      borderRadius,
      borderColor,
      buttonTarget,
      boxShadowColor,
      boxShadowHOffset,
      boxShadowVOffset,
      boxShadowBlur,
      boxShadowSpread,
      boxShadowPosition,
      titleSpace,
      subtitleSpace,
      contentSpace,
      buttonSpace,
      buttonColor,
      buttonTextColor,
      stack,
      opacity,
      resshowImage,
      imageopacity,
      backgroundType,
      backgroundImage,
      gradientDirection,
      colorLocation1,
      colorLocation2,
      backgroundColor1,
      backgroundColor2,
      imageSize,
      imagePosition,
      imageRepeat,
      thumbsize,
      imageheight,
      blockzindex,
      blockmargin,
      icon,
      iconPosition,
      icon_color,
      counterId,
      buttonhColor,
      buttonhTextColor,
      butopacity,
      vPadding,
      hPadding,
      vMargin,
      hMargin,
      butborderWidth,
      butborderRadius,
      butborderStyle,
      buttonSize,
      buttonbackgroundType,
      buttongradientDirection,
      buttoncolorLocation1,
      buttoncolorLocation2,
      buttonbackgroundColor1,
      buttonbackgroundColor2,
      icon_hcolor,
      subLineHeight,
      subFontWeight,
      subFontSize,
      subFontFamily,
      headingFontFamily,
      contentFontFamily,
      headingLineHeight,
      headingFontWeight,
      headingFontSize,
      contentLineHeight,
      contentFontWeight,
      contentFontSize,
      contenttopSpace,
      blockbotmargin,
      blockleftmargin,
      blockrightmargin,
      bgimageSize,
      bgimagePosition,
      bgimageRepeat,
      bgthumbsize,
    } = this.props.attributes;

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    let imgopacity = opacity / 100;

    let buttonopacity = butopacity / 100;

    const dimRatioToClass = (ratio) => {
      return 0 === ratio || 50 === ratio
        ? null
        : "has-background-dim-" + 10 * Math.round(ratio / 10);
    };

    return [
      <Fragment>
        <Style>
          {`
  		  .skt-blocks-${counterId} .skt-blocks-card-button-inner .res-button {
  			  color: ${buttonTextColor};
  		  }
  		  .skt-blocks-${counterId} .skt-blocks-card-button-inner .res-button:hover {
  			  color: ${buttonhTextColor};
  		  }
  		  .skt-blocks-${counterId} .skt-blocks-card-button-inner .skt-blocks-button__icon svg{
  			  fill: ${icon_color};
  		  }
		  .skt-blocks-${counterId} .skt-blocks-card-button-inner:hover .skt-blocks-button__icon svg{
			  fill: ${icon_hcolor};
		  }
  	  `}
        </Style>
        {buttonbackgroundType == "color" && (
          <Style>
            {`
  			  .skt-blocks-${counterId} .skt-blocks-card-button-inner{
  	  			background-color: ${hexToRgba(
              buttonColor || "#2091e1",
              buttonopacity || 0
            )};
  	  		}
  	  		.skt-blocks-${counterId} .skt-blocks-card-button-inner:hover{
  	  			background-color: ${buttonhColor};
  	  		}
  	`}
          </Style>
        )}
      </Fragment>,
      <div
        className={classnames(
          `skt-blocks-${counterId}`,
          `responsive-columns__stack-${stack}`
        )}
        style={{
          marginBottom: blockbotmargin,
          marginTop: blockmargin,
          marginLeft: blockleftmargin,
          marginRight: blockrightmargin,
          zIndex: blockzindex,
        }}
      >
        <div
          className={classnames(
            "wp-block-skt-blocks-card__inner"
          )}
        >
          {cardsArray.map((test, index) => (
            <div
              className={classnames(
                "wp-block-skt-blocks-card-item"
              )}
              style={{
                borderColor: borderColor,
                borderStyle: borderStyle,
                borderWidth: borderWidth,
                borderRadius: borderRadius,
                color: textColor,
                backgroundColor:
                  backgroundType == "color"
                    ? `${hexToRgba(
                        itemBackgroundColor || "#fff",
                        imgopacity || 0
                      )}`
                    : undefined,
                backgroundImage:
                  backgroundType == "gradient"
                    ? generateBackgroundImageEffect(
                        backgroundColor1,
                        backgroundColor2,
                        gradientDirection,
                        colorLocation1,
                        colorLocation2
                      )
                    : undefined,
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
              {"image" == backgroundType && backgroundImage && (
                <div className="skt-blocks-card-background-image-wrap">
                  <div
                    className={classnames(
                      "skt-blocks-card-background-image",
                      dimRatioToClass(imageopacity),
                      {
                        "has-background-dim": 0 !== imageopacity,
                      }
                    )}
                    style={{
                      backgroundImage: backgroundImage
                        ? `url(${backgroundImage.url})`
                        : null,
                      height: 100 + "%",
                      backgroundPosition: bgimagePosition,
                      backgroundRepeat: bgimageRepeat,
                      backgroundSize: bgthumbsize,
                    }}
                  ></div>
                </div>
              )}
              {resshowImage && cardsArray[index]["image"] && (
                <div
                  className={classnames(
                    "skt-blocks-card-avatar"
                  )}
                  style={{
                    height: imageheight,
                  }}
                >
                  {cardsArray[index]["image"] && (
                    <div
                      className="skt-blocks-card-avatar-img"
                      style={{
                        backgroundImage: `url(${
                          cardsArray[index]["image"].sizes[imageSize]
                            ? cardsArray[index]["image"].sizes[imageSize].url
                            : cardsArray[index]["image"].sizes["full"].url
                        })`,
                        backgroundPosition: imagePosition,
                        backgroundRepeat: imageRepeat,
                        backgroundSize: thumbsize,
                      }}
                    ></div>
                  )}
                </div>
              )}

              <div
                className="card-content-wrap"
                style={{
                  textAlign: contentAlignment,
                  marginBottom: contentSpace,
                  marginTop: contenttopSpace,
                }}
              >
                <RichText.Content
                  tagName="h4"
                  className="wp-block-skt-blocks-card-item__title"
                  value={cardsArray[index]["title"]}
                  style={{
                    marginBottom: titleSpace,
                    color: textColor,
                    lineHeight: headingLineHeight,
                    fontWeight: headingFontWeight,
                    fontSize: headingFontSize,
                    fontFamily: headingFontFamily,
                  }}
                />
                <RichText.Content
                  tagName="p"
                  className="wp-block-skt-blocks-card-item__subtitle"
                  value={cardsArray[index]["subtitle"]}
                  style={{
                    marginBottom: subtitleSpace,
                    color: textColor,
                    lineHeight: subLineHeight,
                    fontWeight: subFontWeight,
                    fontSize: subFontSize,
                    fontFamily: subFontFamily,
                  }}
                />
                <div
                  className={
                    "wp-block-skt-blocks-card-item__price-wrapper"
                  }
                >
                  <RichText.Content
                    tagName="p"
                    className="wp-block-skt-blocks-card-item__content"
                    value={cardsArray[index]["content"]}
                    style={{
                      color: textColor,
                      lineHeight: contentLineHeight,
                      fontWeight: contentFontWeight,
                      fontSize: contentFontSize,
                      fontFamily: contentFontFamily,
                    }}
                  />
                </div>
                <div className="wp-block-skt-blocks-card-item__button-wrapper">
                  <div
                    className="skt-blocks-card-button-inner"
                    style={{
                      paddingTop: vPadding,
                      paddingBottom: vPadding,
                      paddingLeft: hPadding,
                      paddingRight: hPadding,
                      marginTop: vMargin,
                      marginBottom: vMargin,
                      marginLeft: hMargin,
                      marginRight: hMargin,
                      borderStyle: butborderStyle ? butborderStyle : "none",
                      borderRadius: butborderRadius ? butborderRadius : "",
                      borderWidth: butborderWidth ? butborderWidth : "0px",
                      backgroundImage:
                        buttonbackgroundType == "gradient"
                          ? generateBackgroundImageEffect(
                              buttonbackgroundColor1,
                              buttonbackgroundColor2,
                              buttongradientDirection,
                              buttoncolorLocation1,
                              buttoncolorLocation2
                            )
                          : undefined,
                    }}
                  >
                    {"" !== icon && iconPosition == "before" && (
                      <span
                        className={classnames(
                          `skt-blocks-button__icon`,
                          `skt-blocks-button__icon-position-${iconPosition}`
                        )}
                      >
                        {renderSVG(icon)}
                      </span>
                    )}
                    <a
                      href={cardsArray[index]["buttonURL"]}
                      target={buttonTarget ? "_blank" : null}
                      rel={buttonTarget ? "noopener noreferrer" : null}
                      className={classnames("res-button", buttonSize)}
                    >
                      <RichText.Content value={cardsArray[index]["button"]} />
                    </a>
                    {"" !== icon && iconPosition == "after" && (
                      <span
                        className={classnames(
                          `skt-blocks-button__icon`,
                          `skt-blocks-button__icon-position-${iconPosition}`
                        )}
                      >
                        {renderSVG(icon)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>,
    ];
  }
}
