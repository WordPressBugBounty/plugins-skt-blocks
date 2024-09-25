<?php
/**
 * Fired during plugin activation
 *
 * @link       https://www.sktthemes.org
 * @since      1.0.0
 *
 * @package    Skt_Blocks
 * @subpackage Skt_Blocks/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Skt_Blocks
 * @subpackage Skt_Blocks/includes
 * @author     SKT Themes <support@sktthemes.com>
 */
class Skt_Blocks_Activator {

	/**
	 * Short Description.
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		set_transient( 'skt_blocks_activation_redirect', true, MINUTE_IN_SECONDS );
	}
}
