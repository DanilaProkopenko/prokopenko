<?php
/* 
Template name: Архив работы
Template Post Type: page
*/

get_header();
?>

<div class="junk-archive pd_width_50 pd_section">
    <h1>Свалка</h1>
    <p class="">
        Здесь свалены заметки, наброски, полуготовые идеи и&nbsp;странные эксперименты. Ничего не&nbsp;обещает
        быть законченным или идеальным&nbsp;&mdash; это рабочий черновик всего, что интересно прямо сейчас.
    </p>
    <?php
    $query = new WP_Query([
        'post_type'      => 'junk',
        'posts_per_page' => -1, // все записи
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();

            $thumb = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail');
    ?>
            <div class="card-junk">
                <h4 class="">
                    <a href="<?php the_permalink(); ?>" class="">
                        <?php the_title(); ?>
                    </a>
                </h4>
                <p class="">
                    <?php echo has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 40); ?>
                </p>
                <?php if (has_post_thumbnail()) : ?>
                    <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>"
                        alt="<?php the_title_attribute(); ?>"
                        class="card-junk__thumb">
                <?php endif; ?>
            </div>
        <?php
        endwhile;
        wp_reset_postdata();
    else :
        ?>
        <p>Пока тут пусто.</p>
    <?php endif; ?>
</div>

<?php
get_footer();
