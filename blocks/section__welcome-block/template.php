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

$custom_block_heading = get_field('welcome-screen_text');
?>

<section class="section__welcome-block" id="welcome">
        <div class="welcome-block__text">
            <?= $custom_block_heading ?>
        </div>
        <div class="welcome-block__caption">
            Ниже представлены мои избранные работы за последнее время
        </div>
        <?
        // $args = array(
        //     'menu' => 'contact',
        //     'depth'    => 0,
        //     'container' => 'div',
        //     'menu_class' => 'about-me__main-screen__description__links',
        //     'fallback_cb' => false
        // );

        // wp_nav_menu($args);
        ?>
    </div>
</section>