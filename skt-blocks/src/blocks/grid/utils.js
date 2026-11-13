/**
 * Shared helpers for the Grid Block. Used by edit.js and save.js so the editor
 * preview and the saved/front-end markup lay out identically.
 */

export function getGridClassNames(attributes) {
	const classes = ["skt-grid"];
	if (attributes.uniqueId) {
		classes.push(`skt-grid-${attributes.uniqueId}`);
	}
	if (isOverlayActive(attributes)) {
		classes.push("has-skt-grid-overlay");
	}
	return classes.join(" ");
}

function isOverlayActive(attributes) {
	return (
		(attributes.overlayType === "color" && attributes.overlayColor) ||
		(attributes.overlayType === "gradient" && attributes.overlayGradient)
	);
}

const num = (v) =>
	v !== undefined && v !== null && v !== "" && !isNaN(v) ? parseFloat(v) : null;
const n0 = (v) => {
	const x = num(v);
	return x === null ? 0 : x;
};

/** Column flex-basis for a column count + horizontal gap (accounts for gap). */
function basis(cols, hgap) {
	const g = hgap === null ? 0 : hgap;
	return `calc((100% - ${(cols - 1) * g}px) / ${cols})`;
}

/**
 * Append :nth-of-type(k) to every selector in a (possibly comma-separated) list.
 * nth-of-type counts only the <div> columns, ignoring the <style>/<link> the
 * block also renders as children — so a column always gets its width whatever
 * the child order is (nth-child would be thrown off by those extra elements).
 */
function addNth(selList, k) {
	return selList
		.split(",")
		.map((s) => `${s.trim()}:nth-of-type(${k})`)
		.join(",");
}

/** Per-column flex-basis for an explicit width % (accounts for its gap share). */
function widthBasis(w, nCols, hgap) {
	const g = hgap === null ? 0 : hgap;
	const gapShare = Math.round(((w * (nCols - 1) * g) / 100) * 1000) / 1000;
	return `calc(${w}% - ${gapShare}px)`;
}

/**
 * Core builder.
 *   elementSel   — the grid's own element (box styling: background/padding/margin)
 *   containerSel — the flex container (may be a selector list for the editor)
 *   columnSel    — the grid columns (may be a selector list for the editor)
 */
