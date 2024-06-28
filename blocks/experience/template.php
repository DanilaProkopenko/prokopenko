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

$title = get_field('experience-block_title');
$experience_item_repeater = get_field('experience-item_repeater');
?>

<section class="experience-block grid_12" id="experience">
    <!-- <h2 class="experience-block__title"><?= $title ?></h2> -->
    <? if (have_rows('experience-item_repeater')) : ?>
        <div class="experience-list">
            <? while (have_rows('experience-item_repeater')) : the_row();

                $item_img = get_sub_field('experience-item_img');
                $item_company = get_sub_field('experience-item_company');
                $item_position = get_sub_field('experience-item_position');
                $item_year = get_sub_field('experience-item_year');
                $item_description = get_sub_field('experience-item_description');
            ?>
                <div class="experience-item">
                    <img src="<?= esc_url($item_img['sizes']['medium']) ?>" alt="" class="experience-item__img">
                    <div class="experience-item__content">
                        <div class="experience-item__position">
                            <?= $item_position ?>
                        </div>
                        <div class="experience-item__company">
                            <?= $item_company ?>
                        </div>
                        <div class="experience-item__year">
                            <?= $item_year ?>
                        </div>
                        <div class="experience-item__description">
                            <?= $item_description ?>
                        </div>
                    </div>
                </div>
            <? endwhile ?>
        </div>
    <? endif ?>
</section>