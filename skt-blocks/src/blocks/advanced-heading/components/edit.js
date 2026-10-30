/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Style from "style-it";
import { inherited, previewSuffix } from "./responsive-utils";
import { loadGoogleFont } from "../../../utils/font";
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  MediaUpload,
  InnerBlocks,
  MediaUploadCheck,
  figure,
} = wp.editor;
const { Button, Dashicon } = wp.components;

const ALLOWED_MEDIA_TYPES = ["image"];

class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        headingTitle,
        headingDesc,
        seperatorStyle,
        headSpacing,
        subheadSpacing,
        separatorSpacing,
        headSpacingTablet,
        subheadSpacingTablet,
        separatorSpacingTablet,
        headSpacingMobile,
        subheadSpacingMobile,
        separatorSpacingMobile,
        separatorHeight,
        separatorWidth,
        separatorColor,
        headingTitleFontFamily,
        headingTitleFontSize,
        headingTitleFontSizeTablet,
        headingTitleFontSizeMobile,
        headingTitleFontWeight,
        headingTitleLineHeight,
        headingTitleLetterSpacing,
        headingTitleColor,
        subHeadingTitleFontFamily,
        subHeadingTitleFontSize,
        subHeadingTitleFontSizeMobile,
        subHeadingTitleFontSizeTablet,
        subHeadingTitleFontWeight,
        subHeadingTitleLineHeight,
        subHeadingTitleLetterSpacing,
        subHeadingTitleColor,
        headingTag,
        level,
        headingAlignment,
        headingAlignmentTablet,
        headingAlignmentMobile,
        showHeading,
        showSubHeading,
        showSeparator,
        block_id,
      },
      setAttributes,
      mergeBlocks,
      insertBlocksAfter,
      onReplace,
    } = this.props;
    this.props.setAttributes({ block_id: this.props.clientId });
    const { hideDesktop, hideTablet, hideMobile } = this.props.attributes;
    // Value for the device selected in the editor preview.
    const sfx = previewSuffix(this.props.deviceType);
    const effSepHeight = inherited(this.props.attributes, "separatorHeight", sfx);
    const effSepWidth = inherited(this.props.attributes, "separatorWidth", sfx);

    // --- Editor live preview for Alignment / Font Size / Spacing. The saved
    // markup gates the desktop values behind @media (min-width:976px); the WP
    // 6.9 editor iframe canvas is usually narrower than that, so those rules
    // never fire and changes look like they have no effect. Here we apply the
    // desktop values unconditionally and layer Tablet / Mobile on top only when
    // the editor is previewing that device, so every change shows immediately.
    // Editor-only (save.js is untouched, so the frontend stays validation-safe). ---
    const ahScope =
      ".skt-blocks-block-advanced-heading.block-" + this.props.clientId;
    const ahDev = this.props.deviceType;
    const ahNum = (v) =>
      typeof v === "number" && !isNaN(v) ? v : null;
    const ahRules = (fs, hs, sep, sub, subFs, alignVal) => {
      let c = "";
      if (ahNum(fs) !== null)
        c += `${ahScope} .responsive-heading-title-text{font-size:${fs}px!important;}`;
      if (ahNum(hs) !== null)
        c += `${ahScope} .responsive-heading-title-text{margin-bottom:${hs}px!important;}`;
      if (ahNum(sep) !== null)
        c += `${ahScope} .responsive-heading-seperator{margin-bottom:${sep}px!important;}`;
      if (ahNum(sub) !== null)
        c += `${ahScope} .responsive-heading-desc-text{margin-bottom:${sub}px!important;}`;
      if (ahNum(subFs) !== null)
        c += `${ahScope} .responsive-heading-desc-text{font-size:${subFs}px!important;}`;
      if (alignVal)
        c += `${ahScope}{text-align:${alignVal}!important;}`;
      return c;
    };
    let ahEditorCss = ahRules(
      headingTitleFontSize,
      headSpacing,
      separatorSpacing,
      subheadSpacing,
      subHeadingTitleFontSize,
      headingAlignment
    );
    if (ahDev === "Tablet" || ahDev === "Mobile") {
      ahEditorCss += ahRules(
        headingTitleFontSizeTablet,
        headSpacingTablet,
        separatorSpacingTablet,
        subheadSpacingTablet,
        subHeadingTitleFontSizeTablet,
        headingAlignmentTablet
      );
    }
    if (ahDev === "Mobile") {
      ahEditorCss += ahRules(
        headingTitleFontSizeMobile,
        headSpacingMobile,
        separatorSpacingMobile,
        subheadSpacingMobile,
        subHeadingTitleFontSizeMobile,
        headingAlignmentMobile
      );
    }

    return [
      <BlockControls key="controls">
        <AlignmentToolbar
          value={headingAlignment}
          onChange={(value) => setAttributes({ headingAlignment: value })}
        />
      </BlockControls>,
      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,
      <Fragment>
        {ahEditorCss && <Style>{ahEditorCss}</Style>}
      </Fragment>,

      // Show the block markup in the editor
      <div
        className={classnames(
          "skt-blocks-block-advanced-heading",
          `block-${this.props.clientId}`,
          {
            "skt-heading-hide": hideDesktop || hideTablet || hideMobile,
            "skt-hide-desktop": hideDesktop,
            "skt-hide-tablet": hideTablet,
            "skt-hide-mobile": hideMobile,
          }
        )}
      >
        {headingTitleFontFamily && loadGoogleFont(headingTitleFontFamily)}
        {showHeading && (
          <RichText
            tagName={headingTag}
            placeholder={__("Write a Heading")}
            value={headingTitle}
            className="responsive-heading-title-text"
            multiline={false}
            onChange={(value) => {
              setAttributes({ headingTitle: value });
            }}
            style={{
              fontFamily: headingTitleFontFamily,
              fontWeight: headingTitleFontWeight,
              lineHeight: headingTitleLineHeight,
              letterSpacing: headingTitleLetterSpacing,
              color: headingTitleColor,
            }}
            onMerge={mergeBlocks}
            unstableOnSplit={
              insertBlocksAfter
                ? (before, after, ...blocks) => {
                    setAttributes({ content: before });
                    insertBlocksAfter([
                      ...blocks,
                      createBlock("core/paragraph", { content: after }),
                    ]);
                  }
                : undefined
            }
            onRemove={() => onReplace([])}
          />
        )}
        {seperatorStyle !== "none" && showSeparator && (
          <div className="responsive-heading-seperator-wrap">
            <div
              className="responsive-heading-seperator"
              style={{
                borderTopStyle: seperatorStyle,
                borderTopWidth: effSepHeight,
                width: effSepWidth,
                borderColor: separatorColor,
              }}
            ></div>
          </div>
        )}
        {subHeadingTitleFontFamily && loadGoogleFont(subHeadingTitleFontFamily)}
        {showSubHeading && (
          <RichText
            tagName="p"
            placeholder={__("Write some text")}
            value={headingDesc}
            className="responsive-heading-desc-text"
            onChange={(value) => setAttributes({ headingDesc: value })}
            onMerge={mergeBlocks}
            unstableOnSplit={this.splitBlock}
            onRemove={() => onReplace([])}
            style={{
              fontFamily: subHeadingTitleFontFamily,
              fontWeight: subHeadingTitleFontWeight,
              lineHeight: subHeadingTitleLineHeight,
              letterSpacing: subHeadingTitleLetterSpacing,
              color: subHeadingTitleColor,
            }}
          />
        )}
      </div>,
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
