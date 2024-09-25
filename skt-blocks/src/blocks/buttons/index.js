/**
 * BLOCK: SKT Blocks Buttons
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;

const buttons = [];

for (var i = 1; i <= 2; i++) {
  var label = "#Click Here";
  var link = "#";
  buttons.push({
    label: label,
    link: link,
    size: "",
    vPadding: 10,
    hPadding: 14,
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: "solid",
    borderColor: "",
    borderHColor: "",
    color: "",
    background: "",
    hColor: "",
    hBackground: "",
    sizeType: "px",
    sizeMobile: "",
    sizeTablet: "",
    lineHeight: "",
    lineHeightType: "em",
    lineHeightMobile: "",
    lineHeightTablet: "",
  });
}

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/buttons", {
  title: __("Multi Buttons", "skt-blocks"),
  description: __(
    "Add buttons to group together.",
    "skt-blocks"
  ),
  icon: "button",
  category: "skt_blocks",
  keywords: [
    __("buttons", "skt-blocks"),
    __("multi buttons", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    buttonAlignment: {
      type: "string",
      default: "center",
    },
    buttonAlignmentTablet: {
      type: "string",
      default: "center",
    },
    buttonAlignmentMobile: {
      type: "string",
      default: "center",
    },
    buttons: {
      type: "array",
      default: buttons,
    },
    gap: {
      type: "number",
      default: 10,
    },
    stack: {
      type: "string",
      default: "none",
    },
    btn_count: {
      type: "number",
      default: 2,
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
