<?php
/**
 * SKT New Blocks — isolated asset loader.
 *
 * Loads the bundle for ALL new SKT blocks (dist/skt-new-blocks.js + its CSS)
 * under separate handles. It never touches the legacy skt-blocks.js bundle,
 * so existing blocks are unaffected even if a new block changes or fails to
 * build. Add new blocks in src/new-blocks.js — this loader stays the same.
 *
 * @package SKT Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue the new-blocks editor script + editor styles.
 */
function skt_new_blocks_editor_assets() {

	$script_path = SKT_BLOCKS_DIR . 'dist/skt-new-blocks.js';
	$asset_path  = SKT_BLOCKS_DIR . 'dist/skt-new-blocks.asset.php';

	if ( ! file_exists( $script_path ) || ! file_exists( $asset_path ) ) {
		return;
	}

	$asset = require $asset_path;

	wp_enqueue_script(
		'skt-new-blocks-editor-js',
		SKT_BLOCKS_URL . 'dist/skt-new-blocks.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);

	$editor_css = SKT_BLOCKS_DIR . 'dist/skt-new-blocks.css';
	if ( file_exists( $editor_css ) ) {
		wp_enqueue_style(
			'skt-new-blocks-editor-css',
			SKT_BLOCKS_URL . 'dist/skt-new-blocks.css',
			array( 'wp-edit-blocks' ),
			filemtime( $editor_css )
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'skt_new_blocks_editor_assets' );

/**
 * Enqueue the new-blocks frontend + editor styles.
 * enqueue_block_assets fires on both the front end and inside the editor.
 */
function skt_new_blocks_block_assets() {

	$style_css = SKT_BLOCKS_DIR . 'dist/style-skt-new-blocks.css';

	if ( ! file_exists( $style_css ) ) {
		return;
	}

	wp_enqueue_style(
		'skt-new-blocks-style-css',
		SKT_BLOCKS_URL . 'dist/style-skt-new-blocks.css',
		array(),
		filemtime( $style_css )
	);
}
add_action( 'enqueue_block_assets', 'skt_new_blocks_block_assets' );

/**
 * Server-side visibility: hide the SKT Section from logged-in or logged-out users.
 */
function skt_new_blocks_section_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/skt-section' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_section_login_visibility', 10, 2 );

/**
 * Shape Divider block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_shape_divider_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/shape-divider' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_shape_divider_login_visibility', 10, 2 );

/**
 * Count Up block: logged-in / logged-out visibility. Device hiding is handled
 * by CSS classes (skt-hide-*). Attributes default to false, so existing
 * blocks are unaffected.
 */
function skt_new_blocks_count_up_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/count-up' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_count_up_login_visibility', 10, 2 );

/**
 * Masonry block: logged-in / logged-out visibility. Device hiding is handled
 * by CSS classes (skt-hide-*). Attributes default to false, so existing
 * blocks are unaffected.
 */
function skt_new_blocks_gallery_masonry_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/gallery-masonry' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_gallery_masonry_login_visibility', 10, 2 );

/**
 * Multi Buttons block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_buttons_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/buttons' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_buttons_login_visibility', 10, 2 );

/**
 * Icons List block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_icons_list_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/icons-list' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_icons_list_login_visibility', 10, 2 );

/**
 * Testimonial block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_testimonial_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/testimonial' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_testimonial_login_visibility', 10, 2 );

/**
 * Divider block: logged-in / logged-out visibility. Device hiding is handled
 * by CSS classes (skt-hide-*). Attributes default to false, so existing
 * blocks are unaffected.
 */
function skt_new_blocks_divider_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/divider' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_divider_login_visibility', 10, 2 );

/**
 * Team block: logged-in / logged-out visibility. Hides the whole Team block on
 * the front end based on the viewer's login state. Device hiding is handled by
 * CSS classes (skt-hide-*). Attributes default to false, so existing blocks are
 * unaffected.
 */
function skt_new_blocks_team_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/team' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_team_login_visibility', 10, 2 );

/**
 * Team block: responsive (tablet/mobile) spacing. Desktop spacing stays as the
 * inline styles in the saved markup; the tablet/mobile overrides are applied
 * here at render time as a scoped <style> with media queries, so the saved
 * block output is never changed (no validation errors). Breakpoints match the
 * editor: tablet <=1024px, mobile <=767px.
 */
function skt_new_blocks_team_responsive_spacing( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/team' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();

	$scope = 'skt-team-resp-' . substr( md5( $block_content . uniqid( '', true ) ), 0, 8 );

	$build = function ( $suffix ) use ( $attrs, $scope ) {
		$sel = '.' . $scope;
		$css = '';
		$num = function ( $k ) use ( $attrs, $suffix ) {
			$key = $k . $suffix;
			return ( isset( $attrs[ $key ] ) && is_numeric( $attrs[ $key ] ) ) ? floatval( $attrs[ $key ] ) : null;
		};
		$ts = $num( 'titleSpacing' );
		if ( null !== $ts ) {
			$css .= $sel . ' .skt-blocks-team-name{margin-bottom:' . $ts . 'px!important}';
		}
		$ds = $num( 'designationSpacing' );
		if ( null !== $ds ) {
			$css .= $sel . ' .skt-blocks-team-designation{margin-bottom:' . $ds . 'px!important}';
		}
		$dsc = $num( 'descriptionSpacing' );
		if ( null !== $dsc ) {
			$css .= $sel . ' .skt-blocks-team-description{margin-bottom:' . $dsc . 'px!important}';
		}
		$si = $num( 'socialIconSpacing' );
		if ( null !== $si ) {
			$css .= $sel . ' .skt-blocks-team-social-icons li{margin-left:' . $si . 'px!important;margin-right:' . $si . 'px!important}';
		}
		$imt = $num( 'imageMarginTop' );
		$imb = $num( 'imageMarginBottom' );
		$iw  = $num( 'imageWidth' );
		if ( null !== $imt || null !== $imb || null !== $iw ) {
			$css .= $sel . ' .skt-blocks-team-avatar{';
			if ( null !== $imt ) {
				$css .= 'margin-top:' . $imt . 'px!important;';
			}
			if ( null !== $imb ) {
				$css .= 'margin-bottom:' . $imb . 'px!important;';
			}
			if ( null !== $iw ) {
				$css .= 'width:' . $iw . 'px!important;';
			}
			$css .= '}';
		}
		return $css;
	};

	$tablet = $build( 'Tablet' );
	$mobile = $build( 'Mobile' );
	if ( '' === $tablet && '' === $mobile ) {
		return $block_content;
	}

	$css = '';
	if ( '' !== $tablet ) {
		$css .= '@media (max-width:1024px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media (max-width:767px){' . $mobile . '}';
	}

	$block_content = preg_replace(
		'/class="wp-block-skt-blocks-team-wrapper/',
		'class="wp-block-skt-blocks-team-wrapper ' . $scope,
		$block_content,
		1
	);

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_team_responsive_spacing', 10, 2 );

/**
 * Info Block: logged-in / logged-out visibility. Hides the whole Info Block on
 * the front end based on the viewer's login state. Device hiding is handled by
 * CSS classes (skt-hide-*). Attributes default to false, so existing blocks are
 * unaffected.
 */
function skt_new_blocks_info_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/info-block' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_info_login_visibility', 10, 2 );

