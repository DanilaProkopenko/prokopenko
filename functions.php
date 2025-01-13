<?php

define('THEME_URL',        get_template_directory_uri());
define('THEME_DIR',        get_template_directory());
define('SITE_URL',         home_url('/'));

$current_user_role = null;
$current_user_id = null;
if (is_user_logged_in()) {
	$current_user       = wp_get_current_user();
	$current_user_role  = ($current_user->roles)[0];
	$current_user_id    = $current_user->ID;
}
define('CURRENT_USER_ID',      $current_user_id);
define('CURRENT_USER_ROLE',    $current_user_role);

if (defined('HIDE_ADMIN_BAR') && HIDE_ADMIN_BAR) {
	add_filter('show_admin_bar', '__return_false');
}

add_action('acf/init', 'wwzrds_init_global_acf_constants');
function wwzrds_init_global_acf_constants()
{
	define('GLOBAL_EXAMPLE_FIELD_VALUE', get_field('global_example_field', 'options'));
}

/**
 * Removes or edits the 'Protected:' part from posts titles
 */

add_filter('protected_title_format', 'remove_protected_text');
function remove_protected_text()
{
	return __('%s (NDA)');
}

function my_password_form()
{
	global $post;
	$label = 'pwbox-' . (empty($post->ID) ? rand() : $post->ID);
	$o = '<div class="post-password__page"> <form action="' . esc_url(site_url('wp-login.php?action=postpass', 'login_post')) . '" method="post" class="post-password-form" data-bitwarden-watching="1">
	<h3 class="post-password__title h3">Этот контент <br>защищен паролем</h3>
    <label class="post-password__caption caption" for="' . $label . '">' . __("Напишите мне, если вы его не имеете") . ' </label>
	<input class="post-password__input" name="post_password" id="' . $label . '" type="password" size="20" maxlength="20" placeholder="Пароль"/>
	<input class="post-password__submit link-button link-button_blue" type="submit" name="Submit" value="' . esc_attr__("Продолжить") . '" />
    </form>
	</div>
    ';
	return $o;
}
add_filter('the_password_form', 'my_password_form');

require_once THEME_DIR . '/includes/load.php';
require_once THEME_DIR . '/blocks/load.php';
