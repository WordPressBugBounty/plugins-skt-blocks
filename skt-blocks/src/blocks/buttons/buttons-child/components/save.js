/**
 * Internal dependencies
 */
import Buttons from "./buttons";
import React from "react";
import Style from "style-it";
import classnames from "classnames";
import generateBackgroundImageEffect from "../../../../generateBackgroundImageEffect";
import ResponsiveBlocksIcon from "../../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../../renderIcon";
import generateCSSUnit from "../../../../generateCSSUnit";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { RichText } = wp.editor;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      counterId,
      label,
      target,
      link,
      iconsize,
      vPadding,
      vPaddingTablet,
      vPaddingMobile,
      hPadding,
      hPaddingTablet,
      hPaddingMobile,
      vMargin,
      hMargin,
      vMarginTablet,
      hMarginTablet,
      vMarginMobile,
      hMarginMobile,
      borderWidth,
      borderRadius,
      borderStyle,
      borderColor,
      borderHColor,
      color,
      background,
      hColor,
      sizeType,
      sizeMobile,
      sizeTablet,
      lineHeight,
      lineHeightType,
      lineHeightMobile,
      lineHeightTablet,
      backgroundColor1,
      backgroundColor2,
      colorLocation1,
      colorLocation2,
      gradientDirection,
      backgroundType,
      opacity,
      icon,
      iconPosition,
      buttonFontFamily,
      buttonFontSize,
      buttonFontSizeTablet,
      buttonFontSizeMobile,
      buttonLineHeight,
      buttonFontWeight,
      boxShadowColor,
      boxShadowHOffset,
      boxShadowVOffset,
      boxShadowBlur,
      boxShadowSpread,
      boxShadowPosition,
      hoverEffect,
      icon_color,
      icon_hover_color,
      hbackground,
      iconSpace,
      inheritFromTheme,
    } = this.props.attributes;

    let imgopacity = opacity / 100;

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    return [
      <Fragment>
        {!inheritFromTheme && (
          <Fragment>
            <Style>
              {`
      @media only screen and (min-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	margin-top: ${vMargin}px !important;
	margin-bottom: ${vMargin}px !important;
		}
}
      `}
            </Style>

            {vMarginTablet != null && (
              <Style>
                {`
      @media only screen and (max-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	margin-top: ${vMarginTablet}px;
	margin-bottom: ${vMarginTablet}px;
		}
}
      `}
              </Style>
            )}
            {vMarginMobile != null && (
              <Style>
                {`
@media only screen and (max-width: 767px){
	.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	margin-top: ${vMarginMobile}px;
	margin-bottom: ${vMarginMobile}px;
		}
}
`}
              </Style>
            )}
            <Style>
              {`
      @media only screen and (min-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	margin-left: ${hMargin}px !important;
	margin-right: ${hMargin}px !important;
		}
}
      `}
            </Style>

            {hMarginTablet != null && (
              <Style>
                {`
      @media only screen and (max-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	margin-left: ${hMarginTablet}px;
	margin-right: ${hMarginTablet}px;
		}
}
      `}
              </Style>
            )}
            {hMarginMobile != null && (
              <Style>
                {`
@media only screen and (max-width: 767px){
	.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	margin-left: ${hMarginMobile}px;
	margin-right: ${hMarginMobile}px;
		}
}
`}
              </Style>
            )}
            <Style>
              {`
      @media only screen and (min-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	padding-top: ${vPadding}px;
	padding-bottom: ${vPadding}px;
		}
}
      `}
            </Style>

            {vPaddingTablet != null && (
              <Style>
                {`
      @media only screen and (max-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	padding-top: ${vPaddingTablet}px;
	padding-bottom: ${vPaddingTablet}px;
		}
}
      `}
              </Style>
            )}
            {vPaddingMobile != null && (
              <Style>
                {`
@media only screen and (max-width: 767px){
	.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	padding-top: ${vPaddingMobile}px;
	padding-bottom: ${vPaddingMobile}px;
		}
}
`}
              </Style>
            )}
            <Style>
              {`
      @media only screen and (min-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	padding-left: ${hPadding}px;
	padding-right: ${hPadding}px;
		}
}
      `}
            </Style>

            {hPaddingTablet != null && (
              <Style>
                {`
      @media only screen and (max-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	padding-left: ${hPaddingTablet}px;
	padding-right: ${hPaddingTablet}px;
		}
}
      `}
              </Style>
            )}
            {hPaddingMobile != null && (
              <Style>
                {`
@media only screen and (max-width: 767px){
	.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
	padding-left: ${hPaddingMobile}px;
	padding-right: ${hPaddingMobile}px;
		}
}
`}
              </Style>
            )}
            <Style type="text/css">
              {`
                  .skt-blocks-${counterId}.skt-blocks-button__wrapper .skt-blocks-button__link_child {
                      color: ${color};
                   }
                  .skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper:hover .skt-blocks-button__link_child {
                       color: ${hColor};
                   }
				   .skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper{
				   border-color: ${borderColor};
					border-radius: ${generateCSSUnit(borderRadius, "px")};
					border-style: ${borderStyle};
					border-width: ${generateCSSUnit(borderWidth, "px")};
					box-shadow: ${
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
            boxShadowPositionCSS
          };
				   }
				   .skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper a{
	   				font-size: ${generateCSSUnit(buttonFontSize, "px")};
	   				font-family: ${buttonFontFamily};
	   				font-weight: ${buttonFontWeight};
	   				line-height: ${buttonLineHeight};
	   				opacity: ${imgopacity};
	   			}
	   			.skt-blocks-${counterId} .skt-blocks-button__wrapper:hover {
	   				border-color: ${borderHColor};
	   			}

           `}
            </Style>
            {backgroundType == "color" && (
              <Style type="text/css">
                {`
		.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
			background-color: ${background};
		}
		.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper:hover {
			background-color: ${hbackground};
		}
	`}
              </Style>
            )}
            {backgroundType == "gradient" && (
              <Style>
                {`
		.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
			background-image: ${generateBackgroundImageEffect(
        backgroundColor1,
        backgroundColor2,
        gradientDirection,
        colorLocation1,
        colorLocation2
      )};
		}
	`}
              </Style>
            )}
          </Fragment>
        )}

        <Style>
          {`
	  .skt-blocks-${counterId} .skt-blocks-button__wrapper .skt-blocks-button__icon svg{
		  fill: ${icon_color};
		  width: ${generateCSSUnit(iconsize, "px")};
		 height: ${generateCSSUnit(iconsize, "px")};
	  }
    .skt-blocks-${counterId} .skt-blocks-button__wrapper:hover .skt-blocks-button__icon svg{
      fill: ${icon_hover_color};
    }
  `}
        </Style>
        <Style>
          {`
@media only screen and (min-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper a {
	font-size: ${buttonFontSize}px !important;
		}
}
@media only screen and (max-width: 976px){
.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper a {
	font-size: ${buttonFontSizeTablet}px;
		}
}
@media only screen and (max-width: 767px){
	.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper a {
	font-size: ${buttonFontSizeMobile}px;
		}
}
`}
        </Style>
      </Fragment>,
      <Buttons {...this.props}>
        <div
          className={classnames(
            `skt-blocks-${counterId}`,
            "skt-blocks-button__wrapper",
            `skt-blocks-button__effect-${hoverEffect}`,
            inheritFromTheme ? "wp-block-button" : null
          )}
        >
          <div
            className={classnames(
              "skt-blocks-buttons-repeater",
              "skt-blocks-button__wrapper",
              inheritFromTheme ? "wp-block-button__link" : null
            )}
          >
            {"" !== icon && iconPosition == "before" && (
              <span
                className={classnames(
                  `skt-blocks-button__icon`,
                  `skt-blocks-button__icon-position-${iconPosition}`
                )}
                style={{
                  marginRight: iconSpace,
                }}
              >
                {renderSVG(icon)}
              </span>
            )}
            <RichText.Content
              value={label}
              tagName="a"
              className="skt-blocks-button__link_child"
              href={link}
              hoverEffect={hoverEffect}
              rel={target ? "noopener noreferrer" : null}
              target={target ? "_blank" : null}
            />
            {"" !== icon && iconPosition == "after" && (
              <span
                className={classnames(
                  `skt-blocks-button__icon`,
                  `skt-blocks-button__icon-position-${iconPosition}`
                )}
                style={{
                  marginLeft: iconSpace,
                }}
              >
                {renderSVG(icon)}
              </span>
            )}
          </div>
        </div>
      </Buttons>,
    ];
  }
}