/**
 * Info Block: responsive (tablet/mobile) overrides for Image/Icon Margin,
 * Spacing, Border Width, Border Radius and Separator Width. Desktop values stay
 * inline in the saved markup; tablet/mobile come from this scoped <style> with
 * media queries, so the saved block output is never changed (no validation
 * errors). Scoped by the block's own per-instance class (.skt-blocks-block-<counterId>),
 * which is already present in the saved markup. Breakpoints match the editor:
 * tablet <=1024px, mobile <=767px.
 */
function skt_new_blocks_info_responsive( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/info-block' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$cid   = isset( $attrs['counterId'] ) ? $attrs['counterId'] : '';
	if ( '' === $cid ) {
		return $block_content;
	}

	$cid_clean = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $cid );
	$sel       = '.skt-blocks-block-' . $cid_clean;
	// Outer wrapper is the parent of the scoped content wrap. :has() lets us
	// target it per-instance without changing the saved markup (matches the
	// editor). Used for Content Padding + box Border Width/Radius.
	$outer     = '.skt-blocks-infobox__outer-wrap:has(> ' . $sel . ')';
	$width_type = isset( $attrs['resseparatorWidthType'] ) ? $attrs['resseparatorWidthType'] : '%';

	$build = function ( $suffix ) use ( $attrs, $sel, $outer, $width_type ) {
		$css = '';
		$num = function ( $k ) use ( $attrs, $suffix ) {
			$key = $k . $suffix;
			return ( isset( $attrs[ $key ] ) && is_numeric( $attrs[ $key ] ) ) ? floatval( $attrs[ $key ] ) : null;
		};

		$mt = $num( 'iconTopMargin' );
		$mb = $num( 'iconBottomMargin' );
		$ml = $num( 'iconLeftMargin' );
		$mr = $num( 'iconRightMargin' );
		if ( null !== $mt || null !== $mb || null !== $ml || null !== $mr ) {
			$css .= $sel . ' .skt-blocks-ifb-image-icon-content{';
			if ( null !== $mt ) {
				$css .= 'margin-top:' . $mt . 'px!important;';
			}
			if ( null !== $mb ) {
				$css .= 'margin-bottom:' . $mb . 'px!important;';
			}
			if ( null !== $ml ) {
				$css .= 'margin-left:' . $ml . 'px!important;';
			}
			if ( null !== $mr ) {
				$css .= 'margin-right:' . $mr . 'px!important;';
			}
			$css .= '}';
		}

		$ps = $num( 'resprefixSpace' );
		if ( null !== $ps ) {
			$css .= $sel . ' .skt-blocks-ifb-title-prefix{margin-bottom:' . $ps . 'px!important}';
		}
		$hs = $num( 'resheadSpace' );
		if ( null !== $hs ) {
			$css .= $sel . ' .skt-blocks-ifb-title{margin-bottom:' . $hs . 'px!important}';
		}
		$ss = $num( 'ressubHeadSpace' );
		if ( null !== $ss ) {
			$css .= $sel . ' .skt-blocks-ifb-desc{margin-bottom:' . $ss . 'px!important}';
		}

		$sp = $num( 'sepSpace' );
		$sw = $num( 'resseperatorWidth' );
		if ( null !== $sp || null !== $sw ) {
			$css .= $sel . ' .skt-blocks-ifb-separator{';
			if ( null !== $sp ) {
				$css .= 'margin-bottom:' . $sp . 'px!important;';
			}
			if ( null !== $sw ) {
				$unit = ( '%' === $width_type || 'px' === $width_type ) ? $width_type : '%';
				$css .= 'width:' . $sw . $unit . '!important;';
			}
			$css .= '}';
		}

		$bw = $num( 'resImageBorderWidth' );
		$br = $num( 'resImageBorderRadius' );
		if ( null !== $bw || null !== $br ) {
			$css .= $sel . ' .skt-blocks-ifb-image-content img{';
			if ( null !== $bw ) {
				$css .= 'border-width:' . $bw . 'px!important;';
			}
			if ( null !== $br ) {
				$css .= 'border-radius:' . $br . 'px!important;';
			}
			$css .= '}';
		}

			// Outer wrapper: Content Padding + box Border Width/Radius.
			$cp  = $num( 'contentPadding' );
			$bbw = $num( 'blockBorderWidth' );
			$bbr = $num( 'blockBorderRadius' );
			if ( null !== $cp || null !== $bbw || null !== $bbr ) {
				$css .= $outer . '{';
				if ( null !== $cp ) {
					$css .= 'padding:' . $cp . 'px!important;';
				}
				if ( null !== $bbw ) {
					$css .= 'border-width:' . $bbw . 'px!important;';
				}
				if ( null !== $bbr ) {
					$css .= 'border-radius:' . $bbr . 'px!important;';
				}
				$css .= '}';
			}

		return $css;
	};

	$tablet = $build( 'Tablet' );
	$mobile = $build( 'Mobile' );
	if ( '' === $tablet && '' === $mobile ) {
		return $block_content;
	}

	$css = '';
	if ( '' !== $tablet ) {
		$css .= '@media (max-width:1024px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media (max-width:767px){' . $mobile . '}';
	}

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_info_responsive', 10, 2 );

