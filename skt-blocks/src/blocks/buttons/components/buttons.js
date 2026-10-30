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
        buttonAlignment,
        buttonAlignmentTablet,
        buttonAlignmentMobile,
        buttons,
        stack,
        hideDesktop,
        hideTablet,
        hideMobile,
      },
      setAttributes,
    } = this.props;
    return (
      <div
        className={classnames(
          this.props.className,
          buttonAlignment,
          `tabletAlign${buttonAlignmentTablet}`,
          `mobileAlign${buttonAlignmentMobile}`,
          "skt-blocks-block-button",
          "skt-blocks-buttons__outer-wrap",
          `skt-blocks-buttons-stack-${stack}`,
          {
            "skt-hide-desktop": hideDesktop,
            "skt-hide-tablet": hideTablet,
            "skt-hide-mobile": hideMobile,
          }
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
