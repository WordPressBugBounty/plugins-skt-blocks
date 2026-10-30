/**
 * Internal dependencies
 */

import times from "lodash/times";
import classnames from "classnames";
import Inspector from "./inspector";
import Testimonial from "./testimonial";
import icons from "./../../../utils/components/icons";
import { loadGoogleFont } from "../../../utils/font";
import { inherited, previewSuffix } from "./responsive-utils";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;
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

class Edit extends Component {
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
        hideDesktop,
        hideTablet,
        hideMobile,
      },
      setAttributes,
    } = this.props;

    // Size of the little "remove image" cross follows the avatar width, so it
    // no longer covers a small avatar (min 12px, max 20px).
    const removeSize = (w) =>
      Math.min(20, Math.max(12, Math.round((Number(w) || 55) * 0.4)));

    // Live preview: avatar width for the editor's current preview device.
    const liveImageWidth = inherited(
      this.props.attributes,
      "imageWidth",
      previewSuffix(this.props.deviceType)
    );

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
            "skt-hide-desktop": hideDesktop,
            "skt-hide-tablet": hideTablet,
            "skt-hide-mobile": hideMobile,
          }
        )}
      >
        {/*
          Editor-only: WP 6.x renders the canvas in an iframe, so the column
          layout CSS enqueued to the top document never reaches it. Injecting
          this <style> INSIDE the wrapper guarantees it lands in the iframe, and
          targeting the box by its own class makes the boxes sit in one row in
          the editor just like the front end. Not part of the saved output.
        */}
        <style>
          {`
            .wp-block-skt-blocks-testimonial-wrapper.has-columns{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:stretch;width:100%}
            .wp-block-skt-blocks-testimonial-wrapper.has-columns .skt-blocks-block-testimonial{box-sizing:border-box}
            .wp-block-skt-blocks-testimonial-wrapper.has-2-columns .skt-blocks-block-testimonial{flex:0 1 48%;max-width:48%}
            .wp-block-skt-blocks-testimonial-wrapper.has-3-columns .skt-blocks-block-testimonial{flex:0 1 31.5%;max-width:31.5%}
            .wp-block-skt-blocks-testimonial-wrapper.has-4-columns .skt-blocks-block-testimonial{flex:0 1 23%;max-width:23%}
            .wp-block-skt-blocks-testimonial-wrapper .skt-blocks-block-testimonial{overflow:hidden}
            .wp-block-skt-blocks-testimonial-wrapper.skt-hide-desktop,
            .wp-block-skt-blocks-testimonial-wrapper.skt-hide-tablet,
            .wp-block-skt-blocks-testimonial-wrapper.skt-hide-mobile{display:block !important;opacity:.55}
            .wp-block-skt-blocks-testimonial-wrapper.has-columns.skt-hide-desktop,
            .wp-block-skt-blocks-testimonial-wrapper.has-columns.skt-hide-tablet,
            .wp-block-skt-blocks-testimonial-wrapper.has-columns.skt-hide-mobile{display:flex !important}
            .skt-blocks-block-testimonial.has-ts-shadow-live:not(:hover){box-shadow:var(--skt-ts-shadow-live) !important}
            .wp-block-skt-blocks-testimonial-wrapper .skt-blocks-testimonial-name,
            .wp-block-skt-blocks-testimonial-wrapper .skt-blocks-testimonial-title{overflow-wrap:anywhere;word-break:break-word}
          `}
        </style>
        {testimonialBlock.map((test, index) => (
          <Testimonial key={index} {...this.props} isEditorPreview>
            {titleFontFamily && loadGoogleFont(titleFontFamily)}
            {nameFontFamily && loadGoogleFont(nameFontFamily)}
            {contentFontFamily && loadGoogleFont(contentFontFamily)}
            <RichText
              tagName="div"
              identifier={"testimonialContent-" + index}
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
                      height: liveImageWidth + "px",
                      width: liveImageWidth + "px",
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
                                  height: liveImageWidth + "px",
                                  width: liveImageWidth + "px",
                                }}
                              />
                            )}
                          </Button>
                          {testimonialBlock[index]["testimonialImgId"] && (
                            <Button
                              className="skt-blocks-remove-image"
                              style={{
                                position: "absolute",
                                top: -removeSize(liveImageWidth) / 2,
                                right: -removeSize(liveImageWidth) / 2,
                                width: removeSize(liveImageWidth),
                                height: removeSize(liveImageWidth),
                                minWidth: 0,
                                padding: 0,
                                borderRadius: "50%",
                                background: "#fff",
                                lineHeight: 1,
                                zIndex: 20,
                              }}
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
                              <Dashicon
                                icon={"dismiss"}
                                size={removeSize(liveImageWidth)}
                              />
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
                    identifier={"testimonialName-" + index}
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
                    identifier={"testimonialTitle-" + index}
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