/**
 * Icons List: responsive (tablet/mobile) overrides for Gap between Items, Icon
 * Size, Background Size, Border and Border Radius. Desktop values stay in the
 * block's own saved <style>; tablet/mobile come from this scoped <style> with
 * media queries, so the saved markup is never changed (no validation errors).
 * Scoped by the block's own per-instance class (.skt-blocks-icon-wrap-<id>),
 * already present in the saved markup. Breakpoints match the editor: tablet
 * <=976px, mobile <=767px.
 */
function skt_new_blocks_icons_list_responsive( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/icons-list' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$cid   = isset( $attrs['maincounterId'] ) ? $attrs['maincounterId'] : '';
	if ( '' === $cid ) {
		return $block_content;
	}

	$scope = '.skt-blocks-icon-wrap-' . preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $cid );
	$unit  = isset( $attrs['fontSizeType'] ) ? $attrs['fontSizeType'] : 'px';
	$unit  = ( 'px' === $unit || 'em' === $unit || '%' === $unit ) ? $unit : 'px';

	$build = function ( $suffix ) use ( $attrs, $scope, $unit ) {
		$css = '';
		$num = function ( $k ) use ( $attrs, $suffix ) {
			$key = $k . $suffix;
			return ( isset( $attrs[ $key ] ) && is_numeric( $attrs[ $key ] ) ) ? floatval( $attrs[ $key ] ) : null;
		};

		$sz = $num( 'size' );
		if ( null !== $sz ) {
			$css .= $scope . ' .skt-blocks-icon-list__source-icon svg{width:' . $sz . $unit . '!important;height:' . $sz . $unit . '!important}';
			$css .= $scope . ' .skt-blocks-icon-list__source-icon{width:' . $sz . $unit . '!important;height:' . $sz . $unit . '!important;font-size:' . $sz . $unit . '!important}';
			$css .= $scope . ' .skt-blocks-icon-list__source-image{width:' . $sz . $unit . '!important;height:' . $sz . $unit . '!important}';
		}

		$bg = $num( 'bgSize' );
		$bd = $num( 'border' );
		$br = $num( 'borderRadius' );
		if ( null !== $bg || null !== $bd || null !== $br ) {
			$css .= $scope . ' .skt-blocks-icon-list__source-wrap{';
			if ( null !== $bg ) {
				$css .= 'padding:' . $bg . 'px!important;';
			}
			if ( null !== $bd ) {
				$css .= 'border-width:' . $bd . 'px!important;';
			}
			if ( null !== $br ) {
				$css .= 'border-radius:' . $br . 'px!important;';
			}
			$css .= '}';
		}

		$g = $num( 'gap' );
		if ( null !== $g ) {
			$css .= '.skt-blocks-icon-list__layout-horizontal ' . $scope . ' .wp-block-skt-blocks-icons-list-child{margin-left:' . ( $g / 2 ) . 'px!important;margin-right:' . ( $g / 2 ) . 'px!important}';
			$css .= '.skt-blocks-icon-list__layout-vertical ' . $scope . ' .skt-blocks-icon-list__content-wrap{margin-bottom:' . $g . 'px!important}';
		}

		return $css;
	};

	$tablet = $build( 'Tablet' );
	$mobile = $build( 'Mobile' );
	if ( '' === $tablet && '' === $mobile ) {
		return $block_content;
	}

	$css = '';
	if ( '' !== $tablet ) {
		$css .= '@media only screen and (max-width:976px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media only screen and (max-width:767px){' . $mobile . '}';
	}

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_icons_list_responsive', 10, 2 );

/**
 * Flip Box block: logged-in / logged-out visibility. Device hiding is handled
 * by CSS classes (skt-hide-*). Attributes default to false, so existing
 * blocks are unaffected.
 */
function skt_new_blocks_flipbox_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/flipbox' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_flipbox_login_visibility', 10, 2 );

/**
 * Flipbox: icon sizing on the front end. Dashicons are a font, so they scale by
 * font-size, not by the width/height the block sets on the icon wrapper. This
 * injects font-size (plus width/height) for the front and back icons, scoped by
 * the block's own per-instance class (.block-<blockId>), already present in the
 * saved markup — so save.js is never changed (no validation errors). Desktop +
 * tablet (<=1024px) + mobile (<=767px).
 */
