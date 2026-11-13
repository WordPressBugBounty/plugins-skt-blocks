import { InspectorControls, ColorPalette } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TextControl,
	BaseControl,
	Button,
	GradientPicker,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { useEditorDevice } from "../../utils/skt-device";
import fontOptions from "../../utils/googlefonts";
import { SEPARATORS } from "./utils";

const WEIGHTS = ["100", "200", "300", "400", "500", "600", "700", "800", "900"].map(
	(w) => ({ label: w, value: w })
);

const TRANSFORMS = [
	{ label: __("Default", "skt-blocks"), value: "none" },
	{ label: __("Uppercase", "skt-blocks"), value: "uppercase" },
	{ label: __("Lowercase", "skt-blocks"), value: "lowercase" },
	{ label: __("Capitalize", "skt-blocks"), value: "capitalize" },
];

const DEVICES = [
	["desktop", __("Desktop", "skt-blocks")],
	["tablet", __("Tablet", "skt-blocks")],
	["mobile", __("Mobile", "skt-blocks")],
];

function DeviceSwitch({ label, device, setDevice }) {
	return (
		<Fragment>
			{label && <p className="skt-tab-ctrl-label">{label}</p>}
			<div className="skt-device-tabs">
				{DEVICES.map(([key, title]) => (
					<button
						key={key}
						type="button"
						className={"skt-device-tab" + (device === key ? " is-active" : "")}
						onClick={() => setDevice(key)}
					>
						{title}
					</button>
				))}
			</div>
		</Fragment>
	);
}

function Color({ label, value, onChange }) {
	return (
		<BaseControl label={label} __nextHasNoMarginBottom>
			<ColorPalette value={value} onChange={(v) => onChange(v || "")} clearable />
		</BaseControl>
	);
}

