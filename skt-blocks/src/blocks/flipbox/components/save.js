/**
 * Internal dependencies
 */
import classnames from "classnames";
import map from "lodash/map";
import generateCSSUnit from "../../../generateCSSUnit";

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { RichText } = wp.editor;
const { Dashicon } = wp.components;
import Style from "style-it";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";
import { hexToRgba } from "../../../utils";

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      flipboxArray,
      contentAlign,
      count,
      gutter,
      frontTextColor,
      frontBackgroundColor,
      backTextColor,
      backBackgroundColor,
      iconSize,
      iconColor,
      flipStyleSelected,
      transitionSpeed,
      borderStyle,
      borderWidth,
      borderRadius,
      borderColor,
      boxShadowColor,
      boxShadowHOffset,
      boxShadowVOffset,
      boxShadowBlur,
      boxShadowSpread,
      boxShadowPosition,
      height,
      topMargin,
      bottomMargin,
      topPadding,
      bottomPadding,
      leftPadding,
      rightPadding,
      backtopPadding,
      backbottomPadding,
      backleftPadding,
      backrightPadding,
      buttonTarget,
      backIconColor,
      backIconSize,
      showFrontIcon,
      showFrontTitle,
      showFrontSubtitle,
      showBackIcon,
      showBackTitle,
      showBackSubtitle,
      showBackButton,
      backgroundImage,
      colorOpacity,
      backBackgroundImage,
      backColorOpacity,
      buttonColor,
      buttonTextColor,
      buttonBorderRadius,
      buttonHpadding,
      buttonVpadding,
      buttonHTextColor,
      buttonHColor,
      buttonbackgroundType,
      buttongradientDirection,
      buttoncolorLocation1,
      buttoncolorLocation2,
      buttonbackgroundColor1,
      buttonbackgroundColor2,
      buttonHbackgroundType,
      buttonHgradientDirection,
      buttonHcolorLocation1,
      buttonHcolorLocation2,
      buttonHbackgroundColor1,
      buttonHbackgroundColor2,
      buttonopacity,
      buttonHopacity,
      imageOpacity,
      backImageOpacity,
      blockId,
      hideDesktop,
      hideTablet,
      hideMobile,
    } = this.props.attributes;

    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    const classes = classnames({
      [`has-text-align-${contentAlign}`]: contentAlign,
      [`block-${blockId}`]: blockId,
      "skt-flipbox-hide": hideDesktop || hideTablet || hideMobile,
      "skt-hide-desktop": hideDesktop,
      "skt-hide-tablet": hideTablet,
      "skt-hide-mobile": hideMobile,
    });

    // Tablet / Mobile overrides, only emitted when a value was set, so
    // existing blocks keep exactly the same markup.
    const attrs = this.props.attributes;
    const respRules = (sfx) => {
      const g = (b) => attrs[b + sfx];
      const isSet = (v) => v !== undefined && v !== null && v !== "";
      const out = [];
      const add = (sel, prop, base, unit) => {
        const v = g(base);
        if (isSet(v)) out.push(`.block-${blockId}${sel}{${prop}:${v}${unit} !important;}`);
      };
      add("", "margin-top", "topMargin", "px");
      add("", "margin-bottom", "bottomMargin", "px");
      [["front", ""], ["back", "back"]].forEach(([side, pre]) => {
        const sel = ` .flip-box-${side}`;
        add(sel, "padding-top", pre + "topPadding", "px");
        add(sel, "padding-bottom", pre + "bottomPadding", "px");
        add(sel, "padding-left", pre + "leftPadding", "px");
        add(sel, "padding-right", pre + "rightPadding", "px");
        add(sel, "border-width", "borderWidth", "px");
        add(sel, "border-radius", "borderRadius", "px");
        const ib = pre ? "backIconSize" : "iconSize";
        add(`${sel} > div`, "width", ib, "px");
        add(`${sel} > div`, "height", ib, "px");
        add(`${sel} > div svg`, "width", ib, "px");
        add(`${sel} > div svg`, "height", ib, "px");
      });
      return out.join("");
    };
    const tabletCss = respRules("Tablet");
    const mobileCss = respRules("Mobile");
    const responsiveCss =
      (tabletCss ? `@media (max-width: 1024px){${tabletCss}}` : "") +
      (mobileCss ? `@media (max-width: 767px){${mobileCss}}` : "");

    const innerClasses = classnames(
      "wp-block-skt-blocks-flipbox__inner",
      {
        "has-columns": count > 1,
        [`has-${count}-columns`]: count,
        "has-responsive-columns": count > 1,
        [`has-${gutter}-gutter`]: gutter,
      }
    );

    const transitionSpeedSec = transitionSpeed / 10;

    const flipboxTransition =
      transitionSpeed < 10
        ? "transform 0." + transitionSpeed + "s"
        : "transform " + transitionSpeedSec + "s";

    let coloropacity = colorOpacity / 100;
    let backcoloropacity = backColorOpacity / 100;
    let imageopacity = imageOpacity / 100;
    let backimageopacity = backImageOpacity / 100;

    return [
      <Fragment>
        {responsiveCss && <Style>{responsiveCss}</Style>}
        <Style>
          {`
            .block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link {
                color: ${buttonTextColor};
            }
            .block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link:hover {
                color: ${buttonHTextColor};
            }     
      `}
        </Style>
        {backgroundImage && (
          <Style>
            {`
            .block-${blockId} .flip-box-front{
              background-image: linear-gradient(${hexToRgba(
                frontBackgroundColor || "#ffffff",
                coloropacity || 0
              )}, ${hexToRgba(
              frontBackgroundColor || "#ffffff",
              coloropacity || 0
            )}),url(${backgroundImage});
            }
	`}
          </Style>
        )}
        {backBackgroundImage && (
          <Style>
            {`
            .block-${blockId} .flip-box-back{
              background-image: linear-gradient(${hexToRgba(
                backBackgroundColor || "#ffffff",
                backcoloropacity || 0
              )}, ${hexToRgba(
              backBackgroundColor || "#ffffff",
              backcoloropacity || 0
            )}),url(${backBackgroundImage});
            }
	`}
          </Style>
        )}
        {buttonHbackgroundType == "color" && (
          <Style>
            {`
            .block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link:hover {
                background-color: ${buttonHColor} !important;
                opacity: ${buttonHopacity / 100};
            }
	`}
          </Style>
        )}
        {buttonbackgroundType == "color" && (
          <Style>
            {`
            .block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link {
                background-color: ${buttonColor} !important;
                opacity: ${buttonopacity / 100};
            }
	`}
          </Style>
        )}

        {buttonbackgroundType == "gradient" && (
          <Style>
            {`
            .block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link {
                background-image: linear-gradient(${buttongradientDirection}deg, ${buttonbackgroundColor1} ${buttoncolorLocation1}%, ${buttonbackgroundColor2} ${buttoncolorLocation2}%);
              }        
           
	`}
          </Style>
        )}
        {buttonHbackgroundType == "gradient" && (
          <Style>
            {`
            .block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link:hover {
                background-image: linear-gradient(${buttonHgradientDirection}deg, ${buttonHbackgroundColor1} ${buttonHcolorLocation1}%, ${buttonHbackgroundColor2} ${buttonHcolorLocation2}%);
              }
              
	`}
          </Style>
        )}
      </Fragment>,
      <div
        className={classes}
        style={{
          marginTop: topMargin,
          marginBottom: bottomMargin,
        }}
      >
        <div className={innerClasses} style={{}}>
          {flipboxArray.map((test, index) => (
            <div
              className={classnames(
                "wp-block-skt-blocks-flip-box"
              )}
              style={{ height: height }}
            >
              <div
                className={classnames("flip-box-inner", flipStyleSelected)}
                style={{ transition: flipboxTransition }}
              >
                <div
                  className="flip-box-front"
                  style={{
                    color: frontTextColor,
                    backgroundColor: `${hexToRgba(
                      frontBackgroundColor || "#ffffff",
                      coloropacity
                    )}`,
                    borderColor: borderColor,
                    borderStyle: borderStyle,
                    borderWidth: borderWidth,
                    borderRadius: borderRadius,
                    boxShadow:
                      generateCSSUnit(boxShadowHOffset, "px") +
                      " " +
                      generateCSSUnit(boxShadowVOffset, "px") +
                      " " +
                      generateCSSUnit(boxShadowBlur, "px") +
                      " " +
                      generateCSSUnit(boxShadowSpread, "px") +
                      " " +
                      boxShadowColor +
                      " " +
                      boxShadowPositionCSS,
                    height: height,
                    paddingTop: topPadding,
                    paddingBottom: bottomPadding,
                    paddingLeft: leftPadding,
                    paddingRight: rightPadding,
                  }}
                >
                  {showFrontIcon && (
                    <div style={{ width: iconSize, height: iconSize }}>
                      <Dashicon
                        icon={flipboxArray[index]["icon"]}
                        height={iconSize}
                        width={iconSize}
                        style={{
                          height: iconSize,
                          width: iconSize,
                          fill: iconColor,
                        }}
                      />
                    </div>
                  )}
                  {showFrontTitle && (
                    <RichText.Content
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__title"
                      value={flipboxArray[index]["title"]}
                    />
                  )}
                  {showFrontSubtitle && (
                    <RichText.Content
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__subtitle"
                      value={flipboxArray[index]["subtitle"]}
                    />
                  )}
                </div>
                <div
                  className={classnames("flip-box-back", flipStyleSelected)}
                  style={{
                    backgroundColor: `${hexToRgba(
                      backBackgroundColor || "#ffffff",
                      backcoloropacity
                    )}`,
                    color: backTextColor,
                    borderColor: borderColor,
                    borderStyle: borderStyle,
                    borderWidth: borderWidth,
                    borderRadius: borderRadius,
                    boxShadow:
                      generateCSSUnit(boxShadowHOffset, "px") +
                      " " +
                      generateCSSUnit(boxShadowVOffset, "px") +
                      " " +
                      generateCSSUnit(boxShadowBlur, "px") +
                      " " +
                      generateCSSUnit(boxShadowSpread, "px") +
                      " " +
                      boxShadowColor +
                      " " +
                      boxShadowPositionCSS,
                    height: height,
                    paddingTop: backtopPadding,
                    paddingBottom: backbottomPadding,
                    paddingLeft: backleftPadding,
                    paddingRight: backrightPadding,
                  }}
                >
                  {showBackIcon && (
                    <div style={{ width: backIconSize, height: backIconSize }}>
                      <Dashicon
                        icon={flipboxArray[index]["back_icon"]}
                        height={backIconSize}
                        width={backIconSize}
                        style={{
                          height: backIconSize,
                          width: backIconSize,
                          fill: backIconColor,
                        }}
                      />
                    </div>
                  )}
                  {showBackTitle && (
                    <RichText.Content
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__backtitle"
                      value={flipboxArray[index]["back_title"]}
                    />
                  )}
                  {showBackSubtitle && (
                    <RichText.Content
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__backsubtitle"
                      value={flipboxArray[index]["back_subtitle"]}
                    />
                  )}
                  {showBackButton && (
                    <a
                      href={flipboxArray[index]["back_buttonURL"]}
                      target={buttonTarget ? "_blank" : null}
                      rel={buttonTarget ? "noopener noreferrer" : null}
                      className={classnames(
                        "wp-block-skt-blocks-flipbox-item__button",
                        "res-button",
                        "wp-block-button__link"
                      )}
                      style={{
                        borderRadius: buttonBorderRadius,
                        paddingLeft: buttonHpadding,
                        paddingRight: buttonHpadding,
                        paddingTop: buttonVpadding,
                        paddingBottom: buttonVpadding,
                      }}
                    >
                      <RichText.Content
                        value={flipboxArray[index]["back_button"]}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>,
    ];
  }
}
