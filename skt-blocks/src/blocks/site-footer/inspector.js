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
	BaseControl,
	Button,
	GradientPicker,
	TabPanel,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";

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

const DEVICE_TABS = [
	{ name: "desktop", title: __("Desktop", "skt-blocks") },
	{ name: "tablet", title: __("Tablet", "skt-blocks") },
	{ name: "mobile", title: __("Mobile", "skt-blocks") },
];

export default function Inspector({ attributes, setAttributes }) {
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

	const contained = (attributes.contentWidth || "contained") === "contained";

	return (
		<InspectorControls>
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
						"Contained centres the footer items inside a max-width; Full Width lets them span the whole footer.",
						"skt-blocks"
					)}
				/>

				{contained && (
					<Fragment>
						<p className="skt-sf-ctrl-label">
							{__("Inner Max Width (px)", "skt-blocks")}
						</p>
						<TabPanel className="skt-sf-device-tabs" tabs={DEVICE_TABS}>
							{(tab) =>
								resp(tab, __("Width", "skt-blocks"), "innerWidth", 320, 1920)
							}
						</TabPanel>
					</Fragment>
				)}

				<p className="skt-sf-ctrl-label">{__("Gap", "skt-blocks")}</p>
				<TabPanel className="skt-sf-device-tabs" tabs={DEVICE_TABS}>
					{(tab) => resp(tab, __("Gap (px)", "skt-blocks"), "gap", 0, 200)}
				</TabPanel>

				<p className="skt-sf-ctrl-label">
					{__("Minimum Height (px)", "skt-blocks")}
				</p>
				<TabPanel className="skt-sf-device-tabs" tabs={DEVICE_TABS}>
					{(tab) =>
						resp(tab, __("Min Height", "skt-blocks"), "minHeight", 0, 400)
					}
				</TabPanel>

				<ToggleControl
					label={__("Wrap items on mobile", "skt-blocks")}
					help={__(
						"When on, footer items wrap onto multiple lines on small screens instead of staying in one row.",
						"skt-blocks"
					)}
					checked={!!attributes.wrapMobile}
					onChange={(value) => setAttributes({ wrapMobile: value })}
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
				<TabPanel className="skt-sf-device-tabs" tabs={DEVICE_TABS}>
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
				</TabPanel>
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
						"The wrapper element used for this footer.",
						"skt-blocks"
					)}
					value={attributes.tagName || "footer"}
					options={[
						{ label: "footer", value: "footer" },
						{ label: "div", value: "div" },
						{ label: "section", value: "section" },
						{ label: "article", value: "article" },
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
