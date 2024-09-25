/**
 * Internal dependencies
 */
import classnames from "classnames";
import map from "lodash/map";
import AlignClass from "./align-classes";
import DayAlignClass from "./day-align-classes";
import ContentTmClasses from "./classes";
import React from "react";
import Style from "style-it";
import renderSVG from "../../../renderIcon";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.editor;
const { Dashicon } = wp.components;
const { dateI18n } = wp.date;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      timelineItems,
      contentAlign,
      count,
      gutter,
      title,
      amount,
      features,
      textColor,
      itemBackgroundColor,
      timelinAlignment,
      displayPostDate,
      icon,
      tm_content,
      t_date,
      date_icon,
      timelineItem,
      dateFormat,
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
      itemBorderWidth,
      itemBorderColor,
      itemBorderStyle,
      itemPadding,
      horizontalSpace,
      verticalSpace,
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
      headingBottomMargin,
      stack,
      arrowlinAlignment,
    } = this.props.attributes;
    var data_copy = [...timelineItems];
    var content_align_class = AlignClass(this.props.attributes, 0); // Get classname for layout alignment
    var day_align_class = DayAlignClass(this.props.attributes, 0); //

    var display_inner_date = false;
    var isCenter = "";
    var border_with_color = "13px solid" + backgroundColor;

    let imgopacity = opacity / 100;

    return [
      <Style type="text/css">
        {`.wp-block-skt-blocks-content-timeline-${counterId} .responsive-timeline__left .responsive-timeline__day-left .responsive-timeline__arrow:after {
                border-right: ${border_with_color};
            }
            .wp-block-skt-blocks-content-timeline-${counterId} .responsive-timeline__right .responsive-timeline__day-right .responsive-timeline__arrow:after {
                border-left: ${border_with_color};
            }
            .responsive-timeline__line {
                background-color: ${separatorColor};
            }
            .responsive-timeline__line__inner {
			    background-color : ${separatorFillColor};
			}
			.responsive-timeline__main .skt-blocks-ifb-icon {
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
		.responsive-timeline__rightt-block .responsive-timeline__line{
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
          this.props.className,
          "responsive-timeline__outer-wrap",
          `wp-block-skt-blocks-content-timeline-${counterId}`
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
                  if (timelineItem <= index) {
                    return;
                  }

                  isCenter = dateI18n(dateFormat, t_date[index].title);
                  if (timelinAlignment == "center") {
                    display_inner_date = true;
                    content_align_class = AlignClass(
                      this.props.attributes,
                      index
                    ); // Get classname for layout alignment
                    day_align_class = DayAlignClass(
                      this.props.attributes,
                      index
                    ); //
                    isCenter = "";
                  }
                  const Tag = headingTag;
                  var icon_class =
                    "responsive-timeline__icon-new out-view-responsive-timeline__icon ";
                  var post_date = t_date[index].title;
                  if ("custom" != dateFormat) {
                    post_date = t_date[index].title;
                    if (post_date === "Invalid date") {
                      post_date = t_date[index].title;
                    }
                  }
                  return (
                    <article
                      className="responsive-timeline__field responsive-timeline__field-wrap"
                      key={index}
                      style={{ marginBottom: verticalSpace }}
                    >
                      <div className={classnames(...content_align_class)}>
                        <div
                          className="responsive-timeline__marker out-view-responsive-timeline__icon"
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
                          </span>{" "}
                        </div>

                        <div className={classnames(...day_align_class)}>
                          <div className="responsive-events-new">
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

                              <div className="responsive-timeline-content">
                                <div className="responsive-timeline__heading-text">
                                  <RichText.Content
                                    tagName={headingTag}
                                    value={post.time_heading}
                                    className="responsive-timeline__heading"
                                    style={{
                                      color: headingColor,
                                      lineHeight: headingLineHeight,
                                      fontWeight: headingFontWeight,
                                      fontSize: headingFontSize,
                                      fontFamily: headingFontFamily,
                                      marginBottom: headingBottomMargin,
                                    }}
                                  />
                                </div>

                                <RichText.Content
                                  tagName="p"
                                  value={post.time_desc}
                                  className="responsive-timeline-desc-content"
                                  style={{
                                    color: contentColor,
                                    lineHeight: contentLineHeight,
                                    fontWeight: contentFontWeight,
                                    fontSize: contentFontSize,
                                    fontFamily: contentFontFamily,
                                  }}
                                />

                                <div className="responsive-timeline__arrow"></div>
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
                                {post_date}
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
