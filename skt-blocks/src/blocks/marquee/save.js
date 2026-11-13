import { useBlockProps, RichText } from "@wordpress/block-editor";
import { getMarqueeClassNames, getMarqueeCSS } from "./utils";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: getMarqueeClassNames(attributes),
	});
	const dynamicCSS = getMarqueeCSS(attributes);

	return (
		<div {...blockProps}>
			<div className="skt-marquee__track">
				<RichText.Content
					tagName="span"
					className="skt-marquee__content"
					value={attributes.text}
				/>
				<span
					className="skt-marquee__content"
					aria-hidden="true"
					dangerouslySetInnerHTML={{ __html: attributes.text || "" }}
				/>
			</div>
			{dynamicCSS && <style>{dynamicCSS}</style>}
		</div>
	);
}
