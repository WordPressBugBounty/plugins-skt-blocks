/**
 * Tab (child of SKT Tabs). Holds the content of one tab and has its own
 * background / spacing / border / text-colour controls.
 * Imported from src/new-blocks.js; compiled into dist/skt-new-blocks.js.
 */
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import edit from "./edit";
import save from "./save";

const icon = {
	src: (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path fill="currentColor" d="M3 5h8v3h10v11H3V5zm2 5v7h14v-7H5z" />
		</svg>
	),
};

registerBlockType(metadata.name, {
	...metadata,
	icon,
	edit,
	save,
});
