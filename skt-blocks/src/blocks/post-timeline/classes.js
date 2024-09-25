/**
 * Returns Dynamic Generated Classes
 */

export default function ContentTmClasses(attributes) {
  /* Arrow position */
  var arrow_align_class =
    "skt-blocks-timeline__arrow-top" + " ";
  if (attributes.arrowlinAlignment == "center") {
    arrow_align_class =
      "skt-blocks-timeline__arrow-center" + " ";
  } else if (attributes.arrowlinAlignment == "bottom") {
    arrow_align_class =
      "skt-blocks-timeline__arrow-bottom" + " ";
  }

  /* Alignmnet */
  var align_class =
    "skt-blocks-timeline__center-block " + " ";
  if (attributes.timelinAlignment == "left") {
    align_class = "skt-blocks-timeline__left-block" + " ";
  } else if (attributes.timelinAlignment == "right") {
    align_class = "skt-blocks-timeline__right-block" + " ";
  }
  align_class += arrow_align_class + "";
  align_class +=
    "skt-blocks-timeline__responsive-" +
    attributes.stack +
    " skt-blocks-timeline";

  return [align_class];
}
