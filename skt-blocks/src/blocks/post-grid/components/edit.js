/**
 * External dependencies
 */

import isUndefined from "lodash/isUndefined";
import pickBy from "lodash/pickBy";
import moment from "moment";
import classnames from "classnames";
import Inspector from "./inspector";
import PostGridImage from "./image";
import Style from "style-it";
import generateCSSUnit from "../../../generateCSSUnit";

const { compose } = wp.compose;

const { Component, Fragment } = wp.element;
const { AlignmentToolbar } = wp.editor;
const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;

const {
  Placeholder,
  Spinner,
  Toolbar,
  PanelBody,
  SelectControl,
} = wp.components;

const {
  BlockAlignmentToolbar,
  BlockControls,
  InspectorControls,
} = wp.blockEditor;

class LatestPostsBlock extends Component {
  constructor() {
    super(...arguments);
    this.onSelectTaxonomyType = this.onSelectTaxonomyType.bind(this);
  }
  onSelectTaxonomyType(value) {
    const { setAttributes } = this.props;
    alert(this.props);

    setAttributes({ taxonomyType: value });
    setAttributes({ categories: "" });
  }
  componentDidMount() {
    this.props.setAttributes({
      postGridBlockId: this.props.clientId.substr(0, 8),
    });
  }
  render() {
    const {
      attributes,
      setAttributes,
      latestPosts,
      taxonomyList,
      categoriesList,
    } = this.props;

    var boxShadowPositionCSS = attributes.boxShadowPosition;

    if ("outset" === attributes.boxShadowPosition) {
      boxShadowPositionCSS = "";
    }
    var hoverboxShadowPositionCSS = attributes.hoverboxShadowPosition;

    if ("outset" === attributes.hoverboxShadowPosition) {
      hoverboxShadowPositionCSS = "";
    }
    const { paginationMarkup } = this.props.attributes;

    // Check if there are posts
    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;

    // Check the post type
    const isPost = "post" === attributes.postType;
    const isCourse = "course" === attributes.postType;
    const isLesson = "lesson" === attributes.postType;

    if (!hasPosts) {
      return (
        <Fragment>
          <Inspector {...{ setAttributes, ...this.props }} />
          <Placeholder
            icon="admin-post"
            label={__(
              "Blocks Post and Page Grid",
              "skt-blocks"
            )}
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

    // Add toolbar controls to change layout
    const layoutControls = [
      {
        icon: "grid-view",
        title: __("Grid View", "skt-blocks"),
        onClick: () => setAttributes({ postLayout: "grid" }),
        isActive: "grid" === attributes.postLayout,
      },
      {
        icon: "list-view",
        title: __("List View", "skt-blocks"),
        onClick: () => setAttributes({ postLayout: "list" }),
        isActive: "list" === attributes.postLayout,
      },
    ];

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
    // Post type options
    const postTypeOptions = [
      { value: "post", label: __("Post", "skt-blocks") },
      { value: "page", label: __("Page", "skt-blocks") },
      { value: "course", label: __("Courses", "skt-blocks") },
      { value: "lesson", label: __("Lessons", "skt-blocks") },
    ];

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Query")} initialOpen={true}>
            <p>{__("Text Alignment", "skt-blocks")}</p>
            <AlignmentToolbar
              value={attributes.textAlignment}
              onChange={(value) =>
                setAttributes({
                  textAlignment: value,
                })
              }
              controls={["left", "center", "right"]}
              isCollapsed={false}
            />
            <SelectControl
              label={__("Content Type", "skt-blocks")}
              options={postTypeOptions}
              value={attributes.postType}
              onChange={(value) =>
                this.props.setAttributes({ postType: value })
              }
            />
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
        <BlockControls>
          <BlockAlignmentToolbar
            label={__("Block Alignment")}
            value={attributes.align}
            onChange={(value) => {
              setAttributes({ align: value });
            }}
            controls={["left", "center", "right", "wide", "full"]}
          />
          <Toolbar controls={layoutControls} />
        </BlockControls>
        <Style>
          {`
          .block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid article {
          box-shadow: ${attributes.boxShadowHOffset}px ${attributes.boxShadowVOffset}px ${attributes.boxShadowBlur}px ${attributes.boxShadowSpread}px ${attributes.boxShadowColor} ${boxShadowPositionCSS};
          }
          .block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid article:hover {
          box-shadow: ${attributes.hoverboxShadowHOffset}px ${attributes.hoverboxShadowVOffset}px ${attributes.hoverboxShadowBlur}px ${attributes.hoverboxShadowSpread}px ${attributes.hoverboxShadowColor} ${hoverboxShadowPositionCSS};
          }
          .block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid .skt-blocks-block-post-grid-image img {
	border-radius: ${attributes.imageBorderRadius}px !important;
		}
@media only screen and (min-width: 976px){
.block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid .skt-blocks-block-post-grid-title {
	font-size: ${attributes.titleFontSize}px !important;
		}
}
@media only screen and (max-width: 976px){
.block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid .skt-blocks-block-post-grid-title {
	font-size: ${attributes.titleFontSizeTablet}px;
		}
}
@media only screen and (max-width: 767px){
	.block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid .skt-blocks-block-post-grid-title {
	font-size: ${attributes.titleFontSizeMobile}px;
		}
		}
		.block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid .skt-blocks-block-post-grid-title a {
            color: ${attributes.titleColor};
        }
        .block-id-${attributes.postGridBlockId}.skt-blocks-block-post-grid .skt-blocks-block-post-grid-title a:hover {
            color: ${attributes.titleHoverColor};
        }

`}
        </Style>
        {attributes.stackonMobile == false && (
          <Style>
            {`
      @media only screen and (max-width: 600px) {
      .skt-blocks-block-post-grid .is-list article {
        grid-template-columns: 1fr 1fr;
        }
      }
		  
	  `}
          </Style>
        )}
        <SectionTag
          className={classnames(
            `block-id-${attributes.postGridBlockId}`,
            this.props.className,
            "skt-blocks-block-post-grid"
          )}
        >
          {attributes.displaySectionTitle && attributes.sectionTitle && (
            <SectionTitleTag className="skt-blocks-post-grid-section-title">
              {attributes.sectionTitle}
            </SectionTitleTag>
          )}

          <div
            className={classnames({
              "is-grid": "grid" === attributes.postLayout,
              "is-list": "list" === attributes.postLayout,
              [`columns-${attributes.columns}`]:
                "grid" === attributes.postLayout,
              "skt-blocks-post-grid-items":
                "skt-blocks-post-grid-items",
            })}
          >
            {displayPosts.map((post, i) => (
              <article
                key={i}
                id={"post-" + post.id}
                style={{
                  borderWidth: attributes.blockBorderWidth,
                  borderColor: attributes.blockBorderColor,
                  borderStyle: attributes.blockBorderStyle,
                  borderRadius: attributes.blockBorderRadius,
                  backgroundColor: attributes.bgColor
                    ? attributes.bgColor
                    : "#e4e4e4",
                  marginBottom: attributes.rowGap,
                  marginLeft: attributes.columnGap
                    ? attributes.columnGap / 2
                    : "",
                  marginRight: attributes.columnGap
                    ? attributes.columnGap / 2
                    : "",
                  height: attributes.equalHeight ? "auto" : "fit-content",
                  backgroundImage:
                    "background" == attributes.imagePosition
                      ? "url(" + post.featured_image_src + " )"
                      : "none",
                  backgroundSize: "cover",
                }}
                className={classnames(
                  "post-" + post.id,
                  post.featured_image_src && attributes.displayPostImage
                    ? "has-post-thumbnail"
                    : null
                )}
              >
                {attributes.displayPostImage &&
                post.featured_media &&
                "background" != attributes.imagePosition ? (
                  <PostGridImage
                    {...this.props}
                    imgAlt={
                      decodeEntities(post.title.rendered.trim()) ||
                      __("(Untitled)", "skt-blocks")
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
                  className={classnames(
                    "skt-blocks-block-post-grid-text"
                  )}
                  style={{ textAlign: attributes.textAlignment, padding: attributes.layout==='content'? attributes.contentPadding? `${attributes.contentPadding}px`: "0" :"0"   }}  
                >
                  <header className="skt-blocks-block-post-grid-header">
                    {attributes.displayPostTitle && (
                      <PostTag
                        className="skt-blocks-block-post-grid-title"
                        style={{
                          marginBottom: attributes.titleBottomSpacing,
                        }}
                      >
                        <a
                          href={post.link}
                          target="_blank"
                          rel="bookmark"
                          style={{
                            lineHeight: attributes.titleLineHeight,
                            fontFamily: attributes.titleFontFamily,
                            fontWeight: attributes.titleFontWeight,
                            textTransform: attributes.titleTextTransform,
                          }}
                        >
                          {decodeEntities(post.title.rendered.trim()) ||
                            __("(Untitled)", "skt-blocks")}
                        </a>
                      </PostTag>
                    )}

                    {(isPost || isCourse || isLesson) && (
                      <div
                        className="skt-blocks-block-post-grid-byline"
                        style={{
                          color: attributes.metaColor
                            ? attributes.metaColor
                            : "#e4e4e4",
                          fontSize: attributes.metaFontSize,
                          lineHeight: attributes.metaLineHeight,
                          fontFamily: attributes.metaFontFamily,
                          fontWeight: attributes.metaFontWeight,
                          textTransform: attributes.metaTextTransform,
                          marginBottom: attributes.metaBottomSpacing,
                        }}
                      >

{ attributes.displayPostAuthor && post.rbea_author_info.display_name && (
                            <div className="skt-blocks-block-post-grid-author">
                              <a
                                className="skt-blocks-text-link"
                                target="_blank"
                                href={post.rbea_author_info.author_link}
                                style={{
                                  color: attributes.metaColor
                                    ? attributes.metaColor
                                    : "#e4e4e4",
                                }}
                              >
                                {post.rbea_author_info.display_name}
                              </a>
                            </div>
                          )}

                        {attributes.displayPostDate && post.date_gmt && (
                          <time
                            dateTime={moment(post.date_gmt).utc().format()}
                            className={
                              "skt-blocks-block-post-grid-date"
                            }
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
                    )}
                  </header>
                  <div
                    className="skt-blocks-block-post-grid-excerpt"
                    style={{
                      color: attributes.textColor
                        ? attributes.textColor
                        : "#e4e4e4",
                      fontSize: attributes.excerptFontSize,
                      lineHeight: attributes.excerptLineHeight,
                      fontFamily: attributes.excerptFontFamily,
                      fontWeight: attributes.excerptFontWeight,
                      textTransform: attributes.excerptTextTransform,
                    }}
                  >
                    {attributes.displayPostExcerpt && post.excerpt && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncate(
                              post.excerpt.rendered,
                            attributes.excerptLength
                          ),
                        }}
                        style={{
                          marginBottom: attributes.readMoreTopSpacing,
                        }}
                      />
                    )}
                    {attributes.displayPostExcerpt && isLesson && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncate(
                              post.rbea_excerpt_info,
                            attributes.excerptLength
                          ),
                        }}
                        style={{
                          marginBottom: attributes.readMoreTopSpacing,
                        }}
                      />
                    )}
                    {attributes.displayPostLink && (
                      <p>
                        <a
                          className="skt-blocks-block-post-grid-more-link skt-blocks-text-link"
                          href={post.link}
                          target="_blank"
                          rel="bookmark"
                          style={{
                            color: attributes.readMoreLinkColor,
                            fontSize: attributes.continueFontSize,
                            fontWeight: attributes.continueFontWeight,
                            lineHeight: attributes.continueLineHeight,
                            textTransform: attributes.continueTextTransform,
                          }}
                        >
                          {attributes.readMoreText}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {true === attributes.postPagination && "empty" !== paginationMarkup && (
            <div
              dangerouslySetInnerHTML={{ __html: paginationMarkup }}
              className="skt-blocks-post-pagination-wrap"
              style={{
                textAlign: attributes.paginationAlignment,
                marginTop: attributes.paginationSpacing,
              }}
            ></div>
          )}
        </SectionTag>
        <Style>
          {`.editor-styles-wrapper .block-id-${
            attributes.postGridBlockId
          }.skt-blocks-block-post-grid .skt-blocks-post-pagination-wrap > * {
                    border: ${attributes.paginationBorderWidth}px solid ${
            attributes.paginationBorderColor
          };
                    background-color: ${
                      attributes.paginationLayout == "filled"
                        ? attributes.paginationBorderColor
                        : "transparent"
                    };
                    border-radius: ${attributes.paginationBorderRadius}px;
                    color:${attributes.paginationTextColor} !important;
                    margin-right:10px;
                    padding:0.5em;
                }
                .editor-styles-wrapper .block-id-${
                  attributes.postGridBlockId
                }.skt-blocks-block-post-grid .skt-blocks-post-pagination-wrap > *:last-child {
                    margin-right:0;
                }
                .editor-styles-wrapper .block-id-${
                  attributes.postGridBlockId
                }.skt-blocks-block-post-grid .skt-blocks-post-pagination-wrap > span {
                    border: ${attributes.paginationBorderWidth}px solid ${
            attributes.paginationActiveBorderColor
          };
                    background-color: ${
                      attributes.paginationLayout == "filled"
                        ? attributes.paginationActiveBorderColor
                        : "transparent"
                    };
                    color:${attributes.paginationTextActiveColor} !important;
                }

                .block-id-${
                  attributes.postGridBlockId
                }.skt-blocks-block-post-grid .skt-blocks-post-grid-items article {
                    padding: ${
                      attributes.layout==="boxed" ?
                      attributes.contentPadding
                        ? attributes.contentPadding
                        : "0" : "0"
                    }px;
                }

                @media (max-width:768px){
                    .block-id-${
                      attributes.postGridBlockId
                    }.skt-blocks-block-post-grid .skt-blocks-post-grid-items article {
                        padding: ${
                          attributes.layout==="boxed" ?
                          attributes.mobileContentPadding
                            ? attributes.mobileContentPadding
                            : "0" : "0"
                        }px;
                    }
                }

                `}
        </Style>
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const { attributes, latestPosts, setAttributes } = props;
    const {
      order,
      categories,
      paginationMarkup,
      excludeCurrentPost,
      taxonomyType,
      postType,
    } = props.attributes;

    const { getEntityRecords } = select("core");

    if (true === attributes.postPagination) {
      jQuery.ajax({
        url: responsive_globals.ajax_url,
        data: {
          action: "responsive_block_editor_post_pagination",
          attributes: props.attributes,
          nonce: responsive_globals.responsive_block_editor_ajax_nonce,
        },
        dataType: "json",
        type: "POST",
        success: function (data) {
          setAttributes({ paginationMarkup: data.data });
        },
      });
    }
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

    if (excludeCurrentPost) {
      latestPostsQuery["exclude"] = select("core/editor").getCurrentPostId();
    }

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
