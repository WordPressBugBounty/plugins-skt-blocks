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
const { withSelect } = wp.data;

class Edit extends Component {
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
      attributes: { address, zoom, height, heightTablet, heightMobile, pinned },
      setAttributes,
      isSelected,
    } = this.props;

    // Resolve the height for the editor's current preview device. Tablet/Mobile
    // inherit the next larger value when unset, mirroring the frontend @media CSS.
    const dt = this.props.deviceType;
    let sktEffHeight = height ? height : 400;
    if (dt === "Tablet") {
      sktEffHeight = heightTablet ? heightTablet : sktEffHeight;
    } else if (dt === "Mobile") {
      sktEffHeight = heightMobile
        ? heightMobile
        : heightTablet
        ? heightTablet
        : sktEffHeight;
    }

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
                height: sktEffHeight,
                position: "absolute",
              }}
            />
            <div className="iframe__overflow-wrapper">
              <iframe
                title={__("Google Map", "skt-blocks")}
                frameBorder="0"
                style={{ width: "100%", minHeight: sktEffHeight }}
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

export default withSelect((select) => {
  let deviceType = null;
  const editPost = select("core/edit-post");
  if (editPost && editPost.__experimentalGetPreviewDeviceType) {
    deviceType = editPost.__experimentalGetPreviewDeviceType();
  } else {
    const editor = select("core/editor");
    if (editor && editor.getDeviceType) {
      deviceType = editor.getDeviceType();
    }
  }
  return { deviceType };
})(Edit);
