/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import { GalleryClasses } from "../../../utils/components/block-gallery/shared";

/**
 * WordPress dependencies
 */
import { Component, Fragment } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";

import Style from "style-it";
import { hexToRgba } from "../../../utils/index.js";

const save = ({ attributes, className }) => {
  const {
    autoPlay,
    autoPlaySpeed,
    draggable,
    freeScroll,
    gridSize,
    gutter,
    gutterMobile,
    height,
    images,
    pageDots,
    pauseHover,
    prevNextButtons,
    primaryCaption,
    alignCells,
    thumbnails,
    responsiveHeight,
    lightbox,
    borderWidth,
    borderColor,
    borderStyle,
    counterId,
    iconBackgroundRadius,
    iconColor,
    iconBackgroundColor,
    iconBackgroundOpacity,
    align,
    width,
    customWidth,
      isSmallImage,
  } = attributes;

  const classes = classnames(className, {
    "has-responsive-height": responsiveHeight,
    [`align${align}`]: align,
  });

  let imgopacity = iconBackgroundOpacity / 100;

  const innerClasses = classnames(
    "block-id-" + counterId,
    "is-cropped",
    ...GalleryClasses(attributes),
    {
      "has-horizontal-gutter": gutter > 0,
      "has-lightbox": lightbox,
      "scale-down": isSmallImage,
    }
  );

  const flickityClasses = classnames(
    "has-carousel",
    `has-carousel-${gridSize}`,
    {
      "has-aligned-cells": alignCells,
      [`has-margin-bottom-${gutter}`]: thumbnails && gutter > 0,
      [`has-margin-bottom-mobile-${gutterMobile}`]:
        thumbnails && gutterMobile > 0,
    }
  );

  const flickityStyles = {
    height: height ? height + "px" : undefined,
  };

  const figureClasses = classnames(
    "skt-blocks-gallery--figure",
    {
      [`has-margin-left-${gutter}`]: gutter > 0,
      [`has-margin-left-mobile-${gutterMobile}`]: gutterMobile > 0,
      [`has-margin-right-${gutter}`]: gutter > 0,
      [`has-margin-right-mobile-${gutterMobile}`]: gutterMobile > 0,
    }
  );

  const navStyles = {
    marginLeft: gutter > 0 && !responsiveHeight ? gutter + "px" : undefined,
    marginRight: gutter > 0 && !responsiveHeight ? gutter + "px" : undefined,
    borderWidth: borderWidth,
    borderStyle: borderStyle,
    borderColor: borderColor,
  };

  const flickityOptions = {
    autoPlay: autoPlay && autoPlaySpeed ? parseFloat(autoPlaySpeed) : false,
    draggable,
    pageDots,
    prevNextButtons,
    wrapAround: true,
    cellAlign: alignCells ? "left" : "center",
    pauseAutoPlayOnHover: pauseHover,
    freeScroll,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 65,
      y2: 45,
      x3: 20,
    },
    thumbnails,
    responsiveHeight,
  };

  const captionClasses = classnames(
    "skt-blocks-gallery--caption",
    "skt-blocks-gallery--primary-caption",
    {}
  );

  const navClasses = classnames("carousel-nav", {
    [`has-margin-top-${gutter}`]: gutter > 0,
    [`has-margin-top-mobile-${gutterMobile}`]: gutterMobile > 0,
    [`has-negative-margin-left-${gutter}`]: gutter > 0,
    [`has-negative-margin-left-mobile-${gutterMobile}`]: gutterMobile > 0,
    [`has-negative-margin-right-${gutter}`]: gutter > 0,
    [`has-negative-margin-right-mobile-${gutterMobile}`]: gutterMobile > 0,
  });

  const navFigureClasses = classnames(
    "skt-blocks--figure",
    {
      [`has-margin-left-${gutter}`]: gutter > 0,
      [`has-margin-left-mobile-${gutterMobile}`]: gutterMobile > 0,
      [`has-margin-right-${gutter}`]: gutter > 0,
      [`has-margin-right-mobile-${gutterMobile}`]: gutterMobile > 0,
    }
  );

  const navOptions = {
    asNavFor: ".has-carousel",
    autoPlay: false,
    contain: true,
    cellAlign: "left",
    pageDots: false,
    thumbnails: false,
    draggable,
    prevNextButtons: false,
    wrapAround: false,
  };

  // Return early if there are no images.
  if (images.length <= 0) {
    return;
  }

  return (
    <Fragment>
      <Style>
        {`
            .block-id-${counterId} .flickity-button .flickity-button-icon {
                fill: ${iconColor};
            }
            .skt-blocks-gallery.block-id-${counterId} .flickity-button {
               background-color: ${hexToRgba(
                 iconBackgroundColor || "#ffffff",
                 imgopacity || 0
               )};
               border-radius: ${iconBackgroundRadius}%;
            }
            .block-id-${counterId} .skt-blocks-gallery--item figure {
                height: ${height - (borderWidth ? borderWidth * 2 : "")}px;

            }

           `}
      </Style>
      {!!customWidth && (
        <Style>
          {`
              .skt-blocks-gallery.block-id-${counterId} .has-carousel-lrg .skt-blocks-gallery--item{
                  width: ${width}px;
              }
              `}
        </Style>
      )}
      <div className={classes}>
        <div className={innerClasses}>
          <div
            className={flickityClasses}
            style={responsiveHeight ? undefined : flickityStyles}
            data-flickity={JSON.stringify(flickityOptions)}
          >
            {images.map((image) => {
              const img = (
                <img
                  src={image.url}
                  alt={image.alt}
                  data-id={image.id}
                  data-link={image.link}
                  className={image.id ? `wp-image-${image.id}` : null}
                />
              );

              return (
                <div
                  key={image.id || image.url}
                  className="skt-blocks-gallery--item"
                  style={navStyles}
                >
                  <figure className={figureClasses}>{img}</figure>
                </div>
              );
            })}
          </div>
          {thumbnails ? (
            <div
              className={navClasses}
              data-flickity={JSON.stringify(navOptions)}
            >
              {images.map((image) => {
                const img = (
                  <img
                    src={image.url}
                    alt={image.alt}
                    data-id={image.id}
                    data-link={image.link}
                  />
                );
                return (
                  <div
                    key={image.id || image.url}
                    className="skt-blocks--item-thumbnail"
                  >
                    <figure className={navFigureClasses}>{img}</figure>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {!RichText.isEmpty(primaryCaption) && (
          <RichText.Content
            tagName="figcaption"
            className={captionClasses}
            value={primaryCaption}
          />
        )}
      </div>
    </Fragment>
  );
};

export default save;
