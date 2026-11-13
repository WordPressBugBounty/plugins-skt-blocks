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
    } = this.props.attributes;

    const classes = classnames({
      [`has-text-align-${contentAlign}`]: contentAlign,
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
