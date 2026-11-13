/**
 * Text Marquee Block — continuously scrolling text (ticker / news bar).
 *
 * Isolated new block: imported only from src/new-blocks.js, so it compiles into
 * dist/skt-new-blocks.js and can NEVER affect the legacy skt-blocks.js bundle.
 * The scroll is pure CSS (no front-end JS), so nothing extra to enqueue.
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
				d="M2 7h20v2H2V7zm3 4h16v2H5v-2zm-3 4h20v2H2v-2zm15.3-9.7 2.2 2.2-2.2 2.2-1.1-1.1.3-.3H14V6.6h2.5l-.3-.3 1.1-1z"
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
