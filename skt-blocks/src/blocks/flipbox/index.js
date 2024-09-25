/**
 * BLOCK: SKT Blocks Pricing Table
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;
const ITEM_COUNT = 1;

const flipboxArray = [];
const defaultIcons = ["lightbulb", "dashboard", "shield"];
const defaultBackIcons = ["admin-site-alt3", "admin-media", "admin-users"];
for (var i = 1; i <= ITEM_COUNT; i++) {
  flipboxArray.push({
    title: "Front Title " + i,
    subtitle: "Front Subtitle " + i,
    back_title: "Back Title " + i,
    back_subtitle: "Back Subtitle " + i,
    icon: defaultIcons[i - 1],
    back_icon: defaultBackIcons[i - 1],
    front_button: "Button" + i,
    front_buttonURL: "",
    back_button: "Button" + i,
    back_buttonURL: "",
  });
}

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/flipbox", {
  title: __("Flipbox", "skt-blocks"),
  description: __(
    "This block allows you to add flipbox to your website.",
    "skt-blocks"
  ),
  icon: "image-rotate-right",
  category: "skt_blocks",
  keywords: [
    __("flipbox", "skt-blocks"),
    __("features", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  supports: {
    align: ["wide", "full"],
  },

  attributes: {
    blockId: {
      type: "string",
    },
    flipboxArray: {
      type: "array",
      default: flipboxArray,
    },
    count: {
      type: "number",
      default: ITEM_COUNT,
    },
    height: {
      type: "number",
      default: 420,
    },
    iconSize: {
      type: "number",
      default: 50,
    },
    backIconSize: {
      type: "number",
      default: 50,
    },
    transitionSpeed: {
      type: "number",
      default: 8,
    },
    backgroundImage: {
      type: "string",
    },
    backBackgroundImage: {
      type: "string",
    },
    colorOpacity: {
      type: "number",
      default: 30,
    },
    backColorOpacity: {
      type: "number",
      default: 30,
    },
    imageOpacity: {
      type: "number",
      default: 30,
    },
    backImageOpacity: {
      type: "number",
      default: 30,
    },
    buttonbackgroundType: {
      type: "string",
      default: "none",
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
      default: "#fff",
    },
    buttonHTextColor: {
      type: "string",
    },
    buttonHColor: {
      type: "string",
    },
    buttonopacity: {
      type: "number",
      default: 100,
    },
    buttonHopacity: {
      type: "number",
      default: 100,
    },
    buttonHbackgroundType: {
      type: "string",
      default: "none",
    },
    buttonHcolorLocation1: {
      type: "number",
      default: 0,
    },
    buttonHcolorLocation2: {
      type: "number",
      default: 100,
    },
    buttonHgradientDirection: {
      type: "number",
      default: 90,
    },
    buttonHbackgroundColor1: {
      type: "string",
    },
    buttonHbackgroundColor2: {
      type: "string",
      default: "#fff",
    },
    buttonBorderRadius: {
      type: "number",
      default: 0,
    },
    buttonHpadding: {
      type: "number",
      default: 20,
    },
    buttonVpadding: {
      type: "number",
      default: 10,
    },
    iconSelected: {
      type: "string",
      default: "editor-textcolor",
    },
    flipStyleSelected: {
      type: "string",
      default: "LTR",
    },
    align: {
      type: "string",
      default: "wide",
    },
    gutter: {
      type: "string",
      default: "medium",
    },
    contentAlign: {
      type: "string",
      default: "center",
    },
    frontTextColor: {
      type: "string",
    },
    frontBackgroundColor: {
      type: "string",
    },
    backTextColor: {
      type: "string",
    },
    backBackgroundColor: {
      type: "string",
    },
    buttonColor: {
      type: "string",
    },
    buttonTextColor: {
      type: "string",
    },
    iconColor: {
      type: "string",
    },
    backIconColor: {
      type: "string",
    },
    borderStyle: {
      type: "string",
      default: "none",
    },
    borderWidth: {
      type: "number",
      default: 2,
    },
    borderRadius: {
      type: "number",
    },
    borderColor: {
      type: "string",
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
    showFrontIcon: {
      type: "boolean",
      default: "true",
    },
    showFrontTitle: {
      type: "boolean",
      default: "true",
    },
    showFrontSubtitle: {
      type: "boolean",
      default: "true",
    },
    showBackIcon: {
      type: "boolean",
      default: "true",
    },
    showBackTitle: {
      type: "boolean",
      default: "true",
    },
    showBackSubtitle: {
      type: "boolean",
      default: "true",
    },
    showBackButton: {
      type: "boolean",
      default: "true",
    },
    colorButtonSelected: {
      type: "string",
    },
    topMargin: {
      type: "number",
      default: 0,
    },
    bottomMargin: {
      type: "number",
      default: 0,
    },
    topPadding: {
      type: "number",
      default: 0,
    },
    bottomPadding: {
      type: "number",
      default: 0,
    },
    leftPadding: {
      type: "number",
      default: 0,
    },
    rightPadding: {
      type: "number",
      default: 0,
    },
    backtopPadding: {
      type: "number",
      default: 0,
    },
    backbottomPadding: {
      type: "number",
      default: 0,
    },
    backleftPadding: {
      type: "number",
      default: 0,
    },
    backrightPadding: {
      type: "number",
      default: 0,
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
