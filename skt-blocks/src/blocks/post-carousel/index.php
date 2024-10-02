<?php
/**
 * Server-side rendering for the post carousel block
 *
 * @since   1.0.0
 * @package SKT Blocks
 */

/**
 * Add Frontend assets.
 *
 * @param Array $attributes Attributes.
 */
function skt_blocks_post_carousel_add_frontend_assets( $attributes ) {
    if ( has_block( 'skt-blocks/post-carousel' ) ) {
        wp_enqueue_script(
            'skt_blocks-slick-js',
            SKT_BLOCKS_URL . '/dist/js/vendors/slick.min.js',
            array( 'jquery' ),
            SKT_BLOCKS_VER,
            true
        );

        $selector = '.responsive-post-slick-carousel';
        $js       = 'jQuery( document ).ready( function( $ ) { if( $( "' . $selector . '" ).length > 0 ){ $( "' . $selector . '" ).slick( ); } } );';
        wp_add_inline_script( 'skt_blocks-slick-js-post-carousel', $js );
    }
}
add_action( 'wp_enqueue_scripts', 'skt_blocks_post_carousel_add_frontend_assets' );
add_action( 'the_post', 'skt_blocks_post_carousel_add_frontend_assets' );

/**
 * Generate Testimonical Carousel script dynamically
 */
function post_carousel_generate_script() {
	global $post;
	$this_post = $post;

	if ( ! is_object( $this_post ) ) {
		return;
	}

	if ( ! isset( $this_post->ID ) ) {
		return;
	}

	if ( has_blocks( $this_post->ID ) && isset( $this_post->post_content ) ) {

		$blocks = responsive_parse_gutenberg_blocks_post_carousel( $this_post->post_content );

		if ( ! is_array( $blocks ) || empty( $blocks ) ) {
			return;
		}

		get_responsive_post_carousel_scripts( $blocks );
	}
}

add_action( 'wp_enqueue_scripts', 'post_carousel_generate_script' );

/**
 * Parse hutenberg blocks
 *
 * @param string $content Post Content.
 * @return array[]
 */
function responsive_parse_gutenberg_blocks_post_carousel( $content ) {
	global $wp_version;

	return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : gutenberg_parse_blocks( $content );

}

/**
 * Get post Carousel block js
 *
 * @param WP_Block_Type $blocks Block.
 */
function get_responsive_post_carousel_scripts( $blocks ) {
	global $responsive_post_carousel_js;
	foreach ( $blocks as $i => $block ) {
		if ( is_array( $block ) ) {
			if ( 'core/block' === $block['blockName'] ) {
				$id = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

				if ( $id ) {
					$content = get_post_field( 'post_content', $id );

					$reusable_blocks = responsive_parse_gutenberg_blocks_post_carousel( $content );

					get_responsive_post_carousel_scripts( $reusable_blocks );
				}
			} else {
				// Get JS for the Block.
				$responsive_post_carousel_js .= get_responsive_post_carousel_block_js( $block );
			}
		}
	}

	if ( ! empty( $responsive_post_carousel_js ) ) {
		wp_add_inline_script( 'skt_blocks-slick-js', $responsive_post_carousel_js );
	}
}

/**
 * Get post Carousel block js
 *
 * @param WP_Block_Type $block Block.
 * @return string
 */
function get_responsive_post_carousel_block_js( $block ) {
    // @codingStandardsIgnoreStart

    global $responsive_post_carousel_js;

    $block = ( array ) $block;

    $name = $block['blockName'];

    if( ! isset( $name ) ) {
        return '';
    }

    if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
        $blockattr = $block['attrs'];
        if ( isset( $blockattr['block_id'] ) ) {
            $block_id = $blockattr['block_id'];
        }
    }

    switch ( $name ) {
        case 'skt-blocks/post-carousel':
            $responsive_post_carousel_js .= get_responsive_post_js( $blockattr, $blockattr['block_id'] );
            break;

        default:
            // Nothing to do here.
            break;
    }

    if ( isset( $block['innerBlocks'] ) ) {

        foreach ( $block['innerBlocks'] as $j => $inner_block ) {

            if ( 'core/block' == $inner_block['blockName'] ) {
                $id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

                if ( $id ) {
                    $content = get_post_field( 'post_content', $id );

                    $reusable_blocks = responsive_parse_gutenberg_blocks_post_carousel( $content );

                    get_responsive_post_carousel_scripts( $reusable_blocks );
                }
            } else {
                // Get JS for the Block.
                $responsive_post_carousel_js .= get_responsive_post_carousel_block_js( $inner_block );
            }
        }
    }
}

