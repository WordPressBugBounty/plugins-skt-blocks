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
function skt_blocks_render_block_core_latest_posts( $attributes ) {

	/**
	* Global post object.
	* Used for excluding the current post from the grid.
	*
	* @var WP_Post
	*/
	global $post;
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
		'paged'               => 1,
	);

	if ( get_query_var( 'paged' ) ) {

		$paged = get_query_var( 'paged' );

		$grid_query['offset'] = ( $paged - 1 ) * $attributes['postsToShow'];

	} elseif ( get_query_var( 'page' ) ) {

		$paged = get_query_var( 'page' );

		$grid_query['offset'] = ( $paged - 1 ) * $attributes['postsToShow'];

	} else {

		$paged = 1;

	}
	$grid_query['paged'] = $paged;

	if ( isset( $attributes['categories'] ) && '' !== $attributes['categories'] ) {
		$grid_query['tax_query'][] = array(
			'taxonomy' => ( isset( $attributes['taxonomyType'] ) ) ? $attributes['taxonomyType'] : 'category',
			'field'    => 'id',
			'terms'    => $attributes['categories'],
			'operator' => 'IN',
		);
	}
	

	$meta_styles = '';
	/* Meta Color */
	if ( ! empty( $attributes['metaColor'] ) ) {
		$meta_styles .= 'color:' . $attributes['metaColor'] . ';';
		$meta_styles .= 'font-size:' . $attributes['metaFontSize'] . 'px;';
		$meta_styles .= 'line-height:' . $attributes['metaLineHeight'] . ';';
		$meta_styles .= 'font-weight:' . $attributes['metaFontWeight'] . ';';
		$meta_styles .= 'font-family:' . $attributes['metaFontFamily'] . ';';
		$meta_styles .= 'text-transform:' . $attributes['metaTextTransform'] . ';';
		$meta_styles .= 'margin-bottom:' . $attributes['metaBottomSpacing'] . ';';
	}

	/* Post Grid Meta styles. */
	if ( ! empty( $meta_styles ) ) {
		$meta_style = $meta_styles;
	} else {
		$meta_style = null;
	}

	$pagination_styles = '';
	/* Pagination Color */
	if ( ! empty( $attributes['paginationColor'] ) ) {
		$pagination_styles .= 'text-align:' . $attributes['paginationAlignment'] . ';';
	}

	/* Post Grid Meta styles. */
	if ( ! empty( $pagination_styles ) ) {
		$pagination_style = $pagination_styles;
	} else {
		$pagination_style = null;
	}

	$title_styles = '';
	/* Title Styles */
		$title_styles .= 'line-height:' . $attributes['titleLineHeight'] . ';';
		$title_styles .= 'font-weight:' . $attributes['titleFontWeight'] . ';';
		$title_styles .= 'font-family:' . $attributes['titleFontFamily'] . ';';
		$title_styles .= 'text-transform:' . $attributes['titleTextTransform'] . ';';

	/* Post Grid Meta styles. */
	if ( ! empty( $title_styles ) ) {
		$title_style = $title_styles;
	} else {
		$title_style = null;
	}

	$excerpt_styles = '';
	/* Text Color */
	if ( ! empty( $attributes['textColor'] ) ) {
		$excerpt_styles .= 'color:' . $attributes['textColor'] . ';';
		$excerpt_styles .= 'font-size:' . $attributes['excerptFontSize'] . 'px;';
		$excerpt_styles .= 'line-height:' . $attributes['excerptLineHeight'] . ';';
		$excerpt_styles .= 'font-weight:' . $attributes['excerptFontWeight'] . ';';
		$excerpt_styles .= 'font-family:' . $attributes['excerptFontFamily'] . ';';
		$excerpt_styles .= 'text-transform:' . $attributes['excerptTextTransform'] . ';';

	}

	/* Post Grid Excerpct styles. */
	if ( ! empty( $excerpt_styles ) ) {
		$excerpt_style = $excerpt_styles;
	} else {
		$excerpt_style = null;
	}
    $boxShadowPositionCSS = $attributes['boxShadowPosition'];

    if ( 'outset' === $attributes['boxShadowPosition'] ) {
        $boxShadowPositionCSS = '';
    }
    $hoverboxShadowPositionCSS = $attributes['hoverboxShadowPosition'];

    if ( 'outset' === $attributes['hoverboxShadowPosition'] ) {
        $hoverboxShadowPositionCSS = '';
    }

	$global_styles = '
		<style type="text/css">
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-block-post-grid-image img {
				border-radius: ' . $attributes['imageBorderRadius'] . 'px;
			}
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid header .skt-blocks-block-post-grid-title {
				margin-bottom: ' . $attributes['titleBottomSpacing'] . 'px;
			}
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-block-post-grid-byline {
				margin-bottom: ' . $attributes['metaBottomSpacing'] . 'px;
			}
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-block-post-grid-text .skt-blocks-block-post-grid-excerpt a{
				margin-top: ' . $attributes['readMoreTopSpacing'] . 'px;
			}
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-pagination-wrap > * {
			    border:' . $attributes['paginationBorderWidth'] . 'px solid ' . $attributes['paginationBorderColor'] . ';
			    background-color:' . ( $attributes['paginationLayout'] == 'filled' ? $attributes['paginationBorderColor'] : 'transparent' ) . ';
			    border-radius:' . $attributes['paginationBorderRadius'] . 'px;
			    color:' . $attributes['paginationTextColor'] . ' !important;
			    margin-right:10px;
			    padding:0.5em;
			}
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-pagination-wrap > *:last-child {
			    margin-right:0;
			}
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-pagination-wrap > span {
			    border:'  . ( $attributes['paginationBorderWidth'] . 'px solid ' . $attributes['paginationActiveBorderColor'] ) . ';
			    background-color:' . ( $attributes['paginationLayout'] == 'filled' ? $attributes['paginationActiveBorderColor'] : 'transparent' ) . ';
			    color:' . $attributes['paginationTextActiveColor'] . '!important;
			}

			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-grid-items article, .page-template-gutenberg-fullwidth .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-grid-items article {
			    padding:' . ( $attributes['layout'] === 'boxed'? $attributes['contentPadding'] ? $attributes['contentPadding'] : "0" : "0" ) . 'px;
			}

