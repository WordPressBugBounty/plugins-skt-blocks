import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from "@wordpress/block-editor";
import renderSVG from "../../renderIcon";
import {
	getTabsClassNames,
	getTabsCSS,
	getTabsFontURL,
	clampInitial,
	getDeviceStyles,
	isVertical,
} from "./utils";

export default function save({ attributes }) {
	const tabs = attributes.tabs || [];
	const initial = clampInitial(attributes);

	const blockProps = useBlockProps.save({
		className: getTabsClassNames(attributes),
		"data-initial": initial,
	});
	const panelsProps = useInnerBlocksProps.save({
		className: "skt-tabs__panels",
	});
	const dynamicCSS = getTabsCSS(attributes);
	const fontURL = getTabsFontURL(attributes);

	return (
		<div {...blockProps}>
			<div
				className="skt-tabs__nav"
				role="tablist"
				aria-orientation={
					isVertical(getDeviceStyles(attributes).desktop)
						? "vertical"
						: "horizontal"
				}
			>
				{tabs.map((tab, i) => (
					<button
						key={i}
						type="button"
						role="tab"
						data-index={i}
						className={`skt-tabs__tab${i + 1 === initial ? " is-active" : ""}`}
					>
						{tab.icon ? (
							<span className="skt-tabs__icon" aria-hidden="true">
								{renderSVG(tab.icon)}
							</span>
						) : null}
						<RichText.Content
							tagName="span"
							className="skt-tabs__title"
							value={tab.title}
						/>
					</button>
				))}
			</div>
			<div {...panelsProps} />
			{fontURL && <link rel="stylesheet" href={fontURL} />}
			{dynamicCSS && <style>{dynamicCSS}</style>}
		</div>
	);
}
