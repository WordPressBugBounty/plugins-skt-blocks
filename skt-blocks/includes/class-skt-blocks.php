<?php
/**
 * Core plugin class.
 *
 * @link       https://www.sktthemes.org
 * @since      1.0.0
 *
 * @package    Skt_Blocks
 * @subpackage Skt_Blocks/includes
 */

/**
 * The core plugin class Skt_Blocks.
 *
 * @since      1.0.0
 * @package    Skt_Blocks
 * @subpackage Skt_Blocks/includes
 * @author     SKT Themes <support@sktthemes.com>
 */
class Skt_Blocks {

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'SKT_BLOCKS_VER' ) ) {
			$this->version = SKT_BLOCKS_VER;
		} else {
			$this->version = '1.4';
		}
		$this->plugin_name = 'skt-blocks';

		add_action( 'plugins_loaded', array( $this, 'skt_blocks_loader' ) );

		add_action( 'init', array( $this, 'skt_blocks_block_assets' ) );

		add_filter( 'block_categories_all', array( $this, 'skt_blocks_add_custom_block_category'), 10, 2 );

		add_action( 'enqueue_block_editor_assets', array( $this, 'skt_blocks_editor_assets' ) );

		add_action( 'enqueue_block_assets', array( $this, 'skt_blocks_frontend_assets' ) );

		add_action( 'admin_enqueue_scripts', array( &$this, 'skt_blocks_admin_enqueue_styles' ) );

		// SKT Blocks Menu.
		add_action( 'admin_menu', array( $this, 'skt_blocks_admin_menu' ) );

		// Remove all admin notices from specific pages.
		add_action( 'admin_init', array( $this, 'skt_blocks_admin_init' ) );

		// Redirect to Getting Started Page on Plugin Activation.
		add_action( 'admin_init', array( $this, 'skt_blocks_maybe_redirect_to_getting_started' ) );

		add_action( 'wp_ajax_responsive_block_editor_post_pagination', array( $this, 'post_pagination' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'load_dashicons_front_end' ) );

	}
	
