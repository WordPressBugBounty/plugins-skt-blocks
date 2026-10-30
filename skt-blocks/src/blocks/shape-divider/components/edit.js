/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import Controls from "./controls";
import Inspector from "./inspector";
import applyWithColors from "./colors";
import { getDividerFromStyle } from "./utils";
import InlineColorPicker from "../../../utils/components/inline-color-picker";
import generateBackgroundImageEffect from "../../../generateBackgroundImageEffect";

/**
 * WordPress dependencies
 */
import { Component, Fragment } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { ResizableBox } from "@wordpress/components";

/**
 * Block edit function
 */
class Edit extends Component {
  constructor() {
    super(...arguments);

    this.saveMeta = this.saveMeta.bind(this);
    this.getBrowserWidth = this.getBrowserWidth.bind(this);

    this.state = {
      resizing: false,
      resizingAlt: false,
      innerWidth: this.getBrowserWidth(),
    };
  }

  componentDidMount() {
    this.getBrowserWidth();
    window.addEventListener("resize", this.getBrowserWidth.bind(this));

    // Adjust the margins of the adjacent blocks when this divider is first
    // added. This must run AFTER mount (not during render): updating sibling
    // blocks' attributes while this block is rendering throws in React 18 /
    // modern WordPress ("Cannot update a component while rendering a
    // different component"), which shows the block error box in the editor.
    const { clientId, attributes, setAttributes } = this.props;

    if (attributes.justAdded) {
      const prevBlockClientId = wp.data
        .select("core/block-editor")
        .getPreviousBlockClientId(clientId);
      const nextBlockClientId = wp.data
        .select("core/block-editor")
        .getNextBlockClientId(clientId);

      if (prevBlockClientId) {
        wp.data
          .dispatch("core/block-editor")
          .updateBlockAttributes(prevBlockClientId, {
            noBottomMargin: true,
            marginBottom: 0,
            marginBottomTablet: 0,
            marginBottomMobile: 0,
          });
      }

      if (nextBlockClientId) {
        wp.data
          .dispatch("core/block-editor")
          .updateBlockAttributes(nextBlockClientId, {
            noTopMargin: true,
            marginTop: 0,
            marginTopTablet: 0,
            marginTopMobile: 0,
          });
      }

      setAttributes({ justAdded: false });
    }
  }

  UNSAFE_componentWillMount() {
    // eslint-disable-line camelcase
    this.getBrowserWidth();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getBrowserWidth.bind(this));
  }

  getBrowserWidth() {
    this.setState({ innerWidth: window.innerWidth });
    return window.innerWidth;
  }

  saveMeta(type) {
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
        height: block.attributes[type],
        heightTablet: block.attributes[type + "Tablet"],
        heightMobile: block.attributes[type + "Mobile"],
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
        dimensions[id][type] = {};
      } else if (typeof dimensions[id][type] === "undefined") {
        dimensions[id][type] = {};
      }

      dimensions[id][type] = height;

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
      clientId,
      attributes,
      className,
      isSelected,
      setAttributes,
      backgroundColor,
    } = this.props;

    const {
      skt_blocks,
      shapeHeight,
      shapeHeightTablet,
      shapeHeightMobile,
      backgroundHeight,
      backgroundHeightTablet,
      backgroundHeightMobile,
      verticalFlip,
      horizontalFlip,
      hideDesktop,
      hideTablet,
      hideMobile,
      backgroundColor1,
      backgroundColor2,
      colorLocation1,
      colorLocation2,
      gradientDirection,
      backgroundType,
      align,
      customColor,
      customBackgroundColor,
    } = attributes;

    let shapeHeightResizer = {
      target: "shapeHeight",
      value: shapeHeight,
    };

    let backgroundHeightResizer = {
      target: "backgroundHeight",
      value: backgroundHeight,
    };

    if (this.state.innerWidth <= 768 && this.state.innerWidth > 514) {
      shapeHeightResizer = {
        target: "shapeHeightTablet",
        value: shapeHeightTablet ? shapeHeightTablet : shapeHeight,
      };

      backgroundHeightResizer = {
        target: "backgroundHeightTablet",
        value: backgroundHeightTablet
          ? backgroundHeightTablet
          : backgroundHeight,
      };
    } else if (this.state.innerWidth <= 514) {
      shapeHeightResizer = {
        target: "shapeHeightMobile",
        value: shapeHeightMobile ? shapeHeightMobile : shapeHeight,
      };

      backgroundHeightResizer = {
        target: "backgroundHeightMobile",
        value: backgroundHeightMobile
          ? backgroundHeightMobile
          : backgroundHeight,
      };
    }

    let classes = classnames(className, {
      "is-vertically-flipped": verticalFlip,
      "is-horizontally-flipped": horizontalFlip,
      "skt-hide-desktop": hideDesktop,
      "skt-hide-tablet": hideTablet,
      "skt-hide-mobile": hideMobile,
      "has-shape-height-tablet": !!shapeHeightTablet,
      "has-shape-height-mobile": !!shapeHeightMobile,
      "has-bg-height-tablet": !!backgroundHeightTablet,
      "has-bg-height-mobile": !!backgroundHeightMobile,
    });

    if (
      skt_blocks &&
      typeof skt_blocks.id !== "undefined"
    ) {
      classes = classnames(
        classes,
        `skt-blocks-shape-divider-${skt_blocks.id}`,
        `align${align}`
      );
    }

    return (
      <Fragment>
        {isSelected && <Inspector {...this.props} />}
        {isSelected && <Controls {...this.props} />}
        <div
          className={classes}
          style={{
            "--skt-sd-shape-tablet": shapeHeightTablet
              ? shapeHeightTablet + "px"
              : undefined,
            "--skt-sd-shape-mobile": shapeHeightMobile
              ? shapeHeightMobile + "px"
              : undefined,
            "--skt-sd-bg-tablet": backgroundHeightTablet
              ? backgroundHeightTablet + "px"
              : undefined,
            "--skt-sd-bg-mobile": backgroundHeightMobile
              ? backgroundHeightMobile + "px"
              : undefined,
            color: this.props.color.color || customColor,
            backgroundColor:
              backgroundType == "color"
                ? backgroundColor.color || customBackgroundColor
                : null,
            backgroundImage:
              backgroundType == "gradient"
                ? generateBackgroundImageEffect(
                    backgroundColor1,
                    backgroundColor2,
                    gradientDirection,
                    colorLocation1,
                    colorLocation2
                  )
                : undefined,
          }}
        >
          <div
            className={classnames(
              "wp-block-skt-blocks-shape-divider__svg-wrapper",
              {
                "is-selected": isSelected,
              }
            )}
            style={{
              position: "relative",
              minHeight: shapeHeightResizer.value
                ? shapeHeightResizer.value + "px"
                : undefined,
              height: shapeHeightResizer.value
                ? shapeHeightResizer.value + "px"
                : undefined,
            }}
          >
            {getDividerFromStyle(className)}
          </div>
          <div
            className={classnames(
              "wp-block-skt-blocks-shape-divider__alt-wrapper",
              {
                "is-selected": isSelected,
              }
            )}
            style={{
              position: "relative",
              minHeight: backgroundHeightResizer.value
                ? backgroundHeightResizer.value + "px"
                : undefined,
              height: backgroundHeightResizer.value
                ? backgroundHeightResizer.value + "px"
                : undefined,
            }}
          >
            {isSelected && (
              <InlineColorPicker
                value={this.props.color.color || customColor}
                onChange={(color) =>
                  setAttributes({ color: null, customColor: color })
                }
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default compose([applyWithColors])(Edit);