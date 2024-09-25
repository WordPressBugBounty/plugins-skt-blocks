/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Buttons from "./buttons";
import icons from "./../../../../utils/components/icons";
import React from "react";
import Style from "style-it";
import generateBackgroundImageEffect from "../../../../generateBackgroundImageEffect";
import ResponsiveBlocksIcon from "../../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../../renderIcon";
import generateCSSUnit from "../../../../generateCSSUnit";
import { loadGoogleFont } from "../../../../utils/font";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  InspectorControls,
  URLInput,
} = wp.editor;
const {
  Button,
  Icon,
  Dashicon,
  BaseControl,
  PanelBody,
  RangeControl,
  SelectControl,
  ToolbarButton,
  ToolbarGroup,
  ToggleControl,
} = wp.components;

const ALLOWED_BLOCKS = ["skt-blocks/buttons"];

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        counterId,
        buttonAlignment,
        label,
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
        opensInNewTab,
        target,
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
      },
      isSelected,
      setAttributes,
    } = this.props;

    setAttributes({ counterId: this.props.clientId });

    var element = document.getElementById(
      "skt-blocks-style-button-child-" + this.props.clientId
    );

    let imgopacity = opacity / 100;

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    return (
      <Fragment>
        {buttonFontFamily && loadGoogleFont(buttonFontFamily)}
        <Inspector {...{ setAttributes, ...this.props }} />
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
            <Style>
              {`
            .skt-blocks-${counterId}.skt-blocks-button__wrapper .skt-blocks-button__link, .edit-post-visual-editor.editor-styles-wrapper .wp-block-cover .skt-blocks-${counterId}.skt-blocks-button__wrapper .skt-blocks-button__link {
                color: ${color};
            }
            .skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper:hover .skt-blocks-button__link,
            .edit-post-visual-editor.editor-styles-wrapper .wp-block-cover .skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper:hover .skt-blocks-button__link
            {
                color: ${hColor};
            }
			.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper {
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
			.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper a {
				font-size: ${generateCSSUnit(buttonFontSize, "px")};
				font-family: ${buttonFontFamily};
				font-weight: ${buttonFontWeight};
				line-height: ${buttonLineHeight};
				opacity: ${imgopacity};
			}
			.skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper:hover {
				border-color: ${borderHColor};
			}
        `}
            </Style>
            {backgroundType == "color" && (
              <Style>
                {`
		  .skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper{
			  background-color: ${background};
		  }
		  .skt-blocks-${counterId} .skt-blocks-buttons-repeater.skt-blocks-button__wrapper:hover{
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
          </Fragment>
        )}
        <Style>
          {`
		.skt-blocks-${counterId} .skt-blocks-button__wrapper .skt-blocks-button__icon svg{
			fill: ${icon_color};
			width: ${generateCSSUnit(iconsize, "px")};
		   height: ${generateCSSUnit(iconsize, "px")};
		}
    .skt-blocks-${counterId} .skt-blocks-button__wrapper div:hover .skt-blocks-button__icon svg{
      fill: ${icon_hover_color};
    }
	`}
        </Style>
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
              <RichText
                placeholder={__("Add text…", "skt-blocks")}
                value={label}
                tagName="a"
                onChange={(value) => {
                  setAttributes({ label: value });
                }}
                allowedFormats={["bold", "italic", "strikethrough"]}
                className="skt-blocks-button__link"
                rel={target ? "noopener noreferrer" : null}
                target={target ? "_blank" : null}
                hoverEffect={hoverEffect}
                keepPlaceholderOnFocus
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
          {isSelected && (
            <form
              key="form-link"
              className={`blocks-button__inline-link ab-button`}
              onSubmit={(event) => event.preventDefault()}
            >
              <Dashicon icon={"admin-links"} />
              <URLInput
                className="button-url"
                value={link}
                onChange={(value) => setAttributes({ link: value })}
              />
              <Button
                label={__("Apply", "skt-blocks")}
                type="submit"
              >
                <Icon icon="editor-break" />
              </Button>
            </form>
          )}
        </Buttons>
      </Fragment>
    );
  }
}
