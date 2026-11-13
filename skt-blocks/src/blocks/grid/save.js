import {
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { getGridClassNames, getGridCSS } from "./utils";
import { getGoogleFontURL, isWebFont } from "../../utils/font";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: getGridClassNames(attributes),
	});

	const { children, ...innerRest } = useInnerBlocksProps.save(blockProps);

	const dynamicCSS = getGridCSS(attributes);

	const { fontFamily } = attributes;
	const loadFont =
		fontFamily && fontFamily !== "Default" && isWebFont(fontFamily);
	const TagName = attributes.tagName || "div";

	return (
		<TagName {...innerRest}>
			{children}
			{dynamicCSS && <style>{dynamicCSS}</style>}
			{loadFont && (
				<link
					rel="stylesheet"
					href={getGoogleFontURL(fontFamily)}
				/>
			)}
		</TagName>
	);
}
