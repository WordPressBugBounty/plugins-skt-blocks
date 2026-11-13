import { Fragment, useEffect } from "@wordpress/element";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import Inspector from "./inspector";
import { getMarqueeClassNames, getMarqueeEditorCSS } from "./utils";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	// Stable unique id used to scope this marquee's CSS.
	useEffect(() => {
		if (!attributes.uniqueId) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const blockProps = useBlockProps({
		className: getMarqueeClassNames(attributes),
	});

	const dynamicCSS = getMarqueeEditorCSS(attributes);

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				<div className="skt-marquee__track">
					<RichText
						tagName="span"
						className="skt-marquee__content"
						value={attributes.text}
						onChange={(value) => setAttributes({ text: value })}
						placeholder={"Type your scrolling text…"}
						allowedFormats={["core/bold", "core/italic", "core/link"]}
					/>
					{/* Second copy makes the loop seamless; mirrors the text, not editable. */}
					<span
						className="skt-marquee__content"
						aria-hidden="true"
						dangerouslySetInnerHTML={{ __html: attributes.text || "" }}
					/>
				</div>
				{dynamicCSS && <style>{dynamicCSS}</style>}
			</div>
		</Fragment>
	);
}
