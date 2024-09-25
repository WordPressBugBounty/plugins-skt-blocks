/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  BaseControl,
  TabPanel,
  Dashicon,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
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
        gap,
        stack,
      },
      setAttributes,
    } = this.props;

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "skt-blocks")}
          initialOpen={true}
        >
          <TabPanel
            className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
            activeClass="active-tab"
            tabs={[
              {
                name: "desktop",
                title: <Dashicon icon="desktop" />,
                className:
                  " responsive-desktop-tab  responsive-responsive-tabs",
              },
              {
                name: "tablet",
                title: <Dashicon icon="tablet" />,
                className: " responsive-tablet-tab  responsive-responsive-tabs",
              },
              {
                name: "mobile",
                title: <Dashicon icon="smartphone" />,
                className: " responsive-mobile-tab  responsive-responsive-tabs",
              },
            ]}
          >
            {(tab) => {
              let tabout;

              if ("mobile" === tab.name) {
                tabout = (
                  <Fragment>
                    <BaseControl>
                      <p>
                        {__(
                          "Alignment Mobile",
                          "skt-blocks"
                        )}
                      </p>
                      <AlignmentToolbar
                        value={buttonAlignmentMobile}
                        onChange={(value) =>
                          setAttributes({
                            buttonAlignmentMobile: value,
                          })
                        }
                        controls={["left", "center", "right", "full"]}
                        isCollapsed={false}
                      />
                    </BaseControl>
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <BaseControl>
                      <p>
                        {__(
                          "Alignment Tablet",
                          "skt-blocks"
                        )}
                      </p>
                      <AlignmentToolbar
                        value={buttonAlignmentTablet}
                        onChange={(value) =>
                          setAttributes({
                            buttonAlignmentTablet: value,
                          })
                        }
                        controls={["left", "center", "right", "full"]}
                        isCollapsed={false}
                      />
                    </BaseControl>
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <BaseControl>
                      <p>{__("Alignment", "skt-blocks")}</p>
                      <AlignmentToolbar
                        value={buttonAlignment}
                        onChange={(value) =>
                          setAttributes({
                            buttonAlignment: value,
                          })
                        }
                        controls={["left", "center", "right", "full"]}
                        isCollapsed={false}
                      />
                    </BaseControl>
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
          <hr className="skt-blocks-editor__separator" />
          <SelectControl
            label={__("Stack on")}
            value={stack}
            options={[
              { value: "none", label: __("None") },
              { value: "desktop", label: __("Desktop") },
              { value: "tablet", label: __("Tablet") },
              { value: "mobile", label: __("Mobile") },
            ]}
            onChange={(value) => setAttributes({ stack: value })}
            help={__(
              "Note: Choose breakpoint on which the buttons will stack."
            )}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
