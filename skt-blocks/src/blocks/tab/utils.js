/**
 * Helpers for the Tab (child) block: scoped CSS for one tab's content area.
 */
function num(v) {
	return typeof v === "number" && !isNaN(v) ? v : null;
}

export function getTabClassNames(attributes) {
	const classes = ["skt-tabs__panel"];
	if (attributes.uniqueId) classes.push(`skt-tab-${attributes.uniqueId}`);
	return classes.join(" ");
}

/** Per-device overrides: only values that are set. */
function responsive(a, suffix) {
	const pu = a.paddingUnit || "px";
	const mu = a.marginUnit || "px";
	let s = "";
	[
		["padding-top", "paddingTop", pu],
		["padding-right", "paddingRight", pu],
		["padding-bottom", "paddingBottom", pu],
		["padding-left", "paddingLeft", pu],
		["margin-top", "marginTop", mu],
		["margin-bottom", "marginBottom", mu],
	].forEach(([prop, key, unit]) => {
		const v = num(a[key + suffix]);
		if (v !== null) s += `${prop}:${v}${unit} !important;`;
	});
	const mh = num(a["minHeight" + suffix]);
	if (mh !== null) s += `min-height:${mh}px;`;
	return s;
}

export function getTabCSS(a, device) {
	if (!a.uniqueId) return "";
	const sel = `.skt-tabs__panel.skt-tab-${a.uniqueId}`;
	const pu = a.paddingUnit || "px";
	const mu = a.marginUnit || "px";
	const n0 = (v) => num(v) ?? 0;
	let css = "";

	// device = undefined -> front end (desktop values + @media overrides).
	// device = "desktop" | "tablet" | "mobile" -> editor: that device's
	// effective values, flat (mobile -> tablet -> desktop), so the canvas
	// previews the chosen device exactly like Grid / Flex.
	const flat = !!device;
	const eff = (key) => {
		const d = num(a[key]);
		if (!flat || device === "desktop") return d;
		const t = num(a[key + "Tablet"]);
		if (device === "tablet") return t !== null ? t : d;
		const m = num(a[key + "Mobile"]);
		return m !== null ? m : t !== null ? t : d;
	};

	// Spacing (!important so themes can't override it).
	let b = `padding:${n0(eff("paddingTop"))}${pu} ${n0(eff("paddingRight"))}${pu} ${n0(
		eff("paddingBottom")
	)}${pu} ${n0(eff("paddingLeft"))}${pu} !important;`;
	b += `margin-top:${n0(eff("marginTop"))}${mu} !important;margin-bottom:${n0(
		eff("marginBottom")
	)}${mu} !important;`;
	if (eff("minHeight") !== null) b += `min-height:${eff("minHeight")}px;`;

	// Text colour.
	if (a.contentColor) b += `color:${a.contentColor};`;

	// Background.
	const bt = a.backgroundType || "none";
	if (bt === "color" && a.backgroundColor) {
		b += `background-color:${a.backgroundColor};`;
	} else if (bt === "gradient" && a.gradientColor) {
		b += `background-image:${a.gradientColor};`;
	} else if (bt === "image" && a.backgroundImageUrl) {
		b += `background-image:url(${a.backgroundImageUrl});`;
		b += `background-position:${a.backgroundPosition || "center center"};`;
		b += `background-size:${a.backgroundSize || "cover"};`;
		b += `background-repeat:${a.backgroundRepeat || "no-repeat"};`;
		b += `background-attachment:${a.backgroundAttachment || "scroll"};`;
	}

	// Border (!important so themes / editor styles can't override it).
	if (a.borderStyle && a.borderStyle !== "none") {
		b += `border-style:${a.borderStyle} !important;border-width:${
			num(a.borderWidth) ?? 1
		}px !important;border-color:${a.borderColor || "#e5e7eb"} !important;`;
	} else if (a.borderStyle === "none") {
		b += "border:0 !important;";
	}
	if (num(a.borderRadius) !== null) b += `border-radius:${a.borderRadius}px !important;`;
	css += `${sel}{${b}}`;

	if (!flat) {
		const t = responsive(a, "Tablet");
		if (t) css += `@media (max-width:1024px){${sel}{${t}}}`;
		const m = responsive(a, "Mobile");
		if (m) css += `@media (max-width:767px){${sel}{${m}}}`;
	}
	return css;
}
