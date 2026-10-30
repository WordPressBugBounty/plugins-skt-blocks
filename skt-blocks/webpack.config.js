const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = {
  ...defaultConfig,
  entry: {
    // All blocks (editor JS + editor styles + common styles) -> dist/skt-blocks.js
    // wp-scripts auto-splits CSS: style.scss imports -> style-skt-blocks.css
    //                              styles.editor.scss imports -> skt-blocks.css
    "skt-blocks": path.resolve(process.cwd(), "src", "blocks.js"),

    // Frontend-only JS (sliders, lightbox, masonry init, etc.) -> dist/frontend_blocks.js
    frontend_blocks: path.resolve(process.cwd(), "src", "block-frontend.js"),

    // Isolated bundle for ALL new blocks -> dist/skt-new-blocks.js
    // (+ dist/skt-new-blocks.css editor styles, dist/style-skt-new-blocks.css
    // frontend styles). Kept as its own entry so new blocks can never break
    // the legacy skt-blocks bundle. Add new blocks inside src/new-blocks.js.
    "skt-new-blocks": path.resolve(process.cwd(), "src", "new-blocks.js"),
  },
  output: {
    ...defaultConfig.output,
    path: path.resolve(process.cwd(), "dist"),
  },
};