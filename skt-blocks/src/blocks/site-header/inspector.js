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
	TabPanel,
	BaseControl,
	Button,
	GradientPicker,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";

const DEVICE_TABS = [
	{ name: "desktop", title: __("Desktop", "skt-blocks") },
	{ name: "tablet", title: __("Tablet", "skt-blocks") },
	{ name: "mobile", title: __("Mobile", "skt-blocks") },
];

// Background image option lists (same as the Site Footer block).
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

const suffixFor = (name) =>
	name === "tablet" ? "Tablet" : name === "mobile" ? "Mobile" : "";

export default function Inspector({ attributes, setAttributes }) {
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

	// A single number attribute shortcut.
	const numCtrl = (label, key, min, max, step = 1) => (
		<RangeControl
			label={label}
			value={attributes[key]}
			onChange={(v) => setAttributes({ [key]: v })}
			min={min}
			max={max}
			step={step}
			allowReset
		/>
	);

	const contained = (attributes.contentWidth || "contained") === "contained";
	const bgType = attributes.backgroundType || "none";

	return (
		<InspectorControls>
			{/* ---------------- LAYOUT ---------------- */}
			<PanelBody title={__("Layout", "skt-blocks")} initialOpen={true}>
				<SelectControl
					label={__("Content Width", "skt-blocks")}
					value={attributes.contentWidth || "contained"}
					options={[
						{ label: __("Contained", "skt-blocks"), value: "contained" },
						{ label: __("Full Width", "skt-blocks"), value: "full" },
					]}
					onChange={(value) => setAttributes({ contentWidth: value })}
					help={__(
						"Contained centres the header items inside a max-width; Full Width lets them span the whole header.",
						"skt-blocks"
					)}
				/>

				{contained && (
					<Fragment>
						<p className="skt-sh-ctrl-label">
							{__("Inner Max Width (px)", "skt-blocks")}
						</p>
						<TabPanel className="skt-sh-device-tabs" tabs={DEVICE_TABS}>
							{(tab) =>
								resp(tab, __("Width", "skt-blocks"), "innerWidth", 320, 1920)
							}
						</TabPanel>
					</Fragment>
				)}

				<p className="skt-sh-ctrl-label">{__("Gap", "skt-blocks")}</p>
				<TabPanel className="skt-sh-device-tabs" tabs={DEVICE_TABS}>
					{(tab) => resp(tab, __("Gap (px)", "skt-blocks"), "gap", 0, 200)}
				</TabPanel>

				<p className="skt-sh-ctrl-label">
					{__("Minimum Height (px)", "skt-blocks")}
				</p>
				<TabPanel className="skt-sh-device-tabs" tabs={DEVICE_TABS}>
					{(tab) =>
						resp(tab, __("Min Height", "skt-blocks"), "minHeight", 0, 400)
					}
				</TabPanel>

				<ToggleControl
					label={__("Wrap items on mobile", "skt-blocks")}
					help={__(
						"When on, header items wrap onto multiple lines on small screens instead of staying in one row.",
						"skt-blocks"
					)}
					checked={!!attributes.wrapMobile}
					onChange={(value) => setAttributes({ wrapMobile: value })}
				/>

				<SelectControl
					label={__("HTML Tag", "skt-blocks")}
					value={attributes.tagName || "header"}
					options={[
						{ label: "header", value: "header" },
						{ label: "div", value: "div" },
						{ label: "nav", value: "nav" },
						{ label: "section", value: "section" },
					]}
					onChange={(value) => setAttributes({ tagName: value })}
				/>
			</PanelBody>

			{/* ---------------- BACKGROUND ---------------- */}
			<PanelBody title={__("Background", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Background Type", "skt-blocks")}
					value={bgType}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Color", "skt-blocks"), value: "color" },
						{ label: __("Gradient", "skt-blocks"), value: "gradient" },
						{ label: __("Image", "skt-blocks"), value: "image" },
					]}
					onChange={(value) => setAttributes({ backgroundType: value })}
				/>

				{bgType === "color" && (
					<BaseControl
						label={__("Background Color", "skt-blocks")}
						__nextHasNoMarginBottom
					>
						<ColorPalette
							value={attributes.backgroundColor}
							onChange={(value) => setAttributes({ backgroundColor: value })}
						/>
					</BaseControl>
				)}

				{bgType === "gradient" && (
					<GradientPicker
						value={attributes.backgroundGradient}
						onChange={(value) =>
							setAttributes({ backgroundGradient: value })
						}
						gradients={[]}
					/>
				)}

				{bgType === "image" && (
					<Fragment>
						<BaseControl __nextHasNoMarginBottom>
							{attributes.backgroundImage && (
								<img
									src={attributes.backgroundImage}
									alt=""
									style={{
										display: "block",
										width: "100%",
										height: "auto",
										marginBottom: "8px",
										borderRadius: "2px",
									}}
								/>
							)}
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) =>
										setAttributes({
											backgroundImage: media.url,
											backgroundImageId: media.id,
										})
									}
									allowedTypes={["image"]}
									value={attributes.backgroundImageId}
									render={({ open }) => (
										<Button variant="secondary" onClick={open}>
											{attributes.backgroundImage
												? __("Replace Image", "skt-blocks")
												: __("Select Image", "skt-blocks")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{attributes.backgroundImage && (
								<Button
									variant="link"
									isDestructive
									onClick={() =>
										setAttributes({
											backgroundImage: undefined,
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
							value={attributes.backgroundImagePosition || "center center"}
							options={POSITION_OPTIONS}
							onChange={(value) =>
								setAttributes({ backgroundImagePosition: value })
							}
						/>
						<SelectControl
							label={__("Size", "skt-blocks")}
							value={attributes.backgroundImageSize || "cover"}
							options={SIZE_OPTIONS}
							onChange={(value) =>
								setAttributes({ backgroundImageSize: value })
							}
						/>
						<SelectControl
							label={__("Repeat", "skt-blocks")}
							value={attributes.backgroundImageRepeat || "no-repeat"}
							options={REPEAT_OPTIONS}
							onChange={(value) =>
								setAttributes({ backgroundImageRepeat: value })
							}
						/>
						<SelectControl
							label={__("Attachment", "skt-blocks")}
							value={attributes.backgroundAttachment || "scroll"}
							options={ATTACHMENT_OPTIONS}
							onChange={(value) =>
								setAttributes({ backgroundAttachment: value })
							}
						/>
					</Fragment>
				)}
			</PanelBody>

			{/* ---------------- TRANSPARENT HEADER ---------------- */}
			<PanelBody
				title={__("Transparent Header", "skt-blocks")}
				initialOpen={false}
			>
				<ToggleControl
					label={__("Enable Transparent Header", "skt-blocks")}
					help={__(
						"Header is transparent at the top of the page and turns solid once it sticks on scroll.",
						"skt-blocks"
					)}
					checked={!!attributes.transparentEnable}
					onChange={(value) => setAttributes({ transparentEnable: value })}
				/>

				{attributes.transparentEnable && (
					<Fragment>
						<SelectControl
							label={__("Transparent On", "skt-blocks")}
							value={attributes.transparentOn || "all"}
							options={[
								{ label: __("All Devices", "skt-blocks"), value: "all" },
								{ label: __("Desktop Only", "skt-blocks"), value: "desktop" },
								{
									label: __("Tablet & Mobile", "skt-blocks"),
									value: "tablet-mobile",
								},
								{ label: __("Mobile Only", "skt-blocks"), value: "mobile" },
							]}
							onChange={(value) => setAttributes({ transparentOn: value })}
						/>
						<BaseControl
							label={__("Text / Link Color (transparent)", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={attributes.transparentTextColor}
								onChange={(value) =>
									setAttributes({ transparentTextColor: value })
								}
							/>
						</BaseControl>
						<ToggleControl
							label={__("Overlay content", "skt-blocks")}
							help={__(
								"Pull the header on top of the section below it (absolute) so your hero shows through. Front end only.",
								"skt-blocks"
							)}
							checked={!!attributes.transparentOverlay}
							onChange={(value) =>
								setAttributes({ transparentOverlay: value })
							}
						/>
					</Fragment>
				)}
			</PanelBody>

			{/* ---------------- BORDER & SHADOW ---------------- */}
			<PanelBody
				title={__("Border & Box Shadow", "skt-blocks")}
				initialOpen={false}
			>
				<SelectControl
					label={__("Border Style", "skt-blocks")}
					value={attributes.borderStyle || "none"}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: "Solid", value: "solid" },
						{ label: "Dashed", value: "dashed" },
						{ label: "Dotted", value: "dotted" },
					]}
					onChange={(value) => setAttributes({ borderStyle: value })}
				/>
				{(attributes.borderStyle || "none") !== "none" && (
					<Fragment>
						{numCtrl(__("Border Width (px)", "skt-blocks"), "borderWidth", 0, 20)}
						<BaseControl
							label={__("Border Color", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={attributes.borderColor}
								onChange={(value) => setAttributes({ borderColor: value })}
							/>
						</BaseControl>
					</Fragment>
				)}
				{numCtrl(__("Border Radius (px)", "skt-blocks"), "borderRadius", 0, 100)}

				<ToggleControl
					label={__("Box Shadow", "skt-blocks")}
					help={__(
						"A drop shadow on the header in its normal (non-sticky) state.",
						"skt-blocks"
					)}
					checked={!!attributes.boxShadowEnable}
					onChange={(value) => setAttributes({ boxShadowEnable: value })}
				/>
				{attributes.boxShadowEnable && (
					<Fragment>
						<BaseControl
							label={__("Shadow Color", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={attributes.boxShadowColor}
								onChange={(value) => setAttributes({ boxShadowColor: value })}
							/>
						</BaseControl>
						{numCtrl(__("Horizontal", "skt-blocks"), "boxShadowH", -50, 50)}
						{numCtrl(__("Vertical", "skt-blocks"), "boxShadowV", -50, 50)}
						{numCtrl(__("Blur", "skt-blocks"), "boxShadowBlur", 0, 100)}
						{numCtrl(__("Spread", "skt-blocks"), "boxShadowSpread", -50, 50)}
					</Fragment>
				)}
			</PanelBody>

			{/* ---------------- SPACING ---------------- */}
			<PanelBody title={__("Spacing", "skt-blocks")} initialOpen={false}>
				<p className="skt-sh-ctrl-label">{__("Padding (px)", "skt-blocks")}</p>
				<TabPanel className="skt-sh-device-tabs" tabs={DEVICE_TABS}>
					{(tab) => (
						<Fragment>
							{resp(tab, __("Top", "skt-blocks"), "paddingTop", 0, 200)}
							{resp(tab, __("Right", "skt-blocks"), "paddingRight", 0, 200)}
							{resp(tab, __("Bottom", "skt-blocks"), "paddingBottom", 0, 200)}
							{resp(tab, __("Left", "skt-blocks"), "paddingLeft", 0, 200)}
						</Fragment>
					)}
				</TabPanel>

				<p className="skt-sh-ctrl-label">{__("Margin (px)", "skt-blocks")}</p>
				<TabPanel className="skt-sh-device-tabs" tabs={DEVICE_TABS}>
					{(tab) => (
						<Fragment>
							{resp(tab, __("Top", "skt-blocks"), "marginTop", -200, 200)}
							{resp(tab, __("Bottom", "skt-blocks"), "marginBottom", -200, 200)}
						</Fragment>
					)}
				</TabPanel>
			</PanelBody>

			{/* ---------------- STICKY HEADER ---------------- */}
			<PanelBody title={__("Sticky Header", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Sticky Behaviour", "skt-blocks")}
					value={attributes.stickyBehaviour || "none"}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Sticky", "skt-blocks"), value: "sticky" },
					]}
					onChange={(value) => setAttributes({ stickyBehaviour: value })}
					help={__(
						"Sticky keeps the header fixed at the top of the screen as the page scrolls.",
						"skt-blocks"
					)}
				/>

				{attributes.stickyBehaviour === "sticky" && (
					<Fragment>
						<SelectControl
							label={__("Sticky On", "skt-blocks")}
							value={attributes.stickyOn || "all"}
							options={[
								{ label: __("All Devices", "skt-blocks"), value: "all" },
								{ label: __("Desktop Only", "skt-blocks"), value: "desktop" },
								{
									label: __("Tablet & Mobile", "skt-blocks"),
									value: "tablet-mobile",
								},
								{ label: __("Mobile Only", "skt-blocks"), value: "mobile" },
							]}
							onChange={(value) => setAttributes({ stickyOn: value })}
						/>

						<RangeControl
							label={__("Threshold (px)", "skt-blocks")}
							help={__(
								"How far the page must scroll before the header becomes sticky.",
								"skt-blocks"
							)}
							value={attributes.stickyThreshold}
							onChange={(v) => setAttributes({ stickyThreshold: v })}
							min={0}
							max={600}
							step={1}
							allowReset
						/>

						<p className="skt-sh-ctrl-label">
							{__("Sticky Styling", "skt-blocks")}
						</p>
						<BaseControl
							label={__("Background (when stuck)", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={attributes.stickyBackground}
								onChange={(value) =>
									setAttributes({ stickyBackground: value })
								}
							/>
						</BaseControl>

						<ToggleControl
							label={__("Box Shadow", "skt-blocks")}
							checked={!!attributes.stickyBoxShadow}
							onChange={(value) =>
								setAttributes({ stickyBoxShadow: value })
							}
						/>
						<ToggleControl
							label={__("Transition", "skt-blocks")}
							checked={!!attributes.stickyTransition}
							onChange={(value) =>
								setAttributes({ stickyTransition: value })
							}
						/>
					</Fragment>
				)}
			</PanelBody>

			{/* ---------------- VISIBILITY ---------------- */}
			<PanelBody title={__("Visibility", "skt-blocks")} initialOpen={false}>
				<ToggleControl
					label={__("Hide on Desktop", "skt-blocks")}
					checked={!!attributes.hideOnDesktop}
					onChange={(value) => setAttributes({ hideOnDesktop: value })}
				/>
				<ToggleControl
					label={__("Hide on Tablet", "skt-blocks")}
					checked={!!attributes.hideOnTablet}
					onChange={(value) => setAttributes({ hideOnTablet: value })}
				/>
				<ToggleControl
					label={__("Hide on Mobile", "skt-blocks")}
					checked={!!attributes.hideOnMobile}
					onChange={(value) => setAttributes({ hideOnMobile: value })}
				/>
				<p className="skt-sh-ctrl-label" style={{ marginTop: 8 }}>
					{__(
						"Hidden only on the front end — in the editor the header stays visible so you can edit it.",
						"skt-blocks"
					)}
				</p>
			</PanelBody>

			{/* ---------------- Z-INDEX ---------------- */}
			<PanelBody title={__("Z-Index", "skt-blocks")} initialOpen={false}>
				<RangeControl
					label={__("Z-index", "skt-blocks")}
					help={__(
						"Stacking order. Raise it if the header is overlapped by other content.",
						"skt-blocks"
					)}
					value={attributes.zIndex}
					onChange={(v) => setAttributes({ zIndex: v })}
					min={0}
					max={9999}
					step={1}
					allowReset
				/>
			</PanelBody>
		</InspectorControls>
	);
}
