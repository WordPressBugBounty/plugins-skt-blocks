/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Spacer from "./spacer";
import { Resizable } from "re-resizable";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { withSelect } = wp.data;
const { AlignmentToolbar, BlockControls } = wp.editor;

class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        spacerDividerColor,
        spacerDividerStyle,
        spacerDividerAlignment,
      },
      className,
      setAttributes,
      toggleSelection,
      deviceType,
    } = this.props;

    // Live preview: pick the value for the editor's current preview device
    // (Desktop / Tablet / Mobile). Mobile falls back to Tablet, then Desktop.
    const attrs = this.props.attributes;
    const pick = (base) => {
      const chain =
        deviceType === "Mobile"
          ? [base + "Mobile", base + "Tablet", base]
          : deviceType === "Tablet"
          ? [base + "Tablet", base]
          : [base];
      for (const key of chain) {
        const v = attrs[key];
        if (v !== undefined && v !== null && v !== "") {
          return v;
        }
      }
      return attrs[base];
    };
    const spacerHeight = pick("spacerHeight");
    const spacerDividerHeight = pick("spacerDividerHeight");
    const spacerDividerWidth = pick("spacerDividerWidth");

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
        isEditorPreview
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
            {/*
              Editor-only: WP 6.x renders the canvas in an iframe, so the
              front-end stylesheet that hides the <hr> for the Dots/Asterisks
              styles and shapes the dots never reaches it. Inject the same rules
              here so the editor preview matches the front end. Not part of save.
            */}
            <style>
              {`
                .skt-blocks-block-spacer .skt-blocks-divider-content hr{border:none}
                .skt-blocks-block-spacer.bars .skt-blocks-divider-content,
                .skt-blocks-block-spacer.basic .skt-blocks-divider-content{display:flex;flex-direction:row;justify-content:space-around;overflow:hidden}
                .skt-blocks-block-spacer.skt-blocks-spacer-divider .rgbl-divider__dots{margin:0 auto;display:flex;flex-direction:row;justify-content:space-between}
                .skt-blocks-block-spacer.skt-blocks-spacer-divider .rgbl-divider__dot{flex-shrink:0}
                .skt-blocks-block-spacer.skt-blocks-spacer-divider.dots .skt-blocks-divider-content hr,
                .skt-blocks-block-spacer.skt-blocks-spacer-divider.asterisks .skt-blocks-divider-content hr{background-color:transparent !important;height:0 !important}
                .skt-blocks-block-spacer.skt-blocks-spacer-divider.dots .rgbl-divider__dot,
                .skt-blocks-block-spacer.skt-blocks-spacer-divider.asterisks .rgbl-divider__dot{border-radius:100%}
                .skt-blocks-block-spacer.skt-blocks-spacer-divider.asterisks .rgbl-divider__dot{background:transparent !important;position:relative}
                .skt-blocks-block-spacer.skt-blocks-spacer-divider.asterisks .rgbl-divider__dot::before{content:"*";font-family:Georgia,Times,"Times New Roman",serif;line-height:1;vertical-align:middle;position:absolute;top:0;left:0}
              `}
            </style>
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

// Re-render the editor preview whenever the preview device changes.
export default withSelect((select) => {
  let deviceType = "Desktop";
  try {
    const editor = select("core/editor");
    if (editor && editor.getDeviceType) {
      deviceType = editor.getDeviceType();
    } else {
      const editPost = select("core/edit-post");
      if (editPost && editPost.__experimentalGetPreviewDeviceType) {
        deviceType = editPost.__experimentalGetPreviewDeviceType();
      }
    }
  } catch (e) {}
  return { deviceType };
})(Edit);
