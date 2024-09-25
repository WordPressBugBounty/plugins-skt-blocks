/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Spacer from "./spacer";
import Resizable from "re-resizable";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.editor;

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        spacerHeight,
        spacerDividerColor,
        spacerDividerHeight,
        spacerDividerWidth,
        spacerDividerStyle,
        spacerDividerAlignment,
      },
      className,
      setAttributes,
      toggleSelection,
    } = this.props;

    return [
      <BlockControls key="controls">
        <AlignmentToolbar
          value={spacerDividerAlignment}
          onChange={(value) => setAttributes({ spacerDividerAlignment: value })}
        />
      </BlockControls>,
      // Show the block controls on focus
      <Inspector
        key={
          "skt-blocks-spacer-inspector-" +
          this.props.clientId
        }
        {...this.props}
      />,

      // Show the button markup in the editor
      <Spacer
        key={
          "skt-blocks-spacer-editor-" + this.props.clientId
        }
        {...this.props}
      >
        <Resizable
          className={classnames(
            className,
            "skt-blocks-spacer-handle"
          )}
          style={{
            color: spacerDividerColor,
          }}
          size={{
            width: "100%",
          }}
          minWidth={"100%"}
          maxWidth={"100%"}
          minHeight={"100%"}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <div className="skt-blocks-divider-inner">
            <div
              className="skt-blocks-divider-content"
              style={{
                marginTop: spacerHeight,
                marginBottom: spacerHeight,
              }}
            >
              <hr
                className="skt-blocks-divider_hr"
                style={{
                  height: spacerDividerHeight,
                  width: spacerDividerWidth + "%",
                  backgroundColor: spacerDividerColor,
                  borderRadius:
                    spacerDividerStyle === "basic"
                      ? 0
                      : spacerDividerHeight / 2,
                  marginLeft: spacerDividerAlignment === "left" ? 0 : "auto",
                  marginRight: spacerDividerAlignment === "right" ? 0 : "auto",
                }}
              />
              {(spacerDividerStyle === "dots" ||
                spacerDividerStyle === "asterisks") && (
                <div
                  className="rgbl-divider__dots"
                  style={{
                    width: spacerDividerWidth + "%",
                    marginLeft: spacerDividerAlignment === "left" ? 0 : "auto",
                    marginRight:
                      spacerDividerAlignment === "right" ? 0 : "auto",
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="rgbl-divider__dot"
                    style={{
                      height: spacerDividerHeight,
                      backgroundColor: spacerDividerColor,
                      fontSize: spacerDividerHeight * 1.8,
                      width: spacerDividerHeight,
                    }}
                  ></div>
                  <div
                    className="rgbl-divider__dot"
                    style={{
                      height: spacerDividerHeight,
                      backgroundColor: spacerDividerColor,
                      fontSize: spacerDividerHeight * 1.8,
                      width: spacerDividerHeight,
                    }}
                  ></div>
                  <div
                    className="rgbl-divider__dot"
                    style={{
                      height: spacerDividerHeight,
                      backgroundColor: spacerDividerColor,
                      fontSize: spacerDividerHeight * 1.8,
                      width: spacerDividerHeight,
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </Resizable>
      </Spacer>,
    ];
  }
}
