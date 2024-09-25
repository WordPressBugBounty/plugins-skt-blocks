/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import CallToAction from "./cta";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../renderIcon";
import React from "react";
import Style from "style-it";
import { hexToRgba } from "../../../utils/index.js";
import generateCSSUnit from "../../../generateCSSUnit";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import { loadGoogleFont } from "../../../utils/font";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
  RichText,
  URLInput,
  AlignmentToolbar,
  BlockControls,
  MediaUpload,
  InnerBlocks,
  MediaUploadCheck,
  figure,
  BlockAlignmentToolbar,
} = wp.editor;
const { Button, Dashicon, Icon } = wp.components;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        buttonText,
        buttonUrl,
        buttonAlignment,
        buttonBackgroundColor,
        buttonTextColor,
        buttonSize,
        buttonShape,
        ctaTitle,
        ctaText,
        ctaTitleFontFamily,
        ctaTitleFontSize,
        ctaTitleFontSizeMobile,
        ctaTitleFontSizeTablet,
        ctaTextFontFamily,
        ctaTextFontSize,
        ctaWidth,
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
      },
      isSelected,
      setAttributes,
    } = this.props;

    setAttributes({ counterId: this.props.clientId });

    const onSelectImage = (img) => {
      setAttributes({
        imgID: img.id,
        imgURL: img.url,
        imgAlt: img.alt,
      });
    };

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

    return [
      // Show the alignment toolbar on focus
      <BlockControls
        key={
          "skt-blocks-cta-block-controls-" +
          this.props.clientId
        }
      >
        <BlockAlignmentToolbar
          value={ctaWidth}
          onChange={(ctaWidth) => setAttributes({ ctaWidth })}
          controls={["center", "wide", "full"]}
        />
        <AlignmentToolbar
          value={buttonAlignment}
          onChange={(value) => {
            setAttributes({ buttonAlignment: value });
          }}
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector
        key={
          "skt-blocks-cta-inspector-" + this.props.clientId
        }
        {...{ setAttributes, ...this.props }}
      />,
      <Fragment>
        <Style>
          {`
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper .skt-blocks-cta-button {
			  color: ${buttonTextColor};
		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button:hover {
			  color: ${hbuttonTextColor};
		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-link-text {
			  color: ${buttonTextColor};
		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-link-text:hover {
			  color: ${hbuttonTextColor};
		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper {
  			  border-color: ${buttonborderColor};
  		  }
  		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-wrapper:hover {
  			  border-color: ${buttonborderHColor};
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
.skt-blocks-cta-${counterId} .skt-blocks-cta-title {
	font-size: ${ctaTitleFontSize}px !important;
		}
}
@media only screen and (max-width: 976px){
.skt-blocks-cta-${counterId} .skt-blocks-cta-title {
	font-size: ${ctaTitleFontSizeTablet}px;
		}
}
@media only screen and (max-width: 767px){
	.skt-blocks-cta-${counterId} .skt-blocks-cta-title {
	font-size: ${ctaTitleFontSizeMobile}px;
		}
}
`}
        </Style>
      </Fragment>,

      // Show the button markup in the editor
      <CallToAction
        key={"skt-blocks-cta-" + this.props.clientId}
        {...this.props}
      >
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
          {ctaTitleFontFamily && loadGoogleFont(ctaTitleFontFamily)}
          {ctaTextFontFamily && loadGoogleFont(ctaTextFontFamily)}
          <div className="skt-blocks-cta-content">
            <RichText
              tagName="h2"
              placeholder={__(
                "Call-To-Action Title",
                "skt-blocks"
              )}
              keepPlaceholderOnFocus
              value={ctaTitle}
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
              onChange={(value) => setAttributes({ ctaTitle: value })}
            />
            <RichText
              tagName="div"
              multiline="p"
              placeholder={__(
                "Call To Action Text",
                "skt-blocks"
              )}
              keepPlaceholderOnFocus
              value={ctaText}
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
              onChange={(value) => setAttributes({ ctaText: value })}
            />
          </div>
          {resctaType === "text" && (
            <RichText
              tagName="div"
              placeholder={__("CTA text...", "skt-blocks")}
              value={ctalinkText}
              allowedFormats={[]}
              className={classnames(
                "skt-blocks-cta-link-text"
              )}
              onChange={(value) => setAttributes({ ctalinkText: value })}
            />
          )}
          {resctaType === "button" && (
            <div
              className={classnames(
                "skt-blocks-cta-button-wrapper",
                buttonShape,
                buttonSize
              )}
              style={{
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
              <RichText
                tagName="a"
                placeholder={__(
                  "Button text...",
                  "skt-blocks"
                )}
                value={buttonText}
                allowedFormats={[]}
                className={classnames(
                  "skt-blocks-cta-button"
                )}
                onChange={(value) => setAttributes({ buttonText: value })}
              />
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
        {isSelected && (
          <form
            key="form-link"
            className={`blocks-button__inline-link skt-blocks-cta-button-${buttonAlignment}`}
            onSubmit={(event) => event.preventDefault()}
            style={{
              textAlign: buttonAlignment,
            }}
          >
            <Dashicon icon={"admin-links"} />
            <URLInput
              className="button-url"
              value={buttonUrl}
              onChange={(value) => setAttributes({ buttonUrl: value })}
            />
            <Button
              label={__("Apply", "skt-blocks")}
              type="submit"
            >
              <Icon icon="editor-break" />
            </Button>
          </form>
        )}
      </CallToAction>,
    ];
  }
}
