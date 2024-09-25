/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import icons from "./icons";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { withInstanceId } from "@wordpress/compose";
import { Component, Fragment } from "@wordpress/element";
import { BaseControl, TabPanel } from "@wordpress/components";

class ResponsiveBaseControl extends Component {
  constructor() {
    super(...arguments);

    this.saveMeta = this.saveMeta.bind(this);
  }

  saveMeta() {
    const meta = wp.data.select("core/editor").getEditedPostAttribute("meta");
    const block = wp.data
      .select("core/block-editor")
      .getBlock(this.props.clientId);
    let dimensions = {};

    if (
      typeof this.props.attributes.skt_blocks !==
        "undefined" &&
      typeof this.props.attributes.skt_blocks.id !==
        "undefined"
    ) {
      const id =
        this.props.name.split("/").join("-") +
        "-" +
        this.props.attributes.skt_blocks.id;
      const height = {
        height: block.attributes[this.props.type],
        heightTablet: block.attributes[this.props.type + "Tablet"],
        heightMobile: block.attributes[this.props.type + "Mobile"],
      };

      if (
        typeof meta._skt_blocks_responsive_height ===
          "undefined" ||
        (typeof meta._skt_blocks_responsive_height !==
          "undefined" &&
          meta._skt_blocks_responsive_height === "")
      ) {
        dimensions = {};
      } else {
        dimensions = JSON.parse(
          meta._skt_blocks_responsive_height
        );
      }

      if (typeof dimensions[id] === "undefined") {
        dimensions[id] = {};
        dimensions[id][this.props.type] = {};
      } else if (typeof dimensions[id][this.props.type] === "undefined") {
        dimensions[id][this.props.type] = {};
      }

      dimensions[id][this.props.type] = height;

      // Save values to metadata.
      wp.data.dispatch("core/editor").editPost({
        meta: {
          _skt_blocks_responsive_height: JSON.stringify(
            dimensions
          ),
        },
      });
    }
  }

  render() {
    const {
      label = __("Height", "skt-blocks"),
      height,
      heightTablet,
      heightMobile,
      onChange,
      onChangeTablet,
      onChangeMobile,
      min = 10,
      max = 1000,
      step = 1,
    } = this.props;

    const onSelect = (tabName) => {
      let selected = "desktop";

      switch (tabName) {
        case "desktop":
          selected = "tablet";
          break;
        case "tablet":
          selected = "mobile";
          break;
        case "mobile":
          selected = "desktop";
          break;
        default:
          break;
      }

      //Reset z-index
      const buttons = document.getElementsByClassName(
        `components-skt-blocks-dimensions-control__mobile-controls-item--${this.props.type}`
      );

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
      }
      if (tabName === "default") {
        const button = document.getElementsByClassName(
          `components-skt-blocks-dimensions-control__mobile-controls-item-${this.props.type}--tablet`
        );
        button[0].click();
      } else {
        const button = document.getElementsByClassName(
          `components-skt-blocks-dimensions-control__mobile-controls-item-${this.props.type}--${selected}`
        );
        button[0].style.display = "block";
      }
    };

    const classes = classnames(
      "components-base-control",
      "components-skt-blocks-dimensions-control",
      "components-skt-blocks-responsive-base-control",
      {}
    );

    return (
      <Fragment>
        <div className={classes}>
          <Fragment>
            <span className="components-base-control__label">{label}</span>
            <TabPanel
              className="components-skt-blocks-dimensions-control__mobile-controls"
              activeClass="is-active"
              initialTabName="default"
              onSelect={onSelect}
              tabs={[
                {
                  name: "default",
                  title: icons.desktopChrome,
                  className: `is-secondary components-skt-blocks-dimensions-control__mobile-controls-item components-skt-blocks-dimensions-control__mobile-controls-item--${this.props.type} components-button is-button is-default components-skt-blocks-dimensions-control__mobile-controls-item--default components-skt-blocks-dimensions-control__mobile-controls-item-${this.props.type}--default`,
                },
                {
                  name: "desktop",
                  title: icons.mobile,
                  className: `is-secondary components-skt-blocks-dimensions-control__mobile-controls-item components-skt-blocks-dimensions-control__mobile-controls-item--${this.props.type} components-button is-button is-default components-skt-blocks-dimensions-control__mobile-controls-item--desktop components-skt-blocks-dimensions-control__mobile-controls-item-${this.props.type}--desktop`,
                },
                {
                  name: "tablet",
                  title: icons.desktopChrome,
                  className: `is-secondary components-skt-blocks-dimensions-control__mobile-controls-item components-skt-blocks-dimensions-control__mobile-controls-item--${this.props.type} components-button is-button is-default components-skt-blocks-dimensions-control__mobile-controls-item--tablet components-skt-blocks-dimensions-control__mobile-controls-item-${this.props.type}--tablet`,
                },
                {
                  name: "mobile",
                  title: icons.tablet,
                  className: `is-secondary components-skt-blocks-dimensions-control__mobile-controls-item components-skt-blocks-dimensions-control__mobile-controls-item--${this.props.type} components-button is-button is-default components-skt-blocks-dimensions-control__mobile-controls-item--mobile components-skt-blocks-dimensions-control__mobile-controls-item-${this.props.type}--mobile`,
                },
              ]}
            >
              {(tab) => {
                if ("mobile" === tab.name) {
                  return (
                    <Fragment>
                      <div className="components-skt-blocks-dimensions-control__inputs component-skt-blocks-is-mobile">
                        <BaseControl>
                          <input
                            type="number"
                            onChange={(newValue) => {
                              onChangeMobile(newValue);
                              this.saveMeta();
                            }}
                            value={heightMobile ? heightMobile : ""}
                            min={min}
                            step={step}
                            max={max}
                          />
                        </BaseControl>
                      </div>
                    </Fragment>
                  );
                } else if ("tablet" === tab.name) {
                  return (
                    <Fragment>
                      <div className="components-skt-blocks-dimensions-control__inputs component-skt-blocks-is-tablet">
                        <BaseControl>
                          <input
                            type="number"
                            onChange={(newValue) => {
                              onChangeTablet(newValue);
                              this.saveMeta();
                            }}
                            value={heightTablet ? heightTablet : ""}
                            min={min}
                            step={step}
                            max={max}
                          />
                        </BaseControl>
                      </div>
                    </Fragment>
                  );
                }
                return (
                  <Fragment>
                    <div className="components-skt-blocks-dimensions-control__inputs component-skt-blocks-is-desktop">
                      <BaseControl>
                        <input
                          type="number"
                          onChange={(newValue) => {
                            onChange(newValue);
                            this.saveMeta();
                          }}
                          value={height ? height : ""}
                          min={min}
                          step={step}
                          max={max}
                        />
                      </BaseControl>
                    </div>
                  </Fragment>
                );
              }}
            </TabPanel>
          </Fragment>
        </div>
      </Fragment>
    );
  }
}

export default withInstanceId(ResponsiveBaseControl);
