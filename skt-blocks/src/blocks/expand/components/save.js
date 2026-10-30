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
        titleSpaceTablet,
        titleSpaceMobile,
        textSpaceTablet,
        textSpaceMobile,
        linkSpaceTablet,
        linkSpaceMobile,
        hideDesktop,
        hideTablet,
        hideMobile,
      },
      setAttributes,
    } = this.props;

    // Tablet / Mobile spacing as CSS variables, only when set, so existing
    // blocks keep exactly the same markup.
    const isSet = (v) => v !== undefined && v !== null && v !== "";
    const vars = {};
    const extra = {};
    [
      ["title", titleSpaceTablet, titleSpaceMobile],
      ["text", textSpaceTablet, textSpaceMobile],
      ["link", linkSpaceTablet, linkSpaceMobile],
    ].forEach(([k, t, m]) => {
      if (isSet(t)) {
        vars[`--exp-${k}-tablet`] = `${t}px`;
        extra[`has-exp-${k}-tablet`] = true;
      }
      if (isSet(m)) {
        vars[`--exp-${k}-mobile`] = `${m}px`;
        extra[`has-exp-${k}-mobile`] = true;
      }
    });
    const wrapClasses = classnames("skt-blocks-block-expand", extra, {
      "skt-expand-hide": hideDesktop || hideTablet || hideMobile,
      "skt-hide-desktop": hideDesktop,
      "skt-hide-tablet": hideTablet,
      "skt-hide-mobile": hideMobile,
    });

    return (
      <Fragment>
        <div
          className={wrapClasses}
          style={Object.keys(vars).length ? vars : undefined}
        >
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
