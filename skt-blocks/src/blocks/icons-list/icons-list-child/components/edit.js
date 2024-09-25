/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import IconList from "./iconlist";
import renderSVG from "../../../../renderIcon";
import ResponsiveBlocksIcon from "../../../../ResponsiveBlocksIcon.json";
import React from "react";
import Style from "style-it";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  InspectorControls,
} = wp.editor;
const {
  Button,
  Dashicon,
  BaseControl,
  PanelBody,
  RangeControl,
} = wp.components;

const ALLOWED_BLOCKS = ["skt-blocks/icons-list"];

let svg_icons = Object.keys(ResponsiveBlocksIcon);

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    // Assigning block_id in the attribute.
    this.props.setAttributes({ block_id: this.props.clientId });

    // Pushing Style tag for this block css.
    const $style = document.createElement("style");
    $style.setAttribute(
      "id",
      "skt-blocks-style-icon-list-child-" +
        this.props.clientId
    );
    document.head.appendChild($style);
  }

  render() {
    // Setup the attributes
    const { attributes, setAttributes } = this.props;

    const {
      label,
      hideLabel,
      icon,
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
      icon_color,
      label_color,
      icon_hover_color,
      label_hover_color,
      icon_bg_color,
      icon_bg_hover_color,
      icon_border_color,
      icon_border_hover_color,
      counterId,
      image,
      source_type,
      link,
      target,
      disableLink,
    } = attributes;

    setAttributes({ counterId: this.props.clientId });

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

    var element = document.getElementById(
      "skt-blocks-style-icon-list-child-" +
        this.props.clientId
    );

    return (
      <Fragment>
        <Inspector {...{ setAttributes, ...this.props }} />

        <IconList {...this.props}>
          {!disableLink && (
            <a
              target={target_val}
              rel="noopener noreferrer"
              aria-label={label}
              href={link_url}
              class="skt-blocks-icon-list-link"
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
                <RichText
                  tagName="div"
                  placeholder={__(
                    "Label Name",
                    "skt-blocks"
                  )}
                  value={label}
                  onChange={(value) => setAttributes({ label: value })}
                  className="skt-blocks-icon-list__label"
                  multiline={false}
                  allowedFormats={[
                    "core/bold",
                    "core/italic",
                    "core/strikethrough",
                  ]}
                />
              </div>
            )}
          </div>
        </IconList>
        <Style>
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
		 .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-wrap:hover {
			 background-color: ${icon_bg_hover_color};
			 border-color: ${icon_border_hover_color};
		 }

		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-icon svg {
			  fill: ${icon_color};
		  }
		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__source-icon svg:hover {
			  fill: ${icon_hover_color};
		  }

		  .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__label {
			 color: ${label_color};
		 }
		 .skt-blocks-icon-${counterId}.skt-blocks-icon-list__content-wrap .skt-blocks-icon-list__label:hover {
			 color: ${label_hover_color};
		 }
	  `}
        </Style>
      </Fragment>
    );
  }
}
