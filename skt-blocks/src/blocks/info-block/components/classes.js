/**
 * Returns Dynamic Generated Classes
 */

function InfoBoxPositionClasses(attributes) {
  var sourceClass = "skt-blocks-infobox-has-image";
  if (attributes.source_type == "icon") {
    sourceClass = "skt-blocks-infobox-has-icon";
  }

  var iconimgStyle_class = "";

  iconimgStyle_class += "skt-blocks-infobox" + " ";
  iconimgStyle_class += sourceClass + " ";
  iconimgStyle_class +=
    "skt-blocks-infobox-icon-" +
    attributes.imgiconPosition +
    " ";

  if (
    attributes.imgiconPosition === "left" ||
    attributes.imgiconPosition === "left-title"
  ) {
    iconimgStyle_class += "skt-blocks-infobox-left" + " ";
  }

  if (
    attributes.imgiconPosition === "right" ||
    attributes.imgiconPosition === "right-title"
  ) {
    iconimgStyle_class += "skt-blocks-infobox-right" + " ";
  }

  if (
    (attributes.imgiconPosition === "left" ||
      attributes.imgiconPosition === "right") &&
    attributes.stack !== "none"
  ) {
    iconimgStyle_class +=
      "skt-blocks-infobox-stacked-" +
      attributes.stack +
      " ";
    if (attributes.imgiconPosition === "right") {
      iconimgStyle_class +=
        "skt-blocks-infobox-reverse-order-" +
        attributes.stack +
        " ";
    }
  }

  if (
    attributes.imgiconPosition !== "above-title" ||
    attributes.imgiconPosition !== "below-title"
  ) {
    iconimgStyle_class +=
      "skt-blocks-infobox-image-valign-" +
      attributes.ressourceAlign +
      " ";
  }

  if (attributes.enableBorder) {
    iconimgStyle_class +=
      "skt-blocks-infobox-enable-border" + " ";
  }

  iconimgStyle_class +=
    "skt-blocks-infobox-enable-border-radius" + " ";

  return [iconimgStyle_class];
}

export default InfoBoxPositionClasses;
