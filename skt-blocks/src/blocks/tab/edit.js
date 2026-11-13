import { useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import Inspector from "./inspector";
import { getTabClassNames, getTabCSS } from "./utils";
import { useEditorDevice } from "../../utils/skt-device";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { device } = useEditorDevice();

	// Stable unique id used to scope this tab's CSS. If two tabs ended up with
	// the same id (copied / duplicated), give this one a fresh id so their
	// styles can't overwrite each other.
	const duplicate = useSelect(
		(select) => {
			if (!attributes.uniqueId) return false;
			const be = select("core/block-editor");
			return be
				.getBlocksByName("skt-blocks/skt-tab")
				.some(
					(id) =>
						id !== clientId &&
						be.getBlockAttributes(id)?.uniqueId === attributes.uniqueId
				);
		},
		[clientId, attributes.uniqueId]
	);
	useEffect(() => {
		if (!attributes.uniqueId || duplicate) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duplicate]);

	// In the editor the CSS is always scoped by this block's own clientId, so
	// it can never collide with another tab.
	const editorAttrs = { ...attributes, uniqueId: clientId.slice(0, 8) };
	const blockProps = useBlockProps({
		className: getTabClassNames(editorAttrs),
	});
	const { children, ...rest } = useInnerBlocksProps(blockProps, {
		templateLock: false,
		template: [["core/paragraph", { placeholder: "Tab content…" }]],
	});
	const css = getTabCSS(editorAttrs, device);

	return (
		<>
			<Inspector {...props} />
			<div {...rest}>
				{children}
				{css && <style>{css}</style>}
			</div>
		</>
	);
}
