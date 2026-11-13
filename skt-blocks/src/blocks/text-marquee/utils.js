/**
 * Helpers for the Text Marquee block.
 */
export const COPIES = 6; // identical groups in the track; the loop shifts by one group.

export const SEPARATORS = [
	{ label: "None", value: "none" },
	{ label: "Dot  •", value: "dot" },
	{ label: "Star  ★", value: "star" },
	{ label: "Diamond  ◆", value: "diamond" },
	{ label: "Dash  —", value: "dash" },
	{ label: "Slash  /", value: "slash" },
	{ label: "Custom text", value: "custom" },
];

const SEP_CHAR = {
	dot: "•",
	star: "★",
	diamond: "◆",
	dash: "—",
	slash: "/",
};

export function getSeparator(a) {
	const s = a.separator || "dot";
	if (s === "none") return "";
	if (s === "custom") return a.separatorCustom || "";
	return SEP_CHAR[s] || "";
}

function num(v) {
	return typeof v === "number" && !isNaN(v) ? v : null;
}

export function getMarqueeFontURL(a) {
	const f = a.fontFamily;
	if (!f || f === "Default") return null;
	return `https://fonts.googleapis.com/css?family=${f.replace(/ /g, "+")}:300,400,500,600,700,800&display=swap`;
}

export function getMarqueeClassNames(a) {
	const c = ["skt-marquee"];
	if (a.uniqueId) c.push(`skt-marquee-${a.uniqueId}`);
	c.push(`skt-marquee--${a.direction === "right" ? "right" : "left"}`);
	if (a.pauseOnHover !== false) c.push("skt-marquee--pause");
	if (a.fadeEdges) c.push("skt-marquee--fade");
	return c.join(" ");
}

/** Declarations for one device suffix ("" | "Tablet" | "Mobile"). */
function perDevice(a, suffix, sel, first) {
	const item = `${sel} .skt-marquee__item`;
	let root = "";
	let text = "";
	const pt = num(a["paddingTop" + suffix]);
	const pb = num(a["paddingBottom" + suffix]);
	const mt = num(a["marginTop" + suffix]);
	const mb = num(a["marginBottom" + suffix]);
	if (pt !== null || first) root += `padding-top:${pt ?? 0}px !important;`;
	if (pb !== null || first) root += `padding-bottom:${pb ?? 0}px !important;`;
	if (mt !== null || first) root += `margin-top:${mt ?? 0}px !important;`;
	if (mb !== null || first) root += `margin-bottom:${mb ?? 0}px !important;`;
	const fs = num(a["fontSize" + suffix]);
	const lh = num(a["lineHeight" + suffix]);
	if (fs !== null) text += `font-size:${fs}px !important;`;
	if (lh !== null) text += `line-height:${lh} !important;`;
	const ig = num(a["itemGap" + suffix]);
	let css = "";
	if (root) css += `${sel}{${root}}`;
	if (text) css += `${item}{${text}}`;
	if (ig !== null) css += `${item}{margin-right:${ig}px !important;gap:${ig}px !important;}`;
	return css;
}

export function buildMarqueeCSS(a, device) {
	if (!a.uniqueId) return "";
	const sel = `.skt-marquee-${a.uniqueId}`;
	const item = `${sel} .skt-marquee__item`;
	const sep = `${sel} .skt-marquee__sep`;
	let css = "";

	// Root: background, radius.
	let r = "";
	if (a.backgroundType === "color" && a.backgroundColor)
		r += `background:${a.backgroundColor} !important;`;
	else if (a.backgroundType === "gradient" && a.gradientColor)
		r += `background:${a.gradientColor} !important;`;
	if (num(a.borderRadius)) r += `border-radius:${a.borderRadius}px;`;
	if (r) css += `${sel}{${r}}`;

	// Animation speed.
	css += `${sel} .skt-marquee__track{animation-duration:${num(a.speed) ?? 20}s !important;}`;

	// Text.
	let t = `color:${a.textColor || "#111111"} !important;`;
	if (a.fontFamily && a.fontFamily !== "Default") t += `font-family:"${a.fontFamily}",sans-serif !important;`;
	if (a.fontWeight) t += `font-weight:${a.fontWeight} !important;`;
	if (num(a.letterSpacing) !== null) t += `letter-spacing:${a.letterSpacing}px !important;`;
	if (a.textTransform && a.textTransform !== "none") t += `text-transform:${a.textTransform} !important;`;
	if (a.textStyle === "outline") {
		const sc = a.strokeColor || a.textColor || "#111111";
		t += `-webkit-text-stroke:${num(a.strokeWidth) ?? 1}px ${sc} !important;color:transparent !important;`;
	}
	css += `${item}{${t}}`;
	// Hover colors (editor + front end).
	if (a.textHoverColor) {
		css +=
			a.textStyle === "outline"
				? `${item}:hover{-webkit-text-stroke-color:${a.textHoverColor} !important;}`
				: `${item}:hover{color:${a.textHoverColor} !important;}`;
	}
	if (a.backgroundHoverColor) css += `${sel}:hover{background:${a.backgroundHoverColor} !important;}`;
	// Underline styles: Dashed / Dotted / Double.
	if (["dashed", "dotted", "double"].includes(a.textStyle)) {
		const lc = a.strokeColor || a.textColor || "#111111";
		css += `${sel} .skt-marquee__text{text-decoration:underline ${a.textStyle} ${lc} !important;text-decoration-thickness:${
			num(a.lineWidth) ?? 2
		}px !important;text-underline-offset:0.2em !important;}`;
	}

	// Separator.
	let s = "";
	if (a.separatorColor) s += `color:${a.separatorColor} !important;-webkit-text-stroke:0 !important;`;
	if (num(a.separatorSize) !== null) s += `font-size:${a.separatorSize}px !important;`;
	if (s) css += `${sel} .skt-marquee__sep{${s}}`;

	// Responsive values.
	css += perDevice(a, "", sel, true);
	const tab = perDevice(a, "Tablet", sel, false);
	const mob = perDevice(a, "Mobile", sel, false);
	if (device) {
		if (device !== "desktop" && tab) css += tab;
		if (device === "mobile" && mob) css += mob;
	} else {
		if (tab) css += `@media (max-width:1024px){${tab}}`;
		if (mob) css += `@media (max-width:767px){${mob}}`;
	}
	return css;
}

/** Saved markup CSS (adds device visibility, front end only). */
export function getMarqueeCSS(a) {
	let css = buildMarqueeCSS(a);
	const sel = `.skt-marquee-${a.uniqueId}`;
	if (!a.uniqueId) return "";
	if (a.hideDesktop) css += `@media (min-width:1025px){${sel}{display:none !important;}}`;
	if (a.hideTablet)
		css += `@media (min-width:768px) and (max-width:1024px){${sel}{display:none !important;}}`;
	if (a.hideMobile) css += `@media (max-width:767px){${sel}{display:none !important;}}`;
	return css;
}