export default function Inspector({ attributes, setAttributes }) {
	const { device, setDevice } = useEditorDevice();
	const suffix = device === "tablet" ? "Tablet" : device === "mobile" ? "Mobile" : "";
	const set = (k) => (v) => setAttributes({ [k]: v });
	const items = attributes.items || [];

	const R = (label, key, min, max, step = 1) => {
		const k = key + suffix;
		return (
			<RangeControl
				label={label}
				value={attributes[k]}
				min={min}
				max={max}
				step={step}
				allowReset={device !== "desktop"}
				initialPosition={device === "desktop" ? attributes[key] : undefined}
				onChange={(v) => setAttributes({ [k]: v })}
			/>
		);
	};

	const setItem = (i, text) =>
		setAttributes({ items: items.map((it, n) => (n === i ? { ...it, text } : it)) });
	const removeItem = (i) => setAttributes({ items: items.filter((_, n) => n !== i) });
	const addItem = () =>
		setAttributes({ items: [...items, { text: `Text ${items.length + 1}` }] });

	return (
		<InspectorControls>
			<PanelBody title={__("Content", "skt-blocks")} initialOpen={true}>
				<div className="skt-marquee-items">
					{items.map((it, i) => (
						<div className="skt-marquee-item-row" key={i}>
							<TextControl
								label={`${__("Text", "skt-blocks")} ${i + 1}`}
								value={it.text || ""}
								onChange={(v) => setItem(i, v)}
							/>
							<Button
								icon="trash"
								isDestructive
								label={__("Remove", "skt-blocks")}
								disabled={items.length <= 1}
								onClick={() => removeItem(i)}
								style={{ marginTop: "24px" }}
							/>
						</div>
					))}
				</div>
				<Button variant="secondary" onClick={addItem}>
					{__("Add Text", "skt-blocks")}
				</Button>
			</PanelBody>

			<PanelBody title={__("Marquee", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Direction", "skt-blocks")}
					value={attributes.direction || "left"}
					options={[
						{ label: __("Right to Left", "skt-blocks"), value: "left" },
						{ label: __("Left to Right", "skt-blocks"), value: "right" },
					]}
					onChange={set("direction")}
				/>
				<RangeControl
					label={__("Loop Duration (seconds, lower = faster)", "skt-blocks")}
					value={attributes.speed}
					min={2}
					max={120}
					onChange={set("speed")}
				/>
				<ToggleControl
					label={__("Pause on Hover", "skt-blocks")}
					checked={attributes.pauseOnHover !== false}
					onChange={set("pauseOnHover")}
				/>
				<ToggleControl
					label={__("Fade Edges", "skt-blocks")}
					checked={!!attributes.fadeEdges}
					onChange={set("fadeEdges")}
				/>
			</PanelBody>

			<PanelBody title={__("Separator", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Separator Type", "skt-blocks")}
					value={attributes.separator || "dot"}
					options={SEPARATORS}
					onChange={set("separator")}
				/>
				{attributes.separator === "custom" && (
					<TextControl
						label={__("Custom Separator", "skt-blocks")}
						value={attributes.separatorCustom || ""}
						onChange={set("separatorCustom")}
					/>
				)}
				{attributes.separator !== "none" && (
					<Fragment>
						<RangeControl
							label={__("Separator Size (px)", "skt-blocks")}
							value={attributes.separatorSize}
							min={8}
							max={80}
							allowReset
							onChange={set("separatorSize")}
						/>
						<Color
							label={__("Separator Color", "skt-blocks")}
							value={attributes.separatorColor}
							onChange={set("separatorColor")}
						/>
					</Fragment>
				)}
				<DeviceSwitch label={__("Spacing", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Space Between Items (px)", "skt-blocks"), "itemGap", 0, 200)}
			</PanelBody>

			<PanelBody title={__("Typography", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Font Family", "skt-blocks")}
					value={attributes.fontFamily || ""}
					options={[{ label: __("Default", "skt-blocks"), value: "" }, ...fontOptions]}
					onChange={set("fontFamily")}
				/>
				<SelectControl
					label={__("Font Weight", "skt-blocks")}
					value={attributes.fontWeight}
					options={WEIGHTS}
					onChange={set("fontWeight")}
				/>
				<SelectControl
					label={__("Text Transform", "skt-blocks")}
					value={attributes.textTransform || "none"}
					options={TRANSFORMS}
					onChange={set("textTransform")}
				/>
				<DeviceSwitch label={__("Size", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Font Size (px)", "skt-blocks"), "fontSize", 8, 200)}
				{R(__("Line Height", "skt-blocks"), "lineHeight", 0.8, 3, 0.1)}
				<RangeControl
					label={__("Letter Spacing (px)", "skt-blocks")}
					value={attributes.letterSpacing}
					min={-5}
					max={30}
					step={0.1}
					allowReset
					onChange={set("letterSpacing")}
				/>
			</PanelBody>

			<PanelBody title={__("Colors & Style", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Text Style", "skt-blocks")}
					value={attributes.textStyle || "solid"}
					options={[
						{ label: __("Solid", "skt-blocks"), value: "solid" },
						{ label: __("Dashed", "skt-blocks"), value: "dashed" },
						{ label: __("Dotted", "skt-blocks"), value: "dotted" },
						{ label: __("Double", "skt-blocks"), value: "double" },
						{ label: __("Outline", "skt-blocks"), value: "outline" },
					]}
					onChange={set("textStyle")}
				/>
				{attributes.textStyle === "outline" && (
					<RangeControl
						label={__("Outline Width (px)", "skt-blocks")}
						value={attributes.strokeWidth}
						min={1}
						max={10}
						onChange={set("strokeWidth")}
					/>
				)}
				{["dashed", "dotted", "double"].includes(attributes.textStyle) && (
					<RangeControl
						label={__("Line Thickness (px)", "skt-blocks")}
						value={attributes.lineWidth}
						min={1}
						max={10}
						onChange={set("lineWidth")}
					/>
				)}
				<Color
					label={
						attributes.textStyle === "outline"
							? __("Outline Color", "skt-blocks")
							: __("Text Color", "skt-blocks")
					}
					value={attributes.textStyle === "outline" ? attributes.strokeColor || attributes.textColor : attributes.textColor}
					onChange={attributes.textStyle === "outline" ? set("strokeColor") : set("textColor")}
				/>
				{["dashed", "dotted", "double"].includes(attributes.textStyle) && (
					<Color
						label={__("Line Color (default: text color)", "skt-blocks")}
						value={attributes.strokeColor}
						onChange={set("strokeColor")}
					/>
				)}
				<Color
					label={__("Text Hover Color", "skt-blocks")}
					value={attributes.textHoverColor}
					onChange={set("textHoverColor")}
				/>
				<SelectControl
					label={__("Background Type", "skt-blocks")}
					value={attributes.backgroundType || "none"}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Color", "skt-blocks"), value: "color" },
						{ label: __("Gradient", "skt-blocks"), value: "gradient" },
					]}
					onChange={set("backgroundType")}
				/>
				{attributes.backgroundType === "color" && (
					<Color
						label={__("Background Color", "skt-blocks")}
						value={attributes.backgroundColor}
						onChange={set("backgroundColor")}
					/>
				)}
				{attributes.backgroundType === "gradient" && (
					<GradientPicker
						value={attributes.gradientColor}
						onChange={set("gradientColor")}
						gradients={[]}
					/>
				)}
				<Color
					label={__("Background Hover Color", "skt-blocks")}
					value={attributes.backgroundHoverColor}
					onChange={set("backgroundHoverColor")}
				/>
				<RangeControl
					label={__("Border Radius (px)", "skt-blocks")}
					value={attributes.borderRadius}
					min={0}
					max={100}
					onChange={set("borderRadius")}
				/>
			</PanelBody>

			<PanelBody title={__("Spacing", "skt-blocks")} initialOpen={false}>
				<DeviceSwitch label={__("Padding", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Padding Top", "skt-blocks"), "paddingTop", 0, 200)}
				{R(__("Padding Bottom", "skt-blocks"), "paddingBottom", 0, 200)}
				<DeviceSwitch label={__("Margin", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Margin Top", "skt-blocks"), "marginTop", -100, 300)}
				{R(__("Margin Bottom", "skt-blocks"), "marginBottom", -100, 300)}
			</PanelBody>

			<PanelBody title={__("Visibility", "skt-blocks")} initialOpen={false}>
				<ToggleControl
					label={__("Hide on Desktop", "skt-blocks")}
					checked={!!attributes.hideDesktop}
					onChange={set("hideDesktop")}
				/>
				<ToggleControl
					label={__("Hide on Tablet", "skt-blocks")}
					checked={!!attributes.hideTablet}
					onChange={set("hideTablet")}
				/>
				<ToggleControl
					label={__("Hide on Mobile", "skt-blocks")}
					checked={!!attributes.hideMobile}
					onChange={set("hideMobile")}
				/>
				<ToggleControl
					label={__("Hide for Logged In Users", "skt-blocks")}
					checked={!!attributes.hideLoggedIn}
					onChange={set("hideLoggedIn")}
				/>
				<ToggleControl
					label={__("Hide for Logged Out Users", "skt-blocks")}
					checked={!!attributes.hideLoggedOut}
					onChange={set("hideLoggedOut")}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
