/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  BaseControl,
  TextControl,
  Button,
  ExternalLink,
  ToggleControl,
  TabPanel,
  Dashicon,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      apiKey: props.apiKey,
      isSavedKey: false,
      keySaved: false,
      address: props.attributes.address,
    };
  }

  render() {
    // Setup the attributes
    const {
      attributes: { zoom, height, apiKey },
      setAttributes,
    } = this.props;

    return (
      <InspectorControls key="inspector">
        <PanelBody title={__("Map settings", "skt-blocks")}>
          <RangeControl
            label={__("Zoom", "skt-blocks")}
            value={zoom}
            onChange={(value) =>
              this.props.setAttributes({
                zoom: value,
              })
            }
            min={10}
            max={17}
            step={1}
          />
          <TabPanel
            className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
            activeClass="active-tab"
            tabs={[
              { name: "desktop", title: <Dashicon icon="desktop" />, className: " responsive-desktop-tab  responsive-responsive-tabs" },
              { name: "tablet", title: <Dashicon icon="tablet" />, className: " responsive-tablet-tab  responsive-responsive-tabs" },
              { name: "mobile", title: <Dashicon icon="smartphone" />, className: " responsive-mobile-tab  responsive-responsive-tabs" },
            ]}
          >
            {(tab) => {
              const key =
                tab.name === "tablet"
                  ? "heightTablet"
                  : tab.name === "mobile"
                  ? "heightMobile"
                  : "height";
              return (
                <BaseControl
                  label={__("Height in pixels", "skt-blocks")}
                  id={"map-height-control-" + tab.name}
                >
                  <input
                    type="number"
                    aria-label={__("Height for the map in pixels", "skt-blocks")}
                    onChange={(event) => {
                      const v = event.target.value;
                      setAttributes({
                        [key]: v === "" ? undefined : parseInt(v, 10),
                      });
                    }}
                    value={
                      this.props.attributes[key] === undefined
                        ? ""
                        : this.props.attributes[key]
                    }
                    min={200}
                    step={10}
                  />
                </BaseControl>
              );
            }}
          </TabPanel>
        </PanelBody>

        <PanelBody
          title={__("Google Maps API key", "skt-blocks")}
          initialOpen={false}
          className="components-responsive-block-settings-sidebar"
        >
          <p>
            {__(
              "Add a Google Maps API key. Updating this API key will set all your maps to use the new key.",
              "skt-blocks"
            )}
          </p>
          {apiKey === "" && (
            <p>
              <ExternalLink href={GET_KEY_URL}>
                {__("Get a key", "skt-blocks")}
              </ExternalLink>
              |&nbsp;
              <ExternalLink href={HELP_URL}>
                {__("Need help?", "skt-blocks")}
              </ExternalLink>
            </p>
          )}
          <TextControl
            value={this.state.apiKey}
            onChange={(value) => this.setState({ apiKey: value })}
            placeholder={__(
              "Add Google API key…",
              "skt-blocks"
            )}
            onKeyDown={({ keyCode }) => this.handleKeyDown(keyCode)}
            className="components-block-responsive-map-api-key__custom-input"
          />
          <Button
            isPrimary
            isLarge
            onClick={this.updateApiKey}
            disabled={
              this.state.apiKey === "" ||
              this.state.apiKey === this.props.apiKey
            }
          >
            {this.state.apiKey === this.props.apiKey && this.props.apiKey !== ""
              ? __("Saved", "skt-blocks")
              : __("Save", "skt-blocks")}
          </Button>
          {apiKey && (
            <Button
              className="components-block-responsive-map-api-key-remove__button"
              isSecondary
              isLarge
              onClick={this.removeApiKey}
              disabled={
                this.state.apiKey !== this.props.apiKey || !this.state.apiKey
              }
            >
              {__("Remove", "skt-blocks")}
            </Button>
          )}
        </PanelBody>
        <PanelBody
          title={__("Visibility", "skt-blocks")}
          initialOpen={false}
        >
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
            label={__("Hide for Logged In Users", "skt-blocks")}
            checked={!!this.props.attributes.hideLoggedIn}
            onChange={(value) => setAttributes({ hideLoggedIn: value })}
          />
          <ToggleControl
            label={__("Hide for Logged Out Users", "skt-blocks")}
            checked={!!this.props.attributes.hideLoggedOut}
            onChange={(value) => setAttributes({ hideLoggedOut: value })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
