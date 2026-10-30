/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
  TabPanel,
} = wp.components;

const DEVICE_TABS = [
  { name: "desktop", title: __("Desktop", "skt-blocks") },
  { name: "tablet", title: __("Tablet", "skt-blocks") },
  { name: "mobile", title: __("Mobile", "skt-blocks") },
];

const deviceSuffix = (name) =>
  name === "desktop" ? "" : name === "tablet" ? "Tablet" : "Mobile";

// Switch the editor's preview device together with the inspector tab, so the
// value being edited is visible live on the canvas.
const setPreviewDevice = (name) => {
  const type =
    name === "desktop" ? "Desktop" : name === "tablet" ? "Tablet" : "Mobile";
  try {
    const editor = wp.data.dispatch("core/editor");
    if (editor && editor.setDeviceType) {
      editor.setDeviceType(type);
      return;
    }
    const editPost = wp.data.dispatch("core/edit-post");
    if (editPost && editPost.__experimentalSetPreviewDeviceType) {
      editPost.__experimentalSetPreviewDeviceType(type);
    }
  } catch (e) {}
};

// Value shown in the controls: the device's own value, otherwise the value it
// inherits (Mobile -> Tablet -> Desktop). Nothing extra is stored, so existing
// blocks keep their saved markup.
const inherited = (attributes, base, s) => {
  const chain =
    s === "Mobile"
      ? [base + "Mobile", base + "Tablet", base]
      : s === "Tablet"
      ? [base + "Tablet", base]
      : [base];
  for (const key of chain) {
    const v = attributes[key];
    if (v !== undefined && v !== null && v !== "") {
      return v;
    }
  }
  return undefined;
};

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
        hideDesktop,
        hideTablet,
        hideMobile,
        hideLoggedIn,
        hideLoggedOut,
      },
      attributes,
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
          <TabPanel
            className="skt-divider-device-tabs"
            tabs={DEVICE_TABS}
            initialTabName={(this.props.deviceType || "Desktop").toLowerCase()}
            onSelect={setPreviewDevice}
          >
            {(tab) => {
              const s = deviceSuffix(tab.name);
              return (
                <RangeControl
                  label={__("Vertical Margin", "skt-blocks")}
                  value={inherited(attributes, "spacerHeight", s)}
                  onChange={(value) =>
                    setAttributes({
                      ["spacerHeight" + s]:
                        value !== undefined
                          ? value
                          : s === ""
                          ? 30
                          : undefined,
                    })
                  }
                  min={0}
                  max={100}
                  allowReset
                />
              );
            }}
          </TabPanel>
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
          <TabPanel
            className="skt-divider-device-tabs"
            tabs={DEVICE_TABS}
            initialTabName={(this.props.deviceType || "Desktop").toLowerCase()}
            onSelect={setPreviewDevice}
          >
            {(tab) => {
              const s = deviceSuffix(tab.name);
              return (
                <Fragment>
                  <RangeControl
                    label={__("Divider Height", "skt-blocks")}
                    value={inherited(attributes, "spacerDividerHeight", s)}
                    onChange={(value) =>
                      setAttributes({
                        ["spacerDividerHeight" + s]: value,
                      })
                    }
                    min={1}
                    max={100}
                    allowReset
                  />
                  <RangeControl
                    label={__("Divider Width", "skt-blocks")}
                    value={inherited(attributes, "spacerDividerWidth", s)}
                    onChange={(value) =>
                      setAttributes({
                        ["spacerDividerWidth" + s]: value,
                      })
                    }
                    min={0}
                    max={100}
                    allowReset
                  />
                </Fragment>
              );
            }}
          </TabPanel>
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
        <PanelBody title={__("Visibility", "skt-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Hide on Desktop", "skt-blocks")}
            checked={hideDesktop}
            onChange={(value) => setAttributes({ hideDesktop: value })}
          />
          <ToggleControl
            label={__("Hide on Tablet", "skt-blocks")}
            checked={hideTablet}
            onChange={(value) => setAttributes({ hideTablet: value })}
          />
          <ToggleControl
            label={__("Hide on Mobile", "skt-blocks")}
            checked={hideMobile}
            onChange={(value) => setAttributes({ hideMobile: value })}
          />
          <ToggleControl
            label={__("Hide from Logged-in Users", "skt-blocks")}
            checked={hideLoggedIn}
            onChange={(value) => setAttributes({ hideLoggedIn: value })}
          />
          <ToggleControl
            label={__("Hide from Logged-out Users", "skt-blocks")}
            checked={hideLoggedOut}
            onChange={(value) => setAttributes({ hideLoggedOut: value })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
