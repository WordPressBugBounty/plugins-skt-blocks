/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockStyle } from "@wordpress/blocks";

// Add default for reset, until WordPress 5.3 is released.
registerBlockStyle("core/cover", {
  name: "default",
  /* translators: block style */
  label: __("Default", "skt-blocks"),
  isDefault: true,
});

registerBlockStyle("core/cover", {
  name: "bottom-wave",
  /* translators: block style */
  label: __("Bottom Wave", "skt-blocks"),
  isDefault: false,
});

registerBlockStyle("core/cover", {
  name: "top-wave",
  /* translators: block style */
  label: __("Top Wave", "skt-blocks"),
  isDefault: false,
});