/**
 * Get post Js
 *
 * @since 1.0.3
 * @param array  $attr The block attributes.
 * @param string $id The selector ID.
 * @return string $js
 */
function get_responsive_post_js( $attr, $id ) { 			// @codingStandardsIgnoreStart.

    $defaults = get_responsive_post_carousel_default_attributes();

    $attr = array_merge( $defaults, (array) $attr );

    $dots = ( "dots" == $attr['arrowDots'] || "arrows_dots" == $attr['arrowDots'] ) ? true : false;
    $arrows = ( "arrows" == $attr['arrowDots'] || "arrows_dots" == $attr['arrowDots'] ) ? true : false;

    $slick_options = apply_filters( 'responsive_posts_slick_options',[
        'slidesToShow'   => $attr['columns'],
        'slidesToScroll' => 1,
        'autoplaySpeed'  =>  $attr['autoplaySpeed'],
        'autoplay'       => $attr['autoplay'],
        'infinite'       => $attr['infiniteLoop'],
        'pauseOnHover'   => $attr['pauseOnHover'],
        'speed'          => $attr['transitionSpeed'],
        'arrows'         => $arrows,
        'dots'           => $dots,
        'rtl'            => false,
        'prevArrow'		 => '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" tabindex="0" role="button" style="border-color: '.$attr["arrowDotsColor"].';border-radius:'.$attr["arrowBorderRadius"].'px;border-width:'.$attr["arrowBorderSize"].'px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height ="'.$attr["arrowSize"].'" width = "'.$attr["arrowSize"].'" fill ="'.$attr["arrowDotsColor"].'"  ><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></button>',
        'nextArrow'		 => '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" tabindex="0" role="button" style="border-color: '.$attr["arrowDotsColor"].';border-radius:'.$attr["arrowBorderRadius"].'px;border-width:'.$attr["arrowBorderSize"].'px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height ="'.$attr["arrowSize"].'" width = "'.$attr["arrowSize"].'" fill ="'.$attr["arrowDotsColor"].'" ><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></button>',
        'responsive'		=> [
            [
                'breakpoint' => 1024,
                'settings' => [
                    'slidesToShow'   => $attr['tcolumns'],
                    'slidesToScroll' => 1,
                ],
            ],
            [
                'breakpoint' => 767,
                'settings' => [
                    'slidesToShow'   => $attr['mcolumns'],
                    'slidesToScroll' => 1,
                ],
            ]
        ]
    ] );

    $settings = json_encode($slick_options);

    $selector =	'.responsive-post-slick-carousel-'.$id;
    $js = 'jQuery( document ).ready( function( $ ) { if( $( "' . $selector . '" ).length > 0 ){ $( "' . $selector . '" ).not(".slick-initialized").slick( '. $settings .'); } } );';

    return $js;
    // @codingStandardsIgnoreEnd.
}

/**
 * Get Defaults for post slick carousel
 *
 * @since 1.0.3
 * @return array
 */
function get_responsive_post_carousel_default_attributes() {
	return array(
		'blockAlign'            => 'left',
		'columns'            => 2,
		'autoplaySpeed'      => 2000,
		'autoplay'           => true,
		'infiniteLoop'       => true,
		'pauseOnHover'       => true,
		'transitionSpeed'    => 500,
		'tcolumns'           => 1,
		'mcolumns'           => 1,
		'arrowSize'          => 20,
		'arrowDots'          => 'arrows_dots',
		'arrowDotsColor'         => '#333',
		'arrowBorderSize'    => 1,
		'arrowBorderRadius'  => 0,
		'postsToShow'        => 6,
		'displayPostDate'    => true,
		'displayPostExcerpt' => true,
		'displayPostAuthor'  => true,
		'displayPostImage'   => false,
		'displayPostLink'    => true,
		'displayPostTitle'   => true,
		'postTitleTag'       => 'h3',
		'align'              => 'center',
		'order'              => 'desc',
		'orderBy'            => 'date',
		'readMoreText'       => 'Continue Reading',
		'offset'             => 0,
		'excerptLength'      => 20,
		'postType'           => 'post',
		'sectionTag'         => 'section',
		'sectionTitleTag'    => 'h2',
		'imageSize'          => 'full',
		'bgColor'            => '#ffffff',
		'contentPadding'     => 20,
		'contentPaddingMobile'     => 20,
	);
}

