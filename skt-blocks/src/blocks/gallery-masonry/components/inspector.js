/**
 * Internal dependencies
 */
import ResponsiveTabsControl from "../../../utils/components/responsive-tabs-control";
import captionOptions from "../../../utils/components/block-gallery/options/caption-options";
import SizeControl from "../../../utils/components/size-control";
import GalleryLinkSettings from "../../../utils/components/block-gallery/gallery-link-settings";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
} from "@wordpress/components";

/**
 * Inspector controls
 */
class Inspector extends Component {
  constructor() {
    super(...arguments);
    this.setSizeControl = this.setSizeControl.bind(this);
    this.setRadiusTo = this.setRadiusTo.bind(this);
    this.setCaptionStyleTo = this.setCaptionStyleTo.bind(this);
  }

  componentDidUpdate() {
    if (this.props.attributes.gutter <= 0) {
      this.props.setAttributes({
        radius: 0,
      });
    }
  }

  setRadiusTo(value) {
    this.props.setAttributes({ radius: value });
  }

  setSizeControl(value) {
    this.props.setAttributes({ gridSize: value });
  }

  setCaptionStyleTo(value) {
    this.props.setAttributes({ captionStyle: value });
  }

  getCaptionsHelp(checked) {
    return checked
      ? __(
          "Showing captions for each media item.",
          "skt-blocks"
        )
      : __("Toggle to show media captions.", "skt-blocks");
  }

  getLightboxHelp(checked) {
    return checked
      ? __("Image lightbox is enabled.", "skt-blocks")
      : __(
          "Toggle to enable the image lightbox.",
          "skt-blocks"
        );
  }

  render() {
    const { attributes, setAttributes } = this.props;

    const {
      captions,
      captionStyle,
      gridSize,
      gutter,
      radius,
      lightbox,
    } = attributes;

    return (
      <InspectorControls>
        <PanelBody
          title={__("Masonry settings", "skt-blocks")}
        >
          <SizeControl
            {...this.props}
            type={"grid"}
            label={__("Size", "skt-blocks")}
            onChange={this.setSizeControl}
            value={gridSize}
            resetValue={"xlrg"}
          />

          <ResponsiveTabsControl {...this.props} />

          {gutter > 0 && (
            <RangeControl
              label={__("Rounded corners", "skt-blocks")}
              aria-label={__(
                "Add rounded corners to the gallery items.",
                "skt-blocks"
              )}
              value={radius}
              onChange={this.setRadiusTo}
              min={0}
              max={20}
              step={1}
            />
          )}

          <ToggleControl
            label={__("Lightbox", "skt-blocks")}
            checked={!!lightbox}
            onChange={() => setAttributes({ lightbox: !lightbox })}
            help={this.getLightboxHelp}
          />

          <ToggleControl
            label={__("Captions", "skt-blocks")}
            checked={!!captions}
            onChange={() => setAttributes({ captions: !captions })}
            help={this.getCaptionsHelp}
          />

          {captions && (
            <SelectControl
              label={__("Caption style", "skt-blocks")}
              value={captionStyle}
              onChange={this.setCaptionStyleTo}
              options={captionOptions}
            />
          )}
        </PanelBody>
        <GalleryLinkSettings {...this.props} />
      </InspectorControls>
    );
  }
}

export default Inspector;
