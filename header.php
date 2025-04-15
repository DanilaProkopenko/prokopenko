<!DOCTYPE html>
<!--suppress HtmlRequiredLangAttribute -->
<html <?php language_attributes(); ?>>
<!--suppress HtmlRequiredTitleElement -->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <?php wp_head(); ?>
</head>

<?php
$page_color = get_field('page-color');
?>

<body data-barba="wrapper" id="barba-wrapper" <?php body_class("container " . $page_color); ?>>

    <?php wp_body_open();
    get_template_part('components/header/header'); ?>

    <main id="main" data-barba="container" data-barba-namespace="one-pager">
        <!-- <nav class="header__page-nav"></nav> -->