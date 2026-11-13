/**
 * Site Header Block — a flexible header container (logo + nav + buttons inside).
 *
 * Isolated new block: imported only from src/new-blocks.js, so it compiles into
 * dist/skt-new-blocks.js and can NEVER affect the legacy skt-blocks.js bundle.
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
				d="M3 4h18a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2 2.5A1.5 1.5 0 1 0 6.5 8 1.5 1.5 0 0 0 5 6.5zM13 6h6v1.2h-6V6zm0 2.3h6v1.2h-6V8.3z"
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
