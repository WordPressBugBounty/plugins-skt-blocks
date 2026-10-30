/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import times from "lodash/times";

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  MediaUpload,
  URLInput,
} = wp.editor;
const { Button, Dashicon, Icon } = wp.components;

import memoize from "memize";
import map from "lodash/map";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import generateCSSUnit from "../../../generateCSSUnit";
import Style from "style-it";
import { loadGoogleFont } from "../../../utils/font";

const ALLOWED_MEDIA_TYPES = ["image"];
const ALLOWED_BLOCKS = ["core/button"];
const TEMPLATE = [
  [
    "core/button",
    { placeholder: __("Buy Now", "skt-blocks") },
  ],
];

class Edit extends Component {
  constructor() {
    super(...arguments);
    this.onSelectTestImage = this.onSelectTestImage.bind(this);
    this.getImageName = this.getImageName.bind(this);
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectTestImage(media, index) {
    const { pricingList } = this.props.attributes;
    const { setAttributes } = this.props;

    let imag_url = null;
    if (!media || !media.url) {
      imag_url = null;
    } else {
      imag_url = media;
    }

    if (!media.type || "image" !== media.type) {
      imag_url = null;
    }

    const newItems = pricingList.map((item, thisIndex) => {
      if (index === thisIndex) {
        (item["image"] = imag_url), (item["imageUrl"] = imag_url);
      }
      return item;
    });

    setAttributes({
      pricingList: newItems,
    });
  }

  /*
   * Event to set Image as null while removing.
   */
  onRemoveTestImage(index) {
    const { pricingList } = this.props.attributes;
    const { setAttributes } = this.props;

    const newItems = pricingList.map((item, thisIndex) => {
      if (index === thisIndex) {
        item["image"] = null;
      }
      return item;
    });

    setAttributes({
      pricingList: newItems,
    });
  }

  /*
   * Event to set Image selectot label.
   */
  getImageName(image) {
    const { pricingList } = this.props.attributes;

    let image_name = __("Select Image");
    if (image) {
      if (image.url == null || image.url == "") {
        image_name = __("Select Image");
      } else {
        image_name = __("Replace Image");
      }
    }
    return image_name;
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        pricingList,
        priceColor,
        descColor,
        titleColor,
        titleFontFamily,
        titleFontSize,
        titleFontWeight,
        titleLineHeight,
        descriptionFontFamily,
        descriptionFontSize,
        descriptionFontWeight,
        descriptionLineHeight,
        priceFontFamily,
        priceFontSize,
        priceFontWeight,
        priceLineHeight,
        titleSpace,
        columns,
        rowGap,
        columnGap,
        contentAlign,
        topPadding,
        bottomPadding,
        leftPadding,
        rightPadding,
        seperatorStyle,
        seperatorWidth,
        seperatorThickness,
        seperatorColor,
        imagePosition,
        imageSize,
        imageWidth,
      },
      setAttributes,
    } = this.props;
    var data_copy = [...pricingList];
    var align = contentAlign;
    if ("left" === align) {
      align = "flex-start";
    } else if ("right" === align) {
      align = "flex-end";
    }

