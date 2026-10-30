/**
 * Inspector Controls
 */
import classnames from "classnames";
import times from "lodash/times";
import BoxShadowControl from "../../../utils/components/box-shadow";
import {
  DEVICE_TABS,
  deviceSuffix,
  inherited,
  setPreviewDevice,
} from "./responsive-utils";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { MediaUpload } = wp.blockEditor;

// Import block components
const { InspectorControls, PanelColorSettings, ColorPalette } = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  TextControl,
  ButtonGroup,
  Button,
  Dashicon,
  SelectControl,
  ToggleControl,
  BaseControl,
  TabPanel,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.onRemoveBackImage = this.onRemoveBackImage.bind(this);
    this.onSelectBackImage = this.onSelectBackImage.bind(this);
  }
  /*
   * Event to set Image as null while removing.
   */
  onRemoveImage() {
    const { setAttributes } = this.props;

    setAttributes({ backgroundImage: null });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectImage(media) {
    const { setAttributes } = this.props;
    const { backgroundImage } = this.props.attributes;

    if (!media || !media.url) {
      setAttributes({ backgroundImage: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ backgroundImage: media.url });
  }
  /*
   * Event to set Image as null while removing.
   */
  onRemoveBackImage() {
    const { setAttributes } = this.props;

    setAttributes({ backBackgroundImage: null });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectBackImage(media) {
    const { setAttributes } = this.props;
    const { backBackgroundImage } = this.props.attributes;

    if (!media || !media.url) {
      setAttributes({ backBackgroundImage: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ backBackgroundImage: media.url });
  }

  // Desktop / Tablet / Mobile tabs; switching also switches the editor preview.
  renderDeviceTabs(render) {
    return (
      <TabPanel
        className="rbea-inspect-tabs rbea-inspect-tabs-col-3"
        activeClass="active-tab"
        initialTabName={(this.props.deviceType || "Desktop").toLowerCase()}
        onSelect={setPreviewDevice}
        tabs={DEVICE_TABS.map((t) => ({ ...t, className: "rbea-normal-tab" }))}
      >
        {(tab) => <div>{render(deviceSuffix(tab.name))}</div>}
      </TabPanel>
    );
  }

  renderRange(base, label, sfx, min, max, def) {
    const { attributes, setAttributes } = this.props;
    return (
      <RangeControl
        key={base + sfx}
        label={label}
        value={inherited(attributes, base, sfx)}
        onChange={(value) =>
          setAttributes({
            [base + sfx]: value !== undefined ? value : sfx ? undefined : def,
          })
        }
        min={min}
        max={max}
        allowReset
      />
    );
  }

  render() {
    // Background Type Options
    const backgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
      { value: "image", label: __("Image", "skt-blocks") },
    ];

    // Background Type Options
    const buttonbackgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
    ];

    // Flip Style Options
    const flipStyleOptions = [
      {
        value: "LTR",
        label: __("Left To Right", "skt-blocks"),
      },
      {
        value: "BTT",
        label: __("Bottom To Top", "skt-blocks"),
      },
      {
        value: "RTL",
        label: __("Right To Left", "skt-blocks"),
      },
      {
        value: "TTB",
        label: __("Top To Bottom", "skt-blocks"),
      },
    ];

    // Setup the attributes
    const {
      attributes: {
        count,
        flipboxArray,
        frontTextColor,
        frontBackgroundColor,
        transitionSpeed,
        colorButtonSelected,
        backTextColor,
        backBackgroundColor,
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
        backgroundType,
        backgroundImage,
        colorOpacity,
        backBackgroundImage,
        backColorOpacity,
        buttonTextColor,
        buttonColor,
        buttonBorderRadius,
        buttonHpadding,
        buttonVpadding,
        blockAlign,
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
      },
      setAttributes,
    } = this.props;
    var data_copy = [...flipboxArray];

    // Update color value
    const onChangeFrontTextColor = (value) =>
      setAttributes({ frontTextColor: value });
    const onChangeFrontBackgroundColor = (value) =>
      setAttributes({ frontBackgroundColor: value });
    const onChangeBackTextColor = (value) =>
      setAttributes({ backTextColor: value });
    const onChangeBackBackgroundColor = (value) =>
      setAttributes({ backBackgroundColor: value });

    let frontColorButtonClass = "is-primary";
    let backColorButtonClass = "is-default";
    let isFrontSelected;
    let isBackSelected;
    if (colorButtonSelected == "back_selected") {
      frontColorButtonClass = "is-default";
      backColorButtonClass = "is-primary";
      isBackSelected = true;
    } else {
      frontColorButtonClass = "is-primary";
      backColorButtonClass = "is-default";
      isFrontSelected = true;
    }

    const frontControls = (index) => {
      return (
        <PanelBody
          key={index}
          title={
            __("Flip Box ", "skt-blocks") +
            " " +
            (index + 1) +
            " " +
            __("Settings")
          }
          initialOpen={false}
          className={"rbea-repeater-panel"}
        >
          <TextControl
            label={__("Title", "skt-blocks")}
            type="text"
            value={flipboxArray[index]["title"]}
            onChange={(value) => {
              var new_content = {
                title: value,
                subtitle: data_copy[index]["subtitle"],
                back_title: data_copy[index]["back_title"],
                back_subtitle: data_copy[index]["back_subtitle"],
                icon: data_copy[index]["icon"],
                back_icon: data_copy[index]["back_icon"],
                back_button: data_copy[index]["back_button"],
                back_buttonURL: data_copy[index]["back_buttonURL"],
              };
              data_copy[index] = new_content;
              setAttributes({ flipboxArray: data_copy });
            }}
          />
          <TextControl
            label={__("Content", "skt-blocks")}
            type="text"
            value={flipboxArray[index]["subtitle"]}
            onChange={(value) => {
              var new_content = {
                title: data_copy[index]["title"],
                subtitle: value,
                back_title: data_copy[index]["back_title"],
                back_subtitle: data_copy[index]["back_subtitle"],
                icon: data_copy[index]["icon"],
              };
              data_copy[index] = new_content;
              setAttributes({ flipboxArray: data_copy });
            }}
          />
        </PanelBody>
      );
    };
    const frontIconControls = (index) => {
      const icons = [
        "menu",
        "admin-site",
        "dashboard",
        "admin-post",
        "admin-media",
        "admin-links",
        "admin-page",
        "admin-comments",
        "admin-appearance",
        "admin-plugins",
        "admin-users",
        "admin-tools",
        "admin-settings",
        "admin-network",
        "admin-home",
        "admin-generic",
        "admin-collapse",
        "welcome-write-blog",
        "welcome-add-page",
        "welcome-view-site",
        "welcome-widgets-menus",
        "welcome-comments",
        "welcome-learn-more",
        "format-aside",
        "format-image",
        "format-gallery",
        "format-video",
        "format-status",
        "format-quote",
        "format-chat",
        "format-audio",
        "camera",
        "images-alt",
        "images-alt2",
        "video-alt",
        "video-alt2",
        "video-alt3",
        "image-crop",
        "image-rotate-left",
        "image-rotate-right",
        "image-flip-vertical",
        "image-flip-horizontal",
        "undo",
        "redo",
        "editor-bold",
        "editor-italic",
        "editor-ul",
        "editor-ol",
        "editor-quote",
        "editor-alignleft",
        "editor-aligncenter",
        "editor-alignright",
        "editor-insertmore",
        "editor-spellcheck",
        "editor-distractionfree",
        "editor-kitchensink",
        "editor-underline",
        "editor-justify",
        "editor-textcolor",
        "editor-paste-word",
        "editor-paste-text",
        "editor-removeformatting",
        "editor-video",
        "editor-customchar",
        "editor-outdent",
        "editor-indent",
        "editor-help",
        "editor-strikethrough",
        "editor-unlink",
        "editor-rtl",
        "align-left",
        "align-right",
        "align-center",
        "align-none",
        "lock",
        "calendar",
        "visibility",
        "post-status",
        "edit",
        "trash",
        "arrow-up",
        "arrow-down",
        "arrow-right",
        "arrow-left",
        "arrow-up-alt",
        "arrow-down-alt",
        "arrow-right-alt",
        "arrow-left-alt",
        "arrow-up-alt2",
        "arrow-down-alt2",
        "arrow-right-alt2",
        "arrow-left-alt2",
        "sort",
        "leftright",
        "list-view",
        "exerpt-view",
        "share",
        "share-alt",
        "share-alt2",
        "twitter",
        "rss",
        "facebook",
        "facebook-alt",
        "googleplus",
        "networking",
        "hammer",
        "art",
        "migrate",
        "performance",
        "wordpress",
        "wordpress-alt",
        "pressthis",
        "update",
        "screenoptions",
        "info",
        "cart",
        "feedback",
        "cloud",
        "translation",
        "tag",
        "category",
        "yes",
        "no",
        "no-alt",
        "plus",
        "minus",
        "dismiss",
        "marker",
        "star-filled",
        "star-half",
        "star-empty",
        "flag",
        "location",
        "location-alt",
        "vault",
        "shield",
        "shield-alt",
        "search",
        "slides",
        "analytics",
        "chart-pie",
        "chart-bar",
        "chart-line",
        "chart-area",
        "groups",
        "businessman",
        "id",
        "id-alt",
        "products",
        "awards",
        "forms",
        "portfolio",
        "book",
        "book-alt",
        "download",
        "upload",
        "backup",
        "lightbulb",
        "smiley",
      ];

      return (
        <PanelBody
          key={index}
          title={
            __("Flip Box ", "skt-blocks") +
            " " +
            (index + 1)
          }
          initialOpen={false}
          className={"rbea-repeater-panel"}
        >
          <p>
            {__("Select Icon", "skt-blocks")}
            <span className="components-base-control__label"></span>
          </p>
          <div className="skt-blocks-iconSelector">
            <div
              className="responsive-size-type-field"
              aria-label={__("Size Type", "skt-blocks")}
            >
              {times(icons.length, (n) => (
                <Button
                  onClick={() => {
                    var new_content = {
                      icon: icons[n],
                      back_icon: data_copy[index]["back_icon"],
                      back_button: data_copy[index]["back_button"],
                      back_buttonURL: data_copy[index]["back_buttonURL"],
                      title: data_copy[index]["title"],
                      subtitle: data_copy[index]["subtitle"],
                      back_title: data_copy[index]["back_title"],
                      back_subtitle: data_copy[index]["back_subtitle"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ flipboxArray: data_copy });
                  }}
                >
                  <Dashicon icon={icons[n]} />
                </Button>
              ))}
            </div>
          </div>
        </PanelBody>
      );
    };
    const backIconControls = (index) => {
      const icons = [
        "menu",
        "admin-site",
        "dashboard",
        "admin-post",
        "admin-media",
        "admin-links",
        "admin-page",
        "admin-comments",
        "admin-appearance",
        "admin-plugins",
        "admin-users",
        "admin-tools",
        "admin-settings",
        "admin-network",
        "admin-home",
        "admin-generic",
        "admin-collapse",
        "welcome-write-blog",
        "welcome-add-page",
        "welcome-view-site",
        "welcome-widgets-menus",
        "welcome-comments",
        "welcome-learn-more",
        "format-aside",
        "format-image",
        "format-gallery",
        "format-video",
        "format-status",
        "format-quote",
        "format-chat",
        "format-audio",
        "camera",
        "images-alt",
        "images-alt2",
        "video-alt",
        "video-alt2",
        "video-alt3",
        "image-crop",
        "image-rotate-left",
        "image-rotate-right",
        "image-flip-vertical",
        "image-flip-horizontal",
        "undo",
        "redo",
        "editor-bold",
        "editor-italic",
        "editor-ul",
        "editor-ol",
        "editor-quote",
        "editor-alignleft",
        "editor-aligncenter",
        "editor-alignright",
        "editor-insertmore",
        "editor-spellcheck",
        "editor-distractionfree",
        "editor-kitchensink",
        "editor-underline",
        "editor-justify",
        "editor-textcolor",
        "editor-paste-word",
        "editor-paste-text",
        "editor-removeformatting",
        "editor-video",
        "editor-customchar",
        "editor-outdent",
        "editor-indent",
        "editor-help",
        "editor-strikethrough",
        "editor-unlink",
        "editor-rtl",
        "align-left",
        "align-right",
        "align-center",
        "align-none",
        "lock",
        "calendar",
        "visibility",
        "post-status",
        "edit",
        "trash",
        "arrow-up",
        "arrow-down",
        "arrow-right",
        "arrow-left",
        "arrow-up-alt",
        "arrow-down-alt",
        "arrow-right-alt",
        "arrow-left-alt",
        "arrow-up-alt2",
        "arrow-down-alt2",
        "arrow-right-alt2",
        "arrow-left-alt2",
        "sort",
        "leftright",
        "list-view",
        "exerpt-view",
        "share",
        "share-alt",
        "share-alt2",
        "twitter",
        "rss",
        "facebook",
        "facebook-alt",
        "googleplus",
        "networking",
        "hammer",
        "art",
        "migrate",
        "performance",
        "wordpress",
        "wordpress-alt",
        "pressthis",
        "update",
        "screenoptions",
        "info",
        "cart",
        "feedback",
        "cloud",
        "translation",
        "tag",
        "category",
        "yes",
        "no",
        "no-alt",
        "plus",
        "minus",
        "dismiss",
        "marker",
        "star-filled",
        "star-half",
        "star-empty",
        "flag",
        "location",
        "location-alt",
        "vault",
        "shield",
        "shield-alt",
        "search",
        "slides",
        "analytics",
        "chart-pie",
        "chart-bar",
        "chart-line",
        "chart-area",
        "groups",
        "businessman",
        "id",
        "id-alt",
        "products",
        "awards",
        "forms",
        "portfolio",
        "book",
        "book-alt",
        "download",
        "upload",
        "backup",
        "lightbulb",
        "smiley",
      ];

      return (
        <PanelBody
          key={index}
          title={
            __("Flip Box ", "skt-blocks") +
            " " +
            (index + 1)
          }
          initialOpen={false}
          className={"rbea-repeater-panel"}
        >
          <p>
            {__("Select Icon", "skt-blocks")}
            <span className="components-base-control__label"></span>
          </p>
          <div className="skt-blocks-iconSelector">
            <div
              className="responsive-size-type-field"
              aria-label={__("Size Type", "skt-blocks")}
            >
              {times(icons.length, (n) => (
                <Button
                  onClick={() => {
                    var new_content = {
                      back_icon: icons[n],
                      icon: data_copy[index]["icon"],
                      title: data_copy[index]["title"],
                      back_button: data_copy[index]["back_button"],
                      back_buttonURL: data_copy[index]["back_buttonURL"],
                      subtitle: data_copy[index]["subtitle"],
                      back_title: data_copy[index]["back_title"],
                      back_subtitle: data_copy[index]["back_subtitle"],
                    };
                    data_copy[index] = new_content;
                    setAttributes({ flipboxArray: data_copy });
                  }}
                >
                  <Dashicon icon={icons[n]} />
                </Button>
              ))}
            </div>
          </div>
        </PanelBody>
      );
    };

    const backControls = (index) => {
      return (
        <PanelBody
          key={index}
          title={
            __("Flip Box ", "skt-blocks") +
            " " +
            (index + 1) +
            " " +
            __("Settings", "skt-blocks")
          }
          initialOpen={false}
          className={"rbea-repeater-panel"}
        >
          <TextControl
            label={__("Title", "skt-blocks")}
            type="text"
            value={flipboxArray[index]["back_title"]}
            onChange={(value) => {
              var new_content = {
                title: data_copy[index]["title"],
                subtitle: data_copy[index]["subtitle"],
                back_title: value,
                back_subtitle: data_copy[index]["back_subtitle"],
                icon: data_copy[index]["icon"],
                back_icon: data_copy[index]["back_icon"],
                back_button: data_copy[index]["back_button"],
                back_buttonURL: data_copy[index]["back_buttonURL"],
              };
              data_copy[index] = new_content;
              setAttributes({ flipboxArray: data_copy });
            }}
          />
          <TextControl
            label={__("Content", "skt-blocks")}
            type="text"
            value={flipboxArray[index]["back_subtitle"]}
            onChange={(value) => {
              var new_content = {
                title: data_copy[index]["title"],
                subtitle: data_copy[index]["subtitle"],
                back_title: data_copy[index]["back_title"],
                back_subtitle: value,
                icon: data_copy[index]["icon"],
              };
              data_copy[index] = new_content;
              setAttributes({ flipboxArray: data_copy });
            }}
          />
        </PanelBody>
      );
    };

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Number of Flip Boxes", "skt-blocks")}
            value={count}
            onChange={(newCount) => {
              let cloneTest_block = [...flipboxArray];
              if (cloneTest_block.length < newCount) {
                const incAmount = Math.abs(newCount - cloneTest_block.length);

                {
                  times(incAmount, (n) => {
                    cloneTest_block.push({
                      title: "Front Title " + newCount,
                      back_title: "Back Title " + newCount,
                      subtitle: "Front Subtitle " + newCount,
                      back_subtitle: "Back Subtitle " + newCount,
                      back_Button: "Button " + newCount,
                      icon: "shield",
                      back_icon: "shield",
                    });
                  });
                }
                setAttributes({ flipboxArray: cloneTest_block });
              } else {
                const incAmount = Math.abs(newCount - cloneTest_block.length);
                let data_new = cloneTest_block;
                for (var i = 0; i < incAmount; i++) {
                  data_new.pop();
                }
                setAttributes({ flipboxArray: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={4}
            step={1}
          />
          <RangeControl
            label={__("Height", "skt-blocks")}
            value={height}
            onChange={(value) =>
              setAttributes({ height: value !== undefined ? value : 420 })
            }
            min={300}
            max={1000}
            allowReset
          />
          <SelectControl
            label={__("Flip Style", "skt-blocks")}
            options={flipStyleOptions}
            value={flipStyleSelected}
            onChange={(value) =>
              this.props.setAttributes({
                flipStyleSelected: value,
              })
            }
          />

          <RangeControl
            label={__(
              "Transition Speed (ms)",
              "skt-blocks"
            )}
            value={transitionSpeed}
            onChange={(value) =>
              setAttributes({
                transitionSpeed: value !== undefined ? value : 8,
              })
            }
            min={0}
            max={20}
            allowReset
          />
        </PanelBody>

        <ButtonGroup
          className="flipbox_buttongroup"
          text={__("Selected Site", "skt-blocks")}
        >
          <Button
            className={classnames("flipbox_button", frontColorButtonClass)}
            onClick={() =>
              setAttributes({ colorButtonSelected: "front_selected" })
            }
          >
            {__("Front", "skt-blocks")}
          </Button>
          <Button
            className={classnames("flipbox_button", backColorButtonClass)}
            onClick={() =>
              setAttributes({ colorButtonSelected: "back_selected" })
            }
          >
            {__("Back", "skt-blocks")}
          </Button>
        </ButtonGroup>
        <PanelBody initialOpen={true}>
          {isFrontSelected && (
            <Fragment>
              <ToggleControl
                label={__("Front Icon", "skt-blocks")}
                checked={showFrontIcon}
                onChange={() =>
                  this.props.setAttributes({
                    showFrontIcon: !showFrontIcon,
                  })
                }
              />
              <ToggleControl
                label={__("Front Title", "skt-blocks")}
                checked={showFrontTitle}
                onChange={() =>
                  this.props.setAttributes({
                    showFrontTitle: !showFrontTitle,
                  })
                }
              />
              <ToggleControl
                label={__("Front Subtitle", "skt-blocks")}
                checked={showFrontSubtitle}
                onChange={() =>
                  this.props.setAttributes({
                    showFrontSubtitle: !showFrontSubtitle,
                  })
                }
              />
            </Fragment>
          )}
          {isBackSelected && (
            <Fragment>
              <ToggleControl
                label={__("Back Icon", "skt-blocks")}
                checked={showBackIcon}
                onChange={() =>
                  this.props.setAttributes({
                    showBackIcon: !showBackIcon,
                  })
                }
              />
              <ToggleControl
                label={__("Back Title", "skt-blocks")}
                checked={showBackTitle}
                onChange={() =>
                  this.props.setAttributes({
                    showBackTitle: !showBackTitle,
                  })
                }
              />
              <ToggleControl
                label={__("Back Subtitle", "skt-blocks")}
                checked={showBackSubtitle}
                onChange={() =>
                  this.props.setAttributes({
                    showBackSubtitle: !showBackSubtitle,
                  })
                }
              />
              <ToggleControl
                label={__("Back Button", "skt-blocks")}
                checked={showBackButton}
                onChange={() =>
                  this.props.setAttributes({
                    showBackButton: !showBackButton,
                  })
                }
              />
            </Fragment>
          )}
        </PanelBody>
        {isFrontSelected && (
          <PanelBody
            title={__(
              "Front Content Settings",
              "skt-blocks"
            )}
            initialOpen={false}
          >
            {times(count, (n) => frontControls(n))}
          </PanelBody>
        )}
        {isBackSelected && (
          <PanelBody
            title={__(
              "Back Content Settings",
              "skt-blocks"
            )}
            initialOpen={false}
          >
            {times(count, (n) => backControls(n))}
          </PanelBody>
        )}
        {isFrontSelected && (
          <PanelBody
            title={__("Front Icon Settings", "skt-blocks")}
            initialOpen={false}
          >
            {times(count, (n) => frontIconControls(n))}

            <h2>{__("Icon Size", "skt-blocks")}</h2>
            {this.renderDeviceTabs((sfx) =>
              this.renderRange("iconSize", __("Icon Size", "skt-blocks"), sfx, 20, 200, 50)
            )}

            <p>
              {__("Icon Color", "skt-blocks")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: iconColor }}
                ></span>
              </span>
            </p>

            <ColorPalette
              title={__("Color", "skt-blocks")}
              value={iconColor}
              onChange={(colorValue) =>
                setAttributes({ iconColor: colorValue })
              }
              allowReset
            />
          </PanelBody>
        )}
        {isBackSelected && (
          <PanelBody
            title={__("Back Icon Settings", "skt-blocks")}
            initialOpen={false}
          >
            {times(count, (n) => backIconControls(n))}

            <h2>{__("Icon Size", "skt-blocks")}</h2>
            {this.renderDeviceTabs((sfx) =>
              this.renderRange("backIconSize", __("Icon Size", "skt-blocks"), sfx, 20, 200, 50)
            )}

            <p>
              {__("Icon Color", "skt-blocks")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: backIconColor }}
                ></span>
              </span>
            </p>

            <ColorPalette
              title={__("Color", "skt-blocks")}
              value={backIconColor}
              onChange={(colorValue) =>
                setAttributes({ backIconColor: colorValue })
              }
              allowReset
            />
          </PanelBody>
        )}
        {isBackSelected && (
          <PanelBody
            title={__("Back Button Settings", "skt-blocks")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Border Radius", "skt-blocks")}
              value={buttonBorderRadius}
              onChange={(value) =>
                setAttributes({
                  buttonBorderRadius: value !== undefined ? value : 0,
                })
              }
              min={0}
              max={50}
              allowReset
            />

            <RangeControl
              label={__("Horizontal Padding", "skt-blocks")}
              value={buttonHpadding}
              onChange={(value) =>
                setAttributes({
                  buttonHpadding: value !== undefined ? value : 20,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <RangeControl
              label={__("Vertical Padding", "skt-blocks")}
              value={buttonVpadding}
              onChange={(value) =>
                setAttributes({
                  buttonVpadding: value !== undefined ? value : 10,
                })
              }
              min={0}
              max={100}
              allowReset
            />
            <TabPanel
              className="rbea-inspect-tabs rbea-inspect-tabs-col-2"
              activeClass="active-tab"
              tabs={[
                {
                  name: "normal",
                  title: __("Normal"),
                  className: "rbea-normal-tab",
                },
                {
                  name: "hover",
                  title: __("Hover"),
                  className: "rbea-focus-tab",
                },
              ]}
            >
              {(tabName) => {
                let tabout;
                if ("hover" === tabName.name) {
                  tabout = (
                    <Fragment>
                      <Fragment>
                        <p>
                          {__("Text Color", "skt-blocks")}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ backgroundColor: buttonHTextColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={buttonHTextColor}
                          onChange={(colorValue) =>
                            setAttributes({ buttonHTextColor: colorValue })
                          }
                          allowReset
                        />
                      </Fragment>
                      <SelectControl
                        label={__(
                          "Background Type",
                          "skt-blocks"
                        )}
                        value={buttonHbackgroundType}
                        onChange={(value) =>
                          setAttributes({ buttonHbackgroundType: value })
                        }
                        options={buttonbackgroundTypeOptions}
                      />
                      {"color" == buttonHbackgroundType && (
                        <Fragment>
                          <p>
                            {__(
                              "Background Color",
                              "skt-blocks"
                            )}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{ backgroundColor: buttonHColor }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={buttonHColor}
                            onChange={(colorValue) =>
                              setAttributes({ buttonHColor: colorValue })
                            }
                            allowReset
                          />
                          <RangeControl
                            label={__(
                              "Opacity",
                              "skt-blocks"
                            )}
                            value={buttonHopacity}
                            onChange={(value) =>
                              setAttributes({
                                buttonHopacity:
                                  value !== undefined ? value : 20,
                              })
                            }
                            min={0}
                            max={100}
                            allowReset
                          />
                        </Fragment>
                      )}
                      {"gradient" == buttonHbackgroundType && (
                        <Fragment>
                          <p className="responsive-setting-label">
                            {__("Color 1", "skt-blocks")}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{
                                  backgroundColor: buttonHbackgroundColor1,
                                }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={buttonHbackgroundColor1}
                            onChange={(colorValue) =>
                              setAttributes({
                                buttonHbackgroundColor1: colorValue,
                              })
                            }
                            allowReset
                          />

                          <p className="responsive-setting-label">
                            {__("Color 2", "skt-blocks")}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{
                                  backgroundColor: buttonHbackgroundColor2,
                                }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={buttonHbackgroundColor2}
                            onChange={(colorValue) =>
                              setAttributes({
                                buttonHbackgroundColor2: colorValue,
                              })
                            }
                            allowReset
                          />
                          <RangeControl
                            label={__(
                              "Color Location 1",
                              "skt-blocks"
                            )}
                            value={buttonHcolorLocation1}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setAttributes({ buttonHcolorLocation1: value })
                            }
                          />
                          <RangeControl
                            label={__(
                              "Color Location 2",
                              "skt-blocks"
                            )}
                            value={buttonHcolorLocation2}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setAttributes({ buttonHcolorLocation2: value })
                            }
                          />
                          <RangeControl
                            label={__(
                              "Gradient Direction",
                              "skt-blocks"
                            )}
                            value={buttonHgradientDirection}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setAttributes({ buttonHgradientDirection: value })
                            }
                          />
                        </Fragment>
                      )}
                    </Fragment>
                  );
                } else {
                  tabout = (
                    <Fragment>
                      <Fragment>
                        <p>
                          {__("Text Color", "skt-blocks")}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ backgroundColor: buttonTextColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={buttonTextColor}
                          onChange={(colorValue) =>
                            setAttributes({ buttonTextColor: colorValue })
                          }
                          allowReset
                        />
                      </Fragment>
                      <SelectControl
                        label={__(
                          "Background Type",
                          "skt-blocks"
                        )}
                        value={buttonbackgroundType}
                        onChange={(value) =>
                          setAttributes({ buttonbackgroundType: value })
                        }
                        options={buttonbackgroundTypeOptions}
                      />
                      {"color" == buttonbackgroundType && (
                        <Fragment>
                          <p>
                            {__(
                              "Background Color",
                              "skt-blocks"
                            )}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{ backgroundColor: buttonColor }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={buttonColor}
                            onChange={(colorValue) =>
                              setAttributes({ buttonColor: colorValue })
                            }
                            allowReset
                          />
                          <RangeControl
                            label={__(
                              "Opacity",
                              "skt-blocks"
                            )}
                            value={buttonopacity}
                            onChange={(value) =>
                              setAttributes({
                                buttonopacity: value !== undefined ? value : 20,
                              })
                            }
                            min={0}
                            max={100}
                            allowReset
                          />
                        </Fragment>
                      )}
                      {"gradient" == buttonbackgroundType && (
                        <Fragment>
                          <p className="responsive-setting-label">
                            {__("Color 1", "skt-blocks")}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{
                                  backgroundColor: buttonbackgroundColor1,
                                }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={buttonbackgroundColor1}
                            onChange={(colorValue) =>
                              setAttributes({
                                buttonbackgroundColor1: colorValue,
                              })
                            }
                            allowReset
                          />

                          <p className="responsive-setting-label">
                            {__("Color 2", "skt-blocks")}
                            <span className="components-base-control__label">
                              <span
                                className="component-color-indicator"
                                style={{
                                  backgroundColor: buttonbackgroundColor2,
                                }}
                              ></span>
                            </span>
                          </p>
                          <ColorPalette
                            value={buttonbackgroundColor2}
                            onChange={(colorValue) =>
                              setAttributes({
                                buttonbackgroundColor2: colorValue,
                              })
                            }
                            allowReset
                          />
                          <RangeControl
                            label={__(
                              "Color Location 1",
                              "skt-blocks"
                            )}
                            value={buttoncolorLocation1}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setAttributes({ buttoncolorLocation1: value })
                            }
                          />
                          <RangeControl
                            label={__(
                              "Color Location 2",
                              "skt-blocks"
                            )}
                            value={buttoncolorLocation2}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setAttributes({ buttoncolorLocation2: value })
                            }
                          />
                          <RangeControl
                            label={__(
                              "Gradient Direction",
                              "skt-blocks"
                            )}
                            value={buttongradientDirection}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setAttributes({ buttongradientDirection: value })
                            }
                          />
                        </Fragment>
                      )}
                    </Fragment>
                  );
                }
                return <div>{tabout}</div>;
              }}
            </TabPanel>
          </PanelBody>
        )}

        <PanelBody
          title={__("Background Image", "skt-blocks")}
          initialOpen={false}
        >
          {isFrontSelected && (
            <Fragment>
              <BaseControl
                className="editor-bg-image-control"
                label={__(
                  "Front Background Image",
                  "skt-blocks"
                )}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "skt-blocks"
                  )}
                  onSelect={this.onSelectImage}
                  allowedTypes={["image"]}
                  value={backgroundImage}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImage
                        ? __(
                            "Select Background Image",
                            "skt-blocks"
                          )
                        : __("Replace image", "skt-blocks")}
                    </Button>
                  )}
                />
                {backgroundImage && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImage}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "skt-blocks")}
                  </Button>
                )}
              </BaseControl>
              <RangeControl
                label={__("Opacity", "skt-blocks")}
                value={colorOpacity}
                onChange={(value) =>
                  setAttributes({
                    colorOpacity: value !== undefined ? value : 30,
                  })
                }
                min={0}
                max={100}
                allowReset
              />
            </Fragment>
          )}
          {isBackSelected && (
            <Fragment>
              <BaseControl
                className="editor-bg-image-control"
                label={__(
                  "Back Background Image",
                  "skt-blocks"
                )}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "skt-blocks"
                  )}
                  onSelect={this.onSelectBackImage}
                  allowedTypes={["image"]}
                  value={backBackgroundImage}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backBackgroundImage
                        ? __(
                            "Select Background Image",
                            "skt-blocks"
                          )
                        : __("Replace image", "skt-blocks")}
                    </Button>
                  )}
                />
                {backBackgroundImage && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveBackImage}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "skt-blocks")}
                  </Button>
                )}
              </BaseControl>
              <RangeControl
                label={__("Opacity", "skt-blocks")}
                value={backColorOpacity}
                onChange={(value) =>
                  setAttributes({
                    backColorOpacity: value !== undefined ? value : 30,
                  })
                }
                min={0}
                max={100}
                allowReset
              />
            </Fragment>
          )}
        </PanelBody>

        {isFrontSelected && (
          <PanelColorSettings
            title={__("Front Color Settings", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: frontTextColor,
                onChange: onChangeFrontTextColor,
                label: __("Text Color", "skt-blocks"),
              },
              {
                value: frontBackgroundColor,
                onChange: onChangeFrontBackgroundColor,
                label: __("Background Color", "skt-blocks"),
              },
            ]}
          >
            <RangeControl
              label={__("Opacity", "skt-blocks")}
              value={colorOpacity}
              onChange={(value) =>
                setAttributes({
                  colorOpacity: value !== undefined ? value : 100,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </PanelColorSettings>
        )}
        {isBackSelected && (
          <PanelColorSettings
            title={__("Back Color Settings", "skt-blocks")}
            initialOpen={false}
            colorSettings={[
              {
                value: backTextColor,
                onChange: onChangeBackTextColor,
                label: __("Text Color", "skt-blocks"),
              },
              {
                value: backBackgroundColor,
                onChange: onChangeBackBackgroundColor,
                label: __("Background Color", "skt-blocks"),
              },
            ]}
          >
            <RangeControl
              label={__("Opacity", "skt-blocks")}
              value={backColorOpacity}
              onChange={(value) =>
                setAttributes({
                  backColorOpacity: value !== undefined ? value : 100,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </PanelColorSettings>
        )}
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          {this.renderDeviceTabs((sfx) => (
            <Fragment>
              <h2>{__("Margin")}</h2>
              {this.renderRange("topMargin", __("Top Margin", "skt-blocks"), sfx, -2000, 2000, 0)}
              {this.renderRange("bottomMargin", __("Bottom Margin", "skt-blocks"), sfx, -2000, 2000, 0)}
              <h2>{__("Padding")}</h2>
              <TabPanel
                className="rbea-inspect-tabs rbea-inspect-tabs-col-2"
                activeClass="active-tab"
                tabs={[
                  { name: "front", title: __("Front"), className: "rbea-normal-tab" },
                  { name: "back", title: __("Back"), className: "rbea-focus-tab" },
                ]}
              >
                {(tabName) => {
                  const pre = "back" === tabName.name ? "back" : "";
                  return (
                    <div>
                      {this.renderRange(pre + "topPadding", __("Top Padding", "skt-blocks"), sfx, 0, 50, 0)}
                      {this.renderRange(pre + "bottomPadding", __("Bottom Padding", "skt-blocks"), sfx, 0, 50, 0)}
                      {this.renderRange(pre + "leftPadding", __("Left Padding", "skt-blocks"), sfx, 0, 50, 0)}
                      {this.renderRange(pre + "rightPadding", __("Right Padding", "skt-blocks"), sfx, 0, 50, 0)}
                    </div>
                  );
                }}
              </TabPanel>
            </Fragment>
          ))}
        </PanelBody>
        <PanelBody
          title={__("Border Settings", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style", "skt-blocks")}
            value={borderStyle}
            onChange={(value) => setAttributes({ borderStyle: value })}
            options={[
              {
                value: "none",
                label: __("None", "skt-blocks"),
              },
              {
                value: "solid",
                label: __("Solid", "skt-blocks"),
              },
              {
                value: "dotted",
                label: __("Dotted", "skt-blocks"),
              },
              {
                value: "dashed",
                label: __("Dashed", "skt-blocks"),
              },
              {
                value: "double",
                label: __("Double", "skt-blocks"),
              },
              {
                value: "groove",
                label: __("Groove", "skt-blocks"),
              },
              {
                value: "inset",
                label: __("Inset", "skt-blocks"),
              },
              {
                value: "outset",
                label: __("Outset", "skt-blocks"),
              },
              {
                value: "ridge",
                label: __("Ridge", "skt-blocks"),
              },
            ]}
          />
          {"none" != borderStyle && (
            <Fragment>
              {this.renderDeviceTabs((sfx) =>
                this.renderRange("borderWidth", __("Border Width", "skt-blocks"), sfx, 0, 50, 2)
              )}
              <Fragment>
                <p>
                  {__("Border Color", "skt-blocks")}
                  <span className="components-base-control__label">
                    <span
                      className="component-color-indicator"
                      style={{ backgroundColor: borderColor }}
                    ></span>
                  </span>
                </p>
                <ColorPalette
                  value={borderColor}
                  onChange={(colorValue) =>
                    setAttributes({
                      borderColor:
                        colorValue !== undefined ? colorValue : "#000",
                    })
                  }
                  allowReset
                />
              </Fragment>
            </Fragment>
          )}
          {this.renderDeviceTabs((sfx) =>
            this.renderRange("borderRadius", __("Border Radius", "skt-blocks"), sfx, 0, 100, null)
          )}
          <BoxShadowControl
            setAttributes={setAttributes}
            label={__("Box Shadow")}
            boxShadowColor={{ value: boxShadowColor, label: __("Color") }}
            boxShadowHOffset={{
              value: boxShadowHOffset,
              label: __("Horizontal"),
            }}
            boxShadowVOffset={{
              value: boxShadowVOffset,
              label: __("Vertical"),
            }}
            boxShadowBlur={{ value: boxShadowBlur, label: __("Blur") }}
            boxShadowSpread={{ value: boxShadowSpread, label: __("Spread") }}
            boxShadowPosition={{
              value: boxShadowPosition,
              label: __("Position"),
            }}
          />
        </PanelBody>
        <PanelBody title={__("Visibility", "skt-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Hide on Desktop", "skt-blocks")}
            checked={!!this.props.attributes.hideDesktop}
            onChange={(value) => setAttributes({ hideDesktop: value })}
          />
          <ToggleControl
            label={__("Hide on Tablet", "skt-blocks")}
            checked={!!this.props.attributes.hideTablet}
            onChange={(value) => setAttributes({ hideTablet: value })}
          />
          <ToggleControl
            label={__("Hide on Mobile", "skt-blocks")}
            checked={!!this.props.attributes.hideMobile}
            onChange={(value) => setAttributes({ hideMobile: value })}
          />
          <ToggleControl
            label={__("Hide from Logged-in Users", "skt-blocks")}
            checked={!!this.props.attributes.hideLoggedIn}
            onChange={(value) => setAttributes({ hideLoggedIn: value })}
          />
          <ToggleControl
            label={__("Hide from Logged-out Users", "skt-blocks")}
            checked={!!this.props.attributes.hideLoggedOut}
            onChange={(value) => setAttributes({ hideLoggedOut: value })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
