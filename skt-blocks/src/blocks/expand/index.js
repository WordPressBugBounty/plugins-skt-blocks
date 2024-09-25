/**
 * BLOCK: SKT Blocks Expand/Show More
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
registerBlockType("skt-blocks/expand", {
  title: __("Expand/Show More", "skt-blocks"),
  description: __(
    "This block allows you to add expand/show more block in your webpage.",
    "skt-blocks"
  ),
  icon: "editor-expand",
  category: "skt_blocks",
  keywords: [
    __("expand", "skt-blocks"),
    __("show more", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  supports: {
    align: ["wide", "full", "center", "left", "right"],
  },
  attributes: {
    blockTitle: {
      type: "string",
      default: "Title for this block",
    },
    expandLessText: {
      type: "string",
      default: "Some short text that can be expanded to show more details.",
    },
    expandMoreText: {
      type: "string",
      default:
        "Some short text that can be expanded to show more details. Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
    },
    moreLabel: {
      type: "string",
      default: "Show more",
    },
    lessLabel: {
      type: "string",
      default: "Show less",
    },
    showTitle: {
      type: "boolean",
      default: true,
    },
    expandAlignment: {
      type: "string",
    },
    textColor: {
      type: "string",
    },
    linkColor: {
      type: "string",
    },
    titleColor: {
      type: "string",
    },
    titleSpace: {
      type: "number",
      default: 28,
    },
    textSpace: {
      type: "number",
      default: 20,
    },
    linkSpace: {
      type: "number",
      default: 18,
    },
    titleFontFamily: {
      type: "string",
    },
    textFontFamily: {
      type: "string",
    },
    linkFontFamily: {
      type: "string",
    },
    titleFontSize: {
      type: "number",
      default: 20,
    },
    titleFontWeight: {
      type: "number",
      default: 400,
    },
    titleLineHeight: {
      type: "number",
      default: 1,
    },
    textFontSize: {
      type: "number",
      default: 16,
    },
    textFontWeight: {
      type: "number",
      default: 400,
    },
    textLineHeight: {
      type: "number",
      default: 2,
    },
    linkFontSize: {
      type: "number",
      default: 16,
    },
    linkFontWeight: {
      type: "number",
      default: 400,
    },
    linkLineHeight: {
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
