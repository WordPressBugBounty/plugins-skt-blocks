import { Fragment, useEffect } from "@wordpress/element";
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from "@wordpress/block-editor";
import Inspector from "./inspector";
import { getSiteHeaderClassNames, getSiteHeaderEditorCSS } from "./utils";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	// Stable unique id used to scope this header's CSS.
	useEffect(() => {
		if (!attributes.uniqueId) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const TagName = attributes.tagName || "header";

	const blockProps = useBlockProps({
		className: getSiteHeaderClassNames(attributes),
	});

	// The inner flex wrapper holds the header's child blocks (logo, nav, buttons…).
	const innerBlocksProps = useInnerBlocksProps(
		{ className: "skt-site-header__inner" },
		{
			templateLock: false,
			orientation: "horizontal",
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	const dynamicCSS = getSiteHeaderEditorCSS(attributes);

	return (
		<Fragment>
			<Inspector {...props} />
			<TagName {...blockProps}>
				<div {...innerBlocksProps} />
				{dynamicCSS && <style>{dynamicCSS}</style>}
			</TagName>
		</Fragment>
	);
}
