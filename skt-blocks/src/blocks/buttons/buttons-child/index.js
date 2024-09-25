/**
 * BLOCK: SKT Blocks Buttons
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";

// Internationalization
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/buttons-child", {
  title: __("Buttons Child", "skt-blocks"),
  description: __(
    "Add buttons to group together.",
    "skt-blocks"
  ),
  icon: "button",
  parent: ["skt-blocks/buttons"],
  category: "skt_blocks",
  keywords: [
    __("buttons", "skt-blocks"),
    __("multiple buttons", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  attributes: {
    buttonAlignment: {
      type: "string",
      default: "center",
    },
    fontFamily: {
      type: "string",
      default: "Default",
    },
    fontWeight: {
      type: "string",
    },
    fontSubset: {
      type: "string",
    },
    label: {
      type: "string",
      default: "#Click Here",
    },
    link: {
      type: "string",
      default: "",
    },
    target: {
      type: "string",
      default: "_blank",
    },
    iconsize: {
      type: "number",
      default: 16,
    },
    counterId: {
      type: "string",
      default: 1,
    },
    vPadding: {
      type: "number",
      default: 10,
    },
    hPadding: {
      type: "number",
      default: 14,
    },
    vPaddingTablet: {
      type: "number",
      default: 10,
    },
    hPaddingTablet: {
      type: "number",
      default: 14,
    },
    vPaddingMobile: {
      type: "number",
      default: 10,
    },
    hPaddingMobile: {
      type: "number",
      default: 14,
    },
    vMargin: {
      type: "number",
      default: 10,
    },
    vMarginTablet: {
      type: "number",
      default: 10,
    },
    vMarginMobile: {
      type: "number",
      default: 10,
    },
    hMargin: {
      type: "number",
      default: 14,
    },
    hMarginTablet: {
      type: "number",
      default: 10,
    },
    hMarginMobile: {
      type: "number",
      default: 5,
    },
    borderWidth: {
      type: "number",
      default: 1,
    },
    borderRadius: {
      type: "number",
      default: 2,
    },
    borderStyle: {
      type: "string",
      default: "solid",
    },
    borderColor: {
      type: "string",
    },
    borderHColor: {
      type: "string",
    },
    color: {
      type: "string",
    },
    background: {
      type: "string",
    },
    hColor: {
      type: "string",
    },
    sizeType: {
      type: "string",
      default: "px",
    },
    sizeMobile: {
      type: "number",
      default: "",
    },
    sizeTablet: {
      type: "number",
      default: "",
    },
    lineHeight: {
      type: "number",
      default: "",
    },
    lineHeightType: {
      type: "string",
      default: "em",
    },
    lineHeightMobile: {
      type: "number",
      default: "",
    },
    lineHeightTablet: {
      type: "number",
      default: "",
    },
    opensInNewTab: {
      type: "boolean",
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
    opacity: {
      type: "number",
      default: 100,
    },
    icon: {
      type: "string",
      default: "",
    },
    iconPosition: {
      type: "string",
      default: "after",
    },
    buttonFontFamily: {
      type: "string",
    },
    buttonFontSize: {
      type: "number",
    },
    buttonFontSizeTablet: {
      type: "number",
    },
    buttonFontSizeMobile: {
      type: "number",
    },
    buttonLineHeight: {
      type: "number",
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
    icon_hover_color: {
      type: "string",
    },
    hbackground: {
      type: "string",
    },
    iconSpace: {
      type: "number",
      default: 8,
    },
    buttonFontWeight: {
      type: "string",
      default: "400",
    },
    inheritFromTheme: {
      type: "boolean",
      default: false,
    },
    hoverEffect: {
      type: "string",
    },
    backgroundType: {
      type: "string",
      default: "none",
    },
  },
  skt_blocks_settings_data: {
    skt_blocks_button_buttonAlignment: {
      title: __("Alignment", "skt-blocks"),
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
