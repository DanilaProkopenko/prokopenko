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


$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');
?>
<section class="section__post-list__big__wrapper" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">
    <div class="section__post-list__big__heading section__heading main-padding">
        <div class="section__title">
            Избранные работы
        </div>
        <div class="section__caption">
            Собрал работы, над которыми работал в последнее время
        </div>
    </div>
    <!-- <div class="section__post-list__big main-padding cards"> -->
    <div class="section__post-list__big main-padding">
        <?= getPostsCardBig(-1, null, $posts_tag, $posts_category) ?>
    </div>

</section>

<script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>
<script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/gsap@3/dist/ScrollToPlugin.min.js"></script>