/**
 * Renders the post carousel block on server.
 *
 * @param string $attributes  Pass the block attributes.
 * @return string HTML content for the post carousel.
 */
function skt_blocks_render_block_core_latest_posts2( $attributes ) {

	/**
	 * Global post object.
	 * Used for excluding the current post from the carousel.
	 *
	 * @var WP_Post
	 */
	global $post;

	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';
	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';
	$dots       = ( 'dots' == $attributes['arrowDots'] || 'arrows_dots' == $attributes['arrowDots'] ) ? true : false;
	$arrows     = ( 'arrows' == $attributes['arrowDots'] || 'arrows_dots' == $attributes['arrowDots'] ) ? true : false;

	$slick_options = apply_filters(
		'responsive_posts_slick_options',
		array(
			'slidesToShow'   => $attributes['columns'],
			'slidesToScroll' => 1,
			'autoplaySpeed'  => $attributes['autoplaySpeed'],
			'autoplay'       => $attributes['autoplay'],
			'infinite'       => $attributes['infiniteLoop'],
			'pauseOnHover'   => $attributes['pauseOnHover'],
			'speed'          => $attributes['transitionSpeed'],
			'arrows'         => $arrows,
			'dots'           => $dots,
			'rtl'            => false,
			'responsive'     => array(
				array(
					'breakpoint' => 1024,
					'settings'   => array(
						'slidesToShow'   => $attributes['tcolumns'],
						'slidesToScroll' => 1,
					),
				),
				array(
					'breakpoint' => 767,
					'settings'   => array(
						'slidesToShow'   => $attributes['mcolumns'],
						'slidesToScroll' => 1,
					),
				),
			),
		)
	);

	$settings = wp_json_encode( $slick_options );

	/* Setup the query */
	$carousel_query = new WP_Query(
		array(
			'posts_per_page'      => $attributes['postsToShow'],
			'post_status'         => 'publish',
			'order'               => $attributes['order'],
			'orderby'             => $attributes['orderBy'],
			'cat'                 => $categories,
			'offset'              => $attributes['offset'],
			'post_type'           => $attributes['postType'],
			'ignore_sticky_posts' => 1,
		)
	);

	$wrapper_styles = '';

	/* Background styles. */
	if ( ! empty( $attributes['bgColor'] ) ) {
		$wrapper_styles .= 'background-color:' . $attributes['bgColor'] . ';';
	}

	/* Post carousel wrapper styles. */
	if ( ! empty( $wrapper_styles ) ) {
		$wrapper_style = $wrapper_styles;
	} else {
		$wrapper_style = null;
	}

	$excerpt_styles = '';
    $titleColor = '';
    $dateColor = '';
    $contentColor = '';
    $metaColor = '';
    $ctaStyles = '';
    $titleSpace = '';
    $dateSpace = '';
    $excerptSpace = '';
    $ctaSpace = '';
    $buttonTarget = '';
	/* Text Color */
	if ( ! empty( $attributes['blockAlign'] ) ) {
		$excerpt_styles .= 'text-align:' . $attributes['blockAlign'];
	}
    /* Title Color */
	if ( ! empty( $attributes['titleColor'] ) ) {
		$titleColor .= 'color:' . $attributes['titleColor'] . ';'.
            'line-height:' . $attributes['titleLineHeight'] . ';'.
            'font-family:' . $attributes['titleFontFamily'] . ';';
            'font-weight:' . $attributes['titleFontWeight'] . ';';
	}
/* Date Color */
	if ( ! empty( $attributes['dateColor'] ) ) {
		$dateColor .= 'color:' . $attributes['dateColor'] . ';';
	}
/* Content Color */
	if ( ! empty( $attributes['contentColor'] ) ) {
        $contentColor .= 'color:' . $attributes['contentColor'] . ';'.
            'line-height:' . $attributes['excerptLineHeight'] . ';'.
            'font-family:' . $attributes['excerptFontFamily'] . ';'.
            'font-weight:' . $attributes['excerptFontWeight'] . ';'.
            'font-size:' . $attributes['excerptFontSize'] . 'px;';
	}
/* Author Color */
	if ( ! empty( $attributes['metaColor'] ) ) {
        $metaColor .= 'color:' . $attributes['metaColor'] . ';';
	}

	if ( ! empty( $attributes['titleSpace'] ) ) {
        $titleSpace .= 'margin-bottom:' . $attributes['titleSpace'] . 'px;'.'margin-top:' . $attributes['imageSpace'] . 'px;';
	}
	if ( ! empty( $attributes['dateSpace'] ) ) {
        $dateSpace .= 'margin-bottom:' . $attributes['dateSpace'] . 'px;'.
            'line-height:' . $attributes['metaLineHeight'] . ';'.
            'font-family:' . $attributes['metaFontFamily'] . ';'.
            'font-weight:' . $attributes['metaFontWeight'] . ';'.
            'font-size:' . $attributes['metaFontSize'] . 'px;';
	}
	if ( ! empty( $attributes['excerptSpace'] ) ) {
        $excerptSpace .= 'margin-bottom:' . $attributes['excerptSpace'] . 'px;';
	}
	if ( ! empty( $attributes['ctaSpace'] ) ) {
        $ctaSpace .= 'margin-bottom:' . $attributes['ctaSpace'] . 'px;'.
            'line-height:' . $attributes['ctaLineHeight'] . ';'.
            'font-family:' . $attributes['ctaFontFamily'] . ';'.
            'font-weight:' . $attributes['ctaFontWeight'] . ';'.
            'font-size:' . $attributes['ctaFontSize'] . 'px;'
        ;
	}

/* CTA Styles */
        $ctaStyles .=
            'border-style:' . $attributes['ctaBorderStyle'] . ';'.
            'border-radius:' . $attributes['ctaBorderRadius'] . 'px;'.
            'border-width:' . $attributes['ctaBorderWidth'] . 'px;'.
            'padding-left:' . $attributes['ctaHpadding'] . 'px;'.
            'padding-right:' . $attributes['ctaHpadding'] . 'px;'.
            'padding-top:' . $attributes['ctaVpadding'] . 'px;'.
            'padding-bottom:' . $attributes['ctaVpadding'] . 'px;';

$buttonTarget = $attributes['buttonTarget']? "_blank" : null;
	/* Post carousel Excerpct styles. */
	if ( ! empty( $excerpt_styles ) ) {
		$excerpt_style = $excerpt_styles;
	} else {
		$excerpt_style = null;
	}

	$content_padding_styles = '';

	/* Content Padding. */
	if ( ! empty( $attributes['contentPadding'] ) ) {
		$content_padding_styles .= '';
	}

	/* Content wrapper styles. */
	if ( ! empty( $content_padding_styles ) ) {

		$content_padding_wrapper_style = $content_padding_styles;
	} else {
		$content_padding_wrapper_style = '';
	}



	$post_carousel_markup = '';

	/* Start the loop */
	if ( $carousel_query->have_posts() ) {

		while ( $carousel_query->have_posts() ) {
			$carousel_query->the_post();

			/* Setup the post ID */
			$post_id = get_the_ID();

			/* Setup the featured image ID */
			$post_thumb_id = get_post_thumbnail_id( $post_id );

			/* Setup the post classes */
			$post_classes = 'skt-blocks-post-carousel-item';

			/* Add sticky class */
			if ( is_sticky( $post_id ) ) {
				$post_classes .= ' sticky';
			} else {
				$post_classes .= null;
			}

			/* Join classes together */
			$post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );

			/* Start the markup for the post */
			$post_carousel_markup .= sprintf(
				'<article id="post-%1$s" class="%2$s"><div class="skt-blocks-post-carousel-inner" style="' . safecss_filter_attr( $wrapper_style ) . '">',
				esc_attr( $post_id ),
				esc_attr( $post_classes )
			);

			/* Get the featured image */
			if ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] && $post_thumb_id ) {

				$post_thumb_size = 'full';

				if ( ! empty( $attributes['imageSize'] ) ) {
					$post_thumb_size = $attributes['imageSize'];
				}

				/* Output the featured image */
				$post_carousel_markup .= sprintf(
					'<div class="skt-blocks-block-post-carousel-image-'.$attributes['imagePosition'].'"><a href="%1$s" rel="bookmark" aria-hidden="true" tabindex="-1">%2$s</a></div>',
					esc_url( get_permalink( $post_id ) ),
					wp_get_attachment_image( $post_thumb_id, $post_thumb_size )
				);
			}
            $alignStyle="text-align:".$attributes["blockAlign"];

			/* Wrap the text content */
			$post_carousel_markup .= sprintf(
				'<div class="skt-blocks-block-post-carousel-text-wrap" style="' . safecss_filter_attr( $content_padding_wrapper_style ) . ';'.$alignStyle.'">'
			);
				$post_carousel_markup .= sprintf(
					'<header class="skt-blocks-block-post-carousel-header" style="'.$alignStyle.'">'
				);

					/* Get the post title */
					$title = get_the_title( $post_id );
            $comments = get_comments_number( $post_id );
            if(0 == $comments)
                $comments = "No";
			if ( ! $title ) {
				$title = __( 'Untitled', 'skt-blocks' );
			}

			if ( isset( $attributes['displayPostTitle'] ) && $attributes['displayPostTitle'] ) {

				if ( isset( $attributes['postTitleTag'] ) ) {
					$post_title_tag = $attributes['postTitleTag'];
				} else {
					$post_title_tag = 'h2';
				}

				$post_carousel_markup .= sprintf(
					'<%3$s class="skt-blocks-block-post-carousel-title" style="'.$titleSpace.'"><a href="%1$s" rel="bookmark" style="'.$titleColor.';">%2$s</a></%3$s>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $title ),
					esc_attr( $post_title_tag )
				);
			}

			if ( isset( $attributes['postType'] ) && 'post' === $attributes['postType'] ) {
				/* Wrap the byline content */
				$post_carousel_markup .= sprintf(
					'<div class="skt-blocks-block-post-carousel-byline" style="'.$dateSpace.';'.$metaColor.'">'
				);

				/* Get the post author */
				if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
					$post_carousel_markup .= sprintf(
						'<div class="skt-blocks-block-post-carousel-author" itemprop="author" itemtype="https://schema.org/Person"><a class="skt-blocks-text-link" href="%2$s" itemprop="url" rel="author" style="'.$metaColor.';"><span itemprop="name">%1$s</span></a></div>',
						esc_html( get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ) ),
						esc_html( get_author_posts_url( get_the_author_meta( 'ID' ) ) )
					);
				}

				/* Get the post date */
				if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
						$post_carousel_markup .= sprintf(
							'<time datetime="%1$s" class="skt-blocks-block-post-carousel-date" itemprop="datePublished" style="'.$dateColor.';">%2$s</time>',
							esc_attr( get_the_date( 'c', $post_id ) ),
							esc_html( get_the_date( '', $post_id ) )
						);
				}

				/* Get the post comments */
				if ( isset( $attributes['displayPostComment'] ) && $attributes['displayPostComment'] ) {
						$post_carousel_markup .= sprintf(
							'<p class="skt-blocks-block-post-carousel-comments">%1$s comments</p>',
							esc_html( $comments )
						);
				}

				/* Get the post taxonomy */
				if ( isset( $attributes['displayPostTaxonomy'] ) && $attributes['displayPostTaxonomy'] ) {
						$post_carousel_markup .= sprintf(
							'<div class="skt-blocks-block-post-carousel-taxonomy">%s</p>',
                            get_the_category_list( esc_html__( ', ', 'skt-blocks' ), '', $post_id )
						);
				}

				/* Close the byline content */
				$post_carousel_markup .= sprintf(
					'</div>'
				);
			}

			/* Close the header content */
			$post_carousel_markup .= sprintf(
				'</header>'
			);

			/* Wrap the excerpt content */
			$post_carousel_markup .= sprintf(
				'<div class="skt-blocks-block-post-carousel-excerpt" style="' . safecss_filter_attr( $excerpt_style ) . ';'.$alignStyle. ';'.$contentColor.';'.$excerptSpace.'">'
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
							get_the_content()
						),
						$attributes['excerptLength']
					)
				);
			}

			if ( ! $excerpt ) {
				$excerpt = null;
			}

			if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
				$post_carousel_markup .= wp_kses_post( $excerpt );
			}

			/* Get the read more link */
			if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {
				$post_carousel_markup .= sprintf(
					'<p style="'.$ctaSpace.'"><a class="skt-blocks-block-post-carousel-more-link skt-blocks-text-link" href="%1$s" target="'.$buttonTarget.'"rel="bookmark" style="'.$ctaStyles.'">%2$s <span class="screen-reader-text">%3$s</span></a></p>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $attributes['readMoreText'] ),
					esc_html( $title )
				);
			}

			/* Close the excerpt content */
			$post_carousel_markup .= sprintf(
				'</div>'
			);

			/* Close the text content */
			$post_carousel_markup .= sprintf(
				'</div>'
			);

			/* Close the post */
			$post_carousel_markup .= "</div></article>\n";
			$post_carousel_markup .= "";
		}

		/* Restore original post data */
		wp_reset_postdata();

		/* Build the block classes */
		$class = "skt-blocks-block-post-carousel responsive-post-grid  responsive-post__image-position-{$attributes['imagePosition']} featured{$attributes['postType']} align{$attributes['align']}";

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		/* Layout orientation class */
		$carousel_class = 'responsive-post-slick-carousel-'.$attributes['block_id'].' responsive-post_carousel-equal-height-'.$attributes['equalHeight'];

		if ( isset( $attributes['postLayout'] ) && 'list' === $attributes['postLayout'] ) {
			$carousel_class .= ' is-list';
		} else {
			$carousel_class .= ' is-carousel';
		}

		/* carousel columns class */
		if ( isset( $attributes['columns'] ) ) {
			$carousel_class .= ' columns-' . $attributes['columns'];
		}

		/* Post carousel section title */
		if ( isset( $attributes['displaySectionTitle'] ) && $attributes['displaySectionTitle'] && ! empty( $attributes['sectionTitle'] ) ) {
			if ( isset( $attributes['sectionTitleTag'] ) ) {
				$section_title_tag = $attributes['sectionTitleTag'];
			} else {
				$section_title_tag = 'h2';
			}

			$section_title = '<' . esc_attr( $section_title_tag ) . ' class="skt-blocks-post-carousel-section-title">' . esc_html( $attributes['sectionTitle'] ) . '</' . esc_attr( $section_title_tag ) . '>';
		} else {
			$section_title = null;
		}

		/* Post carousel section tag */
		if ( isset( $attributes['sectionTag'] ) ) {
			$section_tag = $attributes['sectionTag'];
		} else {
			$section_tag = 'section';
		}
