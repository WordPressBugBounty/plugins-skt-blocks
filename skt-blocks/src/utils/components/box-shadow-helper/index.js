import { camelCase } from "lodash";

/**
 * Box-Shadow reusable component.
 *
 */
const { __ } = wp.i18n;

const { ColorPalette } = wp.blockEditor;

const { Button, SelectControl, RangeControl, Dashicon } = wp.components;

// Extend component
const { Component, Fragment } = wp.element;

class BoxShadowControl extends Component {
  constructor() {
    super(...arguments);
    this.onAdvancedControlClick = this.onAdvancedControlClick.bind(this);
    this.onAdvancedControlReset = this.onAdvancedControlReset.bind(this);
  }
  onAdvancedControlClick() {
    let control = true;
    let label = __("Hide Advanced");

    if (this.state !== null && this.state.showAdvancedControls === true) {
      control = false;
      label = __("Advanced");
    }

    this.setState({
      showAdvancedControls: control,
      showAdvancedControlsLabel: label,
    });
  }
    onAdvancedControlReset() {
        const { setAttributes,attrNameTemplate } = this.props;
        const getAttrName = (attrName) =>
            camelCase(sprintf(this.props.attrNameTemplate, attrName));
        setAttributes({
            [getAttrName("boxShadowColor")]: "",
        });
        setAttributes({
            [getAttrName("boxShadowHOffset")]: 0,
        });
        setAttributes({
            [getAttrName("boxShadowVOffset")]: 0,
        });
        setAttributes({
            [getAttrName("boxShadowBlur")]: 0,
        });
        setAttributes({
            [getAttrName("boxShadowSpread")]: 0,
        });
        setAttributes({
            [getAttrName("boxShadowPosition")]: "",
        });
        this.setState({
            showAdvancedControls: false,
        });
    }
  render() {
    const {
      setAttributes,
      boxShadowColor,
      boxShadowHOffset,
      boxShadowVOffset,
      boxShadowBlur,
      boxShadowSpread,
      boxShadowPosition,
    } = this.props;

    const getAttrName = (attrName) =>
      camelCase(sprintf(this.props.attrNameTemplate, attrName));

    var advancedControls;
    var boxShadowAdvancedControls;
    var resetBoxShadowAdvancedControls;
    if (this.state !== null && true === this.state.showAdvancedControls) {
      advancedControls = (
        <div className="skt-blocks-box-shadow-advanced">
          <Fragment>
            <p className="skt-blocks-setting-label">
              {__("Color")}

              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{
                    backgroundColor:
                        boxShadowColor.value,
                  }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={setAttributes[getAttrName("boxShadowColor")]}
              onChange={(colorValue) =>
                setAttributes({
                  [getAttrName("boxShadowColor")]:
                    colorValue !== undefined ? colorValue : "#cccccc",
                })
              }
              allowReset
            />
          </Fragment>
          <Fragment>
            <h2>{__("Horizontal")}</h2>
            <RangeControl
              value={setAttributes[getAttrName("boxShadowHOffset")]}
              onChange={(value) =>
                setAttributes({
                  [getAttrName("boxShadowHOffset")]:
                    value !== undefined ? value : 0,
                })
              }
              min={-100}
              max={100}
              allowReset
            />
          </Fragment>
          <Fragment>
            <h2>{__("Vertical")}</h2>
            <RangeControl
              value={setAttributes[getAttrName("boxShadowVOffset")]}
              onChange={(value) =>
                setAttributes({
                  [getAttrName("boxShadowVOffset")]:
                    value !== undefined ? value : 0,
                })
              }
              min={-100}
              max={100}
              allowReset
            />
          </Fragment>
          <Fragment>
            <h2>{__("Blur")}</h2>
            <RangeControl
              value={setAttributes[getAttrName("boxShadowBlur")]}
              onChange={(value) =>
                setAttributes({
                  [getAttrName("boxShadowBlur")]:
                    value !== undefined ? value : 6,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </Fragment>
          <Fragment>
            <h2>{__("Spread")}</h2>
            <RangeControl
              value={setAttributes[getAttrName("boxShadowSpread")]}
              onChange={(value) =>
                setAttributes({
                  [getAttrName("boxShadowSpread")]:
                    value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </Fragment>
          <Fragment>
            <SelectControl
              label={__("Position")}
              value={setAttributes[getAttrName("boxShadowPosition")]}
              onChange={(value) =>
                setAttributes({ [getAttrName("boxShadowPosition")]: value })
              }
              options={[
                { value: "outset", label: __("Outset") },
                { value: "inset", label: __("Inset") },
              ]}
            />
          </Fragment>
        </div>
      );
    }
    resetBoxShadowAdvancedControls = (
      <Button
        className="skt-blocks-size-btn skt-blocks-typography-reset-btn"
        isSmall
        aria-pressed={this.state !== null}
        onClick={this.onAdvancedControlReset}
      >
        <Dashicon icon="image-rotate" />
      </Button>
    );

    boxShadowAdvancedControls = (
      <Button
        className="skt-blocks-size-btn skt-blocks-typography-control-btn"
        isSmall
        aria-pressed={this.state !== null}
        onClick={this.onAdvancedControlClick}
      >
        <Dashicon icon="admin-tools" />
      </Button>
    );

    return (
      <div className="res-typography-option-actions">
        <span>{this.props.label}</span>
        {boxShadowAdvancedControls}
        {resetBoxShadowAdvancedControls}
        {advancedControls}
      </div>
    );
  }
}

export default BoxShadowControl;
