/**
 * Isolated bundle for ALL new SKT blocks.
 *
 * This is SEPARATE from src/blocks.js (the legacy bundle that builds
 * dist/skt-blocks.js). Nothing here is imported by src/blocks.js and vice
 * versa, so new blocks can never break the existing/legacy blocks.
 *
 * -> Compiles to dist/skt-new-blocks.js
 *    + dist/skt-new-blocks.css      (editor styles)
 *    + dist/style-skt-new-blocks.css (frontend styles)
 *
 * To add a NEW block: create src/blocks/<your-block>/ and add ONE import line
 * below. Then run `npm run build`.
 */

import "./blocks/skt-section/index.js";

// Add future new blocks here, one import per block:
// import "./blocks/your-next-block/index.js";
