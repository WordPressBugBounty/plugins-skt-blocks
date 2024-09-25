/**
 * BLOCK: SKT Blocks Post and Page Grid
 */

// Import block dependencies and components
import edit from "./components/edit";

//Import Block icon
import ResponsiveBlockEditorAddonsIcons from "../../block-icons";

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
registerBlockType(
  "skt-blocks/skt-blocks-post-grid",
  {
    title: __(
      "Post and Page Grid",
      "skt-blocks"
    ),
    description: __(
      "Add a grid or list of customizable posts or pages.",
      "skt-blocks"
    ),
    icon: "grid-view",
    category: "skt_blocks",
    keywords: [
      __("post", "skt-blocks"),
      __("page", "skt-blocks"),
      __("grid", "skt-blocks"),
    ],
    example: {},

    getEditWrapperProps(attributes) {
      const { align } = attributes;
      if (-1 !== validAlignments.indexOf(align)) {
        return { "data-align": align };
      }
    },

    edit,

    skt_blocks_settings_data: {
      skt_blocks_postgrid_postType: {
        title: __("Content Type", "skt-blocks"),
      },
      skt_blocks_postgrid_queryControls: {
        title: __("Query Controls", "skt-blocks"),
      },
      skt_blocks_postgrid_offset: {
        title: __("Post Offset", "skt-blocks"),
      },
      skt_blocks_postgrid_columns: {
        title: __("Columns", "skt-blocks"),
      },
      skt_blocks_postgrid_displaySectionTitle: {
        title: __("Display Section Title", "skt-blocks"),
      },
      skt_blocks_postgrid_sectionTitle: {
        title: __("Section Title", "skt-blocks"),
      },
      skt_blocks_postgrid_displayPostImage: {
        title: __("Display Featured Image", "skt-blocks"),
      },
      skt_blocks_postgrid_imageSizeValue: {
        title: __("Image Size", "skt-blocks"),
      },
      skt_blocks_postgrid_displayPostTitle: {
        title: __("Display Post Title", "skt-blocks"),
      },
      skt_blocks_postgrid_displayPostAuthor: {
        title: __("Display Post Author", "skt-blocks"),
      },
      skt_blocks_postgrid_displayPostDate: {
        title: __("Display Post Date", "skt-blocks"),
      },
      skt_blocks_postgrid_displayPostExcerpt: {
        title: __("Display Post Excerpt", "skt-blocks"),
      },
      skt_blocks_postgrid_excerptLength: {
        title: __("Excerpt Length", "skt-blocks"),
      },
      skt_blocks_postgrid_displayPostLink: {
        title: __(
          "Display Continue Reading Link",
          "skt-blocks"
        ),
      },
      skt_blocks_postgrid_readMoreText: {
        title: __("Read More Text", "skt-blocks"),
      },
      skt_blocks_postgrid_sectionTag: {
        title: __("Post Grid Section Tag", "skt-blocks"),
      },
      skt_blocks_postgrid_sectionTitleTag: {
        title: __(
          "Section Title Heading Tag",
          "skt-blocks"
        ),
      },
      skt_blocks_postgrid_postTitleTag: {
        title: __("Post Title Heading Tag", "skt-blocks"),
      },
    },

    // Render via PHP
    save() {
      return null;
    },
  }
);
