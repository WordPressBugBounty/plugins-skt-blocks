/**
 * Internal dependencies
 */

import times from "lodash/times";
import classnames from "classnames";
import Inspector from "./inspector";
import Testimonial from "./testimonial";
import icons from "./../../../utils/components/icons";
import { loadGoogleFont } from "../../../utils/font";

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

const ALLOWED_MEDIA_TYPES = ["image"];

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
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
      },
      setAttributes,
    } = this.props;

    var data_copy = [...testimonialBlock];

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={testimonialAlignment}
          onChange={(value) => setAttributes({ testimonialAlignment: value })}
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,

      // Show the block markup in the editor
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
            {titleFontFamily && loadGoogleFont(titleFontFamily)}
            {nameFontFamily && loadGoogleFont(nameFontFamily)}
            {contentFontFamily && loadGoogleFont(contentFontFamily)}
            <RichText
              tagName="div"
              multiline="p"
              placeholder={__(
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                "skt-blocks"
              )}
              keepPlaceholderOnFocus
              value={testimonialBlock[index]["testimonialContent"]}
              formattingControls={["bold", "italic", "strikethrough", "link"]}
              className={classnames(
                "skt-blocks-testimonial-text"
              )}
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
              onChange={(value) => {
                var new_content = {
                  testimonialContent: value,
                  testimonialTitle: data_copy[index]["testimonialTitle"],
                  testimonialName: data_copy[index]["testimonialName"],
                  testimonialImgId: data_copy[index]["testimonialImgId"],
                  testimonialImgURL: data_copy[index]["testimonialImgURL"],
                };
                data_copy[index] = new_content;
                setAttributes({ testimonialBlock: data_copy });
              }}
            />

            <div
              className="skt-blocks-testimonial-info"
              style={{
                marginBottom: titleSpacing,
              }}
            >
              <div className="skt-blocks-testimonial-inner-block">
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
                    <MediaUpload
                      buttonProps={{
                        className: "change-image",
                      }}
                      onSelect={(value) => {
                        var new_content = {
                          testimonialContent:
                            data_copy[index]["testimonialContent"],
                          testimonialTitle:
                            data_copy[index]["testimonialTitle"],
                          testimonialName: data_copy[index]["testimonialName"],
                          testimonialImgId: value.id,
                          testimonialImgURL: value,
                        };
                        data_copy[index] = new_content;
                        setAttributes({ testimonialBlock: data_copy });
                      }}
                      allowed={ALLOWED_MEDIA_TYPES}
                      type="image"
                      value={testimonialBlock[index]["testimonialImgId"]}
                      render={({ open }) => (
                        <Fragment>
                          <Button
                            className={
                              testimonialBlock[index]["testimonialImgId"]
                                ? "skt-blocks-change-image"
                                : "skt-blocks-add-image"
                            }
                            onClick={open}
                          >
                            {!testimonialBlock[index]["testimonialImgId"] ? (
                              icons.upload
                            ) : (
                              <img
                                className="skt-blocks-testimonial-avatar"
                                src={
                                  testimonialBlock[index]["testimonialImgURL"]
                                    .sizes[imageSize]
                                    ? testimonialBlock[index][
                                        "testimonialImgURL"
                                      ].sizes[imageSize].url
                                    : testimonialBlock[index][
                                        "testimonialImgURL"
                                      ].sizes["full"].url
                                }
                                alt="avatar"
                                style={{
                                  height: imageWidth + "px",
                                  width: imageWidth + "px",
                                }}
                              />
                            )}
                          </Button>
                          {testimonialBlock[index]["testimonialImgId"] && (
                            <Button
                              className="skt-blocks-remove-image"
                              onClick={(value) => {
                                var new_content = {
                                  testimonialContent:
                                    data_copy[index]["testimonialContent"],
                                  testimonialTitle:
                                    data_copy[index]["testimonialTitle"],
                                  testimonialName:
                                    data_copy[index]["testimonialName"],
                                  testimonialImgId: null,
                                  testimonialImgURL: null,
                                };
                                data_copy[index] = new_content;
                                setAttributes({ testimonialBlock: data_copy });
                              }}
                            >
                              <Dashicon icon={"dismiss"} />
                            </Button>
                          )}
                        </Fragment>
                      )}
                    ></MediaUpload>
                  </div>
                </div>

                <div className="skt-blocks-testimonial-details">
                  <RichText
                    tagName="h2"
                    placeholder={__(
                      "John Doe",
                      "skt-blocks"
                    )}
                    keepPlaceholderOnFocus
                    value={testimonialBlock[index]["testimonialName"]}
                    className="skt-blocks-testimonial-name"
                    style={{
                      color: testimonialNameColor,
                      margin: 0,
                      marginBottom: 5,
                      fontFamily: nameFontFamily,
                      fontSize: nameFontSize,
                      lineHeight: nameLineHeight,
                      fontWeight: nameFontWeight,
                      textTransform: nameTextTransform,
                      marginBottom: nameSpacing,
                    }}
                    onChange={(value) => {
                      var new_content = {
                        testimonialContent:
                          data_copy[index]["testimonialContent"],
                        testimonialTitle: data_copy[index]["testimonialTitle"],
                        testimonialName: value,
                        testimonialImgId: data_copy[index]["testimonialImgId"],
                        testimonialImgURL:
                          data_copy[index]["testimonialImgURL"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ testimonialBlock: data_copy });
                    }}
                  />

                  <RichText
                    tagName="small"
                    placeholder={__(
                      "Add title/designation",
                      "skt-blocks"
                    )}
                    keepPlaceholderOnFocus
                    value={testimonialBlock[index]["testimonialTitle"]}
                    className="skt-blocks-testimonial-title"
                    style={{
                      color: testimonialTitleColor,
                      fontFamily: titleFontFamily,
                      fontSize: titleFontSize,
                      lineHeight: titleLineHeight,
                      fontWeight: titleFontWeight,
                      textTransform: titleTextTransform,
                    }}
                    onChange={(value) => {
                      var new_content = {
                        testimonialContent:
                          data_copy[index]["testimonialContent"],
                        testimonialTitle: value,
                        testimonialName: data_copy[index]["testimonialName"],
                        testimonialImgId: data_copy[index]["testimonialImgId"],
                        testimonialImgURL:
                          data_copy[index]["testimonialImgURL"],
                      };
                      data_copy[index] = new_content;
                      setAttributes({ testimonialBlock: data_copy });
                    }}
                  />
                </div>
              </div>
            </div>
          </Testimonial>
        ))}
      </div>,
    ];
  }
}
