/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import { hexToRgba } from "../../../utils/index.js";
import renderSVG from "../renderQuoteIcon";
import generateCSSUnit from "../../../generateCSSUnit";
import { loadGoogleFont } from "../../../utils/font";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText, AlignmentToolbar, BlockControls } = wp.editor;
const { Dashicon } = wp.components;

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
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

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={quoteAlign}
          onChange={(value) => setAttributes({ quoteAlign: value })}
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,

      // Show the block markup in the editor
      <div
        style={{
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
          "skt-blocks-block-quote"
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
          {quoteFontFamily && loadGoogleFont(quoteFontFamily)}
          <RichText
            tagName="span"
            placeholder={__(
              "Click here to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. ",
              "skt-blocks"
            )}
            keepPlaceholderOnFocus
            value={quoteContent}
            className={classnames(
              "skt-blocks-block-blockquote-text"
            )}
            style={{
              textAlign: quoteAlign,
              fontFamily: quoteFontFamily,
              fontSize: quoteFontSize,
              fontWeight: quoteFontWeight,
              lineHeight: quoteLineHeight,
            }}
            onChange={(value) => setAttributes({ quoteContent: value })}
          />
        </div>
      </div>,
    ];
  }
}
