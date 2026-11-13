/**
 * Shared helpers for the Site Header block. Used by both edit.js and save.js so
 * the editor preview and the saved / front-end markup lay out identically.
 *
 * Features:
 *   - Layout: content width + inner max-width, alignment, gap, min-height, wrap
 *   - Sticky: behaviour, on-device, threshold, stuck styling (bg/shadow/transition)
 *   - Background: color / gradient / image (+ size/position/repeat + overlay)
 *   - Transparent header: transparent at top, solid when stuck, text colour, overlay
 *   - Border + Box shadow (normal state)
 *   - Spacing: padding (4 sides) + margin (top/bottom), responsive
 *   - Visibility: hide on desktop / tablet / mobile
 *   - Z-index
 */

const num = (v) =>
	v !== undefined && v !== null && v !== "" && !isNaN(v) ? parseFloat(v) : null;
const n0 = (v) => {
	const x = num(v);
	return x === null ? 0 : x;
};

export function getSiteHeaderClassNames(attributes) {
	const classes = ["skt-site-header"];
	if (attributes.uniqueId) {
		classes.push(`skt-site-header-${attributes.uniqueId}`);
	}
	if (attributes.transparentEnable) classes.push("skt-sh-transparent");
	if (attributes.hideOnDesktop) classes.push("skt-sh-hide-desktop");
	if (attributes.hideOnTablet) classes.push("skt-sh-hide-tablet");
	if (attributes.hideOnMobile) classes.push("skt-sh-hide-mobile");
	return classes.join(" ");
}

/**
 * Data attributes the front-end sticky script reads. Only emitted when sticky
 * is enabled, so a non-sticky header has clean markup.
 */
export function getSiteHeaderDataAttrs(attributes) {
	const d = {};
	if (attributes.stickyBehaviour === "sticky") {
		d["data-sticky"] = "sticky";
		d["data-sticky-on"] = attributes.stickyOn || "all";
		d["data-sticky-threshold"] = String(n0(attributes.stickyThreshold));
	}
	return d;
}

/** Media-query wrapper matching a "...On" device value. */
function deviceMedia(on) {
	if (on === "desktop") return "@media (min-width:1025px)";
	if (on === "tablet-mobile") return "@media (max-width:1024px)";
	if (on === "mobile") return "@media (max-width:767px)";
	return ""; // all devices
}

/** Build the background declarations (color / gradient / image + overlay). */
function backgroundDecl(attributes) {
	const type = attributes.backgroundType || "none";
	if (type === "color") {
		return attributes.backgroundColor
			? `background-color:${attributes.backgroundColor};`
			: "";
	}
	if (type === "gradient") {
		return attributes.backgroundGradient
			? `background-image:${attributes.backgroundGradient};`
			: "";
	}
	if (type === "image" && attributes.backgroundImage) {
		const size = attributes.backgroundImageSize || "cover";
		const pos = attributes.backgroundImagePosition || "center center";
		const rep = attributes.backgroundImageRepeat || "no-repeat";
		const att = attributes.backgroundAttachment || "scroll";
		let img = `url(${attributes.backgroundImage})`;
		if (attributes.backgroundOverlay) {
			// Layer a flat colour overlay over the image.
			img = `linear-gradient(${attributes.backgroundOverlay},${attributes.backgroundOverlay}),${img}`;
		}
		return `background-image:${img};background-size:${size};background-position:${pos};background-repeat:${rep};background-attachment:${att};`;
	}
	return "";
}

/**
 * Build the scoped dynamic CSS for one Site Header instance.
 *   sel      — the header element selector  (.skt-site-header-<id>)
 *   innerSel — the inner flex wrapper        (<sel> .skt-site-header__inner)
 */
