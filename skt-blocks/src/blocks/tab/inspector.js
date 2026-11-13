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
	GradientPicker,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { useEditorDevice, DeviceTabs } from "../../utils/skt-device";

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

const SPACING_UNITS = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
	{ label: "em", value: "em" },
	{ label: "rem", value: "rem" },
	{ label: "vw", value: "vw" },
	{ label: "vh", value: "vh" },
];

export default function Inspector({ attributes, setAttributes }) {
	const { device, setDevice } = useEditorDevice();
	const suffixFor = (name) =>
		name === "tablet" ? "Tablet" : name === "mobile" ? "Mobile" : "";

	// Responsive slider for the Desktop / Tablet / Mobile tab being shown.
	const resp = (tab, label, base, min, max) => {
		const key = base + suffixFor(tab.name);
		return (
			<RangeControl
				label={label}
				value={attributes[key]}
				onChange={(v) => setAttributes({ [key]: v })}
				min={min}
				max={max}
				step={1}
				allowReset
			/>
		);
	};

	return (
		<InspectorControls>
			<PanelBody title={__("Layout", "skt-blocks")} initialOpen={true}>
				<p className="skt-tab-ctrl-label">
					{__("Minimum Height (px)", "skt-blocks")}
				</p>
				<DeviceTabs device={device} setDevice={setDevice}>
					{(tab) =>
						resp(tab, __("Min Height", "skt-blocks"), "minHeight", 0, 1000)
					}
				</DeviceTabs>
			</PanelBody>
			<PanelBody title={__("Background", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Background Type", "skt-blocks")}
					value={attributes.backgroundType || "none"}
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
			<PanelBody title={__("Content", "skt-blocks")} initialOpen={false}>
				<BaseControl label={__("Text Color", "skt-blocks")} __nextHasNoMarginBottom>
					<ColorPalette
						value={attributes.contentColor}
						onChange={(value) => setAttributes({ contentColor: value || "" })}
					/>
				</BaseControl>
			</PanelBody>

			<PanelBody title={__("Border", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Border Style", "skt-blocks")}
					value={attributes.borderStyle}
					options={["none", "solid", "dashed", "dotted", "double"].map((v) => ({
						label: v.charAt(0).toUpperCase() + v.slice(1),
						value: v,
					}))}
					onChange={(value) => setAttributes({ borderStyle: value })}
				/>
				{attributes.borderStyle !== "none" && (
					<Fragment>
						<BaseControl label={__("Border Color", "skt-blocks")} __nextHasNoMarginBottom>
							<ColorPalette
								value={attributes.borderColor}
								onChange={(value) => setAttributes({ borderColor: value || "" })}
							/>
						</BaseControl>
						<RangeControl
							label={__("Border Width", "skt-blocks")}
							value={attributes.borderWidth}
							min={1}
							max={20}
							onChange={(value) => setAttributes({ borderWidth: value })}
						/>
					</Fragment>
				)}
				<RangeControl
					label={__("Border Radius", "skt-blocks")}
					value={attributes.borderRadius}
					min={0}
					max={80}
					onChange={(value) => setAttributes({ borderRadius: value })}
				/>
			</PanelBody>

			<PanelBody title={__("Spacing", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Padding Unit", "skt-blocks")}
					value={attributes.paddingUnit || "px"}
					options={SPACING_UNITS}
					onChange={(value) => setAttributes({ paddingUnit: value })}
				/>
				<SelectControl
					label={__("Margin Unit", "skt-blocks")}
					value={attributes.marginUnit || "px"}
					options={SPACING_UNITS}
					onChange={(value) => setAttributes({ marginUnit: value })}
				/>
				<DeviceTabs device={device} setDevice={setDevice}>
					{(tab) => {
						const pMax = (attributes.paddingUnit || "px") === "px" ? 500 : 100;
						const mMax = (attributes.marginUnit || "px") === "px" ? 500 : 100;
						return (
							<Fragment>
								{resp(tab, __("Padding Top", "skt-blocks"), "paddingTop", 0, pMax)}
								{resp(tab, __("Padding Right", "skt-blocks"), "paddingRight", 0, pMax)}
								{resp(tab, __("Padding Bottom", "skt-blocks"), "paddingBottom", 0, pMax)}
								{resp(tab, __("Padding Left", "skt-blocks"), "paddingLeft", 0, pMax)}
								{resp(tab, __("Margin Top", "skt-blocks"), "marginTop", -200, mMax)}
								{resp(tab, __("Margin Bottom", "skt-blocks"), "marginBottom", -200, mMax)}
							</Fragment>
						);
					}}
				</DeviceTabs>
			</PanelBody>
		</InspectorControls>
	);
}
