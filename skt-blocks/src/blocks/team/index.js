/**
 * BLOCK: SKT Blocks Team
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;
const ITEM_COUNT = 2;

const teamBlock = [];

for (var i = 1; i <= ITEM_COUNT; i++) {
  teamBlock.push({
    teamName: __("John Doe", "skt-blocks"),
    teamDesignation: __("Designation", "skt-blocks"),
    teamDescription: __(
      "Click here to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      "skt-blocks"
    ),
    teamImgURL: "",
    teamImgId: "",
    twitterUrl: "",
    facebookUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    pinterestUrl: "",
    emailAddress: "",
  });
}

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/team", {
  title: __("Team", "skt-blocks"),
  description: __(
    "This block allows you to display your team. Add their picture, name, what they do and links to their social profiles.",
    "skt-blocks"
  ),
  icon: "buddicons-buddypress-logo",
  category: "skt_blocks",
  keywords: [
    __("team", "skt-blocks"),
    __("members", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    teamBlock: {
      type: "array",
      default: teamBlock,
    },
    counterId: {
      type: "string",
      default: 1,
    },
    count: {
      type: "number",
      default: ITEM_COUNT,
    },
    gutter: {
      type: "string",
      default: "medium",
    },
    designationColor: {
      type: "string",
    },
    descriptionColor: {
      type: "string",
    },
    socialIconColor: {
      type: "string",
      default: "#0066CC",
    },
    titleColor: {
      type: "string",
    },
    titleFontWeight: {
      type: "string",
    },
    designationFontWeight: {
      type: "string",
    },
    descriptionFontWeight: {
      type: "string",
    },
    titleLineHeight: {
      type: "number",
    },
    designationLineHeight: {
      type: "number",
    },
    descriptionLineHeight: {
      type: "number",
    },
    imageSize: {
      type: "string",
      default: "full",
    },
    titleFontFamily: {
      type: "string",
    },
    designationFontFamily: {
      type: "string",
    },
    descriptionFontFamily: {
      type: "string",
    },
    titleFontSize: {
      type: "number",
      default: 23,
    },
    designationFontSize: {
      type: "number",
      default: 15,
    },
    descriptionFontSize: {
      type: "number",
      default: 15,
    },
    socialIconFontSize: {
      type: "number",
      default: 23,
    },
    imageMarginTop: {
      type: "number",
    },
    imageMarginBottom: {
      type: "number",
    },
    iconSize: {
      type: "string",
    },
    titleSpacing: {
      type: "number",
    },
    designationSpacing: {
      type: "number",
    },
    descriptionSpacing: {
      type: "number",
    },
    socialIconSpacing: {
      type: "number",
    },
    imageStyle: {
      type: "number",
      default: "0%",
    },
    imageWidth: {
      type: "number",
      default: 120,
    },
    backgroundColor: {
      type: "string",
    },
    borderColor: {
      type: "string",
    },
    borderWidth: {
      type: "number",
      default: 2,
    },
    borderRadius: {
      type: "number",
      default: 2,
    },
    padding: {
      type: "number",
      default: 2,
    },
    alignment: {
      type: "string",
      default: "center",
    },
    imageShape: {
      type: "string",
    },
    boxShadowColor: {
      type: "string",
    },
    boxShadowHOffset: {
      type: "number",
      default: 20,
    },
    boxShadowVOffset: {
      type: "number",
      default: 20,
    },
    boxShadowBlur: {
      type: "number",
      default: 50,
    },
    boxShadowSpread: {
      type: "number",
      default: 20,
    },
    boxShadowPosition: {
      type: "string",
      default: "outset",
    },
    opacity: {
      type: "number",
      default: 50,
    },
    secondaryBackgroundColor: {
      type: "string",
    },
    gradientDegree: {
      type: "number",
      default: 100,
    },
    colorLocation1: {
      type: "number",
      default: 0,
    },
    colorLocation2: {
      type: "number",
      default: 100,
    },
    bgGradient: {
      type: "bool",
    },
    backgroundImage: {
      type: "string",
    },
    backgroundPosition: {
      type: "string",
      default: "center-center",
    },
    backgroundRepeat: {
      type: "string",
      default: "no-repeat",
    },
    backgroundSize: {
      type: "string",
      default: "cover",
    },
    backgroundAttachment: {
      type: "string",
      default: "scroll",
    },
      showImage: {
      type: "bool",
      default: true,
    },
      showName: {
      type: "bool",
      default: true,
    },
      showDesignation: {
      type: "bool",
      default: true,
    },
      showDescription: {
      type: "bool",
      default: true,
    },
      showSocialIcons: {
      type: "bool",
      default: true,
    },
    facebook: {
      type: "bool",
    },
    twitter: {
      type: "bool",
    },
    linkedin: {
      type: "bool",
    },
    instagram: {
      type: "bool",
    },
    email: {
      type: "bool",
    },
    youtube: {
      type: "bool",
    },
    pinterest: {
      type: "bool",
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
