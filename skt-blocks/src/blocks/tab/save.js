import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { getTabClassNames, getTabCSS } from "./utils";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: getTabClassNames(attributes),
		role: "tabpanel",
	});
	const { children, ...rest } = useInnerBlocksProps.save(blockProps);
	const css = getTabCSS(attributes);
	return (
		<div {...rest}>
			{children}
			{css && <style>{css}</style>}
		</div>
	);
}
