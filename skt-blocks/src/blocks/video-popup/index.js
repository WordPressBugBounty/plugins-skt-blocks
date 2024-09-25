/**
 * Internal dependencies
 */
import Edit from "./components/edit";
import Save from "./components/save";
import {
  createBackgroundAttributes,
  createResponsiveAttributes,
} from "./util/index.js";

// Import CSS.
import "./styles/style.scss";
import "./styles/styles.editor.scss";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;
registerBlockType("skt-blocks/video-popup", {
  /* translators: block name */
  title: __("Video Popup", "skt-blocks"),
  category: "skt_blocks",
  /* translators: block description */
  description: __("Display a video popup", "skt-blocks"),
  icon: "video-alt3",
  keywords: [
    __("video", "skt-blocks"),
    /* translators: block keyword */
    __("YouTube Vimeo mp4", "skt-blocks"),
  ],
  example: {},
  supports: {
    align: ["center", "wide", "full"],
    html: false,
  },
  attributes: {
    align: {
      type: "string",
    },
    videoLink: {
      type: "string",
    },
    videoID: {
      type: "string",
      source: "attribute",
      selector: "[data-video]",
      attribute: "data-video",
    },
    borderRadius: {
      type: "number",
      default: "",
    },
    shadow: {
      type: "number",
      default: "",
    },
    playButtonType: {
      type: "string",
      default: "normal",
    },
    playButtonColor: {
      type: "string",
    },
    playButtonSize: {
      type: "number",
      default: 30,
    },
    vidwidth: {
      type: "number",
    },
    vidwidthTablet: {
      type: "number",
    },
    vidwidthMobile: {
      type: "number",
    },
    vidheight: {
      type: "number",
    },
    vidheightTablet: {
      type: "number",
    },
    vidheightMobile: {
      type: "number",
    },
    vidBackgroundColor: {
      type: "string",
    },
    opacity: {
      type: "number",
      default: 50,
    },
    imgURL: {
      type: "string",
    },
    imgID: {
      type: "number",
    },
    imgAlt: {
      type: "string",
      source: "attribute",
      attribute: "alt",
      selector: "img",
    },
    counterId: {
      type: "string",
      default: 1,
    },
    butopacity: {
      type: "number",
      default: 100,
    },
    blockBorderStyle: {
      type: "string",
      default: "none",
    },
    blockBorderWidth: {
      type: "number",
      default: 1,
    },
    blockBorderRadius: {
      type: "number",
    },
    blockBorderColor: {
      type: "string",
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
    },
    boxShadowSpread: {
      type: "number",
    },
    boxShadowPosition: {
      type: "string",
      default: "outset",
    },
    ...createBackgroundAttributes("preview%s"),
    previewBackgroundColor: {
      type: "string",
      default: "#000000",
    },

    hoverEffect: {
      type: "string",
      default: "",
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