function skt_new_blocks_flipbox_icon_size( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/flipbox' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$bid   = isset( $attrs['blockId'] ) ? $attrs['blockId'] : '';
	if ( '' === $bid ) {
		return $block_content;
	}
	$scope = '.block-' . preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $bid );

	$num = function ( $k ) use ( $attrs ) {
		return ( isset( $attrs[ $k ] ) && is_numeric( $attrs[ $k ] ) ) ? floatval( $attrs[ $k ] ) : null;
	};
	$icon_css = function ( $side, $size ) use ( $scope ) {
		return $scope . ' .flip-box-' . $side . ' .dashicons{font-size:' . $size . 'px!important;width:' . $size . 'px!important;height:' . $size . 'px!important;line-height:1!important;}';
	};
	$rules = function ( $fsfx ) use ( $num, $icon_css ) {
		$css = '';
		$fi = $num( 'iconSize' . $fsfx );
		if ( null !== $fi ) {
			$css .= $icon_css( 'front', $fi );
		}
		$bi = $num( 'backIconSize' . $fsfx );
		if ( null !== $bi ) {
			$css .= $icon_css( 'back', $bi );
		}
		return $css;
	};

	$desktop = $rules( '' );
	$tablet  = $rules( 'Tablet' );
	$mobile  = $rules( 'Mobile' );

	// Icon color. Dashicons are a font, so they take `color`, not `fill`.
	$color_css = '';
	$fc = isset( $attrs['iconColor'] ) ? trim( (string) $attrs['iconColor'] ) : '';
	if ( '' !== $fc ) {
		$color_css .= $scope . ' .flip-box-front .dashicons{color:' . esc_attr( $fc ) . '!important;fill:' . esc_attr( $fc ) . '!important;}';
	}
	$bc = isset( $attrs['backIconColor'] ) ? trim( (string) $attrs['backIconColor'] ) : '';
	if ( '' !== $bc ) {
		$color_css .= $scope . ' .flip-box-back .dashicons{color:' . esc_attr( $bc ) . '!important;fill:' . esc_attr( $bc ) . '!important;}';
	}

	if ( '' === $desktop && '' === $tablet && '' === $mobile && '' === $color_css ) {
		return $block_content;
	}

	$css = $desktop . $color_css;
	if ( '' !== $tablet ) {
		$css .= '@media (max-width:1024px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media (max-width:767px){' . $mobile . '}';
	}

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_flipbox_icon_size', 10, 2 );

/**
 * Image Boxes: logged-in / logged-out visibility (hides the whole block on the
 * front end based on login state). Device hiding is handled in the responsive
 * filter below via CSS. Attributes default to false, so existing blocks are
 * unaffected.
 */
function skt_new_blocks_image_boxes_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/image-boxes-block' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_image_boxes_login_visibility', 10, 2 );

/**
 * Image Boxes: responsive (tablet/mobile) sizing for Height, Border Radius,
 * Box Padding, Title/Description Spacing, Description Font Size and Arrow Size,
 * plus device hiding. Desktop values stay inline / in the block's own saved
 * <style>; tablet/mobile come from this scoped <style> with media queries, so
 * save.js is never changed (no validation errors). Scoped by the block's own
 * per-instance class (.block-id-<counterId>), already present in the saved
 * markup. Breakpoints: tablet <=1024px, mobile <=767px.
 */
function skt_new_blocks_image_boxes_responsive( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/image-boxes-block' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$cid   = isset( $attrs['counterId'] ) ? $attrs['counterId'] : '';
	if ( '' === $cid ) {
		return $block_content;
	}
	$box = '.wp-block-skt-blocks-image-boxes-block-item.block-id-' . preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $cid );

	$build = function ( $suffix ) use ( $attrs, $box ) {
		$css = '';
		$num = function ( $k ) use ( $attrs, $suffix ) {
			$key = $k . $suffix;
			return ( isset( $attrs[ $key ] ) && is_numeric( $attrs[ $key ] ) ) ? floatval( $attrs[ $key ] ) : null;
		};
		$h  = $num( 'boxHeight' );
		$pt = $num( 'boxPaddingTop' );
		$pl = $num( 'boxPaddingLeft' );
		$pr = $num( 'boxPaddingRight' );
		$pb = $num( 'boxPaddingBottom' );
		$r  = $num( 'boxRadius' );
		if ( null !== $h || null !== $pt || null !== $pl || null !== $pr || null !== $pb || null !== $r ) {
			$css .= $box . '{';
			if ( null !== $h ) {
				$css .= 'height:' . $h . 'px!important;';
			}
			if ( null !== $pt ) {
				$css .= 'padding-top:' . $pt . 'px!important;';
			}
			if ( null !== $pl ) {
				$css .= 'padding-left:' . $pl . 'px!important;';
			}
			if ( null !== $pr ) {
				$css .= 'padding-right:' . $pr . 'px!important;';
			}
			if ( null !== $pb ) {
				$css .= 'padding-bottom:' . $pb . 'px!important;';
			}
			if ( null !== $r ) {
				$css .= 'border-radius:' . $r . 'px!important;';
			}
			$css .= '}';
		}
		$ts = $num( 'titleSpacing' );
		if ( null !== $ts ) {
			$css .= $box . ' .wp-block-skt-blocks-image-boxes-block-item__title{margin-top:' . $ts . 'px!important;margin-bottom:' . $ts . 'px!important;}';
		}
		$ds = $num( 'descriptionSpacing' );
		$df = $num( 'descriptionFontSize' );
		if ( null !== $ds || null !== $df ) {
			$css .= $box . ' .wp-block-skt-blocks-image-boxes-block-item__description{';
			if ( null !== $ds ) {
				$css .= 'margin-top:' . $ds . 'px!important;margin-bottom:' . $ds . 'px!important;';
			}
			if ( null !== $df ) {
				$css .= 'font-size:' . $df . 'px!important;';
			}
			$css .= '}';
		}
		$ar = $num( 'arrowSize' );
		if ( null !== $ar ) {
			$css .= $box . ' .imagebox-arrow{font-size:' . $ar . 'px!important;}';
		}
		return $css;
	};

	$tablet = $build( 'Tablet' );
	$mobile = $build( 'Mobile' );

	$css = '';
	if ( '' !== $tablet ) {
		$css .= '@media (max-width:1024px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media (max-width:767px){' . $mobile . '}';
	}

	// Device hiding (whole block). The per-instance class is on every item.
	if ( ! empty( $attrs['hideDesktop'] ) ) {
		$css .= '@media (min-width:1025px){' . $box . '{display:none!important;}}';
	}
	if ( ! empty( $attrs['hideTablet'] ) ) {
		$css .= '@media (min-width:768px) and (max-width:1024px){' . $box . '{display:none!important;}}';
	}
	if ( ! empty( $attrs['hideMobile'] ) ) {
		$css .= '@media (max-width:767px){' . $box . '{display:none!important;}}';
	}

	if ( '' === $css ) {
		return $block_content;
	}
	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_image_boxes_responsive', 10, 2 );

