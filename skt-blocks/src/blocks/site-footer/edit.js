import { Fragment, useEffect } from "@wordpress/element";
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from "@wordpress/block-editor";
import Inspector from "./inspector";
import { getSiteFooterClassNames, getSiteFooterEditorCSS } from "./utils";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	// Stable unique id used to scope this footer's CSS.
	useEffect(() => {
		if (!attributes.uniqueId) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const TagName = attributes.tagName || "footer";

	const blockProps = useBlockProps({
		className: getSiteFooterClassNames(attributes),
	});

	// The inner flex wrapper holds the footer's child blocks (logo, nav, buttons…).
	const innerBlocksProps = useInnerBlocksProps(
		{ className: "skt-site-footer__inner" },
		{
			templateLock: false,
			orientation: "horizontal",
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	const dynamicCSS = getSiteFooterEditorCSS(attributes);

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
