/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import { inherited, previewSuffix } from "./responsive-utils";
import times from "lodash/times";
import { loadGoogleFont } from "../../../utils/font";

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

class Edit extends Component {
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
        hideDesktop,
        hideTablet,
        hideMobile,
        blockId,
      },
      setAttributes,
    } = this.props;
    if (this.props.clientId && blockId !== this.props.clientId) {
      setAttributes({ blockId: this.props.clientId });
    }
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
      // Editor-only hook so the in-tree column-parity CSS can scope to THIS
      // block instance. Not added in save.js, so saved markup is unchanged.
      `skt-cols-${blockId}`,
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

    const sfx = previewSuffix(this.props.deviceType);
    const eff = (b) => inherited(this.props.attributes, b, sfx);

    // Editor column parity: the frontend lays columns side by side via
    // `@media (min-width:600px){flex-basis}` rules in style.scss. In the WP 6.9
    // iframe editor that stylesheet is enqueued to the PARENT document and never
    // reaches the iframe canvas, and the canvas is usually narrower than 600px so
    // the media query would not fire anyway — so columns stack. We mirror the exact
    // frontend widths here, in the block's own in-tree <style> (which DOES render
    // inside the iframe), with no media query, so columns sit side by side at any
    // canvas width. This touches editor markup only; save.js is unchanged.
    const sktDenMap = {
      small: { 2: 2, 3: 3, 4: 4 },
      medium: { 2: 2, 3: 2.975, 4: 4 },
      large: { 2: 2.01, 3: 3.03, 4: 4.08 },
      huge: { 2: 2.02, 3: 3.09, 4: 4.15 },
    };
    const sktEmMap = {
      small: { 2: 0.5, 3: 1, 4: 1 },
      medium: { 2: 1, 3: 1.5, 4: 1.5 },
      large: { 2: 1.5, 3: 2, 4: 2 },
      huge: { 2: 2, 3: 2.5, 4: 2.5 },
    };
    const sktCols = count > 4 ? 4 : count;
    const sktGut = sktDenMap[gutter] ? gutter : "medium";
    const sktDen = (sktDenMap[sktGut] && sktDenMap[sktGut][sktCols]) || sktCols;
    const sktEm = (sktEmMap[sktGut] && sktEmMap[sktGut][sktCols]) || 0;
    const sktColWidth = `calc(100% / ${sktDen} - ${sktEm}em)`;
    const sktEditorColumnsCss =
      count > 1
        ? `
            .wp-block-skt-blocks-pricing-table__inner.has-columns.skt-cols-${blockId} {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }
            .wp-block-skt-blocks-pricing-table__inner.skt-cols-${blockId} > .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} {
                flex: 1 1 ${sktColWidth};
                max-width: ${sktColWidth};
            }
          `
        : "";

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={blockAlign}
          onChange={(value) => setAttributes({ blockAlign: value })}
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector key="inspector" {...{ setAttributes, ...this.props }} />,
      <style
        key="styles"
        dangerouslySetInnerHTML={{
          __html:
            sktEditorColumnsCss +
            `
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
      ` +
            (buttonHbackgroundType == "color"
              ? `
      .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button:hover {
                background-color: ${ctaHoverBackColor} ;
      }
      `
              : "") +
            (buttonbackgroundType == "color"
              ? `
      .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button {
                background-color: ${ctaBackColor} ;
      }
        `
              : "") +
            (buttonbackgroundType == "gradient"
              ? `
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button {
                background-image: linear-gradient(${buttongradientDirection}deg, ${buttonbackgroundColor1} ${buttoncolorLocation1}%, ${buttonbackgroundColor2} ${buttoncolorLocation2}%);
              }
	`
              : "") +
            (buttonHbackgroundType == "gradient"
              ? `
            .wp-block-skt-blocks-pricing-table-item.skt-blocks-${blockId} .wp-block-skt-blocks-pricing-table-item__button:hover {
                background-image: linear-gradient(${buttonHgradientDirection}deg, ${buttonHbackgroundColor1} ${buttonHcolorLocation1}%, ${buttonHbackgroundColor2} ${buttonHcolorLocation2}%);
              }
	`
              : ""),
        }}
      />,
      <div
        key="content"
        className={classnames(classes, "image-shape-" + imageShape, {
          "skt-pricing-hide": hideDesktop || hideTablet || hideMobile,
          "skt-hide-desktop": hideDesktop,
          "skt-hide-tablet": hideTablet,
          "skt-hide-mobile": hideMobile,
        })}
        style={{
          textAlign: blockAlign,
          paddingTop: eff("blockTopPadding"),
          paddingBottom: eff("blockBottomPadding"),
          paddingLeft: eff("blockLeftPadding"),
          paddingRight: eff("blockRightPadding"),

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
        <div
          className={innerClasses}
          style={
            count > 1
              ? { display: "flex", flexWrap: "wrap", width: "100%" }
              : undefined
          }
        >
          {pricingTable.map((test, index) => (
              <div
                key={`pricing-plan-item-${index}`}
                className={classnames(
                  "wp-block-skt-blocks-pricing-table-item",
                  `skt-blocks-${blockId}`,
                  backgroundType == "image" ? "background-type-image" : ""
                )}
                style={{
                  // Editor column parity (inline so no stylesheet or iframe can
                  // defeat it). Widths mirror the frontend; save.js is untouched.
                  ...(count > 1
                    ? {
                        boxSizing: "border-box",
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: sktColWidth,
                        maxWidth: sktColWidth,
                      }
                    : {}),
                  paddingTop: eff("columnTopPadding"),
                  paddingBottom: eff("columnBottomPadding"),
                  paddingLeft: eff("columnLeftPadding"),
                  paddingRight: eff("columnRightPadding"),
                  color: textColor,
                  backgroundColor: itemBackgroundColor,
                  borderWidth: eff("blockBorderWidth"),
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
                                width={eff("imageWidth")}
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
                    identifier={`title-${index}`}
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
                      marginBottom: eff("titleSpace"),
                    }}
                  />
                )}
                <div
                  className="wp-block-skt-blocks-pricing-table-item__price-wrapper"
                  style={{
                    marginBottom: eff("priceSpace"),
                    justifyContent: alignStyle,
                  }}
                >
                  {showPrefix && (
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-pricing-table-item__currency"
                      value={pricingTable[index]["currency"]}
                    identifier={`currency-${index}`}
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
                    identifier={`amount-${index}`}
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
                    identifier={`price_suffix-${index}`}
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
                    identifier={`sub_price-${index}`}
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
                      marginBottom: eff("subpriceSpace"),
                    }}
                  />
                )}
                {showFeatures && (
                  <RichText
                    tagName="ul"
                    multiline="li"
                    className="wp-block-skt-blocks-pricing-table-item__features"
                    value={pricingTable[index]["features"]}
                    identifier={`features-${index}`}
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
                      marginBottom: eff("featuresSpace"),
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
                    identifier={`button-${index}`}
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
                        marginBottom: eff("buttonSpace"),
                        paddingLeft: eff("ctaHpadding"),
                        paddingRight: eff("ctaHpadding"),
                        paddingTop: eff("ctaVpadding"),
                        paddingBottom: eff("ctaVpadding"),
                        borderColor: ctaBorderColor,
                        borderRadius: ctaBorderRadius,
                        borderWidth: eff("ctaBorderWidth"),
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
          ))}
        </div>
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
