/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import times from "lodash/times";
import memoize from "memize";
import generateCSSUnit from "../../../generateCSSUnit";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import Style from "style-it";
import { hexToRgba } from "../../../utils";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks, AlignmentToolbar, BlockControls } = wp.editor;
const ALLOWED_BLOCKS = ["skt-blocks/column"];

const getColumnsTemplate = memoize((columns) => {
  return times(columns, (n) => [
    "skt-blocks/column",
    { id: n + 1 },
  ]);
});

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }
  componentDidMount() {
    // Assigning block_id in the attribute.
    this.props.setAttributes({ block_id: this.props.clientId });

    this.props.setAttributes({ classMigrate: true });

    // Pushing Style tag for this block css.
    const $style = document.createElement("style");
    $style.setAttribute(
      "id",
      "responsive-columns-style-" + this.props.clientId
    );
    document.head.appendChild($style);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        columns,
        columnGap,
        contentWidth,
        width,
        widthType,
        stack,
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
        topMargin,
        topMarginTablet,
        topMarginMobile,
        bottomMargin,
        bottomMarginTablet,
        bottomMarginMobile,
        backgroundColor,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        backgroundType,
        backgroundImage,
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
        height,
        customHeight,
        blockAlign,
        verticalAlign,
        blockId,
        z_index,
        align,
      },
      setAttributes,
    } = this.props;

    setAttributes({ blockId: this.props.clientId });
    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }
    let imgopacity = opacity / 100;
    let max_width = "100%";

    if ("custom" == contentWidth) {
      if ("" != width) {
        max_width = generateCSSUnit(width, widthType);
      }
    }

    let columnHeightStyle = "";
    if ("half" == height) columnHeightStyle = "50vh !important";
    if ("full" == height) columnHeightStyle = "100vh !important";
    if ("custom" == height) {
      columnHeightStyle = customHeight + "px !important";
    }

    return [
      <BlockControls key="controls">
        <AlignmentToolbar
          value={blockAlign}
          onChange={(value) => setAttributes({ blockAlign: value })}
        />
      </BlockControls>,
      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,
      <Fragment>
        {backgroundType == "image" && backgroundImage && (
          <Style>
            {`
	  #block-${blockId} .background-type-image{
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
	 
	  `}
          </Style>
        )}
        <Style>
          {`
	  #block-${blockId} .skt-blocks-block-columns.overlay-type-color{
	    background-color: ${hexToRgba(
        backgroundImageColor || "#fff",
        imgopacity || 0
      )};
	  }
	  #block-${blockId} .skt-blocks-block-columns.overlay-type-gradient.linear{
	    background-image: linear-gradient(${gradientOverlayAngle}deg, ${hexToRgba(
            gradientOverlayColor1 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation1}%, ${hexToRgba(
            gradientOverlayColor2 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation2}%);
	  }
	  #block-${blockId} .skt-blocks-block-columns.overlay-type-gradient.radial{
	    background-image: radial-gradient( at ${gradientOverlayPosition}, ${hexToRgba(
            gradientOverlayColor1 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation1}%, ${hexToRgba(
            gradientOverlayColor2 || "#fff",
            imgopacity || 0
          )} ${gradientOverlayLocation2}%);
	  }
	  #block-${blockId} .skt-blocks-block-column{
          min-height: ${columnHeightStyle};
          align-items: ${verticalAlign};
}       
@media only screen and (min-width: 976px){
               #block-${blockId} .skt-blocks-block-columns{
                  padding-top: ${topPadding}px;
                  padding-bottom: ${bottomPadding}px;
                  padding-left: ${leftPadding}px;
                  padding-right: ${rightPadding}px;
                  margin-top: ${topMargin}px;
                  margin-bottom: ${bottomMargin}px;
               }
             }
             @media only screen and (max-width: 976px){
               #block-${blockId} .skt-blocks-block-columns{
                  padding-top: ${topPaddingTablet}px;
                  padding-bottom: ${bottomPaddingTablet}px;
                  padding-left: ${leftPaddingTablet}px;
                  padding-right: ${rightPaddingTablet}px;
                  margin-top: ${topMarginTablet}px;
                  margin-bottom: ${bottomMarginTablet}px;
               }
             }
             @media only screen and (max-width: 767px){
               #block-${blockId} .skt-blocks-block-columns{
                  padding-top: ${topPaddingMobile}px;
                  padding-bottom: ${bottomPaddingMobile}px;
                  padding-left: ${leftPaddingMobile}px;
                  padding-right: ${rightPaddingMobile}px;
                  margin-top: ${topMarginMobile}px;
                  margin-bottom: ${bottomMarginMobile}px;
               }
             }  

  `}
        </Style>
      </Fragment>,
      // Show the block markup in the editor
      <div
        className={classnames(
          backgroundType == "image" ? "background-type-image" : ""
        )}
        style={{ zIndex: z_index }}
      >
        <div
          className={classnames(
            "skt-blocks-block-columns",
            "responsive-columns-wrap",
            `responsive-columns__gap-${columnGap}`,
            `responsive-columns__stack-${stack}`,
            `responsive-columns__content-width-${contentWidth}`,
            `overlay-type-${overlayType}`,
            `${gradientOverlayType}`,
            `align${align}`
          )}
          style={{
            textAlign: blockAlign,
            borderWidth: generateCSSUnit(blockBorderWidth, "px"),
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
            className={classnames(
              "responsive-columns-inner-wrap",
              `responsive-columns-columns-${columns}`
            )}
            style={{ maxWidth: max_width }}
          >
            <InnerBlocks
              template={getColumnsTemplate(columns)}
              templateLock="all"
              allowedBlocks={ALLOWED_BLOCKS}
            />
          </div>
        </div>
      </div>,
    ];
  }
}