/**
 * Call To Action: logged-in / logged-out visibility. Device hiding is handled in
 * the responsive filter below via CSS. Attributes default to false, so existing
 * blocks are unaffected.
 */
function skt_new_blocks_cta_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/skt-blocks-cta' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_cta_login_visibility', 10, 2 );

/**
 * Call To Action: responsive (tablet/mobile) sizing for Border Radius, button
 * Vertical/Horizontal Padding, Icon Spacing and the container's Top/Bottom/
 * Left/Right Padding, plus device hiding. Desktop values stay inline / in the
 * block's own saved <style>; tablet/mobile come from this scoped <style> with
 * media queries, so save.js is never changed (no validation errors). Scoped by
 * the block's own per-instance class (.skt-blocks-cta-<counterId>), already
 * present in the saved markup. Breakpoints: tablet <=1024px, mobile <=767px.
 */
function skt_new_blocks_cta_responsive( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/skt-blocks-cta' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$cid   = isset( $attrs['counterId'] ) ? $attrs['counterId'] : '';
	if ( '' === $cid ) {
		return $block_content;
	}
	$c = '.skt-blocks-cta-' . preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $cid );

	$build = function ( $suffix ) use ( $attrs, $c ) {
		$css = '';
		$num = function ( $k ) use ( $attrs, $suffix ) {
			$key = $k . $suffix;
			return ( isset( $attrs[ $key ] ) && is_numeric( $attrs[ $key ] ) ) ? floatval( $attrs[ $key ] ) : null;
		};
		$br = $num( 'borderRadius' );
		$tp = $num( 'topPadding' );
		$bp = $num( 'bottomPadding' );
		$lp = $num( 'leftPadding' );
		$rp = $num( 'rightPadding' );
		if ( null !== $br || null !== $tp || null !== $bp || null !== $lp || null !== $rp ) {
			$css .= $c . '{';
			if ( null !== $br ) {
				$css .= 'border-radius:' . $br . 'px!important;';
			}
			if ( null !== $tp ) {
				$css .= 'padding-top:' . $tp . 'px!important;';
			}
			if ( null !== $bp ) {
				$css .= 'padding-bottom:' . $bp . 'px!important;';
			}
			if ( null !== $lp ) {
				$css .= 'padding-left:' . $lp . 'px!important;';
			}
			if ( null !== $rp ) {
				$css .= 'padding-right:' . $rp . 'px!important;';
			}
			$css .= '}';
		}
		if ( null !== $br ) {
			$css .= $c . ' .skt-blocks-cta-image{border-radius:' . $br . 'px!important;}';
		}
		$vp = $num( 'buttonvPadding' );
		$hp = $num( 'buttonhPadding' );
		if ( null !== $vp || null !== $hp ) {
			$css .= $c . ' .skt-blocks-cta-button-wrapper{';
			if ( null !== $vp ) {
				$css .= 'padding-top:' . $vp . 'px!important;padding-bottom:' . $vp . 'px!important;';
			}
			if ( null !== $hp ) {
				$css .= 'padding-left:' . $hp . 'px!important;padding-right:' . $hp . 'px!important;';
			}
			$css .= '}';
		}
		$is = $num( 'iconSpace' );
		if ( null !== $is ) {
			$css .= $c . ' .skt-blocks-cta-button__icon-position-before{margin-right:' . $is . 'px!important;}';
			$css .= $c . ' .skt-blocks-cta-button__icon-position-after{margin-left:' . $is . 'px!important;}';
		}
		$ts = $num( 'titleSpace' );
		if ( null !== $ts ) {
			$css .= $c . ' .skt-blocks-cta-title{margin-bottom:' . $ts . 'px!important;}';
		}
		$ss = $num( 'subtitleSpace' );
		if ( null !== $ss ) {
			$css .= $c . ' .skt-blocks-cta-text{margin-bottom:' . $ss . 'px!important;}';
		}
		$bs = $num( 'buttonSpace' );
		if ( null !== $bs ) {
			$css .= $c . ' .skt-blocks-cta-button-wrapper{margin-bottom:' . $bs . 'px!important;}';
		}
		return $css;
	};

	$tablet = $build( 'Tablet' );
	$mobile = $build( 'Mobile' );

	// Icon size: the block's stylesheet is not loaded on the front end, so the
	// icon SVG would otherwise render at its intrinsic (oversized) dimensions.
	// Constrain it to match the surrounding text. Always emitted.
	$css = $c . ' .skt-blocks-cta-button__icon svg{width:1em;height:1em;vertical-align:middle;}';
	// Button shape (border-radius) and size (font-size) also come from the block
	// stylesheet, which is not loaded on the front end, so emit them here too.
	$css .= $c . ' .skt-blocks-cta-button-shape-square{border-radius:0!important;}';
	$css .= $c . ' .skt-blocks-cta-button-shape-rounded{border-radius:4px!important;}';
	$css .= $c . ' .skt-blocks-cta-button-shape-circular{border-radius:100px!important;}';
	$css .= $c . ' .skt-blocks-cta-button-size-small .skt-blocks-cta-button,' . $c . ' .skt-blocks-cta-button-size-small .skt-blocks-cta-button__icon{font-size:14px!important;}';
	$css .= $c . ' .skt-blocks-cta-button-size-medium .skt-blocks-cta-button,' . $c . ' .skt-blocks-cta-button-size-medium .skt-blocks-cta-button__icon{font-size:20px!important;}';
	$css .= $c . ' .skt-blocks-cta-button-size-large .skt-blocks-cta-button,' . $c . ' .skt-blocks-cta-button-size-large .skt-blocks-cta-button__icon{font-size:26px!important;}';
	$css .= $c . ' .skt-blocks-cta-button-size-extralarge .skt-blocks-cta-button,' . $c . ' .skt-blocks-cta-button-size-extralarge .skt-blocks-cta-button__icon{font-size:32px!important;}';
	if ( '' !== $tablet ) {
		$css .= '@media (max-width:1024px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media (max-width:767px){' . $mobile . '}';
	}

	if ( ! empty( $attrs['hideDesktop'] ) ) {
		$css .= '@media (min-width:1025px){' . $c . '{display:none!important;}}';
	}
	if ( ! empty( $attrs['hideTablet'] ) ) {
		$css .= '@media (min-width:768px) and (max-width:1024px){' . $c . '{display:none!important;}}';
	}
	if ( ! empty( $attrs['hideMobile'] ) ) {
		$css .= '@media (max-width:767px){' . $c . '{display:none!important;}}';
	}

	if ( '' === $css ) {
		return $block_content;
	}
	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_cta_responsive', 10, 2 );

