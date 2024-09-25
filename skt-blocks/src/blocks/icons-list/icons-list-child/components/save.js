/**
 * Internal dependencies
 */
import IconList from "./iconlist";
import renderSVG from "../../../../renderIcon";
import ResponsiveBlocksIcon from "../../../../ResponsiveBlocksIcon.json";
import classnames from "classnames";
import React from "react";
import Style from "style-it";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.editor;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      label,
      hideLabel,
      icon,
      icon_color,
      label_color,
      icon_hover_color,
      label_hover_color,
      icon_bg_color,
      icon_bg_hover_color,
      icon_border_color,
      icon_border_hover_color,
      link,
      target,
      disableLink,
      align,
      gap,
      inner_gap,
      icon_layout,
      size,
      fontSize,
      border,
      bgSize,
      borderRadius,
      fontSizeType,
      counterId,
      image,
      source_type,
    } = this.props.attributes;

    var editor_gap = undefined !== typeof gap && "" !== gap ? gap + 15 : 15;

    let image_icon_html = "";

    if (source_type == "icon") {
      if (icon) {
        image_icon_html = (
          <span className="skt-blocks-icon-list__source-icon">
            {renderSVG(icon)}
          </span>
        );
      }
    } else {
      if (image && image.url) {
        image_icon_html = (
          <img
            className="skt-blocks-icon-list__source-image"
            src={image.url}
          />
        );
      }
    }

    let target_val = target ? "_blank" : "_self";
    let link_url = !disableLink ? link : "/";

    return [
      <IconList {...this.props}>
        {!disableLink && (
          <a
            target={target_val}
            rel="noopener noreferrer"
            aria-label={label}
            href={link_url}
            class="wp-skt-blocks-icon-list skt-blocks-icon-list-link"
          ></a>
        )}
        <div
          className={classnames(
            `skt-blocks-icon-${counterId}`,
            " skt-blocks-icon-list__content-wrap"
          )}
        >
          <span className="skt-blocks-icon-list__source-wrap">
            {image_icon_html}
          </span>
          {!hideLabel && (
            <div className="skt-blocks-icon-list__label-wrap">
              <RichText.Content
                tagName="div"
                value={label}
                className="skt-blocks-icon-list__label"
              />
            </div>
          )}
        </div>
      </IconList>,
      <Style type="text/css">
        {`
  		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-icon {
  			  color: ${icon_color};
  		  }
  		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-icon:hover {
  			  color: ${icon_hover_color};
  		  }

  		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-wrap {
  			  background-color: ${icon_bg_color};
   			 border-color: ${icon_border_color};
  		 }
  		 .wp-block-skt-blocks-icons-list-child:hover .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-wrap {
  			 background-color: ${icon_bg_hover_color};
  			 border-color: ${icon_border_hover_color};
  		 }

  		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-icon svg {
  			  fill: ${icon_color};
  		  }
  		  .wp-block-skt-blocks-icons-list-child:hover .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-icon svg {
  			  fill: ${icon_hover_color};
  		  }

  		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__label {
  			 color: ${label_color};
  		 }
.wp-block-skt-blocks-icons-list-child:hover .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__label {
  			 color: ${label_hover_color};
  		 }

  	  `}
      </Style>,
    ];
  }
}
