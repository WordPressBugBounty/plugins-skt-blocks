/**
 * SKT Section — an isolated flexible container block.
 *
 * This block is intentionally kept OUT of src/blocks.js. It is bundled through
 * its own webpack entry (src/skt-section.js -> dist/skt-section.js) and
 * enqueued separately, so it can never break the main skt-blocks.js bundle.
 */
import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block.json";
import edit from "./edit";
import save from "./save";

// Styles (frontend + editor). Kept self-contained to this block.
import "./styles/style.scss";
import "./styles/styles.editor.scss";

const icon = {
	src: (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v5h16V5H4zm0 7v7h16v-7H4z"
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
