import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from "@wordpress/block-editor";

export default function Edit() {
	const blockProps = useBlockProps({ className: "skt-grid-column" });

	const innerProps = useInnerBlocksProps(blockProps, {
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return <div {...innerProps} />;
}
