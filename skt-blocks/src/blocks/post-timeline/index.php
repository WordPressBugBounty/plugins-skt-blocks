<?php
/**
 * Server-side rendering for the post grid block
 *
 * @since   1.0.0
 * @package SKT Blocks
 */

/**
 * Renders the post grid block on server.
 *
 * @param string $attributes  Pass the block attributes.
 * @return string HTML content for the post grid.
 */
function skt_blocks_post_timeline_render_latest_posts( $attributes ) {

	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;
	$index = 0;

	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';

	/* Setup the query */
	$grid_query = array(
		'posts_per_page'      => $attributes['postsToShow'],
		'post_status'         => 'publish',
		'order'               => $attributes['order'],
		'orderby'             => $attributes['orderBy'],
		'offset'              => $attributes['offset'],
		'post_type'           => $attributes['postType'],
		'ignore_sticky_posts' => 1,
	);

	if ( isset( $attributes['categories'] ) && '' !== $attributes['categories'] ) {
		$grid_query['tax_query'][] = array(
			'taxonomy' => ( isset( $attributes['taxonomyType'] ) ) ? $attributes['taxonomyType'] : 'category',
			'field'    => 'id',
			'terms'    => $attributes['categories'],
			'operator' => 'IN',
		);
	}

	$wrapper_styles = '';

	/* Background styles. */
	if ( ! empty( $attributes['bgColor'] || $attributes['borderRadius'] ) ) {
		$wrapper_styles .= 'background-color:' . $attributes['bgColor'] . '; border-radius: ' . $attributes['borderRadius'] . 'px;';
	}

	/* Post Grid wrapper styles. */
	if ( ! empty( $wrapper_styles ) ) {
		$wrapper_style = $wrapper_styles;
	} else {
		$wrapper_style = null;
	}

	$excerpt_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['textColor'] || $attributes['contentFontSize'] || $attributes['contentFontWeight'] || $attributes['contentLineHeight'] ) ) {
		$excerpt_styles .= 'color:' . $attributes['textColor'] . '; font-size:' . $attributes['contentFontSize'] . 'px; font-weight:' . $attributes['contentFontWeight'] . '; font-family:' . $attributes['contentFontFamily'] . '; line-height:' . $attributes['contentLineHeight'] . ';';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $excerpt_styles ) ) {
		$excerpt_style = $excerpt_styles;
	} else {
		$excerpt_style = null;
	}

	$heading_colors = '';
	/* Text Color */
	if ( ! empty( $attributes['headingColor'] || $attributes['headingFontSize'] || $attributes['headingFontWeight'] || $attributes['headingLineHeight'] ) ) {
		$heading_colors .= 'color:' . $attributes['headingColor'] . '; font-size:' . $attributes['headingFontSize'] . 'px; font-weight:' . $attributes['headingFontWeight'] . '; font-family:' . $attributes['headingFontFamily'] . '; line-height:' . $attributes['headingLineHeight'] . ';';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $heading_colors ) ) {
		$heading_color = $heading_colors;
	} else {
		$heading_color = null;
	}

	$author_colors = '';
	/* Text Color */
	if ( ! empty( $attributes['authorColor'] || $attributes['authorFontSize'] || $attributes['authorFontWeight'] || $attributes['authorLineHeight'] ) ) {
		$author_colors .= 'color:' . $attributes['authorColor'] . '; font-size:' . $attributes['authorFontSize'] . 'px; font-weight:' . $attributes['authorFontWeight'] . '; font-family:' . $attributes['authorFontFamily'] . '; line-height:' . $attributes['authorLineHeight'] . ';';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $author_colors ) ) {
		$author_color = $author_colors;
	} else {
		$author_color = null;
	}

	$content_padding_styles = '';

	/* Content Padding. */
	if ( ! empty( $attributes['contentPadding'] ) ) {
		$content_padding_styles .= 'padding:' . $attributes['contentPadding'] . 'px;';
	}

	/* Content wrapper styles. */
	if ( ! empty( $content_padding_styles ) ) {
		$content_padding_wrapper_style = $content_padding_styles;
	} else {
		$content_padding_wrapper_style = null;
	}

	$block_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['blockSpace'] ) ) {
		$block_styles .= 'margin-bottom:' . $attributes['blockSpace'] . 'px;';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $block_styles ) ) {
		$block_style = $block_styles;
	} else {
		$block_style = '';
	}

	$heading_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['headingSpace'] ) ) {
		$heading_styles .= 'margin-bottom:' . $attributes['headingSpace'] . 'px;';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $heading_styles ) ) {
		$heading_style = $heading_styles;
	} else {
		$heading_style = '';
	}

	$author_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['authorSpace'] ) ) {
		$author_styles .= 'margin-bottom:' . $attributes['authorSpace'] . 'px;';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $author_styles ) ) {
		$author_style = $author_styles;
	} else {
		$author_style = '';
	}

	$date_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['dateFontSize'] || $attributes['dateFontWeight'] || $attributes['dateLineHeight'] ) ) {
		$date_styles .= 'font-size:' . $attributes['dateFontSize'] . 'px; font-weight:' . $attributes['dateFontWeight'] . '; line-height:' . $attributes['dateLineHeight'] . ';font-family:' . $attributes['dateFontFamily'] . ';';
	}

	if ( ! empty( $date_styles ) ) {
		$date_style = $date_styles;
	} else {
		$date_style = null;
	}

	$marker_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['bgSize'] ) ) {
		$marker_styles .= 'min-width:' . $attributes['bgSize'] . 'px; min-height:' . $attributes['bgSize'] . 'px;';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $marker_styles ) ) {
		$marker_style = $marker_styles;
	} else {
		$marker_style = null;
	}

	$svg_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['iconSize'] ) ) {
		$svg_styles .= 'width:' . $attributes['iconSize'] . 'px; height:' . $attributes['iconSize'] . 'px;';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $svg_styles ) ) {
		$svg_style = $svg_styles;
	} else {
		$svg_style = null;
	}

	$continue_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['continueFontSize'] || $attributes['continueFontWeight'] || $attributes['continueLineHeight'] ) ) {
		$continue_styles .= 'font-size:' . $attributes['continueFontSize'] . 'px; font-weight:' . $attributes['continueFontWeight'] . '; font-family:' . $attributes['continueFontFamily'] . '; line-height:' . $attributes['continueLineHeight'] . ';';
	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $continue_styles ) ) {
		$continue_style = $continue_styles;
	} else {
		$continue_style = null;
	}

	/* Post Grid Excerpct styles. */

	$post_grid_markup = '';

	$post_grid_markup .= sprintf(
		'<div class="skt-blocks-timeline__main">'
	);

	$post_grid_markup .= sprintf(
		'<div class="skt-blocks-timeline__days">'
	);

	$grid_query = new WP_Query( $grid_query );

	/* Start the loop */
	if ( $grid_query->have_posts() ) {

		while ( $grid_query->have_posts() ) {
			$grid_query->the_post();

			/* Setup the post ID */
			$post_id = get_the_ID();

			/* Setup the featured image ID */
			$post_thumb_id = get_post_thumbnail_id( $post_id );

			/* Setup the post classes */
			$post_classes = 'skt-blocks-block-post-timeline';

			/* Add sticky class */
			if ( is_sticky( $post_id ) ) {
				$post_classes .= ' sticky';
			} else {
				$post_classes .= null;
			}

			/* Join classes together */
			$post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );

			$post_grid_markup .= sprintf(
				'<section class="%1$s">',
				esc_attr( $post_classes )
			);

			/* Start the markup for the post */
			$post_grid_markup .= sprintf(
				'<article id="post-%1$s" class="skt-blocks-timeline__field	skt-blocks-timeline__field-wrap ">',
				esc_attr( $post_id )
			);

			if ( 'center' === $attributes['timelinAlignment'] ) {
				/* Wrap the byline content */
					$post_grid_markup .= sprintf(
						'<div class="' . esc_html( get_align_classes( $index ) ) . '">'
					);
			} elseif ( 'right' === $attributes['timelinAlignment'] ) {
				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-timeline__widget skt-blocks-timeline__right">'
				);
			} else {
				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-timeline__widget skt-blocks-timeline__left">'
				);
			}

				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-timeline__marker skt-blocks-timeline__out-view-icon" style="' . safecss_filter_attr( $marker_style ) . '">'
				);

				$post_grid_markup .= sprintf(
					'<span class="skt-blocks-timeline__icon-new skt-blocks-timeline__out-view-icon">'
				);

				$post_grid_markup .= sprintf(
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  style="' . safecss_filter_attr( $svg_style ) . '"> <path d="M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm116 204c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40z" /> </svg>'
				);
			/* Close the header content */
			$post_grid_markup .= sprintf(
				'</span>'
			);

			/* Close the header content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			if ( 'center' === $attributes['timelinAlignment'] ) {
				$post_grid_markup .= sprintf(
					'<div class="' . esc_html( get_day_align_classes( $index ) ) . '">'
				);

			} elseif ( 'right' === $attributes['timelinAlignment'] ) {
				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-timeline__day-new skt-blocks-timeline__day-right">'
				);
			} else {
				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-timeline__day-new skt-blocks-timeline__day-left">'
				);
			}

			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-timeline__events-new" style="' . safecss_filter_attr( $block_style ) . '">'
			);

			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-timeline__events-inner-new" style="' . safecss_filter_attr( $wrapper_style ) . '">'
			);

			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-timeline__date-hide skt-blocks-timeline__date-inner">'
			);

			/* Get the post date */
			if ( isset( $attributes['postType'] ) && 'post' === $attributes['postType'] ) {
				if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
						$post_grid_markup .= sprintf(
							'<time datetime="%1$s" class="skt-blocks-timeline__date-new" itemprop="datePublished" style="' . safecss_filter_attr( $date_style ) . '">%2$s</time>',
							esc_attr( get_the_date( 'c', $post_id ) ),
							esc_html( get_the_date( '', $post_id ) )
						);
				}
			}
			/* Close the byline content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Get the featured image */
			if ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] && $post_thumb_id ) {

				$post_thumb_size = 'full';

				if ( ! empty( $attributes['imageSize'] ) ) {
					$post_thumb_size = $attributes['imageSize'];
				}

				/* Output the featured image */
				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-block-post-timeline-image"><a href="%1$s" rel="bookmark" aria-hidden="true" tabindex="-1">%2$s</a></div>',
					esc_url( get_permalink( $post_id ) ),
					wp_get_attachment_image( $post_thumb_id, $post_thumb_size )
				);
			}

			/* Wrap the text content */
			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-content" style="' . safecss_filter_attr( $content_padding_wrapper_style ) . '">'
			);

			/* Get the post title */
			$title = get_the_title( $post_id );

			if ( ! $title ) {
				$title = __( 'Untitled', 'skt-blocks' );
			}

			if ( isset( $attributes['displayPostTitle'] ) && $attributes['displayPostTitle'] ) {

				if ( isset( $attributes['postTitleTag'] ) ) {
					$post_title_tag = $attributes['postTitleTag'];
				} else {
					$post_title_tag = 'h2';
				}

				$post_grid_markup .= sprintf(
					'<%3$s class="skt-blocks-block-post-timeline-title" style="' . safecss_filter_attr( $heading_style ) . '"><a href="%1$s" rel="bookmark" style="' . safecss_filter_attr( $heading_color ) . '">%2$s</a></%3$s>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $title ),
					esc_attr( $post_title_tag )
				);
			}

			if ( isset( $attributes['postType'] ) && 'post' === $attributes['postType'] ) {
				/* Wrap the byline content */
				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-block-post-timeline-byline" style="' . safecss_filter_attr( $author_style ) . '">'
				);

				/* Get the post author */
				if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
					$post_grid_markup .= sprintf(
						'<div class="skt-blocks-block-post-timeline-author" itemprop="author" itemtype="https://schema.org/Person"><a class="skt-blocks-text-link" href="%2$s" itemprop="url" rel="author" style="' . safecss_filter_attr( $author_color ) . '"><span itemprop="name">%1$s</span></a></div>',
						esc_html( get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ) ),
						esc_html( get_author_posts_url( get_the_author_meta( 'ID' ) ) )
					);
				}

				/* Close the byline content */
				$post_grid_markup .= sprintf(
					'</div>'
				);
			}

			/* Wrap the excerpt content */
			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-block-post-timeline-excerpt">'
			);

			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-timeline__post" style="' . safecss_filter_attr( $excerpt_style ) . '">'
			);

			/* Get the excerpt */

			// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, PEAR.Functions.FunctionCallSignature.ContentAfterOpenBracket
			$excerpt = apply_filters( 'the_excerpt',
				get_post_field(
					'post_excerpt',
					$post_id,
					'display'
				)
			);

			if ( empty( $excerpt ) && isset( $attributes['excerptLength'] ) ) {
				// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, PEAR.Functions.FunctionCallSignature.ContentAfterOpenBracket  -- Running the_excerpt directly, Previous rule doesn't take without the_excerpt being moved up a line
				$excerpt = apply_filters( 'the_excerpt',
					wp_trim_words(
						preg_replace(
							array(
								'/\<figcaption>.*\<\/figcaption>/',
								'/\[caption.*\[\/caption\]/',
							),
							'',
							get_the_excerpt()
						),
						$attributes['excerptLength']
					)
				);
			}

			if ( ! $excerpt ) {
				$excerpt = null;
			}

			if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
				$post_grid_markup .= wp_kses_post( $excerpt );
			}

			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Get the read more link */
			if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {
				if ( isset( $attributes['target'] ) && $attributes['target'] ) {
					$post_grid_markup .= sprintf(
						'<div class="skt-blocks-timeline__link_parent"><a class="skt-blocks-block-post-timeline-more-link skt-blocks-text-link" href="%1$s" rel="bookmark" target="_blank" style="' . safecss_filter_attr( $continue_style ) . '">%2$s <span class="screen-reader-text">%3$s</span></a></div>',
						esc_url( get_permalink( $post_id ) ),
						esc_html( $attributes['readMoreText'] ),
						esc_html( $title )
					);
				} else {
					$post_grid_markup .= sprintf(
						'<div class="skt-blocks-timeline__link_parent"><a class="skt-blocks-block-post-timeline-more-link skt-blocks-text-link" href="%1$s" rel="bookmark" target="_self" style="' . safecss_filter_attr( $continue_style ) . '">%2$s <span class="screen-reader-text">%3$s</span></a></div>',
						esc_url( get_permalink( $post_id ) ),
						esc_html( $attributes['readMoreText'] ),
						esc_html( $title )
					);
				}
			}

			/* Close the excerpt content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-timeline__arrow"></div>'
			);

			/* Close the text content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Close the byline content */
			$post_grid_markup .= sprintf(
				'</div>'
			);
			/* Close the byline content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Close the header content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-timeline__date-new skt-blocks-timeline__date-outer">'
			);

			/* Get the post date */
			if ( isset( $attributes['postType'] ) && 'post' === $attributes['postType'] ) {
				if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
						$post_grid_markup .= sprintf(
							'<time datetime="%1$s" class="skt-blocks-timeline__date-new" itemprop="datePublished" style="' . safecss_filter_attr( $date_style ) . '">%2$s</time>',
							esc_attr( get_the_date( 'c', $post_id ) ),
							esc_html( get_the_date( '', $post_id ) )
						);
				}
			}
			/* Close the byline content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Close the byline content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Close the post */
			$post_grid_markup .= "</article>\n";

			$post_grid_markup .= sprintf(
				'</section>'
			);

			$index++;

		}

		/* Close the byline content */
		$post_grid_markup .= sprintf(
			'</div>'
		);

		$post_grid_markup .= sprintf(
			'<div class="skt-blocks-timeline__line">
			  <div class="skt-blocks-timeline__line__inner"></div>
			</div>'
		);

		$post_grid_markup .= sprintf(
			'</div>'
		);

		/* Restore original post data */
		wp_reset_postdata();

		/* Build the block classes */
		$class = "wp-block-skt-blocks-post-timeline-{$attributes['block_id']} wp-block-skt-blocks-post-timeline featured{$attributes['postType']} align{$attributes['align']}";

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		$sec_classes = 'skt-blocks-block-post-timeline';

		if ( 'center' === $attributes['arrowlinAlignment'] ) {
			/* Wrap the byline content */
			$sec_classes .= ' skt-blocks-timeline__arrow-center';
		} elseif ( 'bottom' === $attributes['arrowlinAlignment'] ) {
			$sec_classes .= ' skt-blocks-timeline__arrow-bottom';
		} else {
			$sec_classes .= ' skt-blocks-timeline__arrow-top';
		}

		if ( 'center' === $attributes['timelinAlignment'] ) {
			$sec_classes .= ' skt-blocks-timeline__center-block';
		} elseif ( 'right' === $attributes['timelinAlignment'] ) {
			$sec_classes .= ' skt-blocks-timeline__right-block';
		} else {
			$sec_classes .= ' skt-blocks-timeline__left-block';
		}

		if ( 'mobile' === $attributes['stack'] ) {
			$sec_classes .= ' skt-blocks-timeline__responsive-mobile';
		} elseif ( 'tablet' === $attributes['stack'] ) {
			$sec_classes .= ' skt-blocks-timeline__responsive-tablet';
		} else {
			$sec_classes .= ' skt-blocks-timeline__responsive-none';
		}

		/* Post grid section title */
		if ( isset( $attributes['displaySectionTitle'] ) && $attributes['displaySectionTitle'] && ! empty( $attributes['sectionTitle'] ) ) {
			if ( isset( $attributes['sectionTitleTag'] ) ) {
				$section_title_tag = $attributes['sectionTitleTag'];
			} else {
				$section_title_tag = 'h2';
			}

			$section_title = '<' . esc_attr( $section_title_tag ) . ' class="skt-blocks-post-grid-section-title">' . esc_html( $attributes['sectionTitle'] ) . '</' . esc_attr( $section_title_tag ) . '>';
		} else {
			$section_title = null;
		}

		/* Post grid section tag */
		if ( isset( $attributes['sectionTag'] ) ) {
			$section_tag = $attributes['sectionTag'];
		} else {
			$section_tag = 'section';
		}

		$boxShadowPositionCSS = $attributes['boxShadowPosition'];

		if ( 'outset' === $attributes['boxShadowPosition'] ) {
			$boxShadowPositionCSS = '';
		}

		$styles =
			'<style type="text/css">
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__line {
                background-color: ' . $attributes['connectorColor'] . ';
				width: ' . $attributes['connectorWidth'] . 'px;
            }
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__line:hover {
                background-color: ' . $attributes['separatorFillColor'] . ';
            }
            .wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__out-view-icon svg{
                fill: ' . $attributes['iconColor'] . ';
            }
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__out-view-icon svg:hover{
                fill: ' . $attributes['iconFocus'] . ';
            }
            .wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__marker.skt-blocks-timeline__out-view-icon{
                background-color: ' . $attributes['separatorBg'] . ';
				border: ' . $attributes['borderWidth'] . 'px solid;
                border-color: ' . $attributes['separatorBorder'] . ';
            }
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__marker.skt-blocks-timeline__out-view-icon:hover{
                background-color: ' . $attributes['iconBgFocus'] . ';
                border-color: ' . $attributes['borderFocus'] . ';
            }
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-block-post-timeline-more-link.skt-blocks-text-link {
				color: ' . $attributes['continueColor'] . ';
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-block-post-timeline-more-link.skt-blocks-text-link:hover {
				color: ' . $attributes['hColor'] . ';
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__link_parent {
				background-color: ' . $attributes['continuebgColor'] . ';
                border: 1px solid ' . $attributes['borderColor'] . ';
				box-shadow: ' . $attributes['boxShadowHOffset'] . 'px ' . $attributes['boxShadowVOffset'] . 'px ' . $attributes['boxShadowBlur'] . 'px ' . $attributes['boxShadowSpread'] . 'px ' . $attributes['boxShadowColor'] . ' ' . $boxShadowPositionCSS . ';
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__link_parent:hover {
				background-color: ' . $attributes['continuebghColor'] . ';
                border: 1px solid ' . $attributes['borderHColor'] . ';
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__center-block .skt-blocks-timeline__marker {
				margin-left: ' . $attributes['horSpace'] . 'px;
				margin-right: ' . $attributes['horSpace'] . 'px;
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__left-block .skt-blocks-timeline__day-new {
				margin-left: ' . $attributes['horSpace'] . 'px;
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__right-block .skt-blocks-timeline__day-new {
				margin-left: ' . $attributes['horSpace'] . 'px;
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__field.skt-blocks-timeline__field-wrap {
				margin-bottom: ' . $attributes['verSpace'] . 'px;
			}

			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__left-block .skt-blocks-timeline__line{
				left: calc(' . $attributes['bgSize'] . 'px/2);
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__right-block .skt-blocks-timeline__line{
				right: calc(' . $attributes['bgSize'] . 'px/2);
			}
			.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__post p{
				line-height: ' . $attributes['contentLineHeight'] . ';
			}
			@media(max-width:767px){
				.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__center-block.skt-blocks-timeline__responsive-mobile .skt-blocks-timeline__line{
					left: calc(' . $attributes['bgSize'] . 'px/2);
					right: calc(' . $attributes['bgSize'] . 'px/2);
				}
				.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__left-block.skt-blocks-timeline__responsive-mobile .skt-blocks-timeline__line{
					left: calc(' . $attributes['bgSize'] . 'px/2);
				}
				.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__right-block.skt-blocks-timeline__responsive-mobile .skt-blocks-timeline__line{
					right: calc(' . $attributes['bgSize'] . 'px/2);
				}

			}
			@media(max-width:976px){
				.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__center-block.skt-blocks-timeline__responsive-tablet .skt-blocks-timeline__line{
					left: calc(' . $attributes['bgSize'] . 'px/2);
					right: calc(' . $attributes['bgSize'] . 'px/2);
				}
				.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__left-block.skt-blocks-timeline__responsive-tablet .skt-blocks-timeline__line{
					left: calc(' . $attributes['bgSize'] . 'px/2);
				}
				.wp-block-skt-blocks-post-timeline-' . $attributes['block_id'] . ' .skt-blocks-timeline__right-block.skt-blocks-timeline__responsive-tablet .skt-blocks-timeline__line{
					right: calc(' . $attributes['bgSize'] . 'px/2);
				}
			}
            </style>';

		/* Output the post markup */
		$block_content = sprintf(
			'<%1$s class="%2$s %3$s">%4$s %5$s' . $styles . '</%1$s>',
			$section_tag,
			esc_attr( $class ),
			esc_attr( $sec_classes ),
			$section_title,
			$post_grid_markup
		);
		return $block_content;
	}
}

function get_align_classes( $index_val ) {
	$classes   = array();
	$classes[] = 'skt-blocks-timeline__widget';
	$classes[] = ( 0 == $index_val % 2 ) ? 'skt-blocks-timeline__right' : ' skt-blocks-timeline__left';
	return implode( ' ', $classes );
}

function get_day_align_classes( $index_val ) {
	$classes   = array();
	$classes[] = 'skt-blocks-timeline__day-new';
	$classes[] = ( 0 == $index_val % 2 ) ? 'skt-blocks-timeline__day-right' : 'skt-blocks-timeline__day-left';
	return implode( ' ', $classes );
}

/**
 * Registers the post grid block on server
 */
function skt_blocks_post_timeline_register_latest_posts() {

	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	/* Block attributes */
	register_block_type(
		'skt-blocks/post-timeline',
		array(
			'attributes'      => array(
				'categories'          => array(
					'type' => 'string',
				),
				'className'           => array(
					'type' => 'string',
				),
				'postsToShow'         => array(
					'type'    => 'number',
					'default' => 6,
				),
				'displayPostDate'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostAuthor'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostImage'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostLink'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displaySectionTitle' => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postTitleTag'        => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'postLayout'          => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'columns'             => array(
					'type'    => 'number',
					'default' => 2,
				),
				'align'               => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'timelinAlignment'    => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'arrowlinAlignment'   => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'width'               => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'order'               => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'             => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'readMoreText'        => array(
					'type'    => 'string',
					'default' => 'Continue Reading',
				),
				'offset'              => array(
					'type'    => 'number',
					'default' => 0,
				),
				'excerptLength'       => array(
					'type'    => 'number',
					'default' => 55,
				),
				'postType'            => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'sectionTag'          => array(
					'type'    => 'string',
					'default' => 'section',
				),
				'sectionTitle'        => array(
					'type' => 'string',
				),
				'sectionTitleTag'     => array(
					'type'    => 'string',
					'default' => 'h2',
				),
				'imageSize'           => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'url'                 => array(
					'type'      => 'string',
					'source'    => 'attribute',
					'selector'  => 'img',
					'attribute' => 'src',
				),
				'id'                  => array(
					'type' => 'number',
				),
				'bgColor'             => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'textColor'           => array(
					'type'    => 'string',
					'default' => '#333',
				),
				'contentPadding'      => array(
					'type'    => 'number',
					'default' => 20,
				),
				'authorSpace'         => array(
					'type' => 'number',
				),
				'blockSpace'          => array(
					'type' => 'number',
				),
				'headingSpace'        => array(
					'type' => 'number',
				),
				'headingColor'        => array(
					'type'    => 'string',
					'default' => '#333',
				),
				'authorColor'         => array(
					'type'    => 'string',
					'default' => '#626e81',
				),
				'continueColor'       => array(
					'type'    => 'string',
					'default' => '#333',
				),
				'dateFontFamily'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'headingFontFamily'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'authorFontFamily'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'contentFontFamily'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'continueFontFamily'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'connectorColor'      => array(
					'type'    => 'string',
					'default' => '#eeeeee',
				),
				'dateFontSize'        => array(
					'type'    => 'number',
					'default' => 16,
				),
				'dateFontWeight'      => array(
					'type'    => 'string',
					'default' => 400,
				),
				'dateLineHeight'      => array(
					'type'    => 'number',
					'default' => 1.75,
				),
				'headingFontSize'     => array(
					'type'    => 'number',
					'default' => 20,
				),
				'headingFontWeight'   => array(
					'type'    => 'string',
					'default' => 700,
				),
				'headingLineHeight'   => array(
					'type'    => 'number',
					'default' => 1.5,
				),
				'authorFontSize'      => array(
					'type'    => 'number',
					'default' => 14,
				),
				'authorFontWeight'    => array(
					'type'    => 'string',
					'default' => 400,
				),
				'authorLineHeight'    => array(
					'type'    => 'number',
					'default' => 1.5,
				),
				'contentFontSize'     => array(
					'type'    => 'number',
					'default' => 16,
				),
				'contentFontWeight'   => array(
					'type'    => 'string',
					'default' => 400,
				),
				'contentLineHeight'   => array(
					'type'    => 'number',
					'default' => 1.75,
				),
				'continueFontSize'    => array(
					'type'    => 'number',
					'default' => 16,
				),
				'continueFontWeight'  => array(
					'type'    => 'string',
					'default' => 700,
				),
				'continueLineHeight'  => array(
					'type'    => 'number',
					'default' => 1.75,
				),
				'icon'                => array(
					'type'    => 'string',
					'default' => 'calendar-alt',
				),
				'iconSize'            => array(
					'type'    => 'number',
					'default' => 16,
				),
				'bgSize'              => array(
					'type'    => 'number',
					'default' => 35,
				),
				'borderWidth'         => array(
					'type'    => 'number',
					'default' => 0,
				),
				'connectorWidth'      => array(
					'type'    => 'number',
					'default' => 3,
				),
				'iconColor'           => array(
					'type'    => 'string',
					'default' => '#333',
				),
				'separatorBg'         => array(
					'type'    => 'string',
					'default' => '#eee',
				),
				'separatorBorder'     => array(
					'type'    => 'string',
					'default' => '#eee',
				),
				'separatorFillColor'  => array(
					'type'    => 'string',
					'default' => '#61ce70',
				),
				'iconFocus'           => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'iconBgFocus'         => array(
					'type'    => 'string',
					'default' => '#61ce70',
				),
				'borderFocus'         => array(
					'type'    => 'string',
					'default' => '#5cb85c',
				),
				'continuebgColor'     => array(
					'type'    => 'string',
					'default' => '',
				),
				'borderColor'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'hColor'              => array(
					'type'    => 'string',
					'default' => '#333',
				),
				'continuebghColor'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'borderHColor'        => array(
					'type'    => 'string',
					'default' => '',
				),
				'target'              => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'borderRadius'        => array(
					'type'    => 'number',
					'default' => 0,
				),
				'verSpace'            => array(
					'type'    => 'number',
					'default' => 0,
				),
				'horSpace'            => array(
					'type'    => 'number',
					'default' => 0,
				),
				'stack'               => array(
					'type'    => 'string',
					'default' => 'mobile',
				),
				'boxShadowColor'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'boxShadowPosition'   => array(
					'type'    => 'string',
					'default' => 'outset',
				),
				'boxShadowHOffset'    => array(
					'type'    => 'number',
					'default' => 0,
				),
				'boxShadowVOffset'    => array(
					'type'    => 'number',
					'default' => 0,
				),
				'boxShadowBlur'       => array(
					'type'    => 'number',
					'default' => 0,
				),
				'boxShadowSpread'     => array(
					'type'    => 'number',
					'default' => 0,
				),
				'taxonomyType'        => array(
					'type'    => 'string',
					'default' => 'category',
				),
				'block_id'            => array(
					'type'    => 'string',
					'default' => 'not_set',
				),
			),
			'render_callback' => 'skt_blocks_post_timeline_render_latest_posts',
		)
	);
}
add_action( 'init', 'skt_blocks_post_timeline_register_latest_posts' );


/**
 * Create API fields for additional info
 */
function skt_blocks_post_timeline_register_rest_fields() {
	/* Add landscape featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src',
		array(
			'get_callback'    => 'skt_blocks_post_timeline_get_image_src_landscape',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add square featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src_square',
		array(
			'get_callback'    => 'skt_blocks_post_timeline_get_image_src_square',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add author info */
	register_rest_field(
		'post',
		'author_info',
		array(
			'get_callback'    => 'skt_blocks_post_timeline_get_author_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'skt_blocks_post_timeline_register_rest_fields' );


/**
 * Get landscape featured image source for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_post_timeline_get_image_src_landscape( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'skt-blocks-block-post-timeline-landscape',
		false
	);
	if($feat_img_array)
	return $feat_img_array[0];
	else
	    return false;
}

/**
 * Get square featured image source for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_post_timeline_get_image_src_square( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'skt-blocks-block-post-timeline-square',
		false
	);
    if($feat_img_array)
        return $feat_img_array[0];
    else
        return false;
}

/**
 * Get author info for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_post_timeline_get_author_info( $object, $field_name, $request ) {
	/* Get the author name */
	$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );

	/* Get the author link */
	$author_data['author_link'] = get_author_posts_url( $object['author'] );

	/* Return the author data */
	return $author_data;
}

if ( ! function_exists( 'skt_blocks_add_custom_orderby_params' ) ) {
	/**
	 The callback to add `rand` as an option for orderby param in REST API.
	 Hook to `rest_{$this->post_type}_collection_params` filter.

	 @param array $query_params Accepted parameters.
	 @return array

	 @see https://felipeelia.dev/wordpress-rest-api-enable-random-order-of-posts-list/
	 @see https://www.timrosswebdevelopment.com/wordpress-rest-api-post-order/
	 */
	function skt_blocks_add_custom_orderby_params( $query_params ) {
		if ( ! in_array( 'rand', $query_params['orderby']['enum'] ) ) {
			$query_params['orderby']['enum'][] = 'rand';
		}
		if ( ! in_array( 'menu_order', $query_params['orderby']['enum'] ) ) {
			$query_params['orderby']['enum'][] = 'menu_order';
		}
		return $query_params;
	}
}

if ( ! function_exists( 'skt_blocks_add_custom_orderby' ) ) {
	/**
	 Add `rand` as an option for orderby param in REST API.
	 Hook to `rest_{$this->post_type}_collection_params` filter.

	 @param array $query_params Accepted parameters.
	 @return array

	 @see https://felipeelia.dev/wordpress-rest-api-enable-random-order-of-posts-list/
	 @see https://www.timrosswebdevelopment.com/wordpress-rest-api-post-order/
	 */
	function skt_blocks_add_custom_orderby() {
		$post_types = get_post_types( array( 'public' => true ) );
		foreach ( $post_types as $post_type ) {
			add_filter( 'rest_' . $post_type . '_collection_params', 'skt_blocks_add_custom_orderby_params' );
		}
	}

	add_action( 'rest_api_init', 'skt_blocks_add_custom_orderby' );
}
