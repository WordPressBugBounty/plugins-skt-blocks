/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Style from "style-it";
import { loadGoogleFont } from "../../../utils/font";
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
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

export default class Edit extends Component {
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
        <Style>
          {`    
      @media only screen and (min-width: 976px){
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-title-text {
	font-size: ${headingTitleFontSize}px !important;
  margin-bottom: ${headSpacing}px !important;
		}
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-seperator {
      margin-bottom: ${separatorSpacing}px !important;
    }
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-desc-text {
      margin-bottom: ${subheadSpacing}px !important;
    }
}
      @media only screen and (min-width: 768px) and (max-width: 975px){
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-title-text {
  margin-bottom: ${headSpacingTablet}px !important;
    }
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-seperator {
  margin-bottom: ${separatorSpacingTablet}px !important;
    }
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-desc-text {
  margin-bottom: ${subheadSpacingTablet}px !important;
    }
}
      @media only screen and (max-width: 767px){
  .skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-title-text {
    margin-bottom: ${headSpacingMobile}px !important;
    }
  .skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-seperator {
    margin-bottom: ${separatorSpacingMobile}px !important;
    }
  .skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-desc-text {
    margin-bottom: ${subheadSpacingMobile}px !important;
    }
}
      `}
        </Style>

        {headingTitleFontSizeTablet!=null && (
          <Style>
            {`
      @media only screen and (max-width: 976px){
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-title-text {
	font-size: ${headingTitleFontSizeTablet}px;
		}
}
      `}
          </Style>
        )}
        {headingTitleFontSizeMobile!=null && (
          <Style>
            {`


@media only screen and (max-width: 767px){
	.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-title-text {
	font-size: ${headingTitleFontSizeMobile}px;
		}
}
`}
          </Style>
        )}
        <Style>
          {`
      @media only screen and (min-width: 976px){
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-desc-text {
	font-size: ${subHeadingTitleFontSize}px !important;
		}
}
      `}
        </Style>

        {subHeadingTitleFontSizeTablet && (
          <Style>
            {`
      @media only screen and (max-width: 976px){
.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-desc-text {
	font-size: ${subHeadingTitleFontSizeTablet}px;
		}
}
      `}
          </Style>
        )}
        {subHeadingTitleFontSizeMobile && (
          <Style>
            {`


@media only screen and (max-width: 767px){
	.skt-blocks-block-advanced-heading.block-${this.props.clientId} .responsive-heading-desc-text {
	font-size: ${subHeadingTitleFontSizeMobile}px;
		}
}
`}
          </Style>
        )}
        <Style>
          {`
            @media only screen and (min-width: 976px){
               .skt-blocks-block-advanced-heading.block-${this.props.clientId} {
                  text-align: ${headingAlignment};
               }
             }
             @media only screen and (max-width: 976px){
               .skt-blocks-block-advanced-heading.block-${this.props.clientId} {
                  text-align: ${headingAlignmentTablet};
               }
             }
             @media only screen and (max-width: 767px){
               .skt-blocks-block-advanced-heading.block-${this.props.clientId} {
                  text-align: ${headingAlignmentMobile};
               }
             }
            `}
        </Style>
      </Fragment>,

      // Show the block markup in the editor
      <div
        className={classnames(
          "skt-blocks-block-advanced-heading",
          `block-${this.props.clientId}`
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
                borderTopWidth: separatorHeight,
                width: separatorWidth,
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
