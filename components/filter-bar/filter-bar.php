<?php
if (empty($args)) {
    $args = [];
}

$defaults = [
    'active_label' => 'Все',
];

$args = wp_parse_args($args, $defaults);
[
    'active_label' => $active_label,
] = $args;
?>
<div class="filter-bar">
    <button class="filter-btn active" data-filter="all"><?= esc_html($active_label) ?></button>
</div>
