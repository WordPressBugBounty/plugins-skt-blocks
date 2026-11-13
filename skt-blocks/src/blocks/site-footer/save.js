import {
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	getSiteFooterClassNames,
	getSiteFooterCSS,
} from "./utils";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: getSiteFooterClassNames(attributes),
	});

	const innerBlocksProps = useInnerBlocksProps.save({
		className: "skt-site-footer__inner",
	});
	const { children, ...innerRest } = innerBlocksProps;

	const dynamicCSS = getSiteFooterCSS(attributes);
	const TagName = attributes.tagName || "footer";

	return (
		<TagName {...blockProps}>
			<div {...innerRest}>{children}</div>
			{dynamicCSS && <style>{dynamicCSS}</style>}
		</TagName>
	);
}
