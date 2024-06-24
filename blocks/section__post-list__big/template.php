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

$post_list_filter_taxonomy_category = get_field('post_list_filter_taxonomy_category');
$posts_category = $post_list_filter_taxonomy_category->term_id;
$post_list_filter_taxonomy_tag = get_field('post_list_filter_taxonomy_tag');
$posts_tag = $post_list_filter_taxonomy_tag->term_id;

?>
<div class="section__post-list__big__wrapper">
    <div class="section__post-list__big__heading">
        <h3 class="section__post-list__big__title">
            Избранные работы
        </h3>
        <div class="section__post-list__big__heading__count">
            (<?= (getPostsCardBigCount(-1, null, $posts_tag, $posts_category))?>)
        </div>
    </div>
    <div class="section__post-list__big">
        <?= getPostsCardBig(-1, null, $posts_tag, $posts_category) ?>
    </div>
</div>