.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-block-post-grid-text {
text-align: ' . $attributes['textAlignment'] . ';
padding:' . ( $attributes['layout'] === 'content'? $attributes['contentPadding'] ? $attributes['contentPadding'] : "0" : "0" ) . 'px;
}
			@media (max-width:768px){
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-grid-items article {
			        padding:' . ( $attributes['layout'] === 'boxed'? $attributes['mobileContentPadding'] ? $attributes['mobileContentPadding'] : "0" : "0" ) . 'px;
			        text-align: ' . $attributes['textAlignment'] . ';
			    }
			}@media (min-width:976px){
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid header .skt-blocks-block-post-grid-title{
			        font-size:' . $attributes['titleFontSize'] . 'px;
			    }
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-grid-item {
margin-bottom: ' . $attributes['rowGap'] . 'px;
}
			}@media (max-width:976px){
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid header .skt-blocks-block-post-grid-title {
			        font-size:' . $attributes['titleFontSizeTablet'] . 'px;
			    }
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-grid-item {
margin-bottom: ' . $attributes['rowGapTablet'] . 'px;
}
			}@media (max-width:767px){
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid header .skt-blocks-block-post-grid-title
			     {
			        font-size:' . $attributes['titleFontSizeMobile'] . 'px;
			    }
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid .skt-blocks-post-grid-item {
margin-bottom: ' . $attributes['rowGapMobile'] . 'px;
}
			    .skt-blocks-block-post-grid .is-list article {
			        grid-template-columns: ' . ( $attributes['stackonMobile'] ? "1fr" : "1fr 1fr" ) . '
			    }
			}
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid header .skt-blocks-block-post-grid-title a
			     {
			        color:' . $attributes['titleColor'] . ';
			    }
			    .block-id-' . $attributes['postGridBlockId'] . ' .skt-blocks-block-post-grid-more-link, .block-id-' . $attributes['postGridBlockId'] . ' .read-more a{
			        display: '.($attributes['displayPostLink']? "block" : "none").';
			    }
			   
			.block-id-' . $attributes['postGridBlockId'] . ' .skt-blocks-block-post-grid-more-link, .block-id-' . $attributes['postGridBlockId'] . ' .read-more a
			     {
			        color:' . $attributes['readMoreLinkColor'] . ';
			        font-size:' . $attributes['continueFontSize'] . 'px;
			        font-weight:' . $attributes['continueFontWeight'] . ';
			        line-height:' . $attributes['continueLineHeight'] . ';
			        text-transform:' . $attributes['continueTextTransform'] . ';
			    }
			.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid header .skt-blocks-block-post-grid-title a:hover
			     {
			        color:' . $attributes['titleHoverColor'] . ';
			    }
			    .block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid article
			     {
			        box-shadow: ' . $attributes['boxShadowHOffset'] . 'px ' . $attributes['boxShadowVOffset'] . 'px ' . $attributes['boxShadowBlur'] . 'px ' . $attributes['boxShadowSpread'] . 'px ' . $attributes['boxShadowColor'] . ' ' . $boxShadowPositionCSS . ';
			    }
		.block-id-' . $attributes['postGridBlockId'] . '.skt-blocks-block-post-grid article:hover
			     {
			        box-shadow: ' . $attributes['hoverboxShadowHOffset'] . 'px ' . $attributes['hoverboxShadowVOffset'] . 'px ' . $attributes['hoverboxShadowBlur'] . 'px ' . $attributes['hoverboxShadowSpread'] . 'px ' . $attributes['hoverboxShadowColor'] . ' ' . $hoverboxShadowPositionCSS . ';
			    }
		
		</style>';

	$post_grid_markup  = '';
	$post_grid_markup .= $global_styles;

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
			$post_classes = 'skt-blocks-post-grid-item';

			/* Add sticky class */
			if ( is_sticky( $post_id ) ) {
				$post_classes .= ' sticky';
			} else {
				$post_classes .= null;
			}

			/* Join classes together */
			$post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );

			$post_thumb_size = 'full';

			if ( ! empty( $attributes['imageSize'] ) ) {
				$post_thumb_size = $attributes['imageSize'];
			}

			$wrapper_styles = '';

			/* Background styles. */
			if ( ! empty( $attributes['bgColor'] ) ) {
				$wrapper_styles .= 'background-color:' . $attributes['bgColor'] . ';';
				$wrapper_styles .= 'border-style:' . $attributes['blockBorderStyle'] . ';';
				$wrapper_styles .= 'border-color:' . $attributes['blockBorderColor'] . ';';
				$wrapper_styles .= 'border-radius:' . $attributes['blockBorderRadius'] . 'px;';
				$wrapper_styles .= 'border-width:' . $attributes['blockBorderWidth'] . 'px;';
				$wrapper_styles .= 'margin-left:' . ( $attributes['columnGap'] ? $attributes['columnGap'] / 2 : '' ) . 'px;';
				$wrapper_styles .= 'margin-right:' . ( $attributes['columnGap'] ? $attributes['columnGap'] / 2 : '' ) . 'px;';
				$wrapper_styles .= 'background-image:' . ( "background" == $attributes['imagePosition'] ? 'url(' . wp_get_attachment_image_url( $post_thumb_id, $post_thumb_size ) . ' )' : 'none' ) . ';';
				$wrapper_styles .= 'height:' . ( $attributes['equalHeight'] ? 'auto' : 'fit-content' ) . ';';
			}

			/* Post Grid wrapper styles. */
			if ( ! empty( $wrapper_styles ) ) {
				$wrapper_style = $wrapper_styles;
			} else {
				$wrapper_style = null;
			}

			/* Start the markup for the post */
			$post_grid_markup .= sprintf(
				'<article id="post-%1$s" class="%2$s" style="' . safecss_filter_attr( $wrapper_style ) . '">',
				esc_attr( $post_id ),
				esc_attr( $post_classes )
			);

			/* Get the featured image */
			if ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] && $post_thumb_id ) {

				if ( ! empty( $attributes['imagePosition'] && 'background' != $attributes['imagePosition'] ) ) {
					/* Output the featured image */
					$post_grid_markup .= sprintf(
						'<div class="skt-blocks-block-post-grid-image"><a href="%1$s" rel="bookmark" aria-hidden="true" tabindex="-1">%2$s</a></div>',
						esc_url( get_permalink( $post_id ) ),
						wp_get_attachment_image( $post_thumb_id, $post_thumb_size )
					);
				}
			}

			/* Wrap the text content */
			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-block-post-grid-text">'
			);

			$post_grid_markup .= sprintf(
				'<header class="skt-blocks-block-post-grid-header">'
			);

			/* Get the post title */
			$title = get_the_title( $post_id );

			if ( ! $title ) {
				$title = __( 'Untitled', 'skt-blocks' );
			}

			if ( isset( $attributes['displayPostTitle'] ) && $attributes['displayPostTitle'] ) {

				if ( isset( $attributes['postTitleTag'] ) ) {
					$post_title_tag = sanitize_key($attributes['postTitleTag']);
				} else {
					$post_title_tag = 'h2';
				}

				$post_grid_markup .= sprintf(
					'<%3$s class="skt-blocks-block-post-grid-title"><a href="%1$s" rel="bookmark"  style="' . safecss_filter_attr( $title_style ) . '">%2$s</a></%3$s>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $title ),
					esc_attr( $post_title_tag )
				);
			}

			if ( isset( $attributes['postType'] ) && ('post' === $attributes['postType'] || 'course' === $attributes['postType'] || 'lesson' === $attributes['postType'] ) ) {
				/* Wrap the byline content */
				$post_grid_markup .= sprintf(
					'<div class="skt-blocks-block-post-grid-byline" style="' . safecss_filter_attr( $meta_style ) . '">'
				);

				/* Get the post author */
				if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
					$post_grid_markup .= sprintf(
						'<div class="skt-blocks-block-post-grid-author" itemprop="author" itemtype="https://schema.org/Person"><a class="skt-blocks-text-link" href="%2$s" itemprop="url" rel="author"><span itemprop="name">%1$s</span></a></div>',
						esc_html( get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ) ),
						esc_html( get_author_posts_url( get_the_author_meta( 'ID' ) ) )
					);
				}

				/* Get the post date */
				if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
					$post_grid_markup .= sprintf(
						'<time datetime="%1$s" class="skt-blocks-block-post-grid-date" itemprop="datePublished">%2$s</time>',
						esc_attr( get_the_date( 'c', $post_id ) ),
						esc_html( get_the_date( '', $post_id ) )
					);
				}

				/* Close the byline content */
				$post_grid_markup .= sprintf(
					'</div>'
				);
			}

			/* Close the header content */
			$post_grid_markup .= sprintf(
				'</header>'
			);

			/* Wrap the excerpt content */
			$post_grid_markup .= sprintf(
				'<div class="skt-blocks-block-post-grid-excerpt" style="' . safecss_filter_attr( $excerpt_style ) . '">'
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
				$excerpt = '';
			}

			if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
				$post_grid_markup .= wp_kses_post( $excerpt );
			}

            /* Close the excerpt content */
			$post_grid_markup .= sprintf(
				'</div>'
			);
            /* Get the read more link */
            if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {
                $post_grid_markup .= sprintf(
                    '<p><a class="skt-blocks-block-post-grid-more-link skt-blocks-text-link" href="%1$s" rel="bookmark">%2$s <span class="screen-reader-text">%3$s</span></a></p>',
                    esc_url( get_permalink( $post_id ) ),
                    esc_html( $attributes['readMoreText'] ),
                    esc_html( $title )
                );
            }
			/* Close the text content */
			$post_grid_markup .= sprintf(
				'</div>'
			);

			/* Close the post */
			$post_grid_markup .= "</article>\n";
		}

		/* Restore original post data */
		wp_reset_postdata();

		/* Build the block classes */
		$class = "block-id-{$attributes['postGridBlockId']} skt-blocks-block-post-grid featured{$attributes['postType']} align{$attributes['align']}";

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		/* Layout orientation class */
		$grid_class = 'skt-blocks-post-grid-items';

		if ( isset( $attributes['postLayout'] ) && 'list' === $attributes['postLayout'] ) {
			$grid_class .= ' is-list';
		} else {
			$grid_class .= ' is-grid';
		}

		/* Grid columns class */
		if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
			$grid_class .= ' columns-' . $attributes['columns'];
		}

		/* Post grid section title */
		if ( isset( $attributes['displaySectionTitle'] ) && $attributes['displaySectionTitle'] && ! empty( $attributes['sectionTitle'] ) ) {
		// Define allowed tags
		$allowed_tags = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span' );
		
		// Check if 'sectionTitleTag' is set and valid
		if ( isset( $attributes['sectionTitleTag'] ) && in_array( $attributes['sectionTitleTag'], $allowed_tags, true ) ) {
			$section_title_tag = sanitize_key( $attributes['sectionTitleTag'] );
		} else {
			$section_title_tag = 'h2'; // Default to 'h2' if no valid tag is provided
		}
	
		// Escape the section title content
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

		$main_class = new Skt_Blocks();

		$paginations_markup = '';

		if( $attributes['postPagination'] ) {
			$paginations_markup = '<div class="skt-blocks-post-pagination-wrap" style="text-align:' . $attributes['paginationAlignment'] . '" >' . $main_class->render_pagination( $grid_query, $attributes ) . '</div>';
		}

		/* Output the post markup */
		$block_content = sprintf(
			'<%1$s class="%2$s">%3$s<div class="%4$s">%5$s</div>%6$s</%1$s>',
			$section_tag,
			esc_attr( $class ),
			$section_title,
			esc_attr( $grid_class ),
			$post_grid_markup,
			$paginations_markup
		);
		return $block_content;
	}
}

