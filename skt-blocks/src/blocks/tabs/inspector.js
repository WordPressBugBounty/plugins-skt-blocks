import {
	InspectorControls,
	ColorPalette,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl,
	Button,
	TabPanel,
	GradientPicker,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { useEditorDevice } from "../../utils/skt-device";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import ResponsiveBlocksIcon from "../../ResponsiveBlocksIcon.json";
import renderSVG from "../../renderIcon";
import fontOptions from "../../utils/googlefonts";
import {
	MAX_TABS,
	STYLE_OPTIONS,
	ANIMATION_OPTIONS,
	ICON_POSITIONS,
	getDeviceStyles,
	isVertical,
} from "./utils";

const POSITION_OPTIONS = [
	{ label: "Center Center", value: "center center" },
	{ label: "Top Left", value: "left top" },
	{ label: "Top Center", value: "center top" },
	{ label: "Top Right", value: "right top" },
	{ label: "Center Left", value: "left center" },
	{ label: "Center Right", value: "right center" },
	{ label: "Bottom Left", value: "left bottom" },
	{ label: "Bottom Center", value: "center bottom" },
	{ label: "Bottom Right", value: "right bottom" },
];
const SIZE_OPTIONS = [
	{ label: "Cover", value: "cover" },
	{ label: "Contain", value: "contain" },
	{ label: "Auto", value: "auto" },
];
const REPEAT_OPTIONS = [
	{ label: "No Repeat", value: "no-repeat" },
	{ label: "Repeat", value: "repeat" },
	{ label: "Repeat X", value: "repeat-x" },
	{ label: "Repeat Y", value: "repeat-y" },
];
const ATTACHMENT_OPTIONS = [
	{ label: "Scroll", value: "scroll" },
	{ label: "Fixed", value: "fixed" },
];

const SVG_ICONS = Object.keys(ResponsiveBlocksIcon);

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
	["desktop", "desktop", __("Desktop", "skt-blocks")],
	["tablet", "tablet", __("Tablet", "skt-blocks")],
	["mobile", "smartphone", __("Mobile", "skt-blocks")],
];

const stripTags = (html) => String(html || "").replace(/<[^>]*>/g, "");

function Color({ label, value, onChange }) {
	return (
		<BaseControl label={label} __nextHasNoMarginBottom>
			<ColorPalette
				value={value}
				onChange={(v) => onChange(v || "")}
				clearable
			/>
		</BaseControl>
	);
}

