import {
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	getSectionStyles,
	getSectionClassNames,
	getSectionCSS,
} from "./utils";

export default function save({ attributes }) {
	const TagName = attributes.tagName || "div";

	const blockProps = useBlockProps.save({
		className: getSectionClassNames(attributes),
		style: getSectionStyles(attributes),
	});

	const { children, ...innerRest } = useInnerBlocksProps.save(blockProps);

	const dynamicCSS = getSectionCSS(attributes);

	return (
		<TagName {...innerRest}>
			{dynamicCSS && <style>{dynamicCSS}</style>}
			{attributes.overlayLinkEnable && attributes.overlayLinkUrl && (
				<a
					className="skt-section-overlay-link"
					href={attributes.overlayLinkUrl}
					target={attributes.overlayLinkNewTab ? "_blank" : undefined}
					rel={
						attributes.overlayLinkNewTab
							? "noopener noreferrer"
							: undefined
					}
					aria-label={attributes.overlayLinkLabel || undefined}
				/>
			)}
			{children}
		</TagName>
	);
}
