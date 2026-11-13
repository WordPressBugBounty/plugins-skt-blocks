/**
 * Helpers for the Before/After Slider block.
 */
export const ASPECT_OPTIONS = [
	{ label: "Auto (first image)", value: "auto" },
	{ label: "16:9", value: "16/9" },
	{ label: "4:3", value: "4/3" },
	{ label: "3:2", value: "3/2" },
	{ label: "1:1", value: "1/1" },
	{ label: "21:9", value: "21/9" },
];

function num(v) {
	return typeof v === "number" && !isNaN(v) ? v : null;
}

export function getCompareClassNames(a) {
	const c = ["skt-compare"];
	if (a.uniqueId) c.push(`skt-compare-${a.uniqueId}`);
	c.push(`skt-compare--${a.orientation === "vertical" ? "vertical" : "horizontal"}`);
	if (a.aspectRatio && a.aspectRatio !== "auto") c.push("skt-compare--ratio");
	if (a.sliderOnHover) c.push("skt-compare--hover");
	c.push(`skt-compare--${a.handleShape || "circle"}`);
	if (a.showKnob === false) c.push("skt-compare--noknob");
	c.push(`skt-compare--label-${a.labelPosition || "start"}`);
	return c.join(" ");
}

function marginDecl(a, suffix, sel, first) {
	const mt = num(a["marginTop" + suffix]);
	const mb = num(a["marginBottom" + suffix]);
	let d = "";
	if (mt !== null || first) d += `margin-top:${mt ?? 0}px !important;`;
	if (mb !== null || first) d += `margin-bottom:${mb ?? 0}px !important;`;
	return d ? `${sel}{${d}}` : "";
}

/** Per-device sizes: label font, handle button, corner radii. */
function sizeDecl(a, suffix, sel, first) {
	const d = (k, def) => {
		const v = num(a[k + suffix]);
		return v !== null ? v : first ? def : null;
	};
	let css = "";
	const knob = d("handleSize", 44);
	if (knob !== null) css += `${sel}{--skt-knob:${knob}px;}`;
	const br = d("borderRadius", 0);
	if (br !== null) css += `${sel} .skt-compare__stage{border-radius:${br}px;}`;
	let lab = "";
	const fs = d("labelFontSize", 14);
	const lr = d("labelRadius", 4);
	if (fs !== null) lab += `font-size:${fs}px;`;
	if (lr !== null) lab += `border-radius:${lr}px;`;
	if (lab) css += `${sel} .skt-compare__label{${lab}}`;
	return css;
}

export function buildCompareCSS(a, device) {
	if (!a.uniqueId) return "";
	const sel = `.skt-compare-${a.uniqueId}`;
	let css = "";
	const pos = num(a.position) ?? 50;
	css += `${sel}{--skt-pos:${pos}%;--skt-handle:${a.handleColor || "#ffffff"};--skt-icon:${
		a.handleIconColor || "#111111"
	};--skt-line:${num(a.handleLineWidth) ?? 3}px;}`;
	if (a.aspectRatio && a.aspectRatio !== "auto")
		css += `${sel} .skt-compare__stage{aspect-ratio:${a.aspectRatio};}`;
	css += `${sel} .skt-compare__img{object-fit:${a.objectFit || "cover"};}`;
	css += `${sel} .skt-compare__label{color:${a.labelColor || "#fff"};background:${
		a.labelBg || "rgba(0,0,0,.55)"
	};}`;
	css += marginDecl(a, "", sel, true) + sizeDecl(a, "", sel, true);
	const tab = marginDecl(a, "Tablet", sel, false) + sizeDecl(a, "Tablet", sel, false);
	const mob = marginDecl(a, "Mobile", sel, false) + sizeDecl(a, "Mobile", sel, false);
	if (device) {
		if (device !== "desktop" && tab) css += tab;
		if (device === "mobile" && mob) css += mob;
	} else {
		if (tab) css += `@media (max-width:1024px){${tab}}`;
		if (mob) css += `@media (max-width:767px){${mob}}`;
	}
	return css;
}

export function getCompareCSS(a) {
	if (!a.uniqueId) return "";
	const sel = `.skt-compare-${a.uniqueId}`;
	let css = buildCompareCSS(a);
	if (a.hideDesktop) css += `@media (min-width:1025px){${sel}{display:none !important;}}`;
	if (a.hideTablet)
		css += `@media (min-width:768px) and (max-width:1024px){${sel}{display:none !important;}}`;
	if (a.hideMobile) css += `@media (max-width:767px){${sel}{display:none !important;}}`;
	return css;
}
