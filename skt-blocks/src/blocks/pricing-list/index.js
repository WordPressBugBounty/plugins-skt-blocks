/**
 * BLOCK: SKT Blocks Pricing Table
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;

const ITEM_COUNT = 4;

const rest_menu_block = [];

for (var i = 1; i <= ITEM_COUNT; i++) {
  var desc_text = __(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  var title_text = __("Menu Item " + i);
  var price_text = __("$9");
  rest_menu_block.push({
    description: desc_text,
    title: title_text,
    price: price_text,
    imageId: "",
    image: "",
    imageUrl: "",
  });
}

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/pricing-list", {
  title: __("Pricing List", "skt-blocks"),
  description: __(
    "This block allows you to add pricing List with multiple rows and columns.",
    "skt-blocks"
  ),
  icon: "welcome-widgets-menus",
  category: "skt_blocks",
  keywords: [
    __("pricing", "skt-blocks"),
    __("list", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    pricingList: {
      type: "array",
      default: rest_menu_block,
    },
    topPadding: {
      type: "number",
      default: 5,
    },
    bottomPadding: {
      type: "number",
      default: 5,
    },
    leftPadding: {
      type: "number",
      default: 5,
    },
    rightPadding: {
      type: "number",
      default: 5,
    },
    rowGap: {
      type: "number",
      default: 10,
    },
    columnGap: {
      type: "number",
      default: 10,
    },
    titleSpace: {
      type: "number",
      default: 10,
    },
    titleFontFamily: {
      type: "string",
    },
    descriptionFontFamily: {
      type: "string",
    },
    priceFontFamily: {
      type: "string",
    },
    titleFontSize: {
      type: "number",
    },
    titleFontWeight: {
      type: "string",
    },
    titleLineHeight: {
      type: "number",
    },
    descriptionFontSize: {
      type: "number",
    },
    descriptionFontWeight: {
      type: "string",
    },
    descriptionLineHeight: {
      type: "number",
    },
    priceFontSize: {
      type: "number",
    },
    priceFontWeight: {
      type: "string",
    },
    priceLineHeight: {
      type: "number",
    },
    seperatorStyle: {
      type: "string",
      default: "dashed",
    },
    seperatorWidth: {
      type: "number",
      default: 100,
    },
    seperatorThickness: {
      type: "number",
      default: 1,
    },
    seperatorColor: {
      type: "string",
    },
    titleColor: {
      type: "string",
    },
    descColor: {
      type: "string",
    },
    priceColor: {
      type: "string",
    },

    columns: {
      type: "number",
      default: 2,
    },
    count: {
      type: "number",
      default: ITEM_COUNT,
    },
    contentAlign: {
      type: "string",
      default: "left",
    },
    imagePosition: {
      type: "string",
      default: "top",
    },
    imageAlignment: {
      type: "string",
      default: "middle",
    },
    imageSize: {
      type: "string",
      default: "medium",
    },
    imageWidth: {
      type: "number",
    },
  },

  /* Render the block in the editor. */
  edit: (props) => {
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    return <Save {...props} />;
  },
});
