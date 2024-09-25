/**
 * BLOCK: Accordion
 */

import classnames from "classnames";
import icons from "../../../utils/components/icons";
import renderSVG from "../../../renderIcon";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import times from "lodash/times";
import memoize from "memize";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";

import generateCSS from "../../../generateCSS";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";
import Style from "style-it";

function styling(props) {
  const {
    layout,
    inactiveOtherItems,
    expandFirstItem,
    rowsGap,
    columnsGap,
    align,
    titleTextColor,
    titleActiveBackgroundColor,
    titleActiveTextColor,
    titleTextActiveColor,
    titlePaddingTypeDesktop,
    vtitlePaddingMobile,
    vtitlePaddingTablet,
    vtitlePaddingDesktop,
    htitlePaddingMobile,
    htitlePaddingTablet,
    htitlePaddingDesktop,
    contentPaddingTypeDesktop,
    vcontentPaddingMobile,
    vcontentPaddingTablet,
    vcontentPaddingDesktop,
    hcontentPaddingMobile,
    hcontentPaddingTablet,
    hcontentPaddingDesktop,
    iconColor,
    iconActiveColor,
    iconHoverColor,
    titleFontWeight,
    titleFontSize,
    titleFontFamily,
    titleLineHeight,
    contentFontWeight,
    contentFontSize,
    contentFontFamily,
    contentLineHeight,
    iconAlign,
    iconSize,
    iconSizeType,
    iconSizeMobile,
    iconSizeTablet,
    columns,
    titleLeftPaddingTablet,
    titleBottomPaddingTablet,
    titleLeftPaddingDesktop,
    titleBottomPaddingDesktop,
    titleLeftPaddingMobile,
    titleBottomPaddingMobile,
    titleBackgroundColorOpacity,
    marginV,
    marginH,
    titleSecondaryBackgroundColor,
    titleGradientDegree,
    titleBgGradient,
    titleBackgroundColor,
    contentTextColor,
    contentSecondaryBackgroundColor,
    contentGradientDegree,
    contentBgGradient,
    contentBackgroundColor,
    contentBackgroundColorOpacity,
  } = props.attributes;

  var selectors = {};
  var tablet_selectors = {};
  var mobile_selectors = {};
  var icon_color = iconColor;
  var icon_active_color = iconActiveColor;

  if ("undefined" == typeof iconColor || "" == iconColor) {
    icon_color = titleTextColor;
  }
  if ("undefined" == typeof iconActiveColor || "" == iconActiveColor) {
    icon_active_color = titleTextActiveColor;
  }

  let contentOpacity = titleBackgroundColorOpacity / 100;
  let contentBackgroundColorsOpacity = contentBackgroundColorOpacity / 100;

  var temptitleSecondaryBackgroundColor = titleBgGradient
    ? titleSecondaryBackgroundColor
    : titleBackgroundColor;

  var titleGradient;
  if (titleBgGradient) {
    titleGradient =
      "linear-gradient(" +
      titleGradientDegree +
      "deg," +
      hexToRgba(titleBackgroundColor || "#ffffff", contentOpacity || 0) +
      "," +
      hexToRgba(
        temptitleSecondaryBackgroundColor || "#ffffff",
        contentOpacity || 0
      ) +
      ")";
  }
  var tempActiveSecondaryBackgroundColor = contentBgGradient
    ? contentSecondaryBackgroundColor
    : contentBackgroundColor;

  var contentGradient =
    "linear-gradient(" +
    contentGradientDegree +
    "deg," +
    hexToRgba(
      contentBackgroundColor || "#ffffff",
      contentBackgroundColorOpacity || 0
    ) +
    "," +
    hexToRgba(
      tempActiveSecondaryBackgroundColor || "#ffffff",
      contentBackgroundColorsOpacity || 0
    ) +
    ")";

  selectors = {
    " ": {
      "margin-top": marginV + "px",
      "margin-bottom": marginV + "px",
      "margin-left": marginH + "px",
      "margin-right": marginH + "px",
    },
    " .skt-blocks-icon svg": {
      width: generateCSSUnit(iconSize, iconSizeType),
      height: generateCSSUnit(iconSize, iconSizeType),
      "font-size": generateCSSUnit(iconSize, iconSizeType),
      fill: icon_color,
      "margin-right": "10px",
    },
    " .skt-blocks-icon-active svg": {
      width: generateCSSUnit(iconSize, iconSizeType),
      height: generateCSSUnit(iconSize, iconSizeType),
      "font-size": generateCSSUnit(iconSize, iconSizeType),
      fill: icon_active_color,
      "margin-right": "10px",
    },

    " .skt-blocks-icon svg:hover": {
      fill: iconHoverColor + "!important",
    },

    " .skt-blocks-icon-active svg:hover": {
      fill: iconHoverColor + "!important",
    },
    " .skt-blocks-accordion-item__outer-wrap": {
      "margin-bottom": generateCSSUnit(rowsGap, "px"),
    },
    " .skt-blocks-accordion-layout-grid .block-editor-inner-blocks .block-editor-block-list__layout": {
      "grid-column-gap": generateCSSUnit(columnsGap, "px"),
      "grid-row-gap": generateCSSUnit(rowsGap, "px"),
    },
    " .skt-blocks-accordion-titles-button": {
      "padding-top": generateCSSUnit(
        vtitlePaddingDesktop,
        titlePaddingTypeDesktop
      ),
      "padding-bottom": generateCSSUnit(
        titleBottomPaddingDesktop,
        titlePaddingTypeDesktop
      ),
      "padding-right": generateCSSUnit(
        htitlePaddingDesktop,
        titlePaddingTypeDesktop
      ),
      "padding-left": generateCSSUnit(
        titleLeftPaddingDesktop,
        titlePaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-content span": {
      "margin-top": generateCSSUnit(
        vcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
      "margin-bottom": generateCSSUnit(
        vcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
      "margin-right": generateCSSUnit(
        hcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
      "margin-left": generateCSSUnit(
        hcontentPaddingDesktop,
        contentPaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-item:hover .skt-blocks-icon svg": {
      fill: icon_active_color,
    },
    " .skt-blocks-accordion-item .skt-blocks-accordion-titles-button.skt-blocks-accordion-titles": {
      "flex-direction": iconAlign,
    },
    " .skt-blocks-accordion-titles-button ": {
      "background-image": titleGradient,
    },
    " .skt-blocks-accordion-titles-button .skt-blocks-title": {
      "font-family": titleFontFamily,
      "font-size": titleFontSize + "px",
      "line-height": titleLineHeight,
      "font-weight": titleFontWeight,
    },
    " .skt-blocks-accordion-item .skt-blocks-accordion-content": {
      color: contentTextColor,
      "background-image": contentGradient,
      "font-size": contentFontSize + "px",
      "font-family": contentFontFamily,
      "line-height": contentLineHeight,
      "font-weight": contentFontWeight,
    },
  };

  tablet_selectors = {
    " .skt-blocks-accordion-titles-button": {
      "padding-top": generateCSSUnit(
        vtitlePaddingTablet,
        titlePaddingTypeDesktop
      ),
      "padding-bottom": generateCSSUnit(
        titleBottomPaddingTablet,
        titlePaddingTypeDesktop
      ),
      "padding-right": generateCSSUnit(
        htitlePaddingTablet,
        titlePaddingTypeDesktop
      ),
      "padding-left": generateCSSUnit(
        titleLeftPaddingTablet,
        titlePaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-content span": {
      "margin-top": generateCSSUnit(
        vcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
      "margin-bottom": generateCSSUnit(
        vcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
      "margin-right": generateCSSUnit(
        hcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
      "margin-left": generateCSSUnit(
        hcontentPaddingTablet,
        contentPaddingTypeDesktop
      ),
    },
    " .skt-blocks-icon svg": {
      width: generateCSSUnit(iconSizeTablet, iconSizeType),
      height: generateCSSUnit(iconSizeTablet, iconSizeType),
      "font-size": generateCSSUnit(iconSizeTablet, iconSizeType),
    },
    " .skt-blocks-icon-active svg": {
      width: generateCSSUnit(iconSizeTablet, iconSizeType),
      height: generateCSSUnit(iconSizeTablet, iconSizeType),
      "font-size": generateCSSUnit(iconSizeTablet, iconSizeType),
    },
  };

  mobile_selectors = {
    " .skt-blocks-accordion-titles-button": {
      "padding-top": generateCSSUnit(
        vtitlePaddingMobile,
        titlePaddingTypeDesktop
      ),
      "padding-bottom": generateCSSUnit(
        titleBottomPaddingMobile,
        titlePaddingTypeDesktop
      ),
      "padding-right": generateCSSUnit(
        htitlePaddingMobile,
        titlePaddingTypeDesktop
      ),
      "padding-left": generateCSSUnit(
        titleLeftPaddingMobile,
        titlePaddingTypeDesktop
      ),
    },
    " .skt-blocks-accordion-content span": {
      "margin-top": generateCSSUnit(
        vcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
      "margin-bottom": generateCSSUnit(
        vcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
      "margin-right": generateCSSUnit(
        hcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
      "margin-left": generateCSSUnit(
        hcontentPaddingMobile,
        contentPaddingTypeDesktop
      ),
    },
    " .skt-blocks-icon svg": {
      width: generateCSSUnit(iconSizeMobile, iconSizeType),
      height: generateCSSUnit(iconSizeMobile, iconSizeType),
      "font-size": generateCSSUnit(iconSizeMobile, iconSizeType),
    },
    " .skt-blocks-icon-active svg": {
      width: generateCSSUnit(iconSizeMobile, iconSizeType),
      height: generateCSSUnit(iconSizeMobile, iconSizeType),
      "font-size": generateCSSUnit(iconSizeMobile, iconSizeType),
    },
  };

  if ("accordion" === layout && true === inactiveOtherItems) {
    selectors[
      " .block-editor-block-list__layout .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-content"
    ] = {
      display: "none",
    };
  }
  if ("accordion" === layout && false === inactiveOtherItems) {
    (selectors[
      " .block-editor-inner-blocks .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon-active"
    ] = {
      display: "inline-block",
    }),
      (selectors[
        " .block-editor-inner-blocks .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon"
      ] = {
        display: "none",
      });
  }
  if ("accordion" === layout && true === expandFirstItem) {
    selectors[
      " .block-editor-block-list__layout > div:first-child > .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-content"
    ] = {
      display: "block",
    };
    (selectors[
      " .block-editor-block-list__layout > div:first-child > .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon-active"
    ] = {
      display: "inline-block",
    }),
      (selectors[
        " .block-editor-block-list__layout > div:first-child > .skt-blocks-accordion-item__outer-wrap .skt-blocks-accordion-item .skt-blocks-accordion-titles-button .skt-blocks-icon"
      ] = {
        display: "none",
      });
  }

  if ("grid" === layout) {
    selectors[
      " .block-editor-block-list__layout .skt-blocks-accordion-item__outer-wrap"
    ] = {
      "text-align": align,
    };
    selectors[
      " .skt-blocks-accordion-layout-grid .block-editor-inner-blocks > .block-editor-block-list__layout"
    ] = {
      "grid-template-columns": "repeat(" + columns + ", 1fr)",
    };
  }

  var styling_css = "";
  var id = `.skt-blocks-block-${props.clientId.substr(
    0,
    8
  )}`;

  styling_css = generateCSS(selectors, id);

  styling_css += generateCSS(tablet_selectors, id, true, "tablet");

  styling_css += generateCSS(mobile_selectors, id, true, "mobile");

  return styling_css;
}

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { select, withSelect } = wp.data;
const { Component, Fragment } = wp.element;

const {
  ColorPalette,
  InspectorControls,
  InnerBlocks,
  PanelColorSettings,
} = wp.blockEditor;

const {
  PanelBody,
  SelectControl,
  RangeControl,
  TabPanel,
  ButtonGroup,
  Button,
  Dashicon,
  ToggleControl,
  IconButton,
} = wp.components;

const ALLOWED_BLOCKS = ["skt-blocks/accordion-item"];

const accordion = [];

let svg_icons = Object.keys(ResponsiveBlocksIcon);
class ResponsiveBlockEditorAddonsAccordionEdit extends Component {
  constructor() {
    super(...arguments);
    this.onchangeIcon = this.onchangeIcon.bind(this);
    this.onchangeActiveIcon = this.onchangeActiveIcon.bind(this);
    this.onchangeLayout = this.onchangeLayout.bind(this);
    this.onchangeTag = this.onchangeTag.bind(this);
  }

  componentDidMount() {
    const { attributes, setAttributes } = this.props;

    const {
      titleBottomPaddingDesktop,
      vtitlePaddingDesktop,
      titleLeftPaddingDesktop,
      htitlePaddingDesktop,
      titleBottomPaddingTablet,
      vtitlePaddingTablet,
      titleLeftPaddingTablet,
      htitlePaddingTablet,
      titleBottomPaddingMobile,
      vtitlePaddingMobile,
      titleLeftPaddingMobile,
      htitlePaddingMobile,
    } = attributes;

    // Assigning block_id in the attribute.
    setAttributes({ block_id: this.props.clientId.substr(0, 8) });

    setAttributes({ schema: JSON.stringify(this.props.schemaJsonData) });
    // Pushing Style tag for this block css.
    const $style = document.createElement("style");
    $style.setAttribute(
      "id",
      "skt-blocks-style-accordion-" +
        this.props.clientId.substr(0, 8)
    );
    document.head.appendChild($style);

    for (var i = 1; i <= 2; i++) {
      accordion.push({
        title: "What is Accordion?",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      });
    }

    if (10 === titleBottomPaddingDesktop && 10 !== vtitlePaddingDesktop) {
      setAttributes({ titleBottomPaddingDesktop: vtitlePaddingDesktop });
    }
    if (10 === titleLeftPaddingDesktop && 10 !== htitlePaddingDesktop) {
      setAttributes({ titleLeftPaddingDesktop: htitlePaddingDesktop });
    }

    if (10 === titleBottomPaddingTablet && 10 !== vtitlePaddingTablet) {
      setAttributes({ titleBottomPaddingTablet: vtitlePaddingTablet });
    }
    if (10 === titleLeftPaddingTablet && 10 !== htitlePaddingTablet) {
      setAttributes({ titleLeftPaddingTablet: htitlePaddingTablet });
    }

    if (10 === titleBottomPaddingMobile && 10 !== vtitlePaddingMobile) {
      setAttributes({ titleBottomPaddingMobile: vtitlePaddingMobile });
    }
    if (10 === titleLeftPaddingMobile && 10 !== htitlePaddingMobile) {
      setAttributes({ titleLeftPaddingMobile: htitlePaddingMobile });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.props.schemaJsonData) !==
      JSON.stringify(prevProps.schemaJsonData)
    ) {
      this.props.setAttributes({
        schema: JSON.stringify(this.props.schemaJsonData),
      });
    }
    var element = document.getElementById(
      "skt-blocks-style-accordion-" +
        this.props.clientId.substr(0, 8)
    );

    if (null !== element && undefined !== element) {
      element.innerHTML = styling(this.props);
    }
  }
  onchangeIcon(value) {
    const { setAttributes } = this.props;
    let getChildBlocks = select("core/block-editor").getBlocks(
      this.props.clientId
    );
    getChildBlocks.forEach((accordionChild, key) => {
      accordionChild.attributes.icon = value;
    });

    setAttributes({ icon: value });
  }
  onchangeActiveIcon(value) {
    const { setAttributes } = this.props;
    const getChildBlocks = select("core/block-editor").getBlocks(
      this.props.clientId
    );

    getChildBlocks.forEach((accordionChild, key) => {
      accordionChild.attributes.iconActive = value;
    });

    setAttributes({ iconActive: value });
  }
  onchangeLayout(value) {
    const { setAttributes } = this.props;
    const getChildBlocks = select("core/block-editor").getBlocks(
      this.props.clientId
    );

    getChildBlocks.forEach((accordionChild, key) => {
      accordionChild.attributes.layout = value;
    });

    setAttributes({ layout: value });
  }
  onchangeTag(value) {
    const { setAttributes } = this.props;
    const getChildBlocks = select("core/block-editor").getBlocks(
      this.props.clientId
    );

    getChildBlocks.forEach((accordionChild, key) => {
      accordionChild.attributes.headingTag = value;
    });

    setAttributes({ headingTag: value });
  }

  render() {
    const { attributes, setAttributes } = this.props;
    const {
      layout,
      inactiveOtherItems,
      expandFirstItem,
      rowsGap,
      columnsGap,
      align,
      titleActiveTextColor,
      titleActiveBackgroundColor,
      titleTextColor,
      titleTextActiveColor,
      titlePaddingTypeDesktop,
      contentPaddingTypeDesktop,
      vcontentPaddingMobile,
      vcontentPaddingTablet,
      vcontentPaddingDesktop,
      hcontentPaddingMobile,
      hcontentPaddingTablet,
      hcontentPaddingDesktop,
      iconColor,
      iconActiveColor,
      iconHoverColor,
      titleFontWeight,
      titleFontFamily,
      titleFontSize,
      titleLineHeight,
      contentFontWeight,
      contentFontSize,
      contentFontFamily,
      contentLineHeight,
      icon,
      iconActive,
      iconAlign,
      iconSizeType,
      iconSizeMobile,
      iconSizeTablet,
      iconSize,
      columns,
      equalHeight,
      titleLeftPaddingTablet,
      htitlePaddingTablet,
      vtitlePaddingTablet,
      titleBottomPaddingTablet,
      titleLeftPaddingDesktop,
      htitlePaddingDesktop,
      vtitlePaddingDesktop,
      titleBottomPaddingDesktop,
      titleLeftPaddingMobile,
      htitlePaddingMobile,
      vtitlePaddingMobile,
      titleBottomPaddingMobile,
      headingTag,
      titleBackgroundColorOpacity,
      marginV,
      marginH,
      titleSecondaryBackgroundColor,
      titleGradientDegree,
      titleBgGradient,
      titleBackgroundColor,
      contentTextColor,
      contentSecondaryBackgroundColor,
      contentGradientDegree,
      contentBgGradient,
      contentBackgroundColor,
      contentBackgroundColorOpacity,
    } = attributes;

    const fontWeightOptions = [
      {
        value: "",
        label: __("Default", "skt-blocks"),
      },
      {
        value: "100",
        label: __("100", "skt-blocks"),
      },
      {
        value: "200",
        label: __("200", "skt-blocks"),
      },
      {
        value: "300",
        label: __("300", "skt-blocks"),
      },
      {
        value: "400",
        label: __("400", "skt-blocks"),
      },
      {
        value: "500",
        label: __("500", "skt-blocks"),
      },
      {
        value: "600",
        label: __("600", "skt-blocks"),
      },
      {
        value: "700",
        label: __("700", "skt-blocks"),
      },
      {
        value: "800",
        label: __("800", "skt-blocks"),
      },
      {
        value: "900",
        label: __("900", "skt-blocks"),
      },
    ];
    const getAccordionItemTemplate = memoize((accordion_count, accordion) => {
      return times(accordion_count, (n) => [
        "skt-blocks/accordion-item",
        accordion[n],
      ]);
    });

    const equalHeightClass = equalHeight
      ? "skt-blocks-accordion-equal-height"
      : "";

    const accordionGeneralSettings = () => {
      return (
        <PanelBody
          title={__("General")}
          initialOpen={true}
          className="skt_blocks__url-panel-body"
        >
          <SelectControl
            label={__("Layout")}
            value={layout}
            options={[
              { value: "accordion", label: __("Accordion") },
              { value: "grid", label: __("Grid") },
            ]}
            onChange={(value) => this.onchangeLayout(value)}
          />
          {"accordion" === layout && (
            <Fragment>
              <ToggleControl
                label={__("Collapse other items")}
                checked={inactiveOtherItems}
                onChange={(value) =>
                  setAttributes({ inactiveOtherItems: !inactiveOtherItems })
                }
              />
              {true === inactiveOtherItems && (
                <ToggleControl
                  label={__("Expand First Item")}
                  checked={expandFirstItem}
                  onChange={(value) =>
                    setAttributes({ expandFirstItem: !expandFirstItem })
                  }
                />
              )}
            </Fragment>
          )}

          <hr className="skt-blocks-editor__separator" />
          {"grid" === layout && (
            <RangeControl
              label={__("Columns")}
              value={columns}
              onChange={(value) => setAttributes({ columns: value })}
              min={0}
              max={4}
            />
          )}
          {"grid" === layout && (
            <Fragment>
              <h2> {__("Alignment")}</h2>
              <IconButton
                key={"left"}
                icon="editor-alignleft"
                label="Left"
                onClick={() => setAttributes({ align: "left" })}
                aria-pressed={"left" === align}
                isPrimary={"left" === align}
              />
              <IconButton
                key={"center"}
                icon="editor-aligncenter"
                label="Right"
                onClick={() => setAttributes({ align: "center" })}
                aria-pressed={"center" === align}
                isPrimary={"center" === align}
              />
              <IconButton
                key={"right"}
                icon="editor-alignright"
                label="Right"
                onClick={() => setAttributes({ align: "right" })}
                aria-pressed={"right" === align}
                isPrimary={"right" === align}
              />
            </Fragment>
          )}
          {"accordion" === layout && accordionIconSettings()}
        </PanelBody>
      );
    };

    const accordionColorSettings = () => {
      return (
        <PanelBody
          title={__("Color")}
          initialOpen={false}
          className="skt_blocks__url-panel-body"
        >
          <PanelColorSettings
            title={__("Title", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: titleTextColor,
                onChange: (value) => setAttributes({ titleTextColor: value }),
                label: __("Text color", "skt-blocks"),
              },
              {
                value: titleBackgroundColor,
                onChange: (value) =>
                  setAttributes({ titleBackgroundColor: value }),
                label: __("Background color", "skt-blocks"),
              },
              {
                value: titleActiveTextColor,
                onChange: (value) =>
                  setAttributes({ titleActiveTextColor: value }),
                label: __(
                  "Active Text color",
                  "skt-blocks"
                ),
              },
              {
                value: titleActiveBackgroundColor,
                onChange: (value) =>
                  setAttributes({ titleActiveBackgroundColor: value }),
                label: __(
                  "Active Background color",
                  "skt-blocks"
                ),
              },
            ]}
          >
            <ToggleControl
              label="Gradient Background"
              checked={titleBgGradient}
              onChange={() =>
                this.props.setAttributes({
                  titleBgGradient: !titleBgGradient,
                })
              }
            />
            {titleBgGradient && (
              <PanelColorSettings
                title={__(
                  "Secondary Background Color",
                  "skt-blocks"
                )}
                initialOpen={true}
                colorSettings={[
                  {
                    label: __(
                      "Secondary Background Color",
                      "skt-blocks"
                    ),
                    value: titleSecondaryBackgroundColor,
                    onChange: (value) =>
                      setAttributes({ titleSecondaryBackgroundColor: value }),
                  },
                ]}
              ></PanelColorSettings>
            )}

            {titleBgGradient && (
              <RangeControl
                label={__("Gradient Degree", "skt-blocks")}
                value={titleGradientDegree}
                onChange={(value) =>
                  setAttributes({
                    titleGradientDegree: value !== undefined ? value : 100,
                  })
                }
                min={0}
                max={360}
              />
            )}
            <RangeControl
              label={__(
                "Background Color Opacity",
                "skt-blocks"
              )}
              value={titleBackgroundColorOpacity}
              onChange={(value) =>
                setAttributes({
                  titleBackgroundColorOpacity:
                    value !== undefined ? value : 100,
                })
              }
              min={0}
              max={100}
            />
          </PanelColorSettings>
          <PanelColorSettings
            title={__("Content", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: contentTextColor,
                onChange: (value) => setAttributes({ contentTextColor: value }),
                label: __("Text color", "skt-blocks"),
              },
              {
                value: contentBackgroundColor,
                onChange: (value) =>
                  setAttributes({ contentBackgroundColor: value }),
                label: __("Background color", "skt-blocks"),
              },
            ]}
          >
            <ToggleControl
              label="Gradient Background"
              checked={contentBgGradient}
              onChange={() =>
                this.props.setAttributes({
                  contentBgGradient: !contentBgGradient,
                })
              }
            />
            {contentBgGradient && [
              <PanelColorSettings
                title={__(
                  "Secondary Background Color",
                  "skt-blocks"
                )}
                initialOpen={true}
                colorSettings={[
                  {
                    label: __(
                      "Secondary Background Color",
                      "skt-blocks"
                    ),
                    value: contentSecondaryBackgroundColor,
                    onChange: (value) =>
                      setAttributes({ contentSecondaryBackgroundColor: value }),
                  },
                ]}
              ></PanelColorSettings>,
              <RangeControl
                label={__("Gradient Degree", "skt-blocks")}
                value={contentGradientDegree}
                onChange={(value) =>
                  setAttributes({
                    contentGradientDegree: value !== undefined ? value : 100,
                  })
                }
                min={0}
                max={360}
              />,
            ]}
            <RangeControl
              label={__(
                "Background Color Opacity",
                "skt-blocks"
              )}
              value={contentBackgroundColorOpacity}
              onChange={(value) =>
                setAttributes({
                  contentBackgroundColorOpacity:
                    value !== undefined ? value : 100,
                })
              }
              min={0}
              max={100}
            />
          </PanelColorSettings>
        </PanelBody>
      );
    };
    const accordionTypographySettings = () => {
      return (
        <PanelBody
          title={__("Typography")}
          initialOpen={false}
          className="skt_blocks__url-panel-body"
        >
          <PanelBody
            title={__("Title", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={titleFontFamily}
              onChange={(value) => {
                setAttributes({
                  titleFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={titleFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  titleFontSize: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={titleFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={titleLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={0.01}
            />
          </PanelBody>
          <PanelBody
            title={__("Content", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={contentFontFamily}
              onChange={(value) => {
                setAttributes({
                  contentFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={contentFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontSize: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={contentFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={contentLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={0.01}
            />
          </PanelBody>
        </PanelBody>
      );
    };
    const accordionStylingSettings = () => {
      return (
        <PanelBody
          title={__("Spacing")}
          initialOpen={false}
          className="skt_blocks__url-panel-body"
        >
          <RangeControl
            label={__("Rows Gap (px)")}
            value={rowsGap}
            onChange={(value) => setAttributes({ rowsGap: value })}
            min={0}
            max={50}
          />
          {"grid" === layout && (
            <Fragment>
              <RangeControl
                label={__("Columns Gap (px)")}
                value={columnsGap}
                onChange={(value) => setAttributes({ columnsGap: value })}
                min={0}
                max={50}
              />
              <ToggleControl
                label={__("Equal Height")}
                checked={equalHeight}
                onChange={(value) =>
                  setAttributes({ equalHeight: !equalHeight })
                }
              />
            </Fragment>
          )}
          <RangeControl
            label={__("Vertical Margin")}
            value={marginV}
            onChange={(value) => setAttributes({ marginV: value })}
            min={0}
            max={100}
          />
          <RangeControl
            label={__("Horizontal Margin")}
            value={marginH}
            onChange={(value) => setAttributes({ marginH: value })}
            min={0}
            max={100}
          />
        </PanelBody>
      );
    };
    const accordionIconSettings = () => {
      return (
        <Fragment>
          <h2> {__("Icon")} </h2>
          <p className="components-base-control__label">{__("Expand")}</p>
          <FontIconPicker
            icons={svg_icons}
            renderFunc={renderSVG}
            theme="default"
            value={icon}
            onChange={(value) => this.onchangeIcon(value)}
            isMulti={false}
            noSelectedPlaceholder={__("Select Icon")}
          />
          <p className="components-base-control__label">{__("Collapse")}</p>
          <FontIconPicker
            icons={svg_icons}
            renderFunc={renderSVG}
            theme="default"
            value={iconActive}
            onChange={(value) => this.onchangeActiveIcon(value)}
            isMulti={false}
            noSelectedPlaceholder={__("Select Icon")}
          />
          <h2> {__("Icon Alignment")}</h2>
          <IconButton
            key={"row"}
            icon="editor-alignleft"
            label="Left"
            onClick={() => setAttributes({ iconAlign: "row" })}
            aria-pressed={"row" === iconAlign}
            isPrimary={"row" === iconAlign}
          />
          <IconButton
            key={"row-reverse"}
            icon="editor-alignright"
            label="Right"
            onClick={() => setAttributes({ iconAlign: "row-reverse" })}
            aria-pressed={"row-reverse" === iconAlign}
            isPrimary={"row-reverse" === iconAlign}
          />
          {"accordion" === layout && (
            <Fragment>
              <hr className="skt-blocks-editor__separator" />
              <h2>{__("Icon")}</h2>
              <TabPanel
                className="skt-blocks-size-type-field-tabs skt-blocks-size-type-field__common-tabs skt-blocks-inline-margin"
                activeClass="active-tab"
                tabs={[
                  {
                    name: "desktop",
                    title: <Dashicon icon="desktop" />,
                    className:
                      "skt-blocks-desktop-tab skt-blocks-responsive-tabs",
                  },
                  {
                    name: "tablet",
                    title: <Dashicon icon="tablet" />,
                    className:
                      "skt-blocks-tablet-tab skt-blocks-responsive-tabs",
                  },
                  {
                    name: "mobile",
                    title: <Dashicon icon="smartphone" />,
                    className:
                      "skt-blocks-mobile-tab skt-blocks-responsive-tabs",
                  },
                ]}
              >
                {(tab) => {
                  let tabout;

                  if ("mobile" === tab.name) {
                    tabout = (
                      <Fragment>
                        <ButtonGroup
                          className="skt-blocks-size-type-field"
                          aria-label={__("Size Type")}
                        >
                          <Button
                            key={"px"}
                            className="skt-blocks-size-btn"
                            isSmall
                            isPrimary={iconSizeType === "px"}
                            aria-pressed={iconSizeType === "px"}
                            onClick={() =>
                              setAttributes({ iconSizeType: "px" })
                            }
                          >
                            {"px"}
                          </Button>
                          <Button
                            key={"%"}
                            className="skt-blocks-size-btn"
                            isSmall
                            isPrimary={iconSizeType === "%"}
                            aria-pressed={iconSizeType === "%"}
                            onClick={() => setAttributes({ iconSizeType: "%" })}
                          >
                            {"%"}
                          </Button>
                        </ButtonGroup>
                        <h2>{__("Size")}</h2>
                        <RangeControl
                          value={iconSizeMobile}
                          onChange={(value) =>
                            setAttributes({ iconSizeMobile: value })
                          }
                          min={0}
                          max={100}
                          allowReset
                        />
                      </Fragment>
                    );
                  } else if ("tablet" === tab.name) {
                    tabout = (
                      <Fragment>
                        <ButtonGroup
                          className="skt-blocks-size-type-field"
                          aria-label={__("Size Type")}
                        >
                          <Button
                            key={"px"}
                            className="skt-blocks-size-btn"
                            isSmall
                            isPrimary={iconSizeType === "px"}
                            aria-pressed={iconSizeType === "px"}
                            onClick={() =>
                              setAttributes({ iconSizeType: "px" })
                            }
                          >
                            {"px"}
                          </Button>
                          <Button
                            key={"%"}
                            className="skt-blocks-size-btn"
                            isSmall
                            isPrimary={iconSizeType === "%"}
                            aria-pressed={iconSizeType === "%"}
                            onClick={() => setAttributes({ iconSizeType: "%" })}
                          >
                            {"%"}
                          </Button>
                        </ButtonGroup>
                        <h2>{__("Size")}</h2>
                        <RangeControl
                          value={iconSizeTablet}
                          onChange={(value) =>
                            setAttributes({ iconSizeTablet: value })
                          }
                          min={0}
                          max={100}
                          allowReset
                        />
                      </Fragment>
                    );
                  } else {
                    tabout = (
                      <Fragment>
                        <ButtonGroup
                          className="skt-blocks-size-type-field"
                          aria-label={__("Size Type")}
                        >
                          <Button
                            key={"px"}
                            className="skt-blocks-size-btn"
                            isSmall
                            isPrimary={iconSizeType === "px"}
                            aria-pressed={iconSizeType === "px"}
                            onClick={() =>
                              setAttributes({ iconSizeType: "px" })
                            }
                          >
                            {"px"}
                          </Button>
                          <Button
                            key={"%"}
                            className="skt-blocks-size-btn"
                            isSmall
                            isPrimary={iconSizeType === "%"}
                            aria-pressed={iconSizeType === "%"}
                            onClick={() => setAttributes({ iconSizeType: "%" })}
                          >
                            {"%"}
                          </Button>
                        </ButtonGroup>
                        <h2>{__("Size")}</h2>
                        <RangeControl
                          value={iconSize}
                          onChange={(value) =>
                            setAttributes({ iconSize: value })
                          }
                          min={0}
                          max={100}
                          allowReset
                        />
                      </Fragment>
                    );
                  }

                  return <div>{tabout}</div>;
                }}
              </TabPanel>
              <p className="skt-blocks-setting-label">
                {__("Color")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: iconColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={iconColor}
                onChange={(value) => setAttributes({ iconColor: value })}
                allowReset
              />
              <p className="skt-blocks-setting-label">
                {__("Active Color")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: iconActiveColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={iconActiveColor}
                onChange={(value) => setAttributes({ iconActiveColor: value })}
                allowReset
              />
              <p className="skt-blocks-setting-label">
                {__("Hover Color")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: iconHoverColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={iconHoverColor}
                onChange={(value) => setAttributes({ iconHoverColor: value })}
                allowReset
              />
            </Fragment>
          )}
        </Fragment>
      );
    };
    return (
      <Fragment>
        <InspectorControls>
          {accordionGeneralSettings()}
          {accordionColorSettings()}
          {accordionStylingSettings()}
          {accordionTypographySettings()}
          {titleFontFamily && loadGoogleFont(titleFontFamily)}
          {contentFontFamily && loadGoogleFont(contentFontFamily)}
        </InspectorControls>
        <Style>
          {`
      
      .skt-blocks-accordion-titles-button.skt-blocks-accordion-titles {
        color: ${titleTextColor};
        background-color: ${titleBackgroundColor};
      }
      .skt-blocks-accordion__active .skt-blocks-accordion-titles-button.skt-blocks-accordion-titles {
        color: ${titleActiveTextColor};
        background-color: ${titleActiveBackgroundColor};
      }
      `}
        </Style>
        <div
          className={classnames(
            "skt-blocks-accordion__outer-wrap",
            `skt-blocks-block-${this.props.clientId.substr(
              0,
              8
            )}`,
            `skt-blocks-accordion-icon-${this.props.attributes.iconAlign}`,
            `skt-blocks-accordion-layout-${this.props.attributes.layout}`,
            `skt-blocks-accordion-expand-first-${this.props.attributes.expandFirstItem}`,
            `skt-blocks-accordion-inactive-other-${this.props.attributes.inactiveOtherItems}`,
            equalHeightClass
          )}
        >
          <InnerBlocks
            template={getAccordionItemTemplate(2, accordion)}
            templateLock={false}
            allowedBlocks={ALLOWED_BLOCKS}
            __experimentalMoverDirection={"vertical"}
          />
        </div>
      </Fragment>
    );
  }
}

export default compose(
  withSelect((select, ownProps) => {
    var accordion_data = {};
    var json_data = {
      "@context": "https://schema.org",
      "@type": "AccordionPage",
      mainEntity: [],
    };
    const accordionChildBlocks = select("core/block-editor").getBlocks(
      ownProps.clientId
    );

    accordionChildBlocks.forEach((accordionChild, key) => {
      accordion_data = {
        "@type": "Title",
        name: accordionChild.attributes.title,
        acceptedContent: {
          "@type": "Content",
          text: accordionChild.attributes.content,
        },
      };
      json_data["mainEntity"][key] = accordion_data;
    });

    return {
      schemaJsonData: json_data,
    };
  })
)(ResponsiveBlockEditorAddonsAccordionEdit);