/**
 * Expand/Show More block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_expand_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/expand' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_expand_login_visibility', 10, 2 );

/**
 * Image Slider block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_image_slider_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/image-slider' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_image_slider_login_visibility', 10, 2 );

/**
 * Advanced Heading block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_advanced_heading_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/advanced-heading' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_advanced_heading_login_visibility', 10, 2 );

/**
 * Accordion block: logged-in / logged-out visibility. Device hiding is handled
 * by CSS classes (skt-hide-*). Attributes default to false, so existing
 * blocks are unaffected.
 */
function skt_new_blocks_accordion_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/accordion' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_accordion_login_visibility', 10, 2 );

/**
 * Pricing Table block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_pricing_table_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/pricing-table' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_pricing_table_login_visibility', 10, 2 );

/**
 * Card block: logged-in / logged-out visibility. Device hiding is handled by
 * CSS classes (skt-hide-*). Attributes default to false, so existing blocks
 * are unaffected.
 */
function skt_new_blocks_card_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/card' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_card_login_visibility', 10, 2 );

/**
 * Blockquote block: logged-in / logged-out visibility. Device hiding is
 * handled by CSS classes (skt-hide-*). Attributes default to false, so
 * existing blocks are unaffected.
 */
function skt_new_blocks_blockquote_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/blockquote' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_blockquote_login_visibility', 10, 2 );

/**
 * Dynamic background image: pull the SKT Section background from the current
 * post's featured image or a custom field at render time. Scoped by uniqueId.
 */
function skt_new_blocks_section_dynamic_bg( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/skt-section' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$src   = isset( $attrs['dynamicBgSource'] ) ? $attrs['dynamicBgSource'] : 'none';
	if ( 'featured' !== $src ) {
		return $block_content;
	}
	$uid = isset( $attrs['uniqueId'] ) ? $attrs['uniqueId'] : '';
	if ( '' === $uid ) {
		return $block_content;
	}
	$post_id = get_the_ID();
	$url     = get_the_post_thumbnail_url( $post_id, 'full' );
	if ( ! $url ) {
		return $block_content;
	}
	$sel   = '.wp-block-skt-blocks-skt-section.skt-section-' . esc_attr( $uid );
	$style = '<style>' . $sel . '{background-image:url(' . esc_url( $url ) . ') !important;background-size:cover;background-position:center center;background-repeat:no-repeat;}</style>';
	return $style . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_section_dynamic_bg', 10, 2 );

/**
 * Pricing List: hide for logged-in / logged-out users. Output-only (no saved
 * markup change), so it never causes block validation errors.
 */
function skt_new_blocks_pricing_list_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/pricing-list' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_pricing_list_login_visibility', 10, 2 );

/**
 * Pricing List: responsive (tablet/mobile) overrides for Image Width, Separator
 * Width and Spacing (row/column gap, title margin, content padding), plus
 * device visibility (hide on desktop/tablet/mobile). Desktop values stay inline
 * in the saved markup; everything here is emitted as a scoped <style> added to
 * the rendered output only, so the saved block output is never changed (no
 * validation errors). A per-render unique class is injected into the outer wrap
 * so each block instance is targeted independently. Breakpoints match the
 * editor: tablet <=1024px, mobile <=767px.
 */
