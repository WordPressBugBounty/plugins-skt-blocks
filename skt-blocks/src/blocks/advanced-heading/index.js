/**
 * BLOCK: SKT Blocks Advanced Heading
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
registerBlockType("skt-blocks/advanced-heading", {
  title: __("Advanced Heading", "skt-blocks"),
  description: __(
    "Add a combination of a heading and a sub-heading with a separator in between.",
    "skt-blocks"
  ),
  icon: "editor-textcolor",
  category: "skt_blocks",
  keywords: [
    __("heading", "skt-blocks"),
    __("advanced heading", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    headingTitle: {
      source: "html",
      selector: "h1,h2,h3,h4,h5,h6",
    },
    block_id: {
      type: "string",
    },
    headingId: {
      type: "string",
    },
    headingDesc: {
      source: "html",
      selector: "p",
      default: "",
    },
    showHeading: {
      type: "boolean",
      default: "true",
    },
    showSubHeading: {
      type: "boolean",
      default: "true",
    },
    showSeparator: {
      type: "boolean",
      default: "true",
    },
    seperatorStyle: {
      type: "string",
      default: "solid",
    },
    separatorHeight: {
      type: "number",
      default: 3,
    },
    separatorWidth: {
      type: "number",
      default: 20,
    },
    separatorWidthType: {
      type: "string",
      default: "%",
    },
    separatorColor: {
      type: "string",
    },
    headSpacing: {
      type: "number",
      default: 15,
    },
    subheadSpacing: {
      type: "number",
      default: 15,
    },
    separatorSpacing: {
      type: "number",
      default: 15,
    },
    headSpacingTablet: {
      type: "number",
      default: 15,
    },
    subheadSpacingTablet: {
      type: "number",
      default: 15,
    },
    separatorSpacingTablet: {
      type: "number",
      default: 15,
    },
    headSpacingMobile: {
      type: "number",
      default: 15,
    },
    subheadSpacingMobile: {
      type: "number",
      default: 15,
    },
    separatorSpacingMobile: {
      type: "number",
      default: 15,
    },
    headingTitleFontFamily: {
      type: "string",
    },
    headingTitleFontSize: {
      type: "number",
    },
    headingTitleFontSizeMobile: {
      type: "number",
    },
    headingTitleFontSizeTablet: {
      type: "number",
    },
    headingTitleFontWeight: {
      type: "string",
      default: "600",
    },
    headingTitleLineHeight: {
      type: "number",
      default: 1,
    },
    headingTitleLetterSpacing: {
      type: "number",
      default: 0,
    },
    headingTitleColor: {
      type: "string",
    },
    subHeadingTitleFontFamily: {
      type: "string",
    },
    subHeadingTitleFontSize: {
      type: "number",
    },
    subHeadingTitleFontSizeMobile: {
      type: "number",
    },
    subHeadingTitleFontSizeTablet: {
      type: "number",
    },
    subHeadingTitleFontWeight: {
      type: "string",
      default: "400",
    },
    subHeadingTitleLineHeight: {
      type: "number",
      default: 1,
    },
    subHeadingTitleLetterSpacing: {
      type: "number",
      default: 0,
    },
    subHeadingTitleColor: {
      type: "string",
    },
    headingTag: {
      type: "string",
      default: "h2",
    },
    level: {
      type: "number",
      default: 2,
    },
    headingAlignment: {
      type: "string",
      default: "center",
    },
    headingAlignmentTablet: {
      type: "string",
      default: "center",
    },
    headingAlignmentMobile: {
      type: "string",
      default: "center",
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
