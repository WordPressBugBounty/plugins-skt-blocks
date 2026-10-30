import { __ } from "@wordpress/i18n";
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
	GradientPicker,
	BaseControl,
	Button,
	ToggleControl,
	TextControl,
	TabPanel,
} from "@wordpress/components";

const TAG_OPTIONS = [
	{ label: "div", value: "div" },
	{ label: "section", value: "section" },
	{ label: "header", value: "header" },
	{ label: "article", value: "article" },
	{ label: "main", value: "main" },
	{ label: "aside", value: "aside" },
	{ label: "footer", value: "footer" },
];

const DIRECTION_OPTIONS = [
	{ label: __("Vertical", "skt-blocks"), value: "column" },
	{ label: __("Horizontal", "skt-blocks"), value: "row" },
	{ label: __("Vertical (reverse)", "skt-blocks"), value: "column-reverse" },
	{ label: __("Horizontal (reverse)", "skt-blocks"), value: "row-reverse" },
];

// Main-axis distribution (maps to CSS justify-content).
const MAIN_OPTIONS = [
	{ label: __("Start", "skt-blocks"), value: "flex-start" },
	{ label: __("Center", "skt-blocks"), value: "center" },
	{ label: __("End", "skt-blocks"), value: "flex-end" },
	{ label: __("Space Between", "skt-blocks"), value: "space-between" },
	{ label: __("Space Around", "skt-blocks"), value: "space-around" },
	{ label: __("Space Evenly", "skt-blocks"), value: "space-evenly" },
];

// Cross-axis alignment (maps to CSS align-items).
const CROSS_OPTIONS = [
	{ label: __("Start", "skt-blocks"), value: "flex-start" },
	{ label: __("Center", "skt-blocks"), value: "center" },
	{ label: __("End", "skt-blocks"), value: "flex-end" },
	{ label: __("Stretch", "skt-blocks"), value: "stretch" },
];

const WRAP_OPTIONS = [
	{ label: __("No Wrap", "skt-blocks"), value: "nowrap" },
	{ label: __("Wrap", "skt-blocks"), value: "wrap" },
	{ label: __("Wrap Reverse", "skt-blocks"), value: "wrap-reverse" },
];

const UNIT_OPTIONS = [
	{ label: "px", value: "px" },
	{ label: "vh", value: "vh" },
	{ label: "%", value: "%" },
];

const SPACING_UNITS = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
	{ label: "em", value: "em" },
	{ label: "rem", value: "rem" },
	{ label: "vw", value: "vw" },
	{ label: "vh", value: "vh" },
];

const POSITION_OPTIONS = [
	{ label: __("Center Center", "skt-blocks"), value: "center center" },
	{ label: __("Top Left", "skt-blocks"), value: "left top" },
	{ label: __("Top Center", "skt-blocks"), value: "center top" },
	{ label: __("Top Right", "skt-blocks"), value: "right top" },
	{ label: __("Center Left", "skt-blocks"), value: "left center" },
	{ label: __("Center Right", "skt-blocks"), value: "right center" },
	{ label: __("Bottom Left", "skt-blocks"), value: "left bottom" },
	{ label: __("Bottom Center", "skt-blocks"), value: "center bottom" },
	{ label: __("Bottom Right", "skt-blocks"), value: "right bottom" },
];

const SIZE_OPTIONS = [
	{ label: __("Cover", "skt-blocks"), value: "cover" },
	{ label: __("Contain", "skt-blocks"), value: "contain" },
	{ label: __("Auto", "skt-blocks"), value: "auto" },
];

const REPEAT_OPTIONS = [
	{ label: __("No Repeat", "skt-blocks"), value: "no-repeat" },
	{ label: __("Repeat", "skt-blocks"), value: "repeat" },
	{ label: __("Repeat X", "skt-blocks"), value: "repeat-x" },
	{ label: __("Repeat Y", "skt-blocks"), value: "repeat-y" },
];

