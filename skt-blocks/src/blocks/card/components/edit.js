/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import times from "lodash/times";
import generateCSSUnit from "../../../generateCSSUnit";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../renderIcon";
import React from "react";
import Style from "style-it";
import { hexToRgba } from "../../../utils/index.js";

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Dashicon, Icon, Button } = wp.components;
const {
  RichText,
  InnerBlocks,
  MediaUpload,
  MediaUploadCheck,
  ButtonEditHelper,
  URLInput,
  figure,
  onUploadImage,
  BlockControls,
  AlignmentToolbar,
} = wp.editor;
import memoize from "memize";
import map from "lodash/map";
import { loadGoogleFont } from "../../../utils/font";

const ALLOWED_MEDIA_TYPES = ["image"];
const ALLOWED_BLOCKS = ["core/button"];
const TEMPLATE = [
  [
    "core/button",
    { placeholder: __("Buy Now", "skt-blocks") },
  ],
];

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        cardsArray,
        count,
        gutter,
        contentAlignment,
        textColor,
        itemBackgroundColor,
        borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        titleSpace,
        subtitleSpace,
        contentSpace,
        buttonSpace,
        buttonColor,
        buttonTextColor,
        stack,
        opacity,
        resshowImage,
        imageopacity,
        backgroundType,
        backgroundImage,
        gradientDirection,
        colorLocation1,
        colorLocation2,
        backgroundColor1,
        backgroundColor2,
        imageSize,
        imagePosition,
        imageRepeat,
        thumbsize,
        imageheight,
        blockzindex,
        blockmargin,
        icon,
        iconPosition,
        icon_color,
        counterId,
        buttonhColor,
        buttonhTextColor,
        butopacity,
        vPadding,
        hPadding,
        vMargin,
        hMargin,
        butborderWidth,
        butborderRadius,
        butborderStyle,
        buttonSize,
        buttonbackgroundType,
        buttongradientDirection,
        buttoncolorLocation1,
        buttoncolorLocation2,
        buttonbackgroundColor1,
        buttonbackgroundColor2,
        icon_hcolor,
        subLineHeight,
        subFontWeight,
        subFontSize,
        subFontFamily,
        headingFontFamily,
        headingLineHeight,
        headingFontWeight,
        headingFontSize,
        contentFontFamily,
        contentLineHeight,
        contentFontWeight,
        contentFontSize,
        contenttopSpace,
        blockbotmargin,
        blockleftmargin,
        blockrightmargin,
        bgimageSize,
        bgimagePosition,
        bgimageRepeat,
        bgthumbsize,
        buttonTarget,
      },
      setAttributes,
    } = this.props;

    setAttributes({ counterId: this.props.clientId });

    var data_copy = [...cardsArray];

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    const formattingControls = ["bold", "italic", "strikethrough"];

    let imgopacity = opacity / 100;

    let buttonopacity = butopacity / 100;

    const dimRatioToClass = (ratio) => {
      return 0 === ratio || 50 === ratio
        ? null
        : "has-background-dim-" + 10 * Math.round(ratio / 10);
    };

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={contentAlignment}
          onChange={(value) => setAttributes({ contentAlignment: value })}
        />
      </BlockControls>,
      // Show the block controls on focus

      <Inspector {...{ setAttributes, ...this.props }} />,
      <Fragment>
        <Style>
          {`
		  .skt-blocks-${counterId} .skt-blocks-card-button-inner .res-button, .wp-block-cover .skt-blocks-${counterId} .skt-blocks-card-button-inner .res-button {
			  color: ${buttonTextColor};
		  }
		  .skt-blocks-${counterId} .skt-blocks-card-button-inner .res-button:hover, .wp-block-cover .skt-blocks-${counterId} .skt-blocks-card-button-inner .res-button:hover {
			  color: ${buttonhTextColor};
		  }
		  .skt-blocks-${counterId} .skt-blocks-card-button-inner .skt-blocks-button__icon svg{
			  fill: ${icon_color};
		  }
		  .skt-blocks-${counterId} .skt-blocks-card-button-inner:hover .skt-blocks-button__icon svg{
			  fill: ${icon_hcolor};
		  }
	  `}
        </Style>
        {buttonbackgroundType == "color" && (
          <Style>
            {`
			  .skt-blocks-${counterId} .skt-blocks-card-button-inner{
	  			background-color: ${hexToRgba(buttonColor || "#2091e1", buttonopacity || 0)};
	  		}
	  		.skt-blocks-${counterId} .skt-blocks-card-button-inner:hover{
	  			background-color: ${buttonhColor};
	  		}
	`}
          </Style>
        )}
      </Fragment>,
      <div
        className={classnames(
          `skt-blocks-${counterId}`,
          `responsive-columns__stack-${stack}`
        )}
        style={{
          marginBottom: blockbotmargin,
          marginTop: blockmargin,
          marginLeft: blockleftmargin,
          marginRight: blockrightmargin,
          zIndex: blockzindex,
        }}
      >
        {" "}
        <div
          className={classnames(
            "wp-block-skt-blocks-card__inner"
          )}
        >
          {cardsArray.map((test, index) => (
            <div
              className={classnames(
                "wp-block-skt-blocks-card-item"
              )}
              style={{
                borderColor: borderColor,
                borderStyle: borderStyle,
                borderWidth: borderWidth,
                borderRadius: borderRadius,
                color: textColor,
                backgroundColor:
                  backgroundType == "color"
                    ? `${hexToRgba(
                        itemBackgroundColor || "#fff",
                        imgopacity || 0
                      )}`
                    : undefined,
                backgroundImage:
                  backgroundType == "gradient"
                    ? generateBackgroundImageEffect(
                        backgroundColor1,
                        backgroundColor2,
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
              {"image" == backgroundType && backgroundImage && (
                <div className="skt-blocks-card-background-image-wrap">
                  <div
                    className={classnames(
                      "skt-blocks-card-background-image",
                      dimRatioToClass(imageopacity),
                      {
                        "has-background-dim": 0 !== imageopacity,
                      }
                    )}
                    style={{
                      backgroundImage: backgroundImage
                        ? `url(${backgroundImage.url})`
                        : null,
                      height: 100 + "%",
                      backgroundPosition: bgimagePosition,
                      backgroundRepeat: bgimageRepeat,
                      backgroundSize: bgthumbsize,
                    }}
                  ></div>
                </div>
              )}
              {resshowImage && (
                <div
                  className={classnames(
                    "skt-blocks-card-avatar"
                  )}
                  style={{
                    height: imageheight,
                  }}
                >
                  {cardsArray[index]["image"] && (
                    <div
                      className="skt-blocks-card-avatar-img"
                      style={{
                        backgroundImage: `url(${
                          cardsArray[index]["image"].sizes[imageSize]
                            ? cardsArray[index]["image"].sizes[imageSize].url
                            : cardsArray[index]["image"].sizes["full"].url
                        })`,
                        backgroundPosition: imagePosition,
                        backgroundRepeat: imageRepeat,
                        backgroundSize: thumbsize,
                      }}
                    ></div>
                  )}
                  {!cardsArray[index]["image"] && (
                    <div className="skt-blocks-card-avatar-img">
                      <Dashicon icon="format-image" />
                    </div>
                  )}
                </div>
              )}
              <div
                className="card-content-wrap"
                style={{
                  textAlign: contentAlignment,
                  marginBottom: contentSpace,
                  marginTop: contenttopSpace,
                }}
              >
                {headingFontFamily && loadGoogleFont(headingFontFamily)}
                {subFontFamily && loadGoogleFont(subFontFamily)}
                {contentFontFamily && loadGoogleFont(contentFontFamily)}
                <RichText
                  tagName="h4"
                  className="wp-block-skt-blocks-card-item__title"
                  value={cardsArray[index]["title"]}
                  placeholder={cardsArray[index]["title"]}
                  onChange={(value) => {
                    var new_content = {
                      title: value,
                      content: data_copy[index]["content"],
                      subtitle: data_copy[index]["subtitle"],
                      image: data_copy[index]["image"],
                      button: data_copy[index]["button"],
                      buttonURL: data_copy[index]["buttonURL"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ cardsArray: data_copy });
                  }}
                  formattingControls={formattingControls}
                  keepPlaceholderOnFocus
                  style={{
                    marginTop: 0,
                    marginBottom: titleSpace,
                    color: textColor,
                    lineHeight: headingLineHeight,
                    fontFamily: headingFontFamily,
                    fontWeight: headingFontWeight,
                    fontSize: headingFontSize,
                  }}
                />
                <RichText
                  tagName="p"
                  className="wp-block-skt-blocks-card-item__subtitle"
                  placeholder={__("99", "skt-blocks")}
                  value={cardsArray[index]["subtitle"]}
                  onChange={(value) => {
                    var new_content = {
                      title: data_copy[index]["title"],
                      content: data_copy[index]["content"],
                      subtitle: value,
                      image: data_copy[index]["image"],
                      button: data_copy[index]["button"],
                      buttonURL: data_copy[index]["buttonURL"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ cardsArray: data_copy });
                  }}
                  formattingControls={formattingControls}
                  keepPlaceholderOnFocus
                  style={{
                    marginTop: 0,
                    marginBottom: subtitleSpace,
                    color: textColor,
                    lineHeight: subLineHeight,
                    fontWeight: subFontWeight,
                    fontFamily: subFontFamily,
                    fontSize: subFontSize,
                  }}
                />
                <div className="wp-block-skt-blocks-card-item__price-wrapper">
                  <RichText
                    tagName="p"
                    className="wp-block-skt-blocks-card-item__content"
                    value={cardsArray[index]["content"]}
                    placeholder={__("$", "skt-blocks")}
                    onChange={(value) => {
                      var new_content = {
                        title: data_copy[index]["title"],
                        content: value,
                        subtitle: data_copy[index]["subtitle"],
                        image: data_copy[index]["image"],
                        button: data_copy[index]["button"],
                        buttonURL: data_copy[index]["buttonURL"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ cardsArray: data_copy });
                    }}
                    formattingControls={formattingControls}
                    keepPlaceholderOnFocus
                    style={{
                      marginTop: 0,
                      color: textColor,
                      lineHeight: contentLineHeight,
                      fontWeight: contentFontWeight,
                      fontSize: contentFontSize,
                      fontFamily: contentFontFamily,
                    }}
                  />
                </div>

                <div className="wp-block-skt-blocks-card-item__button-wrapper">
                  <div
                    className="skt-blocks-card-button-inner"
                    style={{
                      paddingTop: vPadding,
                      paddingBottom: vPadding,
                      paddingLeft: hPadding,
                      paddingRight: hPadding,
                      marginTop: vMargin,
                      marginBottom: vMargin,
                      marginLeft: hMargin,
                      marginRight: hMargin,
                      borderStyle: butborderStyle ? butborderStyle : "none",
                      borderRadius: butborderRadius ? butborderRadius : "",
                      borderWidth: butborderWidth ? butborderWidth : "0px",
                      backgroundImage:
                        buttonbackgroundType == "gradient"
                          ? generateBackgroundImageEffect(
                              buttonbackgroundColor1,
                              buttonbackgroundColor2,
                              buttongradientDirection,
                              buttoncolorLocation1,
                              buttoncolorLocation2
                            )
                          : undefined,
                    }}
                  >
                    {"" !== icon && iconPosition == "before" && (
                      <span
                        className={classnames(
                          `skt-blocks-button__icon`,
                          `skt-blocks-button__icon-position-${iconPosition}`
                        )}
                      >
                        {renderSVG(icon)}
                      </span>
                    )}
                    <RichText
                      tagName="a"
                      className={classnames(
                        "wp-block-skt-blocks-card-item__button res-button",
                        buttonSize
                      )}
                      value={cardsArray[index]["button"]}
                      placeholder={__("$", "skt-blocks")}
                      onChange={(value) => {
                        var new_content = {
                          button: value,
                          buttonURL: data_copy[index]["buttonURL"],
                          title: data_copy[index]["title"],
                          content: data_copy[index]["content"],
                          subtitle: data_copy[index]["subtitle"],
                          image: data_copy[index]["image"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ cardsArray: data_copy });
                      }}
                      target={buttonTarget ? "_blank" : null}
                      rel={buttonTarget ? "noopener noreferrer" : null}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
                    />
                    {"" !== icon && iconPosition == "after" && (
                      <span
                        className={classnames(
                          `skt-blocks-button__icon`,
                          `skt-blocks-button__icon-position-${iconPosition}`
                        )}
                      >
                        {renderSVG(icon)}
                      </span>
                    )}
                  </div>
                </div>

                <form
                  key="form-link"
                  className={`blocks-button__inline-link res-button-`}
                  onSubmit={(event) => event.preventDefault()}
                  style={{}}
                >
                  <Dashicon icon={"admin-links"} />
                  <URLInput
                    className="button-url"
                    value={cardsArray[index]["buttonURL"]}
                    onChange={(value) => {
                      var new_content = {
                        buttonURL: value,
                        button: data_copy[index]["button"],
                        title: data_copy[index]["title"],
                        content: data_copy[index]["content"],
                        subtitle: data_copy[index]["subtitle"],
                        image: data_copy[index]["image"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ cardsArray: data_copy });
                    }}
                  />
                  <Button
                    label={__("Apply", "skt-blocks")}
                    type="submit"
                  >
                    <Icon icon="editor-break" />
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>,
    ];
  }
}
