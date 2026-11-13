/**
 * Deprecated (v2.6) registration for blockquote.
 * Reproduces pre-change save markup so existing blocks migrate silently.
 */
import SaveV26 from "./components/save-v26";

/**
 * BLOCK: SKT Blocks Quote
 */

// Import block dependencies and components

// Import CSS

// Internationalization
const { __ } = wp.i18n;

// Register block

// Register the block

const attributesV26 = {
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
  };

const deprecated = [
  {
    attributes: attributesV26,
    save: (props) => <SaveV26 {...props} />,
  },
];

export default deprecated;
