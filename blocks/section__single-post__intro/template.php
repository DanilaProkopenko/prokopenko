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

$title = get_field('single-post_intro_title');
$caption = get_field('single-post_intro_caption');
$image = get_field('single-post_intro_image');

$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');

$id = get_the_ID();
?>

<section class="section__single-post__intro section" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">

    <? if ($image) : ?>
        <div class="section__single-post__intro__image">
            <img src="<?= ($image['sizes']['large']); ?>" alt="" class="section__single-post__intro__image__source">
        </div>
    <?php endif; ?>

    <div class="section__single-post__intro__content">
        <h1 class="section__single-post__intro__title">
            <?= get_the_title($id) ?>
        </h1>

        <div class="section__single-post__intro__description__wrapper">
            <div class="section__single-post__intro__description">
                <?= $caption ?>
            </div>
            <div class="section__single-post__meta__wrapper">
                <?
                $post_meta_repeater = get_field('post_meta-repeater', $id);
                if (have_rows('post_meta-repeater', $id)) :
                ?>
                    <div class="section__single-post__meta">
                        <?
                        while (have_rows('post_meta-repeater', $id)) : the_row();
                            $post_meta_variable = get_sub_field('post_meta-variable');
                            $post_meta_value = get_sub_field('post_meta-value');
                        ?>
                            <div class="section__single-post__meta__item">
                                <div class="section__single-post__meta__item__variable"><?= $post_meta_variable ?></div>
                                <div class="section__single-post__meta__item__value"><?= $post_meta_value ?></div>
                            </div>
                        <? endwhile; ?>
                    </div>
                <? endif ?>
                <?
                $users = get_field("post_meta_team", $id);
                if ($users) :
                ?>
                    <div class="section__single-post__meta__team">
                        <div class="section__single-post__meta__team__images__wrapper">
                            <? foreach ($users as $user) : ?>
                                <img src="<?= esc_attr(get_avatar_url($user['ID'])); ?>" alt="Аватар пользователя" class="section__single-post__meta__teaam__imge__source">
                            <? endforeach; ?>
                            <img src="<?= esc_attr(get_avatar_url('danilaprok20@gmail.com')); ?>" alt="Аватар пользователя" class="section__single-post__meta__teaam__imge__source">
                        </div>
                        <div class="section__single-post__meta__team__name">
                            Совместно с
                            <? foreach ($users as $user) : ?>
                                <a href="<?= esc_attr($user['user_url']) ?>" target="_blank">
                                    <?= esc_attr($user['nickname']) ?>
                                </a>
                            <? endforeach; ?>
                        </div>
                    </div>
                <? endif; ?>
            </div>
        </div>
    </div>

</section>