function DeviceSwitch({ label, device, setDevice }) {
	return (
		<Fragment>
			{label && <p className="skt-tab-ctrl-label">{label}</p>}
			<div className="skt-device-tabs">
				{DEVICES.map(([key, , title]) => (
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

export default function Inspector({ attributes, setAttributes }) {
	const tabs = attributes.tabs || [];
	const count = tabs.length;
	// Follows the editor's preview device (Desktop / Tablet / Mobile) and
	// switches it when a device button is clicked, so the canvas previews live.
	const { device, setDevice } = useEditorDevice();
	const suffix = device === "tablet" ? "Tablet" : device === "mobile" ? "Mobile" : "";
	const styles = getDeviceStyles(attributes);
	const anyVertical = Object.values(styles).some(isVertical);
	const anyHorizontal = Object.values(styles).some((v) => !isVertical(v));
	const styleKey = `style${device === "desktop" ? "Desktop" : suffix}`;
	const styleValue = attributes[styleKey] || "";
	const set = (k) => (v) => setAttributes({ [k]: v });
	const hasBorder =
		attributes.tabBorderStyle && attributes.tabBorderStyle !== "none";

	// Responsive RangeControl: reads/writes `<key><Tablet|Mobile>` for the active device.
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

	const setCount = (n) => {
		const target = Math.min(MAX_TABS, Math.max(1, parseInt(n, 10) || 1));
		if (target === count) return;
		if (target > count) {
			const add = [];
			for (let i = count; i < target; i++) {
				add.push({ title: `Tab ${i + 1}`, icon: "" });
			}
			setAttributes({ tabs: [...tabs, ...add] });
		} else {
			setAttributes({
				tabs: tabs.slice(0, target),
				initialTab: Math.min(attributes.initialTab || 1, target),
			});
		}
	};

	const setTabIcon = (i, icon) => {
		setAttributes({
			tabs: tabs.map((t, idx) => (idx === i ? { ...t, icon: icon || "" } : t)),
		});
	};

	// Colour groups for the four tab states.
	const STATES = [
		{
			name: "normal",
			title: __("Normal", "skt-blocks"),
			text: "titleColor",
			bg: "titleBg",
			border: "tabBorderColor",
			icon: "iconColor",
		},
		{
			name: "hover",
			title: __("Hover / Focus", "skt-blocks"),
			text: "titleHoverColor",
			bg: "titleHoverBg",
			border: "tabBorderHoverColor",
		},
		{
			name: "active",
			title: __("Active", "skt-blocks"),
			text: "titleActiveColor",
			bg: "titleActiveBg",
			border: "tabActiveBorderColor",
			icon: "iconActiveColor",
		},
		{
			name: "activeHover",
			title: __("Active Hover / Focus", "skt-blocks"),
			text: "titleActiveHoverColor",
			bg: "titleActiveHoverBg",
			border: "tabActiveBorderHoverColor",
		},
	];

	return (
		<InspectorControls>
			<PanelBody title={__("Layout", "skt-blocks")} initialOpen={true}>
				<DeviceSwitch label={__("Style", "skt-blocks")} device={device} setDevice={setDevice} />
				<SelectControl
					value={String(styleValue)}
					options={[
						...(device !== "desktop"
							? [
									{
										label:
											device === "tablet"
												? __("Same as Desktop", "skt-blocks")
												: __("Same as Tablet", "skt-blocks"),
										value: "",
									},
							  ]
							: []),
						...STYLE_OPTIONS.map((o) => ({ label: o.label, value: String(o.value) })),
					]}
					onChange={(v) =>
						setAttributes({ [styleKey]: v === "" ? undefined : parseInt(v, 10) })
					}
					help={__(
						"Styles 1–5 show the tabs above the content, 6–10 show them beside it. Set a different style for each device.",
						"skt-blocks"
					)}
				/>
				<RangeControl
					label={__("Number of Tabs", "skt-blocks")}
					value={count}
					min={1}
					max={MAX_TABS}
					onChange={setCount}
					help={__(
						"Reducing the number removes the last tabs and their content.",
						"skt-blocks"
					)}
				/>
				<RangeControl
					label={__("Initial Open Tab", "skt-blocks")}
					value={Math.min(attributes.initialTab || 1, count)}
					min={1}
					max={count}
					onChange={set("initialTab")}
				/>
				{anyHorizontal && (
					<SelectControl
						label={__("Tab Alignment", "skt-blocks")}
						value={attributes.tabAlign}
						options={[
							{ label: __("Left", "skt-blocks"), value: "flex-start" },
							{ label: __("Center", "skt-blocks"), value: "center" },
							{ label: __("Right", "skt-blocks"), value: "flex-end" },
							{ label: __("Stretch (full width)", "skt-blocks"), value: "stretch" },
						]}
						onChange={set("tabAlign")}
					/>
				)}
				{anyVertical && (
					<RangeControl
						label={__("Tabs Column Width (%)", "skt-blocks")}
						value={attributes.navWidth}
						min={10}
						max={60}
						onChange={set("navWidth")}
					/>
				)}
				<SelectControl
					label={__("Text Alignment", "skt-blocks")}
					value={attributes.textAlign}
					options={[
						{ label: __("Left", "skt-blocks"), value: "left" },
						{ label: __("Center", "skt-blocks"), value: "center" },
						{ label: __("Right", "skt-blocks"), value: "right" },
					]}
					onChange={set("textAlign")}
				/>
				<RangeControl
					label={__("Gap Between Tabs", "skt-blocks")}
					value={attributes.tabGap}
					min={0}
					max={60}
					onChange={set("tabGap")}
				/>
			</PanelBody>

			<PanelBody title={__("Animation", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Content Animation", "skt-blocks")}
					value={attributes.animation}
					options={ANIMATION_OPTIONS}
					onChange={set("animation")}
				/>
				{attributes.animation !== "none" && (
					<RangeControl
						label={__("Animation Duration (s)", "skt-blocks")}
						value={attributes.animationDuration}
						min={0.1}
						max={2}
						step={0.1}
						onChange={set("animationDuration")}
					/>
				)}
				<RangeControl
					label={__("Tab Hover Transition (s)", "skt-blocks")}
					value={attributes.tabTransition}
					min={0}
					max={1}
					step={0.05}
					onChange={set("tabTransition")}
				/>
			</PanelBody>

			<PanelBody title={__("Tab Icons", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Icon Position", "skt-blocks")}
					value={attributes.iconPosition || "before"}
					options={ICON_POSITIONS}
					onChange={set("iconPosition")}
				/>
				<DeviceSwitch label={__("Icon Size", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Size (px)", "skt-blocks"), "iconSize", 8, 100)}
				<RangeControl
					label={__("Space Between Icon & Text", "skt-blocks")}
					value={attributes.iconSpacing}
					min={0}
					max={40}
					onChange={set("iconSpacing")}
				/>
				<p style={{ marginTop: 0, color: "#757575", fontSize: 12 }}>
					{__(
						"Icon colours are set under Tab Colors (Normal / Active).",
						"skt-blocks"
					)}
				</p>
				{tabs.map((tab, i) => (
					<BaseControl
						key={i}
						label={`${__("Tab", "skt-blocks")} ${i + 1}${
							stripTags(tab.title) ? ` — ${stripTags(tab.title)}` : ""
						}`}
						__nextHasNoMarginBottom
					>
						<FontIconPicker
							icons={SVG_ICONS}
							value={tab.icon || ""}
							onChange={(v) => setTabIcon(i, v)}
							isMulti={false}
							renderFunc={renderSVG}
							noSelectedPlaceholder={__("Select Icon", "skt-blocks")}
						/>
					</BaseControl>
				))}
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
				{R(__("Font Size (px)", "skt-blocks"), "fontSize", 8, 80)}
				{R(__("Line Height", "skt-blocks"), "lineHeight", 0.8, 3, 0.1)}
				<RangeControl
					label={__("Letter Spacing (px)", "skt-blocks")}
					value={attributes.letterSpacing}
					min={-5}
					max={20}
					step={0.1}
					allowReset
					onChange={set("letterSpacing")}
				/>
			</PanelBody>

			<PanelBody title={__("Tab Colors", "skt-blocks")} initialOpen={false}>
				<TabPanel
					className="skt-tabs-state-tabs"
					tabs={STATES.map((s) => ({ name: s.name, title: s.title }))}
				>
					{(tab) => {
						const s = STATES.find((x) => x.name === tab.name);
						return (
							<Fragment>
								<div style={{ height: 8 }} />
								<Color
									label={__("Text Color", "skt-blocks")}
									value={attributes[s.text]}
									onChange={set(s.text)}
								/>
								<Color
									label={__("Background Color", "skt-blocks")}
									value={attributes[s.bg]}
									onChange={set(s.bg)}
								/>
								<Color
									label={__("Border Color", "skt-blocks")}
									value={attributes[s.border]}
									onChange={set(s.border)}
								/>
								{s.icon && (
									<Color
										label={__("Icon Color", "skt-blocks")}
										value={attributes[s.icon]}
										onChange={set(s.icon)}
									/>
								)}
							</Fragment>
						);
					}}
				</TabPanel>
				<p style={{ color: "#757575", fontSize: 12 }}>
					{__(
						"Border colours apply when a Tab Border style is chosen. In the Line styles (3 & 8) the Active Background is used as the accent colour and the tab background stays transparent.",
						"skt-blocks"
					)}
				</p>
			</PanelBody>

			<PanelBody title={__("Tab Border", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Border Style", "skt-blocks")}
					value={attributes.tabBorderStyle || "none"}
					options={[
						{ label: __("None (style default)", "skt-blocks"), value: "none" },
						{ label: __("Solid", "skt-blocks"), value: "solid" },
						{ label: __("Dashed", "skt-blocks"), value: "dashed" },
						{ label: __("Dotted", "skt-blocks"), value: "dotted" },
						{ label: __("Double", "skt-blocks"), value: "double" },
					]}
					onChange={set("tabBorderStyle")}
				/>
				{hasBorder && (
					<RangeControl
						label={__("Border Width", "skt-blocks")}
						value={attributes.tabBorderWidth}
						min={1}
						max={12}
						onChange={set("tabBorderWidth")}
					/>
				)}
				<RangeControl
					label={__("Border Radius", "skt-blocks")}
					value={attributes.tabBorderRadius}
					min={0}
					max={60}
					allowReset
					onChange={set("tabBorderRadius")}
				/>
			</PanelBody>

			<PanelBody title={__("Tab Spacing", "skt-blocks")} initialOpen={false}>
				<DeviceSwitch label={__("Padding", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Padding Top", "skt-blocks"), "tabPaddingTop", 0, 100)}
				{R(__("Padding Right", "skt-blocks"), "tabPaddingRight", 0, 100)}
				{R(__("Padding Bottom", "skt-blocks"), "tabPaddingBottom", 0, 100)}
				{R(__("Padding Left", "skt-blocks"), "tabPaddingLeft", 0, 100)}
				<DeviceSwitch label={__("Tab Margin", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Margin Top", "skt-blocks"), "tabMarginTop", -50, 100)}
				{R(__("Margin Right", "skt-blocks"), "tabMarginRight", -50, 100)}
				{R(__("Margin Bottom", "skt-blocks"), "tabMarginBottom", -50, 100)}
				{R(__("Margin Left", "skt-blocks"), "tabMarginLeft", -50, 100)}
			</PanelBody>

			<PanelBody title={__("Tabs Background", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Background Type", "skt-blocks")}
					value={attributes.backgroundType || "color"}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Color", "skt-blocks"), value: "color" },
						{ label: __("Gradient", "skt-blocks"), value: "gradient" },
						{ label: __("Image", "skt-blocks"), value: "image" },
					]}
					onChange={(value) => setAttributes({ backgroundType: value })}
				/>
				{attributes.backgroundType === "color" && (
					<BaseControl label={__("Background Color", "skt-blocks")} __nextHasNoMarginBottom>
						<ColorPalette
							value={attributes.backgroundColor}
							onChange={(value) => setAttributes({ backgroundColor: value })}
						/>
					</BaseControl>
				)}
				{attributes.backgroundType === "gradient" && (
					<GradientPicker
						value={attributes.gradientColor}
						onChange={(value) => setAttributes({ gradientColor: value })}
						gradients={[]}
					/>
				)}
				{attributes.backgroundType === "image" && (
					<Fragment>
						<BaseControl __nextHasNoMarginBottom>
							{attributes.backgroundImageUrl && (
								<img
									src={attributes.backgroundImageUrl}
									alt=""
									style={{ display: "block", width: "100%", height: "auto", marginBottom: "8px", borderRadius: "2px" }}
								/>
							)}
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) =>
										setAttributes({
											backgroundImageUrl: media.url,
											backgroundImageId: media.id,
										})
									}
									allowedTypes={["image"]}
									value={attributes.backgroundImageId}
									render={({ open }) => (
										<Button variant="secondary" onClick={open}>
											{attributes.backgroundImageUrl
												? __("Replace Image", "skt-blocks")
												: __("Select Image", "skt-blocks")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{attributes.backgroundImageUrl && (
								<Button
									variant="link"
									isDestructive
									onClick={() =>
										setAttributes({
											backgroundImageUrl: undefined,
											backgroundImageId: undefined,
										})
									}
									style={{ marginLeft: "8px" }}
								>
									{__("Remove", "skt-blocks")}
								</Button>
							)}
						</BaseControl>
						<SelectControl
							label={__("Position", "skt-blocks")}
							value={attributes.backgroundPosition}
							options={POSITION_OPTIONS}
							onChange={(value) => setAttributes({ backgroundPosition: value })}
						/>
						<SelectControl
							label={__("Size", "skt-blocks")}
							value={attributes.backgroundSize}
							options={SIZE_OPTIONS}
							onChange={(value) => setAttributes({ backgroundSize: value })}
						/>
						<SelectControl
							label={__("Repeat", "skt-blocks")}
							value={attributes.backgroundRepeat}
							options={REPEAT_OPTIONS}
							onChange={(value) => setAttributes({ backgroundRepeat: value })}
						/>
						<SelectControl
							label={__("Attachment", "skt-blocks")}
							value={attributes.backgroundAttachment}
							options={ATTACHMENT_OPTIONS}
							onChange={(value) => setAttributes({ backgroundAttachment: value })}
						/>
					</Fragment>
				)}
			</PanelBody>
			<PanelBody title={__("Spacing", "skt-blocks")} initialOpen={false}>
				<DeviceSwitch label={__("Tabs Bar Padding", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Padding Top", "skt-blocks"), "navPaddingTop", 0, 200)}
				{R(__("Padding Bottom", "skt-blocks"), "navPaddingBottom", 0, 200)}
				<DeviceSwitch label={__("Margin", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Margin Top", "skt-blocks"), "marginTop", -100, 300)}
				{R(__("Margin Bottom", "skt-blocks"), "marginBottom", -100, 300)}
			</PanelBody>
			<PanelBody title={__("Visibility", "skt-blocks")} initialOpen={false}>
				<ToggleControl
					label={__("Hide on Desktop", "skt-blocks")}
					checked={!!attributes.hideDesktop}
					onChange={(value) => setAttributes({ hideDesktop: value })}
				/>
				<ToggleControl
					label={__("Hide on Tablet", "skt-blocks")}
					checked={!!attributes.hideTablet}
					onChange={(value) => setAttributes({ hideTablet: value })}
				/>
				<ToggleControl
					label={__("Hide on Mobile", "skt-blocks")}
					checked={!!attributes.hideMobile}
					onChange={(value) => setAttributes({ hideMobile: value })}
				/>
				<ToggleControl
					label={__("Hide for Logged In Users", "skt-blocks")}
					checked={!!attributes.hideLoggedIn}
					onChange={(value) => setAttributes({ hideLoggedIn: value })}
				/>
				<ToggleControl
					label={__("Hide for Logged Out Users", "skt-blocks")}
					checked={!!attributes.hideLoggedOut}
					onChange={(value) => setAttributes({ hideLoggedOut: value })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
