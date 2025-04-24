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

// Подключение dashicons
wp_enqueue_style('dashicons');

function load_dashicons()
{
	wp_enqueue_style('dashicons');
}

add_action('wp_enqueue_scripts', 'load_dashicons');



/**
 * Removes or edits the 'Protected:' part from posts titles
 */

add_filter('protected_title_format', 'remove_protected_text');
function remove_protected_text()
{
	// return __('%s (NDA)');
	return __('%s <span class="dashicons dashicons-lock"></span>');
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
// require_once get_stylesheet_directory() . '/includes/load.php';
// require_once get_stylesheet_directory() . '/blocks/load.php';


// Выдает блок навигации по странице по заголовкам
function block_post_navigation()
{
	ob_start();
	echo do_blocks('<!-- wp:wwzrds/post-navigation {"name":"wwzrds/post-navigation","data":{"block_id":"","_block_id":"field_667fd5a3268ac","block_id_name":"","_block_id_name":"field_667fd621ee9a5","block_name":"","_block_name":"field_67010dc435920","block_caption":"","_block_caption":"field_67010dcf35921"},"mode":"preview"} /-->');

	return ob_get_clean();
}
add_shortcode('block_post_navigation', 'block_post_navigation');

// Выдает блок с записями листалка
function block_archive($atts)
{
	ob_start();
	$atts = shortcode_atts(array(
        'category' => null,
        'tag' => null,
    ), $atts, 'block_archive');

	echo do_blocks('<!-- wp:prok/section-post-list-archive-gallery 
	{
	"name":"prok/section-post-list-archive-gallery",
	"data":
	{
	"block_id":"",
	"_block_id":"field_667fd5a3268ac",
	"block_id_name":"",
	"_block_id_name":"field_667fd621ee9a5",
	"block_name":"",
	"_block_name":"field_67010dc435920",
	"block_caption":"",
	"_block_caption":"field_67010dcf35921",
	"post_list_category":"' . esc_html($atts['category']) . '",
	"_post_list_category":"field_67dd27498f69e",
	"post_list_tag":"' . esc_html($atts['tag']) . '",
	"_post_list_tag":"field_67dd27fe8f69f"},
	"mode":"preview"
	} /-->');
	return ob_get_clean();
}
add_shortcode('block_archive', 'block_archive');

// Выдает блок мета
function block_post_meta()
{
	ob_start();
	echo do_blocks('<!-- wp:prok/single-post-meta 
	{"name":"prok/single-post-meta",
	"data":{"block_id":"","_block_id":"field_667fd5a3268ac","block_id_name":"",
	"_block_id_name":"field_667fd621ee9a5",
	"block_name":"",
	"_block_name":"field_67010dc435920",
	"block_caption":"",
	"_block_caption":"field_67010dcf35921"},
	"mode":"preview"} /-->');
	return ob_get_clean();
}
add_shortcode('block_post_meta', 'block_post_meta');

// Выдает блок пробела
function pd_spacer()
{
	ob_start();
	echo do_blocks('<!-- wp:wwzrds/pd-spacer {"name":"wwzrds/pd-spacer","data":{"block_id":"","_block_id":"field_667fd5a3268ac","block_id_name":"","_block_id_name":"field_667fd621ee9a5","block_name":"","_block_name":"field_67010dc435920","block_caption":"","_block_caption":"field_67010dcf35921"},"mode":"preview"} /-->');
	return ob_get_clean();
}
add_shortcode('pd_spacer', 'pd_spacer');

// Выдает блок категорий поста
function post_category()
{
	ob_start();
	echo do_blocks('
	<!-- wp:wwzrds/post-category {"name":"wwzrds/post-category","data":{"block_id":"","_block_id":"field_667fd5a3268ac","block_id_name":"","_block_id_name":"field_667fd621ee9a5","block_name":"","_block_name":"field_67010dc435920","block_caption":"","_block_caption":"field_67010dcf35921"},"mode":"preview"} /-->
	');
	return ob_get_clean();
}
add_shortcode('post_category', 'post_category');


/**
 * Enqueues script with WordPress and adds version number that is a timestamp of the file modified date.
 * 
 * @param string      $handle    Name of the script. Should be unique.
 * @param string|bool $src       Path to the script from the theme directory of WordPress. Example: '/js/myscript.js'.
 * @param array       $deps      Optional. An array of registered script handles this script depends on. Default empty array.
 * @param bool        $in_footer Optional. Whether to enqueue the script before </body> instead of in the <head>.
 *                               Default 'false'.
 */
function enqueue_versioned_script($handle, $src = false, $deps = array(), $in_footer = false)
{
	wp_enqueue_script($handle, get_stylesheet_directory_uri() . $src, $deps, filemtime(get_stylesheet_directory() . $src), $in_footer);
}

/**
 * Enqueues stylesheet with WordPress and adds version number that is a timestamp of the file modified date.
 *
 * @param string      $handle Name of the stylesheet. Should be unique.
 * @param string|bool $src    Path to the stylesheet from the theme directory of WordPress. Example: '/css/mystyle.css'.
 * @param array       $deps   Optional. An array of registered stylesheet handles this stylesheet depends on. Default empty array.
 * @param string      $media  Optional. The media for which this stylesheet has been defined.
 *                            Default 'all'. Accepts media types like 'all', 'print' and 'screen', or media queries like
 *                            '(orientation: portrait)' and '(max-width: 640px)'.
 */
function enqueue_versioned_style($handle, $src = false, $deps = array(), $media = 'all')
{
	wp_enqueue_style($handle, get_stylesheet_directory_uri() . $src, $deps = array(), filemtime(get_stylesheet_directory() . $src), $media);
}

add_action('wp_enqueue_scripts', 'my_scripts_method');
function my_scripts_method()
{
	wp_enqueue_script('jquery');
}

add_action('wp_enqueue_scripts', function () {

	// enqueue_versioned_style('pinta-sport', '/assets/css/style.css');

	enqueue_versioned_script(
		'main.js',
		'/_dist/js/pagetransition.min.js',
		array('jquery'),
		true
	);
});


// Добавление module к скрипту
function make_scripts_modules($tag, $handle, $src)
{

	if ('main.js' !== $handle) {
		return $tag;
	}

	$id = $handle . '-js';

	$parts = explode('</script>', $tag); // Break up our string

	foreach ($parts as $key => $part) {
		if (false !== strpos($part, $src)) { // Make sure we're only altering the tag for our module script.
			$parts[$key] = '<script type="module" src="' . esc_url($src) . '" id="' . esc_attr($id) . '">';
		}
	}

	$tags = implode('</script>', $parts); // Bring everything back together

	return $tags;
}
add_filter('script_loader_tag', 'make_scripts_modules', 10, 3);

add_filter('upload_mimes', 'svg_upload_allow');

# Добавляет SVG в список разрешенных для загрузки файлов.
function svg_upload_allow($mimes)
{
	$mimes['svg']  = 'image/svg+xml';
	return $mimes;
}
add_filter('wp_check_filetype_and_ext', 'fix_svg_mime_type', 10, 5);

# Исправление MIME типа для SVG файлов.
function fix_svg_mime_type($data, $file, $filename, $mimes, $real_mime = '')
{
	// WP 5.1 +
	if (version_compare($GLOBALS['wp_version'], '5.1.0', '>='))
		$dosvg = in_array($real_mime, ['image/svg', 'image/svg+xml']);
	else
		$dosvg = ('.svg' === strtolower(substr($filename, -4)));
	// mime тип был обнулен, поправим его
	// а также проверим право пользователя
	if ($dosvg) {
		// разрешим
		if (current_user_can('manage_options')) {
			$data['ext']  = 'svg';
			$data['type'] = 'image/svg+xml';
		}
		// запретим
		else {
			$data['ext'] = $type_and_ext['type'] = false;
		}
	}

	return $data;
}


/*
* Создание CPT покрытий и цветов
*/

function custom_post_type_pd_worksfeed()
{

    // Set UI labels for Custom Post Type
    $labels = array(
        'name'                => __('Архив работ'),
        'singular_name'       => __('Архивная работа'),
        'menu_name'           => __('Архив работ'),
        'parent_item_colon'   => __('Parent menu'),
        'all_items'           => __('Все работы'),
        'view_item'           => __('Просмотреть работу'),
        'add_new_item'        => __('Добавить новую работу'),
        'add_new'             => __('Добавить новую'),
        'edit_item'           => __('Редактировать работу'),
        'update_item'         => __('Обновить работу'),
        'search_items'        => __('Искать работу'),
        'not_found'           => __('Не найдено'),
        'not_found_in_trash'  => __('Не найдено в мусорке'),
    );

    // Set other options for Custom Post Type

    $args = array(
        'label'               => __('pd-worksfeed'),
        'description'         => __('Архив работ, малые привьюшки, как шоты на drible'),
        'labels'              => $labels,
        // Features this CPT supports in Post Editor
        // 'supports'            => array('title', 'editor', 'revisions', 'custom-fields',),
        'supports'            => array('title', 'revisions', 'custom-fields',),
        // You can associate this CPT with a taxonomy or custom taxonomy. 
        //'taxonomies'          => array('nika_products-category'),
        'taxonomies'          => array('category'),
        /* A hierarchical CPT is like Pages and can have
        * Parent and child items. A non-hierarchical CPT
        * is like Posts.
        */
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 7,
        'menu_icon'           => 'dashicons-archive',
        'can_export'          => true,
        'has_archive'         => true,
        'rewrite'     => array('slug' => 'worksfeed'), // my custom slug
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
        'show_in_rest' => true,

    );

    // ; register_taxonomy(
    // ;     'nika_products-category',
    // ;     'nika-products',
    // ;     array(
    // ;         'labels' => array(
    // ;             'name'              => 'Категории',
    // ;             'singular_name'     => 'Категория',
    // ;             'search_items'      => 'Search Article Categories',
    // ;             'all_items'         => 'All Article Categories',
    // ;             'edit_item'         => 'Edit Article Categories',
    // ;             'update_item'       => 'Update Article Category',
    // ;             'add_new_item'      => 'Add New Article Category',
    // ;             'new_item_name'     => 'New Article Category Name',
    // ;             'menu_name'         => 'Article Category',
    // ;         ),
    // ;         'rewrite' => array('slug' => 'product-category'),
    // ;         'hierarchical' => true,
    // ;         'sort' => true,
    // ;         'args' => array('orderby' => 'term_order'),
    // ;         'show_admin_column' => true
    // ;     )
    // ; );

    // Registering your Custom Post Type
    register_post_type('pd-worksfeed', $args);
}

add_action('init', 'custom_post_type_pd_worksfeed', 0);