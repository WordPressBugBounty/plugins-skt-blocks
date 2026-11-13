/**
 * Shared helpers for the Site Footer block. Used by both edit.js and save.js so
 * the editor preview and the saved / front-end markup lay out identically.
 *
 * LAYOUT only (no sticky behaviour for the footer)
 *   - Content width (full / contained + inner max-width, responsive)
 *   - Horizontal alignment (justify-content) + Vertical alignment (align-items)
 *   - Gap between items (responsive)
 *   - Wrap items on mobile
 *   - Tag name
 */

const num = (v) =>
	v !== undefined && v !== null && v !== "" && !isNaN(v) ? parseFloat(v) : null;
const n0 = (v) => {
	const x = num(v);
	return x === null ? 0 : x;
};

export function getSiteFooterClassNames(attributes) {
	const classes = ["skt-site-footer"];
	if (attributes.uniqueId) {
		classes.push(`skt-site-footer-${attributes.uniqueId}`);
	}
	return classes.join(" ");
}


/** Per-device padding/margin override string (only values that are set). */
function responsiveBox(attributes, sfx) {
	let s = "";
	const pu = attributes.paddingUnit || "px";
	const mu = attributes.marginUnit || "px";
	const sides = [
		["padding-top", "paddingTop", pu],
		["padding-right", "paddingRight", pu],
		["padding-bottom", "paddingBottom", pu],
		["padding-left", "paddingLeft", pu],
		["margin-top", "marginTop", mu],
		["margin-bottom", "marginBottom", mu],
	];
	sides.forEach(([prop, key, unit]) => {
		const v = num(attributes[key + sfx]);
		if (v !== null) s += `${prop}:${v}${unit} !important;`;
	});
	return s;
}

/**
 * Build the scoped dynamic CSS for one Site Footer instance.
 *   sel      — the footer element selector  (.skt-site-footer-<id>)
 *   innerSel — the inner flex wrapper        (<sel> .skt-site-footer__inner)
 */
function buildCSS(attributes, sel, innerSel) {
	let css = "";

	// --- Background (color / gradient / image) on the footer element ---
	let bgCss = "";
	const bt = attributes.backgroundType || "color";
	if (bt === "color" && attributes.backgroundColor) {
		bgCss += `background-color:${attributes.backgroundColor};`;
	} else if (bt === "gradient" && attributes.gradientColor) {
		bgCss += `background-image:${attributes.gradientColor};`;
	} else if (bt === "image" && attributes.backgroundImageUrl) {
		bgCss += `background-image:url(${attributes.backgroundImageUrl});`;
		bgCss += `background-position:${attributes.backgroundPosition || "center center"};`;
		bgCss += `background-size:${attributes.backgroundSize || "cover"};`;
		bgCss += `background-repeat:${attributes.backgroundRepeat || "no-repeat"};`;
		bgCss += `background-attachment:${attributes.backgroundAttachment || "scroll"};`;
	}
	if (bgCss) css += `${sel}{${bgCss}}`;

	// --- Spacing (padding / margin) on the footer element (desktop) ---
	const pu = attributes.paddingUnit || "px";
	const mu = attributes.marginUnit || "px";
	css += `${sel}{padding:${n0(attributes.paddingTop)}${pu} ${n0(attributes.paddingRight)}${pu} ${n0(attributes.paddingBottom)}${pu} ${n0(attributes.paddingLeft)}${pu} !important;`;
	css += `margin-top:${n0(attributes.marginTop)}${mu} !important;margin-bottom:${n0(attributes.marginBottom)}${mu} !important;}`;

	// --- Inner flex layout (desktop) ---
	const halign = attributes.horizontalAlignment || "space-between";
	const valign = attributes.verticalAlignment || "center";
	css += `${innerSel}{display:flex;flex-wrap:nowrap;align-items:${valign};justify-content:${halign};`;
	css += `column-gap:${n0(attributes.gap)}px;row-gap:${n0(attributes.gap)}px;`;
	const mh = num(attributes.minHeight);
	// Min height grows the whole footer bar (background area), like GeneratePress.
	// It's applied on the footer element AND the inner flex box so the items stay
	// vertically centred inside the taller bar.
	if (mh !== null) {
		css += `min-height:${mh}px;`;
	}
	if ((attributes.contentWidth || "contained") === "contained") {
		css += `max-width:${n0(attributes.innerWidth) || 1200}px;margin-left:auto;margin-right:auto;width:100%;`;
	} else {
		css += `max-width:none;width:100%;`;
	}
	css += `}`;
	// Footer bar itself also respects the min height (background area grows).
	if (mh !== null) css += `${sel}{min-height:${mh}px;}`;

	// --- Tablet ---
	const tGap = num(attributes.gapTablet);
	const tWidth = num(attributes.innerWidthTablet);
	const tMh = num(attributes.minHeightTablet);
	if (tGap !== null || tWidth !== null || tMh !== null) {
		css += `@media (max-width:1024px){${innerSel}{`;
		if (tGap !== null) css += `column-gap:${tGap}px;row-gap:${tGap}px;`;
		if (tMh !== null) css += `min-height:${tMh}px;`;
		if (tWidth !== null && (attributes.contentWidth || "contained") === "contained")
			css += `max-width:${tWidth}px;`;
		css += `}}`;
		if (tMh !== null) css += `@media (max-width:1024px){${sel}{min-height:${tMh}px;}}`;
	}

	// --- Mobile (gap, inner width, and optional wrap) ---
	const mGap = num(attributes.gapMobile);
	const mWidth = num(attributes.innerWidthMobile);
	const mMh = num(attributes.minHeightMobile);
	const wrap = attributes.wrapMobile;
	if (mGap !== null || mWidth !== null || mMh !== null || wrap) {
		css += `@media (max-width:767px){${innerSel}{`;
		if (wrap) css += `flex-wrap:wrap;`;
		if (mGap !== null) css += `column-gap:${mGap}px;row-gap:${mGap}px;`;
		if (mMh !== null) css += `min-height:${mMh}px;`;
		if (mWidth !== null && (attributes.contentWidth || "contained") === "contained")
			css += `max-width:${mWidth}px;`;
		css += `}}`;
		if (mMh !== null) css += `@media (max-width:767px){${sel}{min-height:${mMh}px;}}`;
	}

	// --- Spacing overrides per device ---
	const tBox = responsiveBox(attributes, "Tablet");
	if (tBox) css += `@media (max-width:1024px){${sel}{${tBox}}}`;
	const mBox = responsiveBox(attributes, "Mobile");
	if (mBox) css += `@media (max-width:767px){${sel}{${mBox}}}`;

	return css;
}

