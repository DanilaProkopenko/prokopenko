<?php
// Fix PhpStorm inspection on undefined variable.
if (empty($args)) {
    $args = [];
}

$defaults = [
    'label'         => '',
    'checked'       => false,
    'disabled'      => false,
    'custom_class'  => '',
    'id'            => '',
    'name'          => '',
    'value'         => '',
];

// Fill args with defaults to avoid errors.
$args = wp_parse_args($args, $defaults);

// Unpack arguments to variables for better readability.
// Should be in the same order as the keys in `$defaults` array.
[
    'label'         => $label,
    'checked'       => $checked,
    'disabled'      => $disabled,
    'custom_class'  => $custom_class,
    'id'            => $id,
    'name'          => $name,
    'value'         => $value,
] = $args;

$custom_block_heading = get_field('custom-block_heading');
$categories = get_the_category();
?>

<?php
if (! empty($categories)) {
    echo '<ul class="post-category list-style-none">';
    foreach ($categories as $category) {
        echo '<li><a href="' . get_category_link($category->term_id) . '">/' . $category->cat_name . '</a></li>';
    }
    echo '</ul>';
} 
?>