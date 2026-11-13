/**
 * Internal dependencies
 */
import Team from "./team";
import times from "lodash/times";
import React from "react";
import classnames from "classnames";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText, InnerBlocks } = wp.editor;
const { Dashicon } = wp.components;

import memoize from "memize";
import map from "lodash/map";

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      teamBlock,
      count,
      gutter,
      teamId,
      titleColor,
      designationColor,
      descriptionColor,
      socialIconColor,
      titleFontFamily,
      descriptionFontFamily,
      designationFontFamily,
      titleFontSize,
      designationFontSize,
      descriptionFontSize,
      iconSize,
      titleFontWeight,
      designationFontWeight,
      descriptionFontWeight,
      titleLineHeight,
      designationLineHeight,
      descriptionLineHeight,
      imageSize,
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
      imageWidth,
        showImage,
        showName,
        showDesignation,
        showDescription,
        showSocialIcons,
    } = this.props.attributes;

    return (
      <div
        className={classnames(
          "wp-block-skt-blocks-team-wrapper",
          {
            "has-columns": count > 1,
            [`has-${count}-columns`]: count,
            "has-responsive-columns": count > 1,
            [`has-${gutter}-gutter`]: gutter,
          }
        )}
      >
        {teamBlock.map((test, index) => (
          <Team {...this.props}>
            {teamBlock[index]["teamImgURL"] && showImage && (
              <div
                className="skt-blocks-team-avatar-wrapper"
                style={{
                  textAlign: alignment,
                  textAlign: `-webkit-${alignment}`,
                }}
              >
                <figure
                  className={"skt-blocks-team-avatar"}
                  style={{
                    width: imageWidth,
                    marginTop: imageMarginTop,
                    marginBottom: imageMarginBottom,
                    textAlign: "justify",
                  }}
                >
                  <img
                    className="skt-blocks-team-avatar-img"
                    src={
                      teamBlock[index]["teamImgURL"].sizes[imageSize]
                        ? teamBlock[index]["teamImgURL"].sizes[imageSize].url
                        : teamBlock[index]["teamImgURL"].sizes["full"].url
                    }
                    alt={name}
                  />
                </figure>
              </div>
            )}
            <div className={"skt-blocks-team-content"}>
              {teamBlock[index]["teamName"] && showName && (
                <RichText.Content
                  tagName="h3"
                  className="skt-blocks-team-name"
                  style={{
                    color: titleColor,
                    fontFamily: titleFontFamily,
                    fontSize: titleFontSize,
                    fontWeight: titleFontWeight,
                    lineHeight: titleLineHeight,
                    marginBottom: titleSpacing,
                  }}
                  value={teamBlock[index]["teamName"]}
                />
              )}

              {teamBlock[index]["teamDesignation"] && showDesignation && (
                <RichText.Content
                  tagName="div"
                  className="skt-blocks-team-designation"
                  style={{
                    color: designationColor,
                    fontFamily: designationFontFamily,
                    fontSize: designationFontSize,
                    fontWeight: designationFontWeight,
                    lineHeight: designationLineHeight,
                    marginBottom: designationSpacing,
                  }}
                  value={teamBlock[index]["teamDesignation"]}
                />
              )}

              {teamBlock[index]["teamDescription"] && showDescription && (
                <RichText.Content
                  tagName="div"
                  className="skt-blocks-team-description"
                  style={{
                    color: descriptionColor,
                    fontFamily: descriptionFontFamily,
                    fontSize: descriptionFontSize,
                    fontWeight: descriptionFontWeight,
                    lineHeight: descriptionLineHeight,
                    marginBottom: descriptionSpacing,
                  }}
                  value={teamBlock[index]["teamDescription"]}
                />
              )}

            {showSocialIcons && (
              <div className="skt-blocks-team-social-icons-wrapper">
                <ul className="skt-blocks-team-social-icons">
                  {!twitter && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={teamBlock[index]["twitterUrl"]}>
                        <span
                          class="dashicons dashicons-twitter"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
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
                          class="dashicons dashicons-facebook"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
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
                          class="dashicons dashicons-linkedin"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
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
                          class="dashicons dashicons-instagram"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                    </li>
                  )}
                  {!email && (
                    <li
                      style={{
                        marginLeft: socialIconSpacing,
                        marginRight: socialIconSpacing,
                      }}
                    >
                      <a href={"mailto:" + teamBlock[index]["emailAddress"]}>
                        <span
                          class="dashicons dashicons-email"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
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
                          class="dashicons dashicons-youtube"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
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
                          class="dashicons dashicons-pinterest"
                          style={{
                            color: socialIconColor,
                            fontSize: iconSize,
                            textDecoration: "none",
                            height: iconSize,
                            width: iconSize,
                          }}
                        ></span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
            </div>
          </Team>
        ))}
      </div>
    );
  }
}
