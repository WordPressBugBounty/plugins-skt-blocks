/**
 * External dependencies
 */

// Fonts already done loading.
const loadedFonts = [];

// @from https://github.com/elementor/elementor/blob/45eaa6704fe1ad18f6190c8e95952b38b8a38dc7/assets/dev/js/editor/utils/helpers.js#L23
const subsets = {
  /* eslint-disable quote-props */ ru_RU: "cyrillic",
  bg_BG: "cyrillic",
  he_IL: "hebrew",
  el: "greek",
  vi: "vietnamese",
  uk: "cyrillic",
  cs_CZ: "latin-ext",
  ro_RO: "latin-ext",
  pl_PL: "latin-ext",
};

export const getGoogleFontURL = (fontName) => {
  const family = fontName.replace(/ /g, "+");
  const subset = `&subset=latin`;
  return `https://fonts.googleapis.com/css?family=${family}${subset}`;
};

export const isWebFont = (fontName) =>
  !fontName.match(/^(sans[-+]serif|serif|monospace|serif-alt)$/i);

/**
 * Load the stylesheet of a Google Font.
 *
 * WordPress 6.x renders the editor canvas inside an iframe, so a <link> added
 * to the top document's <head> never reaches the editor preview. To fix this
 * we also RETURN a <link> element: blocks call this as
 * `{fontFamily && loadGoogleFont(fontFamily)}`, so the returned element renders
 * inside the block output — which lives in the iframe — and the font loads in
 * the editor reliably on every render (not just the first time). The front end
 * is unaffected (save output does not call this).
 *
 * @param {string} fontName The name of the font
 * @return {Object|null} A <link> React element for the font, or null.
 */
export const loadGoogleFont = (fontName) => {
  if (!fontName || !isWebFont(fontName)) {
    return null;
  }

  const href = getGoogleFontURL(fontName);

  // Keep adding it to the top document too (covers the editor chrome and any
  // non-iframe context). Deduped so we only append once per session.
  if (typeof document !== "undefined" && !loadedFonts.includes(fontName)) {
    const link = document.createElement("link");
    link.setAttribute("href", href);
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    const head = document.querySelector("head");
    if (head) {
      head.appendChild(link);
    }
    loadedFonts.push(fontName);
  }

  // Rendered inside the block -> loads the font inside the editor iframe.
  return wp.element.createElement("link", {
    rel: "stylesheet",
    type: "text/css",
    href,
  });
};

export const getFontFamily = (fontName) => {
  // Google Font.
  if (isWebFont(fontName)) {
    return `"${fontName}", Sans-serif`;
  }

  // System fonts.
  if (fontName.match(/^serif$/i)) {
    return '"Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif';
  } else if (fontName.match(/^serif-alt$/i)) {
    return 'Constantia, Lucida Bright, Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif';
  } else if (fontName.match(/^monospace$/i)) {
    return 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
  }
  return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
};

/**
 * Finds all the "font family" attributes and loads the font if needed.
 *
 * @param {Object} attributes Block attributes
 */
export const loadGoogleFontInAttributes = (attributes) => {
  Object.keys(attributes)
    .filter((attrName) => attrName.match(/fontfamily/i))
    .forEach((attrName) => {
      const fontName = attributes[attrName];
      if (fontName) {
        loadGoogleFont(fontName);
      }
    });
};
