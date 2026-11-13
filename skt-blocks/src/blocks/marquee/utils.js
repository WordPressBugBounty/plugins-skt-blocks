/**
 * Shared helpers for the Text Marquee block (edit.js + save.js) so the editor
 * preview and the saved / front-end markup match.
 *
 * The scroll is pure CSS: the track holds TWO identical copies of the content
 * and animates by -50% (one copy width), which loops seamlessly. No JS needed.
 */

const num = (v) =>
	v !== undefined && v !== null && v !== "" && !isNaN(v) ? parseFloat(v) : null;

export function getMarqueeClassNames(attributes) {
	const classes = ["skt-marquee"];
	if (attributes.uniqueId) classes.push(`skt-marquee-${attributes.uniqueId}`);
	return classes.join(" ");
}

/** Scoped CSS for one marquee instance (shared by editor + front end). */
function buildCSS(attributes, sel) {
	const track = `${sel} .skt-marquee__track`;
	const content = `${sel} .skt-marquee__content`;
	const vertical =
		attributes.direction === "up" || attributes.direction === "down";
	const reverse =
		attributes.direction === "right" || attributes.direction === "down";
	const speed = num(attributes.speed) ?? 20;
	const gap = num(attributes.gap) ?? 50;

	let css = "";

	// Container.
	let c = "overflow:hidden;box-sizing:border-box;width:100%;";
	if (attributes.backgroundColor)
		c += `background-color:${attributes.backgroundColor};`;
	const py = num(attributes.paddingY);
	if (py !== null) c += `padding-top:${py}px;padding-bottom:${py}px;`;
	if (vertical) c += `height:${num(attributes.verticalHeight) ?? 120}px;`;
	css += `${sel}{${c}}`;

	// Track (the moving element, holds the two copies).
	const name = vertical ? "skt-marquee-y" : "skt-marquee-x";
	let t = `display:flex;flex-direction:${vertical ? "column" : "row"};`;
	t += vertical ? `width:100%;` : `width:max-content;`;
	t += `animation:${name} ${speed}s linear infinite${reverse ? " reverse" : ""};`;
	css += `${track}{${t}}`;

	// Each content copy.
	let ct = "flex:0 0 auto;box-sizing:border-box;";
	ct += vertical
		? `text-align:center;padding-bottom:${gap}px;`
		: `white-space:nowrap;padding-right:${gap}px;`;
	const fs = num(attributes.fontSize);
	if (fs !== null) ct += `font-size:${fs}px;`;
	if (attributes.fontWeight) ct += `font-weight:${attributes.fontWeight};`;
	if (attributes.textColor) ct += `color:${attributes.textColor};`;
	if (attributes.textTransform && attributes.textTransform !== "none")
		ct += `text-transform:${attributes.textTransform};`;
	css += `${content}{${ct}}`;

	// Pause on hover.
	if (attributes.pauseOnHover)
		css += `${sel}:hover ${track}{animation-play-state:paused;}`;

	// Responsive font size.
	const fsT = num(attributes.fontSizeTablet);
	if (fsT !== null)
		css += `@media (max-width:1024px){${content}{font-size:${fsT}px;}}`;
	const fsM = num(attributes.fontSizeMobile);
	if (fsM !== null)
		css += `@media (max-width:767px){${content}{font-size:${fsM}px;}}`;

	return css;
}

/** Front-end / saved CSS. */
export function getMarqueeCSS(attributes) {
	if (!attributes.uniqueId) return "";
	return buildCSS(attributes, `.skt-marquee-${attributes.uniqueId}`);
}

/**
 * Editor CSS. Same as the front end, plus: while the block is focused/selected
 * (focus-within) the animation pauses and snaps back to the start so the text
 * is readable and editable instead of scrolling away.
 */
export function getMarqueeEditorCSS(attributes) {
	if (!attributes.uniqueId) return "";
	const sel = `.skt-marquee-${attributes.uniqueId}`;
	let css = buildCSS(attributes, sel);
	css += `${sel}:focus-within .skt-marquee__track{animation-play-state:paused !important;transform:none !important;}`;
	return css;
}
