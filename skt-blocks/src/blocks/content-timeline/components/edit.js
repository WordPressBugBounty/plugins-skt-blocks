/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import AlignClass from "./align-classes";
import DayAlignClass from "./day-align-classes";
import ContentTmClasses from "./classes";
import React from "react";
import Style from "style-it";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Dashicon } = wp.components;
const { RichText } = wp.editor;
import map from "lodash/map";
import renderSVG from "../../../renderIcon";
const { dateI18n, __experimentalGetSettings } = wp.date;
import * as JQuery from "jquery";
import { loadGoogleFont } from "../../../utils/font";
const $ = JQuery.default;

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }
  componentDidMount() {
    //Store client id.
    this.props.setAttributes({ block_id: this.props.clientId });
    this.props.setAttributes({ classMigrate: true });

    var id = this.props.clientId;
    window.addEventListener("load", this.timelineContent_back(id));
    window.addEventListener("resize", this.timelineContent_back(id));
    var time = this;
    $(".edit-post-layout__content").scroll(function (event) {
      time.timelineContent_back(id);
    });

    // Pushing Style tag for this block css.
    const $style = document.createElement("style");
    $style.setAttribute(
      "id",
      "responsive-content-timeline-style-" + this.props.clientId
    );
    document.head.appendChild($style);
  }

  componentDidUpdate() {
    var id = this.props.clientId;
    window.addEventListener("load", this.timelineContent_back(id));
    window.addEventListener("resize", this.timelineContent_back(id));
    var time = this;
    $(".edit-post-layout__content").scroll(function (event) {
      time.timelineContent_back(id);
    });
  }
  /*  Js for timeline line and inner line filler*/
  timelineContent_back(id) {
    var timeline = $(".responsive-timeline").parents("#block-" + id);
    var tm_item = timeline.find(".responsive-timeline");
    var line_inner = timeline.find(".responsive-timeline__line__inner");
    var line_outer = timeline.find(".responsive-timeline__line");
    var $icon_class = timeline.find(".responsive-timeline__marker");
    if ($icon_class.length > 0) {
      var $card_last = timeline.find(".responsive-timeline__field:last-child");
      var timeline_start_icon = $icon_class.first().position();
      var timeline_end_icon = $icon_class.last().position();
      line_outer.css("top", timeline_start_icon.top);

      var timeline_card_height = $card_last.height();
      var last_item_top = $card_last.offset().top - tm_item.offset().top;
      var $last_item, parent_top;
      var $document = $(document);

      if (tm_item.hasClass("responsive-timeline__arrow-center")) {
        line_outer.css("bottom", timeline_end_icon.top);

        parent_top = last_item_top - timeline_start_icon.top;
        $last_item = parent_top + timeline_end_icon.top;
      } else if (tm_item.hasClass("responsive-timeline__arrow-top")) {
        var top_height = timeline_card_height - timeline_end_icon.top;
        line_outer.css("bottom", top_height);

        $last_item = last_item_top;
      } else if (tm_item.hasClass("responsive-timeline__arrow-bottom")) {
        var bottom_height = timeline_card_height - timeline_end_icon.top;
        line_outer.css("bottom", bottom_height);
        parent_top = last_item_top - timeline_start_icon.top;
        $last_item = parent_top + timeline_end_icon.top;
      }

      var num = 0;
      var elementEnd = $last_item + 20;

      var connectorHeight =
        3 * timeline.find(".responsive-timeline__marker:first").height();
      var viewportHeight =
        document.documentElement.clientHeight + connectorHeight;
      var viewportHeightHalf = viewportHeight / 2 + connectorHeight;

      var elementPos = tm_item.offset().top;

      var new_elementPos = elementPos + timeline_start_icon.top;

      var photoViewportOffsetTop = new_elementPos - $document.scrollTop();

      if (photoViewportOffsetTop < 0) {
        photoViewportOffsetTop = Math.abs(photoViewportOffsetTop);
      } else {
        photoViewportOffsetTop = -Math.abs(photoViewportOffsetTop);
      }

      if (elementPos < viewportHeightHalf) {
        if (
          viewportHeightHalf + Math.abs(photoViewportOffsetTop) <
          elementEnd
        ) {
          line_inner.height(viewportHeightHalf + photoViewportOffsetTop);
        } else {
          if (photoViewportOffsetTop + viewportHeightHalf >= elementEnd) {
            line_inner.height(elementEnd);
          }
        }
      } else {
        if (photoViewportOffsetTop + viewportHeightHalf < elementEnd) {
          if (0 > photoViewportOffsetTop) {
            line_inner.height(
              viewportHeightHalf - Math.abs(photoViewportOffsetTop)
            );
            ++num;
          } else {
            line_inner.height(viewportHeightHalf + photoViewportOffsetTop);
          }
        } else {
          if (photoViewportOffsetTop + viewportHeightHalf >= elementEnd) {
            line_inner.height(elementEnd);
          }
        }
      }

      //For changing icon background color and icon color.
      var timeline_icon_pos, timeline_card_pos;
      var elementPos, elementCardPos;
      var timeline_icon_top, timeline_card_top;
      var timeline_icon = timeline.find(".responsive-timeline__marker"),
        animate_border = timeline.find(".responsive-timeline__field-wrap");

      for (var i = 0; i < timeline_icon.length; i++) {
        timeline_icon_pos = $(timeline_icon[i]).offset().top;
        timeline_card_pos = $(animate_border[i]).offset().top;
        elementPos = timeline.offset().top;
        elementCardPos = timeline.offset().top;

        timeline_icon_top = timeline_icon_pos - $document.scrollTop();
        timeline_card_top = timeline_card_pos - $document.scrollTop();

        if (timeline_card_top < viewportHeightHalf) {
          animate_border[i].classList.remove("out-view");
          animate_border[i].classList.add("in-view");
        } else {
          // Remove classes if element is below than half of viewport.
          animate_border[i].classList.add("out-view");
          animate_border[i].classList.remove("in-view");
        }

        if (timeline_icon_top < viewportHeightHalf) {
          // Add classes if element is above than half of viewport.
          timeline_icon[i].classList.remove(
            "responsive-timeline__out-view-icon"
          );
          timeline_icon[i].classList.add("responsive-timeline__in-view-icon");
        } else {
          // Remove classes if element is below than half of viewport.
          timeline_icon[i].classList.add("responsive-timeline__out-view-icon");
          timeline_icon[i].classList.remove(
            "responsive-timeline__in-view-icon"
          );
        }
      }
    }
  }
  render() {
    // Setup the attributes
    const {
      attributes: {
        timelinAlignment,
        timelineItems,
        dateFormat,
        t_date,
        displayPostDate,
        count,
        gutter,
        contentAlign,
        dateColor,
        headingColor,
        contentColor,
        dateFontFamily,
        headingFontFamily,
        contentFontFamily,
        dateLineHeight,
        dateFontWeight,
        dateFontSize,
        headingLineHeight,
        headingFontWeight,
        headingFontSize,
        contentLineHeight,
        contentFontWeight,
        contentFontSize,
        headingTag,
        itemBorderRadius,
        itemPadding,
        horizontalSpace,
        verticalSpace,
        itemBorderWidth,
        itemBorderStyle,
        itemBorderColor,
        backgroundColor,
        counterId,
        opacity,
        separatorColor,
        iconColor,
        separatorBg,
        separatorBorder,
        separatorFillColor,
        iconFocus,
        iconBgFocus,
        borderFocus,
        iconSize,
        connectorBgsize,
        borderwidth,
        separatorwidth,
        icon,
        headingBottomMargin,
        stack,
        arrowlinAlignment,
      },
      setAttributes,
      mergeBlocks,
      insertBlocksAfter,
    } = this.props;

    setAttributes({ counterId: this.props.clientId });

    var data_copy = [...timelineItems];
    var post_date;
    var content_align_class = AlignClass(this.props.attributes, 0); // Get classname for layout alignment
    var day_align_class = DayAlignClass(this.props.attributes, 0); // Get classname for day alignment.
    var display_inner_date = false;
    var isCenter = "";
    var border_with_color = "13px solid" + backgroundColor;

    let imgopacity = opacity / 100;

    return [
      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,

      <Style>
        {`
        .wp-block-responsive-content-timeline-${counterId} .responsive-timeline__left .responsive-timeline__day-left .responsive-timeline__arrow:after {
                border-right: ${border_with_color};
            }
            .wp-block-responsive-content-timeline-${counterId} .responsive-timeline__right .responsive-timeline__day-right .responsive-timeline__arrow:after {
                border-left: ${border_with_color};
            }
            .responsive-timeline__line {
                background-color: ${separatorColor};
            }
            .responsive-timeline__line__inner {
			    background-color : ${separatorFillColor};
			}
			.responsive-timeline__main .skt-blocks-ifb-icon svg{
			    color: ${iconColor};
			}
			.responsive-timeline__main .skt-blocks-ifb-icon svg {
			    fill: ${iconColor};
		    }
		    .responsive-timeline__marker{
		        background-color: ${separatorBg};
		        border-color: ${separatorBorder};
		        }
		    .responsive-timeline__main .responsive-timeline__marker.responsive-timeline__in-view-icon {
		    	background : ${iconBgFocus};
			    border-color: ${borderFocus};
			    color: ${iconFocus};
		    }
		    .responsive-timeline__main .responsive-timeline__marker.responsive-timeline__in-view-icon svg{
		        fill: ${iconFocus};
		    }
		    .responsive-timeline__main .responsive-timeline__marker.responsive-timeline__in-view-icon .responsive-timeline__icon-new {
			    color: ${iconFocus};
		}
		.responsive-timeline__left-block .responsive-timeline__line{
		    left: calc(${connectorBgsize}px/2);
		}
		.responsive-timeline__right-block .responsive-timeline__line{
		    right: calc(${connectorBgsize}px/2);
		}
		@media(max-width:767px){
            .responsive-timeline__center-block.responsive-timeline__responsive-mobile .responsive-timeline__line{
                left: calc(${connectorBgsize}px/2);
                right: calc(${connectorBgsize}px/2);
            }
            .responsive-timeline__left-block.responsive-timeline__responsive-mobile .responsive-timeline__line{
                left: calc(${connectorBgsize}px/2);
            }
            .responsive-timeline__right-block.responsive-timeline__responsive-mobile .responsive-timeline__line{
                right: calc(${connectorBgsize}px/2);
            }

		}
		@media(max-width:976px){
            .responsive-timeline__center-block.responsive-timeline__responsive-tablet .responsive-timeline__line{
                left: calc(${connectorBgsize}px/2);
                right: calc(${connectorBgsize}px/2);
            }
            .responsive-timeline__left-block.responsive-timeline__responsive-tablet .responsive-timeline__line{
                left: calc(${connectorBgsize}px/2);
            }
            .responsive-timeline__right-block.responsive-timeline__responsive-tablet .responsive-timeline__line{
                right: calc(${connectorBgsize}px/2);
            }
		}
        `}
      </Style>,
      <div
        className={classnames(
          `wp-block-responsive-content-timeline-${counterId}`,
          "responsive-timeline__outer-wrap"
        )}
      >
        <div
          className={classnames(
            "responsive-timeline__content-wrap",
            ...ContentTmClasses(this.props.attributes)
          )}
        >
          <div className="responsive-timeline-wrapper">
            <div className="responsive-timeline__main">
              <div className="responsive-timeline__days">
                {timelineItems.map((post, index) => {
                  isCenter = dateI18n(dateFormat, t_date[index].title);
                  if (timelinAlignment == "center") {
                    display_inner_date = true;
                    content_align_class = AlignClass(
                      this.props.attributes,
                      index
                    );
                    day_align_class = DayAlignClass(
                      this.props.attributes,
                      index
                    );
                    isCenter = "";
                  }

                  return (
                    <article
                      className="responsive-timeline__field responsive-timeline__field-wrap"
                      style={{ marginBottom: verticalSpace }}
                      key={index}
                    >
                      <div className={content_align_class}>
                        <div
                          className="responsive-timeline__marker responsive-timeline__out-view-icon"
                          style={{
                            marginLeft: horizontalSpace,
                            marginRight: horizontalSpace,
                            minWidth: connectorBgsize,
                            minHeight: connectorBgsize,
                            borderWidth: borderwidth,
                          }}
                        >
                          <span>
                            {" "}
                            <div className="skt-blocks-ifb-icon-wrap">
                              <span
                                className="skt-blocks-ifb-icon"
                                style={{
                                  width: iconSize,
                                  height: iconSize,
                                }}
                              >
                                {renderSVG(icon)}
                              </span>
                            </div>{" "}
                          </span>
                        </div>

                        <div className={day_align_class}>
                          <div className="responsive-timeline__events-new">
                            <div
                              className="responsive-timeline__events-inner-new"
                              style={{
                                borderRadius: itemBorderRadius,
                                borderWidth: itemBorderWidth,
                                borderStyle: itemBorderStyle,
                                borderColor: itemBorderColor,
                                padding: itemPadding,
                                backgroundColor: backgroundColor,
                                opacity: imgopacity,
                              }}
                            >
                              {dateFontFamily && loadGoogleFont(dateFontFamily)}
                              {headingFontFamily &&
                                loadGoogleFont(headingFontFamily)}
                              {contentFontFamily &&
                                loadGoogleFont(contentFontFamily)}
                              <div className="responsive-timeline__date-hide responsive-timeline__date-inner">
                                {displayPostDate && t_date[index].title && (
                                  <div
                                    className={
                                      "responsive-timeline__inner-date-new"
                                    }
                                    style={{
                                      color: dateColor,
                                      lineHeight: dateLineHeight,
                                      fontWeight: dateFontWeight,
                                      fontSize: dateFontSize,
                                      fontFamily: dateFontFamily,
                                    }}
                                  >
                                    {isCenter}
                                  </div>
                                )}
                              </div>

                              <div className="responsive-content">
                                <div className="responsive-timeline__heading-text">
                                  <RichText
                                    tagName={headingTag}
                                    value={post.time_heading}
                                    placeholder={__("Write a Heading")}
                                    className="responsive-timeline__heading"
                                    onChange={(value) => {
                                      var p = {
                                        time_heading: value,
                                        time_desc:
                                          data_copy[index]["time_desc"],
                                      };
                                      data_copy[index] = p;
                                      setAttributes({
                                        timelineItems: data_copy,
                                      });
                                    }}
                                    style={{
                                      color: headingColor,
                                      lineHeight: headingLineHeight,
                                      fontWeight: headingFontWeight,
                                      fontSize: headingFontSize,
                                      fontFamily: headingFontFamily,
                                      marginBottom: headingBottomMargin,
                                    }}
                                    onMerge={mergeBlocks}
                                    unstableOnSplit={
                                      insertBlocksAfter
                                        ? (before, after, ...blocks) => {
                                            setAttributes({ content: before });
                                            insertBlocksAfter([
                                              ...blocks,
                                              createBlock("core/paragraph", {
                                                content: after,
                                              }),
                                            ]);
                                          }
                                        : undefined
                                    }
                                    onRemove={() => onReplace([])}
                                  />
                                </div>

                                <RichText
                                  tagName="p"
                                  value={post.time_desc}
                                  placeholder={__("Write a Description")}
                                  className="responsive-timeline-desc-content"
                                  onChange={(value) => {
                                    var p = {
                                      time_heading:
                                        data_copy[index]["time_heading"],
                                      time_desc: value,
                                    };
                                    data_copy[index] = p;
                                    setAttributes({ timelineItems: data_copy });
                                  }}
                                  style={{
                                    color: contentColor,
                                    lineHeight: contentLineHeight,
                                    fontWeight: contentFontWeight,
                                    fontSize: contentFontSize,
                                    fontFamily: contentFontFamily,
                                  }}
                                  onMerge={mergeBlocks}
                                  unstableOnSplit={this.splitBlock}
                                  onRemove={() => onReplace([])}
                                />

                                <div className="responsive-timeline__arrow">
                                  {" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {display_inner_date && (
                          <div className="responsive-timeline__date-new">
                            {displayPostDate && t_date[index].title && (
                              <div
                                className={"responsive-timeline__date-new"}
                                style={{
                                  color: dateColor,
                                  lineHeight: dateLineHeight,
                                  fontWeight: dateFontWeight,
                                  fontSize: dateFontSize,
                                  fontFamily: dateFontFamily,
                                }}
                              >
                                {dateI18n(dateFormat, t_date[index].title)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div
                className="responsive-timeline__line"
                style={{
                  backgroundColor: separatorColor,
                  width: separatorwidth,
                  marginLeft:
                    timelinAlignment !== "center" ? horizontalSpace : "",
                  marginRight:
                    timelinAlignment !== "center" ? horizontalSpace : "",
                }}
              >
                <div className="responsive-timeline__line__inner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>,
    ];
  }
}
