/**
 * Internal dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;
const { RichText } = wp.editor;

export default class Save extends Component {
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
      },
      setAttributes,
    } = this.props;

    return (
      <Fragment>
        <div className="skt-blocks-block-expand">
          <div
            className="skt-blocks-expand-block-content"
            style={{ textAlign: expandAlignment }}
          >
            {showTitle && (
              <RichText.Content
                tagName="h4"
                className="skt-blocks-expand-title"
                style={{
                  marginBottom: titleSpace,
                  fontFamily: titleFontFamily,
                  fontSize: titleFontSize,
                  fontWeight: titleFontWeight,
                  lineHeight: titleLineHeight,
                  color: titleColor,
                }}
                value={blockTitle}
              />
            )}
            <RichText.Content
              tagName="p"
              className="skt-blocks-expand-less-text"
              style={{
                marginBottom: textSpace,
                fontFamily: textFontFamily,
                fontSize: textFontSize,
                fontWeight: textFontWeight,
                lineHeight: textLineHeight,
                color: textColor,
              }}
              value={expandLessText}
            />
            <RichText.Content
              tagName="p"
              className="skt-blocks-expand-more-text"
              style={{
                display: "none",
                marginBottom: textSpace,
                fontFamily: textFontFamily,
                fontSize: textFontSize,
                fontWeight: textFontWeight,
                lineHeight: textLineHeight,
                color: textColor,
              }}
              value={expandMoreText}
            />

            <div className="skt-blocks-expand-toggle-wrapper">
              <a
                className="skt-blocks-expand-toggle"
                href="#"
              >
                <RichText.Content
                  tagName="p"
                  className="skt-blocks-expand-more-toggle-text"
                  style={{
                    marginBottom: linkSpace,
                    fontFamily: linkFontFamily,
                    fontSize: linkFontSize,
                    fontWeight: linkFontWeight,
                    lineHeight: linkLineHeight,
                    color: linkColor,
                  }}
                  value={moreLabel}
                />
                <RichText.Content
                  tagName="p"
                  className="skt-blocks-expand-less-toggle-text"
                  style={{
                    display: "none",
                    marginBottom: linkSpace,
                    fontFamily: linkFontFamily,
                    fontSize: linkFontSize,
                    fontWeight: linkFontWeight,
                    lineHeight: linkLineHeight,
                    color: linkColor,
                  }}
                  value={lessLabel}
                />
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
