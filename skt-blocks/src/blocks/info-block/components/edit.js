/**
 * Internal dependencies
 */
import classnames from "classnames";
import icons from "./../../../utils/components/icons";
import renderSVG from "../../../renderIcon";
import Inspector from "./inspector";
import InfoBlock from "./infoblock";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import InfoBoxPositionClasses from "./classes";
import generateCSSUnit from "../../../generateCSSUnit";
import React from "react";
import Style from "style-it";
import { loadGoogleFont } from "../../../utils/font";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  MediaUpload,
  InnerBlocks,
  MediaUploadCheck,
  figure,
  URLInput,
} = wp.editor;
const { Button, Dashicon, Icon } = wp.components;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        resinfoBlockTitle,
        resDescHeading,
        resheadingAlign,
        resheadingColor,
        ressubheadingColor,
        resprefixTitle,
        resprefixColor,
        resprefixFontSize,
        resprefixFontWeight,
        resprefixLineHeight,
        resheadingTag,
        resheadFontFamily,
        resheadFontSize,
        resheadFontSizeTablet,
        resheadFontSizeMobile,
        resheadFontWeight,
        resheadLineHeight,
        ressubHeadFontFamily,
        ressubHeadFontSize,
        ressubHeadFontSizeTablet,
        ressubHeadFontSizeMobile,
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
        imageWidthTablet,
        imageWidthMobile,
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
        opacity,
        imgURL,
        imgAlt,
        dimRatio,
        hoverctaBtnLinkColor,
        hoverctaBgColor,
        hoverctaBorderColor,
        imagePosition,
        imageRepeat,
        thumbsize,
        backgroundAttachment,
        sepSpace,
        icon_color,
        icon_hcolor,
        resImageBorderColor,
        resImageBorderRadius,
        resImageBorderWidth,
        resImageBorderStyle,
        imageBoxShadowColor,
        imageBoxShadowHOffset,
        imageBoxShadowVOffset,
        imageBoxShadowBlur,
        imageBoxShadowSpread,
        imageBoxShadowPosition,
        alignment,
          imageopacity,
      },
      setAttributes,
    } = this.props;

    setAttributes({ counterId: this.props.clientId });
    var imageBoxShadowPositionCSS = imageBoxShadowPosition;

    if ("outset" === imageBoxShadowPosition) {
      imageBoxShadowPositionCSS = "";
    }
    const onSelectBgImage = (img) => {
      setAttributes({
        imgID: img.id,
        imgURL: img.url,
        imgAlt: img.alt,
      });
    };

    const dimRatioToClass = (ratio) => {
      return 0 === ratio || 50 === ratio
        ? null
        : "has-background-dim-" + 10 * Math.round(ratio / 10);
    };

    let ctaBtnClass =
      "skt-blocks-infobox-cta-link skt-blocks-ifb-cta-button";

    let target = "_self";
    let rel = "noopener noreferrer";
    if (resctaTarget) {
      target = "_blank";
    }

    let url_chk = "";
    if (
      typeof iconImage !== "undefined" &&
      iconImage !== null &&
      iconImage !== ""
    ) {
      url_chk = iconImage.url;
    }

    let url = "";
    if (url_chk !== "") {
      let size = iconImage.sizes;
      let imageSize = imageSize;

      if (
        typeof size !== "undefined" &&
        typeof size[imageSize] !== "undefined"
      ) {
        url = size[imageSize].url;
      } else {
        url = url_chk;
      }
    } else {
      <div className="skt-blocks-ifb-image-content"></div>;
    }

    // Get icon/Image components.
    let is_image = "";
    if (source_type === "icon" && icon !== "") {
      is_image = (
        <div
          className="skt-blocks-ifb-image-icon-content skt-blocks-ifb-imgicon-wrap"
          style={{
            marginBottom: iconBottomMargin,
            marginTop: iconTopMargin,
            marginLeft: iconLeftMargin,
            marginRight: iconRightMargin,
          }}
        >
          <div className="skt-blocks-ifb-icon-wrap">
            <span
              className="skt-blocks-ifb-icon"
              style={{
                width: resIconSize,
                height: resIconSize,
              }}
            >
              {renderSVG(icon)}
            </span>
          </div>
        </div>
      );
    }
    if (source_type === "image") {
      is_image = (
        <div
          className="skt-blocks-ifb-image-icon-content skt-blocks-ifb-imgicon-wrap"
          style={{
            marginBottom: iconBottomMargin,
            marginTop: iconTopMargin,
            marginLeft: iconLeftMargin,
            marginRight: iconRightMargin,
          }}
        >
          <div className="skt-blocks-ifb-image">
            <div className="skt-blocks-ifb-image-content">
              <img
                className=""
                src={url}
                alt=""
                style={{
                  borderColor: resImageBorderColor,
                  borderRadius: resImageBorderRadius,
                  borderWidth: resImageBorderWidth,
                  borderStyle: resImageBorderStyle,
                  boxShadow:
                    generateCSSUnit(imageBoxShadowHOffset, "px") +
                    " " +
                    generateCSSUnit(imageBoxShadowVOffset, "px") +
                    " " +
                    generateCSSUnit(imageBoxShadowBlur, "px") +
                    " " +
                    generateCSSUnit(imageBoxShadowSpread, "px") +
                    " " +
                    imageBoxShadowColor +
                    " " +
                    imageBoxShadowPositionCSS,
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    var icon_image_html = is_image;
    var seperator_position = resseperatorPosition;
    var seperator_html = (
      <div className="skt-blocks-ifb-separator-parent">
        <div
          className="skt-blocks-ifb-separator"
          style={{
            borderWidth: resseperatorThickness,
            borderColor: resseperatorColor,
            borderTopStyle: resseperatorStyle,
            width: generateCSSUnit(resseperatorWidth, resseparatorWidthType),
            marginBottom: sepSpace,
          }}
        ></div>
      </div>
    );
    var show_seperator = true;

    if (
      resseperatorPosition == "after_icon" &&
      (imgiconPosition == "above-title" || imgiconPosition == "below-title")
    ) {
      show_seperator = false;
      icon_image_html = (
        <Fragment>
          {is_image}
          {"none" !== resseperatorStyle && seperator_html}
        </Fragment>
      );
    }

    if (
      resseperatorPosition == "after_icon" &&
      (imgiconPosition !== "above-title" || imgiconPosition !== "below-title")
    ) {
      seperator_position = "after_title";
    }

    if (
      imgiconPosition == "below-title" &&
      resseperatorPosition == "after_title"
    ) {
      show_seperator = false;
      icon_image_html = (
        <Fragment>
          {"none" !== resseperatorStyle && seperator_html}
          {is_image}
        </Fragment>
      );
    }
      let imgopacity = imageopacity / 100;
    return [
      <Fragment>
        {(imgiconPosition == "above-title" ||
          imgiconPosition == "below-title") && (
          <BlockControls key="controls">
            <AlignmentToolbar
              value={resheadingAlign}
              onChange={(value) => setAttributes({ resheadingAlign: value })}
            />
          </BlockControls>
        )}
        <Inspector {...{ setAttributes, ...this.props }} />

        <Style>
          {`
	  .skt-blocks-block-${counterId} .skt-blocks-ifb-cta-button {
		  background-color: ${resctaBgColor};
		  border-color: ${resctaBorderColor};
	  }
	  .skt-blocks-block-${counterId} .skt-blocks-ifb-cta-button .skt-blocks-inline-editing{
		  color: ${resctaBtnLinkColor};
	  }
	  .skt-blocks-block-${counterId} .skt-blocks-ifb-cta-button:hover {
		  background-color: ${hoverctaBgColor};
		  border-color: ${hoverctaBorderColor};
	  }

	  .skt-blocks-block-${counterId} .skt-blocks-ifb-cta-button .skt-blocks-inline-editing:hover{
		  color: ${hoverctaBtnLinkColor};
	  }
    .skt-blocks-block-${counterId} .skt-blocks-ifb-icon svg{
      fill: ${icon_color};
    }
    .skt-blocks-block-${counterId} .skt-blocks-ifb-icon:hover svg{
      fill: ${icon_hcolor};
    }
    .skt-blocks-block-${counterId} .skt-blocks-ifb-image-content img{
      opacity: ${imgopacity}
    }
  `}
        </Style>

        {(imgiconPosition == "above-title" ||
          imgiconPosition == "below-title") && (
          <Style>
            {`
		  .skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap {
			  text-align: ${resheadingAlign};
		  }
	  `}
          </Style>
        )}
        {(imgiconPosition == "left" || imgiconPosition == "right") && (
          <Style>
            {`
            @media only screen and (max-width: 976px){
              .skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap.skt-blocks-infobox-stacked-tablet .skt-blocks-ifb-content{
                  text-align: ${alignment};
              }
		  }
		    @media only screen and (max-width: 767px){
              .skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap.skt-blocks-infobox-stacked-mobile .skt-blocks-ifb-content{
                  text-align: ${alignment};
              }
		  }
		  
	  `}
          </Style>
        )}
        <Style>
          {`
@media only screen and (min-width: 976px){
.skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap .skt-blocks-ifb-title {
	font-size: ${resheadFontSize}px !important;
		}
		.skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap .skt-blocks-ifb-desc {
	font-size: ${ressubHeadFontSize}px !important;
		}
		.skt-blocks-block-${counterId} .skt-blocks-ifb-image-content img{
      width: ${imageWidth}px;
      max-width: ${imageWidth}px;
    }
}
@media only screen and (max-width: 976px){
.skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap .skt-blocks-ifb-title {
	font-size: ${resheadFontSizeTablet}px;
		}
		.skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap .skt-blocks-ifb-desc {
	font-size: ${ressubHeadFontSizeTablet}px !important;
		}
		.skt-blocks-block-${counterId} .skt-blocks-ifb-image-content img{
      width: ${imageWidthTablet}px;
      max-width: ${imageWidthTablet}px;
    }
}
@media only screen and (max-width: 767px){
	.skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap .skt-blocks-ifb-title {
	font-size: ${resheadFontSizeMobile}px;
		}
		.skt-blocks-block-${counterId}.skt-blocks-infobox__content-wrap .skt-blocks-ifb-desc {
	font-size: ${ressubHeadFontSizeMobile}px !important;
		}
		.skt-blocks-block-${counterId} .skt-blocks-ifb-image-content img{
      width: ${imageWidthMobile}px;
      max-width: ${imageWidthMobile}px;
    }
}
`}
        </Style>
        <InfoBlock {...this.props}>
          <div
            className={classnames(
              `skt-blocks-block-${counterId}`,
              "skt-blocks-infobox__content-wrap",
              ...InfoBoxPositionClasses(this.props.attributes)
            )}
          >
            {imgURL && !!imgURL.length && (
              <div className="skt-blocks-cta-image-wrap">
                <img
                  className={classnames(
                    "skt-blocks-cta-image",
                    dimRatioToClass(dimRatio),
                    {
                      "has-background-dim": 0 !== dimRatio,
                    }
                  )}
                  style={{
                    backgroundImage: `url(${imgURL})`,
                    backgroundPosition: imagePosition,
                    backgroundRepeat: imageRepeat,
                    backgroundSize: thumbsize,
                    backgroundAttachment: backgroundAttachment,
                  }}
                />
              </div>
            )}
            <div className="skt-blocks-ifb-left-right-wrap">
              {imgiconPosition == "left" && icon_image_html}
              <div className="skt-blocks-ifb-content">
                {imgiconPosition == "above-title" && icon_image_html}

                {(imgiconPosition == "above-title" ||
                  imgiconPosition == "below-title") && (
                  <div className="skt-blocks-ifb-title-wrap">
                    {resheadFontFamily && loadGoogleFont(resheadFontFamily)}
                    {ressubHeadFontFamily &&
                      loadGoogleFont(ressubHeadFontFamily)}
                    {resshowPrefix && (
                      <RichText
                        tagName="div"
                        value={resprefixTitle}
                        placeholder={__(
                          "Write a Prefix",
                          "skt-blocks"
                        )}
                        className="skt-blocks-ifb-title-prefix"
                        multiline={false}
                        onChange={(value) => {
                          setAttributes({ resprefixTitle: value });
                        }}
                        style={{
                          color: resprefixColor,
                          fontSize: resprefixFontSize,
                          fontWeight: resprefixFontWeight,
                          lineHeight: resprefixLineHeight,
                          marginBottom: resprefixSpace,
                        }}
                      />
                    )}
                    {"none" !== resseperatorStyle &&
                      seperator_position == "after_prefix" &&
                      seperator_html}
                    {resshowTitle && (
                      <RichText
                        tagName={resheadingTag}
                        placeholder={__(
                          "Write a Heading",
                          "skt-blocks"
                        )}
                        value={resinfoBlockTitle}
                        className="skt-blocks-ifb-title"
                        onChange={(value) =>
                          setAttributes({ resinfoBlockTitle: value })
                        }
                        multiline={false}
                        style={{
                          color: resheadingColor,
                          fontFamily: resheadFontFamily,
                          fontWeight: resheadFontWeight,
                          lineHeight: resheadLineHeight,
                          marginBottom: resheadSpace,
                        }}
                      />
                    )}
                  </div>
                )}

                {imgiconPosition == "below-title" && icon_image_html}

                {(imgiconPosition == "above-title" ||
                  imgiconPosition == "below-title") && (
                  <Fragment>
                    {"none" !== resseperatorStyle &&
                      seperator_position == "after_title" &&
                      show_seperator &&
                      seperator_html}
                    <div className="skt-blocks-ifb-text-wrap">
                      {resshowDesc && (
                        <RichText
                          tagName="p"
                          value={resDescHeading}
                          placeholder={__(
                            "Write a Description",
                            "skt-blocks"
                          )}
                          className="skt-blocks-ifb-desc"
                          value={resDescHeading}
                          style={{
                            color: ressubheadingColor,
                            fontFamily: ressubHeadFontFamily,
                            fontWeight: ressubHeadFontWeight,
                            lineHeight: ressubHeadLineHeight,
                            marginBottom: ressubHeadSpace,
                          }}
                          onChange={(value) =>
                            setAttributes({ resDescHeading: value })
                          }
                        />
                      )}
                      {"none" !== resseperatorStyle &&
                        seperator_position == "after_desc" &&
                        seperator_html}
                      <div className="skt-blocks-ifb-cta skt-blocks-infobox-cta-link-style">
                        {resctaType === "text" && (
                          <a
                            target={target}
                            className="skt-blocks-infobox-cta-link"
                            rel={rel}
                            style={{
                              color: resctaLinkColor,
                              paddingTop: ctaBtnVertPadding,
                              paddingBottom: ctaBtnVertPadding,
                              paddingLeft: ctaBtnHrPadding,
                              paddingRight: ctaBtnHrPadding,
                              fontSize: resctaFontSize,
                              fontWeight: resctaFontWeight,
                            }}
                          >
                            <span
                              className="skt-blocks-inline-editing"
                              style={{
                                color: resctaLinkColor,
                                fontSize: resctaFontSize,
                              }}
                            >
                              {resctaText}
                            </span>
                          </a>
                        )}

                        {resctaType === "button" && (
                          <div
                            className={classnames(
                              "skt-blocks-ifb-button-wrapper"
                            )}
                          >
                            <a
                              className={ctaBtnClass}
                              target={target}
                              rel={rel}
                              style={{
                                borderWidth: resctaBorderWidth,
                                borderStyle: resctaBorderStyle,
                                borderRadius: resctaBorderRadius,
                                paddingTop: ctaBtnVertPadding,
                                paddingBottom: ctaBtnVertPadding,
                                paddingLeft: ctaBtnHrPadding,
                                paddingRight: ctaBtnHrPadding,
                                fontSize: resctaFontSize,
                                fontWeight: resctaFontWeight,
                              }}
                            >
                              <span className="skt-blocks-ifb-cta-content-wrapper">
                                <span
                                  className="skt-blocks-inline-editing "
                                  style={{
                                    fontSize: resctaFontSize,
                                  }}
                                >
                                  {resctaText}
                                </span>
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}

                {imgiconPosition === "left-title" && (
                  <Fragment>
                    <div className="skt-blocks-ifb-left-title-image">
                      {icon_image_html}
                      <div className="skt-blocks-ifb-title-wrap">
                        {resshowPrefix && (
                          <RichText
                            tagName="div"
                            value={resprefixTitle}
                            placeholder={__(
                              "Write a Prefix",
                              "skt-blocks"
                            )}
                            className="skt-blocks-ifb-title-prefix"
                            multiline={false}
                            onChange={(value) => {
                              setAttributes({ resprefixTitle: value });
                            }}
                            style={{
                              color: resprefixColor,
                              fontSize: resprefixFontSize,
                              fontWeight: resprefixFontWeight,
                              lineHeight: resprefixLineHeight,
                              marginBottom: resprefixSpace,
                            }}
                          />
                        )}
                        {"none" !== resseperatorStyle &&
                          seperator_position == "after_prefix" &&
                          seperator_html}
                        {resshowTitle && (
                          <RichText
                            tagName={resheadingTag}
                            placeholder={__(
                              "Write a Heading",
                              "skt-blocks"
                            )}
                            value={resinfoBlockTitle}
                            className="skt-blocks-ifb-title"
                            onChange={(value) =>
                              setAttributes({ resinfoBlockTitle: value })
                            }
                            multiline={false}
                            style={{
                              color: resheadingColor,
                              fontFamily: resheadFontFamily,
                              fontWeight: resheadFontWeight,
                              lineHeight: resheadLineHeight,
                              marginBottom: resheadSpace,
                            }}
                          />
                        )}
                      </div>
                    </div>
                    {"none" !== resseperatorStyle &&
                      seperator_position == "after_title" &&
                      show_seperator &&
                      seperator_html}
                    <div className="skt-blocks-ifb-text-wrap">
                      {resshowDesc && (
                        <RichText
                          tagName="p"
                          value={resDescHeading}
                          placeholder={__(
                            "Write a Description",
                            "skt-blocks"
                          )}
                          className="skt-blocks-ifb-desc"
                          value={resDescHeading}
                          style={{
                            color: ressubheadingColor,
                            fontWeight: ressubHeadFontWeight,
                            lineHeight: ressubHeadLineHeight,
                            fontFamily: ressubHeadFontFamily,
                            marginBottom: ressubHeadSpace,
                          }}
                          onChange={(value) =>
                            setAttributes({ resDescHeading: value })
                          }
                        />
                      )}
                      {"none" !== resseperatorStyle &&
                        seperator_position == "after_desc" &&
                        seperator_html}
                      <div className="skt-blocks-ifb-cta skt-blocks-infobox-cta-link-style">
                        {resctaType === "text" && (
                          <a
                            target={target}
                            className="skt-blocks-infobox-cta-link"
                            rel={rel}
                            style={{
                              color: resctaLinkColor,
                              paddingTop: ctaBtnVertPadding,
                              paddingBottom: ctaBtnVertPadding,
                              paddingLeft: ctaBtnHrPadding,
                              paddingRight: ctaBtnHrPadding,
                              fontSize: resctaFontSize,
                              fontWeight: resctaFontWeight,
                            }}
                          >
                            <span
                              className="skt-blocks-inline-editing"
                              style={{
                                color: resctaLinkColor,
                                fontSize: resctaFontSize,
                              }}
                            >
                              {resctaText}
                            </span>
                          </a>
                        )}

                        {resctaType === "button" && (
                          <div
                            className={classnames(
                              "skt-blocks-ifb-button-wrapper"
                            )}
                          >
                            <a
                              className={ctaBtnClass}
                              target={target}
                              rel={rel}
                              style={{
                                borderWidth: resctaBorderWidth,
                                borderStyle: resctaBorderStyle,
                                borderRadius: resctaBorderRadius,
                                paddingTop: ctaBtnVertPadding,
                                paddingBottom: ctaBtnVertPadding,
                                paddingLeft: ctaBtnHrPadding,
                                paddingRight: ctaBtnHrPadding,
                                fontSize: resctaFontSize,
                                fontWeight: resctaFontWeight,
                              }}
                            >
                              <span className="skt-blocks-ifb-cta-content-wrapper">
                                <span
                                  className="skt-blocks-inline-editing "
                                  style={{
                                    fontSize: resctaFontSize,
                                  }}
                                >
                                  {resctaText}
                                </span>
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}

                {imgiconPosition === "right-title" && (
                  <Fragment>
                    <div className="skt-blocks-ifb-right-title-image">
                      <div className="skt-blocks-ifb-title-wrap">
                        {resshowPrefix && (
                          <RichText
                            tagName="div"
                            value={resprefixTitle}
                            placeholder={__(
                              "Write a Prefix",
                              "skt-blocks"
                            )}
                            className="skt-blocks-ifb-title-prefix"
                            multiline={false}
                            onChange={(value) => {
                              setAttributes({ resprefixTitle: value });
                            }}
                            style={{
                              color: resprefixColor,
                              fontSize: resprefixFontSize,
                              fontWeight: resprefixFontWeight,
                              lineHeight: resprefixLineHeight,
                              marginBottom: resprefixSpace,
                            }}
                          />
                        )}
                        {"none" !== resseperatorStyle &&
                          seperator_position == "after_prefix" &&
                          seperator_html}
                        {resshowTitle && (
                          <RichText
                            tagName={resheadingTag}
                            placeholder={__(
                              "Write a Heading",
                              "skt-blocks"
                            )}
                            value={resinfoBlockTitle}
                            className="skt-blocks-ifb-title"
                            onChange={(value) =>
                              setAttributes({ resinfoBlockTitle: value })
                            }
                            multiline={false}
                            style={{
                              color: resheadingColor,
                              fontFamily: resheadFontFamily,
                              fontWeight: resheadFontWeight,
                              lineHeight: resheadLineHeight,
                              marginBottom: resheadSpace,
                            }}
                          />
                        )}
                      </div>
                      {icon_image_html}
                    </div>
                    {"none" !== resseperatorStyle &&
                      seperator_position == "after_title" &&
                      show_seperator &&
                      seperator_html}
                    <div className="skt-blocks-ifb-text-wrap">
                      {resshowDesc && (
                        <RichText
                          tagName="p"
                          value={resDescHeading}
                          placeholder={__(
                            "Write a Description",
                            "skt-blocks"
                          )}
                          className="skt-blocks-ifb-desc"
                          value={resDescHeading}
                          style={{
                            color: ressubheadingColor,
                            fontWeight: ressubHeadFontWeight,
                            lineHeight: ressubHeadLineHeight,
                            fontFamily: ressubHeadFontFamily,
                            marginBottom: ressubHeadSpace,
                          }}
                          onChange={(value) =>
                            setAttributes({ resDescHeading: value })
                          }
                        />
                      )}
                      {"none" !== resseperatorStyle &&
                        seperator_position == "after_desc" &&
                        seperator_html}
                      <div className="skt-blocks-ifb-cta skt-blocks-infobox-cta-link-style">
                        {resctaType === "text" && (
                          <a
                            target={target}
                            className="skt-blocks-infobox-cta-link"
                            rel={rel}
                            style={{
                              color: resctaLinkColor,
                              paddingTop: ctaBtnVertPadding,
                              paddingBottom: ctaBtnVertPadding,
                              paddingLeft: ctaBtnHrPadding,
                              paddingRight: ctaBtnHrPadding,
                              fontSize: resctaFontSize,
                              fontWeight: resctaFontWeight,
                            }}
                          >
                            <span
                              className="skt-blocks-inline-editing"
                              style={{
                                color: resctaLinkColor,
                                fontSize: resctaFontSize,
                              }}
                            >
                              {resctaText}
                            </span>
                          </a>
                        )}

                        {resctaType === "button" && (
                          <div
                            className={classnames(
                              "skt-blocks-ifb-button-wrapper"
                            )}
                          >
                            <a
                              className={ctaBtnClass}
                              target={target}
                              rel={rel}
                              style={{
                                borderWidth: resctaBorderWidth,
                                borderStyle: resctaBorderStyle,
                                borderRadius: resctaBorderRadius,
                                paddingTop: ctaBtnVertPadding,
                                paddingBottom: ctaBtnVertPadding,
                                paddingLeft: ctaBtnHrPadding,
                                paddingRight: ctaBtnHrPadding,
                                fontSize: resctaFontSize,
                                fontWeight: resctaFontWeight,
                              }}
                            >
                              <span className="skt-blocks-ifb-cta-content-wrapper">
                                <span
                                  className="skt-blocks-inline-editing "
                                  style={{
                                    fontSize: resctaFontSize,
                                  }}
                                >
                                  {resctaText}
                                </span>
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}

                {(imgiconPosition == "left" || imgiconPosition == "right") && (
                  <Fragment>
                    <div className="skt-blocks-ifb-title-wrap">
                      {resshowPrefix && (
                        <RichText
                          tagName="div"
                          value={resprefixTitle}
                          placeholder={__(
                            "Write a Prefix",
                            "skt-blocks"
                          )}
                          className="skt-blocks-ifb-title-prefix"
                          multiline={false}
                          onChange={(value) => {
                            setAttributes({ resprefixTitle: value });
                          }}
                          style={{
                            color: resprefixColor,
                            fontSize: resprefixFontSize,
                            fontWeight: resprefixFontWeight,
                            lineHeight: resprefixLineHeight,
                            marginBottom: resprefixSpace,
                          }}
                        />
                      )}
                      {"none" !== resseperatorStyle &&
                        seperator_position == "after_prefix" &&
                        seperator_html}
                      {resshowTitle && (
                        <RichText
                          tagName={resheadingTag}
                          placeholder={__(
                            "Write a Heading",
                            "skt-blocks"
                          )}
                          value={resinfoBlockTitle}
                          className="skt-blocks-ifb-title"
                          onChange={(value) =>
                            setAttributes({ resinfoBlockTitle: value })
                          }
                          multiline={false}
                          style={{
                            color: resheadingColor,
                            fontFamily: resheadFontFamily,
                            fontWeight: resheadFontWeight,
                            lineHeight: resheadLineHeight,
                            marginBottom: resheadSpace,
                          }}
                        />
                      )}
                    </div>
                    {"none" !== resseperatorStyle &&
                      seperator_position == "after_title" &&
                      show_seperator &&
                      seperator_html}
                    <div className="skt-blocks-ifb-text-wrap">
                      {resshowDesc && (
                        <RichText
                          tagName="p"
                          value={resDescHeading}
                          placeholder={__(
                            "Write a Description",
                            "skt-blocks"
                          )}
                          className="skt-blocks-ifb-desc"
                          value={resDescHeading}
                          style={{
                            color: ressubheadingColor,
                            fontWeight: ressubHeadFontWeight,
                            lineHeight: ressubHeadLineHeight,
                            fontFamily: ressubHeadFontFamily,
                            marginBottom: ressubHeadSpace,
                          }}
                          onChange={(value) =>
                            setAttributes({ resDescHeading: value })
                          }
                        />
                      )}
                      {"none" !== resseperatorStyle &&
                        seperator_position == "after_desc" &&
                        seperator_html}
                      <div className="skt-blocks-ifb-cta skt-blocks-infobox-cta-link-style">
                        {resctaType === "text" && (
                          <a
                            target={target}
                            className="skt-blocks-infobox-cta-link"
                            rel={rel}
                            style={{
                              color: resctaLinkColor,
                              paddingTop: ctaBtnVertPadding,
                              paddingBottom: ctaBtnVertPadding,
                              paddingLeft: ctaBtnHrPadding,
                              paddingRight: ctaBtnHrPadding,
                              fontSize: resctaFontSize,
                              fontWeight: resctaFontWeight,
                            }}
                          >
                            <span
                              className="skt-blocks-inline-editing"
                              style={{
                                color: resctaLinkColor,
                                fontSize: resctaFontSize,
                              }}
                            >
                              {resctaText}
                            </span>
                          </a>
                        )}

                        {resctaType === "button" && (
                          <div
                            className={classnames(
                              "skt-blocks-ifb-button-wrapper"
                            )}
                          >
                            <a
                              className={ctaBtnClass}
                              target={target}
                              rel={rel}
                              style={{
                                borderWidth: resctaBorderWidth,
                                borderStyle: resctaBorderStyle,
                                borderRadius: resctaBorderRadius,
                                paddingTop: ctaBtnVertPadding,
                                paddingBottom: ctaBtnVertPadding,
                                paddingLeft: ctaBtnHrPadding,
                                paddingRight: ctaBtnHrPadding,
                                fontSize: resctaFontSize,
                                fontWeight: resctaFontWeight,
                              }}
                            >
                              <span className="skt-blocks-ifb-cta-content-wrapper">
                                <span
                                  className="skt-blocks-inline-editing "
                                  style={{
                                    fontSize: resctaFontSize,
                                  }}
                                >
                                  {resctaText}
                                </span>
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>

              {imgiconPosition == "right" && icon_image_html}
            </div>
          </div>
        </InfoBlock>
      </Fragment>,
    ];
  }
}
