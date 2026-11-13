/**
 * Shared helpers for the Tabs block (edit.js + save.js).
 */
export const MAX_TABS = 20;

function num(v) {
	return typeof v === "number" && !isNaN(v) ? v : null;
}

export function clampInitial(attributes) {
	const count = Math.max(1, (attributes.tabs || []).length);
	const n = parseInt(attributes.initialTab, 10) || 1;
	return Math.min(Math.max(1, n), count);
}

export const ANIMATION_OPTIONS = [
	{ label: "Fade", value: "fade" },
	{ label: "Slide Up", value: "slide-up" },
	{ label: "Slide Down", value: "slide-down" },
	{ label: "Slide Left", value: "slide-left" },
	{ label: "Slide Right", value: "slide-right" },
	{ label: "Zoom In", value: "zoom-in" },
	{ label: "None", value: "none" },
];

export const ICON_POSITIONS = [
	{ label: "Before text", value: "before" },
	{ label: "After text", value: "after" },
	{ label: "Above text", value: "above" },
	{ label: "Below text", value: "below" },
];

/** Style presets: 1-5 are horizontal, 6-10 are vertical. */
export const STYLE_OPTIONS = [
	{ label: "Horizontal Style 1", value: 1 },
	{ label: "Horizontal Style 2", value: 2 },
	{ label: "Horizontal Style 3", value: 3 },
	{ label: "Horizontal Style 4", value: 4 },
	{ label: "Horizontal Style 5", value: 5 },
	{ label: "Vertical Style 6", value: 6 },
	{ label: "Vertical Style 7", value: 7 },
	{ label: "Vertical Style 8", value: 8 },
	{ label: "Vertical Style 9", value: 9 },
	{ label: "Vertical Style 10", value: 10 },
];

function validStyle(v) {
	const n = parseInt(v, 10);
	return n >= 1 && n <= 10 ? n : null;
}

/** Resolved style per device: tablet inherits desktop, mobile inherits tablet. */
export function getDeviceStyles(attributes) {
	const desktop = validStyle(attributes.styleDesktop) || 1;
	const tablet = validStyle(attributes.styleTablet) || desktop;
	const mobile = validStyle(attributes.styleMobile) || tablet;
	return { desktop, tablet, mobile };
}

/** Google Font stylesheet URL for the tab titles (null for system fonts). */
export function getTabsFontURL(attributes) {
	const f = attributes.fontFamily;
	if (!f || f === "Default") return null;
	return `https://fonts.googleapis.com/css?family=${f.replace(/ /g, "+")}:300,400,500,600,700,800&display=swap`;
}

export function isVertical(style) {
	return style >= 6;
}

export function getTabsClassNames(attributes, device) {
	const classes = ["skt-tabs"];
	if (attributes.uniqueId) classes.push(`skt-tabs-${attributes.uniqueId}`);
	const st = getDeviceStyles(attributes);
	if (device) {
		// Editor: render only the active preview device's style (flat).
		classes.push(`skt-tabs--se-${st[device] || st.desktop}`);
	} else {
		classes.push(`skt-tabs--sd-${st.desktop}`);
		classes.push(`skt-tabs--st-${st.tablet}`);
		classes.push(`skt-tabs--sm-${st.mobile}`);
	}
	if (attributes.tabAlign === "stretch") classes.push("skt-tabs--stretch");
	classes.push(`skt-tabs--anim-${attributes.animation || "fade"}`);
	return classes.join(" ");
}

/** Value of a (possibly responsive) attribute for a device suffix. */
function dv(a, key, suffix) {
	return num(a[key + suffix]);
}

