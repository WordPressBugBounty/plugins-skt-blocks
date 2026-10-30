/**
 * Internal dependencies
 */
import classnames from "classnames";
import map from "lodash/map";
import renderSVG from "../../../renderIcon";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import React from "react";
import Style from "style-it";
import { hexToRgba } from "../../../utils/index.js";
import generateCSSUnit from "../../../generateCSSUnit";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { InnerBlocks, RichText } = wp.editor;
const { Button, Dashicon, Icon } = wp.components;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      countUp,
      contentAlign,
      count,
      gutter,
      title,
      amount,
      features,
      textColor,
      itemBackgroundColor,
      dateLineHeight,
      dateFontWeight,
      dateFontSize,
      dateFontFamily,
      headingFontFamily,
      headingLineHeight,
      titleFontWeight,
      headingFontSize,
      headingFontSizeMobile,
      headingFontSizeTablet,
      contentFontFamily,
      contentLineHeight,
      contentFontWeight,
      contentFontSize,
      resshowIcon,
      resshowTitle,
      resshowDesc,
      icon,
      blockBorderStyle,
      blockBorderWidth,
      blockBorderRadius,
      blockBorderColor,
      opacity,
      icon_color,
      counterId,
      iconsize,
      numColor,
      titleColor,
      titleSpace,
      numSpace,
      contentSpace,
      resshowNum,
      iconStyle,
      iconShapeColor,
      shapeBorderRadius,
      shapePadding,
      shapeBorder,
      contentSpacing,
      iconSpacing,
      hideDesktop,
      hideTablet,
      hideMobile,
    } = this.props.attributes;

    // Tablet / Mobile spacing: CSS variables + classes used by media queries in
    // style.scss. Nothing is output when no Tablet/Mobile value is set, so
    // existing blocks keep their saved markup.
    const attrs = this.props.attributes;
    const px = (v) => (v || v === 0 ? v + "px" : undefined);
    const has = (v) => v || v === 0;

    const classes = classnames({
      [`has-text-align-${contentAlign}`]: contentAlign,
      "skt-countup-hide": hideDesktop || hideTablet || hideMobile,
      "skt-hide-desktop": hideDesktop,
      "skt-hide-tablet": hideTablet,
      "skt-hide-mobile": hideMobile,
      "has-cu-pad-tablet": has(attrs.contentSpacingTablet),
      "has-cu-pad-mobile": has(attrs.contentSpacingMobile),
      "has-cu-icon-tablet": has(attrs.iconSpacingTablet),
      "has-cu-icon-mobile": has(attrs.iconSpacingMobile),
      "has-cu-title-tablet": has(attrs.titleSpaceTablet),
      "has-cu-title-mobile": has(attrs.titleSpaceMobile),
      "has-cu-num-tablet": has(attrs.numSpaceTablet),
      "has-cu-num-mobile": has(attrs.numSpaceMobile),
      "has-cu-desc-tablet": has(attrs.contentSpaceTablet),
      "has-cu-desc-mobile": has(attrs.contentSpaceMobile),
    });

    let imgopacity = opacity / 100;

    return [
      <Style type="text/css">
        {`
		  .skt-blocks-countup-${counterId}.responsive-count__inner .responsive-count-item__features li {
			  line-height: ${contentLineHeight};
		  }
		  .skt-blocks-countup-${counterId}.responsive-count__inner .skt-blocks-count-up__source-wrap.res-countup-icon-design-shaped .skt-blocks-count-up__source-icon {
			  background-color: ${iconShapeColor};
			  border-radius: ${generateCSSUnit(shapeBorderRadius, "px")};
			  padding: ${generateCSSUnit(shapePadding, "px")};
		  }
		  .skt-blocks-countup-${counterId}.responsive-count__inner .skt-blocks-count-up__source-wrap.res-countup-icon-design-outline .skt-blocks-count-up__source-icon {
			  border-color: ${iconShapeColor};
			  border-radius: ${generateCSSUnit(shapeBorderRadius, "px")};
			  padding: ${generateCSSUnit(shapePadding, "px")};
			  border-width: ${generateCSSUnit(shapeBorder, "px")};
		  }
		  .skt-blocks-countup-${counterId}.responsive-count__inner .skt-blocks-count-up__source-icon svg{
		    width: ${iconsize}px;
		    height: ${iconsize}px;
		    fill: ${icon_color};
		  }
  	  `}
      </Style>,
      <Style>
        {`
@media only screen and (min-width: 976px){
.skt-blocks-countup-${counterId}.responsive-count__inner .responsive-count-item__title {
	font-size: ${headingFontSize}px ;
		}
}
@media only screen and (max-width: 976px){
.skt-blocks-countup-${counterId}.responsive-count__inner .responsive-count-item__title {
	font-size: ${headingFontSizeTablet}px;
		}
}
@media only screen and (max-width: 767px){
	.skt-blocks-countup-${counterId}.responsive-count__inner .responsive-count-item__title {
	font-size: ${headingFontSizeMobile}px;
		}
}
`}
      </Style>,
      <div
        className={classes}
        style={{
          padding: contentSpacing,
          "--cu-pad-tablet": px(attrs.contentSpacingTablet),
          "--cu-pad-mobile": px(attrs.contentSpacingMobile),
          "--cu-icon-tablet": px(attrs.iconSpacingTablet),
          "--cu-icon-mobile": px(attrs.iconSpacingMobile),
          "--cu-title-tablet": px(attrs.titleSpaceTablet),
          "--cu-title-mobile": px(attrs.titleSpaceMobile),
          "--cu-num-tablet": px(attrs.numSpaceTablet),
          "--cu-num-mobile": px(attrs.numSpaceMobile),
          "--cu-desc-tablet": px(attrs.contentSpaceTablet),
          "--cu-desc-mobile": px(attrs.contentSpaceMobile),
        }}
      >
        <div
          className={classnames(
            `skt-blocks-countup-${counterId}`,
            "responsive-count__inner"
          )}
        >
          {countUp.map((test, index) => (
            <div
              className={classnames("responsive-count-item")}
              style={{
                backgroundColor: `${hexToRgba(
                  itemBackgroundColor || "#ffffff",
                  imgopacity || 0
                )}`,
                borderWidth: blockBorderWidth,
                borderColor: blockBorderColor,
                borderStyle: blockBorderStyle,
                borderRadius: blockBorderRadius,
              }}
            >
              {resshowIcon && (
                <div
                  className={classnames(
                    "skt-blocks-count-up__source-wrap",
                    `res-countup-icon-design-${iconStyle}`
                  )}
                  style={{
                    marginBottom: iconSpacing,
                  }}
                >
                  <div className="skt-blocks-count-up__source-icon">
                    {renderSVG(countUp[index]["icon"])}
                  </div>
                </div>
              )}
              {resshowTitle && countUp[index]["title"] && (
                <RichText.Content
                  tagName="span"
                  className="responsive-count-item__title"
                  value={countUp[index]["title"]}
                  style={{
                    color: titleColor,
                    lineHeight: headingLineHeight,
                    fontFamily: headingFontFamily,
                    fontWeight: titleFontWeight,
                    marginBottom: titleSpace,
                  }}
                />
              )}
              {resshowNum && countUp[index]["amount"] && (
                <div className={"responsive-count-item__price-wrapper"}>
                  <RichText.Content
                    tagName="div"
                    className="responsive-count-item__amount"
                    value={countUp[index]["amount"]}
                    data-duration="1000"
                    data-delay="16"
                    style={{
                      color: numColor,
                      lineHeight: dateLineHeight,
                      fontWeight: dateFontWeight,
                      fontSize: dateFontSize,
                      fontFamily: dateFontFamily,
                      marginBottom: numSpace,
                    }}
                  />
                </div>
              )}
              {resshowDesc && countUp[index]["features"] && (
                <RichText.Content
                  tagName="ul"
                  className="responsive-count-item__features"
                  value={countUp[index]["features"]}
                  style={{
                    color: textColor,
                    lineHeight: contentLineHeight,
                    fontWeight: contentFontWeight,
                    fontSize: contentFontSize,
                    fontFamily: contentFontFamily,
                    marginBottom: contentSpace,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>,
    ];
  }
}