/**
 * Registers the post grid block on server
 */
function skt_blocks_register_block_core_latest_posts() {

	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	/* Block attributes */
	register_block_type(
		'skt-blocks/skt-blocks-post-grid',
		array(
			'attributes'      => array(
				'categories'                     => array(
					'type' => 'string',
				),
				'tags'                           => array(
					'type' => 'string',
				),
				'textAlignment'                           => array(
					'type' => 'string',
					'default' => 'left',
				),
				'className'                      => array(
					'type' => 'string',
				),
				'postsToShow'                    => array(
					'type'    => 'number',
					'default' => 6,
				),
				'stackonMobile'                => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostDate'                => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'excludeCurrentPost'             => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt'             => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostAuthor'              => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostImage'               => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostLink'                => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'               => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displaySectionTitle'            => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postPagination'                 => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'equalHeight'                    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postTitleTag'                   => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'postLayout'                     => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'columns'                        => array(
					'type'    => 'number',
					'default' => 2,
				),
				'align'                          => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'width'                          => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'order'                          => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'                        => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'readMoreText'                   => array(
					'type'    => 'string',
					'default' => 'Read More »',
				),
				'offset'                         => array(
					'type'    => 'number',
					'default' => 0,
				),
				'excerptLength'                  => array(
					'type'    => 'number',
					'default' => 55,
				),
				'postType'                       => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'postTaxonomy'                   => array(
					'type'    => 'string',
					'default' => 'category',
				),
				'taxonomyType'                   => array(
					'type'    => 'string',
					'default' => 'category',
				),
				'paginationAlignment'            => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'paginationLayout'               => array(
					'type'    => 'string',
					'default' => '',
				),
				'sectionTag'                     => array(
					'type'    => 'string',
					'default' => 'section',
				),
				'sectionTitle'                   => array(
					'type' => 'string',
				),
				'sectionTitleTag'                => array(
					'type'    => 'string',
					'default' => 'h2',
				),
				'imageSize'                      => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'url'                            => array(
					'type'      => 'string',
					'source'    => 'attribute',
					'selector'  => 'img',
					'attribute' => 'src',
				),
				'id'                             => array(
					'type'    => 'number',
					'default' => '',
				),
				'bgColor'                        => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'paginationBorderColor'          => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'paginationTextActiveColor'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'paginationTextColor'            => array(
					'type'    => 'string',
					'default' => '',
				),
				'paginationActiveBorderColor'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'paginationBorderWidth'          => array(
					'type'    => 'number',
					'default' => '',
				),
				'paginationBorderRadius'         => array(
					'type'    => 'number',
					'default' => '',
				),
				'paginationSpacing'              => array(
					'type'    => 'number',
					'default' => '',
				),
				'imageBorderRadius'              => array(
					'type'    => 'number',
					'default' => '',
				),
				'textColor'                      => array(
					'type'    => 'string',
					'default' => '#444444',
				),
				'previousButtonText'             => array(
					'type'    => 'string',
					'default' => 'Previous',
				),
				'nextButtonText'                 => array(
					'type'    => 'string',
					'default' => 'Next',
				),
				'imagePosition'                  => array(
					'type'    => 'string',
					'default' => 'top',
				),
				'layout'                  => array(
					'type'    => 'string',
					'default' => 'boxed',
				),
				'metaColor'                      => array(
					'type'    => 'string',
					'default' => '#444444',
				),
				'readMoreLinkColor'                     => array(
					'type'    => 'string',
					'default' => '#0066cc',
				),
				'titleColor'                     => array(
					'type'    => 'string',
					'default' => '#444444',
				),
				'titleHoverColor'                     => array(
					'type'    => 'string',
					'default' => '#444444',
				),
				'contentPadding'                 => array(
					'type'    => 'number',
					'default' => 30,
				),
				'mobileContentPadding'           => array(
					'type'    => 'number',
					'default' => 10,
				),
				'continueFontSize'                  => array(
					'type'    => 'number',
					'default' => '',
				),
                'continueLineHeight'                => array(
                    'type'    => 'number',
                    'default' => '',
                ),
                'continueFontWeight'                => array(
                    'type'    => 'string',
                    'default' => '',
                ),
                'continueTextTransform'             => array(
                    'type'    => 'string',
                    'default' => '',
                ),
                'titleFontSize'                  => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleFontSizeMobile'                  => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleFontSizeTablet'                  => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleLineHeight'                => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleFontWeight'                => array(
					'type'    => 'string',
					'default' => '',
				),
				'titleTextTransform'             => array(
					'type'    => 'string',
					'default' => '',
				),
				'metaFontSize'                   => array(
					'type'    => 'number',
					'default' => '',
				),
				'metaLineHeight'                 => array(
					'type'    => 'number',
					'default' => '',
				),
				'metaFontWeight'                 => array(
					'type'    => 'string',
					'default' => '',
				),
				'metaTextTransform'              => array(
					'type'    => 'string',
					'default' => '',
				),
				'titleFontFamily'              => array(
					'type'    => 'string',
                    'default' => '',
				),
				'metaFontFamily'              => array(
					'type'    => 'string',
                    'default' => '',
				),
				'excerptFontFamily'              => array(
					'type'    => 'string',
                    'default' => '',
				),
				'excerptFontSize'                => array(
					'type'    => 'number',
					'default' => '',
				),
				'excerptLineHeight'              => array(
					'type'    => 'number',
					'default' => '',
				),
				'excerptFontWeight'              => array(
					'type'    => 'string',
					'default' => '',
				),
				'excerptTextTransform'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'readMoreTopSpacing'           => array(
					'type'    => 'number',
					'default' => '',
				),
				'metaBottomSpacing'              => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleBottomSpacing'             => array(
					'type'    => 'number',
					'default' => '',
					'default' => '',
				),
				'titleBottomSpacing'             => array(
					'type'    => 'number',
					'default' => '',
				),
				'columnGap'                      => array(
					'type'    => 'number',
					'default' => 20,
				),
				'rowGap'                         => array(
					'type'    => 'number',
					'default' => '',
				),
				'rowGapTablet'                         => array(
					'type'    => 'number',
					'default' => '',
				),
				'rowGapMobile'                         => array(
					'type'    => 'number',
					'default' => '',
				),
				'blockBorderWidth'                      => array(
					'type'    => 'number',
					'default' => '0',
				),
				'blockBorderRadius'                      => array(
					'type'    => 'number',
					'default' => '0',
				),
				'blockBorderStyle'                      => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'blockBorderColor'                      => array(
					'type'    => 'string',
					'default' => '#333',
				),
				'pageLimit'                      => array(
					'type'    => 'number',
					'default' => '10',
				),
				'taxonomyType'                   => array(
					'type'    => 'string',
					'default' => 'category',
				),
				'postGridBlockId'                => array(
					'type' => 'string',
					'default' => '',
				),
				'boxShadowColor'                => array(
					'type' => 'string',
                    'default' => '',
				),
                'boxShadowHOffset'                      => array(
                    'type'    => 'number',
                    'default' => '0',
                ),
                'boxShadowVOffset'                      => array(
                    'type'    => 'number',
                    'default' => '0',
                ),
                'boxShadowBlur'                      => array(
                    'type'    => 'number',
                    'default' => '0',
                ),
                'boxShadowSpread'                      => array(
                    'type'    => 'number',
                    'default' => '0',
                ),
                'boxShadowPosition'                      => array(
                    'type'    => 'string',
                    'default' => 'outset',
                ),
				'hoverboxShadowColor'                => array(
					'type' => 'string',
                    'default' => '#cccccc',
				),
                'hoverboxShadowHOffset'                      => array(
                    'type'    => 'number',
                    'default' => '0',
                ),
                'hoverboxShadowVOffset'                      => array(
                    'type'    => 'number',
                    'default' => '0',
                ),
                'hoverboxShadowBlur'                      => array(
                    'type'    => 'number',
                    'default' => '6',
                ),
                'hoverboxShadowSpread'                      => array(
                    'type'    => 'number',
                    'default' => '1',
                ),
                'hoverboxShadowPosition'                      => array(
                    'type'    => 'string',
                    'default' => 'outset',
                ),

			),
			'render_callback' => 'skt_blocks_render_block_core_latest_posts',
		)
	);
}
add_action( 'init', 'skt_blocks_register_block_core_latest_posts' );


