/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import times from "lodash/times";
import { loadGoogleFont } from "../../../utils/font";

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
  MediaUploadCheck,
  figure,
} = wp.editor;
const { Button, Dashicon, Icon } = wp.components;

import memoize from "memize";
import map from "lodash/map";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import generateCSSUnit from "../../../generateCSSUnit";
import Style from "style-it";
import { hexToRgba } from "../../../utils";

const ALLOWED_MEDIA_TYPES = ["image"];
const ALLOWED_BLOCKS = ["core/button"];
const TEMPLATE = [
  [
    "core/button",
    { placeholder: __("Buy Now", "skt-blocks") },
  ],
];

const getCount = memoize((count) => {
  return times(count, (index) => [
    "skt-blocks/pricing-table-item",
    {
      placeholder: sprintf(
        /* translators: %d: a digit 1-3 */
        __("Plan %d", "skt-blocks"),
        parseInt(index + 1)
      ),
    },
  ]);
});

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        pricingTable,
        count,
        gutter,
        contentAlign,
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
        blockBackColorOpacity,
        columnBackColorOpacity,
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
      },
      setAttributes,
    } = this.props;
    setAttributes({ blockId: this.props.clientId });
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
    var data_copy = [...pricingTable];

    const getButtonTemplate = memoize((button_block, pricingTable) => {
      return times(button_block, (n) => [
        "skt-blocks/pricing-table-item",
        pricingTable[n],
      ]);
    });
    const classes = classnames(
      "wp-block-skt-blocks-pricing-table",
      {
        [`has-text-align-${contentAlign}`]: contentAlign,
      }
    );

    const innerClasses = classnames(
      "wp-block-skt-blocks-pricing-table__inner",
      {
        "has-columns": count > 1,
        [`has-${count}-columns`]: count,
        "has-responsive-columns": count > 1,
        [`has-${gutter}-gutter`]: gutter,
      }
    );

    const formattingControls = ["bold", "italic", "strikethrough"];

    let alignStyle = "center";
    if ("left" == blockAlign) {
      alignStyle = "flex-start";
    }
    if ("right" == blockAlign) {
      alignStyle = "flex-end";
    }

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={blockAlign}
          onChange={(value) => setAttributes({ blockAlign: value })}
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,
      <Fragment>
        <Style>
          {`
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button {
                color: ${ctaColor} !important;
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
        className={classnames(classes, "image-shape-" + imageShape)}
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
        {titleFontFamily && loadGoogleFont(titleFontFamily)}
        {amountFontFamily && loadGoogleFont(amountFontFamily)}
        {prefixFontFamily && loadGoogleFont(prefixFontFamily)}
        {suffixFontFamily && loadGoogleFont(suffixFontFamily)}
        {subpriceFontFamily && loadGoogleFont(subpriceFontFamily)}
        {featuresFontFamily && loadGoogleFont(featuresFontFamily)}
        {ctaFontFamily && loadGoogleFont(ctaFontFamily)}
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
                {showImage && (
                  <div className="skt-blocks-pricing-image-wrap">
                    <MediaUpload
                      buttonProps={{
                        className: "change-image",
                      }}
                      onSelect={(value) => {
                        var new_content = {
                          title: data_copy[index]["title"],
                          currency: data_copy[index]["currency"],
                          amount: data_copy[index]["amount"],
                          features: data_copy[index]["features"],
                          img_id: value.id,
                          img_url: value,
                          button: data_copy[index]["button"],
                          buttonURL: data_copy[index]["buttonURL"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ pricingTable: data_copy });
                      }}
                      allowed={ALLOWED_MEDIA_TYPES}
                      type="image"
                      value={pricingTable[index]["img_id"]}
                      render={({ open }) => (
                        <Fragment>
                          <Button
                            className={
                              pricingTable[index]["img_id"]
                                ? "skt-blocks-change-image"
                                : "skt-blocks-add-image"
                            }
                            style={{ height: "auto" }}
                            onClick={open}
                          >
                            {!pricingTable[index]["img_id"] ? (
                              <Dashicon icon={"format-image"} size="100" />
                            ) : (
                              <img
                                className="skt-blocks-pricing-image"
                                src={
                                  pricingTable[index]["img_url"].sizes[
                                    imageSize
                                  ]
                                    ? pricingTable[index]["img_url"].sizes[
                                        imageSize
                                      ].url
                                    : pricingTable[index]["img_url"].sizes[
                                        "full"
                                      ].url
                                }
                                alt="image"
                                width={imageWidth}
                              />
                            )}
                          </Button>
                          {pricingTable[index]["img_id"] && (
                            <Button
                              className="skt-blocks-remove-image"
                              onClick={() => {
                                var new_content = {
                                  title: data_copy[index]["title"],
                                  currency: data_copy[index]["currency"],
                                  amount: data_copy[index]["amount"],
                                  features: data_copy[index]["features"],
                                  img_id: null,
                                  img_url: null,
                                  button: data_copy[index]["button"],
                                  buttonURL: data_copy[index]["buttonURL"],
                                };
                                data_copy[index] = new_content;
                                setAttributes({ pricingTable: data_copy });
                              }}
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "45px",
                              }}
                            >
                              <Dashicon icon={"dismiss"} />
                            </Button>
                          )}
                        </Fragment>
                      )}
                    ></MediaUpload>
                  </div>
                )}
                {showTitle && (
                  <RichText
                    tagName="span"
                    className="wp-block-skt-blocks-pricing-table-item__title"
                    value={pricingTable[index]["title"]}
                    placeholder={pricingTable[index]["title"]}
                    onChange={(value) => {
                      var new_content = {
                        title: value,
                        currency: data_copy[index]["currency"],
                        price_suffix: data_copy[index]["price_suffix"],
                        sub_price: data_copy[index]["sub_price"],
                        amount: data_copy[index]["amount"],
                        features: data_copy[index]["features"],
                        img_id: pricingTable[index]["img_id"],
                        img_url: pricingTable[index]["img_url"],
                        button: data_copy[index]["button"],
                        buttonURL: data_copy[index]["buttonURL"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ pricingTable: data_copy });
                    }}
                    formattingControls={formattingControls}
                    keepPlaceholderOnFocus
                    style={{
                      color: titleColor,
                      lineHeight: titleLineHeight,
                      fontWeight: titleFontWeight,
                      fontSize: titleFontSize,
                      fontFamily: titleFontFamily,
                      marginBottom: titleSpace,
                    }}
                  />
                )}
                <div
                  className="wp-block-skt-blocks-pricing-table-item__price-wrapper"
                  style={{
                    marginBottom: priceSpace,
                    justifyContent: alignStyle,
                  }}
                >
                  {showPrefix && (
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-pricing-table-item__currency"
                      value={pricingTable[index]["currency"]}
                      placeholder={__("$", "skt-blocks")}
                      onChange={(value) => {
                        var new_content = {
                          title: data_copy[index]["title"],
                          currency: value,
                          price_suffix: data_copy[index]["price_suffix"],
                          sub_price: data_copy[index]["sub_price"],
                          amount: data_copy[index]["amount"],
                          features: data_copy[index]["features"],
                          img_id: pricingTable[index]["img_id"],
                          img_url: pricingTable[index]["img_url"],
                          button: data_copy[index]["button"],
                          buttonURL: data_copy[index]["buttonURL"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ pricingTable: data_copy });
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
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
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-pricing-table-item__amount"
                      placeholder={__("99", "skt-blocks")}
                      value={pricingTable[index]["amount"]}
                      onChange={(value) => {
                        var new_content = {
                          title: data_copy[index]["title"],
                          currency: data_copy[index]["currency"],
                          price_suffix: data_copy[index]["price_suffix"],
                          sub_price: data_copy[index]["sub_price"],
                          amount: value,
                          features: data_copy[index]["features"],
                          img_id: pricingTable[index]["img_id"],
                          img_url: pricingTable[index]["img_url"],
                          button: data_copy[index]["button"],
                          buttonURL: data_copy[index]["buttonURL"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ pricingTable: data_copy });
                      }}
                      style={{
                        color: priceColor,
                        lineHeight: amountLineHeight,
                        fontWeight: amountFontWeight,
                        fontSize: amountFontSize,
                        fontFamily: amountFontFamily,
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
                    />
                  )}
                  {showSuffix && (
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-pricing-table-item__price_suffix"
                      value={pricingTable[index]["price_suffix"]}
                      placeholder={__(".00", "skt-blocks")}
                      onChange={(value) => {
                        var new_content = {
                          title: data_copy[index]["title"],
                          price_suffix: value,
                          sub_price: data_copy[index]["sub_price"],
                          currency: data_copy[index]["currency"],
                          amount: data_copy[index]["amount"],
                          features: data_copy[index]["features"],
                          img_id: pricingTable[index]["img_id"],
                          img_url: pricingTable[index]["img_url"],
                          button: data_copy[index]["button"],
                          buttonURL: data_copy[index]["buttonURL"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ pricingTable: data_copy });
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
                      style={{
                        color: suffixColor,
                        lineHeight: suffixLineHeight,
                        fontWeight: suffixFontWeight,
                        fontSize: suffixFontSize,
                        fontFamily: suffixFontFamily,
                      }}
                    />
                  )}
                </div>
                {showSubprice && (
                  <RichText
                    tagName="p"
                    className="wp-block-skt-blocks-pricing-table-item__sub_price"
                    value={pricingTable[index]["sub_price"]}
                    placeholder={__(
                      "Sub Price",
                      "skt-blocks"
                    )}
                    onChange={(value) => {
                      var new_content = {
                        title: data_copy[index]["title"],
                        sub_price: value,
                        currency: data_copy[index]["currency"],
                        price_suffix: data_copy[index]["price_suffix"],
                        amount: data_copy[index]["amount"],
                        features: data_copy[index]["features"],
                        img_id: pricingTable[index]["img_id"],
                        img_url: pricingTable[index]["img_url"],
                        button: data_copy[index]["button"],
                        buttonURL: data_copy[index]["buttonURL"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ pricingTable: data_copy });
                    }}
                    formattingControls={formattingControls}
                    keepPlaceholderOnFocus
                    style={{
                      color: subpriceColor,
                      lineHeight: subpriceLineHeight,
                      textTransform: subpriceTextTransform,
                      fontWeight: subpriceFontWeight,
                      fontSize: subpriceFontSize,
                      fontFamily: subpriceFontFamily,
                      marginBottom: subpriceSpace,
                    }}
                  />
                )}
                {showFeatures && (
                  <RichText
                    tagName="ul"
                    multiline="li"
                    className="wp-block-skt-blocks-pricing-table-item__features"
                    value={pricingTable[index]["features"]}
                    placeholder={__(
                      "Add features",
                      "skt-blocks"
                    )}
                    onChange={(value) => {
                      var new_content = {
                        title: data_copy[index]["title"],
                        currency: data_copy[index]["currency"],
                        price_suffix: data_copy[index]["price_suffix"],
                        sub_price: data_copy[index]["sub_price"],
                        amount: data_copy[index]["amount"],
                        features: value,
                        img_id: pricingTable[index]["img_id"],
                        img_url: pricingTable[index]["img_url"],
                        button: data_copy[index]["button"],
                        buttonURL: data_copy[index]["buttonURL"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ pricingTable: data_copy });
                    }}
                    style={{
                      color: featuresColor,
                      lineHeight: featuresLineHeight,
                      fontWeight: featuresFontWeight,
                      fontSize: featuresFontSize,
                      fontFamily: featuresFontFamily,
                      marginBottom: featuresSpace,
                    }}
                    keepPlaceholderOnFocus
                  />
                )}
                {showButton && (
                  <Fragment>
                    <RichText
                      tagName="p"
                      className={classnames(
                        "wp-block-skt-blocks-pricing-table-item__button"
                      )}
                      value={pricingTable[index]["button"]}
                      placeholder={__("$", "skt-blocks")}
                      onChange={(value) => {
                        var new_content = {
                          button: value,
                          buttonURL: data_copy[index]["buttonURL"],
                          title: data_copy[index]["title"],
                          currency: data_copy[index]["currency"],
                          price_suffix: data_copy[index]["price_suffix"],
                          sub_price: data_copy[index]["sub_price"],
                          amount: data_copy[index]["amount"],
                          features: data_copy[index]["features"],
                          img_id: pricingTable[index]["img_id"],
                          img_url: pricingTable[index]["img_url"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ pricingTable: data_copy });
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
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
                    />
                    <form
                      key="form-link"
                      className={`blocks-button__inline-link res-button-`}
                      onSubmit={(event) => event.preventDefault()}
                    >
                      <Dashicon icon={"admin-links"} />
                      <URLInput
                        className="button-url"
                        value={pricingTable[index]["buttonURL"]}
                        onChange={(value) => {
                          var new_content = {
                            buttonURL: value,
                            button: data_copy[index]["button"],
                            title: data_copy[index]["title"],
                            currency: data_copy[index]["currency"],
                            price_suffix: data_copy[index]["price_suffix"],
                            sub_price: data_copy[index]["sub_price"],
                            amount: data_copy[index]["amount"],
                            features: data_copy[index]["features"],
                            img_id: pricingTable[index]["img_id"],
                            img_url: pricingTable[index]["img_url"],
                          };
                          data_copy[index] = new_content;
                          setAttributes({ pricingTable: data_copy });
                        }}
                      />
                      <Button
                        label={__("Apply", "skt-blocks")}
                        type="submit"
                      >
                        <Icon icon="editor-break" />
                      </Button>
                    </form>
                  </Fragment>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>,
    ];
  }
}
