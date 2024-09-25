/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Link options.
 */
const linkOptions = [
  { value: "none", label: __("None", "skt-blocks") },
  { value: "media", label: __("Media file", "skt-blocks") },
  {
    value: "attachment",
    label: __("Attachment page", "skt-blocks"),
  },
  {
    value: "custom",
    label: __("Custom URL", "skt-blocks"),
  },
];

export default linkOptions;
