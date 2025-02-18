<!DOCTYPE html>
<!--suppress HtmlRequiredLangAttribute -->
<html <?php language_attributes(); ?>>
<!--suppress HtmlRequiredTitleElement -->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <?php wp_head(); ?>
</head>

<body data-barba="wrapper" id="barba-wrapper" <?php body_class('container'); ?>>

    <?php wp_body_open();
    get_template_part('components/header/header'); ?>

    <main id="main" data-barba="container" data-barba-namespace="one-pager">
        <!-- <nav class="header__page-nav"></nav> -->