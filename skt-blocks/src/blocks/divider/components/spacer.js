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
    } = this.props.attributes;

    return (
      <div
        style={{
          color: spacerDividerColor,
        }}
        className={classnames(
          this.props.className,
          "skt-blocks-block-spacer",
          spacerDividerStyle,
          { "skt-blocks-spacer-divider": true }
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
