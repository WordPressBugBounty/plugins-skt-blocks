/**
 * Text Marquee Block — continuously scrolling text ticker.
 *
 * Isolated new block: imported only from src/new-blocks.js, so it compiles into
 * dist/skt-new-blocks.js and never touches the legacy skt-blocks.js bundle.
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
				d="M2 6h20v12H2V6zm2 2v8h16V8H4zm2 3h5v2H6v-2zm7 0h5v2h-5v-2z"
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