    // --- Responsive live preview (editor only). Desktop stays inline in the
    // markup; tablet/mobile follow the editor's preview device via these scoped
    // overrides, so values show up immediately regardless of canvas width.
    // Frontend tablet/mobile + visibility come from the PHP render_block filter.
    // save.js is never touched, so saved content stays validation-safe. ---
    const a = this.props.attributes;
    const scopeClass = "skt-pl-" + this.props.clientId;
    const scope = "." + scopeClass;
    const num = (k) =>
      typeof a[k] === "number" && !isNaN(a[k]) ? a[k] : null;
    const sktRespCSS = (suffix) => {
      let css = "";
      const iw = num("imageWidth" + suffix);
      if (iw !== null) {
        css += `${scope} .skt-blocks-pricing-list-item-image{width:${iw}px!important;max-width:${iw}px!important;}`;
      }
      const sw = num("seperatorWidth" + suffix);
      if (sw !== null) {
        css += `${scope} .skt-blocks-pricing-list-item-separator{width:${sw}%!important;}`;
      }
      const rg = num("rowGap" + suffix);
      const cg = num("columnGap" + suffix);
      if (rg !== null || cg !== null) {
        css += `${scope} .skt-blocks-pricing-list-item-wrap{`;
        if (rg !== null) css += `margin-bottom:${rg}px!important;`;
        if (cg !== null)
          css += `padding-left:${cg / 2}px!important;padding-right:${cg / 2}px!important;`;
        css += `}`;
      }
      const ts = num("titleSpace" + suffix);
      if (ts !== null) {
        css += `${scope} .skt-blocks-pricing-list-item-title{margin-bottom:${ts}px!important;}`;
      }
      const tp = num("topPadding" + suffix);
      const bp = num("bottomPadding" + suffix);
      const lp = num("leftPadding" + suffix);
      const rp = num("rightPadding" + suffix);
      if (tp !== null || bp !== null || lp !== null || rp !== null) {
        css += `${scope} .skt-blocks-pricing-list-item-content{`;
        if (tp !== null) css += `padding-top:${tp}px!important;`;
        if (bp !== null) css += `padding-bottom:${bp}px!important;`;
        if (lp !== null) css += `padding-left:${lp}px!important;`;
        if (rp !== null) css += `padding-right:${rp}px!important;`;
        css += `}`;
      }
      return css;
    };
    // Editor column layout. The float/width column rules live in the editor
    // stylesheet, which WP 6.9 does not inject into the editor iframe, so the
    // items stack. We mirror the column width inline here (part of the block's
    // own render, which DOES reach the iframe) with the outer wrap as a flex
    // container, so the editor shows the same N columns as the frontend at any
    // canvas width. Editor-only; save.js is unchanged.
    const plCols =
      columns === 1
        ? "100%"
        : columns === 3
        ? "calc(100% / 3)"
        : "49%";

    let sktResponsiveStyles = "";
    if (this.props.deviceType === "Tablet") {
      sktResponsiveStyles = sktRespCSS("Tablet");
    } else if (this.props.deviceType === "Mobile") {
      sktResponsiveStyles = sktRespCSS("Tablet") + sktRespCSS("Mobile");
    }
    // Editor visibility preview: hide the block when previewing a device it is
    // set to hide on, so the effect is visible (switch back to Desktop to edit).
    if (
      (this.props.deviceType === "Tablet" && a.hideTablet) ||
      (this.props.deviceType === "Mobile" && a.hideMobile) ||
      ((!this.props.deviceType || this.props.deviceType === "Desktop") &&
        a.hideDesktop)
    ) {
      sktResponsiveStyles += `${scope}{display:none!important;}`;
    }

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

