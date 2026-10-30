/**
 * wp-scripts's `build` command CLEANS the entire dist/ folder before every
 * build. That wipes out static/legacy files that aren't produced by our
 * webpack entries but that the plugin's PHP still enqueues directly:
 *
 *   - dist/js/vendors/slick.min.js     (used by post-carousel, image-slider)
 *   - dist/js/vendors/flickity.js      (used by image-slider)
 *   - dist/skt-blocks-masonry.js       (used by gallery-masonry)
 *   - dist/skt-blocks-lightbox.js      (used by gallery-masonry, image-slider)
 *
 * This script restores them from vendor-assets/ (a permanent backup folder
 * in the plugin root) after every build, AND fixes the two CSS filenames
 * wp-scripts names differently than what includes/class-skt-blocks.php
 * expects.
 */
const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "dist");
const vendorAssetsDir = path.resolve(__dirname, "vendor-assets");

function copy(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`[postbuild] restored ${path.relative(__dirname, dest)}`);
  } else {
    console.warn(`[postbuild] WARNING: missing source file: ${src}`);
  }
}

// 1. Fix CSS filenames wp-scripts names differently than the PHP expects.
copy(
  path.join(distDir, "style-skt-blocks.css"),
  path.join(distDir, "skt-blocks-style.css")
);
copy(
  path.join(distDir, "style-skt-blocks-rtl.css"),
  path.join(distDir, "skt-blocks-style-rtl.css")
);
copy(
  path.join(distDir, "skt-blocks.css"),
  path.join(distDir, "skt-blocks-editor.css")
);
copy(
  path.join(distDir, "skt-blocks-rtl.css"),
  path.join(distDir, "skt-blocks-editor-rtl.css")
);

// 2. Restore static/legacy vendor files wp-scripts's clean step deletes.
copy(
  path.join(vendorAssetsDir, "js", "vendors", "slick.min.js"),
  path.join(distDir, "js", "vendors", "slick.min.js")
);
copy(
  path.join(vendorAssetsDir, "js", "vendors", "flickity.js"),
  path.join(distDir, "js", "vendors", "flickity.js")
);
copy(
  path.join(vendorAssetsDir, "skt-blocks-masonry.js"),
  path.join(distDir, "skt-blocks-masonry.js")
);
copy(
  path.join(vendorAssetsDir, "skt-blocks-masonry.asset.php"),
  path.join(distDir, "skt-blocks-masonry.asset.php")
);
copy(
  path.join(vendorAssetsDir, "skt-blocks-lightbox.js"),
  path.join(distDir, "skt-blocks-lightbox.js")
);
copy(
  path.join(vendorAssetsDir, "skt-blocks-lightbox.asset.php"),
  path.join(distDir, "skt-blocks-lightbox.asset.php")
);