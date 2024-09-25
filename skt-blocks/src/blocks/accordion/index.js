/**
 * BLOCK: Accordion - Schema
 */

import ResponsiveBlocksIcon from "../../ResponsiveBlocksIcon.json";
import edit from "./components/edit";
import save from "./components/save";
import icon from "./components/icon";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const { Fragment } = wp.element;
const { withSelect } = wp.data;
const { compose, createHigherOrderComponent } = wp.compose;

const { registerBlockType } = wp.blocks;

/**
 * Override the default block element to add	wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function} Wrapped component
 */

const enhance = compose(
  withSelect((select) => {
    return {
      selected: select("core/block-editor").getSelectedBlock(),
    };
  })
);
/**
 * Add custom UAG attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withAccordion = createHigherOrderComponent((BlockEdit) => {
  return enhance(({ ...props }) => {
    return (
      <Fragment>
        <BlockEdit {...props} />
      </Fragment>
    );
  });
}, "withAccordion");

const attributes = {
  block_id: {
    type: "string",
  },
  layout: {
    type: "string",
    default: "accordion",
  },
  inactiveOtherItems: {
    type: "boolean",
    default: true,
  },
  expandFirstItem: {
    type: "boolean",
    default: false,
  },
  enableSchemaSupport: {
    type: "boolean",
    default: false,
  },
  align: {
    type: "string",
    default: "left",
  },
  rowsGap: {
    type: "number",
    default: 10,
  },
  columnsGap: {
    type: "number",
    default: 10,
  },
  boxPaddingTypeMobile: {
    type: "string",
    default: "px",
  },
  boxPaddingTypeTablet: {
    type: "string",
    default: "px",
  },
  boxPaddingTypeDesktop: {
    type: "string",
    default: "px",
  },
  vBoxPaddingMobile: {
    type: "number",
    default: 10,
  },
  hBoxPaddingMobile: {
    type: "number",
    default: 10,
  },
  vBoxPaddingTablet: {
    type: "number",
    default: 10,
  },
  hBoxPaddingTablet: {
    type: "number",
    default: 10,
  },
  vBoxPaddingDesktop: {
    type: "number",
    default: 10,
  },
  hBoxPaddingDesktop: {
    type: "number",
    default: 10,
  },
  titleTextColor: {
    type: "string",
    default: "#313131",
  },
  titleTextActiveColor: {
    type: "string",
    default: "#656565",
  },
  titlePaddingTypeDesktop: {
    type: "string",
    default: "px",
  },
  vtitlePaddingMobile: {
    type: "number",
    default: 10,
  },
  vtitlePaddingTablet: {
    type: "number",
    default: 10,
  },
  vtitlePaddingDesktop: {
    type: "number",
    default: 10,
  },
  htitlePaddingMobile: {
    type: "number",
    default: 10,
  },
  htitlePaddingTablet: {
    type: "number",
    default: 10,
  },
  htitlePaddingDesktop: {
    type: "number",
    default: 10,
  },
  contentTextColor: {
    type: "string",
    default: "#313131",
  },
  contentPaddingTypeDesktop: {
    type: "string",
    default: "px",
  },
  vcontentPaddingMobile: {
    type: "number",
    default: 10,
  },
  vcontentPaddingTablet: {
    type: "number",
    default: 10,
  },
  vcontentPaddingDesktop: {
    type: "number",
    default: 10,
  },
  hcontentPaddingMobile: {
    type: "number",
    default: 10,
  },
  hcontentPaddingTablet: {
    type: "number",
    default: 10,
  },
  hcontentPaddingDesktop: {
    type: "number",
    default: 10,
  },
  titleActiveTextColor: {
    type: "string",
  },
  titleActiveBackgroundColor: {
    type: "string",
  },
  iconColor: {
    type: "string",
  },
  iconActiveColor: {
    type: "string",
  },
  iconHoverColor: {
    type: "string",
  },
  titleFontWeight: {
    type: "string",
  },
  titleFontSize: {
    type: "number",
  },
  titleLineHeight: {
    type: "number",
  },
  titleFontFamily: {
    type: "string",
  },
  contentFontFamily: {
    type: "string",
  },
  contentFontWeight: {
    type: "string",
  },
  contentFontSize: {
    type: "number",
  },
  contentLineHeight: {
    type: "number",
  },
  icon: {
    type: "string",
    default: "fas fa-plus",
  },
  iconActive: {
    type: "string",
    default: "fas fa-minus",
  },
  iconAlign: {
    type: "string",
    default: "row",
  },
  iconSize: {
    type: "number",
    default: 12,
  },
  iconSizeTablet: {
    type: "number",
    default: 12,
  },
  iconSizeMobile: {
    type: "number",
    default: 12,
  },
  iconSizeType: {
    type: "string",
    default: "px",
  },
  columns: {
    type: "number",
    default: 2,
  },
  schema: {
    type: "string",
    default: "",
  },
  enableToggle: {
    type: "boolean",
    default: true,
  },
  equalHeight: {
    type: "boolean",
    default: true,
  },
  titleLeftPaddingTablet: {
    type: "number",
    default: 10,
  },
  titleBottomPaddingTablet: {
    type: "number",
    default: 10,
  },
  titleLeftPaddingDesktop: {
    type: "number",
    default: 10,
  },
  titleBottomPaddingDesktop: {
    type: "number",
    default: 10,
  },
  titleLeftPaddingMobile: {
    type: "number",
    default: 10,
  },
  titleBottomPaddingMobile: {
    type: "number",
    default: 10,
  },
  headingTag: {
    type: "html",
    selector: "span,p,h1,h2,h3,h4,h5,h6",
    default: "span",
  },
  titleTextColor: {
    type: "string",
  },
  titleBackgroundColorOpacity: {
    type: "number",
    default: 100,
  },
  marginV: {
    type: "number",
  },
  marginH: {
    type: "number",
  },
  titleSecondaryBackgroundColor: {
    type: "string",
  },
  titleGradientDegree: {
    type: "number",
    default: 100,
  },
  titleBgGradient: {
    type: "boolean",
    default: false,
  },
  titleBackgroundColor: {
    type: "string",
    default: "#FFFFFF",
  },
  contentTextColor: {
    type: "string",
  },
  contentSecondaryBackgroundColor: {
    type: "string",
  },
  contentGradientDegree: {
    type: "number",
    default: 100,
  },
  contentBgGradient: {
    type: "boolean",
    default: false,
  },
  contentBackgroundColor: {
    type: "string",
    default: "#eeeeee",
  },
  contentBackgroundColorOpacity: {
    type: "number",
    default: 100,
  },
};

registerBlockType("skt-blocks/accordion", {
  /* translators: block name */
  title: __("Accordion", "skt-blocks"),
  category: "skt_blocks",
  /* translators: block description */
  description: __(
    "Organize content within collapsable accordion items.",
    "skt-blocks"
  ),
  icon,
  keywords: [
    "skt-blocks",
    /* translators: block keyword */
    __("tabs", "skt-blocks"),
    /* translators: block keyword (abbreviation for "frequently asked titles") */
    __("accordion", "skt-blocks"),
  ],
  example: {},
  supports: {
    align: ["wide", "full"],
    html: false,
  },
  attributes,
  edit,
  supports: {
    anchor: true,
  },
  save,
});
