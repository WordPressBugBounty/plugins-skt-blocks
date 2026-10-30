/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import times from "lodash/times";
import renderSVG from "../../../renderIcon";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import React from "react";
import Style from "style-it";
import { hexToRgba } from "../../../utils/index.js";
import generateCSSUnit from "../../../generateCSSUnit";

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component } = wp.element;
const { withSelect } = wp.data;
const { RichText, InnerBlocks, BlockControls, AlignmentToolbar } = wp.editor;
const { Button, Dashicon, Icon } = wp.components;
import memoize from "memize";
import map from "lodash/map";
import { loadGoogleFont } from "../../../utils/font";
import { inherited, previewSuffix } from "./responsive-utils";

const getCount = memoize((count) => {
  return times(count, (index) => [
    "skt-blocks/count-up",
    {
      placeholder: sprintf(
        /* translators: %d: a digit 1-3 */
        __("Title %d", "skt-blocks"),
        parseInt(index + 1)
      ),
    },
  ]);
});

let svg_icons = Object.keys(ResponsiveBlocksIcon);

class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        countUp,
        count,
        gutter,
        contentAlign,
        textColor,
        itemBackgroundColor,
        dateLineHeight,
        dateFontWeight,
        dateFontSize,
        dateFontFamily,
        headingLineHeight,
        titleFontWeight,
        headingFontFamily,
        headingFontSize,
        headingFontSizeMobile,
        headingFontSizeTablet,
        contentFontFamily,
        contentLineHeight,
        contentFontWeight,
        contentFontSize,
        icon,
        resshowIcon,
        resshowTitle,
        resshowDesc,
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
        resshowNum,
        iconStyle,
        iconShapeColor,
        shapeBorderRadius,
        shapePadding,
        shapeBorder,
        hideDesktop,
        hideTablet,
        hideMobile,
      },
      setAttributes,
    } = this.props;

    // Live preview: spacing for the editor's current preview device
    // (Desktop / Tablet / Mobile). Mobile falls back to Tablet, then Desktop.
    const sfx = previewSuffix(this.props.deviceType);
    const contentSpacing = inherited(this.props.attributes, "contentSpacing", sfx);
    const iconSpacing = inherited(this.props.attributes, "iconSpacing", sfx);
    const titleSpace = inherited(this.props.attributes, "titleSpace", sfx);
    const numSpace = inherited(this.props.attributes, "numSpace", sfx);
    const contentSpace = inherited(this.props.attributes, "contentSpace", sfx);
    var data_copy = [...countUp];

    setAttributes({ counterId: this.props.clientId });

    const classes = classnames("responsive-count", {
      [`has-text-align-${contentAlign}`]: contentAlign,
      "skt-countup-hide": hideDesktop || hideTablet || hideMobile,
      "skt-hide-desktop": hideDesktop,
      "skt-hide-tablet": hideTablet,
      "skt-hide-mobile": hideMobile,
    });

    const formattingControls = ["bold", "italic", "strikethrough"];

    let imgopacity = opacity / 100;

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={contentAlign}
          onChange={(value) => setAttributes({ contentAlign: value })}
        />
      </BlockControls>,

      // Show the block controls on focus

      <Inspector {...{ setAttributes, ...this.props }} />,
      <style key="countup-nolist" dangerouslySetInnerHTML={{ __html: `
        .responsive-count-item__features,
        .responsive-count-item__features ul,
        .responsive-count-item__features li {
          list-style: none !important;
          list-style-type: none !important;
          margin: 0;
          padding: 0;
        }
      ` }} />,
      <Style>
        {`
      .skt-blocks-countup-${counterId}.responsive-count__inner .responsive-count-item__features,
      .skt-blocks-countup-${counterId}.responsive-count__inner .responsive-count-item__features ul,
      .skt-blocks-countup-${counterId}.responsive-count__inner .responsive-count-item__features li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
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
      .skt-blocks-countup-${counterId}.responsive-count__inner .skt-blocks-count-up__source-wrap:has(> .skt-blocks-count-up__source-icon:empty) {
        display: none;
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
        {" "}
        <div
          className={classnames(
            `skt-blocks-countup-${counterId}`,
            "responsive-count__inner"
          )}
        >
          {dateFontFamily && loadGoogleFont(dateFontFamily)}
          {headingFontFamily && loadGoogleFont(headingFontFamily)}
          {contentFontFamily && loadGoogleFont(contentFontFamily)}
          {countUp.map((test, index) => (
            <div
              key={index}
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
              {resshowTitle && (
                <RichText
                  tagName="span"
                  identifier={"countTitle-" + index}
                  className="responsive-count-item__title"
                  value={countUp[index]["title"]}
                  placeholder={countUp[index]["title"]}
                  onChange={(value) => {
                    var new_content = {
                      title: value,
                      amount: data_copy[index]["amount"],
                      features: data_copy[index]["features"],
                      icon: data_copy[index]["icon"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ countUp: data_copy });
                  }}
                  style={{
                    color: titleColor,
                    lineHeight: headingLineHeight,
                    fontFamily: headingFontFamily,
                    fontWeight: titleFontWeight,
                    marginBottom: titleSpace,
                  }}
                  formattingControls={formattingControls}
                  keepPlaceholderOnFocus
                />
              )}
              {resshowNum && (
                <div className="responsive-count-item__price-wrapper">
                  <RichText
                    tagName="div"
                    identifier={"countAmount-" + index}
                    className="responsive-count-item__amount"
                    style={{
                      color: numColor,
                      lineHeight: dateLineHeight,
                      fontWeight: dateFontWeight,
                      fontSize: dateFontSize,
                      fontFamily: dateFontFamily,
                      marginBottom: numSpace,
                    }}
                    data-duration="1000"
                    data-delay="16"
                    placeholder={countUp[index]["amount"]}
                    value={countUp[index]["amount"]}
                    onChange={(value) => {
                      var new_content = {
                        title: data_copy[index]["title"],
                        amount: value,
                        features: data_copy[index]["features"],
                        icon: data_copy[index]["icon"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ countUp: data_copy });
                    }}
                    formattingControls={formattingControls}
                    keepPlaceholderOnFocus
                  />
                </div>
              )}
              {resshowDesc && (
                <RichText
                  tagName="ul"
                  identifier={"countFeatures-" + index}
                  multiline="li"
                  className="responsive-count-item__features"
                  value={countUp[index]["features"]}
                  placeholder={__(
                    "Description",
                    "skt-blocks"
                  )}
                  onChange={(value) => {
                    var new_content = {
                      title: data_copy[index]["title"],
                      amount: data_copy[index]["amount"],
                      features: value,
                      icon: data_copy[index]["icon"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ countUp: data_copy });
                  }}
                  style={{
                    color: textColor,
                    lineHeight: contentLineHeight,
                    fontWeight: contentFontWeight,
                    fontSize: contentFontSize,
                    fontFamily: contentFontFamily,
                    marginBottom: contentSpace,
                    listStyle: "none",
                    listStyleType: "none",
                    marginLeft: 0,
                    paddingLeft: 0,
                  }}
                  keepPlaceholderOnFocus
                />
              )}
            </div>
          ))}
        </div>
      </div>,
    ];
  }
}

// Re-render the editor preview whenever the preview device changes.
export default withSelect((select) => {
  let deviceType = "Desktop";
  try {
    const editor = select("core/editor");
    if (editor && editor.getDeviceType) {
      deviceType = editor.getDeviceType();
    } else {
      const editPost = select("core/edit-post");
      if (editPost && editPost.__experimentalGetPreviewDeviceType) {
        deviceType = editPost.__experimentalGetPreviewDeviceType();
      }
    }
  } catch (e) {}
  return { deviceType };
})(Edit);
