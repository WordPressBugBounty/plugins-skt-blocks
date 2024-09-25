/**
 * BLOCK: Accordion - Item
 */

import classnames from "classnames";
import renderSVG from "../../../../renderIcon";
import BoxShadowControl from "../../../../utils/components/box-shadow";
import generateCSSUnit from "../../../../generateCSSUnit";

const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;

const {
  ColorPalette,
  InspectorControls,
  InnerBlocks,
  PanelColorSettings,
  RichText,
} = wp.blockEditor;

const {
  PanelBody,
  SelectControl,
  RangeControl,
  TabPanel,
  ButtonGroup,
  Button,
  Dashicon,
  ToggleControl,
  IconButton,
} = wp.components;

class ResponsiveBlockEditorAddonsAccordionItemEdit extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isFocused: "false",
    };
  }

  componentDidMount() {
    // Assigning block_id in the attribute.
    this.props.setAttributes({ block_id: this.props.clientId.substr(0, 8) });
    // Pushing Style tag for this block css.
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      !this.props.isSelected &&
      prevProps.isSelected &&
      this.state.isFocused
    ) {
      this.setState({
        isFocused: "false",
      });
    }
    if (this.props.isSelected && !prevProps.isSelected) {
      this.setState({
        isFocused: true,
      });
    }
  }
  render() {
    const { attributes, setAttributes } = this.props;
    const {
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
    } = attributes;

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
    const accordionChildControls = () => {
      return (
        <Fragment>
          <PanelBody
            title={__("Style")}
            initialOpen={false}
            className="skt_blocks__url-panel-body"
          >
            <p className="skt-blocks-settings-notice">
              {__("For the styling options please select the Parent Block.")}
            </p>
            <hr className="skt-blocks-editor__separator" />
            <h2>{__("Border")}</h2>
            <SelectControl
              label={__("Style")}
              value={borderStyle}
              options={[
                { value: "none", label: __("None") },
                { value: "solid", label: __("Solid") },
                { value: "dotted", label: __("Dotted") },
                { value: "dashed", label: __("Dashed") },
                { value: "double", label: __("Double") },
              ]}
              onChange={(value) => {
                setAttributes({ borderStyle: value });
              }}
            />
            {"none" !== borderStyle && (
              <RangeControl
                label={__("Thickness (px)")}
                value={borderWidth}
                onChange={(value) => {
                  setAttributes({ borderWidth: value });
                }}
                min={0}
                max={20}
              />
            )}
            {"none" !== borderStyle && (
              <RangeControl
                label={__("Border Radius (px)")}
                value={borderRadius}
                onChange={(value) => {
                  setAttributes({ borderRadius: value });
                }}
                min={0}
                max={50}
              />
            )}
            <p className="skt-blocks-setting-label">
              {__("Color")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: borderColor }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={borderColor}
              onChange={(value) => setAttributes({ borderColor: value })}
              allowReset
            />
            <BoxShadowControl
              setAttributes={setAttributes}
              label={__("Box Shadow")}
              boxShadowColor={{ value: boxShadowColor, label: __("Color") }}
              boxShadowHOffset={{
                value: boxShadowHOffset,
                label: __("Horizontal"),
              }}
              boxShadowVOffset={{
                value: boxShadowVOffset,
                label: __("Vertical"),
              }}
              boxShadowBlur={{ value: boxShadowBlur, label: __("Blur") }}
              boxShadowSpread={{
                value: boxShadowSpread,
                label: __("Spread"),
              }}
              boxShadowPosition={{
                value: boxShadowPosition,
                label: __("Position"),
              }}
            />
          </PanelBody>
          <PanelBody
            title={__("Spacing")}
            initialOpen={false}
            className="skt_blocks__url-panel-body"
          >
            <RangeControl
              label={__("Title Padding")}
              value={titlePadding}
              onChange={(value) => setAttributes({ titlePadding: value })}
              min={0}
              max={100}
            />
            <RangeControl
              label={__("Content Padding")}
              value={contentPadding}
              onChange={(value) => setAttributes({ contentPadding: value })}
              min={0}
              max={100}
            />
          </PanelBody>
        </Fragment>
      );
    };

    const accordionRenderHtml = () => {
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
              <RichText
                tagName={"span" != headingTag ? headingTag : "div"}
                placeholder={__("Title")}
                value={title}
                onChange={(value) => setAttributes({ title: value })}
                className="skt-blocks-title"
                multiline={false}
                allowedFormats={[
                  "core/bold",
                  "core/italic",
                  "core/strikethrough",
                ]}
              />
            </div>
            <div className="skt-blocks-accordion-content">
              <span style={{ margin: 0, padding: contentPadding }}>
                <RichText
                  tagName="p"
                  placeholder={__("Content")}
                  value={content}
                  onChange={(value) => setAttributes({ content: value })}
                  multiline={false}
                  allowedFormats={[
                    "core/bold",
                    "core/italic",
                    "core/strikethrough",
                    "core/link",
                  ]}
                />
              </span>
            </div>
          </div>
        </div>
      );
    };
    return (
      <Fragment>
        <InspectorControls>{accordionChildControls}</InspectorControls>
        <div
          className={classnames(
            "skt-blocks-accordion-item__outer-wrap",
            `skt-blocks-block-${this.props.clientId.substr(
              0,
              8
            )}`,
            this.props.isSelected && false !== this.state.isFocused
              ? "skt-blocks-accordion__active"
              : ""
          )}
          style={{
            borderStyle: borderStyle,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            borderColor: borderColor,
            overflow: "hidden",
            boxShadow:
              boxShadowPositionCSS +
              " " +
              generateCSSUnit(boxShadowHOffset, "px") +
              " " +
              generateCSSUnit(boxShadowVOffset, "px") +
              " " +
              generateCSSUnit(boxShadowBlur, "px") +
              " " +
              generateCSSUnit(boxShadowSpread, "px") +
              " " +
              boxShadowColor,
          }}
        >
          {accordionRenderHtml()}
        </div>
      </Fragment>
    );
  }
}

export default ResponsiveBlockEditorAddonsAccordionItemEdit;