$imgopacity = $attributes["opacity"]/100;
		$styles =
            '<style type="text/css">.skt-blocks-block-post-carousel-image-background img {
                opacity: '.$imgopacity.';
            }.skt-blocks-block-post-carousel-excerpt p{
                margin-bottom: '.$attributes["excerptSpace"].'px;
            }
            ul.slick-dots li button:before, ul.slick-dots li.slick-active button:before{
                color: '.$attributes["arrowDotsColor"].';
                
            }
            .skt-blocks-block-post-carousel-more-link{
                color: '.$attributes["ctaColor"].';
                background-color: '.$attributes["ctaBackColor"].';
                border-color: '.$attributes["ctaBorderColor"].';
            }.skt-blocks-block-post-carousel-more-link:hover{
                color: '.$attributes["ctaHoverColor"].';
                background-color: '.$attributes["ctaHoverBackColor"].';
                border-color: '.$attributes["ctaHoverBorderColor"].';
            }
            .responsive-post-slick-carousel .slick-arrow{
                border-radius: '.$attributes["arrowBorderRadius"].'px;
            }
            .slick-slide{
            margin-bottom: '.$attributes["rowGap"].'px;
            }
            .skt-blocks-block-post-carousel-taxonomy a{
            color: '.$attributes["metaColor"].';
            }
            .responsive-post-slick-carousel-'.$attributes['block_id'].' .slick-slide>div:first-child{
                        margin-left: '.($attributes["columnGap"]/2).'px;
                        margin-right: '.($attributes["columnGap"]/2) .'px;
                      }
            @media(min-width:767px){
                      .skt-blocks-block-post-carousel-text-wrap{
                          padding: '.$attributes["contentPadding"].'px;
                      }
                    }
            @media(max-width:767px){
                      .skt-blocks-block-post-carousel-text-wrap{
                          padding: '.$attributes["contentPaddingMobile"].'px;
                      }
                    }
                    @media (min-width:976px){
			    .responsive-post-slick-carousel-'.$attributes['block_id'].' .skt-blocks-block-post-carousel-header .skt-blocks-block-post-carousel-title{
			        font-size:' . $attributes['titleFontSize'] . 'px;
			    }
			}@media (max-width:976px){
			    .responsive-post-slick-carousel-'.$attributes['block_id'].' .skt-blocks-block-post-carousel-header .skt-blocks-block-post-carousel-title {
			        font-size:' . $attributes['titleFontSizeTablet'] . 'px;
			    }
			}@media (max-width:767px){
			    .responsive-post-slick-carousel-'.$attributes['block_id'].' .skt-blocks-block-post-carousel-header .skt-blocks-block-post-carousel-title
			     {
			        font-size:' . $attributes['titleFontSizeMobile'] . 'px;
			    }
			}
            </style>';
		/* Output the post markup */
		$block_content = sprintf(
			'<%1$s class="%2$s" data-carouselid="%7$s">%3$s<div class="%4$s" %6$s>%5$s</div>'.$styles.'</%1$s>',
			$section_tag,
			esc_attr( $class ),
			$section_title,
			esc_attr( $carousel_class ),
			$post_carousel_markup,
			'data-slick=' . $settings,
            $attributes['block_id']
		);
		return $block_content;
	}
}

