import { Fragment, useEffect } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspector";
import MarqueeTrack from "./markup";
import { getMarqueeClassNames, buildMarqueeCSS, getMarqueeFontURL } from "./utils";
import { useEditorDevice } from "../../utils/skt-device";

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { device } = useEditorDevice();

	useEffect(() => {
		if (!attributes.uniqueId) {
			setAttributes({ uniqueId: clientId.slice(0, 8) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const blockProps = useBlockProps({
		className: getMarqueeClassNames(attributes),
	});
	const css = buildMarqueeCSS(attributes, device);
	const fontURL = getMarqueeFontURL(attributes);

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				{fontURL && <link rel="stylesheet" href={fontURL} />}
				<MarqueeTrack attributes={attributes} />
				{css && <style>{css}</style>}
			</div>
		</Fragment>
	);
}
