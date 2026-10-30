<?php
if ( ! defined( 'ABSPATH' ) ) exit;
function skt_blocks_image_slider_add_frontend_assets() {
	if ( has_block( 'skt-blocks/image-slider' ) ) {
		wp_enqueue_script(
			'skt_blocks-image-slider-front-script',
            SKT_BLOCKS_URL . '/dist/js/vendors/flickity.js',
			array(),
			SKT_BLOCKS_VER,
			true
		);

		// Re-layout each carousel once its images have loaded, so Flickity
		// measures the correct cell widths. Without this, Flickity can init
		// before images load and the slides overlap / stack on top of each other.
		$skt_slider_relayout = '( function () {
			function sktRelayoutFlickity() {
				if ( ! window.Flickity ) { return; }
				var carousels = document.querySelectorAll( ".has-carousel[data-flickity]" );
				for ( var i = 0; i < carousels.length; i++ ) {
					var inst = window.Flickity.data( carousels[ i ] );
					if ( inst && typeof inst.resize === "function" ) {
						inst.resize();
						if ( typeof inst.reloadCells === "function" ) { inst.reloadCells(); }
					}
				}
			}
			window.addEventListener( "load", sktRelayoutFlickity );
			setTimeout( sktRelayoutFlickity, 300 );
			setTimeout( sktRelayoutFlickity, 1000 );
			setTimeout( sktRelayoutFlickity, 2000 );
		} )();';
		wp_add_inline_script( 'skt_blocks-image-slider-front-script', $skt_slider_relayout );

		wp_enqueue_script(
			'skt_blocks-image-slider-lightbox',
			SKT_BLOCKS_URL . '/dist/skt-blocks-lightbox.js',
			array(),
			SKT_BLOCKS_VER,
			true
		);
	}
}

add_action( 'wp_enqueue_scripts', 'skt_blocks_image_slider_add_frontend_assets' );
add_action( 'the_post', 'skt_blocks_image_slider_add_frontend_assets' );