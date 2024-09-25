/**
 * BLOCK: SKT Blocks Quote
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
registerBlockType("skt-blocks/blockquote", {
  title: __("Blockquote", "skt-blocks"),
  description: __(
    "This block allows you to add an blockquote in your website",
    "skt-blocks"
  ),
  icon: "editor-quote",
  category: "skt_blocks",
  keywords: [
    __("quote", "skt-blocks"),
    __("blockquote", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    quoteContent: {
      type: "string",
    },
    quoteBackgroundColor: {
      type: "string",
    },
    quoteTextColor: {
      type: "string",
    },
    quoteFontFamily: {
      type: "string",
    },
    quoteFontSize: {
      type: "number",
      default: 18,
    },
    quoteFontWeight: {
      type: "string",
      default: "400",
    },
    quoteLineHeight: {
      type: "number",
      default: 1,
    },
    quoteSize: {
      type: "number",
      default: 70,
    },
    quoteColor: {
      type: "string",
    },
    borderStyle: {
      type: "string",
      default: "none",
    },
    borderWidth: {
      type: "number",
      default: 1,
    },
    blockBorderRadius: {
      type: "number",
      default: 0,
    },
    borderColor: {
      type: "string",
    },
    leftPadding: {
      type: "number",
      default: 60,
    },
    rightPadding: {
      type: "number",
      default: 60,
    },
    topPadding: {
      type: "number",
      default: 70,
    },
    bottomPadding: {
      type: "number",
      default: 70,
    },
    quoteHposition: {
      type: "number",
      default: 30,
    },
    quoteVposition: {
      type: "number",
      default: 20,
    },
    quoteAlign: {
      type: "string",
      default: "left-aligned",
    },
    quoteOpacity: {
      type: "number",
      default: 100,
    },
    showQuote: {
      type: "boolean",
      default: true,
    },
    opacity: {
      type: "number",
      default: 100,
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
    icon: {
      type: "string",
      default: "round-fat",
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
      default: 20,
    },
    boxShadowSpread: {
      type: "number",
      default: 20,
    },
    boxShadowPosition: {
      type: "string",
      default: "outset",
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