function buildCSS(attributes, sel, innerSel) {
	let css = "";

	// --- Inner flex layout (desktop) ---
	const halign = attributes.horizontalAlignment || "space-between";
	const valign = attributes.verticalAlignment || "center";
	css += `${innerSel}{display:flex;flex-wrap:nowrap;align-items:${valign};justify-content:${halign};`;
	css += `column-gap:${n0(attributes.gap)}px;row-gap:${n0(attributes.gap)}px;`;
	const mh = num(attributes.minHeight);
	if (mh !== null) css += `min-height:${mh}px;`;
	if ((attributes.contentWidth || "contained") === "contained") {
		css += `max-width:${n0(attributes.innerWidth) || 1200}px;margin-left:auto;margin-right:auto;width:100%;`;
	} else {
		css += `max-width:none;width:100%;`;
	}
	css += `}`;

	// --- Header element (sel): background, border, shadow, spacing, z-index ---
	let s = "";
	if (mh !== null) s += `min-height:${mh}px;`;

	// Background (skipped visually at top when transparent is on — handled below).
	const bg = backgroundDecl(attributes);
	if (bg) s += bg;

	// Border.
	const bStyle = attributes.borderStyle || "none";
	const bWidth = n0(attributes.borderWidth);
	if (bStyle !== "none" && bWidth > 0) {
		s += `border:${bWidth}px ${bStyle} ${attributes.borderColor || "#000000"};`;
	}
	const radius = num(attributes.borderRadius);
	if (radius !== null && radius > 0) s += `border-radius:${radius}px;`;

	// Box shadow (normal state).
	if (attributes.boxShadowEnable) {
		s += `box-shadow:${n0(attributes.boxShadowH)}px ${n0(attributes.boxShadowV)}px ${n0(attributes.boxShadowBlur)}px ${n0(attributes.boxShadowSpread)}px ${attributes.boxShadowColor || "rgba(0,0,0,0.1)"};`;
	}

	// Padding (desktop).
	const pT = num(attributes.paddingTop),
		pR = num(attributes.paddingRight),
		pB = num(attributes.paddingBottom),
		pL = num(attributes.paddingLeft);
	if (pT !== null) s += `padding-top:${pT}px;`;
	if (pR !== null) s += `padding-right:${pR}px;`;
	if (pB !== null) s += `padding-bottom:${pB}px;`;
	if (pL !== null) s += `padding-left:${pL}px;`;

	// Margin (desktop).
	const mT = num(attributes.marginTop),
		mB = num(attributes.marginBottom);
	if (mT !== null) s += `margin-top:${mT}px;`;
	if (mB !== null) s += `margin-bottom:${mB}px;`;

	// Z-index.
	const z = num(attributes.zIndex);
	if (z !== null) s += `position:relative;z-index:${z};`;

	if (s) css += `${sel}{${s}}`;

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
	// Tablet spacing.
	const tpT = num(attributes.paddingTopTablet),
		tpR = num(attributes.paddingRightTablet),
		tpB = num(attributes.paddingBottomTablet),
		tpL = num(attributes.paddingLeftTablet),
		tmT = num(attributes.marginTopTablet),
		tmB = num(attributes.marginBottomTablet);
	let ts = "";
	if (tpT !== null) ts += `padding-top:${tpT}px;`;
	if (tpR !== null) ts += `padding-right:${tpR}px;`;
	if (tpB !== null) ts += `padding-bottom:${tpB}px;`;
	if (tpL !== null) ts += `padding-left:${tpL}px;`;
	if (tmT !== null) ts += `margin-top:${tmT}px;`;
	if (tmB !== null) ts += `margin-bottom:${tmB}px;`;
	if (ts) css += `@media (max-width:1024px){${sel}{${ts}}}`;

	// --- Mobile (gap, inner width, optional wrap) ---
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
	// Mobile spacing.
	const mpT = num(attributes.paddingTopMobile),
		mpR = num(attributes.paddingRightMobile),
		mpB = num(attributes.paddingBottomMobile),
		mpL = num(attributes.paddingLeftMobile),
		mmT = num(attributes.marginTopMobile),
		mmB = num(attributes.marginBottomMobile);
	let ms = "";
	if (mpT !== null) ms += `padding-top:${mpT}px;`;
	if (mpR !== null) ms += `padding-right:${mpR}px;`;
	if (mpB !== null) ms += `padding-bottom:${mpB}px;`;
	if (mpL !== null) ms += `padding-left:${mpL}px;`;
	if (mmT !== null) ms += `margin-top:${mmT}px;`;
	if (mmB !== null) ms += `margin-bottom:${mmB}px;`;
	if (ms) css += `@media (max-width:767px){${sel}{${ms}}}`;

	// NOTE: the transparent-header background override lives in transparentCSS()
	// (front end ONLY) so the editor still previews the real background colour
	// you pick — you cannot "scroll to stick" inside the editor.

	// --- Sticky "stuck" styling (per-instance). Applied by the front-end JS,
	//     which toggles the .skt-sh-is-stuck class on the header once scrolled.
	if (attributes.stickyBehaviour === "sticky") {
		if (attributes.stickyTransition) {
			css += `${sel}{transition:background-color .3s ease, box-shadow .3s ease, padding .3s ease;}`;
		}
		const stuck = `${sel}.skt-sh-is-stuck`;
		let st = "";
		if (attributes.stickyBackground)
			st += `background-color:${attributes.stickyBackground};`;
		if (attributes.stickyBoxShadow)
			st += `box-shadow:0 2px 12px rgba(0,0,0,0.12);`;
		if (st) css += `${stuck}{${st}}`;
	}

	return css;
}

