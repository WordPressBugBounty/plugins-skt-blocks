/**
 * BLOCK: SKT Blocks Column
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/section", {
  title: __("Section", "skt-blocks"),
  description: __(
    "This block allows you to add section in your webpage.",
    "skt-blocks"
  ),
  icon: "welcome-widgets-menus",
  category: "skt_blocks",
  keywords: [
    __("section", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  supports: {
    align: ["wide", "full"],
    anchor: true,
  },
  attributes: {
    contentWidth: {
      type: "string",
      default: "boxed",
    },
    blockId: {
      type: "string",
    },
    width: {
      type: "number",
      default: 900,
    },
    innerWidth: {
      type: "number",
      default: 1140,
    },
    innerWidthTablet: {
      type: "number",
      default: 1140,
    },
    innerWidthMobile: {
      type: "number",
      default: 1140,
    },
    innerWidthType: {
      type: "string",
      default: "px",
    },
    themeWidth: {
      type: "boolean",
      default: false,
    },
    topPadding: {
      type: "number",
      default: 10,
    },
    topPaddingMobile: {
      type: "number",
      default: 10,
    },
    topPaddingTablet: {
      type: "number",
      default: 10,
    },
    bottomPadding: {
      type: "number",
      default: 10,
    },
    bottomPaddingMobile: {
      type: "number",
      default: 10,
    },
    bottomPaddingTablet: {
      type: "number",
      default: 10,
    },
    leftPadding: {
      type: "number",
      default: 10,
    },
    leftPaddingMobile: {
      type: "number",
      default: 10,
    },
    leftPaddingTablet: {
      type: "number",
      default: 10,
    },
    rightPadding: {
      type: "number",
      default: 10,
    },
    rightPaddingMobile: {
      type: "number",
      default: 10,
    },
    rightPaddingTablet: {
      type: "number",
      default: 10,
    },
    topMargin: {
      type: "number",
      default: 0,
    },
    bottomMargin: {
      type: "number",
      default: 0,
    },
    leftMargin: {
      type: "number",
      default: 0,
    },
    rightMargin: {
      type: "number",
      default: 0,
    },
    topMarginTablet: {
      type: "number",
      default: 0,
    },
    bottomMarginTablet: {
      type: "number",
      default: 0,
    },
    leftMarginTablet: {
      type: "number",
      default: 0,
    },
    rightMarginTablet: {
      type: "number",
      default: 0,
    },
    topMarginMobile: {
      type: "number",
      default: 0,
    },
    bottomMarginMobile: {
      type: "number",
      default: 0,
    },
    leftMarginMobile: {
      type: "number",
      default: 0,
    },
    rightMarginMobile: {
      type: "number",
      default: 0,
    },
    blockBorderStyle: {
      type: "string",
      default: "none",
    },
    blockBorderWidth: {
      type: "number",
      default: 1,
    },
    blockBorderRadius: {
      type: "number",
      default: 0,
    },
    blockBorderColor: {
      type: "string",
    },
    sectionTag: {
      type: "string",
      default: "section",
    },
    opacity: {
      type: "number",
      default: 20,
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
    backgroundImage: {
      type: "string",
    },
    backgroundPosition: {
      type: "string",
      default: "center-center",
    },
    backgroundSize: {
      type: "string",
      default: "cover",
    },
    backgroundRepeat: {
      type: "string",
      default: "no-repeat",
    },
    backgroundAttachment: {
      type: "string",
      default: "scroll",
    },
    backgroundImageColor: {
      type: "string",
    },
    overlayType: {
      type: "string",
      default: "color",
    },
    gradientOverlayColor1: {
      type: "string",
    },
    gradientOverlayColor2: {
      type: "string",
    },
    gradientOverlayType: {
      type: "string",
      default: "linear",
    },
    gradientOverlayLocation1: {
      type: "number",
      default: 0,
    },
    gradientOverlayLocation2: {
      type: "number",
      default: 100,
    },
    gradientOverlayAngle: {
      type: "number",
      default: 0,
    },
    gradientOverlayPosition: {
      type: "string",
      default: "center center",
    },
    backgroundVideo: {
      type: "object",
    },
    backgroundColor: {
      type: "string",
    },
    backgroundColor1: {
      type: "string",
    },
    backgroundColor2: {
      type: "string",
    },
    backgroundType: {
      type: "string",
      default: "none",
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
      default: 0,
    },
    boxShadowSpread: {
      type: "number",
      default: 0,
    },
    boxShadowPosition: {
      type: "string",
      default: "outset",
    },
    z_index: {
      type: "number",
      default: 1,
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
