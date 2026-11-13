import {
	InspectorControls,
	ColorPalette,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TabPanel,
	Dashicon,
	BaseControl,
	Button,
	GradientPicker,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import fontOptions from "../../utils/googlefonts";
import { loadGoogleFont } from "../../utils/font";

const WEIGHT_OPTIONS = [
	{ label: "Default", value: "" },
	{ label: "100", value: "100" },
	{ label: "200", value: "200" },
	{ label: "300", value: "300" },
	{ label: "Normal (400)", value: "400" },
	{ label: "500", value: "500" },
	{ label: "600", value: "600" },
	{ label: "Bold (700)", value: "700" },
	{ label: "800", value: "800" },
	{ label: "900", value: "900" },
];
const TRANSFORM_OPTIONS = [
	{ label: "Default", value: "" },
	{ label: "Uppercase", value: "uppercase" },
	{ label: "Lowercase", value: "lowercase" },
	{ label: "Capitalize", value: "capitalize" },
	{ label: "None", value: "none" },
];
const ALIGN_OPTIONS = [
	{ label: "Default", value: "" },
	{ label: "Left", value: "left" },
	{ label: "Center", value: "center" },
	{ label: "Right", value: "right" },
	{ label: "Justify", value: "justify" },
];

const LAYOUT_PRESETS = [
	{ key: "100", widths: [100] },
	{ key: "50-50", widths: [50, 50] },
	{ key: "33-33-33", widths: [33.33, 33.33, 33.34] },
	{ key: "25-25-25-25", widths: [25, 25, 25, 25] },
	{ key: "20-20-20-20-20", widths: [20, 20, 20, 20, 20] },
	{ key: "66-34", widths: [66.66, 33.34] },
	{ key: "34-66", widths: [33.34, 66.66] },
	{ key: "25-50-25", widths: [25, 50, 25] },
	{ key: "50-25-25", widths: [50, 25, 25] },
	{ key: "25-25-50", widths: [25, 25, 50] },
];

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

const DEVICE_TABS = [
	{ name: "desktop", title: <Dashicon icon="desktop" />, className: " responsive-desktop-tab  responsive-responsive-tabs" },
	{ name: "tablet", title: <Dashicon icon="tablet" />, className: " responsive-tablet-tab  responsive-responsive-tabs" },
	{ name: "mobile", title: <Dashicon icon="smartphone" />, className: " responsive-mobile-tab  responsive-responsive-tabs" },
];

// Spacing units, same set as the Flex Block.
const SPACING_UNITS = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
	{ label: "em", value: "em" },
	{ label: "rem", value: "rem" },
	{ label: "vw", value: "vw" },
	{ label: "vh", value: "vh" },
];

