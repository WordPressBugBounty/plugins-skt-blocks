import { Fragment, useEffect } from "@wordpress/element";
import {
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import Inspector from "./inspector";
import {
	getSectionStyles,
	getSectionClassNames,
	getSectionCSS,
} from "./utils";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const TagName = attributes.tagName || "div";

	// Assign a stable unique id (used to scope responsive spacing CSS).
	useEffect(() => {
		if (!attributes.uniqueId) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// In the editor the inner blocks get an extra layout wrapper that can stop
	// the wrapper's text-align from reaching the content. We make sure the
	// scoping class is present here (editor only, never in save) so the small
	// rule below can force the preview to match the front end.
	const baseClass = getSectionClassNames(attributes);
	const needsScopeClass =
		attributes.uniqueId &&
		attributes.textAlign &&
		!baseClass.split(" ").includes(`skt-section-${attributes.uniqueId}`);
	const editorClassName = needsScopeClass
		? `${baseClass} skt-section-${attributes.uniqueId}`
		: baseClass;

	const blockProps = useBlockProps({
		className: editorClassName,
		style: getSectionStyles(attributes),
	});

	const { children, ...innerRest } = useInnerBlocksProps(blockProps, {
		templateLock: false,
	});

	const dynamicCSS = getSectionCSS(attributes);

	// Editor-only: force the inner content to follow Text Alignment so the
	// preview matches the front end. Not part of save output.
	const editorTextAlignCSS =
		attributes.textAlign && attributes.uniqueId
			? `.wp-block-skt-blocks-skt-section.skt-section-${attributes.uniqueId} > * { text-align: ${attributes.textAlign}; }`
			: "";

	return (
		<Fragment>
			<Inspector {...props} />
			<TagName {...innerRest}>
				{dynamicCSS && <style>{dynamicCSS}</style>}
				{editorTextAlignCSS && <style>{editorTextAlignCSS}</style>}
				{children}
			</TagName>
		</Fragment>
	);
}