/** Declarations that differ per device (size, spacing, icon). */
function responsiveDecls(a, suffix, tab, icon) {
	let t = "";
	const fs = dv(a, "fontSize", suffix);
	if (fs !== null) t += `font-size:${fs}px;`;
	const lh = dv(a, "lineHeight", suffix);
	if (lh !== null) t += `line-height:${lh};`;
	const pv = dv(a, "titlePaddingV", suffix);
	const ph = dv(a, "titlePaddingH", suffix);
	if (suffix === "") {
		t += `padding:${pv ?? 14}px ${ph ?? 24}px !important;`;
	} else {
		if (pv !== null) t += `padding-top:${pv}px !important;padding-bottom:${pv}px !important;`;
		if (ph !== null) t += `padding-left:${ph}px !important;padding-right:${ph}px !important;`;
	}
	// Individual padding / margin sides (override the Top/Bottom + Left/Right pair).
	["Padding", "Margin"].forEach((kind) => {
		["Top", "Right", "Bottom", "Left"].forEach((side) => {
			const v = dv(a, `tab${kind}${side}`, suffix);
			if (v !== null) t += `${kind.toLowerCase()}-${side.toLowerCase()}:${v}px !important;`;
		});
	});
	let css = t ? `${tab}{${t}}` : "";
	const is = dv(a, "iconSize", suffix);
	if (is !== null) css += `${icon}{width:${is}px;height:${is}px;}`;
	return css;
}

