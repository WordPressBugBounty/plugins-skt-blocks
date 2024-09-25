/**
 * Internal dependencies
 */
import Googlemap from "./googlemap";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

export default class Save extends Component {
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
    const { address, zoom, height } = this.props.attributes;

    return (
      <Googlemap {...this.props}>
        {
          <iframe
            title={__("Google map", "skt-blocks")}
            frameBorder="0"
            style={{ width: "100%", minHeight: height ? height : 400 }}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              address
            )}&output=embed&z=${zoom}`}
          />
        }
      </Googlemap>
    );
  }
}
