/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import generateCSSUnit from "../../../../generateCSSUnit";
import generateBackgroundImageEffect from "../../../../generateBackgroundImageEffect";
import Style from "style-it";
import { hexToRgba } from "../../../../utils";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        width,
        backgroundColor,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        hoverbackgroundColor1,
        hoverbackgroundColor2,
        hovercolorLocation1,
        hovercolorLocation2,
        hovergradientDirection,
        backgroundType,
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
        opacity,
        blockBorderStyle,
        blockBorderWidth,
        blockBorderRadius,
        blockBorderColor,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        hoverboxShadowColor,
        hoverboxShadowHOffset,
        hoverboxShadowVOffset,
        hoverboxShadowBlur,
        hoverboxShadowSpread,
        hoverboxShadowPosition,
        blockId,
        topMargin,
        topMarginTablet,
        topMarginMobile,
        bottomMargin,
        bottomMarginTablet,
        bottomMarginMobile,
        leftMargin,
        leftMarginTablet,
        leftMarginMobile,
        rightMargin,
        rightMarginTablet,
        rightMarginMobile,
        topPadding,
        topPaddingTablet,
        topPaddingMobile,
        bottomPadding,
        bottomPaddingTablet,
        bottomPaddingMobile,
        leftPadding,
        leftPaddingTablet,
        leftPaddingMobile,
        rightPadding,
        rightPaddingTablet,
        rightPaddingMobile,
      },
      setAttributes,
    } = this.props;
    setAttributes({ blockId: this.props.clientId });
    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }
    var hoverboxShadowPositionCSS = hoverboxShadowPosition;

    if ("outset" === hoverboxShadowPosition) {
      hoverboxShadowPositionCSS = "";
    }
    let imgopacity = opacity / 100;
    return [
      // Show the block controls on focus

      <Inspector {...{ setAttributes, ...this.props }} />,
      <Fragment>
        <Style>
          {`
            #block-${blockId}.block-editor-block-list__block {
                width: ${width}%;

            }
             #block-${blockId} .skt-blocks-block-column {
                box-shadow: ${boxShadowHOffset}px ${boxShadowVOffset}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor} ${boxShadowPositionCSS};
             }
             #block-${blockId} .skt-blocks-block-column:hover {
                box-shadow: ${hoverboxShadowHOffset}px ${hoverboxShadowVOffset}px ${hoverboxShadowBlur}px ${hoverboxShadowSpread}px ${hoverboxShadowColor} ${hoverboxShadowPositionCSS};
             }
            @media only screen and (min-width: 976px){
               #block-${blockId} .skt-blocks-block-column{
                  padding-top: ${topPadding}px;
                  padding-bottom: ${bottomPadding}px;
                  padding-left: ${leftPadding}px;
                  padding-right: ${rightPadding}px;
                  margin-top: ${topMargin}px;
                  margin-bottom: ${bottomMargin}px;
                  margin-left: ${leftMargin}px;
                  margin-right: ${rightMargin}px;
               }
             }
             @media only screen and (max-width: 976px){
               #block-${blockId} .skt-blocks-block-column{
                  padding-top: ${topPaddingTablet}px;
                  padding-bottom: ${bottomPaddingTablet}px;
                  padding-left: ${leftPaddingTablet}px;
                  padding-right: ${rightPaddingTablet}px;
                  margin-top: ${topMarginTablet}px;
                  margin-bottom: ${bottomMarginTablet}px;
                  margin-left: ${leftMarginTablet}px;
                  margin-right: ${rightMarginTablet}px;
               }
             }
             @media only screen and (max-width: 767px){
               #block-${blockId} .skt-blocks-block-column{
                  padding-top: ${topPaddingMobile}px;
                  padding-bottom: ${bottomPaddingMobile}px;
                  padding-left: ${leftPaddingMobile}px;
                  padding-right: ${rightPaddingMobile}px;
                  margin-top: ${topMarginMobile}px;
                  margin-bottom: ${bottomMarginMobile}px;
                  margin-left: ${leftMarginMobile}px;
                  margin-right: ${rightMarginMobile}px;
               }
             }
            `}
        </Style>
        {backgroundType == "gradient" && (
          <Style>
            {`
            #block-${blockId} .skt-blocks-block-column {
	    background-image: linear-gradient(${gradientDirection}deg, ${hexToRgba(
              backgroundColor1 || "#fff",
              imgopacity || 0
            )} ${colorLocation1}%, ${hexToRgba(
              backgroundColor2 || "#fff",
              imgopacity || 0
            )} ${colorLocation2}%);
	  }
	   #block-${blockId} .skt-blocks-block-column:hover {
	    background-image: linear-gradient(${hovergradientDirection}deg, ${hexToRgba(
              hoverbackgroundColor1 || "#fff",
              imgopacity || 0
            )} ${hovercolorLocation1}%, ${hexToRgba(
              hoverbackgroundColor2 || "#fff",
              imgopacity || 0
            )} ${hovercolorLocation2}%);
	  }
`}
          </Style>
        )}
        {backgroundType == "image" && backgroundImage && (
          <Style>
            {`
 #block-${blockId} .skt-blocks-block-column{
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
          
	      
          
	  }
	  #block-${blockId} .skt-blocks-block-column .responsive-column-inner-wrap.overlay-type-color{
	    background-color: ${hexToRgba(
        backgroundImageColor || "#fff",
        imgopacity || 0
      )};
	  }
	  #block-${blockId} .skt-blocks-block-column .responsive-column-inner-wrap.overlay-type-gradient.linear{
	    background-image: linear-gradient(${gradientOverlayAngle}deg, ${hexToRgba(
              gradientOverlayColor1 || "#fff",
              imgopacity || 0
            )} ${gradientOverlayLocation1}%, ${hexToRgba(
              gradientOverlayColor2 || "#fff",
              imgopacity || 0
            )} ${gradientOverlayLocation2}%);
	  }
	  #block-${blockId} .skt-blocks-block-column .responsive-column-inner-wrap.overlay-type-gradient.radial{
	    background-image: radial-gradient( at ${gradientOverlayPosition}, ${hexToRgba(
              gradientOverlayColor1 || "#fff",
              imgopacity || 0
            )} ${gradientOverlayLocation1}%, ${hexToRgba(
              gradientOverlayColor2 || "#fff",
              imgopacity || 0
            )} ${gradientOverlayLocation2}%);
	  }
        `}
          </Style>
        )}
      </Fragment>,
      <div
        className={classnames(
          "responsive-column-wrap",
          "skt-blocks-block-column"
        )}
        style={{
          borderWidth: generateCSSUnit(blockBorderWidth, "px"),
          borderColor: blockBorderColor,
          borderStyle: blockBorderStyle,
          borderRadius: blockBorderRadius,
          backgroundColor:
            backgroundType == "color"
              ? `${hexToRgba(backgroundColor || "#fff", imgopacity || 0)}`
              : undefined,
                  }}
      >
        <div
          className={classnames(
            "responsive-column-inner-wrap",
            `overlay-type-${overlayType}`,
            `${gradientOverlayType}`
          )}
        >
          <InnerBlocks templateLock={false} />
        </div>
      </div>,
    ];
  }
}
