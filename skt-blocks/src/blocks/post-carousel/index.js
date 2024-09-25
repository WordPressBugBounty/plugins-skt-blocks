/**
 * BLOCK: SKT Blocks Post and Page Grid
 */

// Import block dependencies and components
import edit from "./components/edit";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Components
const { __ } = wp.i18n;

// Register block controls
const { registerBlockType } = wp.blocks;

// Register alignments
const validAlignments = ["center", "wide", "full"];

// Register the block
registerBlockType("skt-blocks/post-carousel", {
  title: __("Post Carousel", "skt-blocks"),
  description: __(
    "Display posts as a carousel.",
    "skt-blocks"
  ),
  icon: "slides",
  category: "skt_blocks",
  keywords: [
    __("slider", "skt-blocks"),
    __("posts", "skt-blocks"),
    __("blog", "skt-blocks"),
    __("latest", "skt-blocks"),
    __("carousel", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},

  getEditWrapperProps(attributes) {
    const { align } = attributes;
    if (-1 !== validAlignments.indexOf(align)) {
      return { "data-align": align };
    }
  },

  edit,

  // Render via PHP
  save() {
    return null;
  },
});
