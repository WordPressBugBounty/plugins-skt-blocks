/**
 * BLOCK: SKT Blocks Googlemap
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
registerBlockType("skt-blocks/googlemap", {
  title: __("Google Map", "skt-blocks"),
  description: __(
    "Add an address or location to drop a pin on a Google map.",
    "skt-blocks"
  ),
  icon: "location",
  category: "skt_blocks",
  keywords: [
    __("address", "skt-blocks"),
    __("map", "skt-blocks"),
    __("google", "skt-blocks"),
    __("directions", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    address: {
      type: "string",
    },
    apiKey: {
      type: "string",
    },
    zoom: {
      type: "number",
      default: 12,
    },
    height: {
      type: "number",
      default: 400,
    },
    pinned: {
      type: "boolean",
      default: false,
    },
  },
  skt_blocks_settings_data: {
    skt_blocks_map_zoom: {
      title: __("Zoom", "skt-blocks"),
    },
    skt_blocks_map_height: {
      title: __("Height in pixels", "skt-blocks"),
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
