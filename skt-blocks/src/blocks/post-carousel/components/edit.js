/**
 * External dependencies
 */

import isUndefined from "lodash/isUndefined";
import pickBy from "lodash/pickBy";
import moment from "moment";
import classnames from "classnames";
import Inspector from "./inspector";
import PostCarouselImage from "./image";
import Slider from "react-slick";
import map from "lodash/map";
import generateCSSUnit from "../../../generateCSSUnit";
import Style from "style-it";
import { loadGoogleFont } from "../../../utils/font";
const { compose } = wp.compose;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;


const { Placeholder, Spinner, Toolbar, Dashicon } = wp.components;

const {
  BlockAlignmentToolbar,
  BlockControls,
  AlignmentToolbar,
} = wp.blockEditor;

class LatestPostsBlock extends Component {
  componentDidMount() {
    this.props.setAttributes({ block_id: this.props.clientId.substr(0, 8) });
  }

  render() {
    const { attributes, setAttributes, latestPosts } = this.props;

    const {
      displayPostExcerpt,
      displayPostDate,
      displayPostLink,
      displayPostComment,
      displayPostTaxonomy,
      excerptLength,
      columns,
      pauseOnHover,
      infiniteLoop,
      transitionSpeed,
      autoplay,
      autoplaySpeed,
      arrowDots,
      arrowSize,
      arrowBorderSize,
      arrowBorderRadius,
      block_id,
      blockAlign,
      titleColor,
      contentColor,
      metaColor,
      dateColor,
      arrowDotsColor,
      ctaColor,
      ctaBackColor,
      ctaHoverColor,
      ctaHoverBackColor,
      ctaBorderColor,
      ctaHoverBorderColor,
      ctaBorderRadius,
      ctaBorderWidth,
      ctaBorderStyle,
      ctaHpadding,
      ctaVpadding,
      contentPadding,
      rowGap,
      columnGap,
      imageSpace,
      titleSpace,
      dateSpace,
      excerptSpace,
      ctaSpace,
      titleFontFamily,
      titleFontSize,
      titleFontSizeMobile,
      titleFontSizeTablet,
      titleFontWeight,
      titleLineHeight,
      metaFontFamily,
      metaFontSize,
      metaFontWeight,
      metaLineHeight,
      excerptFontFamily,
      excerptFontSize,
      excerptFontWeight,
      excerptLineHeight,
      ctaFontFamily,
      ctaFontSize,
      ctaFontWeight,
      ctaLineHeight,
      imagePosition,
      opacity,
      readMoreText,
      equalHeight,
      buttonTarget,
      contentPaddingMobile,
    } = attributes;
    setAttributes({ block_id: this.props.clientId });
    let imgopacity = opacity / 100;
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
            label={__("Post Carousel", "skt-blocks")}
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

    const onRemoveImage = () => {
      x = null;
      y = null;
      setAttributes({
        x,
        y,
      });
    };

    function NextArrow(props) {
      return (
        <button
          type="button"
          data-role="none"
          className="slick-next slick-arrow"
          aria-label="Next"
          tabIndex="0"
          role="button"
          style={{
            borderColor: arrowDotsColor,
            borderRadius: arrowBorderRadius,
            borderWidth: arrowBorderSize,
          }}
        >
          <Dashicon
            icon="arrow-right-alt2"
            height={arrowSize}
            width={arrowSize}
            style={{ fill: arrowDotsColor }}
          />
        </button>
      );
    }

    function PrevArrow(props) {
      return (
        <button
          type="button"
          data-role="none"
          className="slick-prev slick-arrow"
          aria-label="Previous"
          tabIndex="0"
          role="button"
          style={{
            borderColor: arrowDotsColor,
            borderRadius: arrowBorderRadius,
            borderWidth: arrowBorderSize,
          }}
        >
          <Dashicon
            icon="arrow-left-alt2"
            height={arrowSize}
            width={arrowSize}
            style={{ fill: arrowDotsColor }}
          />
        </button>
      );
    }

    let dots =
      "dots" == attributes.arrowDots || "arrows_dots" == attributes.arrowDots
        ? true
        : false;
    let arrows =
      "arrows" == attributes.arrowDots || "arrows_dots" == attributes.arrowDots
        ? true
        : false;

    const settings = {
      slidesToShow: attributes.columns,
      slidesToScroll: 1,
      autoplaySpeed: attributes.autoplaySpeed,
      autoplay: attributes.autoplay,
      infinite: attributes.infiniteLoop,
      pauseOnHover: pauseOnHover,
      speed: attributes.transitionSpeed,
      arrows: arrows,
      dots: dots,
      rtl: false,
      draggable: false,
      nextArrow: <NextArrow arrowSize={arrowSize} />,
      prevArrow: <PrevArrow arrowSize={arrowSize} />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: attributes.tcolumns,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: attributes.mcolumns,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Fragment>
        <Inspector
          {...{ setAttributes, ...this.props }}
          postCount={latestPosts && latestPosts.length}
        />
        <Style>
          {`
                    .responsive-post-slick-carousel ul.slick-dots li button:before {
                        color: ${arrowDotsColor};

                    }
                    .skt-blocks-block-post-carousel-more-link{
                        color: ${ctaColor} !important;
                        background-color: ${ctaBackColor};
                        border-color: ${ctaBorderColor};
                    }
                    .skt-blocks-block-post-carousel-more-link:hover{
                        color: ${ctaHoverColor} !important;
                        background-color: ${ctaHoverBackColor};
                        border-color: ${ctaHoverBorderColor};
                    }
                    .responsive-post-slick-carousel .slick-slide>div:first-child{
                        margin-left: ${columnGap / 2}px;
                        margin-right: ${columnGap / 2}px;
                      }
                    @media(max-width:767px){
                      .skt-blocks-block-post-carousel-text-wrap{
                          padding: ${contentPaddingMobile}px;
                      }
                    }
                    @media(min-width:767px){
                      .skt-blocks-block-post-carousel-text-wrap{
                          padding: ${contentPadding}px;
                      }
                    }

                `}
        </Style>
        <Style>
          {`
.editor-styles-wrapper .skt-blocks-block-post-carousel-excerpt p{
  line-height: ${excerptLineHeight};
}

@media only screen and (min-width: 976px){
.block-${block_id} .skt-blocks-block-post-carousel-header .skt-blocks-block-post-carousel-title {
	font-size: ${titleFontSize}px !important;
		}
}
@media only screen and (max-width: 976px){
.block-${block_id} .skt-blocks-block-post-carousel-header .skt-blocks-block-post-carousel-title {
	font-size: ${titleFontSizeTablet}px;
		}
}
@media only screen and (max-width: 767px){
	.block-${block_id} .skt-blocks-block-post-carousel-header .skt-blocks-block-post-carousel-title {
	font-size: ${titleFontSizeMobile}px;
		}
}
`}
        </Style>
        <BlockControls key="controls">
          <AlignmentToolbar
            value={blockAlign}
            onChange={(value) => setAttributes({ blockAlign: value })}
          />
        </BlockControls>

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
            "skt-blocks-block-post-carousel",
            `resp-post__image-position-background`,
            "responsive-post-grid",
            `responsive-post__image-position-${imagePosition}`,
            `block-${block_id}`
          )}
        >
          <div
            className={classnames(
              "responsive-post-slick-carousel",
              `responsive-post_carousel-equal-height-${equalHeight}`
            )}
          >
            {titleFontFamily && loadGoogleFont(titleFontFamily)}
            {metaFontFamily && loadGoogleFont(metaFontFamily)}
            {excerptFontFamily && loadGoogleFont(excerptFontFamily)}
            {ctaFontFamily && loadGoogleFont(ctaFontFamily)}
            <Slider {...settings}>
              {displayPosts.map((post, index) => (
                <div>
                  <div
                    style={{ backgroundColor: attributes.bgColor }}
                    className={classnames(
                      "skt-blocks-post-carousel-inner",
                      "post-" + post.id,
                      post.featured_image_src && attributes.displayPostImage
                        ? "has-post-thumbnail"
                        : null
                    )}
                  >
                    {imagePosition &&
                    attributes.displayPostImage &&
                    post.featured_media ? (
                      <PostCarouselImage
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
                      className="skt-blocks-block-post-carousel-text-wrap"
                      style={{
                        marginBottom: generateCSSUnit(rowGap, "px"),
                      }}
                    >
                      <header
                        className="skt-blocks-block-post-carousel-header"
                        style={{ textAlign: blockAlign }}
                      >
                        {attributes.displayPostTitle && (
                          <PostTag
                            className="skt-blocks-block-post-carousel-title"
                            style={{
                              marginTop: imageSpace,
                              marginBottom: titleSpace,
                            }}
                          >
                            <a
                              href={post.link}
                              target="_blank"
                              rel="bookmark"
                              style={{
                                color: titleColor,
                                lineHeight: titleLineHeight,
                                fontWeight: titleFontWeight,
                                fontFamily: titleFontFamily,
                              }}
                            >
                              {decodeEntities(post.title.rendered.trim()) ||
                                __(
                                  "(Untitled)",
                                  "skt-blocks"
                                )}
                            </a>
                          </PostTag>
                        )}
                        {isPost && (
                          <div
                            className="skt-blocks-block-post-carousel-byline"
                            style={{
                              marginBottom: dateSpace,
                              lineHeight: metaLineHeight,
                              fontWeight: metaFontWeight,
                              fontSize: metaFontSize,
                              fontFamily: metaFontFamily,
                              color: metaColor,
                            }}
                          >
                            <span>
                              {attributes.displayPostAuthor &&
                                post.author_info.display_name && (
                                  <div className="skt-blocks-block-post-carousel-author">
                                    <a
                                      className="skt-blocks-text-link"
                                      target="_blank"
                                      href={post.author_info.author_link}
                                    >
                                      {post.author_info.display_name}
                                    </a>
                                  </div>
                                )}

                              {attributes.displayPostDate && post.date_gmt && (
                                <time
                                  dateTime={moment(post.date_gmt)
                                    .utc()
                                    .format()}
                                  className={
                                    "skt-blocks-block-post-carousel-date"
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
                              {attributes.displayPostComment && (
                                <p
                                  className={
                                    "skt-blocks-block-post-carousel-comments"
                                  }
                                >
                                  {post.comments_num == "0 comments"
                                    ? "No Comments"
                                    : post.comments_num}
                                </p>
                              )}
                            </span>

                            {attributes.displayPostTaxonomy && (
                              <div
                                className={
                                  "skt-blocks-block-post-carousel-taxonomy"
                                }
                                dangerouslySetInnerHTML={{
                                  __html: post.category_list.replace(
                                    /href=['"].*?['"]/g,
                                    ""
                                  ),
                                }}
                              ></div>
                            )}
                          </div>
                        )}
                      </header>
                      <div
                        className="skt-blocks-block-post-carousel-excerpt"
                        style={{
                          color: contentColor ? contentColor : "#e4e4e4",
                          textAlign: blockAlign,
                          lineHeight: excerptLineHeight,
                          fontWeight: excerptFontWeight,
                          fontSize: excerptFontSize,
                          fontFamily: excerptFontFamily,
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
                            style={{ marginBottom: excerptSpace }}
                          />
                        )}

                        {attributes.displayPostLink && (
                          <p
                            style={{
                              marginBottom: ctaSpace,
                              lineHeight: ctaLineHeight,
                              fontWeight: ctaFontWeight,
                              fontSize: ctaFontSize,
                              fontFamily: ctaFontFamily,
                            }}
                          >
                            <a
                              className="skt-blocks-block-post-carousel-more-link skt-blocks-text-link"
                              href={post.link}
                              target={buttonTarget}
                              rel="bookmark"
                              style={{
                                paddingLeft: ctaHpadding,
                                paddingRight: ctaHpadding,
                                paddingTop: ctaVpadding,
                                paddingBottom: ctaVpadding,
                                borderRadius: ctaBorderRadius,
                                borderWidth: ctaBorderWidth,
                                borderStyle: ctaBorderStyle,
                              }}
                            >
                              {readMoreText}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </SectionTag>
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const { order, categories } = props.attributes;

    const { getEntityRecords } = select("core");

    const latestPostsQuery = pickBy(
      {
        categories,
        order,
        orderby: props.attributes.orderBy,
        per_page: props.attributes.postsToShow,
        offset: props.attributes.offset,
        exclude: [wp.data.select("core/editor").getCurrentPostId()],
      },
      (value) => !isUndefined(value)
    );

    return {
      latestPosts: getEntityRecords(
        "postType",
        props.attributes.postType,
        latestPostsQuery
      ),
    };
  }),
])(LatestPostsBlock);

// Truncate excerpt
function truncate(str, no_words) {
  return str.split(" ").splice(0, no_words).join(" ");
}