/**
 * Registers the post carousel block on server
 */
function skt_blocks_register_block_core_latest_posts2() {

	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	/* Block attributes */
	register_block_type(
		'skt-blocks/post-carousel',
		array(
			'attributes'      => array(
				'blockAlign'            => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'columns'            => array(
					'type'    => 'number',
					'default' => 2,
				),
                'block_id'            => array(
					'type'    => 'string',
					'default' => 1,
				),

				'tcolumns'           => array(
					'type'    => 'number',
					'default' => 1,
				),
				'mcolumns'           => array(
					'type'    => 'number',
					'default' => 1,
				),
				'pauseOnHover'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'infiniteLoop'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'transitionSpeed'    => array(
					'type'    => 'number',
					'default' => 500,
				),
				'autoplay'           => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'autoplaySpeed'      => array(
					'type'    => 'number',
					'default' => 2000,
				),
				'arrowDots'          => array(
					'type'    => 'string',
					'default' => 'arrows_dots',
				),
				'arrowSize'          => array(
					'type'    => 'number',
					'default' => 20,
				),
				'arrowBorderSize'    => array(
					'type'    => 'number',
					'default' => 1,
				),
				'arrowBorderRadius'  => array(
					'type'    => 'number',
					'default' => 0,
				),

				'categories'         => array(
					'type' => 'string',
				),
				'className'          => array(
					'type' => 'string',
				),
				'postsToShow'        => array(
					'type'    => 'number',
					'default' => 6,
				),
				'equalHeight'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostDate'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostComment'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTaxonomy'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostAuthor'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostImage'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostLink'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postTitleTag'       => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'align'              => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'order'              => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'            => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'readMoreText'       => array(
					'type'    => 'string',
					'default' => 'Continue Reading',
				),
				'offset'             => array(
					'type'    => 'number',
					'default' => 0,
				),
				'excerptLength'      => array(
					'type'    => 'number',
					'default' => 20,
				),
				'postType'           => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'sectionTag'         => array(
					'type'    => 'string',
					'default' => 'section',
				),
				'sectionTitle'       => array(
					'type' => 'string',
				),
				'sectionTitleTag'    => array(
					'type'    => 'string',
					'default' => 'h2',
				),
				'imageSize'          => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'url'                => array(
					'type'      => 'string',
					'source'    => 'attribute',
					'selector'  => 'img',
					'attribute' => 'src',
				),
				'id'                 => array(
					'type' => 'number',
				),
				'bgColor'            => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'titleColor'          => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'contentColor'          => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'metaColor'          => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'arrowDotsColor'          => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'ctaColor'          => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'ctaBackColor'          => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'ctaHoverColor'          => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'ctaHoverBackColor'          => array(
					'type'    => 'string',
					'default' => '#444444',
				),
				'ctaBorderColor'          => array(
					'type'    => 'string',
					'default'    => '',
				),
				'ctaHoverBorderColor'          => array(
					'type'    => 'string',
					'default'    => '',
				),
				'ctaBorderStyle'          => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'ctaBorderRadius'     => array(
					'type'    => 'number',
					'default' => 0,
				),
                'ctaBorderWidth'     => array(
					'type'    => 'number',
					'default' => 2,
				),
                'ctaHpadding'     => array(
					'type'    => 'number',
					'default' => 20,
				),
                'ctaVpadding'     => array(
					'type'    => 'number',
					'default' => 15,
				),
                'contentPadding'     => array(
					'type'    => 'number',
					'default' => 20,
				),
                'contentPaddingMobile'     => array(
					'type'    => 'number',
					'default' => 20,
				),
                'rowGap'     => array(
					'type'    => 'number',
					'default' => 20,
				),
                'columnGap'     => array(
					'type'    => 'number',
					'default' => 20,
				),
                'imageSpace'     => array(
					'type'    => 'number',
				),
                'titleSpace'     => array(
					'type'    => 'number',
				),
                'dateSpace'     => array(
					'type'    => 'number',
                    'default'    => 20,
				),
                'excerptSpace'     => array(
					'type'    => 'number',
					'default'    => 20,
				),
                'ctaSpace'     => array(
					'type'    => 'number',
					'default'    => 20,
				),
                'titleFontSize'     => array(
					'type'    => 'number',
                    'default' => 20,
				),
                'titleFontSizeMobile'     => array(
					'type'    => 'number',
                    'default' => 20,
				),
                'titleFontSizeTablet'     => array(
					'type'    => 'number',
                    'default' => 20,
				),
                'titleFontWeight'     => array(
					'type'    => 'number',
                    'default' => 100,
				),
                'titleLineHeight'     => array(
					'type'    => 'number',
                    'default' => 1,
				),
                'metaFontSize'     => array(
					'type'    => 'number',
                    'default' => 16,
				),
                'metaFontWeight'     => array(
					'type'    => 'number',
                    'default' => 100,
				),
                'metaLineHeight'     => array(
					'type'    => 'number',

                    'default' => 1,
				),
                'excerptFontSize'     => array(
					'type'    => 'number',
                    'default' => 16,
				),
                'excerptFontWeight'     => array(
					'type'    => 'number',
                    'default' => 100,
				),
                'excerptLineHeight'     => array(
					'type'    => 'number',
                    'default' => 1,
				),
                'ctaFontSize'     => array(
					'type'    => 'number',
                    'default' => 16,
				),
                'ctaFontWeight'     => array(
					'type'    => 'number',
                    'default' => 100,
				),
                'ctaLineHeight'     => array(
					'type'    => 'number',
                    'default' => 1,
				),
                'opacity'     => array(
					'type'    => 'number',
                    'default' => 50,
				),
                'imagePosition'     => array(
					'type'    => 'string',
                    'default' => 'background',
				),
                'titleFontFamily'     => array(
					'type'    => 'string',
                    'default' => '',
				),
                'metaFontFamily'     => array(
					'type'    => 'string',
                    'default' => '',
				),
                'excerptFontFamily'     => array(
					'type'    => 'string',
                    'default' => '',
				),
                'ctaFontFamily'     => array(
					'type'    => 'string',
                    'default' => '',
				),
                'buttonTarget'     => array(
					'type'    => 'boolean',
                    'default' => false,
				),
			),
			'render_callback' => 'skt_blocks_render_block_core_latest_posts2',
		)
	);
}
add_action( 'init', 'skt_blocks_register_block_core_latest_posts2' );


