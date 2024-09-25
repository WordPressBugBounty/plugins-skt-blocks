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
export default class IconList extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        label,
        image_icon,
        icon,
        image,
        icon_color,
        label_color,
        icon_hover_color,
        label_hover_color,
        icon_bg_color,
        icon_bg_hover_color,
        icon_border_color,
        icon_border_hover_color,
        link,
        target,
        disableLink,
        hideLabel,
      },
      setAttributes,
    } = this.props;
    return (
      <div
        className={classnames(
          this.props.className,
          "skt-blocks-icon-list-repeater",
          "skt-blocks-icon-list__wrapper",
          `skt-blocks-${this.props.clientId}`
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
