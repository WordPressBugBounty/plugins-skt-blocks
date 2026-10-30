import Style from "style-it";

/**
 * Testimonial Block Wrapper
 */

// Setup the block
const { Component, Fragment } = wp.element;

// Import block dependencies and components
import classnames from "classnames";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";
import {
  inherited,
  previewSuffix,
  shadowForDevice,
} from "./responsive-utils";

/**
 * Create a Testimonial wrapper Component
 */
export default class Testimonial extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        testimonialImgURL,
        testimonialBackgroundColor,
        testimonialTextColor,
        testimonialFontSize,
        testimonialCiteAlign,
        borderRadius,
        borderColor,
        borderWidth,
        borderStyle,
        padding,
        paddingTablet,
        paddingMobile,
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
        opacity,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        secondaryBackgroundColor,
        gradientDegree,
        bgGradient,
        backgroundImage,
        imageShape,
      },
    } = this.props;
    
    // Responsive box shadow / avatar width. Front end: CSS variables + classes
    // used by media queries in style.scss. Editor: the shadow for the current
    // preview device is applied directly (see edit.js). Nothing is output when
    // no Tablet/Mobile value is set, so existing blocks are unchanged.
    const allAttrs = this.props.attributes;
    const isEditorPreview = !!this.props.isEditorPreview;
    const px = (v) => (v || v === 0 ? v + "px" : undefined);
    const shadowTablet = isEditorPreview
      ? undefined
      : shadowForDevice(allAttrs, "Tablet", true);
    const shadowMobile = isEditorPreview
      ? undefined
      : shadowForDevice(allAttrs, "Mobile", true);
    const liveSuffix = isEditorPreview
      ? previewSuffix(this.props.deviceType)
      : "";
    const shadowLive = liveSuffix
      ? shadowForDevice(allAttrs, liveSuffix, false)
      : undefined;
    const bwTablet = isEditorPreview ? undefined : px(allAttrs.borderWidthTablet);
    const bwMobile = isEditorPreview ? undefined : px(allAttrs.borderWidthMobile);
    const brTablet = isEditorPreview ? undefined : px(allAttrs.borderRadiusTablet);
    const brMobile = isEditorPreview ? undefined : px(allAttrs.borderRadiusMobile);
    // Editor live preview: border width / radius for the current device.
    const liveBorderWidth = isEditorPreview
      ? inherited(allAttrs, "borderWidth", liveSuffix)
      : borderWidth;
    const liveBorderRadius = isEditorPreview
      ? inherited(allAttrs, "borderRadius", liveSuffix)
      : borderRadius;
    const imgTablet = isEditorPreview ? undefined : px(allAttrs.imageWidthTablet);
    const imgMobile = isEditorPreview ? undefined : px(allAttrs.imageWidthMobile);

    var boxShadowPositionCSS = boxShadowPosition;
    var hoverboxShadowPositionCSS = hoverboxShadowPosition;

    var bgimage = backgroundImage ? backgroundImage : "";
    var tempsecondaryBackgroundColor = bgGradient
      ? secondaryBackgroundColor
      : testimonialBackgroundColor;
    var bggradient =
      "linear-gradient(" +
      gradientDegree +
      "deg," +
      hexToRgba(testimonialBackgroundColor || "#ffffff", opacity || 0) +
      "," +
      hexToRgba(tempsecondaryBackgroundColor || "#ffffff", opacity || 0) +
      "),url(" +
      bgimage +
      ")";

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    if ("outset" === hoverboxShadowPosition) {
      hoverboxShadowPositionCSS = "";
    }

    return (
      <Fragment>
        <Style>
          {`
            .skt-blocks-block-testimonial {
              box-shadow: ${boxShadowHOffset}px ${boxShadowVOffset}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor} ${boxShadowPositionCSS};
            }

            .skt-blocks-block-testimonial:hover {
              box-shadow: ${hoverboxShadowHOffset}px ${hoverboxShadowVOffset}px ${hoverboxShadowBlur}px ${hoverboxShadowSpread}px ${hoverboxShadowColor} ${hoverboxShadowPositionCSS};
            }
            
            @media only screen and (min-width: 976px){
               .skt-blocks-block-testimonial {
                padding: ${padding}px;
            }
             }
             @media only screen and (max-width: 976px){
               .skt-blocks-block-testimonial {
                padding: ${paddingTablet}px;
            }
             }
             @media only screen and (max-width: 767px){
               .skt-blocks-block-testimonial {
                padding: ${paddingMobile}px;
            }
             }
            `}
        </Style>
        <div
          style={{
            "--skt-ts-shadow-tablet": shadowTablet,
            "--skt-ts-shadow-mobile": shadowMobile,
            "--skt-ts-shadow-live": shadowLive,
            "--skt-ts-bw-tablet": bwTablet,
            "--skt-ts-bw-mobile": bwMobile,
            "--skt-ts-br-tablet": brTablet,
            "--skt-ts-br-mobile": brMobile,
            "--skt-ts-img-tablet": imgTablet,
            "--skt-ts-img-mobile": imgMobile,
            backgroundImage: bggradient,
            backgroundSize: backgroundSize,
            backgroundRepeat: backgroundRepeat,
            backgroundPosition: backgroundPosition,
            color: testimonialTextColor,
            borderStyle: borderStyle,
            borderWidth: liveBorderWidth,
            borderRadius: liveBorderRadius,
            borderColor: borderColor,
          }}
          className={classnames(
            this.props.className,
            testimonialCiteAlign,
            { "skt-blocks-has-avatar": testimonialImgURL },
            "skt-blocks-font-size-" + testimonialFontSize,
            "skt-blocks-block-testimonial",
            "image-shape-" + imageShape,
            {
              "has-ts-shadow-tablet": !!shadowTablet,
              "has-ts-shadow-mobile": !!shadowMobile,
              "has-ts-shadow-live": !!shadowLive,
              "has-ts-bw-tablet": !!bwTablet,
              "has-ts-bw-mobile": !!bwMobile,
              "has-ts-br-tablet": !!brTablet,
              "has-ts-br-mobile": !!brMobile,
              "has-ts-img-tablet": !!imgTablet,
              "has-ts-img-mobile": !!imgMobile,
            }
          )}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}
