/**
 * BLOCK: SKT Blocks Space Divider
 */

// Import block dependencies and components
import classnames from "classnames";
import Edit from "./components/edit";
import Save from "./components/save";

// Components
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/divider", {
  title: __("Divider", "skt-blocks"),
  description: __(
    "Add a divider and spacer between your blocks.",
    "skt-blocks"
  ),
  icon: "minus",
  category: "skt_blocks",
  keywords: [
    __("divider", "skt-blocks"),
    __("spacer", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    spacerHeight: {
      type: "number",
      default: 30,
    },
    spacerDivider: {
      type: "boolean",
      default: false,
    },
    spacerDividerStyle: {
      type: "string",
      default: "solid",
    },
    spacerDividerColor: {
      type: "string",
      default: "#000000",
    },
    spacerDividerHeight: {
      type: "number",
      default: 7,
    },
    spacerDividerWidth: {
      type: "number",
      default: 60,
    },
    spacerDividerAlignment: {
      type: "string",
      default: "center",
    },
  },

  skt_blocks_settings_data: {
    skt_blocks_spacer_spacerHeight: {
      title: __("Vertical Margin", "skt-blocks"),
    },
    skt_blocks_spacer_spacerDivider: {
      title: __("Add Divider", "skt-blocks"),
    },
    skt_blocks_spacer_spacerDividerStyle: {
      title: __("Divider Style", "skt-blocks"),
    },
    skt_blocks_spacer_spacerDividerHeight: {
      title: __("Divider Height", "skt-blocks"),
    },
    skt_blocks_spacer_spacerDividerWidth: {
      title: __("Divider Width", "skt-blocks"),
    },
    skt_blocks_spacer_dividerColor: {
      title: __("Divider Color", "skt-blocks"),
    },
  },

  supports: { align: ["wide", "full", "center"] },

  /* Render the block in the editor. */
  edit: (props) => {
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    return <Save {...props} />;
  },
});
