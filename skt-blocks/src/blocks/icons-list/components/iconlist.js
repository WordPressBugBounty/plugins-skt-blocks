/**
 * Icons Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from "classnames";

/**
 * Create a Button wrapper Component
 */
export default class IconList extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        align,
        icon_count,
        icons,
        gap,
        inner_gap,
        icon_layout,
        iconPosition,
        size,
        hideLabel,
        borderRadius,
        bgSize,
        border,
        fontSize,
        maincounterId,
      },
      setAttributes,
    } = this.props;

    const labelClass = hideLabel
      ? "skt-blocks-icon-list__no-label"
      : "";

    return (
      <div
        className={classnames(
          this.props.className,
          icon_layout,
          "skt-blocks-icon-list__outer-wrap",
          `skt-blocks-icon-list__layout-${icon_layout}`,
          labelClass,
          iconPosition == "top"
            ? "skt-blocks-icon-list__icon-at-top"
            : "",
          `skt-blocks-${this.props.clientId}`
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
