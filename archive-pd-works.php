<?php

/**
 * Archive template for portfolio works.
 */

get_header();
?>

<main class="works-archive pd_section">
	<div class="pd_width_50">
		<h1><?php post_type_archive_title(); ?></h1>
	</div>

	<?php
	echo do_blocks(
		'<!-- wp:prok/section-works-grid {"name":"prok/section-works-grid","data":{"block_id":"","_block_id":"field_667fd5a3268ac","block_id_name":"","_block_id_name":"field_667fd621ee9a5","block_name":"","_block_name":"field_67010dc435920","block_caption":"","_block_caption":"field_67010dcf35921"},"mode":"preview"} /-->'
	);
	?>
</main>

<?php
get_footer();
