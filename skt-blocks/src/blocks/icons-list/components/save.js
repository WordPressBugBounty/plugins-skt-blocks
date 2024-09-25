/**
 * Internal dependencies
 */
import IconList from "./iconlist";
import classnames from "classnames";
import React from "react";
import Style from "style-it";
import generateCSSUnit from "../../../generateCSSUnit";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
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
    } = this.props.attributes;

    const labelClass = hideLabel
      ? "skt-blocks-icon-list__no-label"
      : "";

    var editor_gap = undefined !== typeof gap && "" !== gap ? gap + 0 : 0;
    var alignment =
      align == "left" ? "flex-start" : align == "right" ? "flex-end" : "center";

    return [
      <IconList {...this.props}>
        <div
          className={classnames(
            `skt-blocks-icon-wrap-${maincounterId}`,
            "skt-blocks-icon-list__wrap"
          )}
        >
          <InnerBlocks.Content />
        </div>
      </IconList>,
      <Fragment>
        <Style type="text/css">
          {`
		  .skt-blocks-icon-wrap-${maincounterId} .skt-blocks-icon-list__source-icon svg {
		   width: ${generateCSSUnit(size, fontSizeType)};
		   height: ${generateCSSUnit(size, fontSizeType)};
	   }
	   .skt-blocks-icon-list__layout-horizontal .skt-blocks-icon-wrap-${maincounterId} .wp-block-skt-blocks-icons-list-child{
		   margin-left: ${generateCSSUnit(editor_gap / 2, "px")};
		   margin-right: ${generateCSSUnit(editor_gap / 2, "px")};
	   }
       .skt-blocks-icon-list__layout-horizontal .skt-blocks-icon-wrap-${maincounterId} .wp-block-skt-blocks-icons-list-child:first-child {
		   margin-left: 0;
	   }
	   .skt-blocks-icon-list__layout-horizontal .skt-blocks-icon-wrap-${maincounterId} .wp-block-skt-blocks-icons-list-child:nth-last-child(2) {
	        margin-right: 0;
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

	  .skt-blocks-icon-list__outer-wrap .skt-blocks-icon-wrap-${maincounterId}.skt-blocks-icon-list__wrap {
		  align-items: ${alignment};
		  align-items: ${align};
		  justify-content: ${align};
		  justify-content: ${alignment};
	  }

	  .skt-blocks-icon-list__layout-horizontal .skt-blocks-icon-wrap-${maincounterId} .block-editor-block-list__layout {
		  justify-content: ${alignment};
		  -webkit-box-pack: ${alignment};
		  -ms-flex-pack: ${alignment};
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
      </Fragment>,
    ];
  }
}
