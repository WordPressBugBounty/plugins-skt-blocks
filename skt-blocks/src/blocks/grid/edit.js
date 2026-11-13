import { Fragment, useEffect } from "@wordpress/element";
import {
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useSelect, useDispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import Inspector from "./inspector";
import { getGridClassNames, getGridEditorCSS } from "./utils";
import { loadGoogleFont } from "../../utils/font";

const ALLOWED = ["skt-blocks/grid-column"];

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	// Stable unique id used to scope the layout CSS.
	useEffect(() => {
		if (!attributes.uniqueId) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Live list of the grid's column child blocks.
	const innerColumns = useSelect(
		(select) => select("core/block-editor").getBlocks(clientId),
		[clientId]
	);
	const { replaceInnerBlocks } = useDispatch("core/block-editor");

	// Keep the NUMBER of Grid Column child blocks in sync with the active
	// layout: a preset's column count (columnWidths) wins, otherwise the
	// numeric "Columns" control.
	const widthsLen = Array.isArray(attributes.columnWidths)
		? attributes.columnWidths.length
		: 0;
	useEffect(() => {
		const target = Math.max(
			1,
			widthsLen || parseInt(attributes.columns, 10) || 1
		);
		const current = innerColumns.length;
		if (current === target) {
			return;
		}
		let next = innerColumns.slice(0, target);
		for (let i = current; i < target; i++) {
			next.push(createBlock("skt-blocks/grid-column"));
		}
		replaceInnerBlocks(clientId, next, false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [attributes.columns, widthsLen]);

	// First-insert template so an empty grid starts with N columns.
	const template = Array.from(
		{ length: Math.max(1, attributes.columns || 2) },
		() => ["skt-blocks/grid-column"]
	);

	const blockProps = useBlockProps({
		className: getGridClassNames(attributes),
	});

	const { children, ...innerRest } = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED,
		template,
		templateLock: false,
		orientation: "horizontal",
		renderAppender: false,
	});

	// Current editor preview device, so the canvas renders that device's layout
	// (flat, no media queries) and matches the picked device even when the
	// editor iframe is narrower than the responsive breakpoints.
	const deviceType = useSelect((select) => {
		const editor = select("core/editor");
		if (editor && typeof editor.getDeviceType === "function") {
			return editor.getDeviceType();
		}
		const editPost = select("core/edit-post");
		if (
			editPost &&
			typeof editPost.__experimentalGetPreviewDeviceType === "function"
		) {
			return editPost.__experimentalGetPreviewDeviceType();
		}
		if (
			editor &&
			typeof editor.__experimentalGetPreviewDeviceType === "function"
		) {
			return editor.__experimentalGetPreviewDeviceType();
		}
		return "Desktop";
	}, []);
	const device =
		deviceType === "Tablet"
			? "tablet"
			: deviceType === "Mobile"
			? "mobile"
			: "desktop";

	const dynamicCSS = getGridEditorCSS(attributes, device);
	const TagName = attributes.tagName || "div";

	return (
		<Fragment>
			<Inspector {...props} />
			<TagName {...innerRest}>
				{children}
				{dynamicCSS && <style>{dynamicCSS}</style>}
				{attributes.fontFamily &&
					attributes.fontFamily !== "Default" &&
					loadGoogleFont(attributes.fontFamily)}
			</TagName>
		</Fragment>
	);
}
