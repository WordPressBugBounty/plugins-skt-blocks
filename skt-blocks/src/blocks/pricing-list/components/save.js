/**
 * Internal dependencies
 */
import classnames from "classnames";
import map from "lodash/map";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import generateCSSUnit from "../../../generateCSSUnit";
import Style from "style-it";

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
    } = this.props.attributes;
    var data_copy = [...pricingList];
    var align = contentAlign;
    if ("left" === align) {
      align = "flex-start";
    } else if ("right" === align) {
      align = "flex-end";
    }

    var imgPosition = imagePosition;

    return [
      <div
        className={"skt-blocks-pricing-list-outer-wrap"}
      >
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
                      <RichText.Content
                        tagName="h4"
                        className="skt-blocks-pricing-list-item-title"
                        value={pricingList[index]["title"]}
                        style={{
                          color: titleColor,
                          lineHeight: titleLineHeight,
                          fontWeight: titleFontWeight,
                          fontSize: titleFontSize,
                          fontFamily: titleFontFamily,
                          marginBottom: titleSpace,
                        }}
                      />
                      <RichText.Content
                        tagName="div"
                        className="skt-blocks-pricing-list-item-description"
                        value={pricingList[index]["description"]}
                        style={{
                          color: descColor,
                          lineHeight: descriptionLineHeight,
                          fontWeight: descriptionFontWeight,
                          fontSize: descriptionFontSize,
                          fontFamily: descriptionFontFamily,
                        }}
                      />
                    </div>
                    <div className="skt-blocks-pricing-list-item-price-wrap">
                      <RichText.Content
                        tagName="div"
                        className="skt-blocks-pricing-list-item-price"
                        value={pricingList[index]["price"]}
                        style={{
                          color: priceColor,
                          lineHeight: priceLineHeight,
                          fontWeight: priceFontWeight,
                          fontSize: priceFontSize,
                          fontFamily: priceFontFamily,
                        }}
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
