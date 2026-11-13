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
            backgroundImage: bggradient,
            backgroundSize: backgroundSize,
            backgroundRepeat: backgroundRepeat,
            backgroundPosition: backgroundPosition,
            color: testimonialTextColor,
            borderStyle: borderStyle,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            borderColor: borderColor,
          }}
          className={classnames(
            this.props.className,
            testimonialCiteAlign,
            { "skt-blocks-has-avatar": testimonialImgURL },
            "skt-blocks-font-size-" + testimonialFontSize,
            "skt-blocks-block-testimonial",
            "image-shape-" + imageShape
          )}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}
