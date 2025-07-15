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
$block_name = get_field('block_name');
?>
<section class="section__post-list__big__wrapper" data-id-name="<?= $block_id_name ?>" id="postslist">
    <div class="section__post-list__big__heading section__heading">
        <?php if ($block_name): ?>
            <h2 class="section__title" id="favorites">
                <?= $block_name ?>
            </h2>
        <? endif ?>
        <!-- <div class="section__caption">
            Собрал работы, над которыми работал в последнее время
        </div> -->
    </div>
    <div class="filter-bar">
        <button class="filter-btn  active" data-filter="all">Все</button>
    </div>
    <div class="section__post-list__big">
        <?= getPostsCardBig(-1, null, $post_list_tag, $post_list_category) ?>
    </div>

</section>