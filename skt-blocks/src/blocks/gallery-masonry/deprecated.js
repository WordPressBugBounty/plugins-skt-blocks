/**
 * Deprecated (v2.6) registration for gallery-masonry.
 * Reproduces pre-change save markup so existing blocks migrate silently.
 */
import SaveV26 from "./components/save-v26";

// Attributes omitted: Gutenberg falls back to the block's current
// attributes to parse old content; only the save markup is restored.
const deprecated = [
  {
    save: (props) => <SaveV26 {...props} />,
  },
];

export default deprecated;
