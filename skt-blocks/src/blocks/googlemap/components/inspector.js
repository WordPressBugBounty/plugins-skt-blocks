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
          <BaseControl
            label={__("Height in pixels", "skt-blocks")}
            id="map-height-control"
          >
            <input
              type="number"
              aria-label={__(
                "Height for the map in pixels",
                "skt-blocks"
              )}
              onChange={(event) =>
                setAttributes({ height: parseInt(event.target.value, 10) })
              }
              value={height}
              min={200}
              step={10}
            />
          </BaseControl>
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
      </InspectorControls>
    );
  }
}
