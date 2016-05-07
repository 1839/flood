<?php
add_theme_support( 'title-tag' );

	wp_register_style( 'bones-stylesheet', get_stylesheet_directory_uri() . '/library/css/style.css', array(), '', 'all' );
	wp_register_script( 'bones-js', get_stylesheet_directory_uri() . '/library/js/scripts.js', array( 'jquery' ), '', true );
	wp_enqueue_style( 'bones-stylesheet' );
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'bones-js' );
	
	// https://deliciousbrains.com/creating-a-wordpress-theme-using-the-rest-api-and-vue-js/
	//$base_url  = esc_url_raw( home_url() );
	//$base_path = rtrim( parse_url( $base_url, PHP_URL_PATH ), '/' );
	//wp_enqueue_script( 'rest-theme-vue', get_template_directory_uri() . '/rest-theme/dist/build.js', array(), '1.0.0', true );
//	wp_localize_script( 'flood-theme', 'wp', array(
//		'root'      => esc_url_raw( rest_url() ),
//		'base_url'  => $base_url,
//		'base_path' => $base_path ? $base_path . '/' : '/',
//		'nonce'     => wp_create_nonce( 'wp_rest' ),
//		'site_name' => get_bloginfo( 'name' ),
//		//'routes'    => flood_theme_routes(),
//	) );

//add_action( 'wp_enqueue_scripts', 'flood_theme_scripts' );
//function flood_theme_routes() {
//	$routes = array();
//	$query = new WP_Query( array(
//		'post_type'      => 'any',
//		'post_status'    => 'publish',
//		'posts_per_page' => -1,
//	) );
//	if ( $query->have_posts() ) {
//		while ( $query->have_posts() ) {
//			$query->the_post();
//			$routes[] = array(
//				'id'   => get_the_ID(),
//				'type' => get_post_type(),
//				'slug' => basename( get_permalink() ),
//			);
//		}
//	}
//	wp_reset_postdata();
//	return $routes;
//}

// Easily require custom post types => http://themble.com/bones/
// require_once( 'library/custom-post-type.php' );