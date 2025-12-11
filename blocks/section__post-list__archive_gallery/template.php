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

$post_list_category = get_field('post_list_category');
$post_list_tag = get_field('post_list_tag');

$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');
?>

<div class="posts-list__archive-gallery__wrapper" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">
    <!-- <div class="posts-list__archive__heading section__heading main-padding">
        <div class="section__caption">
            Маленькие работы, или pet–проекты
        </div>
    </div>
    <h2 class="section__title">
        Другие работы
    </h2>
    <p></p> -->
    <div class="posts-list__archive-gallery f-carousel">
        <?= getPostsArchiveGallery(-1, null, $post_list_tag, $post_list_category); ?>
        <?php echo $post_list_category; ?>
    </div>
</div>