      <div
        className={classnames(
          "skt-blocks-pricing-list-outer-wrap",
          scopeClass
        )}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {"" !== sktResponsiveStyles && <Style>{sktResponsiveStyles}</Style>}
        {titleFontFamily && loadGoogleFont(titleFontFamily)}
        {descriptionFontFamily && loadGoogleFont(descriptionFontFamily)}
        {priceFontFamily && loadGoogleFont(priceFontFamily)}
        {pricingList.map((test, index) => (
          <Fragment>
            <div
              className={classnames(
                "skt-blocks-pricing-list-item-wrap",
                `resp-desktop-column-${columns}`,
                `image-position-${imagePosition}`
              )}
              style={{
                marginBottom: rowGap,
                paddingLeft: columnGap / 2,
                paddingRight: columnGap / 2,
                boxSizing: "border-box",
                width: plCols,
              }}
            >
              <div
                className="skt-blocks-pricing-list-item-content"
                style={{
                  paddingTop: topPadding,
                  paddingBottom: bottomPadding,
                  paddingLeft: leftPadding,
                  paddingRight: rightPadding,
                  textAlign: contentAlign,
                }}
              >
                {(imagePosition == "top" || imagePosition == "left") &&
                  pricingList[index]["image"] && (
                    <div className="skt-blocks-pricing-list-item-image-wrap">
                      <img
                        className={classnames(
                          "skt-blocks-pricing-list-item-image"
                        )}
                        src={
                          pricingList[index]["image"].sizes[imageSize]
                            ? pricingList[index]["image"].sizes[imageSize].url
                            : pricingList[index]["image"].sizes["full"].url
                        }
                        style={{
                          height: "auto",
                          width: imageWidth,
                          maxWidth: imageWidth,
                        }}
                      />
                    </div>
                  )}
                <div className="skt-blocks-pricing-list-item-text-wrap">
                  <div className="skt-blocks-pricing-list-item-details">
                    <div className="skt-blocks-pricing-list-item-title-wrap">
                      <RichText
                        tagName="h4"
                        className="skt-blocks-pricing-list-item-title"
                        placeholder={__(
                          "Write a title",
                          "skt-blocks"
                        )}
                        value={pricingList[index]["title"]}
                        onChange={(value) => {
                          var new_content = {
                            title: value,
                            description: data_copy[index]["description"],
                            price: data_copy[index]["price"],
                            image: data_copy[index]["image"],
                            image_url: data_copy[index]["image_url"],
                          };
                          data_copy[index] = new_content;
                          setAttributes({ pricingList: data_copy });
                        }}
                        style={{
                          color: titleColor,
                          lineHeight: titleLineHeight,
                          fontWeight: titleFontWeight,
                          fontSize: titleFontSize,
                          fontFamily: titleFontFamily,
                          marginBottom: titleSpace,
                        }}
                        keepPlaceholderOnFocus
                      />
                      <RichText
                        tagName="div"
                        className="skt-blocks-pricing-list-item-description"
                        placeholder={__(
                          "Write a description",
                          "skt-blocks"
                        )}
                        value={pricingList[index]["description"]}
                        onChange={(value) => {
                          var new_content = {
                            title: data_copy[index]["title"],
                            description: value,
                            price: data_copy[index]["price"],
                            image: data_copy[index]["image"],
                            image_url: data_copy[index]["image_url"],
                          };
                          data_copy[index] = new_content;
                          setAttributes({ pricingList: data_copy });
                        }}
                        style={{
                          color: descColor,
                          lineHeight: descriptionLineHeight,
                          fontWeight: descriptionFontWeight,
                          fontSize: descriptionFontSize,
                          fontFamily: descriptionFontFamily,
                        }}
                        keepPlaceholderOnFocus
                      />
                    </div>
                    <div className="skt-blocks-pricing-list-item-price-wrap">
                      <RichText
                        tagName="div"
                        className="skt-blocks-pricing-list-item-price"
                        placeholder={__("$9", "skt-blocks")}
                        value={pricingList[index]["price"]}
                        onChange={(value) => {
                          var new_content = {
                            title: data_copy[index]["title"],
                            description: data_copy[index]["description"],
                            price: value,
                            image: data_copy[index]["image"],
                            image_url: data_copy[index]["image_url"],
                          };
                          data_copy[index] = new_content;
                          setAttributes({ pricingList: data_copy });
                        }}
                        style={{
                          color: priceColor,
                          lineHeight: priceLineHeight,
                          fontWeight: priceFontWeight,
                          fontSize: priceFontSize,
                          fontFamily: priceFontFamily,
                        }}
                        keepPlaceholderOnFocus
                      />
                    </div>
                  </div>
                </div>
                {imagePosition == "right" && pricingList[index]["image"] && (
                  <div className="skt-blocks-pricing-list-item-image-wrap">
                    <img
                      className={classnames(
                        "skt-blocks-pricing-list-item-image"
                      )}
                      src={pricingList[index]["image"].sizes[imageSize].url}
                      style={{
                        height: "auto",
                        width: imageWidth,
                        maxWidth: imageWidth,
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                className="skt-blocks-pricing-list-item-separator-wrap"
                style={{ justifyContent: align }}
              >
                <div
                  className="skt-blocks-pricing-list-item-separator"
                  style={{
                    borderTopColor: seperatorColor,
                    borderTopStyle: seperatorStyle,
                    borderTopWidth: seperatorThickness,
                    width: seperatorWidth + "%",
                  }}
                ></div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>,
    ];
  }
}

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
