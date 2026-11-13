import { useBlockProps } from "@wordpress/block-editor";
import MarqueeTrack from "./markup";
import { getMarqueeClassNames, getMarqueeCSS, getMarqueeFontURL } from "./utils";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: getMarqueeClassNames(attributes),
	});
	const css = getMarqueeCSS(attributes);
	const fontURL = getMarqueeFontURL(attributes);
	return (
		<div {...blockProps}>
			{fontURL && <link rel="stylesheet" href={fontURL} />}
			<MarqueeTrack attributes={attributes} />
			{css && <style>{css}</style>}
		</div>
	);
}
