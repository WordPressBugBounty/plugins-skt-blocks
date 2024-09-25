/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  render() {
    // Setup the attributes
    const {
      attributes: {
        spacerHeight,
        spacerDivider,
        spacerDividerStyle,
        spacerDividerColor,
        spacerDividerHeight,
        spacerDividerWidth,
      },
      setAttributes,
    } = this.props;

    // Button size values
    const spacerStyleOptions = [
      {
        value: "bars",
        label: __("Bar", "skt-blocks"),
      },
      {
        value: "dots",
        label: __("Dots", "skt-blocks"),
      },
      {
        value: "asterisks",
        label: __("Asterisks", "skt-blocks"),
      },
      {
        value: "basic",
        label: __("Basic", "skt-blocks"),
      },
    ];

    // Divider color
    const dividerColor = [
      { color: "#ddd", name: "white" },
      { color: "#333", name: "black" },
      { color: "#3373dc", name: "royal blue" },
      { color: "#22d25f", name: "green" },
      { color: "#ffdd57", name: "yellow" },
      { color: "#ff3860", name: "pink" },
      { color: "#7941b6", name: "purple" },
    ];

    // Update color values
    const onChangeDividerColor = (value) =>
      setAttributes({ spacerDividerColor: value });

    return (
      <InspectorControls key="inspector">
        <PanelBody>
          <RangeControl
            label={__("Vertical Margin", "skt-blocks")}
            value={spacerHeight}
            onChange={(value) =>
              this.props.setAttributes({
                spacerHeight: value !== undefined ? value : 30,
              })
            }
            min={0}
            max={100}
          />
        </PanelBody>
        <PanelBody>
          <SelectControl
            label={__("Divider Style", "skt-blocks")}
            value={spacerDividerStyle}
            options={spacerStyleOptions.map(({ value, label }) => ({
              value,
              label,
            }))}
            onChange={(value) => {
              this.props.setAttributes({
                spacerDividerStyle: value,
              });
            }}
          />
          <RangeControl
            label={__("Divider Height", "skt-blocks")}
            value={spacerDividerHeight || ""}
            onChange={(value) =>
              this.props.setAttributes({
                spacerDividerHeight: value,
              })
            }
            min={1}
            max={100}
          />
          <RangeControl
            label={__("Divider Width", "skt-blocks")}
            value={spacerDividerWidth || ""}
            onChange={(value) =>
              this.props.setAttributes({
                spacerDividerWidth: value,
              })
            }
            min={0}
            max={100}
          />
        </PanelBody>
        <PanelColorSettings
          title={__("Divider Color", "skt-blocks")}
          initialOpen={false}
          colorSettings={[
            {
              colors: dividerColor,
              value: spacerDividerColor,
              onChange: onChangeDividerColor,
              label: __("Divider Color", "skt-blocks"),
            },
          ]}
        ></PanelColorSettings>
      </InspectorControls>
    );
  }
}
