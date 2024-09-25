/**
 * Inspector Controls
 */

import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import renderSVG from "../../../../renderIcon";
import ResponsiveBlocksIcon from "../../../../ResponsiveBlocksIcon.json";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  ColorPalette,
  MediaUpload,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  BaseControl,
  TabPanel,
  ToggleControl,
  Button,
  ButtonGroup,
  Icon,
  TextControl,
} = wp.components;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
  }

  /*
   * Event to set Image as null while removing.
   */
  onRemoveImage() {
    const { setAttributes } = this.props;
    setAttributes({ image: null });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectImage(media) {
    const { setAttributes } = this.props;

    if (!media || !media.url) {
      setAttributes({ image: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ image: media });
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        label,
        image_icon,
        icon,
        image,
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
        hideLabel,
        source_type,
      },
      setAttributes,
    } = this.props;

    let image_name = __("Select Image", "skt-blocks");
    if (image) {
      if (image.url == null || image.url == "") {
        image_name = __("Select Image", "skt-blocks");
      } else {
        image_name = __("Replace Image", "skt-blocks");
      }
    }

    const iconColorControls = () => {
      let color_control = "";
      let color_control_hover = "";

      color_control = (
        <Fragment>
          <p className="skt-blocks-setting-label">
            {__("Text Color", "skt-blocks")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: label_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={label_color}
            onChange={(value) => setAttributes({ label_color: value })}
            allowReset
          />
          <p className="skt-blocks-setting-label">
            {__("Icon Color", "skt-blocks")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: icon_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={icon_color}
            onChange={(value) => setAttributes({ icon_color: value })}
            allowReset
          />
          <p className="skt-blocks-setting-label">
            {__("Icon Background Color", "skt-blocks")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: icon_bg_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={icon_bg_color}
            onChange={(value) => setAttributes({ icon_bg_color: value })}
            allowReset
          />
          <p className="skt-blocks-setting-label">
            {__("Icon Border Color", "skt-blocks")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: icon_border_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={icon_border_color}
            onChange={(value) => setAttributes({ icon_border_color: value })}
            allowReset
          />
        </Fragment>
      );
      color_control_hover = (
        <Fragment>
          <p className="skt-blocks-setting-label">
            {__("Text Hover Color", "skt-blocks")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: label_hover_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={label_hover_color}
            onChange={(value) => setAttributes({ label_hover_color: value })}
            allowReset
          />
          <p className="skt-blocks-setting-label">
            {__("Icon Hover Color", "skt-blocks")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: icon_hover_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={icon_hover_color}
            onChange={(value) => setAttributes({ icon_hover_color: value })}
            allowReset
          />
          <p className="skt-blocks-setting-label">
            {__(
              "Icon Background Hover Color",
              "skt-blocks"
            )}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: icon_bg_hover_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={icon_bg_hover_color}
            onChange={(value) => setAttributes({ icon_bg_hover_color: value })}
            allowReset
          />
          <p className="skt-blocks-setting-label">
            {__("Icon Border Hover Color", "skt-blocks")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: icon_border_hover_color }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={icon_border_hover_color}
            onChange={(value) =>
              setAttributes({ icon_border_hover_color: value })
            }
            allowReset
          />
        </Fragment>
      );

      return (
        <TabPanel
          className="skt-blocks-inspect-tabs skt-blocks-inspect-tabs-col-2"
          activeClass="active-tab"
          tabs={[
            {
              name: "normal",
              title: __("Normal", "skt-blocks"),
              className: "skt-blocks-normal-tab",
            },
            {
              name: "hover",
              title: __("Hover", "skt-blocks"),
              className: "skt-blocks-hover-tab",
            },
          ]}
        >
          {(tabName) => {
            let color_tab;
            if ("normal" === tabName.name) {
              color_tab = color_control;
            } else {
              color_tab = color_control_hover;
            }
            return <div>{color_tab}</div>;
          }}
        </TabPanel>
      );
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("Icon Settings", "skt-blocks")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Select Source", "skt-blocks")}
              value={source_type}
              onChange={(value) => setAttributes({ source_type: value })}
              options={[
                {
                  value: "icon",
                  label: __("Icon", "skt-blocks"),
                },
                {
                  value: "image",
                  label: __("Image", "skt-blocks"),
                },
              ]}
            />
            {"image" == source_type && (
              <Fragment>
                <BaseControl
                  className="editor-bg-image-control"
                  label={__("Image", "skt-blocks")}
                >
                  <MediaUpload
                    title={__("Select Image", "skt-blocks")}
                    onSelect={this.onSelectImage}
                    allowedTypes={["image"]}
                    value={image}
                    render={({ open }) => (
                      <Button isDefault onClick={open}>
                        {image_name}
                      </Button>
                    )}
                  />
                  {image && image.url !== "null" && image.url !== "" && (
                    <Button
                      className="skt-blocks-rm-btn"
                      onClick={this.onRemoveImage}
                      isLink
                      isDestructive
                    >
                      {__("Remove Image", "skt-blocks")}
                    </Button>
                  )}
                </BaseControl>
              </Fragment>
            )}
            {"icon" == source_type && (
              <Fragment>
                <p className="components-base-control__label">{__("Icon")}</p>
                <FontIconPicker
                  icons={svg_icons}
                  renderFunc={renderSVG}
                  theme="default"
                  value={icon}
                  onChange={(value) => setAttributes({ icon: value })}
                  isMulti={false}
                  noSelectedPlaceholder={__(
                    "Select Icon",
                    "skt-blocks"
                  )}
                />
                <hr className="skt-blocks-editor__separator" />
                <h2>
                  {__("Icon Color Settings", "skt-blocks")}
                </h2>
                {iconColorControls()}
              </Fragment>
            )}
            <hr className="skt-blocks-editor__separator" />
            <h2>{__("List Item Link")}</h2>
            <ToggleControl
              label={__("Disable Link")}
              checked={disableLink}
              onChange={(value) => setAttributes({ disableLink: !disableLink })}
            />
            {!disableLink && (
              <Fragment>
                <p className="components-base-control__label">{__("URL")}</p>
                <TextControl
                  value={link}
                  onChange={(value) => setAttributes({ link: value })}
                  placeholder={__("Enter URL")}
                />
                <ToggleControl
                  label={__("Open in New Tab")}
                  checked={target}
                  onChange={(value) => setAttributes({ target: !target })}
                />
              </Fragment>
            )}
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  }
}
