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

    // Editor live preview for responsive (tablet/mobile) spacing. Desktop stays
    // inline on the elements; tablet/mobile come from this in-tree <style> (which
    // reaches the editor iframe) as media queries. When the editor device preview
    // is switched, WP resizes the canvas and the right query fires. Unset values
    // inherit desktop. save.js is untouched, so saved markup stays validation-safe.
    const ctaScope = `.skt-blocks-cta-${counterId}`;
    const ctaA = this.props.attributes;
    const ctaNum = ( v ) => ( typeof v === "number" && !isNaN( v ) ) ? v : null;
    const ctaRules = ( suffix ) => {
      let c = "";
      const tp = ctaNum( ctaA[ "topPadding" + suffix ] );
      const bp = ctaNum( ctaA[ "bottomPadding" + suffix ] );
      const lp = ctaNum( ctaA[ "leftPadding" + suffix ] );
      const rp = ctaNum( ctaA[ "rightPadding" + suffix ] );
      if ( tp !== null || bp !== null || lp !== null || rp !== null ) {
        c += `${ctaScope}{`;
        if ( tp !== null ) c += `padding-top:${tp}px !important;`;
        if ( bp !== null ) c += `padding-bottom:${bp}px !important;`;
        if ( lp !== null ) c += `padding-left:${lp}px !important;`;
        if ( rp !== null ) c += `padding-right:${rp}px !important;`;
        c += `}`;
      }
      const ts = ctaNum( ctaA[ "titleSpace" + suffix ] );
      if ( ts !== null ) c += `${ctaScope} .skt-blocks-cta-title{margin-bottom:${ts}px !important;}`;
      const ss = ctaNum( ctaA[ "subtitleSpace" + suffix ] );
      if ( ss !== null ) c += `${ctaScope} .skt-blocks-cta-text{margin-bottom:${ss}px !important;}`;
      const bs = ctaNum( ctaA[ "buttonSpace" + suffix ] );
      if ( bs !== null ) c += `${ctaScope} .skt-blocks-cta-button-wrapper{margin-bottom:${bs}px !important;}`;
      const vp = ctaNum( ctaA[ "buttonvPadding" + suffix ] );
      const hp = ctaNum( ctaA[ "buttonhPadding" + suffix ] );
      if ( vp !== null || hp !== null ) {
        c += `${ctaScope} .skt-blocks-cta-button-wrapper{`;
        if ( vp !== null ) c += `padding-top:${vp}px !important;padding-bottom:${vp}px !important;`;
        if ( hp !== null ) c += `padding-left:${hp}px !important;padding-right:${hp}px !important;`;
        c += `}`;
      }
      return c;
    };
    const ctaTablet = ctaRules( "Tablet" );
    const ctaMobile = ctaRules( "Mobile" );
    let ctaRespCss = "";
    if ( ctaTablet ) ctaRespCss += `@media (max-width:1024px){${ctaTablet}}`;
    if ( ctaMobile ) ctaRespCss += `@media (max-width:767px){${ctaMobile}}`;

    return [
      ctaRespCss ? <Style key="skt-cta-resp">{ctaRespCss}</Style> : null,
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
			  width: 1em;
			  height: 1em;
  		  }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-shape-square { border-radius: 0; }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-shape-rounded { border-radius: 4px; }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-shape-circular { border-radius: 100px; }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-small .skt-blocks-cta-button,
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-small .skt-blocks-cta-button__icon { font-size: 14px; }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-medium .skt-blocks-cta-button,
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-medium .skt-blocks-cta-button__icon { font-size: 20px; }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-large .skt-blocks-cta-button,
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-large .skt-blocks-cta-button__icon { font-size: 26px; }
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-extralarge .skt-blocks-cta-button,
		  .skt-blocks-cta-${counterId} .skt-blocks-cta-button-size-extralarge .skt-blocks-cta-button__icon { font-size: 32px; }
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