export default function Inspector({ attributes, setAttributes }) {
	// --- Live device preview sync -------------------------------------------
	// Read WordPress's current editor preview device (Desktop/Tablet/Mobile) so
	// the inspector's device tabs follow it, and clicking a tab switches the
	// real editor preview — which resizes the canvas and triggers the grid's
	// responsive media queries. That makes the backend actually look like the
	// chosen device (e.g. Tablet columns = 1) instead of always desktop.
	const deviceType = useSelect((select) => {
		const editor = select("core/editor");
		if (editor && typeof editor.getDeviceType === "function") {
			return editor.getDeviceType();
		}
		const editPost = select("core/edit-post");
		if (
			editPost &&
			typeof editPost.__experimentalGetPreviewDeviceType === "function"
		) {
			return editPost.__experimentalGetPreviewDeviceType();
		}
		if (
			editor &&
			typeof editor.__experimentalGetPreviewDeviceType === "function"
		) {
			return editor.__experimentalGetPreviewDeviceType();
		}
		return "Desktop";
	}, []);
	const editorDispatch = useDispatch("core/editor");
	const editPostDispatch = useDispatch("core/edit-post");
	const setDevice = (d) => {
		if (editorDispatch && editorDispatch.setDeviceType) {
			editorDispatch.setDeviceType(d);
		} else if (
			editPostDispatch &&
			editPostDispatch.__experimentalSetPreviewDeviceType
		) {
			editPostDispatch.__experimentalSetPreviewDeviceType(d);
		} else if (
			editorDispatch &&
			editorDispatch.__experimentalSetPreviewDeviceType
		) {
			editorDispatch.__experimentalSetPreviewDeviceType(d);
		}
	};
	const activeDevice =
		deviceType === "Tablet"
			? "tablet"
			: deviceType === "Mobile"
			? "mobile"
			: "desktop";

	// Controlled device-tab row, synced to the editor's preview device.
	const DeviceTabs = ({ children }) => (
		<Fragment>
			<div className="skt-grid-device-tabs">
				{[
					{ name: "desktop", label: __("Desktop", "skt-blocks"), wp: "Desktop" },
					{ name: "tablet", label: __("Tablet", "skt-blocks"), wp: "Tablet" },
					{ name: "mobile", label: __("Mobile", "skt-blocks"), wp: "Mobile" },
				].map((d) => (
					<button
						key={d.name}
						type="button"
						className={
							"skt-grid-device-tab" +
							(activeDevice === d.name ? " is-active" : "")
						}
						onClick={() => setDevice(d.wp)}
					>
						{d.label}
					</button>
				))}
			</div>
			{children({ name: activeDevice })}
		</Fragment>
	);

	const suffixFor = (name) =>
		name === "tablet" ? "Tablet" : name === "mobile" ? "Mobile" : "";

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
				<p className="skt-grid-ctrl-label">{__("Predefined Layouts", "skt-blocks")}</p>
				<div className="skt-grid-layout-presets">
					{LAYOUT_PRESETS.map((preset) => (
						<button
							key={preset.key}
							type="button"
							className={
								"skt-grid-layout-preset" +
								(attributes.layout === preset.key ? " is-active" : "")
							}
							aria-label={preset.key}
							onClick={() =>
								setAttributes({
									layout: preset.key,
									columnWidths: preset.widths,
									columns: preset.widths.length,
								})
							}
						>
							{preset.widths.map((w, i) => (
								<span key={i} style={{ flexGrow: w }} />
							))}
						</button>
					))}
					<button
						type="button"
						className={
							"skt-grid-layout-preset skt-grid-layout-custom" +
							(attributes.layout === "custom" ? " is-active" : "")
						}
						onClick={() =>
							setAttributes({ layout: "custom", columnWidths: [] })
						}
					>
						{__("Custom", "skt-blocks")}
					</button>
				</div>

				<p className="skt-grid-ctrl-label">
					{__("Columns per row & Gap", "skt-blocks")}
				</p>
				<DeviceTabs>
					{(tab) => (
						<Fragment>
							{tab.name === "desktop" ? (
								attributes.layout === "custom" ? (
									<RangeControl
										label={__("Columns", "skt-blocks")}
										value={attributes.columns}
										onChange={(v) => setAttributes({ columns: v })}
										min={1}
										max={6}
										step={1}
									/>
								) : (
									<p className="skt-grid-ctrl-help">
										{__(
											"Desktop columns are set by the layout picked above. Choose Custom to set them by hand.",
											"skt-blocks"
										)}
									</p>
								)
							) : (
								resp(
									tab,
									__("Columns per row", "skt-blocks"),
									"columns",
									1,
									6
								)
							)}
							{resp(tab, __("Horizontal Gap (px)", "skt-blocks"), "horizontalGap", 0, 100)}
							{resp(tab, __("Vertical Gap (px)", "skt-blocks"), "verticalGap", 0, 100)}
						</Fragment>
					)}
				</DeviceTabs>
			</PanelBody>
			<PanelBody title={__("Alignment", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Vertical Alignment", "skt-blocks")}
					help={__(
						"Aligns the columns vertically within each row.",
						"skt-blocks"
					)}
					value={attributes.verticalAlignment}
					options={[
						{ value: "", label: __("Default (equal height)", "skt-blocks") },
						{ value: "top", label: __("Top", "skt-blocks") },
						{ value: "center", label: __("Center", "skt-blocks") },
						{ value: "bottom", label: __("Bottom", "skt-blocks") },
					]}
					onChange={(value) => setAttributes({ verticalAlignment: value })}
				/>
				<SelectControl
					label={__("Horizontal Alignment", "skt-blocks")}
					help={__(
						"Aligns the columns horizontally when they don't fill the row.",
						"skt-blocks"
					)}
					value={attributes.horizontalAlignment}
					options={[
						{ value: "", label: __("Left", "skt-blocks") },
						{ value: "center", label: __("Center", "skt-blocks") },
						{ value: "right", label: __("Right", "skt-blocks") },
					]}
					onChange={(value) =>
						setAttributes({ horizontalAlignment: value })
					}
				/>
			</PanelBody>
			<PanelBody title={__("Background", "skt-blocks")} initialOpen={false}>
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
			<PanelBody title={__("Background Overlay", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Overlay Type", "skt-blocks")}
					value={attributes.overlayType || "none"}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Color", "skt-blocks"), value: "color" },
						{ label: __("Gradient", "skt-blocks"), value: "gradient" },
					]}
					onChange={(value) => setAttributes({ overlayType: value })}
				/>
				{attributes.overlayType === "color" && (
					<BaseControl label={__("Overlay Color", "skt-blocks")} __nextHasNoMarginBottom>
						<ColorPalette
							value={attributes.overlayColor}
							onChange={(value) => setAttributes({ overlayColor: value })}
						/>
					</BaseControl>
				)}
				{attributes.overlayType === "gradient" && (
					<GradientPicker
						value={attributes.overlayGradient}
						onChange={(value) => setAttributes({ overlayGradient: value })}
						gradients={[]}
					/>
				)}
				{(attributes.overlayType === "color" ||
					attributes.overlayType === "gradient") && (
					<RangeControl
						label={__("Overlay Opacity (%)", "skt-blocks")}
						value={attributes.overlayOpacity}
						onChange={(value) => setAttributes({ overlayOpacity: value })}
						min={0}
						max={100}
						step={1}
					/>
				)}
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
				<DeviceTabs>
					{(tab) => {
						const pMax =
							(attributes.paddingUnit || "px") === "px" ? 500 : 100;
						const mMax =
							(attributes.marginUnit || "px") === "px" ? 500 : 100;
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
			<PanelBody title={__("Border & Shadow", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Border Style", "skt-blocks")}
					value={attributes.borderStyle}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Solid", "skt-blocks"), value: "solid" },
						{ label: __("Dashed", "skt-blocks"), value: "dashed" },
						{ label: __("Dotted", "skt-blocks"), value: "dotted" },
						{ label: __("Double", "skt-blocks"), value: "double" },
					]}
					onChange={(value) => setAttributes({ borderStyle: value })}
				/>
				{attributes.borderStyle && attributes.borderStyle !== "none" && (
					<Fragment>
						<RangeControl
							label={__("Border Width (px)", "skt-blocks")}
							value={attributes.borderWidth}
							onChange={(v) => setAttributes({ borderWidth: v })}
							min={0}
							max={30}
							step={1}
						/>
						<BaseControl label={__("Border Color", "skt-blocks")} __nextHasNoMarginBottom>
							<ColorPalette
								value={attributes.borderColor}
								onChange={(value) => setAttributes({ borderColor: value })}
							/>
						</BaseControl>
					</Fragment>
				)}
				<RangeControl
					label={__("Border Radius (px)", "skt-blocks")}
					value={attributes.borderRadius}
					onChange={(v) => setAttributes({ borderRadius: v })}
					min={0}
					max={200}
					step={1}
				/>
				<ToggleControl
					label={__("Box Shadow", "skt-blocks")}
					checked={!!attributes.boxShadowEnable}
					onChange={(value) => setAttributes({ boxShadowEnable: value })}
				/>
				{attributes.boxShadowEnable && (
					<Fragment>
						<BaseControl label={__("Shadow Color", "skt-blocks")} __nextHasNoMarginBottom>
							<ColorPalette
								value={attributes.boxShadowColor}
								onChange={(value) => setAttributes({ boxShadowColor: value })}
							/>
						</BaseControl>
						<RangeControl
							label={__("Horizontal", "skt-blocks")}
							value={attributes.boxShadowH}
							onChange={(v) => setAttributes({ boxShadowH: v })}
							min={-100}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Vertical", "skt-blocks")}
							value={attributes.boxShadowV}
							onChange={(v) => setAttributes({ boxShadowV: v })}
							min={-100}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Blur", "skt-blocks")}
							value={attributes.boxShadowBlur}
							onChange={(v) => setAttributes({ boxShadowBlur: v })}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Spread", "skt-blocks")}
							value={attributes.boxShadowSpread}
							onChange={(v) => setAttributes({ boxShadowSpread: v })}
							min={-100}
							max={100}
							step={1}
						/>
						<ToggleControl
							label={__("Inset", "skt-blocks")}
							checked={!!attributes.boxShadowInset}
							onChange={(value) => setAttributes({ boxShadowInset: value })}
						/>
					</Fragment>
				)}
			</PanelBody>
			<PanelBody title={__("Typography", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Font Family", "skt-blocks")}
					options={fontOptions}
					value={attributes.fontFamily}
					onChange={(value) => {
						setAttributes({ fontFamily: value });
						loadGoogleFont(value);
					}}
				/>
				<SelectControl
					label={__("Font Weight", "skt-blocks")}
					options={WEIGHT_OPTIONS}
					value={attributes.fontWeight}
					onChange={(value) => setAttributes({ fontWeight: value })}
				/>
				<p className="skt-grid-ctrl-label">{__("Font Size (px)", "skt-blocks")}</p>
				<TabPanel
					className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
					activeClass="active-tab"
					tabs={DEVICE_TABS}
				>
					{(tab) => resp(tab, __("Font Size", "skt-blocks"), "fontSize", 1, 200)}
				</TabPanel>
				<p className="skt-grid-ctrl-label">{__("Line Height", "skt-blocks")}</p>
				<TabPanel
					className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
					activeClass="active-tab"
					tabs={DEVICE_TABS}
				>
					{(tab) => {
						const key = "lineHeight" + suffixFor(tab.name);
						return (
							<RangeControl
								label={__("Line Height", "skt-blocks")}
								value={attributes[key]}
								onChange={(v) => setAttributes({ [key]: v })}
								min={0}
								max={10}
								step={0.1}
								allowReset
							/>
						);
					}}
				</TabPanel>
				<RangeControl
					label={__("Letter Spacing (px)", "skt-blocks")}
					value={attributes.letterSpacing}
					onChange={(v) => setAttributes({ letterSpacing: v })}
					min={-5}
					max={20}
					step={0.1}
					allowReset
				/>
				<SelectControl
					label={__("Text Transform", "skt-blocks")}
					options={TRANSFORM_OPTIONS}
					value={attributes.textTransform}
					onChange={(value) => setAttributes({ textTransform: value })}
				/>
				<SelectControl
					label={__("Text Align", "skt-blocks")}
					options={ALIGN_OPTIONS}
					value={attributes.textAlign}
					onChange={(value) => setAttributes({ textAlign: value })}
				/>
				<BaseControl label={__("Text Color", "skt-blocks")} __nextHasNoMarginBottom>
					<ColorPalette
						value={attributes.textColor}
						onChange={(value) => setAttributes({ textColor: value })}
					/>
				</BaseControl>
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
			<PanelBody title={__("Tag Name", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("HTML Tag", "skt-blocks")}
					help={__(
						"The wrapper element used for this grid.",
						"skt-blocks"
					)}
					value={attributes.tagName || "div"}
					options={[
						{ label: "div", value: "div" },
						{ label: "section", value: "section" },
						{ label: "article", value: "article" },
						{ label: "header", value: "header" },
						{ label: "footer", value: "footer" },
						{ label: "main", value: "main" },
						{ label: "aside", value: "aside" },
						{ label: "nav", value: "nav" },
					]}
					onChange={(value) => setAttributes({ tagName: value })}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
