<?php
/**
 * SKTB Styles Helper.
 *
 * @package category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}





if ( ! class_exists( 'Skt_Blocks_Frontend_Styles_Helper' ) ) {

	/**
	 * Class Skt_Blocks_Frontend_Styles_Helper.
	 */
	final class Skt_Blocks_Frontend_Styles_Helper {


		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance;

		/**
		 * Custom variable
		 *
		 * @var instance
		 */
		public static $icon_json;

		/**
		 * Get an instance of WP_Filesystem_Direct.
		 *
		 * @return object A WP_Filesystem_Direct instance.
		 */
		public function get_filesystem() {
			global $wp_filesystem;

			require_once ABSPATH . '/wp-admin/includes/file.php';

			WP_Filesystem();

			return $wp_filesystem;
		}

		/**
		 *  Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {
			add_action( 'wp_head', array( $this, 'skt_blocks_description' ), 100 );
			add_action( 'wp_head', array( $this, 'skt_blocks_frontend_styles' ), 100 );
		}

		/**
		 * Generate description and print in header.
		 */
		public function skt_blocks_description() {
			echo "\n<!-- This block is generated with the Responsive Blocks Library Plugin v" . substr( SKT_BLOCKS_VER, 0, -2 ) . ' (Responsive Gutenberg Blocks Library ' . SKT_BLOCKS_VER . ") - https://sktblocks.blazingthemes.com/ -->\n\n";//phpcs:ignore
		}

		/**
		 * Generate stylesheet and print in header.
		 */
		public function skt_blocks_frontend_styles() {
			global $post;
			$blocks = array();
			if ( is_object( $post ) ) {
				$blocks = parse_blocks( $post->post_content );
			}

			$css = $this->get_styles( $blocks );
			echo "<style id='rbea-frontend-styles'>$css</style>"; //phpcs:ignore
		}

		/**
		 * Parse function.
		 *
		 * @param [type] $content The content.
		 * @return [type]
		 */
		public function parse( $content ) {

			global $wp_version;

			return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : gutenberg_parse_blocks( $content );
		}

		/**
		 * Get styles function.
		 *
		 * @param [type] $blocks The blocks.
		 * @return [type]
		 */
		public function get_styles( $blocks ) {
			$desktop         = '';
			$tablet          = '';
			$mobile          = '';
			$tab_styling_css = '';
			$mob_styling_css = '';
			$css             = array();
			foreach ( $blocks as $i => $block ) {

				if ( is_array( $block ) ) {
					if ( '' === $block['blockName'] ) {
						continue;
					}
					if ( 'core/block' === $block['blockName'] ) {
						$id = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							$css = $this->get_styles( $reusable_blocks );

						}
					} else {

						$css = $this->get_block_css( $block );

						// Get CSS for the Block.
						if ( isset( $css['desktop'] ) ) {
							$desktop .= $css['desktop'];
							$tablet  .= $css['tablet'];
							$mobile  .= $css['mobile'];
						}
					}
				}
			}

			if ( ! empty( $tablet ) ) {
				$tab_styling_css .= '@media only screen and (max-width: 976px) {';
				$tab_styling_css .= $tablet;
				$tab_styling_css .= '}';
			}

			if ( ! empty( $mobile ) ) {
				$mob_styling_css .= '@media only screen and (max-width: 767px) {';
				$mob_styling_css .= $mobile;
				$mob_styling_css .= '}';
			}

			$css = $desktop . $tab_styling_css . $mob_styling_css;
			return $css;
		}

		/**
		 * Function to load backend font awesome icons.
		 *
		 * @return [type]
		 */
		public static function backend_load_font_awesome_icons() {

			$json_file = plugin_dir_path( __FILE__ ) . '../src/ResponsiveBlocksIcon.json';

			if ( ! file_exists( $json_file ) ) {
				return array();
			}

			// Function has already run.
			if ( null !== self::$icon_json ) {
				return self::$icon_json;
			}

			$str             = self::get_instance()->get_filesystem()->get_contents( $json_file );
			self::$icon_json = json_decode( $str, true );
			return self::$icon_json;
		}

		/**
		 * Function to render svg html.
		 *
		 * @param [type] $icon The icons.
		 * @return [type]
		 */
		public static function render_svg_html( $icon ) {
			$icon = str_replace( 'far', '', $icon );
			$icon = str_replace( 'fas', '', $icon );
			$icon = str_replace( 'fab', '', $icon );
			$icon = str_replace( 'fa-', '', $icon );
			$icon = str_replace( 'fa', '', $icon );
			$icon = sanitize_text_field( esc_attr( $icon ) );

			$json = self::backend_load_font_awesome_icons();
			$path = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['path'] : $json[ $icon ]['svg']['solid']['path'];
			$view = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['viewBox'] : $json[ $icon ]['svg']['solid']['viewBox'];
			if ( $view ) {
				$view = implode( ' ', $view );
			}
			return '<svg xmlns="https://www.w3.org/2000/svg" viewBox="' . esc_html( $view ) . '" ><path d="' . esc_html( $path ) . '"></path></svg>';
		}

		/**
		 * Get block css.
		 *
		 * @param [type] $block The block.
		 * @return [type]
		 */
		public function get_block_css( $block ) {
			$block = (array) $block;

			$name      = $block['blockName'];
			$css       = array();
			$block_id  = '';
			$blockattr = array();
			if ( ! isset( $name ) ) {
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
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_post_carousel_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/skt-blocks-post-grid':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_post_grid_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/advanced-heading':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_advanced_heading_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/count-up':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_count_up_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/blockquote':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_blockquote_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/divider':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_divider_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/accordion':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_accordian_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/accordion-item':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_accordian_child_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/advance-columns':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_advanced_columns_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/column':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_advanced_column_child_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/buttons':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_buttons_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/buttons-child':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_buttons_child_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/skt-blocks-cta':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_call_to_action_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/card':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_card_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/content-timeline':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_content_timeline_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/expand':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_expand_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/flipbox':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_flipbox_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/gallery-masonry':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_gallery_masonry_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/googlemap':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_googlemap_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/icons-list':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_icon_list_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/icons-list-child':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_icon_list_child_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/image-boxes-block':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_image_boxes_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/image-slider':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_image_slider_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/info-block':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_info_block_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/post-timeline':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_post_timeline_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/pricing-list':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_pricing_list_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/pricing-table':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_pricing_table_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/section':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_section_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/shape-divider':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_shape_divider_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/team':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_team_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/testimonial':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_testimonial_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/testimonial-slider':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_testimonial_slider_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/video-popup':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_video_popup_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/table-of-contents':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_table_of_contents_css( $blockattr, $block_id );
					skt_blocks::$table_of_contents_flag = true;
					break;
				case 'skt-blocks/how-to':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_how_to_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/inline-notice':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_inline_notice_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/call-mail-button':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_call_mail_button_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/progress-bar':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_progress_bar_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/social-share':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_social_share_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/tabs':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_tabs_css( $blockattr, $block_id );
					break;


				case 'skt-blocks/tabs-child':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_tabs_child_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/taxonomy-list':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_taxonomy_list_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/wp-search':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_wp_search_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/instagram':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_instagram_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/advanced-text':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_advanced_text_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/image-hotspot':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_image_hotspot_css( $blockattr, $block_id );
					break;
				case 'skt-blocks/feature-grid':
					$css += Skt_Blocks_Frontend_Styles::get_responsive_block_feature_grid_css( $blockattr, $block_id );
					break;
				default:
					// Nothing to do here.
					break;
			}
			if ( isset( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as $j => $inner_block ) {
					if ( 'core/block' === $inner_block['blockName'] ) {
						$id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							$css = $this->get_styles( $reusable_blocks );

						}
					} else {
						// Get CSS for the Block.
						$inner_block_css = $this->get_block_css( $inner_block );

						$css_desktop = ( isset( $css['desktop'] ) ? $css['desktop'] : '' );
						$css_tablet  = ( isset( $css['tablet'] ) ? $css['tablet'] : '' );
						$css_mobile  = ( isset( $css['mobile'] ) ? $css['mobile'] : '' );

						if ( isset( $inner_block_css['desktop'] ) ) {
							$css['desktop'] = $css_desktop . $inner_block_css['desktop'];
							$css['tablet']  = $css_tablet . $inner_block_css['tablet'];
							$css['mobile']  = $css_mobile . $inner_block_css['mobile'];
						}
					}
				}
			}

			return $css;

		}
		/**
		 * Parse CSS into correct CSS syntax.
		 *
		 * @param array  $combined_selectors The combined selector array.
		 * @param string $id The selector ID.
		 */
		public static function skt_blocks_generate_all_css( $combined_selectors, $id ) {

			return array(
				'desktop' => self::responsive_block_editor_addons_generate_css( $combined_selectors['desktop'], $id ),
				'tablet'  => self::responsive_block_editor_addons_generate_css( $combined_selectors['tablet'], $id ),
				'mobile'  => self::responsive_block_editor_addons_generate_css( $combined_selectors['mobile'], $id ),
			);
		}

		/**
		 * Parse CSS into correct CSS syntax.
		 *
		 * @param array  $selectors The block selectors.
		 * @param string $id The selector ID.
		 */
		public static function responsive_block_editor_addons_generate_css( $selectors, $id ) {
			$styling_css = '';

			if ( empty( $selectors ) ) {
				return '';
			}

			foreach ( $selectors as $key => $value ) {

				$css = '';
				foreach ( $value as $j => $val ) {

					if ( 'font-family' === $j && 'Default' === $val ) {
						continue;
					}

					if ( ! empty( $val ) || 0 === $val ) {
						if ( 'font-family' === $j ) {
							$css .= $j . ': "' . $val . '";';
						} else {
							$css .= $j . ': ' . $val . ';';
						}
					}
				}

				if ( ! empty( $css ) ) {
					$styling_css .= $id;
					$styling_css .= $key . '{';
					$styling_css .= $css . '}';
				}
			}

			return $styling_css;
		}
	}

	Skt_Blocks_Frontend_Styles_Helper::get_instance();
}

