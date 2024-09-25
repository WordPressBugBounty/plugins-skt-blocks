/**
 * BLOCK: Accordion - Save Block
 */

import classnames from "classnames";
import React from "react";
import Style from "style-it";

import generateCSS from "../../../generateCSS";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";

function styling(props) {
  const {
    block_id,
    layout,
    inactiveOtherItems,
    expandFirstItem,
    rowsGap,
    columnsGap,
    align,
    borderStyle,
    borderWidth,
    borderRadius,
    borderColor,
    titleTextColor,
    titleTextActiveColor,
    titlePaddingTypeDesktop,
    vtitlePaddingMobile,
    vtitlePaddingTablet,
    vtitlePaddingDesktop,
    htitlePaddingMobile,
    htitlePaddingTablet,
    htitlePaddingDesktop,
    contentTextColor,
    contentPaddingTypeDesktop,
    vcontentPaddingMobile,
    vcontentPaddingTablet,
    vcontentPaddingDesktop,
    hcontentPaddingMobile,
    hcontentPaddingTablet,
    hcontentPaddingDesktop,
    iconColor,
    iconActiveColor,
    iconHoverColor,
    titleFontWeight,
    titleFontSize,
    titleFontFamily,
    titleLineHeight,
    contentFontWeight,
    contentFontSize,
    contentFontFamily,
    contentLineHeight,
    iconAlign,
    iconSize,
    iconSizeType,
    iconSizeMobile,
    iconSizeTablet,
    columns,
    titleLeftPaddingTablet,
    titleBottomPaddingTablet,
    titleLeftPaddingDesktop,
    titleBottomPaddingDesktop,
    titleLeftPaddingMobile,
    titleBottomPaddingMobile,
    headingTag,
    titleBackgroundColorOpacity,
    marginV,
    marginH,
    titleSecondaryBackgroundColor,
    titleGradientDegree,
    titleBgGradient,
    titleBackgroundColor,
    contentSecondaryBackgroundColor,
    contentGradientDegree,
    contentBgGradient,
    contentBackgroundColor,
    contentBackgroundColorOpacity,
  } = props.attributes;

  var selectors = {};
  var tablet_selectors = {};
  var mobile_selectors = {};
  var icon_color = iconColor;
  var icon_active_color = iconActiveColor;

  if ("undefined" == typeof iconColor || "" == iconColor) {
    icon_color = titleTextColor;
  }
  if ("undefined" == typeof iconActiveColor || "" == iconActiveColor) {
    icon_active_color = titleTextActiveColor;
  }

  let contentOpacity = titleBackgroundColorOpacity / 100;
  let contentBackgroundColorsOpacity = contentBackgroundColorOpacity / 100;

  var temptitleSecondaryBackgroundColor = titleBgGradient
    ? titleSecondaryBackgroundColor
    : titleBackgroundColor;

  var titleGradient;
  if (titleBgGradient) {
    titleGradient =
      "linear-gradient(" +
      titleGradientDegree +
      "deg," +
      hexToRgba(titleBackgroundColor || "#ffffff", contentOpacity || 0) +
      "," +
      hexToRgba(
        temptitleSecondaryBackgroundColor || "#ffffff",
        contentOpacity || 0
      ) +
      ")";
  }

  var tempActiveSecondaryBackgroundColor = contentBgGradient
    ? contentSecondaryBackgroundColor
    : contentBackgroundColor;

  var contentGradient =
    "linear-gradient(" +
    contentGradientDegree +
    "deg," +
    hexToRgba(
      contentBackgroundColor || "#ffffff",
      contentBackgroundColorOpacity || 0
    ) +
    "," +
    hexToRgba(
      tempActiveSecondaryBackgroundColor || "#ffffff",
      contentBackgroundColorsOpacity || 0
    ) +
    ")";

  selectors = {
    " ": {
      "margin-top": marginV + "px",
      "margin-bottom": marginV + "px",
      "margin-left": marginH + "px",
      "margin-right": marginH + "px",
    },
    " .skt-blocks-icon svg": {
      width: generateCSSUnit(iconSize, iconSizeType),
      height: generateCSSUnit(iconSize, iconSizeType),
      "font-size": generateCSSUnit(iconSize, iconSizeType),
      fill: icon_color,
      "margin-right": "10px",
    },
    " .skt-blocks-icon-active svg": {
      width: generateCSSUnit(iconSize, iconSizeType),
      height: generateCSSUnit(iconSize, iconSizeType),
      "font-size": generateCSSUnit(iconSize, iconSizeType),
      fill: icon_active_color,
      "margin-right": "10px",
    },

    " .skt-blocks-icon svg:hover": {
      fill: iconHoverColor + "!important",
    },

    " .skt-blocks-icon-active svg:hover": {
      fill: iconHoverColor + "!important",
    },

    " .skt-blocks-accordion-item__outer-wrap": {
      "margin-bottom": generateCSSUnit(rowsGap, "px"),
    },
    " .skt-blocks-accordion__wrap.skt-blocks-buttons-layout-wrap": {
      "grid-column-gap": generateCSSUnit(columnsGap, "px"),
      "grid-row-gap": generateCSSUnit(rowsGap, "px"),
    },
    " .skt-blocks-accordion-item": {
      "border-style": borderStyle,
      "border-width": generateCSSUnit(borderWidth, "px"),
      "border-radius": generateCSSUnit(borderRadius, "px"),
      "border-color": borderColor,
    },
    " .skt-blocks-accordion-titles-button": {
      "padding-top": generateCSSUnit(
        vtitlePaddingDesktop,
        titlePaddingTypeDesktop
      ),
      "padding-bottom": generateCSSUnit(
        titleBottomPaddingDesktop,
        titlePaddingTypeDesktop
      ),
      "padding-right": generateCSSUnit(
        htitlePaddingDesktop,
        titlePaddingTypeDesktop
      ),
      "padding-left": generateCSSUnit(
        titleLeftPaddingDesktop,
        titlePaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-content span": {
      "margin-top": generateCSSUnit(
        vcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
      "margin-bottom": generateCSSUnit(
        vcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
      "margin-right": generateCSSUnit(
        hcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
      "margin-left": generateCSSUnit(
        hcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-item:hover .skt-blocks-icon svg": {
      fill: icon_active_color,
    },
    " .skt-blocks-accordion-item .skt-blocks-accordion-titles-button.skt-blocks-accordion-titles": {
      "flex-direction": iconAlign,
    },
    " .skt-blocks-accordion-titles-button ": {
      "background-image": titleGradient,
    },
    " .skt-blocks-accordion-titles-button .skt-blocks-title": {
      "font-size": titleFontSize + "px",
      "font-family": titleFontFamily,
      "line-height": titleLineHeight,
      "font-weight": titleFontWeight,
    },
    " .skt-blocks-accordion-item .skt-blocks-accordion-content": {
      "background-image": contentGradient,
      "font-size": contentFontSize + "px",
      "line-height": contentLineHeight,
      "font-family": contentFontFamily,
      "font-weight": contentFontWeight,
      color: contentTextColor,
    },
  };

  tablet_selectors = {
    " .skt-blocks-accordion-titles-button": {
      "padding-top": generateCSSUnit(
        vtitlePaddingTablet,
        titlePaddingTypeDesktop
      ),
      "padding-bottom": generateCSSUnit(
        titleBottomPaddingTablet,
        titlePaddingTypeDesktop
      ),
      "padding-right": generateCSSUnit(
        htitlePaddingTablet,
        titlePaddingTypeDesktop
      ),
      "padding-left": generateCSSUnit(
        titleLeftPaddingTablet,
        titlePaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-content span": {
      "margin-top": generateCSSUnit(
        vcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
      "margin-bottom": generateCSSUnit(
        vcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
      "margin-right": generateCSSUnit(
        hcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
      "margin-left": generateCSSUnit(
        hcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
    },
    " .skt-blocks-icon svg": {
      width: generateCSSUnit(iconSizeTablet, iconSizeType),
      height: generateCSSUnit(iconSizeTablet, iconSizeType),
      "font-size": generateCSSUnit(iconSizeTablet, iconSizeType),
    },
    " .skt-blocks-icon-active svg": {
      width: generateCSSUnit(iconSizeTablet, iconSizeType),
      height: generateCSSUnit(iconSizeTablet, iconSizeType),
      "font-size": generateCSSUnit(iconSizeTablet, iconSizeType),
    },
  };

  mobile_selectors = {
    " .skt-blocks-accordion-titles-button": {
      "padding-top": generateCSSUnit(
        vtitlePaddingMobile,
        titlePaddingTypeDesktop
      ),
      "padding-bottom": generateCSSUnit(
        titleBottomPaddingMobile,
        titlePaddingTypeDesktop
      ),
      "padding-right": generateCSSUnit(
        htitlePaddingMobile,
        titlePaddingTypeDesktop
      ),
      "padding-left": generateCSSUnit(
        titleLeftPaddingMobile,
        titlePaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-content span": {
      "margin-top": generateCSSUnit(
        vcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
      "margin-bottom": generateCSSUnit(
        vcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
      "margin-right": generateCSSUnit(
        hcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
      "margin-left": generateCSSUnit(
        hcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
    },
    " .skt-blocks-icon svg": {
      width: generateCSSUnit(iconSizeMobile, iconSizeType),
      height: generateCSSUnit(iconSizeMobile, iconSizeType),
      "font-size": generateCSSUnit(iconSizeMobile, iconSizeType),
    },
    " .skt-blocks-icon-active svg": {
      width: generateCSSUnit(iconSizeMobile, iconSizeType),
      height: generateCSSUnit(iconSizeMobile, iconSizeType),
      "font-size": generateCSSUnit(iconSizeMobile, iconSizeType),
    },
  };

  if ("accordion" === layout && true === inactiveOtherItems) {
    selectors[
      " .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-content "
    ] = {
      display: "none",
    };
  }
  if ("accordion" === layout && false === inactiveOtherItems) {
    (selectors[
      " .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon-active"
    ] = {
      display: "inline-block",
    }),
      (selectors[
        " .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon"
      ] = {
        display: "none",
      });
  }
  if ("accordion" === layout && true === expandFirstItem) {
    selectors[
      "  > div:first-child > .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-content "
    ] = {
      display: "block",
    };
    (selectors[
      "  > div:first-child > .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon-active "
    ] = {
      display: "inline-block",
    }),
      (selectors[
        "  > div:first-child > .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon "
      ] = {
        display: "none",
      });
  }
  if ("grid" === layout) {
    selectors[
      "  .skt-blocks-accordion-item__outer-wrap "
    ] = {
      "text-align": align,
    };
    selectors[
      " .skt-blocks-accordion__wrap.skt-blocks-buttons-layout-wrap "
    ] = {
      "grid-template-columns": "repeat(" + columns + ", 1fr)",
      display: "grid",
    };
  }

  var styling_css = "";
  var id = `.skt-blocks-block-${block_id}`;

  styling_css = generateCSS(selectors, id);

  styling_css += generateCSS(tablet_selectors, id, true, "tablet");

  styling_css += generateCSS(mobile_selectors, id, true, "mobile");

  return styling_css;
}

const { InnerBlocks } = wp.blockEditor;

export default function save(props) {
  const { className } = props;
  const {
    block_id,
    schema,
    equalHeight,
      titleTextColor,
    titleActiveTextColor,
    titleBackgroundColor,
    titleActiveBackgroundColor,
  } = props.attributes;

  const equalHeightClass = equalHeight
    ? "skt-blocks-accordion-equal-height"
    : "";

  return (
    <div
      className={classnames(
        className,
        "skt-blocks-accordion__outer-wrap",
        `skt-blocks-block-${block_id}`,
        `skt-blocks-accordion-icon-${props.attributes.iconAlign}`,
        `skt-blocks-accordion-layout-${props.attributes.layout}`,
        `skt-blocks-accordion-expand-first-${props.attributes.expandFirstItem}`,
        `skt-blocks-accordion-inactive-other-${props.attributes.inactiveOtherItems}`,
        equalHeightClass
      )}
    >
      <Style>{styling(props)}</Style>
      <Style>
        {`
      .skt-blocks-accordion-titles-button.skt-blocks-accordion-titles {
        color: ${titleTextColor};
        background-color: ${titleBackgroundColor};
      }
      .skt-blocks-accordion-item-active .skt-blocks-accordion-titles-button.skt-blocks-accordion-titles {
        color: ${titleActiveTextColor};
        background-color: ${titleActiveBackgroundColor};
      }
      `}
      </Style>
      <div className="skt-blocks-accordion__wrap skt-blocks-buttons-layout-wrap">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
