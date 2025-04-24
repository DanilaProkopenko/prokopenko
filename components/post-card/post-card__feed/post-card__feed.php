<?php
if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $feed_thumb = $args['feed_thumb'];
    $feed_link = $args['feed_link'];
    $id = $args['id'];
}
?>
<div class="feed-post-card emerge">
    <?php
    $file = $feed_thumb;
    if ($file):

        // Extract variables.
        $url = $file['url'];
        $title = $file['filename'];
        $caption = $file['caption'];
        $icon = $file['icon'];

        // Display image thumbnail when possible.
        if ($file['type'] == 'image') :
            $icon =  $file['sizes']['large']; ?>
            <? // Begin caption wrap.
            if ($caption): ?>
                <div class="wp-caption">
                <?php endif; ?>
                <a
                    href="<?php echo esc_attr($icon); ?>"
                    data-fancybox="<?= $id ?>"
                    class="post-card-img link-border-none">
                    <img src="<?php echo esc_attr($icon); ?>" />
                </a>
                <?php
                // End caption wrap.
                if ($caption): ?>
                    <p class="wp-caption-text"><?php echo esc_html($caption); ?></p>
                </div>
            <?php endif; ?>
        <?php endif; ?>

        <? if ($file['type'] == 'video'): ?>
            <a
                href="<?php echo $file['url']; ?>"
                data-fancybox="<?= $id ?>"
                class="post-card-img link-border-none">
                <video
                    preload="auto"
                    no-controls
                    autoplay
                    loop
                    playsinline
                    muted
                    class="slide__video-video__source post-card__big__gallery__img__source _cover">
                    <source
                        src="<?php echo $file['url']; ?>"
                        type="video/mp4">
                </video>
            </a>

        <?php endif; ?>
    <?php endif; ?>
    <? if ($feed_link):
        $link_url = $feed_link['url'];
        $link_title = $feed_link['title'];
        $link_target = $feed_link['target'] ? $feed_link['target'] : '_self';
    ?>
        <a class="post-card-heading" href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>">
            <?= $title ?>
        </a>
    <? else: ?>
        <div class="post-card-heading">
            <?= $title ?>
        </div>
    <? endif ?>
    <div>
        <!-- <?= $feed_thumb ?> -->
    </div>
    <?php // echo do_shortcode('[post_category]') 
    ?>
</div>