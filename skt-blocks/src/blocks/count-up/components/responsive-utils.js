/**
 * Shared helpers for the Count Up block's Desktop / Tablet / Mobile controls.
 */
const { __ } = wp.i18n;

export const DEVICE_TABS = [
  { name: "desktop", title: __("Desktop", "skt-blocks") },
  { name: "tablet", title: __("Tablet", "skt-blocks") },
  { name: "mobile", title: __("Mobile", "skt-blocks") },
];

export const deviceSuffix = (name) =>
  name === "desktop" ? "" : name === "tablet" ? "Tablet" : "Mobile";

const isSet = (v) => v !== undefined && v !== null && v !== "";

// Value for a device: its own value, otherwise the one it inherits
// (Mobile -> Tablet -> Desktop). Nothing extra is stored.
export const inherited = (attributes, base, suffix) => {
  const chain =
    suffix === "Mobile"
      ? [base + "Mobile", base + "Tablet", base]
      : suffix === "Tablet"
      ? [base + "Tablet", base]
      : [base];
  for (const key of chain) {
    if (isSet(attributes[key])) {
      return attributes[key];
    }
  }
  return undefined;
};

// Editor preview device name ("Desktop" | "Tablet" | "Mobile") -> suffix.
export const previewSuffix = (deviceType) =>
  deviceType === "Tablet" ? "Tablet" : deviceType === "Mobile" ? "Mobile" : "";

// Switch the editor's preview device together with the inspector tab, so the
// value being edited is visible live on the canvas.
export const setPreviewDevice = (name) => {
  const type =
    name === "desktop" ? "Desktop" : name === "tablet" ? "Tablet" : "Mobile";
  try {
    const editor = wp.data.dispatch("core/editor");
    if (editor && editor.setDeviceType) {
      editor.setDeviceType(type);
      return;
    }
    const editPost = wp.data.dispatch("core/edit-post");
    if (editPost && editPost.__experimentalSetPreviewDeviceType) {
      editPost.__experimentalSetPreviewDeviceType(type);
    }
  } catch (e) {}
};
