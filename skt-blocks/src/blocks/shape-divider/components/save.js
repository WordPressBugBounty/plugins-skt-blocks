/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import { getDividerFromStyle } from "./utils";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";

/**
 * WordPress dependencies
 */
import { getColorClassName } from "@wordpress/block-editor";

const save = ({ attributes, className }) => {
  const {
    backgroundColor,
    backgroundHeight,
    skt_blocks,
    color,
    customBackgroundColor,
    customColor,
    horizontalFlip,
    shapeHeight,
    verticalFlip,
    backgroundColor1,
    backgroundColor2,
    colorLocation1,
    colorLocation2,
    gradientDirection,
    backgroundType,
    align,
  } = attributes;

  const shapeClass = getColorClassName("color", color);
  const backgroundClass = getColorClassName(
    "background-color",
    backgroundColor
  );

  let classes = classnames(className, {
    "is-vertically-flipped": verticalFlip,
    "is-horizontally-flipped": horizontalFlip,
    [shapeClass]: shapeClass,
    [backgroundClass]: backgroundClass,
  });

  if (
    skt_blocks &&
    typeof skt_blocks.id !== "undefined"
  ) {
    classes = classnames(
      classes,
      `skt-blocks-shape-divider-${skt_blocks.id}`,
      `align${align}`
    );
  }

  const styles = {
    backgroundColor:
      backgroundType == "color" && backgroundColor != undefined
        ? backgroundColor.color
        : null,
    backgroundImage:
      backgroundType == "gradient"
        ? generateBackgroundImageEffect(
            backgroundColor1,
            backgroundColor2,
            gradientDirection,
            colorLocation1,
            colorLocation2
          )
        : undefined,
    color: shapeClass ? undefined : customColor,
  };

  return (
    <div className={classes} style={styles} aria-hidden="true">
      <div
        className="wp-block-skt-blocks-shape-divider__svg-wrapper"
        style={{ minHeight: shapeHeight }}
      >
        {getDividerFromStyle(attributes.className)}
      </div>
      <div
        className="wp-block-skt-blocks-shape-divider__alt-wrapper"
        style={{ minHeight: backgroundHeight }}
      ></div>
    </div>
  );
};

export default save;