/**
 * Create API fields for additional info
 */
function skt_blocks_register_rest_fields2() {
	/* Add landscape featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src',
		array(
			'get_callback'    => 'skt_blocks_get_image_src_landscape2',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add square featured image source */
	register_rest_field(
		array( 'post', 'page' ),
		'featured_image_src_square',
		array(
			'get_callback'    => 'skt_blocks_get_image_src_square2',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	/* Add author info */
	register_rest_field(
		'post',
		'author_info',
		array(
			'get_callback'    => 'skt_blocks_get_author_info2',
			'update_callback' => null,
			'schema'          => null,
		)
	);
	/* Add post category info */
	register_rest_field(
		'post',
		'category_list',
		array(
			'get_callback'    => 'skt_blocks_get_post_category_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
	/* Add comments info */
	register_rest_field(
		'post',
		'comments_num',
		array(
			'get_callback'    => 'skt_blocks_get_comments_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'skt_blocks_register_rest_fields2' );


/**
 * Get landscape featured image source for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_image_src_landscape2( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'skt-blocks-block-post-carousel-landscape',
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
function skt_blocks_get_image_src_square2( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'skt-blocks-block-post-carousel-square',
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
function skt_blocks_get_author_info2( $object, $field_name, $request ) {
	/* Get the author name */
	$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );

	/* Get the author link */
	$author_data['author_link'] = get_author_posts_url( $object['author'] );

	/* Return the author data */
	return $author_data;
}

/**
 * Get post category info for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_post_category_info( $object, $field_name, $request ) {

    return get_the_category_list( esc_html__( ', ', 'skt-blocks' ), '', $object['id'] );

}

/**
 * Get comment number info for the rest field
 *
 * @param String $object  The object type.
 * @param String $field_name  Name of the field to retrieve.
 * @param String $request  The current request object.
 */
function skt_blocks_get_comments_info( $object, $field_name, $request ) {

    $num = get_comments_number( $object['id'] );

    /* translators: %d: number of comments */
    return sprintf( _n( '%d comment', '%d comments', $num, 'skt-blocks' ), $num );
}