/**
 * Create API fields for additional info
 */
function skt_blocks_register_rest_fields() {
	/* Add landscape featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src',
		array(
			'get_callback'    => 'skt_blocks_get_image_src_landscape',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add square featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src_square',
		array(
			'get_callback'    => 'skt_blocks_get_image_src_square',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add author info */
	register_rest_field(
		'post',
		'author_info',
		array(
			'get_callback'    => 'skt_blocks_get_author_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
	/* Add author info for courses, lesson */
	register_rest_field(
		array( 'page', 'post', 'course', 'lesson' ),
		'rbea_author_info',
		array(
			'get_callback'    => 'skt_blocks_get_rbea_author_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
	/* Add excerpt info for courses, lesson */
	register_rest_field(
		array( 'page', 'post', 'course', 'lesson' ),
		'rbea_excerpt_info',
		array(
			'get_callback'    => 'skt_blocks_get_rbea_excerpt_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'skt_blocks_register_rest_fields' );


/**
 * Get landscape featured image source for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_image_src_landscape( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'skt-blocks-block-post-grid-landscape',
		false
	);
	return $feat_img_array[0];
}

/**
 * Get square featured image source for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_image_src_square( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'skt-blocks-block-post-grid-square',
		false
	);
	return $feat_img_array[0];
}

/**
 * Get author info for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_author_info( $object, $field_name, $request ) {
	/* Get the author name */
	$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );

	/* Get the author link */
	$author_data['author_link'] = get_author_posts_url( $object['author'] );

	/* Return the author data */
	return $author_data;
}

/**
 * Get author info for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_rbea_author_info( $object, $field_name, $request ) {
	/* Get the author name */

    $author = ( isset( $object['author'] ) ) ? $object['author'] : '';

    // Get the author name.
    $author_data['display_name'] = get_the_author_meta( 'display_name', $author );

    // Get the author link.
    $author_data['author_link'] = get_author_posts_url( $author );

    // Return the author data.
    return $author_data;
}

/**
 * Get excerpt info for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_rbea_excerpt_info( $object, $field_name, $request ) {
    $excerpt = wp_trim_excerpt( get_the_excerpt( $object['id'] ) );
    if ( ! $excerpt ) {
        $excerpt = null;
    }
    return $excerpt;
}

if ( ! function_exists( 'skt_blocks_add_custom_orderby_params' ) ) {
	/**
	 * The callback to add `rand` as an option for orderby param in REST API.
	 * Hook to `rest_{$this->post_type}_collection_params` filter.
	 *
	 * @param array $query_params Accepted parameters.
	 * @return array
	 *
	 * @see https://felipeelia.dev/wordpress-rest-api-enable-random-order-of-posts-list/
	 * @see https://www.timrosswebdevelopment.com/wordpress-rest-api-post-order/
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
	 * Add `rand` as an option for orderby param in REST API.
	 * Hook to `rest_{$this->post_type}_collection_params` filter.
	 *
	 * @param array $query_params Accepted parameters.
	 * @return array
	 *
	 * @see https://felipeelia.dev/wordpress-rest-api-enable-random-order-of-posts-list/
	 * @see https://www.timrosswebdevelopment.com/wordpress-rest-api-post-order/
	 */
	function skt_blocks_add_custom_orderby() {
		$post_types = get_post_types( array( 'public' => true ) );
		foreach ( $post_types as $post_type ) {
			add_filter( 'rest_' . $post_type . '_collection_params', 'skt_blocks_add_custom_orderby_params' );
		}
	}

	add_action( 'rest_api_init', 'skt_blocks_add_custom_orderby' );
}
