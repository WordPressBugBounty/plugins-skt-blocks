/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import times from "lodash/times";
import React from "react";
import Team from "./team";

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
  URLInput,
} = wp.editor;
const { Button, Dashicon, Icon } = wp.components;

import memoize from "memize";
import map from "lodash/map";
import { loadGoogleFont } from "../../../utils/font";

const ALLOWED_MEDIA_TYPES = ["image"];

const getCount = memoize((count) => {
  return times(count, (index) => [
    "skt-blocks/team",
    {
      placeholder: sprintf(
        /* translators: %d: a digit 1-3 */
        __("Team Title %d", "skt-blocks"),
        parseInt(index + 1)
      ),
    },
  ]);
});

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        teamBlock,
        count,
        gutter,
        titleColor,
        designationColor,
        descriptionColor,
        socialIconColor,
        imageSize,
        titleFontFamily,
        descriptionFontFamily,
        designationFontFamily,
        titleFontSize,
        designationFontSize,
        descriptionFontSize,
        titleFontWeight,
        designationFontWeight,
        descriptionFontWeight,
        titleLineHeight,
        designationLineHeight,
        descriptionLineHeight,
        titleSpacing,
        designationSpacing,
        descriptionSpacing,
        socialIconSpacing,
        imageMarginTop,
        imageMarginBottom,
        alignment,
        facebook,
        twitter,
        linkedin,
        instagram,
        email,
        youtube,
        pinterest,
        iconSize,
        imageWidth,
          showImage,
          showName,
          showDesignation,
          showDescription,
          showSocialIcons,
      },
      isSelected,
      setAttributes,
    } = this.props;

    var data_copy = [...teamBlock];

    const onChangeAlignment = (newAlignment) =>
      setAttributes({
        alignment: newAlignment === undefined ? "none" : newAlignment,
      });

    // Responsive spacing (editor preview). Desktop stays as inline styles; the
    // tablet/mobile overrides are injected here as scoped media-query CSS so the
    // editor's device preview reflects them. The front end is handled by a PHP
    // render_block filter, so save output is unchanged (no validation errors).
    const sktRespScope = "skt-team-resp-" + this.props.clientId.substr(0, 8);
    const sktA = this.props.attributes;
    const sktBuildDeviceCSS = (suffix) => {
      const sel = "." + sktRespScope;
      let css = "";
      const num = (k) => {
        const v = sktA[k + suffix];
        return typeof v === "number" ? v : null;
      };
      const ts = num("titleSpacing");
      if (ts !== null)
        css += `${sel} .skt-blocks-team-name{margin-bottom:${ts}px!important}`;
      const ds = num("designationSpacing");
      if (ds !== null)
        css += `${sel} .skt-blocks-team-designation{margin-bottom:${ds}px!important}`;
      const dsc = num("descriptionSpacing");
      if (dsc !== null)
        css += `${sel} .skt-blocks-team-description{margin-bottom:${dsc}px!important}`;
      const si = num("socialIconSpacing");
      if (si !== null)
        css += `${sel} .skt-blocks-team-social-icons li{margin-left:${si}px!important;margin-right:${si}px!important}`;
      const imt = num("imageMarginTop");
      const imb = num("imageMarginBottom");
      const iw = num("imageWidth");
      if (imt !== null || imb !== null || iw !== null) {
        css += `${sel} .skt-blocks-team-avatar{`;
        if (imt !== null) css += `margin-top:${imt}px!important;`;
        if (imb !== null) css += `margin-bottom:${imb}px!important;`;
        if (iw !== null) css += `width:${iw}px!important;`;
        css += `}`;
      }
      return css;
    };
    const sktTabletCSS = sktBuildDeviceCSS("Tablet");
    const sktMobileCSS = sktBuildDeviceCSS("Mobile");
    let sktRespCSS = "";
    if (sktTabletCSS)
      sktRespCSS += `@media (max-width:1024px){${sktTabletCSS}}`;
    if (sktMobileCSS) sktRespCSS += `@media (max-width:767px){${sktMobileCSS}}`;

    return [
      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,

      sktRespCSS ? (
        <style
          key="skt-team-resp-style"
          dangerouslySetInnerHTML={{ __html: sktRespCSS }}
        />
      ) : null,

      // Show the block markup in the editor
      <div
        className={classnames(
          "wp-block-skt-blocks-team-wrapper",
          sktRespScope,
          {
            "has-columns": count > 1,
            [`has-${count}-columns`]: count,
            "has-responsive-columns": count > 1,
            [`has-${gutter}-gutter`]: gutter,
            "skt-hide-desktop": this.props.attributes.hideDesktop,
            "skt-hide-tablet": this.props.attributes.hideTablet,
            "skt-hide-mobile": this.props.attributes.hideMobile,
          }
        )}
      >
        {
          <BlockControls>
            <AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
          </BlockControls>
        }
        {teamBlock.map((test, index) => (
          <Team key={index} {...this.props}>
            { showImage && (
        <div
              className="skt-blocks-team-avatar-wrapper"
              style={{
                textAlign: alignment,
                textAlign: `-webkit-${alignment}`,
              }}
            >
              {titleFontFamily && loadGoogleFont(titleFontFamily)}
              {descriptionFontFamily && loadGoogleFont(descriptionFontFamily)}
              {designationFontFamily && loadGoogleFont(designationFontFamily)}
              <figure
                className="skt-blocks-team-avatar"
                style={{
                  width: imageWidth,
                  marginTop: imageMarginTop,
                  marginBottom: imageMarginBottom,
                }}
              >
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(value) => {
                      var new_content = {
                        teamName: data_copy[index]["teamName"],
                        teamDesignation: data_copy[index]["teamDesignation"],
                        teamDescription: data_copy[index]["teamDescription"],
                        emailAddress: data_copy[index]["emailAddress"],
                        twitterUrl: data_copy[index]["twitterUrl"],
                        facebookUrl: data_copy[index]["facebookUrl"],
                        instagramUrl: data_copy[index]["instagramUrl"],
                        youtubeUrl: data_copy[index]["youtubeUrl"],
                        pinterestUrl: data_copy[index]["pinterestUrl"],
                        linkedinUrl: data_copy[index]["linkedinUrl"],
                        teamImgId: value.id,
                        teamImgURL: value,
                      };
                      data_copy[index] = new_content;
                      setAttributes({ teamBlock: data_copy });
                    }}
                    allowedTypes={["image"]}
                    value={teamBlock[index]["teamImgURL"]}
                    render={({ open }) => (
                      <Button onClick={open}>
                        {!teamBlock[index]["teamImgURL"] ? (
                          <Dashicon icon="format-image" />
                        ) : (
                          <img
                            className="skt-blocks-team-avatar-img"
                            src={
                              teamBlock[index]["teamImgURL"].sizes[imageSize]
                                ? teamBlock[index]["teamImgURL"].sizes[
                                    imageSize
                                  ].url
                                : teamBlock[index]["teamImgURL"].sizes["full"]
                                    .url
                            }
                            alt="avatar"
                          />
                        )}
                      </Button>
                    )}
                  ></MediaUpload>
                </MediaUploadCheck>
              </figure>
            </div>
        )}
            <div className={"skt-blocks-team-content"}>
            { showName && (
            <RichText
                tagName="h3"
                placeholder={__("John Doe", "skt-blocks")}
                keepPlaceholderOnFocus
                value={teamBlock[index]["teamName"]}
                className="skt-blocks-team-name"
                style={{
                  color: titleColor,
                  fontFamily: titleFontFamily,
                  fontSize: titleFontSize,
                  fontWeight: titleFontWeight,
                  lineHeight: titleLineHeight,
                  marginBottom: titleSpacing,
                }}
                onChange={(value) => {
                  var new_content = {
                    teamName: value,
                    teamDesignation: data_copy[index]["teamDesignation"],
                    teamDescription: data_copy[index]["teamDescription"],
                    teamImgId: data_copy[index]["teamImgId"],
                    teamImgURL: data_copy[index]["teamImgURL"],
                    emailAddress: data_copy[index]["emailAddress"],
                    twitterUrl: data_copy[index]["twitterUrl"],
                    facebookUrl: data_copy[index]["facebookUrl"],
                    instagramUrl: data_copy[index]["instagramUrl"],
                    youtubeUrl: data_copy[index]["youtubeUrl"],
                    pinterestUrl: data_copy[index]["pinterestUrl"],
                    linkedinUrl: data_copy[index]["linkedinUrl"],
                  };
                  data_copy[index] = new_content;
                  setAttributes({ teamBlock: data_copy });
                }}
              />
        )}
            { showDesignation && (
              <RichText
                tagName="div"
                placeholder={__(
                  "Designation",
                  "skt-blocks"
                )}
                keepPlaceholderOnFocus
                value={teamBlock[index]["teamDesignation"]}
                formattingControls={["bold", "italic", "strikethrough", "link"]}
                className={classnames(
                  "skt-blocks-team-designation"
                )}
                style={{
                  color: designationColor,
                  fontFamily: designationFontFamily,
                  fontSize: designationFontSize,
                  fontWeight: designationFontWeight,
                  lineHeight: designationLineHeight,
                  marginBottom: designationSpacing,
                }}
                onChange={(value) => {
                  var new_content = {
                    teamName: data_copy[index]["teamName"],
                    teamDesignation: value,
                    teamDescription: data_copy[index]["teamDescription"],
                    teamImgId: data_copy[index]["teamImgId"],
                    teamImgURL: data_copy[index]["teamImgURL"],
                    emailAddress: data_copy[index]["emailAddress"],
                    twitterUrl: data_copy[index]["twitterUrl"],
                    facebookUrl: data_copy[index]["facebookUrl"],
                    instagramUrl: data_copy[index]["instagramUrl"],
                    youtubeUrl: data_copy[index]["youtubeUrl"],
                    pinterestUrl: data_copy[index]["pinterestUrl"],
                    linkedinUrl: data_copy[index]["linkedinUrl"],
                  };
                  data_copy[index] = new_content;
                  setAttributes({ teamBlock: data_copy });
                }}
              />
        )}
            { showDescription && (
              <RichText
                tagName="div"
                placeholder={__(
                  "Click here to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                  "skt-blocks"
                )}
                keepPlaceholderOnFocus
                value={teamBlock[index]["teamDescription"]}
                formattingControls={["bold", "italic", "strikethrough", "link"]}
                className={classnames(
                  "skt-blocks-team-description"
                )}
                style={{
                  color: descriptionColor,
                  fontFamily: descriptionFontFamily,
                  fontSize: descriptionFontSize,
                  fontWeight: descriptionFontWeight,
                  lineHeight: descriptionLineHeight,
                  marginBottom: descriptionSpacing,
                }}
                onChange={(value) => {
                  var new_content = {
                    teamName: data_copy[index]["teamName"],
                    teamDesignation: data_copy[index]["teamDesignation"],
                    teamDescription: value,
                    teamImgId: data_copy[index]["teamImgId"],
                    teamImgURL: data_copy[index]["teamImgURL"],
                    twitterUrl: data_copy[index]["twitterUrl"],
                    emailAddress: data_copy[index]["emailAddress"],
                    facebookUrl: data_copy[index]["facebookUrl"],
                    instagramUrl: data_copy[index]["instagramUrl"],
                    youtubeUrl: data_copy[index]["youtubeUrl"],
                    pinterestUrl: data_copy[index]["pinterestUrl"],
                    linkedinUrl: data_copy[index]["linkedinUrl"],
                  };
                  data_copy[index] = new_content;
                  setAttributes({ teamBlock: data_copy });
                }}
              />
            )}
            {showSocialIcons && (
              <div className="skt-blocks-team-social-icons-wrapper">
                {/* Editor-only: WP 6.x's iframe canvas does not always load the
                    dashicons font, so the social glyphs stay blank there while
                    showing on the front end. Pull dashicons into the iframe. */}
                <link
                  rel="stylesheet"
                  href="/wp-includes/css/dashicons.min.css"
                />
                <ul className="skt-blocks-team-social-icons edit-block">
                  {!twitter && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["twitterUrl"]}>
                        <span
                          className="dashicons dashicons-twitter"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                      {isSelected && (
                        <form
                          key="form-link"
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <Dashicon icon={"admin-links"} />
                          <URLInput
                            className="button-url"
                            value={teamBlock[index]["twitterUrl"]}
                            onChange={(value) => {
                              var new_content = {
                                twitterUrl: value,
                                teamName: data_copy[index]["teamName"],
                                teamDesignation:
                                  data_copy[index]["teamDesignation"],
                                teamDescription:
                                  data_copy[index]["teamDescription"],
                                teamImgId: data_copy[index]["teamImgId"],
                                teamImgURL: data_copy[index]["teamImgURL"],
                                emailAddress: data_copy[index]["emailAddress"],
                                facebookUrl: data_copy[index]["facebookUrl"],
                                instagramUrl: data_copy[index]["instagramUrl"],
                                youtubeUrl: data_copy[index]["youtubeUrl"],
                                pinterestUrl: data_copy[index]["pinterestUrl"],
                                linkedinUrl: data_copy[index]["linkedinUrl"],
                              };
                              data_copy[index] = new_content;
                              setAttributes({ teamBlock: data_copy });
                            }}
                          />
                          <Button
                            label={__(
                              "Apply",
                              "skt-blocks"
                            )}
                            type="submit"
                          >
                            <Icon icon="editor-break" />
                          </Button>
                        </form>
                      )}
                    </li>
                  )}
                  {!facebook && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["facebookUrl"]}>
                        <span
                          className="dashicons dashicons-facebook"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                      {isSelected && (
                        <form
                          key="form-link"
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <Dashicon icon={"admin-links"} />
                          <URLInput
                            className="button-url"
                            value={teamBlock[index]["facebookUrl"]}
                            onChange={(value) => {
                              var new_content = {
                                facebookUrl: value,
                                teamName: data_copy[index]["teamName"],
                                teamDesignation:
                                  data_copy[index]["teamDesignation"],
                                teamDescription:
                                  data_copy[index]["teamDescription"],
                                teamImgId: data_copy[index]["teamImgId"],
                                teamImgURL: data_copy[index]["teamImgURL"],
                                emailAddress: data_copy[index]["emailAddress"],
                                twitterUrl: data_copy[index]["twitterUrl"],
                                instagramUrl: data_copy[index]["instagramUrl"],
                                youtubeUrl: data_copy[index]["youtubeUrl"],
                                pinterestUrl: data_copy[index]["pinterestUrl"],
                                linkedinUrl: data_copy[index]["linkedinUrl"],
                              };
                              data_copy[index] = new_content;
                              setAttributes({ teamBlock: data_copy });
                            }}
                          />
                          <Button
                            label={__(
                              "Apply",
                              "skt-blocks"
                            )}
                            type="submit"
                          >
                            <Icon icon="editor-break" />
                          </Button>
                        </form>
                      )}
                    </li>
                  )}
                  {!linkedin && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["linkedinUrl"]}>
                        <span
                          className="dashicons dashicons-linkedin"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                      {isSelected && (
                        <form
                          key="form-link"
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <Dashicon icon={"admin-links"} />
                          <URLInput
                            className="button-url"
                            value={teamBlock[index]["linkedinUrl"]}
                            onChange={(value) => {
                              var new_content = {
                                linkedinUrl: value,
                                teamName: data_copy[index]["teamName"],
                                teamDesignation:
                                  data_copy[index]["teamDesignation"],
                                teamDescription:
                                  data_copy[index]["teamDescription"],
                                teamImgId: data_copy[index]["teamImgId"],
                                teamImgURL: data_copy[index]["teamImgURL"],
                                facebookUrl: data_copy[index]["facebookUrl"],
                                emailAddress: data_copy[index]["emailAddress"],
                                instagramUrl: data_copy[index]["instagramUrl"],
                                youtubeUrl: data_copy[index]["youtubeUrl"],
                                pinterestUrl: data_copy[index]["pinterestUrl"],
                                twitterUrl: data_copy[index]["twitterUrl"],
                              };
                              data_copy[index] = new_content;
                              setAttributes({ teamBlock: data_copy });
                            }}
                          />
                          <Button
                            label={__(
                              "Apply",
                              "skt-blocks"
                            )}
                            type="submit"
                          >
                            <Icon icon="editor-break" />
                          </Button>
                        </form>
                      )}
                    </li>
                  )}
                  {!instagram && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["instagramUrl"]}>
                        <span
                          className="dashicons dashicons-instagram"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                      {isSelected && (
                        <form
                          key="form-link"
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <Dashicon icon={"admin-links"} />
                          <URLInput
                            className="button-url"
                            value={teamBlock[index]["instagramUrl"]}
                            onChange={(value) => {
                              var new_content = {
                                instagramUrl: value,
                                teamName: data_copy[index]["teamName"],
                                teamDesignation:
                                  data_copy[index]["teamDesignation"],
                                teamDescription:
                                  data_copy[index]["teamDescription"],
                                teamImgId: data_copy[index]["teamImgId"],
                                teamImgURL: data_copy[index]["teamImgURL"],
                                facebookUrl: data_copy[index]["facebookUrl"],
                                emailAddress: data_copy[index]["emailAddress"],
                                twitterUrl: data_copy[index]["twitterUrl"],
                                youtubeUrl: data_copy[index]["youtubeUrl"],
                                pinterestUrl: data_copy[index]["pinterestUrl"],
                                linkedinUrl: data_copy[index]["linkedinUrl"],
                              };
                              data_copy[index] = new_content;
                              setAttributes({ teamBlock: data_copy });
                            }}
                          />
                          <Button
                            label={__(
                              "Apply",
                              "skt-blocks"
                            )}
                            type="submit"
                          >
                            <Icon icon="editor-break" />
                          </Button>
                        </form>
                      )}
                    </li>
                  )}
                  {!email && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["emailAddress"]}>
                        <span
                          className="dashicons dashicons-email"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                      {isSelected && (
                        <form
                          key="form-link"
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <Dashicon icon={"admin-links"} />
                          <URLInput
                            className="button-url"
                            value={teamBlock[index]["emailAddress"]}
                            onChange={(value) => {
                              var new_content = {
                                emailAddress: value,
                                teamName: data_copy[index]["teamName"],
                                teamDesignation:
                                  data_copy[index]["teamDesignation"],
                                teamDescription:
                                  data_copy[index]["teamDescription"],
                                teamImgId: data_copy[index]["teamImgId"],
                                teamImgURL: data_copy[index]["teamImgURL"],
                                facebookUrl: data_copy[index]["facebookUrl"],
                                instagramUrl: data_copy[index]["instagramUrl"],
                                twitterUrl: data_copy[index]["twitterUrl"],
                                youtubeUrl: data_copy[index]["youtubeUrl"],
                                pinterestUrl: data_copy[index]["pinterestUrl"],
                                linkedinUrl: data_copy[index]["linkedinUrl"],
                              };
                              data_copy[index] = new_content;
                              setAttributes({ teamBlock: data_copy });
                            }}
                          />
                          <Button
                            label={__(
                              "Apply",
                              "skt-blocks"
                            )}
                            type="submit"
                          >
                            <Icon icon="editor-break" />
                          </Button>
                        </form>
                      )}
                    </li>
                  )}
                  {!youtube && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["youtubeUrl"]}>
                        <span
                          className="dashicons dashicons-youtube"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                      {isSelected && (
                        <form
                          key="form-link"
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <Dashicon icon={"admin-links"} />
                          <URLInput
                            className="button-url"
                            value={teamBlock[index]["youtubeUrl"]}
                            onChange={(value) => {
                              var new_content = {
                                youtubeUrl: value,
                                teamName: data_copy[index]["teamName"],
                                teamDesignation:
                                  data_copy[index]["teamDesignation"],
                                teamDescription:
                                  data_copy[index]["teamDescription"],
                                teamImgId: data_copy[index]["teamImgId"],
                                teamImgURL: data_copy[index]["teamImgURL"],
                                facebookUrl: data_copy[index]["facebookUrl"],
                                emailAddress: data_copy[index]["emailAddress"],
                                instagramUrl: data_copy[index]["instagramUrl"],
                                twitterUrl: data_copy[index]["twitterUrl"],
                                pinterestUrl: data_copy[index]["pinterestUrl"],
                                linkedinUrl: data_copy[index]["linkedinUrl"],
                              };
                              data_copy[index] = new_content;
                              setAttributes({ teamBlock: data_copy });
                            }}
                          />
                          <Button
                            label={__(
                              "Apply",
                              "skt-blocks"
                            )}
                            type="submit"
                          >
                            <Icon icon="editor-break" />
                          </Button>
                        </form>
                      )}
                    </li>
                  )}
                  {!pinterest && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["pinterestUrl"]}>
                        <span
                          className="dashicons dashicons-pinterest"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                      {isSelected && (
                        <form
                          key="form-link"
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <Dashicon icon={"admin-links"} />
                          <URLInput
                            className="button-url"
                            value={teamBlock[index]["pinterestUrl"]}
                            onChange={(value) => {
                              var new_content = {
                                pinterestUrl: value,
                                teamName: data_copy[index]["teamName"],
                                teamDesignation:
                                  data_copy[index]["teamDesignation"],
                                teamDescription:
                                  data_copy[index]["teamDescription"],
                                teamImgId: data_copy[index]["teamImgId"],
                                teamImgURL: data_copy[index]["teamImgURL"],
                                facebookUrl: data_copy[index]["facebookUrl"],
                                emailAddress: data_copy[index]["emailAddress"],
                                instagramUrl: data_copy[index]["instagramUrl"],
                                youtubeUrl: data_copy[index]["youtubeUrl"],
                                twitterUrl: data_copy[index]["twitterUrl"],
                                linkedinUrl: data_copy[index]["linkedinUrl"],
                              };
                              data_copy[index] = new_content;
                              setAttributes({ teamBlock: data_copy });
                            }}
                          />
                          <Button
                            label={__(
                              "Apply",
                              "skt-blocks"
                            )}
                            type="submit"
                          >
                            <Icon icon="editor-break" />
                          </Button>
                        </form>
                      )}
                    </li>
                  )}
                </ul>
              </div>
            )}
            </div>
          </Team>
        ))}
      </div>,
    ];
  }
}
