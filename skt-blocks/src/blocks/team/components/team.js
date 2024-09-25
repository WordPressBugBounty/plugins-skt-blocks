/**
 * Team Block Wrapper
 */

// Setup the block
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;

// Import block dependencies and components
import classnames from "classnames";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";

/**
 * Create a Team wrapper Component
 */
export default class Team extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        teamImgURL,
        imageSize,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        padding,
        alignment,
        imageShape,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        opacity,
        secondaryBackgroundColor,
        gradientDegree,
        bgGradient,
        colorLocation1,
        colorLocation2,
        backgroundImage,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        backgroundAttachment,
      },
      setAttributes,
    } = this.props;

    let bgopacity = opacity / 100;

    var tempsecondaryBackgroundColor = bgGradient
      ? secondaryBackgroundColor
      : backgroundColor;

    var bggradient =
      "linear-gradient(" +
      gradientDegree +
      "deg," +
      hexToRgba(backgroundColor || "#ffffff", bgopacity || 0) +
      colorLocation1 +
      "% ," +
      hexToRgba(tempsecondaryBackgroundColor || "#ffffff", bgopacity || 0) +
      colorLocation2 +
      "% )";

    if (backgroundImage) {
      bggradient =
        "linear-gradient(" +
        gradientDegree +
        "deg," +
        hexToRgba(backgroundColor || "#ffffff", bgopacity || 0) +
        colorLocation1 +
        "% ," +
        hexToRgba(tempsecondaryBackgroundColor || "#ffffff", bgopacity || 0) +
        colorLocation2 +
        "% ),url(" +
        backgroundImage +
        ")";
    }

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }
    return (
      <div
        className={classnames(
          this.props.className,
          { "skt-blocks-has-avatar": teamImgURL },
          "skt-blocks-font-size-" + imageSize,
          "skt-blocks-block-team",
          "image-shape-" + imageShape
        )}
        style={{
          backgroundImage: bggradient,
          backgroundSize: backgroundSize,
          backgroundRepeat: backgroundRepeat,
          backgroundPosition: backgroundPosition,
          backgroundAttachment: backgroundAttachment,
          borderWidth: borderWidth,
          borderColor: borderColor,
          borderRadius: borderRadius,
          padding: padding,
          textAlign: alignment,
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