/** Visibility CSS — front end ONLY (editor keeps the header editable). */
function visibilityCSS(attributes, sel) {
	let css = "";
	if (attributes.hideOnDesktop)
		css += `@media (min-width:1025px){${sel}.skt-sh-hide-desktop{display:none !important;}}`;
	if (attributes.hideOnTablet)
		css += `@media (min-width:768px) and (max-width:1024px){${sel}.skt-sh-hide-tablet{display:none !important;}}`;
	if (attributes.hideOnMobile)
		css += `@media (max-width:767px){${sel}.skt-sh-hide-mobile{display:none !important;}}`;
	return css;
}

/** Transparent header override — front end ONLY (editor shows the real bg). */
function transparentCSS(attributes, sel) {
	if (!attributes.transparentEnable) return "";
	const mq = deviceMedia(attributes.transparentOn || "all");
	let t = `${sel}.skt-sh-transparent:not(.skt-sh-is-stuck){background-color:transparent !important;background-image:none !important;}`;
	if (attributes.transparentTextColor) {
		t += `${sel}.skt-sh-transparent:not(.skt-sh-is-stuck),`;
		t += `${sel}.skt-sh-transparent:not(.skt-sh-is-stuck) a,`;
		t += `${sel}.skt-sh-transparent:not(.skt-sh-is-stuck) .wp-block-navigation a{color:${attributes.transparentTextColor} !important;}`;
	}
	return mq ? `${mq}{${t}}` : t;
}

/** Overlay (absolute) — front end ONLY, so the editor layout stays sane. */
function overlayCSS(attributes, sel) {
	if (attributes.transparentEnable && attributes.transparentOverlay) {
		const z = num(attributes.zIndex);
		return `${sel}{position:absolute;left:0;right:0;top:0;width:100%;z-index:${z !== null ? z : 999};}`;
	}
	return "";
}

/** Front-end / saved markup. */
export function getSiteHeaderCSS(attributes) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-site-header-${attributes.uniqueId}`;
	const inner = `${sel} .skt-site-header__inner`;
	return (
		buildCSS(attributes, sel, inner) +
		transparentCSS(attributes, sel) +
		overlayCSS(attributes, sel) +
		visibilityCSS(attributes, sel)
	);
}

/**
 * Editor markup: force the flex layout to preview live (WordPress wraps inner
 * blocks and applies its own layout CSS that would otherwise override ours).
 * Visibility + absolute overlay are intentionally NOT applied in the editor so
 * the header stays visible and editable.
 */
export function getSiteHeaderEditorCSS(attributes) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-site-header-${attributes.uniqueId}`;
	const inner = `${sel} .skt-site-header__inner`;

	let css = buildCSS(attributes, sel, inner);

	const halign = attributes.horizontalAlignment || "space-between";
	const valign = attributes.verticalAlignment || "center";
	css += `${inner}{display:flex !important;align-items:${valign} !important;justify-content:${halign} !important;}`;
	const emh = num(attributes.minHeight);
	if (emh !== null) {
		css += `${sel}{min-height:${emh}px !important;}`;
		css += `${inner}{min-height:${emh}px !important;}`;
	}
	css += `${inner} > .block-editor-block-list__block{margin:0;max-width:none;width:auto;flex:0 0 auto;}`;
	css += `${inner} > .block-list-appender{margin:0;flex:0 0 auto;}`;

	return css;
}