function buildGridCSS(attributes, elementSel, containerSel, columnSel, device) {
	// device: undefined/null = front end (responsive via @media queries).
	// "desktop" / "tablet" / "mobile" = editor; render ONLY that device's
	// effective values flat (no media queries), so the backend preview matches
	// the chosen device even though the editor canvas (iframe) is narrow.
	const flat = !!device;
	const dev = device || "desktop";
	// Resolve a numeric attribute for the active device, with fallback:
	// mobile -> tablet -> desktop.
	const effNum = (base) => {
		const d = num(attributes[base]);
		if (!flat || dev === "desktop") return d;
		const t = num(attributes[base + "Tablet"]);
		if (dev === "tablet") return t !== null ? t : d;
		const m = num(attributes[base + "Mobile"]);
		return m !== null ? m : t !== null ? t : d;
	};
	const effCols = () => {
		const d = num(attributes.columns) || 2;
		if (!flat || dev === "desktop") return d;
		const t = num(attributes.columnsTablet);
		if (dev === "tablet") return t !== null ? t : d;
		const m = num(attributes.columnsMobile);
		return m !== null ? m : t !== null ? t : d;
	};
	const dCols = num(attributes.columns) || 2;
	const dH = flat ? effNum("horizontalGap") : num(attributes.horizontalGap);
	const dV = flat ? effNum("verticalGap") : num(attributes.verticalGap);

	const vMap = { top: "flex-start", center: "center", bottom: "flex-end" };
	const hMap = { left: "flex-start", center: "center", right: "flex-end" };
	const alignItems = vMap[attributes.verticalAlignment] || "stretch";
	const justify = hMap[attributes.horizontalAlignment];

	let css = "";

	// --- Box styling (background / padding / margin) on the grid element. ---
	let box = "";
	const bt = attributes.backgroundType || "color";
	if (bt === "color" && attributes.backgroundColor) {
		box += `background-color:${attributes.backgroundColor};`;
	} else if (bt === "gradient" && attributes.gradientColor) {
		box += `background-image:${attributes.gradientColor};`;
	} else if (bt === "image" && attributes.backgroundImageUrl) {
		box += `background-image:url(${attributes.backgroundImageUrl});`;
		box += `background-position:${attributes.backgroundPosition || "center center"};`;
		box += `background-size:${attributes.backgroundSize || "cover"};`;
		box += `background-repeat:${attributes.backgroundRepeat || "no-repeat"};`;
		box += `background-attachment:${attributes.backgroundAttachment || "scroll"};`;
	}
	// Overlay colour/gradient + opacity, consumed by the ::before layer.
	if (attributes.overlayType === "color" && attributes.overlayColor) {
		box += `--skt-grid-overlay:${attributes.overlayColor};`;
		box += `--skt-grid-overlay-opacity:${(typeof attributes.overlayOpacity === "number" ? attributes.overlayOpacity : 50) / 100};`;
	} else if (attributes.overlayType === "gradient" && attributes.overlayGradient) {
		box += `--skt-grid-overlay:${attributes.overlayGradient};`;
		box += `--skt-grid-overlay-opacity:${(typeof attributes.overlayOpacity === "number" ? attributes.overlayOpacity : 100) / 100};`;
	}
	const pu = attributes.paddingUnit || "px";
	const mu = attributes.marginUnit || "px";
	// In flat (editor) mode use the active device's effective value; otherwise
	// the desktop value (tablet/mobile come from the @media blocks below).
	const spV = (base) => {
		if (!flat) return n0(attributes[base]);
		const v = effNum(base);
		return v !== null ? v : 0;
	};
	box += `padding:${spV("paddingTop")}${pu} ${spV("paddingRight")}${pu} ${spV("paddingBottom")}${pu} ${spV("paddingLeft")}${pu};`;
	box += `margin-top:${spV("marginTop")}${mu};margin-bottom:${spV("marginBottom")}${mu};`;
	// Typography (cascades to the grid's content).
	if (attributes.fontFamily && attributes.fontFamily !== "Default") {
		box += `font-family:${attributes.fontFamily};`;
	}
	if (attributes.fontWeight) box += `font-weight:${attributes.fontWeight};`;
	const fs = num(attributes.fontSize);
	if (fs !== null) box += `font-size:${fs}px;`;
	const lh = num(attributes.lineHeight);
	if (lh !== null) box += `line-height:${lh};`;
	const lsp = num(attributes.letterSpacing);
	if (lsp !== null) box += `letter-spacing:${lsp}px;`;
	if (attributes.textTransform) box += `text-transform:${attributes.textTransform};`;
	if (attributes.textColor) box += `color:${attributes.textColor};`;
	if (attributes.textAlign) box += `text-align:${attributes.textAlign};`;
	// Border.
	if (attributes.borderStyle && attributes.borderStyle !== "none") {
		box += `border-style:${attributes.borderStyle};`;
		box += `border-width:${num(attributes.borderWidth) !== null ? num(attributes.borderWidth) : 1}px;`;
		if (attributes.borderColor) box += `border-color:${attributes.borderColor};`;
	}
	const br = num(attributes.borderRadius);
	if (br !== null && br > 0) box += `border-radius:${br}px;`;
	// Box shadow.
	if (attributes.boxShadowEnable) {
		const h = n0(attributes.boxShadowH);
		const v = num(attributes.boxShadowV) !== null ? num(attributes.boxShadowV) : 4;
		const blur = num(attributes.boxShadowBlur) !== null ? num(attributes.boxShadowBlur) : 12;
		const spread = n0(attributes.boxShadowSpread);
		const color = attributes.boxShadowColor || "rgba(0, 0, 0, 0.2)";
		const inset = attributes.boxShadowInset ? "inset " : "";
		box += `box-shadow:${inset}${h}px ${v}px ${blur}px ${spread}px ${color};`;
	}
	css += `${elementSel}{${box}}`;

	// --- Flex layout on the container. ---
	css += `${containerSel}{display:flex;flex-wrap:wrap;align-items:${alignItems};`;
	if (justify) css += `justify-content:${justify};`;
	if (dH !== null) css += `column-gap:${dH}px;`;
	if (dV !== null) css += `row-gap:${dV}px;`;
	css += `}`;
	// Column sizing. With explicit per-column widths (a preset layout) each
	// column is sized by its own width; otherwise all columns are equal.
	// min-width:0 lets a column shrink to its basis even when content is wider.
	const widths = Array.isArray(attributes.columnWidths)
		? attributes.columnWidths
		: [];
	if (flat && dev !== "desktop") {
		// Editor tablet/mobile: equal columns by the effective per-device count
		// (matches the front end's @media override, which ignores preset widths).
		const cols = effCols();
		css += `${columnSel}{flex:0 1 ${basis(cols, dH)};max-width:${basis(cols, dH)};min-width:0;box-sizing:border-box;}`;
	} else if (widths.length) {
		widths.forEach((w, i) => {
			const b = widthBasis(w, widths.length, dH);
			css += `${addNth(columnSel, i + 1)}{flex:0 0 ${b};max-width:${b};min-width:0;box-sizing:border-box;}`;
		});
	} else {
		css += `${columnSel}{flex:0 1 ${basis(dCols, dH)};max-width:${basis(dCols, dH)};min-width:0;box-sizing:border-box;}`;
	}

	if (!flat) {
	// --- Tablet ---
	const tCols = num(attributes.columnsTablet);
	const tH = num(attributes.horizontalGapTablet);
	const tV = num(attributes.verticalGapTablet);
	let tabletBox = responsiveBox(attributes, "Tablet");
	let tabletLayout = "";
	if (tCols !== null || tH !== null || tV !== null) {
		const cols = tCols !== null ? tCols : dCols;
		const h = tH !== null ? tH : dH;
		tabletLayout += `${containerSel}{`;
		if (tH !== null) tabletLayout += `column-gap:${tH}px;`;
		if (tV !== null) tabletLayout += `row-gap:${tV}px;`;
		tabletLayout += `}`;
		// :nth-child(n) matches every column at the SAME specificity as the
		// desktop per-column preset rules, so (being later in source) it wins.
		tabletLayout += `${addNth(columnSel, "n")}{flex:0 1 ${basis(cols, h)};max-width:${basis(cols, h)};}`;
	}
	if (tabletBox || tabletLayout) {
		css += `@media (max-width:1024px){`;
		if (tabletBox) css += `${elementSel}{${tabletBox}}`;
		css += tabletLayout;
		css += `}`;
	}

	// --- Mobile ---
	const mCols = num(attributes.columnsMobile);
	const mH = num(attributes.horizontalGapMobile);
	const mV = num(attributes.verticalGapMobile);
	let mobileBox = responsiveBox(attributes, "Mobile");
	let mobileLayout = "";
	if (mCols !== null || mH !== null || mV !== null) {
		const cols =
			mCols !== null
				? mCols
				: tCols !== null
				? tCols
				: dCols;
		const h = mH !== null ? mH : tH !== null ? tH : dH;
		mobileLayout += `${containerSel}{`;
		if (mH !== null) mobileLayout += `column-gap:${mH}px;`;
		if (mV !== null) mobileLayout += `row-gap:${mV}px;`;
		mobileLayout += `}`;
		mobileLayout += `${addNth(columnSel, "n")}{flex:0 1 ${basis(cols, h)};max-width:${basis(cols, h)};}`;
	}
	if (mobileBox || mobileLayout) {
		css += `@media (max-width:767px){`;
		if (mobileBox) css += `${elementSel}{${mobileBox}}`;
		css += mobileLayout;
		css += `}`;
	}
	} // end if (!flat)

	return css;
}

