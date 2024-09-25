/**
 * Buttons Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from "classnames";

/**
 * Create a Button wrapper Component
 */
export default class Buttons extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        label,
        link,
        borderWidth,
        borderRadius,
        borderStyle,
        borderColor,
        borderHColor,
        color,
        background,
      },
      setAttributes,
    } = this.props;

    return (
      <div
        className={classnames(
          this.props.className,
          `skt-blocks-${this.props.clientId}`,
          "skt-blocks-block-button",
          "skt-blocks-buttons__outer-wrap"
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
