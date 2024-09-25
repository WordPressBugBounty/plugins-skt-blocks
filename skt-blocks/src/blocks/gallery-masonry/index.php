<?php
function skt_blocks_gallery_masonry_add_frontend_assets() {
	if ( has_block( 'skt-blocks/gallery-masonry' ) ) {
		wp_enqueue_script(
			'skt_blocks-gallery-masonry-front-script',
			SKT_BLOCKS_URL . '/dist/skt-blocks-masonry.js',
			array( 'jquery', 'masonry', 'imagesloaded' ),
			SKT_BLOCKS_VER,
			true
		);

		wp_enqueue_script(
			'skt_blocks-gallery-masonry-lightbox',
			SKT_BLOCKS_URL . '/dist/skt-blocks-lightbox.js',
			array(),
			SKT_BLOCKS_VER,
			true
		);
	}
}

add_action( 'wp_enqueue_scripts', 'skt_blocks_gallery_masonry_add_frontend_assets' );
add_action( 'the_post', 'skt_blocks_gallery_masonry_add_frontend_assets' );
