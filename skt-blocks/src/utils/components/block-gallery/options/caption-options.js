/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Link options.
 */
const captionOptions = [
  {
    value: "dark",
    /* translators: visual style option */
    label: __("Dark", "skt-blocks"),
  },
  {
    value: "light",
    /* translators: visual style option */
    label: __("Light", "skt-blocks"),
  },
  {
    value: "none",
    /* translators: visual style option */
    label: __("None", "skt-blocks"),
  },
];

export default captionOptions;
