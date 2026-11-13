/**
 * Internal dependencies
 */
import classnames from "classnames";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import generateCSSUnit from "../../../generateCSSUnit";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;
import Style from "style-it";
import { hexToRgba } from "../../../utils";

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        contentWidth,
        width,
        themeWidth,
        innerWidthType,
        innerWidth,
          innerWidthTablet,
          innerWidthMobile,

        topPadding,
        bottomPadding,
        leftPadding,
        rightPadding,
        topPaddingMobile,
        bottomPaddingMobile,
        leftPaddingMobile,
        rightPaddingMobile,
        topPaddingTablet,
        bottomPaddingTablet,
        leftPaddingTablet,
        rightPaddingTablet,
        mobilePaddingType,
        tabletPaddingType,
        desktopPaddingType,
        topMargin,
        bottomMargin,
        leftMargin,
        rightMargin,
        topMarginMobile,
        bottomMarginMobile,
        leftMarginMobile,
        rightMarginMobile,
        topMarginTablet,
        bottomMarginTablet,
        leftMarginTablet,
        rightMarginTablet,
        blockBorderStyle,
        blockBorderWidth,
        blockBorderRadius,
        blockBorderColor,
        sectionTag,
        backgroundType,
        backgroundColor,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        backgroundImage,
        backgroundPosition,
        backgroundAttachment,
        backgroundRepeat,
        backgroundSize,
        overlayType,
        backgroundImageColor,
        gradientOverlayColor1,
        gradientOverlayLocation1,
        gradientOverlayColor2,
        gradientOverlayLocation2,
        gradientOverlayType,
        gradientOverlayAngle,
        gradientOverlayPosition,

        backgroundVideo,
        opacity,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        z_index,
        blockId,
        align,
        anchor,
      },
      setAttributes,
    } = this.props;

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    const CustomTag = `${sectionTag}`;
    let imgopacity = opacity / 100;

    return (
      <div
        id={anchor}
        className={classnames(
          "skt-blocks-block-section-outer-wrap",
          `block-${blockId}`,
          backgroundType ? `background-type-${backgroundType}` : "",
          `align${align}`
        )}
        style={{
          zIndex: z_index,
          maxWidth: contentWidth == "boxed" ? width : "",
          marginLeft: contentWidth == "boxed" ? "auto" : "",
          marginRight: contentWidth == "boxed" ? "auto" : "",
        }}
      >
        <Style>
          {`
      @media only screen and (max-width: 976px){
          .block-${blockId} .skt-blocks-block-section{
            margin-top: ${topMarginTablet}px;
            margin-bottom: ${bottomMarginTablet}px;
            margin-left: ${leftMarginTablet}px;
            margin-right: ${rightMarginTablet}px;
            padding-top: ${topPaddingTablet}px;
            padding-bottom: ${bottomPaddingTablet}px;
            padding-left: ${leftPaddingTablet}px;
            padding-right: ${rightPaddingTablet}px;

          }
      }
      @media only screen and (max-width: 767px){
          .block-${blockId} .skt-blocks-block-section{
            margin-top: ${topMarginMobile}px;
            margin-bottom: ${bottomMarginMobile}px;
            margin-left: ${leftMarginMobile}px;
            margin-right: ${rightMarginMobile}px;
            padding-top: ${topPaddingMobile}px;
            padding-bottom: ${bottomPaddingMobile}px;
            padding-left: ${leftPaddingMobile}px;
            padding-right: ${rightPaddingMobile}px;

          }
      }
      @media only screen and (min-width: 976px){
        .block-${blockId} .skt-blocks-block-section{
            margin-top: ${topMargin}px;
            margin-bottom: ${bottomMargin}px;
            margin-left: ${leftMargin}px;
            margin-right: ${rightMargin}px;
            padding-top: ${topPadding}px;
            padding-bottom: ${bottomPadding}px;
            padding-left: ${leftPadding}px;
            padding-right: ${rightPadding}px;

          }
      }
      .block-${blockId}.skt-blocks-block-section-outer-wrap.background-type-image{
	      background-image: linear-gradient(${hexToRgba(
          backgroundImageColor || "#fff",
          imgopacity || 0
        )},${hexToRgba(
            backgroundImageColor || "#fff",
            imgopacity || 0
          )}),url(${backgroundImage});
          background-position: ${backgroundPosition};
          background-attachment: ${backgroundAttachment};
          background-repeat: ${backgroundRepeat};
          background-size: ${backgroundSize};
          border-radius: ${blockBorderRadius}px;
	  }
	  .block-${blockId}.skt-blocks-block-section-outer-wrap.background-type-image .skt-blocks-block-section.overlay-type-color{
	    background-color: ${hexToRgba(
        backgroundImageColor || "#fff",
        imgopacity || 0
      )};
	  }
	  .block-${blockId}.skt-blocks-block-section-outer-wrap.background-type-image .skt-blocks-block-section.overlay-type-gradient.linear{
	    background-image: linear-gradient(${gradientOverlayAngle}deg, ${hexToRgba(
            gradientOverlayColor1 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation1}%, ${hexToRgba(
            gradientOverlayColor2 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation2}%);
	  }
	  .block-${blockId}.skt-blocks-block-section-outer-wrap.background-type-image .skt-blocks-block-section.overlay-type-gradient.radial{
	    background-image: radial-gradient( at ${gradientOverlayPosition}, ${hexToRgba(
            gradientOverlayColor1 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation1}%, ${hexToRgba(
            gradientOverlayColor2 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation2}%);
	  }
	  .block-${blockId}.background-type-video .skt-blocks-block-section {
	    background-color: ${hexToRgba(backgroundColor || "#fff", imgopacity || 0)};
	  }

  `}
        </Style>
      {contentWidth != "boxed" && (
      <Style>
      {`
      .block-${blockId} .responsive-section-inner-wrap {
          max-width : 100%;
        }
      @media only screen and (min-width: 976px){
        .block-${blockId} .responsive-section-inner-wrap, .page.page-template-gutenberg-fullwidth .block-${blockId}.alignfull .responsive-section-inner-wrap {
          max-width : ${innerWidth}px !important;
        }
      }
      @media only screen and (max-width: 976px){
        .block-${blockId} .responsive-section-inner-wrap, .page.page-template-gutenberg-fullwidth .block-${blockId}.alignfull .responsive-section-inner-wrap {
          max-width : ${innerWidthTablet}px !important;
        }
      }
      @media only screen and (max-width: 767px){
        .block-${blockId} .responsive-section-inner-wrap, .page.page-template-gutenberg-fullwidth .block-${blockId}.alignfull .responsive-section-inner-wrap {
          max-width : ${innerWidthMobile}px !important;
        }
      }
        
`}
      </Style>
      )}
        {"video" == backgroundType && (
          <div
            className="skt-blocks-section__video-wrap"
            style={{ borderRadius: blockBorderRadius }}
          >
            {backgroundVideo && (
              <video autoplay loop muted playsinline>
                <source src={backgroundVideo.url} type="video/mp4" />
              </video>
            )}
          </div>
        )}
        <CustomTag
          className={classnames(
            "responsive-section-wrap",
            "skt-blocks-block-section",
            `overlay-type-${overlayType}`,
            `${gradientOverlayType}`
          )}
          style={{
            borderWidth: blockBorderWidth,
            borderColor: blockBorderColor,
            borderStyle: blockBorderStyle,
            borderRadius: blockBorderRadius,
            backgroundColor:
              backgroundType == "color"
                ? `${hexToRgba(backgroundColor || "#fff", imgopacity || 0)}`
                : undefined,
            backgroundImage:
              backgroundType == "gradient"
                ? generateBackgroundImageEffect(
                    `${hexToRgba(backgroundColor1 || "#fff", imgopacity || 0)}`,
                    `${hexToRgba(backgroundColor2 || "#fff", imgopacity || 0)}`,
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
          <div
            className="responsive-section-inner-wrap"
            style={{
              zIndex: z_index,
            }}
          >
            <InnerBlocks.Content />
          </div>
        </CustomTag>
      </div>
    );
  }
}
