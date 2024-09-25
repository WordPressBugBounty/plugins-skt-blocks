/**
 * Team Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from "classnames";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";

/**
 * Create a Team wrapper Component
 */
export default class InfoBlock extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        resheadingAlign,
        resheadingColor,
        ressubheadingColor,
        resprefixColor,
        resprefixFontSize,
        resprefixFontWeight,
        resprefixLineHeight,
        resheadingTag,
        resheadFontSize,
        resheadFontWeight,
        resheadLineHeight,
        ressubHeadFontSize,
        ressubHeadFontWeight,
        ressubHeadLineHeight,
        resseparatorWidthType,
        resseperatorSpace,
        resheadSpace,
        ressubHeadSpace,
        icon,
        iconColor,
        resIconSize,
        imgiconPosition,
        source_type,
        ressourceAlign,
        resseperatorPosition,
        resseperatorStyle,
        resseperatorWidth,
        resseperatorColor,
        resseperatorThickness,
        resctaType,
        resctaText,
        resctaLink,
        resctaTarget,
        ctaIcon,
        resctaLinkColor,
        resctaFontSize,
        resctaFontWeight,
        resctaBtnLinkColor,
        resctaBgColor,
        ctaBtnVertPadding,
        ctaBtnHrPadding,
        resctaBorderStyle,
        resctaBorderColor,
        resctaBorderWidth,
        resctaBorderRadius,
        resprefixSpace,
        iconLeftMargin,
        iconRightMargin,
        iconTopMargin,
        iconBottomMargin,
        iconImage,
        imageSize,
        imageWidth,
        imageWidthType,
        stack,
        resshowPrefix,
        resshowTitle,
        resshowDesc,
        inheritFromTheme,
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
        counterId,
        boxBackgroundColor,
        contentPadding,
        opacity,
      },
    } = this.props;

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    let imgopacity = opacity / 100;

    return (
      <div
        className={classnames(
          this.props.className,
          "skt-blocks-infobox__outer-wrap",
          "responsive-blocks-block-team"
        )}
        style={{
          borderWidth: blockBorderWidth,
          backgroundColor: `${hexToRgba(
            boxBackgroundColor || "#ffffff",
            imgopacity || 0
          )}`,
          padding: contentPadding,
          borderColor: blockBorderColor,
          borderStyle: blockBorderStyle,
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
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
