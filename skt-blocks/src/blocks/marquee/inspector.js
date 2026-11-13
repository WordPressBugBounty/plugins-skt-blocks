import { InspectorControls, ColorPalette } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TabPanel,
	BaseControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";

const DEVICE_TABS = [
	{ name: "desktop", title: __("Desktop", "skt-blocks") },
	{ name: "tablet", title: __("Tablet", "skt-blocks") },
	{ name: "mobile", title: __("Mobile", "skt-blocks") },
];

const suffixFor = (name) =>
	name === "tablet" ? "Tablet" : name === "mobile" ? "Mobile" : "";

export default function Inspector({ attributes, setAttributes }) {
	const vertical =
		attributes.direction === "up" || attributes.direction === "down";

	const respFont = (tab) => {
		const key = "fontSize" + suffixFor(tab.name);
		return (
			<RangeControl
				label={__("Font Size (px)", "skt-blocks")}
				value={attributes[key]}
				onChange={(v) => setAttributes({ [key]: v })}
				min={8}
				max={120}
				allowReset
			/>
		);
	};

	return (
		<InspectorControls>
			{/* ---------------- MARQUEE ---------------- */}
			<PanelBody title={__("Marquee", "skt-blocks")} initialOpen={true}>
				<SelectControl
					label={__("Direction", "skt-blocks")}
					value={attributes.direction || "left"}
					options={[
						{ label: __("Left", "skt-blocks"), value: "left" },
						{ label: __("Right", "skt-blocks"), value: "right" },
						{ label: __("Up", "skt-blocks"), value: "up" },
						{ label: __("Down", "skt-blocks"), value: "down" },
					]}
					onChange={(value) => setAttributes({ direction: value })}
				/>

				<RangeControl
					label={__("Speed (seconds per loop)", "skt-blocks")}
					help={__(
						"Higher = slower. It's how many seconds one full loop takes.",
						"skt-blocks"
					)}
					value={attributes.speed}
					onChange={(v) => setAttributes({ speed: v })}
					min={2}
					max={120}
					step={1}
					allowReset
				/>

				<RangeControl
					label={__("Gap Between Copies (px)", "skt-blocks")}
					value={attributes.gap}
					onChange={(v) => setAttributes({ gap: v })}
					min={0}
					max={300}
					step={1}
					allowReset
				/>

				{vertical && (
					<RangeControl
						label={__("Height (px)", "skt-blocks")}
						help={__(
							"The visible height for up/down scrolling.",
							"skt-blocks"
						)}
						value={attributes.verticalHeight}
						onChange={(v) => setAttributes({ verticalHeight: v })}
						min={40}
						max={600}
						step={1}
						allowReset
					/>
				)}

				<ToggleControl
					label={__("Pause on Hover", "skt-blocks")}
					checked={!!attributes.pauseOnHover}
					onChange={(value) => setAttributes({ pauseOnHover: value })}
				/>
			</PanelBody>

			{/* ---------------- TYPOGRAPHY ---------------- */}
			<PanelBody title={__("Typography", "skt-blocks")} initialOpen={false}>
				<p className="skt-sh-ctrl-label">{__("Font Size", "skt-blocks")}</p>
				<TabPanel className="skt-sh-device-tabs" tabs={DEVICE_TABS}>
					{(tab) => respFont(tab)}
				</TabPanel>

				<SelectControl
					label={__("Font Weight", "skt-blocks")}
					value={attributes.fontWeight || "400"}
					options={[
						{ label: "100", value: "100" },
						{ label: "200", value: "200" },
						{ label: "300", value: "300" },
						{ label: "400 (Normal)", value: "400" },
						{ label: "500", value: "500" },
						{ label: "600", value: "600" },
						{ label: "700 (Bold)", value: "700" },
						{ label: "800", value: "800" },
						{ label: "900", value: "900" },
					]}
					onChange={(value) => setAttributes({ fontWeight: value })}
				/>

				<SelectControl
					label={__("Text Transform", "skt-blocks")}
					value={attributes.textTransform || "none"}
					options={[
						{ label: __("None", "skt-blocks"), value: "none" },
						{ label: "UPPERCASE", value: "uppercase" },
						{ label: "lowercase", value: "lowercase" },
						{ label: "Capitalize", value: "capitalize" },
					]}
					onChange={(value) => setAttributes({ textTransform: value })}
				/>
			</PanelBody>

			{/* ---------------- COLORS ---------------- */}
			<PanelBody title={__("Colors", "skt-blocks")} initialOpen={false}>
				<BaseControl label={__("Text Color", "skt-blocks")} __nextHasNoMarginBottom>
					<ColorPalette
						value={attributes.textColor}
						onChange={(value) => setAttributes({ textColor: value })}
					/>
				</BaseControl>
				<BaseControl
					label={__("Background Color", "skt-blocks")}
					__nextHasNoMarginBottom
				>
					<ColorPalette
						value={attributes.backgroundColor}
						onChange={(value) => setAttributes({ backgroundColor: value })}
					/>
				</BaseControl>
				<RangeControl
					label={__("Vertical Padding (px)", "skt-blocks")}
					value={attributes.paddingY}
					onChange={(v) => setAttributes({ paddingY: v })}
					min={0}
					max={100}
					step={1}
					allowReset
				/>
			</PanelBody>
		</InspectorControls>
	);
}
