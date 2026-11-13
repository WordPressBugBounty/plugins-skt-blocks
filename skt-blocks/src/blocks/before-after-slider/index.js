/**
 * Before/After Comparison Slider Block.
 *
 * Isolated new block: imported only from src/new-blocks.js, so it compiles into
 * dist/skt-new-blocks.js and never touches the legacy skt-blocks.js bundle.
 * Front-end dragging is handled by assets/js/skt-compare.js (not in the bundle).
 */
import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import edit from "./edit";
import save from "./save";

import "./styles/style.scss";
import "./styles/styles.editor.scss";

const icon = {
	src: (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M3 5h8v14H3V5zm10 0h8v14h-8V5zm-1-3h1v20h-1V2zM5 7v10h4V7H5z"
			/>
		</svg>
	),
};

registerBlockType(metadata.name, {
	...metadata,
	icon,
	edit,
	save,
});