public function post_pagination() {
    // Verify the AJAX nonce
    check_ajax_referer('responsive_block_editor_ajax_nonce', 'nonce');

    // Check if attributes are set
    if ( isset( $_POST['attributes'] ) ) {
        // Sanitize the attributes input
        $attributes = sanitize_text_field(wp_unslash( $_POST['attributes'] ));
        // Ensure $attributes is an array (or appropriate type)
        if ( is_array( $attributes ) ) {
            // Sanitize each attribute (assuming it's an associative array)
            $sanitized_attributes = array_map( 'sanitize_text_field', $attributes );

            // Fetch the query based on the sanitized attributes
            $query = $this->get_query( $sanitized_attributes, 'grid' );

            // Render the pagination markup
            $pagination_markup = $this->render_pagination( $query, $sanitized_attributes );

            // Send JSON response with success
            wp_send_json_success( $pagination_markup );
        } else {
            // Handle the case where attributes are not an array
            wp_send_json_error('Invalid attributes format');
        }
    } else {
        // If attributes are not set, send an error response
        wp_send_json_error('No attributes received');
    }
}
	

	/**
	 * Renders the post post pagination on server.
	 *
	 * @param object $query WP_Query object.
	 * @param array  $attributes Array of block attributes.
	 * @since 1.0.0
	 */
	public function render_pagination( $query, $attributes ) {

		$permalink_structure = get_option( 'permalink_structure' );
		$base                = untrailingslashit( wp_specialchars_decode( get_pagenum_link() ) );
		$base                = $this->build_base_url( $permalink_structure, $base );
		$format              = $this->paged_format( $permalink_structure, $base );
		$paged               = $this->get_paged( $query );
		$page_limit          = min( $attributes['pageLimit'], $query->max_num_pages );
		$page_limit          = isset( $page_limit ) ? $page_limit : $attributes['postsToShow'];
		$attributes['postsToShow'];

		$links = paginate_links(
			array(
				'base'      => $base . '%_%',
				'format'    => $format,
				'current'   => ( ! $paged ) ? 1 : $paged,
				'total'     => $page_limit,
				'type'      => 'array',
				'mid_size'  => 4,
				'end_size'  => 4,
				'prev_text' => $attributes['previousButtonText'],
				'next_text' => $attributes['nextButtonText'],
			)
		);

		if ( isset( $links ) ) {
			return wp_kses_post( implode( PHP_EOL, $links ) );
		}

		return '';
	}

	/**
	 * Gives the paged Query var.
	 *
	 * @param Object $query Query.
	 * @return int $paged Paged Query var.
	 * @since 1.0.0
	 */
	public static function get_paged( $query ) {

		global $paged;

		// Check the 'paged' query var.
		$paged_qv = $query->get( 'paged' );

		if ( is_numeric( $paged_qv ) ) {
			return $paged_qv;
		}

		// Check the 'page' query var.
		$page_qv = $query->get( 'page' );

		if ( is_numeric( $page_qv ) ) {
			return $page_qv;
		}

		// Check the $paged global?
		if ( is_numeric( $paged ) ) {
			return $paged;
		}

		return 0;
	}


	/**
	 * Returns the Paged Format.
	 *
	 * @param string $permalink_structure Premalink Structure.
	 * @param string $base Base.
	 * @since 1.0.0
	 */
	public static function paged_format( $permalink_structure, $base ) {

		$page_prefix = empty( $permalink_structure ) ? 'paged' : 'page';

		if ( ! empty( $permalink_structure ) ) {
			$format  = substr( $base, -1 ) !== '/' ? '/' : '';
			$format .= $page_prefix . '/';
			$format .= '%#%';
			$format .= substr( $permalink_structure, -1 ) === '/' ? '/' : '';
		} elseif ( empty( $permalink_structure ) || is_search() ) {
			$parse_url = wp_parse_url( $base, PHP_URL_QUERY );
			$format    = empty( $parse_url ) ? '?' : '&';
			$format   .= $page_prefix . '=%#%';
		}

		return $format;
	}

	/**
	 * Builds the base url.
	 *
	 * @param string $permalink_structure Premalink Structure.
	 * @param string $base Base.
	 * @since 1.0.0
	 */
	public static function build_base_url( $permalink_structure, $base ) {
		// Check to see if we are using pretty permalinks.
		if ( ! empty( $permalink_structure ) ) {

			if ( strrpos( $base, 'paged-' ) ) {
				$base = substr_replace( $base, '', strrpos( $base, 'paged-' ), strlen( $base ) );
			}

			// Remove query string from base URL since paginate_links() adds it automatically.
			// This should also fix the WPML pagination issue that was added since 1.0.3.
			if ( count( $_GET ) > 0 ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				$base = strtok( $base, '?' );
			}

			// Add trailing slash when necessary.
			if ( '/' === substr( $permalink_structure, -1 ) ) {
				$base = trailingslashit( $base );
			} else {
				$base = untrailingslashit( $base );
			}
		} else {
			$url_params = wp_parse_url( $base, PHP_URL_QUERY );

			if ( empty( $url_params ) ) {
				$base = trailingslashit( $base );
			}
		}

		return $base;
	}

	/**
	 * Returns Query.
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $block_type The Block Type.
	 * @since 1.0.0
	 */
	public static function get_query( $attributes, $block_type ) {

		// Block type is grid/masonry/carousel/timeline.
		$query_args = array(
			'posts_per_page'      => ( isset( $attributes['postsToShow'] ) ) ? $attributes['postsToShow'] : 6,
			'post_status'         => 'publish',
			'post_type'           => ( isset( $attributes['postType'] ) ) ? $attributes['postType'] : 'post',
			'order'               => ( isset( $attributes['order'] ) ) ? $attributes['order'] : 'desc',
			'orderby'             => ( isset( $attributes['orderBy'] ) ) ? $attributes['orderBy'] : 'date',
			'ignore_sticky_posts' => 1,
			'paged'               => 1,
		);

		if ( isset( $attributes['categories'] ) && '' !== $attributes['categories'] ) {
			$query_args['tax_query'][] = array(
				'taxonomy' => ( isset( $attributes['taxonomyType'] ) ) ? $attributes['taxonomyType'] : 'category',
				'field'    => 'id',
				'terms'    => $attributes['categories'],
				'operator' => 'IN',
			);
		}

		if ( 'grid' === $block_type && isset( $attributes['postPagination'] ) && true === $attributes['postPagination'] ) {

			if ( get_query_var( 'paged' ) ) {

				$paged = get_query_var( 'paged' );

			} elseif ( get_query_var( 'page' ) ) {

				$paged = get_query_var( 'page' );

			} else {

				$paged = 1;

			}
			$query_args['posts_per_page'] = $attributes['postsToShow'];
			$query_args['paged']          = $paged;

		}

		if ( 'masonry' === $block_type && isset( $attributes['paginationType'] ) && 'none' !== $attributes['paginationType'] && isset( $attributes['paged'] ) ) {

			$query_args['paged'] = $attributes['paged'];

		}

		$query_args = apply_filters( "responsive_block_editor_post_query_args_{$block_type}", $query_args, $attributes );

		return new WP_Query( $query_args );
	}

	/**
	 * Register the menu for the plugin.
	 *
	 * @return void [description]
	 */
	public function skt_blocks_admin_menu() {
		// Create Sub Menu with parent slug null .
		add_submenu_page(
			'options-general.php',
			__( 'SKT Blocks', 'skt-blocks' ),
			__( 'SKT Blocks', 'skt-blocks' ),
			'manage_options',
			'skt_blocks',
			array( $this, 'skt_blocks_getting_started' ),
			75
		);

	}

	/**
	 * Display Getting Started Page.
	 *
	 * Output the content for the getting started page.
	 *
	 * @access public
	 */
	public function skt_blocks_getting_started() {

		?>
		<div class="skt-blocks-admin-page skt-blocks-welcome">
			<div class="skt-blocks-welcome-container">
				<div class="skt-blocks-welcome-block skt-blocks-welcome-block-first">					 
					<div class="skt-blocks-welcome-block-inner">
						<h3><?php echo esc_html__( 'Welcome to Skt Blocks', 'skt-blocks' ); ?></h3>
						<p class="skt-blocks-subtitle">
							<?php
								/* translators: %s: search term */
								$name_and_current_version = sprintf( __( 'Skt Blocks %s', 'skt-blocks' ), SKT_BLOCKS_VER );
								echo esc_html( $name_and_current_version );
							?>							
						</p>
						<p class="skt-blocks-subtitle">
							<?php echo esc_html__( 'Thank you for choosing SKT Blocks Gutenberg Block Editor Plugin', 'skt-blocks' ); ?>
						</p>
					</div>
					<div class="skt-blocks-welcome-video">
					<div class="skt-blocks-welcome-block-inner full">
						<div class="skt-blocks-button-wrap">
							<div class="skt-blocks-welcome-left">
								<a href="<?php echo esc_url('https://sktblocks.blazingthemes.com/'); ?>" class="skt-blocks-button skt-blocks-button-large"><?php echo esc_html__( 'View Demos', 'skt-blocks' ); ?>
								</a>
							</div>
							<div class="skt-blocks-welcome-right">
								<a href="<?php echo esc_url('https://sktthemesdemo.net/documentation/skt-blocks-plugin-doc/'); ?>" target="_blank" rel="noopener noreferrer" class="skt-blocks-button skt-blocks-button-alt skt-blocks-button-large">
									<?php echo esc_html__( 'Documentation', 'skt-blocks' ); ?>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div class="skt-blocks-welcome-block-inner">
						<h3><?php echo esc_html__( 'Features', 'skt-blocks' ); ?></h3>
						<p class="skt-blocks-subtitle features-block"><?php echo esc_html__( 'Check all of the 30+ blocks that come by default with this block plugin. Use them as per your requirement', 'skt-blocks' ); ?></p>
					</div>
					<div class="skt-blocks-welcome-block-inner skt-blocks-welcome-features">
						<?php
						$feature_list_array = array(
							array( 'Advanced Column', 'Build custom, full-page layouts for your posts and pages with the Advanced Columns Block', 'res-icon1.png' ),
							array( 'Post Timeline', 'Display the timeline for blog posts in an ordered list according to the dates they are published on', 'res-icon2.png' ),
							array( 'Advanced Heading', 'Add catchy and attractive headings with elegant designs and typography using the Gutenberg Advanced Heading block', 'res-icon3.png' ),
							array( 'Section', 'Build a page with different content areas using the section block that allows you to manage layouts, backgrounds, spacing, and more', 'res-icon1.png' ),
							array( 'Flipbox', 'Create beautiful animated content that flips on hover with the Gutenberg Flipbox block', 'res-icon4.png' ),
							array( 'Testimonial', 'Showcase your customer reviews with neatly displayed testimonial blocks on your website in just a few clicks', 'res-icon5.png' ),
							array( 'Info Block', 'Add a block of information that includes colorful icons, images, headings, text, and more with beautifully designed boxes', 'res-icon6.png' ),
							array( 'Button Group', 'Design strikingly attractive buttons and group them together within a container', 'res-icon6.png' ),
							array( 'Image Boxes', 'Create beautiful gallery of images to showcase your portfolio, photos, and more with the Gutenberg Image Boxes block', 'res-icon7.png' ),
							array( 'Count Up', 'Display facts and figures with animated counters using the Gutenberg Count Up block', 'res-icon8.png' ),
							array( 'Post Carousel', 'Display the content of your blog posts automatically in a carousel slideshow using Gutenberg Post Carousel block', 'res-icon9.png' ),
							array( 'Shape Divider', 'Easily create a division or barrier between your sections using this Gutenberg block divider that includes a large number of styling options', 'res-icon10.png' ),
							array( 'Call To Action', 'Add an eye-catching, full-width section with a big title, paragraph text, and a customizable button with the Gutenberg Call to Action block', 'res-icon11.png' ),
							array( 'Accordion', 'Add content that can expand and collapse (for e.g. FAQs) with tons of display options using the Gutenberg Accordion block', 'res-icon11.png' ),
							array( 'Image Slider', 'Showcase a selection of images using a slider\ with the Gutenberg Image Slider block', 'res-icon7.png' ),
							array( 'Team', 'Beautifully display details about your team members like role, department, etc. with Gutenberg Team block', 'res-icon7.png' ),
							array( 'Card', 'Display information, photos, and more in a compact, easy-to-understand layout with the Gutenberg Card block', 'res-icon9.png' ),
							array( 'Icon List', 'Display a bulleted list with icons and images as for checklists, feature lists, or any other list with the Gutenberg Icon List Block', 'res-icon12.png' ),
							array( 'Masonry', 'Display a collage of images and showcase your portfolio, product images, and more with the Gutenberg Masonry Blocks', 'res-icon11.png' ),
							array( 'Content Timeline', 'Create visual flowcharts, vertical timelines and event layouts using the Gutenberg Content Timeline Block', 'res-icon2.png' ),
							array( 'Pricing Table', 'Create responsive and dynamic pricing tables to showcase your product catalog and prices with the Gutenberg Pricing Table block', 'res-icon13.png' ),
							array( 'Post and Page Grid', 'Display your blog posts or pages with creative styling options using Gutenberg Post Grid block', 'res-icon14.png' ),
							array( 'Multi Buttons', 'Add attractive call to action buttons within a block with the Gutenberg Multi Buttons block.', 'res-icon15.png' ),
							array( 'Expand/Show More', 'Display small snippets of text to your visitors first before displaying the entire information.', 'res-icon16.png' ),
							array( 'Blockquote', 'Display small snippets of text to your visitors first before displaying the entire information.', 'res-icon17.png' ),
							array( 'Pricing List', 'Design a beautiful and detailed pricing list of your products, services, and memberships with the Gutenberg Pricing List block.', 'res-icon18.png' ),
							array( 'Video Popup', 'Display a thumbnail to play a full-screen video from YouTube or Vimeo that will give your users the ability to view the video in a pop-up window.', 'res-icon19.png' ),
							array( 'Google Map', 'Display a Google Map of address location using the Gutenberg Count Up block', 'res-icon20.png' ),
							array( 'Testimonial Slider', 'The Gutenberg Testimonial Slider block allows you to showcase your customers views as slider, or carousel.', 'res-icon21.png' ),
						);

						foreach ( $feature_list_array as $single_feature ) {

							?>
							<div class="skt-blocks-welcome-feature">
								<div class="skt-blocks-welcome-feature-img">
									<img src="<?php echo esc_url( SKT_BLOCKS_URL . 'admin/images/' . $single_feature[2] ); ?>">
								</div>
								<div class="skt-blocks-welcome-feature-text">
									<h4>
                                        <?php
                                        	/* translators: %s: search term */
											$title = sprintf( __( '%s Feature', 'skt-blocks' ), $single_feature[0] );
											echo esc_html( $title );
										?>
									</h4>
									<p>
										<?php
											/* translators: %s: search term */
											$short_desc = sprintf( __( '%s.', 'skt-blocks' ), $single_feature[1] );
											echo esc_html( $short_desc );
										?>
									</p>
								</div>
							</div>
						<?php } ?>
					</div>					
				</div>
			</div>
		</div>		 
		<?php
	}

	/**
	 * Skt_blocks_maybe_redirect_to_getting_started description
	 *
	 * @return [type] [description]
	 */
	public function skt_blocks_maybe_redirect_to_getting_started() {
		if ( ! get_transient( 'skt_blocks_activation_redirect' ) ) {
			return;
		}

		if ( wp_doing_ajax() ) {
			return;
		}

		delete_transient( 'skt_blocks_activation_redirect' );
		  if ( sanitize_text_field(wp_unslash(isset( $_POST['object_type_nonce'] ))) && wp_verify_nonce( sanitize_text_field(wp_unslash($_POST['object_type_nonce'], 'object_type_nonce_action' ))) ) {
            $object_type = sanitize_text_field(wp_unslash(! empty( $_REQUEST['object_type'] ) ?  $_REQUEST['object_type']  : ''));
        } else {
            if ( is_network_admin() || isset( $_GET['activate-multi'] ) ) {
				return;
			}
        }
		

		wp_safe_redirect( admin_url( 'admin.php?page=skt_blocks' ) );

		exit;
	}

	/**
	 * Initialize the blocks
	 *
	 * @since    1.0.0
	 */
	public function skt_blocks_loader() {
		/**
		* Load Post Grid PHP
		*/
		require_once SKT_BLOCKS_DIR . 'src/blocks/post-grid/index.php';
		require_once SKT_BLOCKS_DIR . 'src/blocks/post-carousel/index.php';
		require_once SKT_BLOCKS_DIR . 'src/blocks/gallery-masonry/index.php';
		require_once SKT_BLOCKS_DIR . 'src/blocks/accordion/index.php';
		require_once SKT_BLOCKS_DIR . 'src/blocks/post-timeline/index.php';
		require_once SKT_BLOCKS_DIR . 'src/blocks/image-slider/index.php';
		require_once SKT_BLOCKS_DIR . 'src/blocks/testimonial-slider/index.php';
		require_once SKT_BLOCKS_DIR . 'src/utils/fonts.php';
		require_once SKT_BLOCKS_DIR . 'classes/class-skt-blocks-frontend-styles-helper.php';
		require_once SKT_BLOCKS_DIR . 'classes/class-skt-blocks-frontend-styles.php';
	}

	/** Adds the SKT Blocks block category.
	 *
	 * @param array $categories Existing block categories.
	 *
	 * @return array Updated block categories.
	 */
	public function skt_blocks_add_custom_block_category( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'skt_blocks',
					'title' => __( 'SKT Blocks', 'skt-blocks' ),
					'icon'  => 'screenoptions',
				),
			), $categories
		);
	}


	/**
	 * Get Post Types.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static function get_post_types() {

		$post_types = get_post_types(
			array(
				'public'       => true,
				'show_in_rest' => true,
			),
			'objects'
		);

		$options = array();

		foreach ( $post_types as $post_type ) {
			if ( 'product' === $post_type->name ) {
				continue;
			}

			if ( 'attachment' === $post_type->name ) {
				continue;
			}

			$options[] = array(
				'value' => $post_type->name,
				'label' => $post_type->label,
			);
		}

		return $options;
	}


	/**
	 * Enqueue assets for backend editor
	 *
	 * @since 1.0.0
	 */
	public function skt_blocks_editor_assets() {
		$responsive_block_editor_ajax_nonce = wp_create_nonce( 'responsive_block_editor_ajax_nonce' );

		// Load the compiled blocks into the editor.
		wp_enqueue_script(
			'skt_blocks-block-js',
			SKT_BLOCKS_URL . 'dist/skt-blocks.js',
			array( 'lodash', 'react', 'react-dom', 'wp-api-fetch', 'wp-blob', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-date', 'wp-dom-ready', 'wp-edit-post', 'wp-editor', 'wp-element', 'wp-hooks', 'wp-i18n', 'wp-keycodes', 'wp-plugins', 'wp-polyfill', 'wp-rich-text', 'wp-token-list', 'wp-url', 'jquery' ),
			filemtime( SKT_BLOCKS_DIR . 'dist/skt-blocks.js' ),
			true
		);

		$user_data = wp_get_current_user();
		unset( $user_data->user_pass, $user_data->user_email );

		// Pass in REST URL.
		wp_localize_script(
			'skt_blocks-block-js',
			'responsive_globals',
			array(
				'rest_url'                           => esc_url( rest_url() ),
				'ajax_url'                           => admin_url( 'admin-ajax.php' ),
				'user_data'                          => $user_data,
				'pro_activated'                      => false,
				'is_wpe'                             => function_exists( 'is_wpe' ),
				'post_types'                         => $this->get_post_types(),
				'all_taxonomy'                       => $this->get_related_taxonomy(),
				'responsive_block_editor_ajax_nonce' => $responsive_block_editor_ajax_nonce,
			)
		);

		// Load the compiled styles into the editor.
		wp_enqueue_style('skt_blocks-block-editor-css',SKT_BLOCKS_URL . 'dist/skt-blocks-editor.css',			array( 'wp-edit-blocks' ),
			filemtime( SKT_BLOCKS_DIR . 'dist/skt-blocks-editor.css' )
		);
	}

	/**
	 * Get all taxonomies.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static function get_related_taxonomy() {

		$post_types = self::get_post_types();
		$return_array = array();
		foreach ( $post_types as $key => $value ) {
			$post_type = $value['value'];
			$taxonomies = get_object_taxonomies( $post_type, 'objects' );
			$data       = array();

			foreach ( $taxonomies as $tax_slug => $tax ) {
				if ( ! $tax->public || ! $tax->show_ui || ! $tax->show_in_rest ) {
					continue;
				}

				$data[ $tax_slug ] = $tax;
				$terms = get_terms( $tax_slug );
				$related_tax = array();

				if ( ! empty( $terms ) ) {
					foreach ( $terms as $t_index => $t_obj ) {
						$related_tax[] = array(
							'id'   => $t_obj->term_id,
							'name' => $t_obj->name,
						);
					}

					$return_array[ $post_type ]['terms'][ $tax_slug ] = $related_tax;
				}
			}

			$return_array[ $post_type ]['taxonomy'] = $data;
		}

		return $return_array;
	}
	/**
	 * Enqueue assets for frontend
	 *
	 * @since 1.0.0
	 */
	public function skt_blocks_frontend_assets() {

		// Load the compiled blocks into the editor.
		wp_enqueue_script(
			'skt_blocks-frontend-js',
			SKT_BLOCKS_URL . '/dist/frontend_blocks.js',
			array('jquery'),
			filemtime( SKT_BLOCKS_DIR . 'dist/frontend_blocks.js' ),
			true
		);

	}


	/**
	 * Enqueue assets for frontend and backend
	 *
	 * @since 1.0.0
	 */
	public function skt_blocks_block_assets() {

		// Load the compiled styles.
		wp_enqueue_style(
			'skt_blocks-style-css',
			SKT_BLOCKS_URL . 'dist/skt-blocks-style.css',
			array(),
			filemtime( SKT_BLOCKS_DIR . 'dist/skt-blocks-style.css' )
		);
	}

	/**
	 * Include Admin css
	 *
	 * @return void [description]
	 */
	public function skt_blocks_admin_enqueue_styles() {
		// Responsive Ready Sites admin styles.
		wp_register_style( 'skt-blocks-admin', SKT_BLOCKS_URL . 'admin/css/skt-blocks-admin.css', false, '1.0.0' );
		wp_enqueue_style( 'skt-blocks-admin' );
		wp_enqueue_script(
			'skt-blocks-admin-jsfile',
			SKT_BLOCKS_URL . 'admin/js/skt-blocks-admin.js',
			array( 'jquery' ),
			'1.0.0',
			true
		);
	}

	/**
	 * On admin init.
	 *
	 * Preform actions on WordPress admin initialization.
	 *
	 * Fired by `admin_init` action.
	 *
	 * @access public
	 */
	public function skt_blocks_admin_init() {

		$this->skt_blocks_remove_all_admin_notices();
	}

	/**
	 * [skt_blocks_remove_all_admin_notices description]
	 */
	private function skt_blocks_remove_all_admin_notices() {
		$skt_blocks_pages = array(
			'skt_blocks',
			'skt-blocks',
		);
		
		  if ( sanitize_text_field(wp_unslash(isset( $_POST['object_type_nonce'] ))) && wp_verify_nonce( sanitize_text_field(wp_unslash($_POST['object_type_nonce'], 'object_type_nonce_action' ))) ) {
            $object_type = sanitize_text_field(wp_unslash(! empty( $_REQUEST['object_type'] ) ?  $_REQUEST['object_type']  : ''));
        } else {
            if ( empty( $_GET['page'] ) || ! in_array( $_GET['page'], $skt_blocks_pages, true ) ) {
				return;
			}
        }

		

		remove_all_actions( 'admin_notices' );
	}

    /**
    * Adding Dashicons in WordPress Front-end
    */
    public function load_dashicons_front_end() {
        wp_enqueue_style( 'dashicons' );
    }

}
