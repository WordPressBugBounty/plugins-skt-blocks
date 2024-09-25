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
registerBlockType("skt-blocks/icons-list-child", {
  title: __("Icons List Child", "skt-blocks"),
  description: __("Add list of icons.", "skt-blocks"),
  icon: "list-view",
  category: "skt_blocks",
  parent: ["skt-blocks/icons-list"],
  keywords: [
    __("icons", "skt-blocks"),
    __("list", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  attributes: {
    label: {
      selector: ".skt-blocks-icon-list__label",
      default: "#Label",
    },
    image_icon: {
      type: "string",
      default: "icon",
    },
    hideLabel: {
      type: "boolean",
      default: false,
    },
    icon: {
      type: "string",
      default: "fab fa-arrow-circle-right",
    },
    image: {
      type: "object",
    },
    icon_color: {
      type: "string",
      default: "#3a3a3a",
    },
    label_color: {
      type: "string",
    },
    icon_hover_color: {
      type: "string",
    },
    label_hover_color: {
      type: "string",
    },
    icon_bg_color: {
      type: "string",
    },
    icon_bg_hover_color: {
      type: "string",
    },
    icon_border_color: {
      type: "string",
    },
    icon_border_hover_color: {
      type: "string",
    },
    link: {
      type: "string",
      default: "#",
    },
    target: {
      type: "boolean",
      default: false,
    },
    disableLink: {
      type: "boolean",
      default: true,
    },
    counterId: {
      type: "string",
      default: 1,
    },
    source_type: {
      type: "string",
      default: "icon",
    },
  },
  skt_blocks_settings_data: {
    skt_blocks_icon_icon: {
      title: __("Icon", "skt-blocks"),
    },
    skt_blocks_icon_label_color: {
      title: __("Text Color", "skt-blocks"),
    },
    skt_blocks_icon_icon_color: {
      title: __("Icon Color", "skt-blocks"),
    },
    skt_blocks_icon_icon_bg_color: {
      title: __("Icon Background Color", "skt-blocks"),
    },
    skt_blocks_icon_icon_border_color: {
      title: __("Icon Border Color", "skt-blocks"),
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
