/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Googlemap from "./googlemap";
import Controls from "./controls";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Button, Placeholder } = wp.components;
const { ENTER } = wp.keycodes;

export default class Edit extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      apiKey: "",
      address: this.props.attributes.address,
      coords: null,
      hasError: false,
      isSavedKey: false,
      keySaved: false,
    };
  }

  render() {
    // Setup the attributes
    const {
      attributes: { address, zoom, height, pinned },
      setAttributes,
      isSelected,
    } = this.props;

    const renderMap = (event) => {
      if (event) {
        event.preventDefault();
      }
      setAttributes({ address: this.state.address, pinned: true });
    };

    const handleKeyDown = (keyCode) => {
      if (keyCode !== ENTER) {
        return;
      }

      renderMap();
    };

    return [
      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,

      // Show the block markup in the editor
      <Googlemap {...this.props}>
        {isSelected && <Controls {...this.props} apiKey={this.state.apiKey} />}
        {pinned ? (
          <Fragment>
            <div
              style={{
                width: "100%",
                height: height ? height : 400,
                position: "absolute",
              }}
            />
            <div className="iframe__overflow-wrapper">
              <iframe
                title={__("Google Map", "skt-blocks")}
                frameBorder="0"
                style={{ width: "100%", minHeight: height ? height : 400 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  address
                )}&output=embed&z=${zoom}`}
              />
            </div>
          </Fragment>
        ) : (
          <Placeholder
            label={__("Google map", "skt-blocks")}
            instructions={__(
              "Enter a location or address to drop a pin on a Google map.",
              "skt-blocks"
            )}
          >
            <form onSubmit={renderMap}>
              <input
                type="text"
                defaultValue={this.state.address || ""}
                className="components-placeholder__input"
                placeholder={__(
                  "Search for a place or address…",
                  "skt-blocks"
                )}
                onChange={(nextAddress) =>
                  this.setState({ address: nextAddress.target.value })
                }
                onKeyDown={({ keyCode }) => handleKeyDown(keyCode)}
              />
              <Button
                isLarge
                isSecondary
                type="submit"
                disabled={!this.state.address}
              >
                {__("Apply", "skt-blocks")}
              </Button>
            </form>
          </Placeholder>
        )}
      </Googlemap>,
    ];
  }
}
