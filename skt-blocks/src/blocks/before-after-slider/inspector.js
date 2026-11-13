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
	ToggleControl,
	TextControl,
	BaseControl,
	Button,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { useEditorDevice } from "../../utils/skt-device";
import { ASPECT_OPTIONS } from "./utils";

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

	const imageControl = (key, title) => (
		<BaseControl label={title} __nextHasNoMarginBottom>
			{attributes[key + "Url"] && (
				<img
					src={attributes[key + "Url"]}
					alt=""
					style={{ display: "block", width: "100%", height: "auto", marginBottom: "8px", borderRadius: "2px" }}
				/>
			)}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					value={attributes[key + "Id"]}
					onSelect={(m) =>
						setAttributes({ [key + "Url"]: m.url, [key + "Id"]: m.id, [key + "Alt"]: attributes[key + "Alt"] || m.alt || "" })
					}
					render={({ open }) => (
						<Button variant="secondary" onClick={open}>
							{attributes[key + "Url"] ? __("Replace Image", "skt-blocks") : __("Select Image", "skt-blocks")}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			{attributes[key + "Url"] && (
				<Button
					variant="link"
					isDestructive
					style={{ marginLeft: "8px" }}
					onClick={() => setAttributes({ [key + "Url"]: undefined, [key + "Id"]: undefined })}
				>
					{__("Remove", "skt-blocks")}
				</Button>
			)}
			<TextControl
				label={__("Alt Text", "skt-blocks")}
				value={attributes[key + "Alt"] || ""}
				onChange={set(key + "Alt")}
				style={{ marginTop: "8px" }}
			/>
		</BaseControl>
	);

	return (
		<InspectorControls>
			<PanelBody title={__("Images", "skt-blocks")} initialOpen={true}>
				{imageControl("before", __("Before Image", "skt-blocks"))}
				{imageControl("after", __("After Image", "skt-blocks"))}
			</PanelBody>

			<PanelBody title={__("Slider", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Orientation", "skt-blocks")}
					value={attributes.orientation || "horizontal"}
					options={[
						{ label: __("Horizontal (drag left / right)", "skt-blocks"), value: "horizontal" },
						{ label: __("Vertical (drag up / down)", "skt-blocks"), value: "vertical" },
					]}
					onChange={set("orientation")}
				/>
				<RangeControl
					label={__("Start Position (%)", "skt-blocks")}
					value={attributes.position}
					min={0}
					max={100}
					onChange={set("position")}
				/>
				<ToggleControl
					label={__("Move Slider on Hover (no drag)", "skt-blocks")}
					checked={!!attributes.sliderOnHover}
					onChange={set("sliderOnHover")}
				/>
			</PanelBody>

			<PanelBody title={__("Layout", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Aspect Ratio", "skt-blocks")}
					value={attributes.aspectRatio || "auto"}
					options={ASPECT_OPTIONS}
					onChange={set("aspectRatio")}
				/>
				<SelectControl
					label={__("Image Fit", "skt-blocks")}
					value={attributes.objectFit || "cover"}
					options={[
						{ label: __("Cover", "skt-blocks"), value: "cover" },
						{ label: __("Contain", "skt-blocks"), value: "contain" },
						{ label: __("Fill", "skt-blocks"), value: "fill" },
					]}
					onChange={set("objectFit")}
				/>
				<DeviceSwitch label={__("Size", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Border Radius (px)", "skt-blocks"), "borderRadius", 0, 80)}
			</PanelBody>

			<PanelBody title={__("Labels", "skt-blocks")} initialOpen={false}>
				<ToggleControl
					label={__("Show Labels", "skt-blocks")}
					checked={!!attributes.showLabels}
					onChange={set("showLabels")}
				/>
				{attributes.showLabels && (
					<Fragment>
						<TextControl
							label={__("Before Label", "skt-blocks")}
							value={attributes.beforeLabel || ""}
							onChange={set("beforeLabel")}
						/>
						<TextControl
							label={__("After Label", "skt-blocks")}
							value={attributes.afterLabel || ""}
							onChange={set("afterLabel")}
						/>
						<SelectControl
							label={__("Label Position", "skt-blocks")}
							help={__("Horizontal: top / middle / bottom. Vertical: left / middle / right.", "skt-blocks")}
							value={attributes.labelPosition || "start"}
							options={[
								{ label: __("Start (top / left)", "skt-blocks"), value: "start" },
								{ label: __("Center", "skt-blocks"), value: "center" },
								{ label: __("End (bottom / right)", "skt-blocks"), value: "end" },
							]}
							onChange={set("labelPosition")}
						/>
						<DeviceSwitch label={__("Size", "skt-blocks")} device={device} setDevice={setDevice} />
						{R(__("Font Size (px)", "skt-blocks"), "labelFontSize", 8, 48)}
						{R(__("Border Radius (px)", "skt-blocks"), "labelRadius", 0, 40)}
						<Color label={__("Text Color", "skt-blocks")} value={attributes.labelColor} onChange={set("labelColor")} />
						<Color label={__("Background Color", "skt-blocks")} value={attributes.labelBg} onChange={set("labelBg")} />
					</Fragment>
				)}
			</PanelBody>

			<PanelBody title={__("Handle", "skt-blocks")} initialOpen={false}>
				<ToggleControl
					label={__("Show Handle Button", "skt-blocks")}
					checked={attributes.showKnob !== false}
					onChange={set("showKnob")}
				/>
				{attributes.showKnob !== false && (
					<Fragment>
						<SelectControl
							label={__("Button Shape", "skt-blocks")}
							value={attributes.handleShape || "circle"}
							options={[
								{ label: __("Circle", "skt-blocks"), value: "circle" },
								{ label: __("Rounded", "skt-blocks"), value: "rounded" },
								{ label: __("Square", "skt-blocks"), value: "square" },
							]}
							onChange={set("handleShape")}
						/>
						<DeviceSwitch label={__("Size", "skt-blocks")} device={device} setDevice={setDevice} />
						{R(__("Button Size (px)", "skt-blocks"), "handleSize", 20, 100)}
						<Color
							label={__("Arrow Color", "skt-blocks")}
							value={attributes.handleIconColor}
							onChange={set("handleIconColor")}
						/>
					</Fragment>
				)}
				<RangeControl
					label={__("Line Width (px)", "skt-blocks")}
					value={attributes.handleLineWidth}
					min={0}
					max={12}
					onChange={set("handleLineWidth")}
				/>
				<Color
					label={__("Line / Button Color", "skt-blocks")}
					value={attributes.handleColor}
					onChange={set("handleColor")}
				/>
			</PanelBody>

			<PanelBody title={__("Spacing", "skt-blocks")} initialOpen={false}>
				<DeviceSwitch label={__("Margin", "skt-blocks")} device={device} setDevice={setDevice} />
				{R(__("Margin Top", "skt-blocks"), "marginTop", -100, 300)}
				{R(__("Margin Bottom", "skt-blocks"), "marginBottom", -100, 300)}
			</PanelBody>

			<PanelBody title={__("Visibility", "skt-blocks")} initialOpen={false}>
				<ToggleControl label={__("Hide on Desktop", "skt-blocks")} checked={!!attributes.hideDesktop} onChange={set("hideDesktop")} />
				<ToggleControl label={__("Hide on Tablet", "skt-blocks")} checked={!!attributes.hideTablet} onChange={set("hideTablet")} />
				<ToggleControl label={__("Hide on Mobile", "skt-blocks")} checked={!!attributes.hideMobile} onChange={set("hideMobile")} />
				<ToggleControl label={__("Hide for Logged In Users", "skt-blocks")} checked={!!attributes.hideLoggedIn} onChange={set("hideLoggedIn")} />
				<ToggleControl label={__("Hide for Logged Out Users", "skt-blocks")} checked={!!attributes.hideLoggedOut} onChange={set("hideLoggedOut")} />
			</PanelBody>
		</InspectorControls>
	);
}
