<?php

function skt_blocks_accordion_add_frontend_assets() {
	if ( has_block( 'skt-blocks/accordion' ) ) {
		wp_enqueue_script(
			'skt_blocks-accordion-front-script',
			plugins_url( 'accordion.js', __FILE__ ),
			array(),
			SKT_BLOCKS_VER,
			true
		);
	}
}

add_action( 'wp_enqueue_scripts', 'skt_blocks_accordion_add_frontend_assets' );
