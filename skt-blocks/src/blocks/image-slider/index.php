<?php

function skt_blocks_image_slider_add_frontend_assets() {
	if ( has_block( 'skt-blocks/image-slider' ) ) {
		wp_enqueue_script(
			'skt_blocks-image-slider-front-script',
            SKT_BLOCKS_URL . '/dist/js/vendors/flickity.js',
			array(),
			SKT_BLOCKS_VER,
			true
		);

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