function skt_new_blocks_pricing_list_responsive( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/pricing-list' !== $block['blockName'] ) {
		return $block_content;
	}
	if ( '' === trim( (string) $block_content ) ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();

	$num = function ( $k ) use ( $attrs ) {
		return ( isset( $attrs[ $k ] ) && is_numeric( $attrs[ $k ] ) ) ? floatval( $attrs[ $k ] ) : null;
	};

	static $counter = 0;
	$counter++;
	$uid = 'skt-pl-f-' . $counter;
	$sel = '.' . $uid;

	$build = function ( $suffix ) use ( $num, $sel ) {
		$css = '';
		$iw  = $num( 'imageWidth' . $suffix );
		if ( null !== $iw ) {
			$css .= $sel . ' .skt-blocks-pricing-list-item-image{width:' . $iw . 'px!important;max-width:' . $iw . 'px!important;}';
		}
		$sw = $num( 'seperatorWidth' . $suffix );
		if ( null !== $sw ) {
			$css .= $sel . ' .skt-blocks-pricing-list-item-separator{width:' . $sw . '%!important;}';
		}
		$rg = $num( 'rowGap' . $suffix );
		$cg = $num( 'columnGap' . $suffix );
		if ( null !== $rg || null !== $cg ) {
			$css .= $sel . ' .skt-blocks-pricing-list-item-wrap{';
			if ( null !== $rg ) {
				$css .= 'margin-bottom:' . $rg . 'px!important;';
			}
			if ( null !== $cg ) {
				$css .= 'padding-left:' . ( $cg / 2 ) . 'px!important;padding-right:' . ( $cg / 2 ) . 'px!important;';
			}
			$css .= '}';
		}
		$ts = $num( 'titleSpace' . $suffix );
		if ( null !== $ts ) {
			$css .= $sel . ' .skt-blocks-pricing-list-item-title{margin-bottom:' . $ts . 'px!important;}';
		}
		$tp = $num( 'topPadding' . $suffix );
		$bp = $num( 'bottomPadding' . $suffix );
		$lp = $num( 'leftPadding' . $suffix );
		$rp = $num( 'rightPadding' . $suffix );
		if ( null !== $tp || null !== $bp || null !== $lp || null !== $rp ) {
			$css .= $sel . ' .skt-blocks-pricing-list-item-content{';
			if ( null !== $tp ) {
				$css .= 'padding-top:' . $tp . 'px!important;';
			}
			if ( null !== $bp ) {
				$css .= 'padding-bottom:' . $bp . 'px!important;';
			}
			if ( null !== $lp ) {
				$css .= 'padding-left:' . $lp . 'px!important;';
			}
			if ( null !== $rp ) {
				$css .= 'padding-right:' . $rp . 'px!important;';
			}
			$css .= '}';
		}
		return $css;
	};

	$tablet = $build( 'Tablet' );
	$mobile = $build( 'Mobile' );

	$hide_desktop = ! empty( $attrs['hideDesktop'] );
	$hide_tablet  = ! empty( $attrs['hideTablet'] );
	$hide_mobile  = ! empty( $attrs['hideMobile'] );

	if ( '' === $tablet && '' === $mobile && ! $hide_desktop && ! $hide_tablet && ! $hide_mobile ) {
		return $block_content;
	}

	$css = '';
	if ( '' !== $tablet ) {
		$css .= '@media (max-width:1024px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media (max-width:767px){' . $mobile . '}';
	}
	if ( $hide_desktop ) {
		$css .= '@media (min-width:1025px){' . $sel . '{display:none!important;}}';
	}
	if ( $hide_tablet ) {
		$css .= '@media (min-width:768px) and (max-width:1024px){' . $sel . '{display:none!important;}}';
	}
	if ( $hide_mobile ) {
		$css .= '@media (max-width:767px){' . $sel . '{display:none!important;}}';
	}

	// Inject the per-instance class into the outer wrapper (output only).
	$block_content = preg_replace(
		'/(class="skt-blocks-pricing-list-outer-wrap)(")/',
		'$1 ' . $uid . '$2',
		$block_content,
		1
	);

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_pricing_list_responsive', 10, 2 );

/**
 * Video Popup: hide for logged-in / logged-out users. Output-only (no saved
 * markup change), so it never causes block validation errors.
 */
function skt_new_blocks_video_popup_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/video-popup' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_video_popup_login_visibility', 10, 2 );

/**
 * Video Popup: device visibility (hide on desktop / tablet / mobile). Scoped by
 * the block's own per-instance class (.skt-blocks-block-<counterId>), already
 * present in the saved markup. Emitted as a scoped <style> added to the rendered
 * output only, so the saved block output is never changed (no validation
 * errors). Breakpoints match the editor: tablet <=1024px, mobile <=767px.
 */
function skt_new_blocks_video_popup_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/video-popup' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$cid   = isset( $attrs['counterId'] ) ? $attrs['counterId'] : '';
	if ( '' === $cid ) {
		return $block_content;
	}

	$hide_desktop = ! empty( $attrs['hideDesktop'] );
	$hide_tablet  = ! empty( $attrs['hideTablet'] );
	$hide_mobile  = ! empty( $attrs['hideMobile'] );
	if ( ! $hide_desktop && ! $hide_tablet && ! $hide_mobile ) {
		return $block_content;
	}

	$cid_clean = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $cid );
	$sel       = '.skt-blocks-block-' . $cid_clean;

	$css = '';
	if ( $hide_desktop ) {
		$css .= '@media (min-width:1025px){' . $sel . '{display:none!important;}}';
	}
	if ( $hide_tablet ) {
		$css .= '@media (min-width:768px) and (max-width:1024px){' . $sel . '{display:none!important;}}';
	}
	if ( $hide_mobile ) {
		$css .= '@media (max-width:767px){' . $sel . '{display:none!important;}}';
	}

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_video_popup_visibility', 10, 2 );

/**
 * Testimonial Slider: hide for logged-in / logged-out users. Output-only (no
 * saved markup change), so it never causes block validation errors.
 */
function skt_new_blocks_testimonial_slider_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/testimonial-slider' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_testimonial_slider_login_visibility', 10, 2 );

/**
 * Content Timeline: hide for logged-in / logged-out users. Output-only.
 */
function skt_new_blocks_content_timeline_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/content-timeline' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_content_timeline_login_visibility', 10, 2 );

/**
 * Content Timeline: responsive (tablet/mobile) item padding + spacing + device
 * visibility. Scoped by the block's own per-instance class
 * (.wp-block-skt-blocks-content-timeline-<counterId>), already in the saved
 * markup. Output-only, so the saved block markup is never changed (no validation
 * errors). Breakpoints match the editor: tablet <=1024px, mobile <=767px.
 */
