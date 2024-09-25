/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Button, Dashicon, Icon } = wp.components;
const { RichText, URLInput } = wp.editor;

import memoize from "memize";
import map from "lodash/map";
import generateCSSUnit from "../../../generateCSSUnit";
import Style from "style-it";
import { hexToRgba } from "../../../utils";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        flipboxArray,
        count,
        gutter,
        contentAlign,
        frontTextColor,
        backTextColor,
        backBackgroundColor,
        frontBackgroundColor,
        transitionSpeed,
        colorButtonSelected,
        frontTitle,
        frontContent,
        iconSize,
        iconColor,
        flipStyleSelected,
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
        imageOpacity,
        backImageOpacity,
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
        blockId,
      },
      setAttributes,
    } = this.props;
    setAttributes({ blockId: this.props.clientId });
    var boxShadowPositionCSS = boxShadowPosition;

    if ("outset" === boxShadowPosition) {
      boxShadowPositionCSS = "";
    }

    let flipStyle = "rotateY(0deg)";
    let flipStyleBack, flipClass;

    if (colorButtonSelected == "back_selected") {
      flipClass = "backSelected";
      if (flipStyleSelected == "LTR") {
        flipStyle = "rotateY(180deg)";
        flipStyleBack = "rotateY(180deg)";
      }
      if (flipStyleSelected == "RTL") {
        flipStyle = "rotateY(-180deg)";
        flipStyleBack = "rotateY(-180deg)";
      }
      if (flipStyleSelected == "BTT") {
        flipStyle = "rotateX(180deg)";
        flipStyleBack = "rotateX(180deg)";
      }
      if (flipStyleSelected == "TTB") {
        flipStyle = "rotateX(-180deg)";
        flipStyleBack = "rotateX(-180deg)";
      }
    } else {
      flipClass = "frontSelected";
      if (flipStyleSelected == "LTR") {
        flipStyle = "rotateY(0deg)";
        flipStyleBack = "rotateY(180deg)";
      }
      if (flipStyleSelected == "RTL") {
        flipStyle = "rotateY(0deg)";
        flipStyleBack = "rotateY(-180deg)";
      }
      if (flipStyleSelected == "BTT") {
        flipStyle = "rotateX(0deg)";
        flipStyleBack = "rotateX(180deg)";
      }
      if (flipStyleSelected == "TTB") {
        flipStyle = "rotateX(0deg)";
        flipStyleBack = "rotateX(-180deg)";
      }
    }

    var data_copy = [...flipboxArray];

    const classes = classnames(
      "wp-block-skt-blocks-flipbox",
      {
        [`has-text-align-${contentAlign}`]: contentAlign,
      }
    );

    const innerClasses = classnames(
      "wp-block-skt-blocks-flipbox__inner",
      {
        "has-columns": count > 1,
        [`has-${count}-columns`]: count,
        "has-responsive-columns": count > 1,
        [`has-${gutter}-gutter`]: gutter,
      }
    );

    const formattingControls = ["bold", "italic", "strikethrough"];
    const transitionSpeedSec = transitionSpeed / 10;

    const flipboxTransition =
      transitionSpeed < 10
        ? "transform 0." + transitionSpeed + "s"
        : "transform " + transitionSpeedSec + "s";
    // Add CSS.
    var element = document.getElementById(
      "res-blockquote-style-" + this.props.clientId
    );
    if (null != element && "undefined" != typeof element) {
      element.innerHTML = styling(this.props);
    }

    let coloropacity = colorOpacity / 100;
    let backcoloropacity = backColorOpacity / 100;
    let imageopacity = imageOpacity / 100;
    let backimageopacity = backImageOpacity / 100;

    return [
      // Show the block controls on focus

      <Inspector {...{ setAttributes, ...this.props }} />,
      <Fragment>
        <Style>
          {`
            #block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link {
                color: ${buttonTextColor} !important;
            }
            #block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link:hover {
                color: ${buttonHTextColor} !important;
            }
            
      `}
        </Style>
        {backgroundImage && (
          <Style>
            {`
            #block-${blockId} .flip-box-front{
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
            #block-${blockId} .flip-box-back{
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
        {buttonbackgroundType == "color" && (
          <Style>
            {`
            #block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link {
                background-color: ${buttonColor} !important;
                opacity: ${buttonopacity / 100};
            }
	`}
          </Style>
        )}
        {buttonbackgroundType == "gradient" && (
          <Style>
            {`
            #block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link {
                background-image: linear-gradient(${buttongradientDirection}deg, ${buttonbackgroundColor1} ${buttoncolorLocation1}%, ${buttonbackgroundColor2} ${buttoncolorLocation2}%);
              }        
           
	`}
          </Style>
        )}
        {buttonHbackgroundType == "gradient" && (
          <Style>
            {`
            #block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link:hover {
                background-image: linear-gradient(${buttonHgradientDirection}deg, ${buttonHbackgroundColor1} ${buttonHcolorLocation1}%, ${buttonHbackgroundColor2} ${buttonHcolorLocation2}%);
              }
              
	`}
          </Style>
        )}
        {buttonHbackgroundType == "color" && (
          <Style>
            {`
            #block-${blockId} .wp-block-skt-blocks-flipbox-item__button.wp-block-button__link:hover {
                background-color: ${buttonHColor} !important;
                opacity: ${buttonHopacity / 100};
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
        {" "}
        <div className={innerClasses}>
          {flipboxArray.map((test, index) => (
            <div
              className={classnames(
                "wp-block-skt-blocks-flip-box"
              )}
              style={{ height: height }}
            >
              <div
                className={classnames(
                  "flip-box-inner",
                  flipStyleSelected,
                  flipClass
                )}
                style={{ transition: flipboxTransition, transform: flipStyle }}
              >
                <div
                  className={classnames("flip-box-front", flipStyleSelected)}
                  style={{
                    backgroundColor: `${hexToRgba(
                      frontBackgroundColor || "#ffffff",
                      coloropacity
                    )}`,
                    color: frontTextColor,
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
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__title"
                      value={flipboxArray[index]["title"]}
                      placeholder={flipboxArray[index]["title"]}
                      onChange={(value) => {
                        var new_content = {
                          front_buttonURL: data_copy[index]["front_buttonURL"],
                          front_button: data_copy[index]["front_button"],
                          back_buttonURL: data_copy[index]["back_buttonURL"],
                          back_button: data_copy[index]["back_button"],
                          title: value,
                          subtitle: data_copy[index]["subtitle"],
                          back_title: data_copy[index]["back_title"],
                          back_subtitle: data_copy[index]["back_subtitle"],
                          icon: data_copy[index]["icon"],
                          back_icon: data_copy[index]["back_icon"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ flipboxArray: data_copy });
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
                      style={{ color: frontTextColor }}
                    />
                  )}
                  {showFrontSubtitle && (
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__subtitle"
                      value={flipboxArray[index]["subtitle"]}
                      placeholder={flipboxArray[index]["subtitle"]}
                      onChange={(value) => {
                        var new_content = {
                          front_buttonURL: data_copy[index]["front_buttonURL"],
                          front_button: data_copy[index]["front_button"],
                          back_buttonURL: data_copy[index]["back_buttonURL"],
                          back_button: data_copy[index]["back_button"],
                          title: data_copy[index]["title"],
                          subtitle: value,
                          back_title: data_copy[index]["back_title"],
                          back_subtitle: data_copy[index]["back_subtitle"],
                          icon: data_copy[index]["icon"],
                          back_icon: data_copy[index]["back_icon"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ flipboxArray: data_copy });
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
                      style={{ color: frontTextColor }}
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
                    transform: flipStyleBack,
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
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__backtitle"
                      value={flipboxArray[index]["back_title"]}
                      placeholder={flipboxArray[index]["back_title"]}
                      onChange={(value) => {
                        var new_content = {
                          front_buttonURL: data_copy[index]["front_buttonURL"],
                          front_button: data_copy[index]["front_button"],
                          back_buttonURL: data_copy[index]["back_buttonURL"],
                          back_button: data_copy[index]["back_button"],
                          title: data_copy[index]["title"],
                          subtitle: data_copy[index]["subtitle"],
                          back_title: value,
                          back_subtitle: data_copy[index]["back_subtitle"],
                          icon: data_copy[index]["icon"],
                          back_icon: data_copy[index]["back_icon"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ flipboxArray: data_copy });
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
                      style={{ color: backTextColor }}
                    />
                  )}
                  {showBackSubtitle && (
                    <RichText
                      tagName="p"
                      className="wp-block-skt-blocks-flip-box__backsubtitle"
                      value={flipboxArray[index]["back_subtitle"]}
                      placeholder={flipboxArray[index]["back_subtitle"]}
                      onChange={(value) => {
                        var new_content = {
                          front_buttonURL: data_copy[index]["front_buttonURL"],
                          front_button: data_copy[index]["front_button"],
                          back_buttonURL: data_copy[index]["back_buttonURL"],
                          back_button: data_copy[index]["back_button"],
                          title: data_copy[index]["title"],
                          subtitle: data_copy[index]["subtitle"],
                          back_title: data_copy[index]["back_title"],
                          back_subtitle: value,
                          icon: data_copy[index]["icon"],
                          back_icon: data_copy[index]["back_icon"],
                        };
                        data_copy[index] = new_content;
                        setAttributes({ flipboxArray: data_copy });
                      }}
                      formattingControls={formattingControls}
                      keepPlaceholderOnFocus
                      style={{ color: backTextColor }}
                    />
                  )}
                  {showBackButton && (
                    <Fragment>
                      <RichText
                        tagName="p"
                        className={classnames(
                          "wp-block-skt-blocks-flipbox-item__button res-button wp-block-button__link",
                          `background-type-${buttonbackgroundType}`,
                          `hover-background-type-${buttonHbackgroundType}`
                        )}
                        value={flipboxArray[index]["back_button"]}
                        placeholder={__(
                          "Button",
                          "skt-blocks"
                        )}
                        onChange={(value) => {
                          var new_content = {
                            back_button: value,
                            back_buttonURL: data_copy[index]["back_buttonURL"],
                            front_buttonURL:
                              data_copy[index]["front_buttonURL"],
                            front_button: data_copy[index]["front_button"],
                            title: data_copy[index]["title"],
                            subtitle: data_copy[index]["subtitle"],
                            back_title: data_copy[index]["back_title"],
                            back_subtitle: data_copy[index]["back_subtitle"],
                            icon: data_copy[index]["icon"],
                            back_icon: data_copy[index]["back_icon"],
                          };
                          data_copy[index] = new_content;
                          setAttributes({ flipboxArray: data_copy });
                        }}
                        keepPlaceholderOnFocus
                        style={{
                          borderRadius: buttonBorderRadius,
                          paddingLeft: buttonHpadding,
                          paddingRight: buttonHpadding,
                          paddingTop: buttonVpadding,
                          paddingBottom: buttonVpadding,
                        }}
                      />
                      <form
                        key="form-link"
                        className={`blocks-button__inline-link res-button-`}
                        onSubmit={(event) => event.preventDefault()}
                      >
                        <Dashicon icon={"admin-links"} />
                        <URLInput
                          className="button-url"
                          value={flipboxArray[index]["back_buttonURL"]}
                          onChange={(value) => {
                            var new_content = {
                              back_buttonURL: value,
                              back_button: data_copy[index]["back_button"],
                              front_buttonURL:
                                data_copy[index]["front_buttonURL"],
                              front_button: data_copy[index]["front_button"],
                              title: data_copy[index]["title"],
                              subtitle: data_copy[index]["subtitle"],
                              back_title: data_copy[index]["back_title"],
                              back_subtitle: data_copy[index]["back_subtitle"],
                              icon: data_copy[index]["icon"],
                              back_icon: data_copy[index]["back_icon"],
                            };
                            data_copy[index] = new_content;
                            setAttributes({ flipboxArray: data_copy });
                          }}
                        />
                        <Button
                          label={__("Apply", "skt-blocks")}
                          type="submit"
                        >
                          <Icon icon="editor-break" />
                        </Button>
                      </form>
                    </Fragment>
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
