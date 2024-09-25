/**
 * Internal dependencies
 */
import Testimonial from "./testimonial";
import times from "lodash/times";
import classnames from "classnames";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
  RichText,
  AlignmentToolbar,
  MediaUpload,
  BlockControls,
  InnerBlocks,
  MediaUploadCheck,
  figure,
  URLInput,
} = wp.editor;
const { Button, Dashicon } = wp.components;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      testimonialBlock,
      count,
      gutter,
      testimonialAlignment,
      titleFontFamily,
      titleFontSize,
      titleLineHeight,
      titleFontWeight,
      titleTextTransform,
      nameFontFamily,
      nameFontSize,
      nameLineHeight,
      nameFontWeight,
      nameTextTransform,
      contentFontFamily,
      contentFontSize,
      contentLineHeight,
      contentFontWeight,
      contentTextTransform,
      imageSize,
      imageWidth,
      contentSpacing,
      titleSpacing,
      nameSpacing,
      imageSpacing,
      testimonialTextColor,
      testimonialTitleColor,
      testimonialNameColor,
    } = this.props.attributes;

    return (
      <div
        className={classnames(
          "wp-block-skt-blocks-testimonial-wrapper",
          {
            "has-columns": count > 1,
            [`has-${count}-columns`]: count,
            "has-responsive-columns": count > 1,
            [`has-${gutter}-gutter`]: gutter,
          }
        )}
      >
        {testimonialBlock.map((test, index) => (
          <Testimonial {...this.props}>
            <RichText.Content
              tagName="div"
              className="skt-blocks-testimonial-text"
              style={{
                textAlign: testimonialAlignment,
                fontFamily: contentFontFamily,
                fontSize: contentFontSize,
                lineHeight: contentLineHeight,
                fontWeight: contentFontWeight,
                textTransform: contentTextTransform,
                marginBottom: contentSpacing,
                color: testimonialTextColor,
              }}
              value={testimonialBlock[index]["testimonialContent"]}
            />

            <div
              className="skt-blocks-testimonial-info"
              style={{
                marginBottom: titleSpacing,
              }}
            >
              <div className="skt-blocks-testimonial-inner-block">
                {testimonialBlock[index]["testimonialImgURL"] && (
                  <div
                    className="skt-blocks-testimonial-avatar-wrap"
                    style={{
                      paddingRight: imageSpacing,
                    }}
                  >
                    <div
                      className="skt-blocks-testimonial-image-wrap"
                      style={{
                        height: imageWidth + "px",
                        width: imageWidth + "px",
                      }}
                    >
                      <img
                        className="skt-blocks-testimonial-avatar"
                        src={
                          testimonialBlock[index]["testimonialImgURL"].sizes[
                            imageSize
                          ]
                            ? testimonialBlock[index]["testimonialImgURL"]
                                .sizes[imageSize].url
                            : testimonialBlock[index]["testimonialImgURL"]
                                .sizes["full"].url
                        }
                        alt="avatar"
                        style={{
                          height: imageWidth + "px",
                          width: imageWidth + "px",
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="skt-blocks-testimonial-details">
                  {testimonialBlock[index]["testimonialName"] && (
                    <RichText.Content
                      tagName="h2"
                      className="skt-blocks-testimonial-name"
                      style={{
                        color: testimonialNameColor
                          ? testimonialNameColor
                          : "#32373c",
                        fontFamily: nameFontFamily,
                        fontSize: nameFontSize,
                        lineHeight: nameLineHeight,
                        fontWeight: nameFontWeight,
                        textTransform: nameTextTransform,
                        marginBottom: nameSpacing,
                      }}
                      value={testimonialBlock[index]["testimonialName"]}
                    />
                  )}

                  {testimonialBlock[index]["testimonialTitle"] && (
                    <RichText.Content
                      tagName="small"
                      className="skt-blocks-testimonial-title"
                      style={{
                        color: testimonialTitleColor
                          ? testimonialTitleColor
                          : "#32373c",
                        fontFamily: titleFontFamily,
                        fontSize: titleFontSize,
                        lineHeight: titleLineHeight,
                        fontWeight: titleFontWeight,
                        textTransform: titleTextTransform,
                      }}
                      value={testimonialBlock[index]["testimonialTitle"]}
                    />
                  )}
                </div>
              </div>
            </div>
          </Testimonial>
        ))}
      </div>
    );
  }
}
