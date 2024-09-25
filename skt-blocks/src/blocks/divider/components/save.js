/**
 * Internal dependencies
 */
import classnames from "classnames";
import Spacer from "./spacer";
import appendImportant from "./appendImportant";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.editor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      spacerHeight,
      spacerDividerColor,
      spacerDividerHeight,
      spacerDividerWidth,
      spacerDividerStyle,
      spacerDividerAlignment,
    } = this.props.attributes;

    // Save the block markup for the front end
    return (
      <Spacer {...this.props}>
        <div className="skt-blocks-divider-inner">
          <div
            className="skt-blocks-divider-content"
            style={{
              marginTop: spacerHeight,
              marginBottom: spacerHeight,
            }}
          >
            <hr
              style={{
                height: spacerDividerHeight
                  ? spacerDividerHeight + "px"
                  : undefined,
                width: spacerDividerWidth
                  ? spacerDividerWidth + "%"
                  : undefined,
                backgroundColor: appendImportant(spacerDividerColor),
                borderRadius:
                  spacerDividerStyle === "basic" ? 0 : spacerDividerHeight / 2,
                marginLeft: spacerDividerAlignment === "left" ? 0 : "auto",
                marginRight: spacerDividerAlignment === "right" ? 0 : "auto",
              }}
            />
            {(spacerDividerStyle === "dots" ||
              spacerDividerStyle === "asterisks") && (
              <div
                className="rgbl-divider__dots"
                style={{
                  width: spacerDividerWidth + "%",
                  marginLeft: spacerDividerAlignment === "left" ? 0 : "auto",
                  marginRight: spacerDividerAlignment === "right" ? 0 : "auto",
                }}
                aria-hidden="true"
              >
                <div
                  className="rgbl-divider__dot"
                  style={{
                    height: spacerDividerHeight,
                    backgroundColor: spacerDividerColor,
                    fontSize: spacerDividerHeight * 1.8,
                    width: spacerDividerHeight,
                  }}
                ></div>
                <div
                  className="rgbl-divider__dot"
                  style={{
                    height: spacerDividerHeight,
                    backgroundColor: spacerDividerColor,
                    fontSize: spacerDividerHeight * 1.8,
                    width: spacerDividerHeight,
                  }}
                ></div>
                <div
                  className="rgbl-divider__dot"
                  style={{
                    height: spacerDividerHeight,
                    backgroundColor: spacerDividerColor,
                    fontSize: spacerDividerHeight * 1.8,
                    width: spacerDividerHeight,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </Spacer>
    );
  }
}
