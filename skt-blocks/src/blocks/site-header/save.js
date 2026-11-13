import {
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	getSiteHeaderClassNames,
	getSiteHeaderCSS,
	getSiteHeaderDataAttrs,
} from "./utils";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: getSiteHeaderClassNames(attributes),
		...getSiteHeaderDataAttrs(attributes),
	});

	const innerBlocksProps = useInnerBlocksProps.save({
		className: "skt-site-header__inner",
	});
	const { children, ...innerRest } = innerBlocksProps;

	const dynamicCSS = getSiteHeaderCSS(attributes);
	const TagName = attributes.tagName || "header";

	return (
		<TagName {...blockProps}>
			<div {...innerRest}>{children}</div>
			{dynamicCSS && <style>{dynamicCSS}</style>}
		</TagName>
	);
}
