import fontOptions from "../../../utils/googlefonts";
import BoxShadowControl from "../../../utils/components/box-shadow";
import BoxShadowControlHelper from "../../../utils/components/box-shadow-helper";

/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import compact from "lodash/compact";
import map from "lodash/map";
import { loadGoogleFont } from "../../../utils/font";

// Import block components
const { InspectorControls, ColorPalette } = wp.blockEditor;

// Import Inspector components
const {
  PanelBody,
  QueryControls,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
  TabPanel,
  Dashicon,
} = wp.components;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor() {
    super(...arguments);
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.stillMounted = true;
    this.fetchRequest = apiFetch({
      path: addQueryArgs("/wp/v2/categories", { per_page: -1 }),
    })
      .then((categoriesList) => {
        if (this.stillMounted) {
          this.setState({ categoriesList });
        }
      })
      .catch(() => {
        if (this.stillMounted) {
          this.setState({ categoriesList: [] });
        }
      });
  }

  componentWillUnmount() {
    this.stillMounted = false;
  }

  /* Get the available image sizes */
  imageSizeSelect() {
    const getSettings = wp.data.select("core/editor").getEditorSettings();

    return compact(
      map(getSettings.imageSizes, ({ name, slug }) => {
        return {
          value: slug,
          label: name,
        };
      })
    );
  }

  render() {
    // Setup the attributes
    const { attributes, setAttributes, latestPosts } = this.props;

    const { order, orderBy } = attributes;

    const { categoriesList } = this.state;

    const fontWeightOptions = [
      {
        value: "100",
        label: __("100", "skt-blocks"),
      },
      {
        value: "200",
        label: __("200", "skt-blocks"),
      },
      {
        value: "300",
        label: __("300", "skt-blocks"),
      },
      {
        value: "400",
        label: __("400", "skt-blocks"),
      },
      {
        value: "500",
        label: __("500", "skt-blocks"),
      },
      {
        value: "600",
        label: __("600", "skt-blocks"),
      },
      {
        value: "700",
        label: __("700", "skt-blocks"),
      },
      {
        value: "800",
        label: __("800", "skt-blocks"),
      },
      {
        value: "900",
        label: __("900", "skt-blocks"),
      },
    ];

    const textTransformOptions = [
      {
        value: "",
        label: __("Default", "skt-blocks"),
      },
      {
        value: "uppercase",
        label: __("Uppercase", "skt-blocks"),
      },
      {
        value: "lowercase",
        label: __("Lowercase", "skt-blocks"),
      },
      {
        value: "capitalize",
        label: __("Capitalize", "skt-blocks"),
      },
    ];

    const postTaxonomyOptions = [
      {
        value: "category",
        label: __("Category", "skt-blocks"),
      },
      { value: "tag", label: __("Tag", "skt-blocks") },
    ];

    // Section title tags
    const sectionTags = [
      { value: "div", label: __("div", "skt-blocks") },
      {
        value: "header",
        label: __("header", "skt-blocks"),
      },
      {
        value: "section",
        label: __("section", "skt-blocks"),
      },
      {
        value: "article",
        label: __("article", "skt-blocks"),
      },
      { value: "main", label: __("main", "skt-blocks") },
      { value: "aside", label: __("aside", "skt-blocks") },
      {
        value: "footer",
        label: __("footer", "skt-blocks"),
      },
    ];

    // Section title tags
    const sectionTitleTags = [
      { value: "h2", label: __("H2", "skt-blocks") },
      { value: "h3", label: __("H3", "skt-blocks") },
      { value: "h4", label: __("H4", "skt-blocks") },
      { value: "h5", label: __("H5", "skt-blocks") },
      { value: "h6", label: __("H6", "skt-blocks") },
    ];

    // Check for posts
    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;

    // Check the post type
    const isPost = "post" === attributes.postType;

    // Add instruction text to the select
    const abImageSizeSelect = {
      value: "selectimage",
      label: __("Select image size"),
    };

    // Get the image size options
    const imageSizeOptions = this.imageSizeSelect();

    imageSizeOptions.unshift(abImageSizeSelect);

    const imageSizeValue = () => {
      for (let i = 0; i < imageSizeOptions.length; i++) {
        if (imageSizeOptions[i].value === attributes.imageSize) {
          return attributes.imageSize;
        }
      }
      return "full";
    };

    return (
      <InspectorControls>
        <PanelBody
          title={__(
            "Post and Page Grid Settings",
            "skt-blocks"
          )}
          initialOpen={false}
          className={
            isPost ? null : "skt-blocks-hide-query"
          }
        >
          <QueryControls
            {...{ order, orderBy }}
            numberOfItems={attributes.postsToShow}
            onNumberOfItemsChange={(value) =>
              setAttributes({ postsToShow: value })
            }
          />
          <SelectControl
            label={__("Order By")}
            value={attributes.orderBy}
            onChange={(value) => setAttributes({ orderBy: value })}
            options={[
              { value: "date", label: __("Date") },
              { value: "title", label: __("Title") },
              { value: "rand", label: __("Random") },
              { value: "menu_order", label: __("Menu Order") },
            ]}
          />
          <SelectControl
            label={__("Order")}
            value={attributes.order}
            onChange={(value) => setAttributes({ order: value })}
            options={[
              { value: "desc", label: __("Descending") },
              { value: "asc", label: __("Ascending") },
            ]}
          />
          <RangeControl
            label={__(
              "Number of items to offset",
              "skt-blocks"
            )}
            value={attributes.offset}
            onChange={(value) => setAttributes({ offset: value })}
            min={0}
            max={20}
          />
          {"grid" === attributes.postLayout && (
            <RangeControl
              label={__("Columns", "skt-blocks")}
              value={attributes.columns}
              onChange={(value) => setAttributes({ columns: value })}
              min={1}
              max={
                !hasPosts
                  ? MAX_POSTS_COLUMNS
                  : Math.min(MAX_POSTS_COLUMNS, latestPosts.length)
              }
            />
          )}
          <ToggleControl
            label={__("Equal Height", "skt-blocks")}
            checked={attributes.equalHeight}
            onChange={() =>
              this.props.setAttributes({
                equalHeight: !attributes.equalHeight,
              })
            }
          />
          <ToggleControl
            label={__("Post Pagination", "skt-blocks")}
            checked={attributes.postPagination}
            onChange={() =>
              this.props.setAttributes({
                postPagination: !attributes.postPagination,
                paginationMarkup: "empty",
              })
            }
          />
          <RangeControl
            label={__("Page Limit", "skt-blocks")}
            value={attributes.pageLimit}
            onChange={(value) =>
              setAttributes({
                pageLimit: value,
                paginationMarkup: "empty",
              })
            }
            min={0}
            max={100}
          />
        </PanelBody>
        <PanelBody
          title={__("Pagination", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Pagination Layout", "skt-blocks")}
            options={[
              {
                value: "border",
                label: __("Border", "skt-blocks"),
              },
              {
                value: "filled",
                label: __("Filled", "skt-blocks"),
              },
            ]}
            value={attributes.paginationLayout}
            onChange={(value) =>
              this.props.setAttributes({ paginationLayout: value })
            }
          />
          <SelectControl
            label={__("Pagination Alignment", "skt-blocks")}
            options={[
              {
                value: "left",
                label: __("Left", "skt-blocks"),
              },
              {
                value: "center",
                label: __("Center", "skt-blocks"),
              },
              {
                value: "right",
                label: __("Right", "skt-blocks"),
              },
            ]}
            value={attributes.paginationAlignment}
            onChange={(value) =>
              this.props.setAttributes({ paginationAlignment: value })
            }
          />
          <RangeControl
            label={__("Border Size", "skt-blocks")}
            value={attributes.paginationBorderWidth}
            onChange={(value) =>
              setAttributes({ paginationBorderWidth: value })
            }
            min={0}
            max={150}
          />
          <p className="responsive-setting-label">
            {__("Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: attributes.paginationBorderColor }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.paginationBorderColor}
            onChange={(value) =>
              this.props.setAttributes({
                paginationBorderColor: value,
              })
            }
            allowReset
          />
          <RangeControl
            label={__("Border Radius", "skt-blocks")}
            value={attributes.paginationBorderRadius}
            onChange={(value) =>
              setAttributes({ paginationBorderRadius: value })
            }
            min={0}
            max={150}
          />
          <p className="responsive-setting-label">
            {__("Active Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.paginationActiveBorderColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.paginationActiveBorderColor}
            onChange={(value) =>
              this.props.setAttributes({
                paginationActiveBorderColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Text Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: attributes.paginationTextColor }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.paginationTextColor}
            onChange={(value) =>
              this.props.setAttributes({
                paginationTextColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Active Text Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.paginationTextActiveColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.paginationTextActiveColor}
            onChange={(value) =>
              this.props.setAttributes({
                paginationTextActiveColor: value,
              })
            }
            allowReset
          />
          <RangeControl
            label={__("Spacing", "skt-blocks")}
            value={attributes.paginationSpacing}
            onChange={(value) => setAttributes({ paginationSpacing: value })}
            min={0}
            max={500}
          />
          <TextControl
            label={__("Previous Button Text", "skt-blocks")}
            type="text"
            value={attributes.previousButtonText}
            onChange={(value) =>
              this.props.setAttributes({
                previousButtonText: value,
                paginationMarkup: "empty",
              })
            }
          />
          <TextControl
            label={__("Next Button Text", "skt-blocks")}
            type="text"
            value={attributes.nextButtonText}
            onChange={(value) =>
              this.props.setAttributes({
                nextButtonText: value,
                paginationMarkup: "empty",
              })
            }
          />
        </PanelBody>
        <PanelBody
          title={__(
            "Post and Page Grid Content",
            "skt-blocks"
          )}
          initialOpen={false}
        >
          {"list" === attributes.postLayout && (
            <ToggleControl
              label={__(
                "Stack Image & Content on mobile",
                "skt-blocks"
              )}
              checked={attributes.stackonMobile}
              onChange={() =>
                this.props.setAttributes({
                  stackonMobile: !attributes.stackonMobile,
                })
              }
            />
          )}
          <ToggleControl
            label={__(
              "Display Section Title",
              "skt-blocks"
            )}
            checked={attributes.displaySectionTitle}
            onChange={() =>
              this.props.setAttributes({
                displaySectionTitle: !attributes.displaySectionTitle,
              })
            }
          />
          {attributes.displaySectionTitle && (
            <TextControl
              label={__("Section Title", "skt-blocks")}
              type="text"
              value={attributes.sectionTitle}
              onChange={(value) =>
                this.props.setAttributes({
                  sectionTitle: value,
                })
              }
            />
          )}
          <ToggleControl
            label={__(
              "Display Featured Image",
              "skt-blocks"
            )}
            checked={attributes.displayPostImage}
            onChange={() =>
              this.props.setAttributes({
                displayPostImage: !attributes.displayPostImage,
              })
            }
          />
          {attributes.displayPostImage && [
            <SelectControl
              label={__("Image Size", "skt-blocks")}
              value={imageSizeValue()}
              options={imageSizeOptions}
              onChange={(value) =>
                this.props.setAttributes({
                  imageSize: value,
                })
              }
            />,
            <SelectControl
              label={__("Image Position", "skt-blocks")}
              value={attributes.imagePosition}
              options={[
                {
                  value: "top",
                  label: __("Top", "skt-blocks"),
                },
                {
                  value: "background",
                  label: __("Background", "skt-blocks"),
                },
              ]}
              onChange={(value) =>
                this.props.setAttributes({
                  imagePosition: value,
                })
              }
            />,
            <SelectControl
            label={__("Layout", "skt-blocks")}
            value={attributes.layout}
            options={[
              {
                value: "boxed",
                label: __("Boxed", "skt-blocks"),
              },
              {
                value: "content",
                label: __("Content", "skt-blocks"),
              },
            ]}
            onChange={(value) =>
              this.props.setAttributes({
                layout: value,
              })
            }
            />,
            <RangeControl
              label={__("Image Border Radius")}
              value={attributes.imageBorderRadius}
              onChange={(value) =>
                this.props.setAttributes({
                  imageBorderRadius: value,
                })
              }
              min={0}
              max={100}
            />,
          ]}
          <ToggleControl
            label={__("Display Title", "skt-blocks")}
            checked={attributes.displayPostTitle}
            onChange={() =>
              this.props.setAttributes({
                displayPostTitle: !attributes.displayPostTitle,
              })
            }
          />
          {isPost && (
            <ToggleControl
              label={__("Display Author", "skt-blocks")}
              checked={attributes.displayPostAuthor}
              onChange={() =>
                this.props.setAttributes({
                  displayPostAuthor: !attributes.displayPostAuthor,
                })
              }
            />
          )}
          {isPost && (
            <ToggleControl
              label={__("Display Date", "skt-blocks")}
              checked={attributes.displayPostDate}
              onChange={() =>
                this.props.setAttributes({
                  displayPostDate: !attributes.displayPostDate,
                })
              }
            />
          )}
          <ToggleControl
            label={__("Display Excerpt", "skt-blocks")}
            checked={attributes.displayPostExcerpt}
            onChange={() =>
              this.props.setAttributes({
                displayPostExcerpt: !attributes.displayPostExcerpt,
              })
            }
          />
          {attributes.displayPostExcerpt && (
            <RangeControl
              label={__("Excerpt Length", "skt-blocks")}
              value={attributes.excerptLength}
              onChange={(value) => setAttributes({ excerptLength: value })}
              min={0}
              max={55}
            />
          )}
          <ToggleControl
            label={__(
              "Display Continue Reading Link",
              "skt-blocks"
            )}
            checked={attributes.displayPostLink}
            onChange={() =>
              this.props.setAttributes({
                displayPostLink: !attributes.displayPostLink,
              })
            }
          />
          {attributes.displayPostLink && (
            <TextControl
              label={__(
                "Customize Continue Reading Text",
                "skt-blocks"
              )}
              type="text"
              value={attributes.readMoreText}
              onChange={(value) =>
                this.props.setAttributes({
                  readMoreText: value,
                })
              }
            />
          )}
        </PanelBody>
        <PanelBody
          title={__(
            "Post and Page Grid Markup",
            "skt-blocks"
          )}
          initialOpen={false}
          className="skt-blocks-block-post-grid-markup-settings"
        >
          <SelectControl
            label={__(
              "Post Grid Section Tag",
              "skt-blocks"
            )}
            options={sectionTags}
            value={attributes.sectionTag}
            onChange={(value) =>
              this.props.setAttributes({ sectionTag: value })
            }
            help={__(
              "Change the post grid section tag to match your content hierarchy.",
              "skt-blocks"
            )}
          />
          {attributes.sectionTitle && (
            <SelectControl
              label={__(
                "Section Title Heading Tag",
                "skt-blocks"
              )}
              options={sectionTitleTags}
              value={attributes.sectionTitleTag}
              onChange={(value) =>
                this.props.setAttributes({
                  sectionTitleTag: value,
                })
              }
              help={__(
                "Change the post/page section title tag to match your content hierarchy.",
                "skt-blocks"
              )}
            />
          )}
          {attributes.displayPostTitle && (
            <SelectControl
              label={__(
                "Post Title Heading Tag",
                "skt-blocks"
              )}
              options={sectionTitleTags}
              value={attributes.postTitleTag}
              onChange={(value) =>
                this.props.setAttributes({
                  postTitleTag: value,
                })
              }
              help={__(
                "Change the post/page title tag to match your content hierarchy.",
                "skt-blocks"
              )}
            />
          )}
        </PanelBody>
        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Excerpt", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.excerptFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  excerptFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={attributes.excerptFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  excerptFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.excerptFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  excerptFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.excerptLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  excerptLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={attributes.excerptTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  excerptTextTransform: value,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Meta", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.metaFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  metaFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={attributes.metaFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  metaFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.metaFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  metaFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.metaLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  metaLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={attributes.metaTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  metaTextTransform: value,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Title", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.titleFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  titleFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
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
                  className:
                    " responsive-tablet-tab  responsive-responsive-tabs",
                },
                {
                  name: "mobile",
                  title: <Dashicon icon="smartphone" />,
                  className:
                    " responsive-mobile-tab  responsive-responsive-tabs",
                },
              ]}
            >
              {(tab) => {
                let tabout;

                if ("mobile" === tab.name) {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__(
                          "Font Size",
                          "skt-blocks"
                        )}
                        min={0}
                        max={500}
                        value={attributes.titleFontSizeMobile}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSizeMobile: value,
                          })
                        }
                      />
                    </Fragment>
                  );
                } else if ("tablet" === tab.name) {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__(
                          "Font Size",
                          "skt-blocks"
                        )}
                        min={0}
                        max={500}
                        value={attributes.titleFontSizeTablet}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSizeTablet: value,
                          })
                        }
                      />
                    </Fragment>
                  );
                } else {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__(
                          "Font Size",
                          "skt-blocks"
                        )}
                        min={0}
                        max={500}
                        value={attributes.titleFontSize}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSize: value,
                          })
                        }
                      />
                    </Fragment>
                  );
                }

                return <div>{tabout}</div>;
              }}
            </TabPanel>
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.titleFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.titleLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={attributes.titleTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  titleTextTransform: value,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Read More Link", "skt-blocks")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              min={0}
              max={500}
              value={attributes.continueFontSize}
              onChange={(value) =>
                setAttributes({
                  continueFontSize: value,
                })
              }
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.continueFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  continueFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.continueLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  continueLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
            <SelectControl
              label={__("Text Transform", "skt-blocks")}
              options={textTransformOptions}
              value={attributes.continueTextTransform}
              onChange={(value) =>
                this.props.setAttributes({
                  continueTextTransform: value,
                })
              }
            />
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Border", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style")}
            value={attributes.blockBorderStyle}
            onChange={(value) =>
              this.props.setAttributes({ blockBorderStyle: value })
            }
            options={[
              { value: "none", label: __("None") },
              { value: "solid", label: __("Solid") },
              { value: "dotted", label: __("Dotted") },
              { value: "dashed", label: __("Dashed") },
              { value: "double", label: __("Double") },
              { value: "groove", label: __("Groove") },
              { value: "inset", label: __("Inset") },
              { value: "outset", label: __("Outset") },
              { value: "ridge", label: __("Ridge") },
            ]}
          />
          {"none" != attributes.blockBorderStyle && (
            <RangeControl
              label={__("Border Width")}
              value={attributes.blockBorderWidth}
              onChange={(value) =>
                this.props.setAttributes({
                  blockBorderWidth: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={50}
              allowReset
            />
          )}
          <RangeControl
            label={__("Border Radius")}
            value={attributes.blockBorderRadius}
            onChange={(value) =>
              this.props.setAttributes({
                blockBorderRadius: value !== undefined ? value : "",
              })
            }
            min={0}
            max={1000}
            allowReset
          />
          {"none" != attributes.blockBorderStyle && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Border Color")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: attributes.blockBorderColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={attributes.blockBorderColor}
                onChange={(colorValue) =>
                  this.props.setAttributes({ blockBorderColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}
          <BoxShadowControl
            setAttributes={setAttributes}
            label={__("Box Shadow")}
            boxShadowColor={{
              value: attributes.boxShadowColor,
              label: __("Color"),
            }}
            boxShadowHOffset={{
              value: attributes.boxShadowHOffset,
              label: __("Horizontal"),
            }}
            boxShadowVOffset={{
              value: attributes.boxShadowVOffset,
              label: __("Vertical"),
            }}
            boxShadowBlur={{
              value: attributes.boxShadowBlur,
              label: __("Blur"),
            }}
            boxShadowSpread={{
              value: attributes.boxShadowSpread,
              label: __("Spread"),
            }}
            boxShadowPosition={{
              value: attributes.boxShadowPosition,
              label: __("Position"),
            }}
          />
          <BoxShadowControlHelper
            setAttributes={setAttributes}
            label={__("Hover Box Shadow")}
            attrNameTemplate="hover%s"
      boxShadowColor={{ value: attributes.hoverboxShadowColor }}
          />
        </PanelBody>
        <PanelBody
          title={__("Color", "skt-blocks")}
          initialOpen={false}
        >
          <p className="responsive-setting-label">
            {__("Background")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: attributes.bgColor }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.bgColor}
            onChange={(value) =>
              this.props.setAttributes({
                bgColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Title Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.titleColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.titleColor}
            onChange={(value) =>
              this.props.setAttributes({
                titleColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Title Hover Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.titleHoverColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.titleHoverColor}
            onChange={(value) =>
              this.props.setAttributes({
                titleHoverColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Meta Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.metaColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.metaColor}
            onChange={(value) =>
              this.props.setAttributes({
                metaColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Excerpt Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.textColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.textColor}
            onChange={(value) =>
              this.props.setAttributes({
                textColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Read More Link Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.readMoreLinkColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.readMoreLinkColor}
            onChange={(value) =>
              this.props.setAttributes({
                readMoreLinkColor: value,
              })
            }
            allowReset
          />
        </PanelBody>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
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
                    <RangeControl
                      label={__("Row Gap", "atomic-blocks")}
                      value={attributes.rowGapMobile}
                      onChange={(value) =>
                        this.props.setAttributes({
                          rowGapMobile: value,
                        })
                      }
                      min={0}
                      max={50}
                      step={1}
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__("Row Gap Tablet", "atomic-blocks")}
                      value={attributes.rowGapTablet}
                      onChange={(value) =>
                        this.props.setAttributes({
                          rowGapTablet: value,
                        })
                      }
                      min={0}
                      max={50}
                      step={1}
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__("Row Gap", "atomic-blocks")}
                      value={attributes.rowGap}
                      onChange={(value) =>
                        this.props.setAttributes({
                          rowGap: value,
                        })
                      }
                      min={0}
                      max={50}
                      step={1}
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
          <RangeControl
            label={__("Column Gap", "atomic-blocks")}
            value={attributes.columnGap}
            onChange={(value) =>
              this.props.setAttributes({
                columnGap: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__("Content Padding", "atomic-blocks")}
            value={attributes.contentPadding}
            onChange={(value) =>
              this.props.setAttributes({
                contentPadding: value,
              })
            }
            min={0}
            max={100}
            step={1}
          />
          <RangeControl
            label={__("Mobile Content Padding", "atomic-blocks")}
            value={attributes.mobileContentPadding}
            onChange={(value) =>
              this.props.setAttributes({
                mobileContentPadding: value,
              })
            }
            min={0}
            max={100}
            step={1}
          />
          <RangeControl
            label={__("Title Bottom Spacing", "atomic-blocks")}
            value={attributes.titleBottomSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                titleBottomSpacing: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__("Meta Bottom Spacing", "atomic-blocks")}
            value={attributes.metaBottomSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                metaBottomSpacing: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
          <RangeControl
            label={__("Read More Top Spacing", "atomic-blocks")}
            value={attributes.readMoreTopSpacing}
            onChange={(value) =>
              this.props.setAttributes({
                readMoreTopSpacing: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