const ATTACHMENT_OPTIONS = [
	{ label: __("Scroll", "skt-blocks"), value: "scroll" },
	{ label: __("Fixed", "skt-blocks"), value: "fixed" },
];

export default function Inspector({ attributes, setAttributes }) {
	const {
		tagName,
		flexDirection,
		justifyContent,
		alignItems,
		flexWrap,
		columnGap,
		rowGap,
		backgroundType,
		backgroundColor,
		gradientColor,
		backgroundImageUrl,
		backgroundImageId,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat,
		backgroundAttachment,
		overlayType,
		overlayColor,
		overlayGradient,
		overlayOpacity,
		flexGrow,
		flexBasis,
		flexBasisUnit,
		zIndex,
		mobileOrder,
		borderStyle,
		borderColor,
		borderWidth,
		borderRadius,
		boxShadowEnable,
		boxShadowColor,
		boxShadowH,
		boxShadowV,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowHoverEnable,
		boxShadowHoverColor,
		boxShadowHoverH,
		boxShadowHoverV,
		boxShadowHoverBlur,
		boxShadowHoverSpread,
		textColor,
		linkColor,
		linkHoverColor,
		backdropEnable,
		backdropBlur,
		backdropBrightness,
		backdropContrast,
		backdropSaturate,
		backdropGrayscale,
		hideDesktop,
		hideTablet,
		hideMobile,
		hideLoggedIn,
		hideLoggedOut,
		stickyEnable,
		stickyOffset,
		stickyBreakpoint,
		overlayLinkEnable,
		overlayLinkUrl,
		overlayLinkNewTab,
		overlayLinkLabel,
		dynamicBgSource,
		dynamicBgField,
		minHeight,
		minHeightUnit,
		widthType,
		widthValue,
		widthUnit,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		marginTop,
		marginBottom,
		textAlign,
		backgroundHoverType,
		backgroundHoverColor,
		gradientHoverColor,
		borderHoverColor,
		textHoverColor,
		backdropHueRotate,
		backdropInvert,
		backdropSepia,
	} = attributes;

	const isRow =
		flexDirection === "row" || flexDirection === "row-reverse";

	return (
		<InspectorControls>
			<PanelBody title={__("Layout", "skt-blocks")} initialOpen={true}>
				<SelectControl
					label={__("Direction", "skt-blocks")}
					value={flexDirection}
					options={DIRECTION_OPTIONS}
					onChange={(value) =>
						setAttributes({ flexDirection: value })
					}
				/>

				{/* Horizontal position of items. In a row this is the main axis
				    (justify-content); in a column it is the cross axis
				    (align-items). Options adapt to the direction. */}
				<SelectControl
					label={__("Horizontal Alignment", "skt-blocks")}
					value={isRow ? justifyContent : alignItems}
					options={isRow ? MAIN_OPTIONS : CROSS_OPTIONS}
					onChange={(value) =>
						setAttributes(
							isRow
								? { justifyContent: value }
								: { alignItems: value }
						)
					}
				/>

				{/* Vertical position of items. In a row this is the cross axis
				    (align-items); in a column it is the main axis
				    (justify-content). */}
				<SelectControl
					label={__("Vertical Alignment", "skt-blocks")}
					value={isRow ? alignItems : justifyContent}
					options={isRow ? CROSS_OPTIONS : MAIN_OPTIONS}
					onChange={(value) =>
						setAttributes(
							isRow
								? { alignItems: value }
								: { justifyContent: value }
						)
					}
				/>

				{/* Wrap + Horizontal Gap only apply to horizontal (row) layouts. */}
				{isRow && (
					<SelectControl
						label={__("Wrap", "skt-blocks")}
						value={flexWrap}
						options={WRAP_OPTIONS}
						onChange={(value) =>
							setAttributes({ flexWrap: value })
						}
					/>
				)}
				{isRow && (
					<RangeControl
						label={__("Horizontal Gap (px)", "skt-blocks")}
						value={columnGap}
						onChange={(value) =>
							setAttributes({ columnGap: value })
						}
						min={0}
						max={200}
					/>
				)}
				<RangeControl
					label={__("Vertical Gap (px)", "skt-blocks")}
					value={rowGap}
					onChange={(value) => setAttributes({ rowGap: value })}
					min={0}
					max={200}
				/>
					<SelectControl
						label={__("Text Alignment", "skt-blocks")}
						value={textAlign || ""}
						options={[
							{ label: __("Inherit", "skt-blocks"), value: "" },
							{ label: __("Left", "skt-blocks"), value: "left" },
							{ label: __("Center", "skt-blocks"), value: "center" },
							{ label: __("Right", "skt-blocks"), value: "right" },
							{ label: __("Justify", "skt-blocks"), value: "justify" },
						]}
						onChange={(value) =>
							setAttributes({ textAlign: value || undefined })
						}
					/>
			</PanelBody>

			<PanelBody
				title={__("Background", "skt-blocks")}
				initialOpen={false}
			>
				<SelectControl
					label={__("Background Type", "skt-blocks")}
					value={backgroundType}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Color", "skt-blocks"), value: "color" },
						{
							label: __("Gradient", "skt-blocks"),
							value: "gradient",
						},
						{ label: __("Image", "skt-blocks"), value: "image" },
					]}
					onChange={(value) =>
						setAttributes({ backgroundType: value })
					}
				/>
					<SelectControl
						label={__("Dynamic Background Image", "skt-blocks")}
						value={dynamicBgSource || "none"}
						options={[
							{ label: __("None (use image above)", "skt-blocks"), value: "none" },
							{ label: __("Featured Image", "skt-blocks"), value: "featured" },
						]}
						help={__(
							"Pulls the background image from the post\u2019s featured image. Shows on the front end.",
							"skt-blocks"
						)}
						onChange={(value) =>
							setAttributes({ dynamicBgSource: value })
						}
					/>

				{backgroundType === "color" && (
					<BaseControl
						label={__("Background Color", "skt-blocks")}
						__nextHasNoMarginBottom
					>
						<ColorPalette
							value={backgroundColor}
							onChange={(value) =>
								setAttributes({ backgroundColor: value })
							}
						/>
					</BaseControl>
				)}

				{backgroundType === "gradient" && (
					<GradientPicker
						value={gradientColor}
						onChange={(value) =>
							setAttributes({ gradientColor: value })
						}
						gradients={[]}
					/>
				)}

				{backgroundType === "image" && (
					<>
						<BaseControl __nextHasNoMarginBottom>
							{backgroundImageUrl && (
								<img
									src={backgroundImageUrl}
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
											backgroundImageUrl: media.url,
											backgroundImageId: media.id,
										})
									}
									allowedTypes={["image"]}
									value={backgroundImageId}
									render={({ open }) => (
										<Button
											variant="secondary"
											onClick={open}
										>
											{backgroundImageUrl
												? __(
														"Replace Image",
														"skt-blocks"
												  )
												: __(
														"Select Image",
														"skt-blocks"
												  )}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{backgroundImageUrl && (
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
							value={backgroundPosition}
							options={POSITION_OPTIONS}
							onChange={(value) =>
								setAttributes({ backgroundPosition: value })
							}
						/>
						<SelectControl
							label={__("Size", "skt-blocks")}
							value={backgroundSize}
							options={SIZE_OPTIONS}
							onChange={(value) =>
								setAttributes({ backgroundSize: value })
							}
						/>
						<SelectControl
							label={__("Repeat", "skt-blocks")}
							value={backgroundRepeat}
							options={REPEAT_OPTIONS}
							onChange={(value) =>
								setAttributes({ backgroundRepeat: value })
							}
						/>
						<SelectControl
							label={__("Attachment", "skt-blocks")}
							value={backgroundAttachment}
							options={ATTACHMENT_OPTIONS}
							onChange={(value) =>
								setAttributes({
									backgroundAttachment: value,
								})
							}
						/>
					</>
				)}
					<SelectControl
						label={__("Background Hover Type", "skt-blocks")}
						value={backgroundHoverType || "none"}
						options={[
							{ label: __("None", "skt-blocks"), value: "none" },
							{ label: __("Color", "skt-blocks"), value: "color" },
							{ label: __("Gradient", "skt-blocks"), value: "gradient" },
						]}
						onChange={(value) =>
							setAttributes({ backgroundHoverType: value })
						}
					/>
					{backgroundHoverType === "color" && (
						<BaseControl
							label={__("Background Hover Color", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={backgroundHoverColor}
								onChange={(value) =>
									setAttributes({ backgroundHoverColor: value })
								}
							/>
						</BaseControl>
					)}
					{backgroundHoverType === "gradient" && (
						<GradientPicker
							value={gradientHoverColor}
							onChange={(value) =>
								setAttributes({ gradientHoverColor: value })
							}
							gradients={[]}
						/>
					)}
			</PanelBody>

			<PanelBody
				title={__("Background Overlay", "skt-blocks")}
				initialOpen={false}
			>
				<SelectControl
					label={__("Overlay Type", "skt-blocks")}
					value={overlayType}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Color", "skt-blocks"), value: "color" },
						{
							label: __("Gradient", "skt-blocks"),
							value: "gradient",
						},
					]}
					onChange={(value) =>
						setAttributes({ overlayType: value })
					}
				/>

				{overlayType === "color" && (
					<BaseControl
						label={__("Overlay Color", "skt-blocks")}
						__nextHasNoMarginBottom
					>
						<ColorPalette
							value={overlayColor}
							onChange={(value) =>
								setAttributes({ overlayColor: value })
							}
						/>
					</BaseControl>
				)}

				{overlayType === "gradient" && (
					<GradientPicker
						value={overlayGradient}
						onChange={(value) =>
							setAttributes({ overlayGradient: value })
						}
						gradients={[]}
					/>
				)}

				{overlayType !== "none" && (
					<RangeControl
						label={__("Overlay Opacity (%)", "skt-blocks")}
						value={overlayOpacity}
						onChange={(value) =>
							setAttributes({ overlayOpacity: value })
						}
						min={0}
						max={100}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("Border & Shadow", "skt-blocks")}
				initialOpen={false}
			>
				<SelectControl
					label={__("Border Style", "skt-blocks")}
					value={borderStyle}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: __("Solid", "skt-blocks"), value: "solid" },
						{
							label: __("Dashed", "skt-blocks"),
							value: "dashed",
						},
						{
							label: __("Dotted", "skt-blocks"),
							value: "dotted",
						},
						{
							label: __("Double", "skt-blocks"),
							value: "double",
						},
					]}
					onChange={(value) =>
						setAttributes({ borderStyle: value })
					}
				/>

				{borderStyle !== "none" && (
					<>
						<RangeControl
							label={__("Border Width (px)", "skt-blocks")}
							value={borderWidth}
							onChange={(value) =>
								setAttributes({ borderWidth: value })
							}
							min={0}
							max={50}
						/>
						<BaseControl
							label={__("Border Color", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={borderColor}
								onChange={(value) =>
									setAttributes({ borderColor: value })
								}
							/>
						</BaseControl>
					</>
				)}

				<RangeControl
					label={__("Border Radius (px)", "skt-blocks")}
					value={borderRadius}
					onChange={(value) =>
						setAttributes({ borderRadius: value })
					}
					min={0}
					max={200}
					allowReset
				/>
					<BaseControl
						label={__("Border Hover Color", "skt-blocks")}
						__nextHasNoMarginBottom
					>
						<ColorPalette
							value={borderHoverColor}
							onChange={(value) =>
								setAttributes({ borderHoverColor: value })
							}
						/>
					</BaseControl>

				<ToggleControl
					label={__("Box Shadow", "skt-blocks")}
					checked={boxShadowEnable}
					onChange={(value) =>
						setAttributes({ boxShadowEnable: value })
					}
				/>

				{boxShadowEnable && (
					<>
						<RangeControl
							label={__("Horizontal Offset (px)", "skt-blocks")}
							value={boxShadowH}
							onChange={(value) =>
								setAttributes({ boxShadowH: value })
							}
							min={-100}
							max={100}
						/>
						<RangeControl
							label={__("Vertical Offset (px)", "skt-blocks")}
							value={boxShadowV}
							onChange={(value) =>
								setAttributes({ boxShadowV: value })
							}
							min={-100}
							max={100}
						/>
						<RangeControl
							label={__("Blur (px)", "skt-blocks")}
							value={boxShadowBlur}
							onChange={(value) =>
								setAttributes({ boxShadowBlur: value })
							}
							min={0}
							max={100}
						/>
						<RangeControl
							label={__("Spread (px)", "skt-blocks")}
							value={boxShadowSpread}
							onChange={(value) =>
								setAttributes({ boxShadowSpread: value })
							}
							min={-100}
							max={100}
						/>
						<BaseControl
							label={__("Shadow Color", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={boxShadowColor}
								onChange={(value) =>
									setAttributes({
										boxShadowColor:
											value || "rgba(0, 0, 0, 0.2)",
									})
								}
							/>
						</BaseControl>
					</>
				)}
				<ToggleControl
					label={__("Box Shadow Hover", "skt-blocks")}
					checked={boxShadowHoverEnable}
					onChange={(value) =>
						setAttributes({ boxShadowHoverEnable: value })
					}
				/>
				{boxShadowHoverEnable && (
					<>
						<RangeControl
							label={__("Hover Horizontal Offset (px)", "skt-blocks")}
							value={boxShadowHoverH}
							onChange={(value) =>
								setAttributes({ boxShadowHoverH: value })
							}
							min={-100}
							max={100}
						/>
						<RangeControl
							label={__("Hover Vertical Offset (px)", "skt-blocks")}
							value={boxShadowHoverV}
							onChange={(value) =>
								setAttributes({ boxShadowHoverV: value })
							}
							min={-100}
							max={100}
						/>
						<RangeControl
							label={__("Hover Blur (px)", "skt-blocks")}
							value={boxShadowHoverBlur}
							onChange={(value) =>
								setAttributes({ boxShadowHoverBlur: value })
							}
							min={0}
							max={100}
						/>
						<RangeControl
							label={__("Hover Spread (px)", "skt-blocks")}
							value={boxShadowHoverSpread}
							onChange={(value) =>
								setAttributes({ boxShadowHoverSpread: value })
							}
							min={-100}
							max={100}
						/>
						<BaseControl
							label={__("Hover Shadow Color", "skt-blocks")}
							__nextHasNoMarginBottom
						>
							<ColorPalette
								value={boxShadowHoverColor}
								onChange={(value) =>
									setAttributes({
										boxShadowHoverColor:
											value || "rgba(0, 0, 0, 0.2)",
									})
								}
							/>
						</BaseControl>
					</>
				)}
			</PanelBody>

			<PanelBody
				title={__("Backdrop Filter", "skt-blocks")}
				initialOpen={false}
			>
				<ToggleControl
					label={__("Enable Backdrop Filter", "skt-blocks")}
					help={__(
						"Best on a transparent/semi-transparent background with content behind the section.",
						"skt-blocks"
					)}
					checked={backdropEnable}
					onChange={(value) =>
						setAttributes({ backdropEnable: value })
					}
				/>

				{backdropEnable && (
					<>
						<RangeControl
							label={__("Blur (px)", "skt-blocks")}
							value={backdropBlur}
							onChange={(value) =>
								setAttributes({ backdropBlur: value })
							}
							min={0}
							max={30}
						/>
						<RangeControl
							label={__("Brightness (%)", "skt-blocks")}
							value={backdropBrightness}
							onChange={(value) =>
								setAttributes({ backdropBrightness: value })
							}
							min={0}
							max={200}
						/>
						<RangeControl
							label={__("Contrast (%)", "skt-blocks")}
							value={backdropContrast}
							onChange={(value) =>
								setAttributes({ backdropContrast: value })
							}
							min={0}
							max={200}
						/>
						<RangeControl
							label={__("Saturation (%)", "skt-blocks")}
							value={backdropSaturate}
							onChange={(value) =>
								setAttributes({ backdropSaturate: value })
							}
							min={0}
							max={200}
						/>
						<RangeControl
							label={__("Grayscale (%)", "skt-blocks")}
							value={backdropGrayscale}
							onChange={(value) =>
								setAttributes({ backdropGrayscale: value })
							}
							min={0}
							max={100}
						/>
						<RangeControl
							label={__("Hue Rotate (deg)", "skt-blocks")}
							value={backdropHueRotate}
							onChange={(value) =>
								setAttributes({ backdropHueRotate: value })
							}
							min={0}
							max={360}
						/>
						<RangeControl
							label={__("Invert (%)", "skt-blocks")}
							value={backdropInvert}
							onChange={(value) =>
								setAttributes({ backdropInvert: value })
							}
							min={0}
							max={100}
						/>
						<RangeControl
							label={__("Sepia (%)", "skt-blocks")}
							value={backdropSepia}
							onChange={(value) =>
								setAttributes({ backdropSepia: value })
							}
							min={0}
							max={100}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody
				title={__("Typography", "skt-blocks")}
				initialOpen={false}
			>
				<BaseControl
					label={__("Text Color", "skt-blocks")}
					__nextHasNoMarginBottom
				>
					<ColorPalette
						value={textColor}
						onChange={(value) =>
							setAttributes({ textColor: value })
						}
					/>
				</BaseControl>
				<BaseControl
					label={__("Link Color", "skt-blocks")}
					__nextHasNoMarginBottom
				>
					<ColorPalette
						value={linkColor}
						onChange={(value) =>
							setAttributes({ linkColor: value })
						}
					/>
				</BaseControl>
				<BaseControl
					label={__("Link Hover Color", "skt-blocks")}
					__nextHasNoMarginBottom
				>
					<ColorPalette
						value={linkHoverColor}
						onChange={(value) =>
							setAttributes({ linkHoverColor: value })
						}
					/>
				</BaseControl>
					<BaseControl
						label={__("Text Hover Color", "skt-blocks")}
						__nextHasNoMarginBottom
					>
						<ColorPalette
							value={textHoverColor}
							onChange={(value) =>
								setAttributes({ textHoverColor: value })
							}
						/>
					</BaseControl>
			</PanelBody>

			<PanelBody title={__("Spacing", "skt-blocks")} initialOpen={false}>
				<SelectControl
					label={__("Padding Unit", "skt-blocks")}
					value={attributes.paddingUnit || "px"}
					options={SPACING_UNITS}
					onChange={(value) =>
						setAttributes({ paddingUnit: value })
					}
				/>
				<SelectControl
					label={__("Margin Unit", "skt-blocks")}
					value={attributes.marginUnit || "px"}
					options={SPACING_UNITS}
					onChange={(value) =>
						setAttributes({ marginUnit: value })
					}
				/>
				<TabPanel
					className="skt-section-device-tabs"
					tabs={[
						{
							name: "desktop",
							title: __("Desktop", "skt-blocks"),
						},
						{
							name: "tablet",
							title: __("Tablet", "skt-blocks"),
						},
						{
							name: "mobile",
							title: __("Mobile", "skt-blocks"),
						},
					]}
				>
					{(tab) => {
						const s =
							tab.name === "desktop"
								? ""
								: tab.name === "tablet"
								? "Tablet"
								: "Mobile";
						const pMax =
							(attributes.paddingUnit || "px") === "px"
								? 500
								: 100;
						const mMax =
							(attributes.marginUnit || "px") === "px"
								? 500
								: 100;
						return (
							<>
								<RangeControl
									label={__("Padding Top", "skt-blocks")}
									value={attributes["paddingTop" + s]}
									onChange={(value) =>
										setAttributes({
											["paddingTop" + s]: value,
										})
									}
									min={0}
									max={pMax}
									allowReset
								/>
								<RangeControl
									label={__("Padding Right", "skt-blocks")}
									value={attributes["paddingRight" + s]}
									onChange={(value) =>
										setAttributes({
											["paddingRight" + s]: value,
										})
									}
									min={0}
									max={pMax}
									allowReset
								/>
								<RangeControl
									label={__(
										"Padding Bottom",
										"skt-blocks"
									)}
									value={attributes["paddingBottom" + s]}
									onChange={(value) =>
										setAttributes({
											["paddingBottom" + s]: value,
										})
									}
									min={0}
									max={pMax}
									allowReset
								/>
								<RangeControl
									label={__("Padding Left", "skt-blocks")}
									value={attributes["paddingLeft" + s]}
									onChange={(value) =>
										setAttributes({
											["paddingLeft" + s]: value,
										})
									}
									min={0}
									max={pMax}
									allowReset
								/>
								<RangeControl
									label={__("Margin Top", "skt-blocks")}
									value={attributes["marginTop" + s]}
									onChange={(value) =>
										setAttributes({
											["marginTop" + s]: value,
										})
									}
									min={0}
									max={mMax}
									allowReset
								/>
								<RangeControl
									label={__("Margin Bottom", "skt-blocks")}
									value={attributes["marginBottom" + s]}
									onChange={(value) =>
										setAttributes({
											["marginBottom" + s]: value,
										})
									}
									min={0}
									max={mMax}
									allowReset
								/>
							</>
						);
					}}
				</TabPanel>
			</PanelBody>

			<PanelBody
				title={__("Dimensions", "skt-blocks")}
				initialOpen={false}
			>
					<SelectControl
						label={__("Width", "skt-blocks")}
						value={widthType || "auto"}
						options={[
							{ label: __("Auto (content)", "skt-blocks"), value: "auto" },
							{ label: __("Fill / Equal (grow)", "skt-blocks"), value: "fill" },
							{ label: __("Custom", "skt-blocks"), value: "custom" },
						]}
						help={__(
							"Use inside a horizontal Flex Block. Fill makes equal columns; Custom sets a fixed width. Mix Custom + Fill to split the rest.",
							"skt-blocks"
						)}
						onChange={(value) =>
							setAttributes({ widthType: value })
						}
					/>
					{widthType === "custom" && (
						<>
							<RangeControl
								label={__("Width Value", "skt-blocks")}
								value={widthValue}
								onChange={(value) =>
									setAttributes({ widthValue: value })
								}
								min={0}
								max={widthUnit === "px" ? 2000 : 100}
								allowReset
							/>
							<SelectControl
								label={__("Width Unit", "skt-blocks")}
								value={widthUnit || "%"}
								options={[
									{ label: __("%", "skt-blocks"), value: "%" },
									{ label: __("px", "skt-blocks"), value: "px" },
								]}
								onChange={(value) =>
									setAttributes({ widthUnit: value })
								}
							/>
						</>
					)}
				<RangeControl
					label={__("Min Height", "skt-blocks")}
					value={minHeight}
					onChange={(value) => setAttributes({ minHeight: value })}
					min={0}
					max={1000}
					allowReset
				/>
				<SelectControl
					label={__("Min Height Unit", "skt-blocks")}
					value={minHeightUnit}
					options={UNIT_OPTIONS}
					onChange={(value) =>
						setAttributes({ minHeightUnit: value })
					}
				/>
			</PanelBody>

			<PanelBody
				title={__("Overlay Link", "skt-blocks")}
				initialOpen={false}
			>
				<ToggleControl
					label={__("Make Whole Section a Link", "skt-blocks")}
					checked={overlayLinkEnable}
					onChange={(value) =>
						setAttributes({ overlayLinkEnable: value })
					}
				/>
				{overlayLinkEnable && (
					<>
						<TextControl
							label={__("Link URL", "skt-blocks")}
							value={overlayLinkUrl || ""}
							placeholder="https://"
							onChange={(value) =>
								setAttributes({ overlayLinkUrl: value })
							}
						/>
						<ToggleControl
							label={__("Open in New Tab", "skt-blocks")}
							checked={overlayLinkNewTab}
							onChange={(value) =>
								setAttributes({ overlayLinkNewTab: value })
							}
						/>
						<TextControl
							label={__("Link Label (accessibility)", "skt-blocks")}
							help={__(
								"Describes where the link goes, for screen readers.",
								"skt-blocks"
							)}
							value={overlayLinkLabel || ""}
							onChange={(value) =>
								setAttributes({ overlayLinkLabel: value })
							}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody
				title={__("Sticky", "skt-blocks")}
				initialOpen={false}
			>
				<ToggleControl
					label={__("Enable Sticky", "skt-blocks")}
					help={__(
						"Makes the section stick while scrolling. Works on the front end (disabled inside the editor).",
						"skt-blocks"
					)}
					checked={stickyEnable}
					onChange={(value) =>
						setAttributes({ stickyEnable: value })
					}
				/>

				{stickyEnable && (
					<>
						<RangeControl
							label={__("Offset from Top (px)", "skt-blocks")}
							value={stickyOffset}
							onChange={(value) =>
								setAttributes({ stickyOffset: value })
							}
							min={0}
							max={300}
						/>
						<SelectControl
							label={__("Sticky On", "skt-blocks")}
							value={stickyBreakpoint}
							options={[
								{
									label: __("All Devices", "skt-blocks"),
									value: "always",
								},
								{
									label: __("Desktop", "skt-blocks"),
									value: "desktop",
								},
								{
									label: __("Tablet", "skt-blocks"),
									value: "tablet",
								},
								{
									label: __("Mobile", "skt-blocks"),
									value: "mobile",
								},
							]}
							onChange={(value) =>
								setAttributes({ stickyBreakpoint: value })
							}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody
				title={__("Visibility", "skt-blocks")}
				initialOpen={false}
			>
				<ToggleControl
					label={__("Hide on Desktop", "skt-blocks")}
					checked={hideDesktop}
					onChange={(value) =>
						setAttributes({ hideDesktop: value })
					}
				/>
				<ToggleControl
					label={__("Hide on Tablet", "skt-blocks")}
					checked={hideTablet}
					onChange={(value) =>
						setAttributes({ hideTablet: value })
					}
				/>
				<ToggleControl
					label={__("Hide on Mobile", "skt-blocks")}
					checked={hideMobile}
					onChange={(value) =>
						setAttributes({ hideMobile: value })
					}
				/>
					<ToggleControl
						label={__("Hide from Logged-in Users", "skt-blocks")}
						checked={hideLoggedIn}
						onChange={(value) =>
							setAttributes({ hideLoggedIn: value })
						}
					/>
					<ToggleControl
						label={__("Hide from Logged-out Users", "skt-blocks")}
						checked={hideLoggedOut}
						onChange={(value) =>
							setAttributes({ hideLoggedOut: value })
						}
					/>
			</PanelBody>
		</InspectorControls>
	);
}
