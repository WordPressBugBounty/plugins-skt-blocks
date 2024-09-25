/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import IconList from "./iconlist";
import memoize from "memize";
import times from "lodash/times";
import React from "react";
import Style from "style-it";
import generateCSSUnit from "../../../generateCSSUnit";
import { loadGoogleFont } from "../../../utils/font";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { select } = wp.data;
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

const ALLOWED_BLOCKS = ["skt-blocks/icons-list-child"];

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    // Pushing Style tag for this block css.
    const $style = document.createElement("style");
    $style.setAttribute(
      "id",
      "skt-blocks-style-icon-list-" + this.props.clientId
    );
    document.head.appendChild($style);

    this.changeChildAttr(this.props.attributes.hideLabel);
  }

  changeChildAttr(value) {
    const { setAttributes } = this.props;
    const getChildBlocks = select("core/block-editor").getBlocks(
      this.props.clientId
    );

    getChildBlocks.forEach((iconChild, key) => {
      iconChild.attributes.hideLabel = value;
    });
    setAttributes({ hideLabel: value });
  }

  render() {
    // Setup the attributes
    const { attributes, setAttributes } = this.props;

    const {
      align,
      icon_count,
      icons,
      hideLabel,
      gap,
      inner_gap,
      size,
      fontSize,
      border,
      bgSize,
      borderRadius,
      fontSizeType,
      maincounterId,
      labelFontFamily,
      labelFontWeight,
      labelFontSize,
      labelFontLineHeight,
      labelFontSizeTablet,
      labelFontSizeMobile,
    } = attributes;

    setAttributes({ maincounterId: this.props.clientId });

    const getIconTemplate = memoize((icon_block, icons) => {
      return times(icon_block, (n) => [
        "skt-blocks/icons-list-child",
        icons[n],
      ]);
    });

    var element = document.getElementById(
      "skt-blocks-style-icon-list-" + this.props.clientId
    );

    const labelClass = hideLabel
      ? "skt-blocks-icon-list__no-label"
      : "";

    var editor_gap = undefined !== typeof gap && "" !== gap ? gap + 0 : 0;

    var alignment =
      align == "left" ? "flex-start" : align == "right" ? "flex-end" : "center";

    return (
      <Fragment>
        <BlockControls key="controls">
          <AlignmentToolbar
            value={align}
            onChange={(value) => setAttributes({ align: value })}
          />
        </BlockControls>

        <Inspector {...{ setAttributes, ...this.props }} />

        <IconList {...this.props}>
          <div
            className={classnames(
              `skt-blocks-icon-wrap-${maincounterId}`,
              "skt-blocks-icon-list__wrap"
            )}
          >
            {labelFontFamily && loadGoogleFont(labelFontFamily)}
            <InnerBlocks
              template={getIconTemplate(icon_count, icons)}
              templateLock={false}
              allowedBlocks={ALLOWED_BLOCKS}
            />
          </div>
        </IconList>
        <Style>
          {`
		  .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__source-icon svg {
		   width: ${generateCSSUnit(size, fontSizeType)};
		   height: ${generateCSSUnit(size, fontSizeType)};
	   }

	   .skt-blocks-icon-list__layout-horizontal .skt-blocks-icon-wrap-${maincounterId} .wp-block-skt-blocks-icons-list-child {
		   margin-left: ${generateCSSUnit(editor_gap / 2, "px")};
		   margin-right: ${generateCSSUnit(editor_gap / 2, "px")};
	   }
	   .skt-blocks-icon-list__layout-vertical .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__content-wrap {
		   margin-bottom: ${generateCSSUnit(editor_gap, "px")};
	   }

	   .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__source-wrap {
		   padding: ${generateCSSUnit(bgSize, "px")};
		   border-radius: ${generateCSSUnit(borderRadius, "px")};
		   border-width: ${generateCSSUnit(border, "px")};
	   }

	   .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__source-icon {
		   width: ${generateCSSUnit(size, fontSizeType)};
		   height: ${generateCSSUnit(size, fontSizeType)};
		   font-size: ${generateCSSUnit(size, fontSizeType)};
	   }

	   .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__source-image {
		   width: ${generateCSSUnit(size, fontSizeType)};
		   height: ${generateCSSUnit(size, fontSizeType)};
	   }

	   .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__label-wrap {
		   text-align: ${align};
	   }
	   .skt-blocks-icon-wrap-${maincounterId}.skt-blocks-icon-list__wrap .block-editor-inner-blocks {
		   text-align: ${align};
	   }

	   .skt-blocks-icon-list__layout-horizontal .skt-blocks-icon-wrap-${maincounterId} .block-editor-block-list__layout {
		   justify-content: ${alignment};
		   -webkit-box-pack: ${alignment};
		   -ms-flex-pack: ${alignment};
	   }
 	.skt-blocks-icon-list__layout-horizontal .wp-block[data-type="skt-blocks/icons-list-child"]:first-child .wp-block-skt-blocks-icons-list-child {
 	  margin-left:0;
 	}
    .skt-blocks-icon-list__layout-horizontal .wp-block[data-type="skt-blocks/icons-list-child"]:last-child .wp-block-skt-blocks-icons-list-child {
 	  margin-right:0;
 	}

	`}
        </Style>
        {!hideLabel && (
          <Style>
            {`
		  .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__source-wrap {
			  margin-right: ${generateCSSUnit(inner_gap, "px")};
		  }
		  .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__label {
                font-weight: ${labelFontWeight};
                font-family: ${labelFontFamily};
                line-height: ${labelFontLineHeight};
            }
		  @media only screen and (min-width: 976px){
            .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__label {
                font-size: ${labelFontSize}px;
            }
		  }
		  @media only screen and (max-width: 976px){
            .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__label {
                font-size: ${labelFontSizeTablet}px;
            }
		  }
		  @media only screen and (max-width: 767px){
            .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__label {
                font-size: ${labelFontSizeMobile}px;
            }
		  }
	  `}
          </Style>
        )}
      </Fragment>
    );
  }
}
