/**
 * Internal dependencies
 */
import classnames from "classnames";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import { hexToRgba } from "../../../utils/index.js";
import renderSVG from "../renderQuoteIcon";
import generateCSSUnit from "../../../generateCSSUnit";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.editor;
const { Dashicon } = wp.components;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        quoteContent,
        quoteTextColor,
        quoteFontFamily,
        quoteFontSize,
        quoteFontWeight,
        quoteLineHeight,
        quoteAlign,
        quoteSize,
        quoteColor,
        quoteHposition,
        quoteVposition,
        quoteOpacity,
        showQuote,
        leftPadding,
        rightPadding,
        topPadding,
        bottomPadding,
        topPaddingTablet,
        topPaddingMobile,
        bottomPaddingTablet,
        bottomPaddingMobile,
        leftPaddingTablet,
        leftPaddingMobile,
        rightPaddingTablet,
        rightPaddingMobile,
        hideDesktop,
        hideTablet,
        hideMobile,
        backgroundColor,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        backgroundType,
        backgroundImage,
        backgroundVideo,
        opacity,
        icon,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        borderStyle,
        borderWidth,
        blockBorderRadius,
        borderColor,
      },
      setAttributes,
    } = this.props;
    let quoteopacity = quoteOpacity / 100;
    let imgopacity = opacity / 100;
    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    // Tablet / Mobile padding as CSS variables, only when set, so existing
    // blocks keep exactly the same markup.
    const isSet = (v) => v !== undefined && v !== null && v !== "";
    const vars = {};
    const extra = {};
    [
      ["pt", topPaddingTablet, topPaddingMobile],
      ["pb", bottomPaddingTablet, bottomPaddingMobile],
      ["pl", leftPaddingTablet, leftPaddingMobile],
      ["pr", rightPaddingTablet, rightPaddingMobile],
    ].forEach(([k, t, m]) => {
      if (isSet(t)) {
        vars[`--bq-${k}-tablet`] = `${t}px`;
        extra[`has-bq-${k}-tablet`] = true;
      }
      if (isSet(m)) {
        vars[`--bq-${k}-mobile`] = `${m}px`;
        extra[`has-bq-${k}-mobile`] = true;
      }
    });

    return (
      <div
        style={{
          ...vars,
          backgroundColor:
            backgroundType == "color"
              ? `${hexToRgba(backgroundColor || "#ffffff", imgopacity || 0)}`
              : undefined,
          color: quoteTextColor,
          borderColor: borderColor,
          borderStyle: borderStyle,
          borderWidth: borderWidth,
          borderRadius: blockBorderRadius,
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
          textAlign: quoteAlign,
          paddingLeft: leftPadding,
          paddingRight: rightPadding,
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
          opacity: backgroundType == "gradient" ? imgopacity : 1,
          backgroundColor:
            backgroundType == "color"
              ? `${hexToRgba(backgroundColor || "#ffffff", imgopacity || 0)}`
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
        }}
        className={classnames(
          this.props.className,
          quoteAlign,
          "skt-blocks-font-size-" + quoteFontSize,
          "skt-blocks-block-quote",
          extra,
          {
            "skt-quote-hide": hideDesktop || hideTablet || hideMobile,
            "skt-hide-desktop": hideDesktop,
            "skt-hide-tablet": hideTablet,
            "skt-hide-mobile": hideMobile,
          }
        )}
      >
        {backgroundType == "image" && (
          <div className="skt-blocks-section-background-image-wrap">
            {backgroundImage && (
              <img
                className={classnames(
                  "skt-blocks-section-background-image"
                )}
                src={backgroundImage}
                style={{
                  height: 100 + "%",
                  opacity: imgopacity,
                  borderRadius: blockBorderRadius,
                }}
              />
            )}
          </div>
        )}
        {"video" == backgroundType && (
          <div className="skt-blocks-section__video-wrap">
            {backgroundVideo && (
              <video
                autoplay
                loop
                muted
                playsinline
                style={{ opacity: imgopacity, borderRadius: blockBorderRadius }}
              >
                <source src={backgroundVideo.url} type="video/mp4" />
              </video>
            )}
          </div>
        )}
        <div className={"skt-blocks-block-blockquote-item"}>
          <div
            className="skt-blocks-block-blockquote-quote"
            style={{
              height: quoteSize,
              width: quoteSize,
              fill: quoteColor,
              left: quoteHposition,
              top: quoteVposition,
              opacity: quoteopacity,
            }}
          >
            {showQuote && renderSVG(icon)}
          </div>

          <RichText.Content
            tagName="span"
            className="skt-blocks-block-blockquote-text"
            style={{
              textAlign: quoteAlign,
              fontFamily: quoteFontFamily,
              fontSize: quoteFontSize,
              fontWeight: quoteFontWeight,
              lineHeight: quoteLineHeight,
            }}
            value={quoteContent}
          />
        </div>
      </div>
    );
  }
}
