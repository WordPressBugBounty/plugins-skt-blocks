/**
 * Grid Column — a single column inside the Grid Block.
 * Isolated new block (bundled via src/new-blocks.js -> dist/skt-new-blocks.js).
 */
import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import edit from "./edit";
import save from "./save";

import "./styles/style.scss";

const icon = {
	src: (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path fill="currentColor" d="M5 3h6v18H5V3zm8 0h6v18h-6V3z" />
		</svg>
	),
};

registerBlockType(metadata.name, {
	...metadata,
	icon,
	edit,
	save,
});
