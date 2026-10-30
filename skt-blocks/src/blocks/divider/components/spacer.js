/**
 * Button Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from "classnames";

/**
 * Create a Button wrapper Component
 */
export default class Spacer extends Component {
  render() {
    // Setup the attributes
    const {
      spacerDivider,
      spacerDividerStyle,
      spacerDividerColor,
      spacerHeightTablet,
      spacerHeightMobile,
      spacerDividerHeightTablet,
      spacerDividerHeightMobile,
      spacerDividerWidthTablet,
      spacerDividerWidthMobile,
      hideDesktop,
      hideTablet,
      hideMobile,
    } = this.props.attributes;

    // In the editor the live preview is driven by the preview device (see
    // edit.js), so the front-end media-query classes/vars are not applied.
    const isEditorPreview = !!this.props.isEditorPreview;

    const px = (v) => (v || v === 0 ? v + "px" : undefined);
    const pct = (v) => (v || v === 0 ? v + "%" : undefined);

    return (
      <div
        style={
          isEditorPreview
            ? { color: spacerDividerColor }
            : {
          color: spacerDividerColor,
          "--skt-dv-margin-tablet": px(spacerHeightTablet),
          "--skt-dv-margin-mobile": px(spacerHeightMobile),
          "--skt-dv-height-tablet": spacerDividerHeightTablet
            ? px(spacerDividerHeightTablet)
            : undefined,
          "--skt-dv-height-mobile": spacerDividerHeightMobile
            ? px(spacerDividerHeightMobile)
            : undefined,
          "--skt-dv-width-tablet": pct(spacerDividerWidthTablet),
          "--skt-dv-width-mobile": pct(spacerDividerWidthMobile),
        }
        }
        className={classnames(
          this.props.className,
          "skt-blocks-block-spacer",
          spacerDividerStyle,
          {
            "skt-blocks-spacer-divider": true,
            "skt-hide-desktop": hideDesktop,
            "skt-hide-tablet": hideTablet,
            "skt-hide-mobile": hideMobile,
            "has-dv-margin-tablet":
              !isEditorPreview &&
              (spacerHeightTablet || spacerHeightTablet === 0),
            "has-dv-margin-mobile":
              !isEditorPreview &&
              (spacerHeightMobile || spacerHeightMobile === 0),
            "has-dv-height-tablet":
              !isEditorPreview && !!spacerDividerHeightTablet,
            "has-dv-height-mobile":
              !isEditorPreview && !!spacerDividerHeightMobile,
            "has-dv-width-tablet":
              !isEditorPreview &&
              (spacerDividerWidthTablet || spacerDividerWidthTablet === 0),
            "has-dv-width-mobile":
              !isEditorPreview &&
              (spacerDividerWidthMobile || spacerDividerWidthMobile === 0),
          }
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