/** Device-hide CSS (front end only). */
function getVisibilityCSS(attributes, sel) {
	let css = "";
	if (attributes.hideDesktop) {
		css += `@media (min-width:1025px){${sel}{display:none !important;}}`;
	}
	if (attributes.hideTablet) {
		css += `@media (min-width:768px) and (max-width:1024px){${sel}{display:none !important;}}`;
	}
	if (attributes.hideMobile) {
		css += `@media (max-width:767px){${sel}{display:none !important;}}`;
	}
	return css;
}

/** Front-end / saved markup. */
export function getSiteFooterCSS(attributes) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-site-footer-${attributes.uniqueId}`;
	const inner = `${sel} .skt-site-footer__inner`;
	return buildCSS(attributes, sel, inner) + getVisibilityCSS(attributes, sel);
}

/**
 * Editor markup: WordPress may wrap the inner blocks in an extra
 * .block-editor-block-list__layout element, so target both the inner wrapper
 * and that nested layout element for the flex rules.
 */
export function getSiteFooterEditorCSS(attributes) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-site-footer-${attributes.uniqueId}`;
	const inner = `${sel} .skt-site-footer__inner`;

	// Base layout (same as the front end).
	let css = buildCSS(attributes, sel, inner);

	// --- Editor-only: make the layout preview LIVE ---
	// In the editor the inner wrapper carries WordPress's own
	// .block-editor-block-list__layout styles, which otherwise override our
	// flex rules (so alignment / justify / gap don't show). Force them, and let
	// each child block wrapper size to its content so the alignment is visible
	// exactly like the front end. These rules are editor-only.
	const halign = attributes.horizontalAlignment || "space-between";
	const valign = attributes.verticalAlignment || "center";
	css += `${inner}{display:flex !important;align-items:${valign} !important;justify-content:${halign} !important;}`;
	// Force the min height in the editor too so the live preview grows immediately
	// (beats the editor's static 40px floor and any theme rule).
	const emh = num(attributes.minHeight);
	if (emh !== null) {
		css += `${sel}{min-height:${emh}px !important;}`;
		css += `${inner}{min-height:${emh}px !important;}`;
	}
	css += `${inner} > .block-editor-block-list__block{margin:0;max-width:none;width:auto;flex:0 0 auto;}`;
	css += `${inner} > .block-list-appender{margin:0;flex:0 0 auto;}`;

	return css;
}
