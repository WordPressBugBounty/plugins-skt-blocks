/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import { inherited, previewSuffix } from "./responsive-utils";
import { loadGoogleFont } from "../../../utils/font";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;
const { RichText, BlockControls, AlignmentToolbar } = wp.editor;

class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        blockTitle,
        expandLessText,
        expandMoreText,
        moreLabel,
        lessLabel,
        expandAlignment,
        showTitle,
        linkSpace,
        textSpace,
        titleSpace,
        titleFontFamily,
        titleFontSize,
        titleFontWeight,
        titleLineHeight,
        textFontFamily,
        textFontSize,
        textFontWeight,
        textLineHeight,
        linkFontFamily,
        linkFontSize,
        linkFontWeight,
        linkLineHeight,
        textColor,
        linkColor,
        titleColor,
        hideDesktop,
        hideTablet,
        hideMobile,
      },
      setAttributes,
      isSelected,
    } = this.props;

    const sfx = previewSuffix(this.props.deviceType);
    const eff = (b) => inherited(this.props.attributes, b, sfx);

    return [
      <BlockControls key="controls">
        <AlignmentToolbar
          value={expandAlignment}
          onChange={(value) => setAttributes({ expandAlignment: value })}
        />
      </BlockControls>,

      <Inspector {...{ setAttributes, ...this.props }} />,
      <Fragment>
        <div
          className={classnames("skt-blocks-block-expand", {
            "skt-expand-hide": hideDesktop || hideTablet || hideMobile,
            "skt-hide-desktop": hideDesktop,
            "skt-hide-tablet": hideTablet,
            "skt-hide-mobile": hideMobile,
          })}
        >
          <div
            className="skt-blocks-expand-block-content"
            style={{ textAlign: expandAlignment }}
          >
            {titleFontFamily && loadGoogleFont(titleFontFamily)}
            {textFontFamily && loadGoogleFont(textFontFamily)}
            {linkFontFamily && loadGoogleFont(linkFontFamily)}
            {showTitle && (
              <RichText
                tagName="h4"
                keepPlaceholderOnFocus
                value={blockTitle}
                className="skt-blocks-expand-title"
                style={{
                  marginBottom: eff("titleSpace"),
                  fontFamily: titleFontFamily,
                  fontSize: titleFontSize,
                  fontWeight: titleFontWeight,
                  lineHeight: titleLineHeight,
                  color: titleColor,
                }}
                onChange={(value) =>
                  this.props.setAttributes({ blockTitle: value })
                }
              />
            )}
            {isSelected && (
              <label className="skt-blocks-expand-label">
                {__("Less Text", "skt-blocks")}
              </label>
            )}
            <RichText
              tagName="p"
              keepPlaceholderOnFocus
              value={expandLessText}
              className="skt-blocks-expand-less-text"
              style={{
                marginBottom: eff("textSpace"),
                fontFamily: textFontFamily,
                fontSize: textFontSize,
                fontWeight: textFontWeight,
                lineHeight: textLineHeight,
                color: textColor,
              }}
              onChange={(value) =>
                this.props.setAttributes({ expandLessText: value })
              }
            />
            <div className="skt-blocks-expand-toggle-wrapper">
              <a>
                <RichText
                  tagName="p"
                  keepPlaceholderOnFocus
                  value={moreLabel}
                  className="skt-blocks-expand-more-toggle-text"
                  style={{
                    marginBottom: eff("linkSpace"),
                    fontFamily: linkFontFamily,
                    fontSize: linkFontSize,
                    fontWeight: linkFontWeight,
                    lineHeight: linkLineHeight,
                    color: linkColor,
                  }}
                  onChange={(value) =>
                    this.props.setAttributes({ moreLabel: value })
                  }
                />
              </a>
            </div>
            {isSelected && (
              <Fragment>
                <label className="skt-blocks-expand-label">
                  {__("More Text", "skt-blocks")}
                </label>
                <RichText
                  tagName="p"
                  keepPlaceholderOnFocus
                  value={expandMoreText}
                  className="skt-blocks-expand-more-text"
                  style={{
                    marginBottom: eff("textSpace"),
                    fontFamily: textFontFamily,
                    fontSize: textFontSize,
                    fontWeight: textFontWeight,
                    lineHeight: textLineHeight,
                    color: textColor,
                  }}
                  onChange={(value) =>
                    this.props.setAttributes({ expandMoreText: value })
                  }
                />
                <div className="skt-blocks-expand-toggle-wrapper">
                  <a>
                    <RichText
                      tagName="p"
                      keepPlaceholderOnFocus
                      value={lessLabel}
                      className="skt-blocks-expand-less-toggle-text"
                      style={{
                        marginBottom: eff("linkSpace"),
                        fontFamily: linkFontFamily,
                        fontSize: linkFontSize,
                        fontWeight: linkFontWeight,
                        lineHeight: linkLineHeight,
                        color: linkColor,
                      }}
                      onChange={(value) =>
                        this.props.setAttributes({ lessLabel: value })
                      }
                    />
                  </a>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>,
    ];
  }
}

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