/** Build a per-device padding/margin override string (only set values). */
function responsiveBox(attributes, sfx) {
	let s = "";
	const pu = attributes.paddingUnit || "px";
	const mu = attributes.marginUnit || "px";
	const pt = num(attributes["paddingTop" + sfx]);
	const pr = num(attributes["paddingRight" + sfx]);
	const pb = num(attributes["paddingBottom" + sfx]);
	const pl = num(attributes["paddingLeft" + sfx]);
	if (pt !== null) s += `padding-top:${pt}${pu};`;
	if (pr !== null) s += `padding-right:${pr}${pu};`;
	if (pb !== null) s += `padding-bottom:${pb}${pu};`;
	if (pl !== null) s += `padding-left:${pl}${pu};`;
	const mt = num(attributes["marginTop" + sfx]);
	const mb = num(attributes["marginBottom" + sfx]);
	if (mt !== null) s += `margin-top:${mt}${mu};`;
	if (mb !== null) s += `margin-bottom:${mb}${mu};`;
	const fs = num(attributes["fontSize" + sfx]);
	if (fs !== null) s += `font-size:${fs}px;`;
	const lh = num(attributes["lineHeight" + sfx]);
	if (lh !== null) s += `line-height:${lh};`;
	return s;
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

/** Front-end / saved markup: columns are direct children of the grid. */
export function getGridCSS(attributes) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-grid-${attributes.uniqueId}`;
	const col = `${sel} > .wp-block-skt-blocks-grid-column`;
	return buildGridCSS(attributes, sel, sel, col) + getVisibilityCSS(attributes, sel);
}

/**
 * Editor markup: WordPress may wrap the inner blocks in an extra
 * .block-editor-block-list__layout element and adds auto left/right margins to
 * child blocks. Target BOTH nesting shapes and reset those margins so the
 * editor preview matches the front end exactly. Box styling stays on the
 * element only.
 */
export function getGridEditorCSS(attributes, device) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-grid-${attributes.uniqueId}`;
	const container = `${sel}, ${sel} > .block-editor-block-list__layout`;
	const col =
		`${sel} > .wp-block-skt-blocks-grid-column, ` +
		`${sel} > .block-editor-block-list__layout > .wp-block-skt-blocks-grid-column`;
	let css = buildGridCSS(attributes, sel, container, col, device || "desktop");
	css += `${col}{margin-left:0 !important;margin-right:0 !important;}`;
	return css;
}
