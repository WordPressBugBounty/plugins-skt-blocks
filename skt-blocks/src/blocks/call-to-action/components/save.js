/**
 * Internal dependencies
 */
import classnames from "classnames";
import CallToAction from "./cta";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../renderIcon";
import React from "react";
import Style from "style-it";
import { hexToRgba } from "../../../utils/index.js";
import generateCSSUnit from "../../../generateCSSUnit";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { RichText, InnerBlocks } = wp.editor;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      buttonText,
      buttonUrl,
      buttonBackgroundColor,
      buttonTextColor,
      buttonSize,
      buttonShape,
      buttonTarget,
      ctaTitle,
      ctaText,
      ctaTitleFontFamily,
      ctaTitleFontSize,
      ctaTitleFontSizeMobile,
      ctaTitleFontSizeTablet,
      ctaTextFontFamily,
      ctaTextFontSize,
      ctaTextColor,
      imgURL,
      imgAlt,
      dimRatio,
      headingLineHeight,
      headingFontWeight,
      contentLineHeight,
      contentFontWeight,
      buttonvPadding,
      buttonhPadding,
      buttonborderWidth,
      buttonborderStyle,
      icon,
      iconPosition,
      counterId,
      hbuttonBackgroundColor,
      hbuttonTextColor,
      buttonborderColor,
      buttonborderHColor,
      resctaType,
      ctalinkText,
      titleSpace,
      subtitleSpace,
      iconSpace,
      opacity,
      ctaBackgroundColor,
      backgroundType,
      gradientDirection,
      colorLocation1,
      colorLocation2,
      backgroundColor1,
      backgroundColor2,
      buttonbackgroundType,
      buttongradientDirection,
      buttoncolorLocation1,
      buttoncolorLocation2,
      buttonbackgroundColor1,
      buttonbackgroundColor2,
      buttonSpace,
      borderRadius,
      boxShadowColor,
      boxShadowHOffset,
      boxShadowVOffset,
      boxShadowBlur,
      boxShadowSpread,
      boxShadowPosition,
      icon_color,
      topPadding,
      bottomPadding,
      leftPadding,
      rightPadding,
      imagePosition,
      imageRepeat,
      thumbsize,
    } = this.props.attributes;
    const dimRatioToClass = (ratio) => {
      return 0 === ratio || 50 === ratio
        ? null
        : "has-background-dim-" + 10 * Math.round(ratio / 10);
    };

    let imgopacity = opacity / 100;

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    // Save the block markup for the front end
    return [
      <Fragment>
        <Style type="text/css">
          {`
  		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper .skt-blocks-cta-button {
  			  color: ${buttonTextColor};
  		  }
  		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button:hover {
  			  color: ${hbuttonTextColor};
  		  }
  		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper {
  			  border-color: ${buttonborderColor};
  		  }
  		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper:hover {
  			  border-color: ${buttonborderHColor};
  		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-link-text {
			  color: ${buttonTextColor};
		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-link-text:hover {
			  color: ${hbuttonTextColor};
		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button__icon svg {
			  fill: ${icon_color};
  		  }
  	  `}
        </Style>
        {buttonbackgroundType == "color" && (
          <Style>
            {`
	  		.skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper {
	  			background-color: ${buttonBackgroundColor};
	  		}
	  		.skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper:hover {
	  			background-color: ${hbuttonBackgroundColor};
	  		}
  `}
          </Style>
        )}
        <Style>
          {`
@media only screen and (min-width: 976px){
.skt-blocks-cta-${counterId} h2.skt-blocks-cta-title {
	font-size: ${ctaTitleFontSize}px !important;
		}
}
@media only screen and (max-width: 976px){
.skt-blocks-cta-${counterId} h2.skt-blocks-cta-title {
	font-size: ${ctaTitleFontSizeTablet}px;
		}
}
@media only screen and (max-width: 767px){
	.skt-blocks-cta-${counterId} h2.skt-blocks-cta-title {
	font-size: ${ctaTitleFontSizeMobile}px;
		}
}
`}
        </Style>
      </Fragment>,
      <CallToAction {...this.props}>
        <div
          className={classnames(
            `skt-blocks-cta-${counterId}`
          )}
          style={{
            backgroundColor:
              backgroundType == "color"
                ? `${hexToRgba(
                    ctaBackgroundColor || "#ffffff",
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
            borderRadius: borderRadius,
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
            paddingTop: generateCSSUnit(topPadding, "px"),
            paddingBottom: generateCSSUnit(bottomPadding, "px"),
            paddingLeft: generateCSSUnit(leftPadding, "px"),
            paddingRight: generateCSSUnit(rightPadding, "px"),
          }}
        >
          {"image" == backgroundType && imgURL && !!imgURL.length && (
            <div className="skt-blocks-cta-image-wrap">
              <img
                className={classnames(
                  "skt-blocks-cta-image",
                  dimRatioToClass(dimRatio),
                  {
                    "has-background-dim": 0 !== dimRatio,
                  }
                )}
                style={{
                  backgroundImage: imgURL ? `url(${imgURL})` : null,
                  height: 100 + "%",
                  backgroundPosition: imagePosition,
                  backgroundRepeat: imageRepeat,
                  backgroundSize: thumbsize,
                  borderRadius: borderRadius,
                }}
              />
            </div>
          )}

          <div className="skt-blocks-cta-content">
            {ctaTitle && (
              <RichText.Content
                tagName="h2"
                className={classnames(
                  "skt-blocks-cta-title",
                  "skt-blocks-font-size-" + ctaTitleFontSize
                )}
                style={{
                  color: ctaTextColor,
                  lineHeight: headingLineHeight,
                  fontFamily: ctaTitleFontFamily,
                  fontWeight: headingFontWeight,
                  marginBottom: titleSpace,
                }}
                value={ctaTitle}
              />
            )}
            {ctaText && (
              <RichText.Content
                tagName="div"
                className={classnames(
                  "skt-blocks-cta-text",
                  "skt-blocks-font-size-" + ctaTextFontSize
                )}
                style={{
                  color: ctaTextColor,
                  fontSize: ctaTextFontSize,
                  fontFamily: ctaTextFontFamily,
                  lineHeight: contentLineHeight,
                  fontWeight: contentFontWeight,
                  marginBottom: subtitleSpace,
                }}
                value={ctaText}
              />
            )}
          </div>

          {resctaType === "text" && (
            <a
              href={buttonUrl}
              target={buttonTarget ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={classnames(
                "skt-blocks-cta-link-text"
              )}
            >
              <RichText.Content value={ctalinkText} />
            </a>
          )}

          {buttonText && resctaType === "button" && (
            <div
              className={classnames(
                "skt-blocks-cta-button-wrapper",
                buttonShape,
                buttonSize
              )}
              style={{
                color: buttonTextColor,
                backgroundColor: buttonBackgroundColor,
                paddingTop: buttonvPadding,
                paddingBottom: buttonvPadding,
                paddingLeft: buttonhPadding,
                paddingRight: buttonhPadding,
                borderStyle: buttonborderStyle ? buttonborderStyle : "solid",
                borderWidth: buttonborderWidth ? buttonborderWidth : "1px",
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
                marginBottom: buttonSpace,
              }}
            >
              {"" !== icon && iconPosition == "before" && (
                <span
                  className={classnames(
                    `skt-blocks-cta-button__icon`,
                    `skt-blocks-cta-button__icon-position-${iconPosition}`
                  )}
                  style={{
                    marginRight: iconSpace,
                  }}
                >
                  {renderSVG(icon)}
                </span>
              )}
              <a
                href={buttonUrl}
                target={buttonTarget ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={classnames(
                  "skt-blocks-cta-button",
                  buttonSize
                )}
              >
                <RichText.Content value={buttonText} />
              </a>
              {"" !== icon && iconPosition == "after" && (
                <span
                  className={classnames(
                    `skt-blocks-cta-button__icon`,
                    `skt-blocks-cta-button__icon-position-${iconPosition}`
                  )}
                  style={{
                    marginLeft: iconSpace,
                  }}
                >
                  {renderSVG(icon)}
                </span>
              )}
            </div>
          )}
        </div>
      </CallToAction>,
    ];
  }
}
