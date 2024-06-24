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
?>

<section class="section__welcome-block main-padding">
    <div class="welcome-block__content">
        <h1 class="welcome-block__title">Данила Прокопенко</h1>
        <!-- <div class="welcome-block__caption">Графический и веб–дизайнер в <a href="">zerna.design</a></div> -->
        <div class="welcome-block__caption">Дизайнер и разработчик в <a href="">zerna.design</a></div>
    </div>
</section>