/** Scoped CSS shared by editor and front end. */
function buildCSS(a, sel, device) {
	const nav = `${sel} > .skt-tabs__nav`;
	const tab = `${nav} > .skt-tabs__tab`;
	const icon = `${tab} > .skt-tabs__icon`;
	const panels = `${sel} > .skt-tabs__panels`;
	let css = "";

	// Outer spacing, per device (!important so themes can't override it).
	const mDecl = (suffix, force) => {
		const mt = num(a["marginTop" + suffix]);
		const mb = num(a["marginBottom" + suffix]);
		let d = "";
		if (mt !== null || force) d += `margin-top:${mt ?? 0}px !important;`;
		if (mb !== null || force) d += `margin-bottom:${mb ?? 0}px !important;`;
		return d ? `${sel}{${d}}` : "";
	};
	// Padding for the tabs bar (background area) only, per device.
	const nDecl = (suffix) => {
		const pt = num(a["navPaddingTop" + suffix]);
		const pb = num(a["navPaddingBottom" + suffix]);
		let d = "";
		if (pt !== null) d += `padding-top:${pt}px !important;`;
		if (pb !== null) d += `padding-bottom:${pb}px !important;`;
		return d ? `${nav}{${d}}` : "";
	};
	css += mDecl("", true) + nDecl("");
	const mTab = mDecl("Tablet", false) + nDecl("Tablet");
	const mMob = mDecl("Mobile", false) + nDecl("Mobile");
	if (device) {
		if (device !== "desktop" && mTab) css += mTab;
		if (device === "mobile" && mMob) css += mMob;
	} else {
		if (mTab) css += `@media (max-width:1024px){${mTab}}`;
		if (mMob) css += `@media (max-width:767px){${mMob}}`;
	}

	// Background (color / gradient / image) on the tabs bar only (not the content).
	const bt = a.backgroundType || "none";
	let bg = "";
	if (bt === "color" && a.backgroundColor) bg = `background-color:${a.backgroundColor} !important;`;
	else if (bt === "gradient" && a.gradientColor) bg = `background-image:${a.gradientColor} !important;`;
	else if (bt === "image" && a.backgroundImageUrl) {
		bg = `background-image:url(${a.backgroundImageUrl}) !important;background-position:${a.backgroundPosition || "center center"};background-size:${a.backgroundSize || "cover"};background-repeat:${a.backgroundRepeat || "no-repeat"};background-attachment:${a.backgroundAttachment || "scroll"};`;
	}
	if (bg) css += `${nav}{${bg}}`;

	// Accent colour used by the line / card style presets.
	css += `${sel}{--skt-accent:${a.titleActiveBg || "#2563eb"};}`;

	// Nav layout, per device (the style decides horizontal vs vertical).
	const gap = num(a.tabGap) ?? 0;
	const st = getDeviceStyles(a);
	const w = num(a.navWidth) ?? 25;
	css += `${nav}{gap:${gap}px;}`;
	[
		["desktop", "(min-width:1025px)"],
		["tablet", "(min-width:768px) and (max-width:1024px)"],
		["mobile", "(max-width:767px)"],
	].forEach(([dev, mq]) => {
		if (device && dev !== device) return;
		const rule = isVertical(st[dev])
			? `${nav}{flex:0 0 ${w}%;max-width:${w}%;justify-content:flex-start;}`
			: `${nav}{flex:0 0 auto;max-width:100%;justify-content:${
					a.tabAlign === "stretch" ? "flex-start" : a.tabAlign || "flex-start"
			  };}`;
		css += device ? rule : `@media ${mq}{${rule}}`;
	});

	// ---- Tab buttons: layout (icon position + text alignment) ----
	const ta = a.textAlign || "center";
	const main = ta === "left" ? "flex-start" : ta === "right" ? "flex-end" : "center";
	const pos = a.iconPosition || "before";
	const dir = { before: "row", after: "row-reverse", above: "column", below: "column-reverse" }[pos] || "row";
	let t = `display:flex !important;flex-direction:${dir} !important;gap:${num(a.iconSpacing) ?? 8}px;`;
	t += dir.startsWith("row")
		? `align-items:center !important;justify-content:${main} !important;`
		: `justify-content:center !important;align-items:${main} !important;`;
	t += `text-align:${ta} !important;`;
	css += `${panels}{text-align:${ta} !important;}`;

	// ---- typography ----
	if (a.fontFamily && a.fontFamily !== "Default") t += `font-family:"${a.fontFamily}",sans-serif;`;
	if (a.fontWeight) t += `font-weight:${a.fontWeight};`;
	if (num(a.letterSpacing) !== null) t += `letter-spacing:${a.letterSpacing}px;`;
	if (a.textTransform && a.textTransform !== "none") t += `text-transform:${a.textTransform};`;
	t += `transition-duration:${num(a.tabTransition) ?? 0.2}s;`;

	// ---- colours / border (normal) ----
	if (a.titleColor) t += `color:${a.titleColor} !important;`;
	if (a.titleBg) t += `background:${a.titleBg} !important;`;
	const hasBorder = a.tabBorderStyle && a.tabBorderStyle !== "none";
	if (hasBorder) {
		t += `border-style:${a.tabBorderStyle} !important;border-width:${
			num(a.tabBorderWidth) ?? 1
		}px !important;border-color:${a.tabBorderColor || "#d1d5db"} !important;`;
	}
	if (num(a.tabBorderRadius) !== null) t += `border-radius:${a.tabBorderRadius}px !important;`;
	css += `${tab}{${t}}`;

	// Icon element.
	let ic = `display:inline-flex;flex:none;align-items:center;justify-content:center;`;
	if (a.iconColor) ic += `color:${a.iconColor};`;
	css += `${icon}{${ic}}`;
	css += `${icon} svg{width:100%;height:100%;fill:currentColor;}`;
	if (a.iconActiveColor) css += `${tab}.is-active > .skt-tabs__icon{color:${a.iconActiveColor};}`;

	// ---- hover / focus ----
	let h = "";
	if (a.titleHoverColor) h += `color:${a.titleHoverColor} !important;`;
	if (a.titleHoverBg) h += `background:${a.titleHoverBg} !important;`;
	if (hasBorder && a.tabBorderHoverColor) h += `border-color:${a.tabBorderHoverColor} !important;`;
	if (h) css += `${tab}:hover,${tab}:focus{${h}}`;

	// ---- active ----
	let act = "";
	if (a.titleActiveColor) act += `color:${a.titleActiveColor} !important;`;
	if (a.titleActiveBg) act += `background:${a.titleActiveBg} !important;`;
	if (hasBorder && a.tabActiveBorderColor) act += `border-color:${a.tabActiveBorderColor} !important;`;
	if (act) css += `${tab}.is-active{${act}}`;

	// ---- active + hover / focus (falls back to the active values) ----
	let ah = "";
	const ahc = a.titleActiveHoverColor || a.titleActiveColor;
	const ahb = a.titleActiveHoverBg || a.titleActiveBg;
	const ahbd = a.tabActiveBorderHoverColor || a.tabActiveBorderColor;
	if (ahc) ah += `color:${ahc} !important;`;
	if (ahb) ah += `background:${ahb} !important;`;
	if (hasBorder && ahbd) ah += `border-color:${ahbd} !important;`;
	if (ah) css += `${tab}.is-active:hover,${tab}.is-active:focus{${ah}}`;

	// ---- responsive size / spacing / icon ----
	css += responsiveDecls(a, "", tab, icon);
	const tr = responsiveDecls(a, "Tablet", tab, icon);
	const mo = responsiveDecls(a, "Mobile", tab, icon);
	if (device) {
		// Editor: flat cascade desktop -> tablet -> mobile for the active device.
		if (device !== "desktop" && tr) css += tr;
		if (device === "mobile" && mo) css += mo;
	} else {
		if (tr) css += `@media (max-width:1024px){${tr}}`;
		if (mo) css += `@media (max-width:767px){${mo}}`;
	}

	return css;
}

