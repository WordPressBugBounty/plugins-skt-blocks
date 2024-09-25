/**
 * BLOCK: Accordion - Item - Save Block
 */

import classnames from "classnames";
import renderSVG from "../../../../renderIcon";
import generateCSSUnit from "../../../../generateCSSUnit";

const { Fragment } = wp.element;

const { RichText } = wp.blockEditor;

export default function save(props) {
  const { className } = props;
  const {
    block_id,
    title,
    content,
    icon,
    iconActive,
    layout,
    headingTag,
    borderStyle,
    borderWidth,
    borderRadius,
    borderColor,
    boxShadowColor,
    boxShadowHOffset,
    boxShadowVOffset,
    boxShadowBlur,
    boxShadowSpread,
    boxShadowPosition,
    titlePadding,
    contentPadding,
  } = props.attributes;

  var boxShadowPositionCSS = boxShadowPosition;

  if ("outset" === boxShadowPosition) {
    boxShadowPositionCSS = "";
  }

  const accordionRenderIcon = () => {
    return (
      <Fragment>
        <span className="skt-blocks-icon skt-blocks-accordion-icon-wrap">
          {renderSVG(icon)}
        </span>
        <span className="skt-blocks-icon-active skt-blocks-accordion-icon-wrap">
          {renderSVG(iconActive)}
        </span>
      </Fragment>
    );
  };
  const accordionRenderAccordion = () => {
    return (
      <div className="skt-blocks-accordion-item__wrapper">
        <div
          className="skt-blocks-accordion-item"
          role="tab"
          tabIndex="0"
        >
          <div
            className="skt-blocks-accordion-titles-button skt-blocks-accordion-titles"
            style={{
              boxShadow:
                boxShadowPositionCSS == "inset"
                  ? boxShadowPositionCSS +
                    " " +
                    generateCSSUnit(boxShadowHOffset, "px") +
                    " " +
                    generateCSSUnit(boxShadowVOffset, "px") +
                    " " +
                    generateCSSUnit(boxShadowBlur, "px") +
                    " " +
                    generateCSSUnit(boxShadowSpread, "px") +
                    " " +
                    boxShadowColor
                  : "",
              padding: titlePadding,
            }}
          >
            {"accordion" === layout && accordionRenderIcon()}
            <RichText.Content
              tagName={headingTag}
              value={title}
              className="skt-blocks-title"
            />
          </div>
          <div className="skt-blocks-accordion-content">
            <span
              style={{
                margin: 0,
                padding: contentPadding,
              }}
            >
              <RichText.Content tagName="p" value={content} />
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className={classnames(
        className,
        "skt-blocks-accordion-item__outer-wrap",
        `skt-blocks-block-${block_id}`
      )}
      style={{
        borderStyle: borderStyle,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        borderColor: borderColor,
        overflow: "hidden",
        boxShadow:
          generateCSSUnit(boxShadowHOffset, "px") +
          " " +
          generateCSSUnit(boxShadowVOffset, "px") +
          " " +
          generateCSSUnit(boxShadowBlur, "px") +
          " " +
          generateCSSUnit(boxShadowSpread, "px") +
          " " +
          boxShadowColor +
          " " +
          boxShadowPositionCSS,
      }}
    >
      {accordionRenderAccordion()}
    </div>
  );
}
