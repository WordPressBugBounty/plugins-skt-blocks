/**
 * External dependencies
 */

import isUndefined from "lodash/isUndefined";
import pickBy from "lodash/pickBy";
import moment from "moment";
import classnames from "classnames";
import Inspector from "./inspector";
import PostGridImage from "./image";
import AlignClass from ".././align-classes";
import ContentTmClasses from ".././classes";
import DayAlignClass from ".././day-align-classes";
import renderSVG from "../../../renderIcon";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import generateCSSUnit from "../../../generateCSSUnit";
import React from "react";
import Style from "style-it";
import { loadGoogleFont } from "../../../utils/font";

const { compose } = wp.compose;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;

const {
  Placeholder,
  Spinner,
  Toolbar,
  Icon,
  SelectControl,
  PanelBody,
} = wp.components;

const {
  BlockAlignmentToolbar,
  BlockControls,
  InspectorControls,
} = wp.blockEditor;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

class LatestPostsBlock extends Component {
  constructor() {
    super(...arguments);
    this.onSelectTaxonomyType = this.onSelectTaxonomyType.bind(this);
  }
  onSelectTaxonomyType(value) {
    const { setAttributes } = this.props;

    setAttributes({ taxonomyType: value });
    setAttributes({ categories: "" });
  }
  componentDidMount() {
    this.props.setAttributes({ block_id: this.props.clientId.substr(0, 8) });
  }
  render() {
    const {
      attributes,
      setAttributes,
      latestPosts,
      taxonomyList,
      categoriesList,
    } = this.props;

    // Check if there are posts
    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;

    // Check the post type
    const isPost = "post" === attributes.postType;

    if (!hasPosts) {
      return (
        <Fragment>
          <Inspector {...{ setAttributes, ...this.props }} />
          <Placeholder
            icon="admin-post"
            label={__("Post Timeline", "skt-blocks")}
          >
            {!Array.isArray(latestPosts) ? (
              <Spinner />
            ) : (
              __("No posts found.", "skt-blocks")
            )}
          </Placeholder>
        </Fragment>
      );
    }

    // Removing posts from display should be instant.
    const displayPosts =
      latestPosts.length > attributes.postsToShow
        ? latestPosts.slice(0, attributes.postsToShow)
        : latestPosts;

    // Get the section tag
    const SectionTag = attributes.sectionTag
      ? attributes.sectionTag
      : "section";

    // Get the section title tag
    const SectionTitleTag = attributes.sectionTitleTag
      ? attributes.sectionTitleTag
      : "h2";

    // Get the post title tag
    const PostTag = attributes.postTitleTag ? attributes.postTitleTag : "h3";

    var content_align_class = AlignClass(this.props.attributes, 0); // Get classname for layout alignment
    var day_align_class = DayAlignClass(this.props.attributes, 0); // Get classname for day alignment.

    var boxShadowPositionCSS = attributes.boxShadowPosition;

    if ("outset" === attributes.boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    let taxonomyListOptions = [{ value: "", label: __("Select Taxonomy") }];

    let categoryListOptions = [{ value: "", label: __("All") }];

    if ("" != taxonomyList) {
      Object.keys(taxonomyList).map((item, thisIndex) => {
        return taxonomyListOptions.push({
          value: taxonomyList[item]["name"],
          label: taxonomyList[item]["label"],
        });
      });
    }

    if ("" != categoriesList) {
      Object.keys(categoriesList).map((item, thisIndex) => {
        return categoryListOptions.push({
          value: categoriesList[item]["id"],
          label: categoriesList[item]["name"],
        });
      });
    }

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Query")} initialOpen={true}>
            {"" != taxonomyList && (
              <SelectControl
                label={__("Taxonomy")}
                value={attributes.taxonomyType}
                onChange={(value) => this.onSelectTaxonomyType(value)}
                options={taxonomyListOptions}
              />
            )}
            {"" != categoriesList && (
              <Fragment>
                <SelectControl
                  label={taxonomyList[attributes.taxonomyType]["label"]}
                  value={attributes.categories}
                  onChange={(value) => setAttributes({ categories: value })}
                  options={categoryListOptions}
                />
              </Fragment>
            )}
          </PanelBody>
        </InspectorControls>
        <Inspector {...{ setAttributes, ...this.props }} />
        <Style>
          {`
		  .wp-block-skt-blocks-post-timeline-${
        attributes.block_id
      } .skt-blocks-timeline__icon-new svg {
		   width: ${generateCSSUnit(attributes.iconSize, "px")};
		   height: ${generateCSSUnit(attributes.iconSize, "px")};
		   fill: ${attributes.iconColor};
	   }

	   .wp-block-skt-blocks-post-timeline-${
       attributes.block_id
     } .skt-blocks-timeline__icon-new svg:hover {
		   fill: ${attributes.iconFocus};
	   }

		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__marker {
			border: ${generateCSSUnit(attributes.borderWidth, "px solid")};
			border-color: ${attributes.separatorBorder};
			background-color: ${attributes.separatorBg};
			min-width: ${generateCSSUnit(attributes.bgSize, "px")};
 		   min-height: ${generateCSSUnit(attributes.bgSize, "px")};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__marker:hover {
			border-color: ${attributes.borderFocus};
			background-color: ${attributes.iconBgFocus};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__line {
			background-color: ${attributes.connectorColor};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__line:hover {
			background-color: ${attributes.separatorFillColor};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__link_parent {
			background-color: ${attributes.continuebgColor};
			border: 1px solid ${attributes.borderColor};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__link_parent:hover {
			background-color: ${attributes.continuebghColor};
			border: 1px solid ${attributes.borderHColor};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__link_parent .skt-blocks-timeline__link {
			color: ${attributes.continueColor} !important;
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__link_parent .skt-blocks-timeline__link:hover {
			color: ${attributes.hColor} !important;
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__center-block .skt-blocks-timeline__marker {
			margin-left: ${generateCSSUnit(attributes.horSpace, "px")};
			margin-right: ${generateCSSUnit(attributes.horSpace, "px")};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__left-block .skt-blocks-timeline__day-new {
			margin-left: ${generateCSSUnit(attributes.horSpace, "px")};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__right-block .skt-blocks-timeline__day-new {
			margin-left: ${generateCSSUnit(attributes.horSpace, "px")};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__field.skt-blocks-timeline__field-wrap {
			margin-bottom: ${generateCSSUnit(attributes.verSpace, "px")};
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__left-block .skt-blocks-timeline__line{
			left: calc(${attributes.bgSize}px/2);
		}
		.wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__right-block .skt-blocks-timeline__line{
			right: calc(${attributes.bgSize}px/2);
		}
		.editor-styles-wrapper .wp-block-skt-blocks-post-timeline-${
      attributes.block_id
    } .skt-blocks-timeline__main .skt-blocks-timeline__post p{
			line-height: ${attributes.contentLineHeight};
		}
		@media(max-width:767px){
			.wp-block-skt-blocks-post-timeline-${
        attributes.block_id
      } .skt-blocks-timeline__center-block.skt-blocks-timeline__responsive-mobile .skt-blocks-timeline__line{
				left: calc(${attributes.bgSize}px/2);
				right: calc(${attributes.bgSize}px/2);
			}
			.wp-block-skt-blocks-post-timeline-${
        attributes.block_id
      } .skt-blocks-timeline__left-block.skt-blocks-timeline__responsive-mobile .skt-blocks-timeline__line{
				left: calc(${attributes.bgSize}px/2);
			}
			.wp-block-skt-blocks-post-timeline-${
        attributes.block_id
      } .skt-blocks-timeline__right-block.skt-blocks-timeline__responsive-mobile .skt-blocks-timeline__line{
				right: calc(${attributes.bgSize}px/2);
			}

		}
		@media(max-width:976px){
			.wp-block-skt-blocks-post-timeline-${
        attributes.block_id
      } .skt-blocks-timeline__center-block.skt-blocks-timeline__responsive-tablet .skt-blocks-timeline__line{
				left: calc(${attributes.bgSize}px/2);
				right: calc(${attributes.bgSize}px/2);
			}
			.wp-block-skt-blocks-post-timeline-${
        attributes.block_id
      } .skt-blocks-timeline__left-block.skt-blocks-timeline__responsive-tablet .skt-blocks-timeline__line{
				left: calc(${attributes.bgSize}px/2);
			}
			.wp-block-skt-blocks-post-timeline-${
        attributes.block_id
      } .skt-blocks-timeline__right-block.skt-blocks-timeline__responsive-tablet .skt-blocks-timeline__line{
				right: calc(${attributes.bgSize}px/2);
			}
		}
	   `}
        </Style>
        <BlockControls>
          <BlockAlignmentToolbar
            value={attributes.align}
            onChange={(value) => {
              setAttributes({ align: value });
            }}
            controls={["center", "wide", "full"]}
          />
        </BlockControls>
        <SectionTag
          className={classnames(
            this.props.className,
            `wp-block-skt-blocks-post-timeline-${attributes.block_id}`,
            "skt-blocks-block-post-timeline",
            ...ContentTmClasses(this.props.attributes)
          )}
        >
          {attributes.displaySectionTitle && attributes.sectionTitle && (
            <SectionTitleTag className="skt-blocks-post-grid-section-title">
              {attributes.sectionTitle}
            </SectionTitleTag>
          )}
          <div className="skt-blocks-timeline__main">
            <div className="skt-blocks-timeline__days">
              {displayPosts.map(
                (post, i) => (
                  (content_align_class = AlignClass(this.props.attributes, i)),
                  (day_align_class = DayAlignClass(this.props.attributes, i)),
                  (
                    <article
                      key={i}
                      id={"post-" + post.id}
                      className={classnames(
                        "post-" + post.id,
                        "skt-blocks-timeline__field",
                        "skt-blocks-timeline__field-wrap",
                        post.featured_image_src && attributes.displayPostImage
                          ? "has-post-thumbnail"
                          : null
                      )}
                    >
                      <div className={content_align_class}>
                        <div className="skt-blocks-timeline__marker skt-blocks-timeline__out-view-icon">
                          <span className="skt-blocks-timeline__icon-new skt-blocks-timeline__out-view-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm116 204c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40z" />
                            </svg>
                          </span>
                        </div>
                        <div className={day_align_class}>
                          <div
                            className="skt-blocks-timeline__events-new"
                            style={{
                              marginBottom: attributes.blockSpace,
                            }}
                          >
                            <div
                              className="skt-blocks-timeline__events-inner-new"
                              style={{
                                backgroundColor: attributes.bgColor
                                  ? attributes.bgColor
                                  : "#e4e4e4",
                                borderRadius: attributes.borderRadius,
                              }}
                            >
                              {attributes.dateFontFamily &&
                                loadGoogleFont(attributes.dateFontFamily)}
                              {attributes.headingFontFamily &&
                                loadGoogleFont(attributes.headingFontFamily)}
                              {attributes.authorFontFamily &&
                                loadGoogleFont(attributes.authorFontFamily)}
                              {attributes.contentFontFamily &&
                                loadGoogleFont(attributes.contentFontFamily)}
                              {attributes.continueFontFamily &&
                                loadGoogleFont(attributes.continueFontFamily)}
                              <div className="skt-blocks-timeline__date-hide skt-blocks-timeline__date-inner">
                                {attributes.displayPostDate && post.date_gmt && (
                                  <time
                                    dateTime={moment(post.date_gmt)
                                      .utc()
                                      .format()}
                                    className={
                                      "skt-blocks-timeline__date-new"
                                    }
                                    style={{
                                      lineHeight: attributes.dateLineHeight,
                                      fontWeight: attributes.dateFontWeight,
                                      fontSize: attributes.dateFontSize,
                                      fontFamily: attributes.dateFontFamily,
                                    }}
                                  >
                                    {moment(post.date_gmt)
                                      .local()
                                      .format(
                                        "MMMM DD, Y",
                                        "skt-blocks"
                                      )}
                                  </time>
                                )}
                              </div>
                              {attributes.displayPostImage &&
                              post.featured_media ? (
                                <PostGridImage
                                  {...this.props}
                                  imgAlt={
                                    decodeEntities(
                                      post.title.rendered.trim()
                                    ) ||
                                    __(
                                      "(Untitled)",
                                      "skt-blocks"
                                    )
                                  }
                                  imgClass={`wp-image-${post.featured_media.toString()}`}
                                  imgID={post.featured_media.toString()}
                                  imgSize={attributes.imageSize}
                                  imgSizeLandscape={post.featured_image_src}
                                  imgSizeSquare={post.featured_image_src_square}
                                  imgLink={post.link}
                                />
                              ) : null}
                              <div
                                className="skt-blocks-content"
                                style={{
                                  padding: attributes.contentPadding,
                                }}
                              >
                                {attributes.displayPostTitle && (
                                  <PostTag
                                    className="skt-blocks-block-post-timeline-title"
                                    style={{
                                      marginBottom: attributes.headingSpace,
                                    }}
                                  >
                                    <a
                                      href={post.link}
                                      target="_blank"
                                      rel="bookmark"
                                      style={{
                                        color: attributes.headingColor
                                          ? attributes.headingColor
                                          : "#333",
                                        lineHeight:
                                          attributes.headingLineHeight,
                                        fontWeight:
                                          attributes.headingFontWeight,
                                        fontSize: attributes.headingFontSize,
                                        fontFamily:
                                          attributes.headingFontFamily,
                                      }}
                                    >
                                      {decodeEntities(
                                        post.title.rendered.trim()
                                      ) ||
                                        __(
                                          "(Untitled)",
                                          "skt-blocks"
                                        )}
                                    </a>
                                  </PostTag>
                                )}

                                {isPost && (
                                  <div
                                    className="skt-blocks-block-post-timeline-byline"
                                    style={{
                                      marginBottom: attributes.authorSpace,
                                    }}
                                  >
                                    {attributes.displayPostAuthor &&
                                      post.author_info.display_name && (
                                        <div className="skt-blocks-block-post-timeline-author">
                                          <a
                                            className="skt-blocks-text-link"
                                            target="_blank"
                                            href={post.author_info.author_link}
                                            style={{
                                              color: attributes.authorColor
                                                ? attributes.authorColor
                                                : "#626e81",
                                              lineHeight:
                                                attributes.authorLineHeight,
                                              fontWeight:
                                                attributes.authorFontWeight,
                                              fontSize:
                                                attributes.authorFontSize,
                                              fontFamily:
                                                attributes.authorFontFamily,
                                            }}
                                          >
                                            {post.author_info.display_name}
                                          </a>
                                        </div>
                                      )}
                                  </div>
                                )}

                                <div className="skt-blocks-block-post-timeline-excerpt">
                                  {attributes.displayPostExcerpt &&
                                    post.excerpt && (
                                      <div
                                        className="skt-blocks-timeline__post"
                                        style={{
                                          color: attributes.textColor
                                            ? attributes.textColor
                                            : "#333",
                                          fontWeight:
                                            attributes.contentFontWeight,
                                          fontSize: attributes.contentFontSize,
                                          fontFamily:
                                            attributes.contentFontFamily,
                                        }}
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: truncate(
                                              post.excerpt.rendered,
                                              attributes.excerptLength
                                            ),
                                          }}
                                        />
                                      </div>
                                    )}

                                  {attributes.displayPostLink && (
                                    <div
                                      className="skt-blocks-timeline__link_parent"
                                      style={{
                                        boxShadow:
                                          generateCSSUnit(
                                            attributes.boxShadowHOffset,
                                            "px"
                                          ) +
                                          " " +
                                          generateCSSUnit(
                                            attributes.boxShadowVOffset,
                                            "px"
                                          ) +
                                          " " +
                                          generateCSSUnit(
                                            attributes.boxShadowBlur,
                                            "px"
                                          ) +
                                          " " +
                                          generateCSSUnit(
                                            attributes.boxShadowSpread,
                                            "px"
                                          ) +
                                          " " +
                                          attributes.boxShadowColor +
                                          " " +
                                          boxShadowPositionCSS,
                                      }}
                                    >
                                      <a
                                        className="skt-blocks-timeline__link"
                                        href={post.link}
                                        target="_blank"
                                        rel="bookmark"
                                        style={{
                                          lineHeight:
                                            attributes.continueLineHeight,
                                          fontWeight:
                                            attributes.continueFontWeight,
                                          fontSize: attributes.continueFontSize,
                                          fontFamily:
                                            attributes.continueFontFamily,
                                        }}
                                      >
                                        {attributes.readMoreText}
                                      </a>
                                    </div>
                                  )}
                                </div>
                                <div className="skt-blocks-timeline__arrow"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="skt-blocks-timeline__date-new skt-blocks-timeline__date-outer">
                          {attributes.displayPostDate && post.date_gmt && (
                            <time
                              dateTime={moment(post.date_gmt).utc().format()}
                              className={
                                "skt-blocks-timeline__date-new"
                              }
                              style={{
                                lineHeight: attributes.dateLineHeight,
                                fontWeight: attributes.dateFontWeight,
                                fontSize: attributes.dateFontSize,
                                fontFamily: attributes.dateFontFamily,
                              }}
                            >
                              {moment(post.date_gmt)
                                .local()
                                .format(
                                  "MMMM DD, Y",
                                  "skt-blocks"
                                )}
                            </time>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                )
              )}
            </div>
            <div
              className="skt-blocks-timeline__line"
              style={{
                width: attributes.connectorWidth,
              }}
            >
              <div className="skt-blocks-timeline__line__inner"></div>
            </div>
          </div>
        </SectionTag>
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const { order, categories, taxonomyType, postType } = props.attributes;

    const { getEntityRecords } = select("core");

    let allTaxonomy = responsive_globals.all_taxonomy;
    let currentTax = allTaxonomy[postType];
    let taxonomy = "";
    let categoriesList = [];
    let rest_base = "";

    if ("undefined" != typeof currentTax) {
      if ("undefined" != typeof currentTax["taxonomy"][taxonomyType]) {
        rest_base =
          currentTax["taxonomy"][taxonomyType]["rest_base"] == false ||
          currentTax["taxonomy"][taxonomyType]["rest_base"] == null
            ? currentTax["taxonomy"][taxonomyType]["name"]
            : currentTax["taxonomy"][taxonomyType]["rest_base"];
      }

      if ("" != taxonomyType) {
        if (
          "undefined" != typeof currentTax["terms"] &&
          "undefined" != typeof currentTax["terms"][taxonomyType]
        ) {
          categoriesList = currentTax["terms"][taxonomyType];
        }
      }
    }

    const latestPostsQuery = pickBy(
      {
        order,
        orderby: props.attributes.orderBy,
        per_page: props.attributes.postsToShow,
        offset: props.attributes.offset,
        exclude: [wp.data.select("core/editor").getCurrentPostId()],
      },
      (value) => !isUndefined(value)
    );

    latestPostsQuery[rest_base] = categories;

    return {
      latestPosts: getEntityRecords(
        "postType",
        props.attributes.postType,
        latestPostsQuery
      ),
      categoriesList: categoriesList,
      taxonomyList:
        "undefined" != typeof currentTax ? currentTax["taxonomy"] : [],
    };
  }),
])(LatestPostsBlock);

// Truncate excerpt
function truncate(str, no_words) {
  return str.split(" ").splice(0, no_words).join(" ");
}
