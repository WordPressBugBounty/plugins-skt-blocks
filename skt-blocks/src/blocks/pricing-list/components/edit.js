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

export default class Edit extends Component {
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
        className={"skt-blocks-pricing-list-outer-wrap"}
      >
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
