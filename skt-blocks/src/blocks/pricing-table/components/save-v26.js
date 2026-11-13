/**
 * Internal dependencies
 */
import classnames from "classnames";
import map from "lodash/map";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import generateCSSUnit from "../../../generateCSSUnit";
import Style from "style-it";
import { hexToRgba } from "../../../utils";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { InnerBlocks, RichText } = wp.editor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      pricingTable,
      contentAlign,
      count,
      gutter,
      title,
      amount,
      features,
      textColor,
      titleColor,
      prefixColor,
      priceColor,
      suffixColor,
      subpriceColor,
      featuresColor,
      itemBackgroundColor,
      buttonTarget,
      blockBorderStyle,
      blockBorderWidth,
      blockBorderRadius,
      blockBorderColor,
      sectionTag,
      backgroundColor,
      backgroundColor1,
      backgroundColor2,
      colorLocation1,
      colorLocation2,
      gradientDirection,
      backgroundType,
      backgroundImage,
      opacity,
      boxShadowColor,
      boxShadowHOffset,
      boxShadowVOffset,
      boxShadowBlur,
      boxShadowSpread,
      boxShadowPosition,
      buttonBoxShadowColor,
      buttonBoxShadowHOffset,
      buttonBoxShadowVOffset,
      buttonBoxShadowBlur,
      buttonBoxShadowSpread,
      buttonBoxShadowPosition,
      blockbackgroundColor,
      blockbackgroundColor1,
      blockbackgroundColor2,
      blockcolorLocation1,
      blockcolorLocation2,
      blockgradientDirection,
      blockbackgroundType,
      blockbackgroundImage,
      blockopacity,
      ctaColor,
      ctaBackColor,
      ctaHoverColor,
      ctaHoverBackColor,
      ctaBorderColor,
      ctaBorderRadius,
      ctaBorderWidth,
      ctaBorderStyle,
      ctaHpadding,
      ctaVpadding,
      buttonbackgroundType,
      buttongradientDirection,
      buttoncolorLocation1,
      buttoncolorLocation2,
      buttonbackgroundColor1,
      buttonbackgroundColor2,
      buttonHbackgroundType,
      buttonHgradientDirection,
      buttonHcolorLocation1,
      buttonHcolorLocation2,
      buttonHbackgroundColor1,
      buttonHbackgroundColor2,

      titleFontFamily,
      titleFontSize,
      titleFontWeight,
      titleLineHeight,
      amountFontFamily,
      amountFontSize,
      amountFontWeight,
      amountLineHeight,
      prefixFontFamily,
      prefixFontSize,
      prefixFontWeight,
      prefixLineHeight,
      suffixFontFamily,
      suffixFontSize,
      suffixFontWeight,
      suffixLineHeight,
      subpriceFontFamily,
      subpriceFontSize,
      subpriceFontWeight,
      subpriceLineHeight,
      subpriceTextTransform,
      featuresFontFamily,
      featuresFontSize,
      featuresFontWeight,
      featuresLineHeight,
      ctaFontFamily,
      ctaFontSize,
      ctaFontWeight,
      ctaLineHeight,
      blockTopPadding,
      blockBottomPadding,
      blockLeftPadding,
      blockRightPadding,
      columnTopPadding,
      columnBottomPadding,
      columnLeftPadding,
      columnRightPadding,
      blockBackColorOpacity,
      columnBackColorOpacity,
      showImage,
      showTitle,
      showPrefix,
      showPrice,
      showSuffix,
      showSubprice,
      showFeatures,
      showButton,
      titleSpace,
      priceSpace,
      subpriceSpace,
      buttonSpace,
      featuresSpace,
      blockAlign,
      imageSize,
      imageShape,
      imageWidth,
      blockId,
    } = this.props.attributes;
    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }
    var buttonBoxShadowPositionCSS = buttonBoxShadowPosition;

    if ("outset" === buttonBoxShadowPosition) {
      buttonBoxShadowPositionCSS = "";
    }
    let imgopacity = opacity / 100;
    let blockimgopacity = blockopacity / 100;
    let blockbackcoloropacity = blockBackColorOpacity / 100;
    let columnbackcoloropacity = columnBackColorOpacity / 100;
    const classes = classnames({
      [`has-text-align-${contentAlign}`]: contentAlign,
    });

    const innerClasses = classnames(
      "wp-block-skt-blocks-pricing-table__inner",
      {
        "has-columns": count > 1,
        [`has-${count}-columns`]: count,
        "has-responsive-columns": count > 1,
        [`has-${gutter}-gutter`]: gutter,
      }
    );

    let alignStyle = "center";
    if ("left" == blockAlign) {
      alignStyle = "flex-start";
    }
    if ("right" == blockAlign) {
      alignStyle = "flex-end";
    }

    return [
      <Fragment>
        <Style>
          {`
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button {
                color: ${ctaColor} !important;
                display:block;
            }
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button:hover {
                color: ${ctaHoverColor} !important;
            }
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId}.background-type-image{
	      background-image: linear-gradient(${hexToRgba(
          "#fff",
          1 - imgopacity || 0
        )},${hexToRgba("#fff", 1 - imgopacity || 0)}),url(${backgroundImage});
          background-position: center center;
          background-attachment: scroll;
          background-repeat: no-repeat;
          background-size: cover;

	  }

      `}
        </Style>
        {buttonHbackgroundType == "color" && (
          <Style>
            {`
      .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button:hover {
                background-color: ${ctaHoverBackColor} ;
      }
      `}
          </Style>
        )}
        {buttonbackgroundType == "color" && (
          <Style>
            {`
      .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button {
                background-color: ${ctaBackColor} ;
      }


        `}
          </Style>
        )}
        {buttonbackgroundType == "gradient" && (
          <Style>
            {`
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button {
                background-image: linear-gradient(${buttongradientDirection}deg, ${buttonbackgroundColor1} ${buttoncolorLocation1}%, ${buttonbackgroundColor2} ${buttoncolorLocation2}%);
              }

	`}
          </Style>
        )}
        {buttonHbackgroundType == "gradient" && (
          <Style>
            {`
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button:hover {
                background-image: linear-gradient(${buttonHgradientDirection}deg, ${buttonHbackgroundColor1} ${buttonHcolorLocation1}%, ${buttonHbackgroundColor2} ${buttonHcolorLocation2}%);
              }

	`}
          </Style>
        )}
      </Fragment>,
      <div
        className={classnames(
          classes,
          "wp-block-skt-blocks-pricing-table",
          "image-shape-" + imageShape
        )}
        style={{
          textAlign: blockAlign,
          paddingTop: blockTopPadding,
          paddingBottom: blockBottomPadding,
          paddingLeft: blockLeftPadding,
          paddingRight: blockRightPadding,

          backgroundColor:
            blockbackgroundType == "color"
              ? `${hexToRgba(blockbackgroundColor || "#fff", 0)}`
              : "",
          opacity: blockbackgroundType == "color" ? blockBackColorOpacity : 100,
          backgroundImage:
            blockbackgroundType == "gradient"
              ? generateBackgroundImageEffect(
                  blockbackgroundColor1,
                  blockbackgroundColor2,
                  blockgradientDirection,
                  blockcolorLocation1,
                  blockcolorLocation2
                )
              : undefined,
        }}
      >
        <div className="skt-blocks-pricing-table-background-image-wrap">
          {blockbackgroundImage && (
            <img
              className={classnames(
                "skt-blocks-pricing-table-background-image"
              )}
              src={blockbackgroundImage}
              style={{ height: 100 + "%", opacity: blockimgopacity }}
            />
          )}
        </div>
        <div className={innerClasses}>
          {pricingTable.map((test, index) => (
            <Fragment>
              <div
                className={classnames(
                  "wp-block-skt-blocks-pricing-table-item",
                  `skt-blocks-${blockId}`,
                  backgroundType == "image" ? "background-type-image" : ""
                )}
                style={{
                  paddingTop: columnTopPadding,
                  paddingBottom: columnBottomPadding,
                  paddingLeft: columnLeftPadding,
                  paddingRight: columnRightPadding,

                  color: textColor,
                  backgroundColor: itemBackgroundColor,
                  borderWidth: blockBorderWidth,
                  borderColor: blockBorderColor,
                  borderStyle: blockBorderStyle,
                  borderRadius: blockBorderRadius,
                  backgroundColor:
                    backgroundType == "color"
                      ? `${hexToRgba(
                          backgroundColor || "#fff",
                          columnbackcoloropacity || 0
                        )}`
                      : "#eee",
                  backgroundImage:
                    backgroundType == "gradient"
                      ? generateBackgroundImageEffect(
                          `${hexToRgba(
                            backgroundColor1 || "#fff",
                            columnbackcoloropacity || 0
                          )}`,
                          `${hexToRgba(
                            backgroundColor2 || "#fff",
                            columnbackcoloropacity || 0
                          )}`,
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
                {pricingTable[index]["img_url"] && showImage && (
                  <div className="skt-blocks-pricing-image-wrap">
                    <img
                      className="skt-blocks-pricing-image"
                      src={
                        pricingTable[index]["img_url"].sizes[imageSize]
                          ? pricingTable[index]["img_url"].sizes[imageSize].url
                          : pricingTable[index]["img_url"].sizes["full"].url
                      }
                      width={imageWidth}
                      alt="avatar"
                    />
                  </div>
                )}

                {showTitle && (
                  <RichText.Content
                    tagName="span"
                    className="wp-block-skt-blocks-pricing-table-item__title"
                    value={pricingTable[index]["title"]}
                    style={{
                      color: titleColor,
                      fontSize: titleFontSize,
                      lineHeight: titleLineHeight,
                      fontWeight: titleFontWeight,
                      fontFamily: titleFontFamily,
                      marginBottom: titleSpace,
                    }}
                  />
                )}

                <div
                  className={
                    "wp-block-skt-blocks-pricing-table-item__price-wrapper"
                  }
                  style={{
                    marginBottom: priceSpace,
                    justifyContent: alignStyle,
                  }}
                >
                  {showPrefix && (
                    <RichText.Content
                      tagName="p"
                      className="wp-block-skt-blocks-pricing-table-item__currency"
                      value={pricingTable[index]["currency"]}
                      style={{
                        color: prefixColor,
                        lineHeight: prefixLineHeight,
                        fontWeight: prefixFontWeight,
                        fontSize: prefixFontSize,
                        fontFamily: prefixFontFamily,
                      }}
                    />
                  )}
                  {showPrice && (
                    <RichText.Content
                      tagName="p"
                      className="wp-block-skt-blocks-pricing-table-item__amount"
                      value={pricingTable[index]["amount"]}
                      style={{
                        color: priceColor,
                        fontSize: amountFontSize,
                        lineHeight: amountLineHeight,
                        fontWeight: amountFontWeight,
                        fontFamily: amountFontFamily,
                      }}
                    />
                  )}
                  {showSuffix && (
                    <RichText.Content
                      tagName="p"
                      className="wp-block-skt-blocks-pricing-table-item__price_suffix"
                      value={pricingTable[index]["price_suffix"]}
                      style={{
                        color: suffixColor,
                        fontSize: suffixFontSize,
                        lineHeight: suffixLineHeight,
                        fontWeight: suffixFontWeight,
                        fontFamily: suffixFontFamily,
                      }}
                    />
                  )}
                </div>
                {showSubprice && (
                  <RichText.Content
                    tagName="p"
                    className="wp-block-skt-blocks-pricing-table-item__sub_price"
                    value={pricingTable[index]["sub_price"]}
                    style={{
                      color: subpriceColor,
                      lineHeight: subpriceLineHeight,
                      fontWeight: subpriceFontWeight,
                      textTransform: subpriceTextTransform,
                      fontSize: subpriceFontSize,
                      fontFamily: subpriceFontFamily,
                      marginBottom: subpriceSpace,
                    }}
                  />
                )}

                {showFeatures && (
                  <RichText.Content
                    tagName="ul"
                    className="wp-block-skt-blocks-pricing-table-item__features"
                    value={pricingTable[index]["features"]}
                    style={{
                      color: featuresColor,
                      fontSize: featuresFontSize,
                      marginBottom: featuresSpace,
                      lineHeight: featuresLineHeight,
                      fontWeight: featuresFontWeight,
                      fontFamily: featuresFontFamily,
                    }}
                  />
                )}
                {showButton && (
                  <a
                    href={pricingTable[index]["buttonURL"]}
                    target={buttonTarget ? "_blank" : null}
                    rel={buttonTarget ? "noopener noreferrer" : null}
                    className={classnames(
                      "wp-block-skt-blocks-pricing-table-item__button"
                    )}
                    style={{
                      marginLeft: "left" == blockAlign ? 0 : "",
                      marginRight: "right" == blockAlign ? 0 : "",
                      marginBottom: buttonSpace,
                      paddingLeft: ctaHpadding,
                      paddingRight: ctaHpadding,
                      paddingTop: ctaVpadding,
                      paddingBottom: ctaVpadding,
                      borderColor: ctaBorderColor,
                      borderRadius: ctaBorderRadius,
                      borderWidth: ctaBorderWidth,
                      borderStyle: ctaBorderStyle,
                      lineHeight: ctaLineHeight,
                      fontWeight: ctaFontWeight,
                      fontSize: ctaFontSize,
                      fontFamily: ctaFontFamily,
                      boxShadow:
                        generateCSSUnit(buttonBoxShadowHOffset, "px") +
                        " " +
                        generateCSSUnit(buttonBoxShadowVOffset, "px") +
                        " " +
                        generateCSSUnit(buttonBoxShadowBlur, "px") +
                        " " +
                        generateCSSUnit(buttonBoxShadowSpread, "px") +
                        " " +
                        buttonBoxShadowColor +
                        " " +
                        buttonBoxShadowPositionCSS,
                    }}
                  >
                    <RichText.Content value={pricingTable[index]["button"]} />
                  </a>
                )}
                <InnerBlocks.Content />
              </div>
            </Fragment>
          ))}
        </div>
      </div>,
    ];
  }
}