const ANIM_FRAMES = {
	fade: "from{opacity:0}to{opacity:1}",
	"slide-up": "from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}",
	"slide-down": "from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:none}",
	"slide-left": "from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}",
	"slide-right": "from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}",
	"zoom-in": "from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}",
};

/** Animation for the visible panel. Written per block (with keyframes) so theme CSS / stale files can't hide it. */
function animationCSS(a, activePanelSelector) {
	const name = a.animation || "fade";
	if (name === "none" || !ANIM_FRAMES[name]) return "";
	const dur = num(a.animationDuration) ?? 0.3;
	return (
		`@keyframes skt-tabs-${name}{${ANIM_FRAMES[name]}}` +
		`${activePanelSelector}{animation:skt-tabs-${name} ${dur}s ease both !important;}`
	);
}

/** Saved markup CSS. Before the front-end script runs, show the initial tab. */
export function getTabsCSS(attributes) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-tabs-${attributes.uniqueId}`;
	let css = buildCSS(attributes, sel);
	css += `${sel}:not(.is-init) > .skt-tabs__panels > .skt-tabs__panel:nth-child(${clampInitial(
		attributes
	)}){display:block;}`;
	// Device visibility (front end only).
	if (attributes.hideDesktop) css += `@media (min-width:1025px){${sel}{display:none !important;}}`;
	if (attributes.hideTablet)
		css += `@media (min-width:768px) and (max-width:1024px){${sel}{display:none !important;}}`;
	if (attributes.hideMobile) css += `@media (max-width:767px){${sel}{display:none !important;}}`;
	css += animationCSS(
		attributes,
		`${sel}.is-init > .skt-tabs__panels > .skt-tabs__panel.is-active`
	);
	return css;
}

/** Editor CSS: only the active tab's panel is visible. */
export function getTabsEditorCSS(attributes, activeIndex, device) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-tabs-${attributes.uniqueId}`;
	const panels = `${sel} > .skt-tabs__panels > .skt-tabs__panel`;
	let css = buildCSS(attributes, sel, device || "desktop");
	css += `${panels}{display:none !important;}`;
	css += `${panels}:nth-child(${activeIndex + 1}){display:block !important;}`;
	css += animationCSS(
		attributes,
		`${sel} .skt-tabs__panels .skt-tabs__panel:nth-child(${activeIndex + 1})`
	);
	return css;
}
