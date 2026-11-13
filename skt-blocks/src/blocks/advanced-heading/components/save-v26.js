/**
 * Internal dependencies
 */
import classnames from "classnames";
import Style from "style-it";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { RichText } = wp.editor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      headingTitle,
      headingId,
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
      headingTitleFontSize,
      headingTitleFontSizeTablet,
      headingTitleFontSizeMobile,
      headingTitleFontFamily,
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
    } = this.props.attributes;

    var seprator_output = "";
    if (seperatorStyle !== "none") {
      seprator_output = (
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
      );
    }
    return [
      <Fragment>
        <Style>
          {`
      @media only screen and (min-width: 976px){
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-title-text {
	font-size: ${headingTitleFontSize}px !important;
  margin-bottom: ${headSpacing}px !important;
		}
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-seperator {
      margin-bottom: ${separatorSpacing}px !important;
    }
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-desc-text {
      margin-bottom: ${subheadSpacing}px !important;
    }
}
      @media only screen and (min-width: 768px) and (max-width: 976px){
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-title-text {
  margin-bottom: ${headSpacingTablet}px !important;
    }
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-seperator {
  margin-bottom: ${separatorSpacingTablet}px !important;
    }
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-desc-text {
  margin-bottom: ${subheadSpacingTablet}px !important;
    }
}
      @media only screen and (max-width: 767px){
  .skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-title-text {
    margin-bottom: ${headSpacingMobile}px !important;
    }
  .skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-seperator {
    margin-bottom: ${separatorSpacingMobile}px !important;
    }
  .skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-desc-text {
    margin-bottom: ${subheadSpacingMobile}px !important;
    }
}
      `}
        </Style>

        {headingTitleFontSizeTablet!=null && (
          <Style>
            {`
      @media only screen and (max-width: 976px){
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-title-text {
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
	.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-title-text {
	font-size: ${headingTitleFontSizeMobile}px;
		}
}
`}
          </Style>
        )}
        <Style>
          {`
      @media only screen and (min-width: 976px){
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-desc-text {
	font-size: ${subHeadingTitleFontSize}px !important;
		}
}
      `}
        </Style>

        {subHeadingTitleFontSizeTablet && (
          <Style>
            {`
      @media only screen and (max-width: 976px){
.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-desc-text {
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
	.skt-blocks-block-advanced-heading.block-${block_id} .responsive-heading-desc-text {
	font-size: ${subHeadingTitleFontSizeMobile}px;
		}
}
`}
          </Style>
        )}
        <Style>
          {`
            @media only screen and (min-width: 976px){
               .skt-blocks-block-advanced-heading.block-${block_id} {
                  text-align: ${headingAlignment};
               }
             }
             @media only screen and (max-width: 976px){
               .skt-blocks-block-advanced-heading.block-${block_id} {
                  text-align: ${headingAlignmentTablet};
               }
             }
             @media only screen and (max-width: 767px){
               .skt-blocks-block-advanced-heading.block-${block_id} {
                  text-align: ${headingAlignmentMobile};
               }
             }
            `}
        </Style>
      </Fragment>,
      <div
        className={classnames(
          "skt-blocks-block-advanced-heading",
          `block-${block_id}`
        )}
      >
        {showHeading && (
          <RichText.Content
            tagName={headingTag}
            value={headingTitle}
            className="responsive-heading-title-text"
            id={headingId}
            style={{
              fontFamily: headingTitleFontFamily,
              fontWeight: headingTitleFontWeight,
              lineHeight: headingTitleLineHeight,
              letterSpacing: headingTitleLetterSpacing,
              color: headingTitleColor,
            }}
          />
        )}
        {showSeparator && seprator_output}
        {showSubHeading && (
          <RichText.Content
            tagName="p"
            value={headingDesc}
            className="responsive-heading-desc-text"
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
