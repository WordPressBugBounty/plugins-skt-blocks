<?php
/**
 * Plugin Name:   SKT Blocks
 * Plugin URI:    https://www.sktthemes.org/shop/gutenberg-wordpress-editor-plugin
 * Description:   SKT Blocks for Gutenberg
 * Author:        SKT Themes
 * Text Domain:   skt-blocks
 * License: 	  GPLv2 or later
 * License URI:   http://www.gnu.org/licenses/gpl-2.0.html 
 * Domain Path:   /languages
 * Version:       1.7
 *
 * @package       SKT Blocks
 */

define( 'SKT_BLOCKS_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'SKT_BLOCKS_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'SKT_BLOCKS_VER', '1.7' );
define( 'SKT_BLOCKS_BASENAME', plugin_basename( __FILE__ ) );

// Skt Blocks plugin's main file.
require plugin_dir_path( __FILE__ ) . 'includes/class-skt-blocks.php';

/**
 * The code that runs during plugin activation.
 */
function activate_skt_blocks() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-skt-blocks-activator.php';
	Skt_Blocks_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_skt_blocks() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-skt-blocks-deactivator.php';
	Skt_Blocks_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_skt_blocks' );
register_deactivation_hook( __FILE__, 'deactivate_skt_blocks' );

/**
 * Begins execution of the plugin.
 */
function run_skt_blocks() {

	$plugin = new Skt_Blocks();
}

run_skt_blocks();