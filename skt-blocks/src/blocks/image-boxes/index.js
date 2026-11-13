/**
 * BLOCK: SKT Blocks Image Boxes Block
 */

// Import block dependencies and components
import React from "react";
import Style from "style-it";

import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;
const ITEM_COUNT = 2;

const imageboxesBlock = [];

for (var i = 1; i <= ITEM_COUNT; i++) {
  imageboxesBlock.push({
    title: __("Image Box Title", "skt-blocks") + i,
    hover_description:
      __(
        "Description - This space for describing this imagebox block",
        "skt-blocks"
      ) + i,
    img_url: "",
    img_id: "",
    cta_url: "",
  });
}

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/image-boxes-block", {
  title: __("Image Boxes", "skt-blocks"),
  description: __(
    "This block allows you to add descriptions blocks.",
    "skt-blocks"
  ),
  icon: "welcome-widgets-menus",
  category: "skt_blocks",
  keywords: [
    __("imagebox", "skt-blocks"),
    __("titles", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    imageboxesBlock: {
      type: "array",
      default: imageboxesBlock,
    },
    counterId: {
      type: "string",
      default: 1,
    },
    count: {
      type: "number",
      default: ITEM_COUNT,
    },
    titleHeadingTag: {
      type: "string",
      default: "h3",
    },
    gutter: {
      type: "string",
      default: "medium",
    },
    contentAlign: {
      type: "string",
      default: "center",
    },
    textColor: {
      type: "string",
    },
    itemBackgroundColor: {
      type: "string",
    },
    hoverTextColor: {
      type: "string",
    },
    verticalAlignment: {
      type: "string",
      default: "center",
    },
    itemHoverBackgroundColor: {
      type: "string",
    },
    hoverBorderColor: {
      type: "string",
    },
    titleSpacing: {
      type: "number",
    },
    descriptionSpacing: {
      type: "number",
    },
    boxRadius: {
      type: "number",
    },
    boxPaddingLeft: {
      type: "number",
      default: 15,
    },
    boxPaddingRight: {
      type: "number",
      default: 15,
    },
    boxPaddingBottom: {
      type: "number",
      default: 15,
    },
    boxPaddingTop: {
      type: "number",
      default: 15,
    },
    boxHeight: {
      type: "number",
    },
    boxPaddingTopTablet: { type: "number" },
    boxPaddingTopMobile: { type: "number" },
    boxPaddingLeftTablet: { type: "number" },
    boxPaddingLeftMobile: { type: "number" },
    boxPaddingRightTablet: { type: "number" },
    boxPaddingRightMobile: { type: "number" },
    boxPaddingBottomTablet: { type: "number" },
    boxPaddingBottomMobile: { type: "number" },
    titleSpacingTablet: { type: "number" },
    titleSpacingMobile: { type: "number" },
    descriptionSpacingTablet: { type: "number" },
    descriptionSpacingMobile: { type: "number" },
    hideDesktop: { type: "boolean", default: false },
    hideTablet: { type: "boolean", default: false },
    hideMobile: { type: "boolean", default: false },
    hideLoggedIn: { type: "boolean", default: false },
    hideLoggedOut: { type: "boolean", default: false },
    hasArrow: {
      type: "boolean",
    },
    hasArrow: {
      type: "boolean",
    },
    arrowColor: {
      type: "string",
    },
    arrowSize: {
      type: "number",
    },
    boxShadowColor: {
      type: "string",
    },
    boxShadowHOffset: {
      type: "number",
      default: 9,
    },
    boxShadowVOffset: {
      type: "number",
      default: 9,
    },
    boxShadowBlur: {
      type: "number",
      default: 9,
    },
    opacity: {
      type: "number",
      default: 70,
    },
    hoverOpacity: {
      type: "number",
      default: 70,
    },
    boxShadowSpread: {
      type: "number",
      default: 9,
    },
    boxShadowPosition: {
      type: "string",
      default: "outset",
    },
    backgroundPosition: {
      type: "string",
    },
    backgroundSize: {
      type: "string",
    },
    backgroundRepeat: {
      type: "string",
    },
    imageHoverEffect: {
      type: "string",
    },
    bggradient: {
      type: "string",
    },
    secondaryBackgroundColor: {
      type: "string",
    },
    hoverSecondaryBackgroundColor: {
      type: "string",
    },
    gradientDegree: {
      type: "number",
      default: 180,
    },
    bgGradient: {
      type: "boolean",
      default: false,
    },
    hoverGradientDegree: {
      type: "number",
      default: 180,
    },
    hoverBgGradient: {
      type: "boolean",
      default: false,
    },
    titleFontFamily: {
      type: "string",
    },
    descriptionFontFamily: {
      type: "string",
    },
    titleFontSize: {
      type: "number",
    },
    titleFontSizeMobile: {
      type: "number",
    },
    titleFontSizeTablet: {
      type: "number",
    },
    titleFontWeight: {
      type: "string",
    },
    imageSize: {
      type: "string",
      default: "full",
    },
    titleLineHeight: {
      type: "number",
    },
    titleColor: {
      type: "string",
    },
    descriptionFontSize: {
      type: "number",
    },
    descriptionFontWeight: {
      type: "string",
    },
    descriptionLineHeight: {
      type: "number",
    },
    descriptionColor: {
      type: "string",
    },
  },

  /* Render the block in the editor. */
  edit: (props) => {
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    return <Save {...props} />;
  },
});
