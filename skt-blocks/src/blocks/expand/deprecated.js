/**
 * Deprecated (v2.6) registration for expand.
 * Reproduces pre-change save markup so existing blocks migrate silently.
 */
import SaveV26 from "./components/save-v26";

/**
 * BLOCK: SKT Blocks Expand/Show More
 */

// Import block dependencies and components

// Import CSS

// Internationalization
const { __ } = wp.i18n;

// Register block

// Register the block

const attributesV26 = {
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
  };

const deprecated = [
  {
    attributes: attributesV26,
    save: (props) => <SaveV26 {...props} />,
  },
];

export default deprecated;
