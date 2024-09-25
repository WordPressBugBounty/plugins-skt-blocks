/**
 * BLOCK: Atomic Blocks Call-To-Action
 */

// Import block dependencies and components
import classnames from "classnames";
import Inspector from "./components/inspector";
import CallToAction from "./components/cta";
import Edit from "./components/edit";
import Save from "./components/save";

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
  AlignmentToolbar,
  URLInput,
  BlockControls,
  BlockAlignmentToolbar,
  RichText,
} = wp.blockEditor;

// Register components
const { Button, Dashicon, Icon } = wp.components;

const blockAttributes = {
  buttonText: {
    type: "string",
  },
  buttonUrl: {
    type: "string",
    source: "attribute",
    selector: "a",
    attribute: "href",
  },
  buttonAlignment: {
    type: "string",
    default: "center",
  },
  buttonBackgroundColor: {
    type: "string",
  },
  buttonTextColor: {
    type: "string",
  },
  buttonSize: {
    type: "string",
    default: "skt-blocks-cta-button-size-medium",
  },
  buttonShape: {
    type: "string",
    default: "skt-blocks-cta-button-shape-rounded",
  },
  buttonTarget: {
    type: "boolean",
    default: false,
  },
  ctaTitle: {
    type: "array",
    selector: ".skt-blocks-cta-title",
    source: "children",
  },
  ctaTitleFontFamily: {
    type: "string",
  },
  ctaTextFontFamily: {
    type: "string",
  },
  ctaTitleFontSize: {
    type: "number",
    default: "22",
  },
  ctaTitleFontSizeMobile: {
    type: "number",
    default: "22",
  },
  ctaTitleFontSizeTablet: {
    type: "number",
    default: "22",
  },
  ctaTextFontSize: {
    type: "number",
    default: "16",
  },
  ctaText: {
    type: "array",
    selector: ".skt-blocks-cta-text",
    source: "children",
  },
  ctaWidth: {
    type: "string",
  },
  ctaBackgroundColor: {
    type: "string",
  },
  ctaTextColor: {
    type: "string",
  },
  imgURL: {
    type: "string",
  },
  imgID: {
    type: "number",
  },
  imgAlt: {
    type: "string",
    source: "attribute",
    attribute: "alt",
    selector: "img",
  },
  dimRatio: {
    type: "number",
    default: 50,
  },
  opacity: {
    type: "number",
    default: 100,
  },
  headingLineHeight: {
    type: "number",
    default: 1.8,
  },
  headingFontWeight: {
    type: "string",
    default: "400",
  },
  contentLineHeight: {
    type: "number",
    default: 1.75,
  },
  contentFontWeight: {
    type: "string",
    default: "400",
  },
  buttonvPadding: {
    type: "number",
    default: 10,
  },
  buttonhPadding: {
    type: "number",
    default: 14,
  },
  buttonborderWidth: {
    type: "number",
    default: 1,
  },
  buttonborderStyle: {
    type: "string",
    default: "solid",
  },
  icon: {
    type: "string",
    default: "",
  },
  iconPosition: {
    type: "string",
    default: "after",
  },
  counterId: {
    type: "string",
    default: 1,
  },
  hbuttonBackgroundColor: {
    type: "string",
  },
  hbuttonTextColor: {
    type: "string",
  },
  buttonborderColor: {
    type: "string",
  },
  buttonborderHColor: {
    type: "string",
  },
  resctaType: {
    type: "string",
    default: "button",
  },
  ctalinkText: {
    type: "string",
  },
  titleSpace: {
    type: "number",
    default: 25,
  },
  subtitleSpace: {
    type: "number",
    default: 28,
  },
  iconSpace: {
    type: "number",
    default: 8,
  },
  colorLocation1: {
    type: "number",
    default: 0,
  },
  colorLocation2: {
    type: "number",
    default: 100,
  },
  gradientDirection: {
    type: "number",
    default: 90,
  },
  backgroundColor1: {
    type: "string",
  },
  backgroundColor2: {
    type: "string",
  },
  backgroundType: {
    type: "string",
    default: "color",
  },
  buttoncolorLocation1: {
    type: "number",
    default: 0,
  },
  buttoncolorLocation2: {
    type: "number",
    default: 100,
  },
  buttongradientDirection: {
    type: "number",
    default: 90,
  },
  buttonbackgroundColor1: {
    type: "string",
  },
  buttonbackgroundColor2: {
    type: "string",
  },
  buttonbackgroundType: {
    type: "string",
    default: "color",
  },
  boxShadowColor: {
    type: "string",
  },
  boxShadowHOffset: {
    type: "number",
    default: 0,
  },
  boxShadowVOffset: {
    type: "number",
    default: 0,
  },
  boxShadowBlur: {
    type: "number",
  },
  boxShadowSpread: {
    type: "number",
  },
  boxShadowPosition: {
    type: "string",
    default: "outset",
  },
  icon_color: {
    type: "string",
    default: "#3a3a3a",
  },
  topPadding: {
    type: "number",
    default: 20,
  },
  bottomPadding: {
    type: "number",
    default: 20,
  },
  leftPadding: {
    type: "number",
    default: 20,
  },
  rightPadding: {
    type: "number",
    default: 20,
  },
  imagePosition: {
    type: "string",
    default: "center center",
  },
  imageRepeat: {
    type: "string",
    default: "no-repeat",
  },
  thumbsize: {
    type: "string",
    default: "cover",
  },
  buttonSpace: {
    type: "number",
    default: 28,
  },
  borderRadius: {
    type: "number",
    default: 12,
  },
};

// Register the block
registerBlockType(
  "skt-blocks/skt-blocks-cta",
  {
    title: __("Call To Action", "skt-blocks"),
    description: __(
      "Add a call to action section with a title, text, and a button.",
      "skt-blocks"
    ),
    icon: "megaphone",
    category: "skt_blocks",
    keywords: [
      __("call to action", "skt-blocks"),
      __("cta", "skt-blocks"),
      __("responsive", "skt-blocks"),
    ],
    example: {},
    attributes: blockAttributes,

    skt_blocks_settings_data: {
      skt_blocks_cta_textOptions: {
        title: __("Text Options", "skt-blocks"),
      },
      skt_blocks_cta_backgroundOptions: {
        title: __("Background Options", "skt-blocks"),
      },
      skt_blocks_cta_buttonOptions: {
        title: __("Button Options", "skt-blocks"),
      },
    },

    getEditWrapperProps({ ctaWidth }) {
      if ("left" === ctaWidth || "right" === ctaWidth || "full" === ctaWidth) {
        return { "data-align": ctaWidth };
      }
    },

    /* Render the block in the editor. */
    edit: (props) => {
      return <Edit {...props} />;
    },

    /* Save the block markup. */
    save: (props) => {
      return <Save {...props} />;
    },
  }
);
