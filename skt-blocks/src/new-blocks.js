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

// Grid Block (parent) + Grid Column (child). The child MUST register before or
// alongside the parent so the parent's inner template resolves.
import "./blocks/grid-column/index.js";
import "./blocks/grid/index.js";

// Site Header (flexible header container: logo + nav + buttons inside).
import "./blocks/site-header/index.js";

// Site Footer (same layout controls as Site Header, no sticky; default tag <footer>).
import "./blocks/site-footer/index.js";

// Tabs (parent) + Tab (child). The child registers first.
import "./blocks/tab/index.js";
import "./blocks/tabs/index.js";

// Add future new blocks here, one import per block:
// import "./blocks/your-next-block/index.js";

// Text Marquee (scrolling text ticker).
import "./blocks/text-marquee/index.js";

// Before/After Comparison Slider.
import "./blocks/before-after-slider/index.js";
