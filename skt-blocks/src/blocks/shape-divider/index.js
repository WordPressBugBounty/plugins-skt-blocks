/**
 * Internal dependencies
 */
import edit from "./components/edit";
import icon from "./icon";
import metadata from "./components/block.json";
import save from "./components/save";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

import { registerBlockType } from "@wordpress/blocks";

registerBlockType("skt-blocks/shape-divider", {
  /* translators: block name */
  title: __("Shape Divider", "skt-blocks"),
  category: "skt_blocks",
  /* translators: block description */
  description: __(
    "Add a shape divider to visually distinquish page sections.",
    "skt-blocks"
  ),
  icon,
  keywords: [
    "skt-blocks",
    "hr",
    "svg",
    /* translators: block keyword */
    __("separator", "skt-blocks"),
  ],
  example: {},
  supports: {
    align: ["wide", "full"],
    responsiveBlocksSpacing: true,
  },
  styles: [
    {
      name: "wavy",
      /* translators: block style */
      label: __("Wavy", "skt-blocks"),
      isDefault: true,
    },
    {
      name: "hills",
      /* translators: block style */
      label: __("Hills", "skt-blocks"),
    },
    {
      name: "waves",
      /* translators: block style */
      label: __("Waves", "skt-blocks"),
    },
    {
      name: "angled",
      /* translators: block style */
      label: __("Angled", "skt-blocks"),
    },
    {
      name: "sloped",
      /* translators: block style */
      label: __("Sloped", "skt-blocks"),
    },
    {
      name: "rounded",
      /* translators: block style */
      label: __("Rounded", "skt-blocks"),
    },
    {
      name: "triangle",
      /* translators: block style */
      label: __("Triangle", "skt-blocks"),
    },
    {
      name: "pointed",
      /* translators: block style */
      label: __("Pointed", "skt-blocks"),
    },
  ],
  attributes,
  edit,
  save,
});