function skt_new_blocks_content_timeline_responsive( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/content-timeline' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	$cid   = isset( $attrs['counterId'] ) ? $attrs['counterId'] : '';
	if ( '' === $cid ) {
		return $block_content;
	}
	$cid_clean = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $cid );
	$c         = '.wp-block-skt-blocks-content-timeline-' . $cid_clean;

	$num = function ( $k ) use ( $attrs ) {
		return ( isset( $attrs[ $k ] ) && is_numeric( $attrs[ $k ] ) && '' !== $attrs[ $k ] ) ? floatval( $attrs[ $k ] ) : null;
	};
	$build = function ( $suffix ) use ( $num, $c ) {
		$css = '';
		$ip  = $num( 'itemPadding' . $suffix );
		if ( null !== $ip ) {
			$css .= $c . ' .responsive-timeline__events-inner-new{padding:' . $ip . 'px!important;}';
		}
		$hs = $num( 'horizontalSpace' . $suffix );
		if ( null !== $hs ) {
			$css .= $c . ' .responsive-timeline__marker,' . $c . ' .responsive-timeline__line{margin-left:' . $hs . 'px!important;margin-right:' . $hs . 'px!important;}';
		}
		$vs = $num( 'verticalSpace' . $suffix );
		if ( null !== $vs ) {
			$css .= $c . ' .responsive-timeline__field{margin-bottom:' . $vs . 'px!important;}';
		}
		$hm = $num( 'headingBottomMargin' . $suffix );
		if ( null !== $hm ) {
			$css .= $c . ' .responsive-timeline__heading{margin-bottom:' . $hm . 'px!important;}';
		}
		return $css;
	};
	$tablet = $build( 'Tablet' );
	$mobile = $build( 'Mobile' );

	$hide_desktop = ! empty( $attrs['hideDesktop'] );
	$hide_tablet  = ! empty( $attrs['hideTablet'] );
	$hide_mobile  = ! empty( $attrs['hideMobile'] );

	if ( '' === $tablet && '' === $mobile && ! $hide_desktop && ! $hide_tablet && ! $hide_mobile ) {
		return $block_content;
	}

	$css = '';
	if ( '' !== $tablet ) {
		$css .= '@media (max-width:1024px){' . $tablet . '}';
	}
	if ( '' !== $mobile ) {
		$css .= '@media (max-width:767px){' . $mobile . '}';
	}
	if ( $hide_desktop ) {
		$css .= '@media (min-width:1025px){' . $c . '{display:none!important;}}';
	}
	if ( $hide_tablet ) {
		$css .= '@media (min-width:768px) and (max-width:1024px){' . $c . '{display:none!important;}}';
	}
	if ( $hide_mobile ) {
		$css .= '@media (max-width:767px){' . $c . '{display:none!important;}}';
	}

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_content_timeline_responsive', 10, 2 );

/**
 * Post Timeline: hide for logged-in / logged-out users. Output-only.
 */
function skt_new_blocks_post_timeline_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/post-timeline' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_post_timeline_login_visibility', 10, 2 );

/**
 * Section (skt-blocks/section): hide for logged-in / logged-out users. Output-only.
 */
function skt_new_blocks_legacy_section_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/section' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_legacy_section_login_visibility', 10, 2 );

/**
 * Google Map (skt-blocks/googlemap): hide for logged-in / logged-out users. Output-only.
 */
function skt_new_blocks_googlemap_login_visibility( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/googlemap' !== $block['blockName'] ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();
	if ( ! empty( $attrs['hideLoggedIn'] ) && is_user_logged_in() ) {
		return '';
	}
	if ( ! empty( $attrs['hideLoggedOut'] ) && ! is_user_logged_in() ) {
		return '';
	}
	return $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_googlemap_login_visibility', 10, 2 );

/**
 * Google Map (skt-blocks/googlemap): responsive map height (tablet/mobile) +
 * device visibility. Output-only; save.js is never changed.
 */
function skt_new_blocks_googlemap_responsive( $block_content, $block ) {
	if ( empty( $block['blockName'] ) || 'skt-blocks/googlemap' !== $block['blockName'] ) {
		return $block_content;
	}
	if ( '' === trim( (string) $block_content ) ) {
		return $block_content;
	}
	$attrs = isset( $block['attrs'] ) ? $block['attrs'] : array();

	$num = function ( $k ) use ( $attrs ) {
		return ( isset( $attrs[ $k ] ) && is_numeric( $attrs[ $k ] ) ) ? floatval( $attrs[ $k ] ) : null;
	};

	static $counter = 0;
	$counter++;
	$uid = 'skt-gm-f-' . $counter;
	$sel = '.' . $uid;

	$ht = $num( 'heightTablet' );
	$hm = $num( 'heightMobile' );

	$hide_desktop = ! empty( $attrs['hideDesktop'] );
	$hide_tablet  = ! empty( $attrs['hideTablet'] );
	$hide_mobile  = ! empty( $attrs['hideMobile'] );

	if ( null === $ht && null === $hm && ! $hide_desktop && ! $hide_tablet && ! $hide_mobile ) {
		return $block_content;
	}

	$css = '';
	if ( null !== $ht ) {
		$css .= '@media (max-width:1024px){' . $sel . ' iframe{min-height:' . $ht . 'px!important;height:' . $ht . 'px!important;}}';
	}
	if ( null !== $hm ) {
		$css .= '@media (max-width:767px){' . $sel . ' iframe{min-height:' . $hm . 'px!important;height:' . $hm . 'px!important;}}';
	}
	if ( $hide_desktop ) {
		$css .= '@media (min-width:1025px){' . $sel . '{display:none!important;}}';
	}
	if ( $hide_tablet ) {
		$css .= '@media (min-width:768px) and (max-width:1024px){' . $sel . '{display:none!important;}}';
	}
	if ( $hide_mobile ) {
		$css .= '@media (max-width:767px){' . $sel . '{display:none!important;}}';
	}

	// Inject the per-instance class into the wrapper (output only).
	$block_content = preg_replace(
		'/(skt-blocks-block-googlemap)/',
		'$1 ' . $uid,
		$block_content,
		1
	);

	return '<style>' . $css . '</style>' . $block_content;
}
add_filter( 'render_block', 'skt_new_blocks_googlemap_responsive', 10, 2 );
