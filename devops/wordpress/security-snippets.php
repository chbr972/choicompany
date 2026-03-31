<?php
/**
 * IssueByte.com — WordPress Security Code Snippets
 *
 * Add these snippets via the Code Snippets plugin (Snippets > Add New).
 * Enable each snippet individually so you can test them one at a time.
 *
 * Audit date: April 1, 2026
 */

// ============================================================
// SNIPPET 1: Block user enumeration via REST API
// Title: "Security: Block user enumeration"
// ============================================================
add_filter( 'rest_endpoints', function ( $endpoints ) {
    if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
    }
    if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    }
    return $endpoints;
} );

// Also block ?author= URL enumeration
add_action( 'init', function () {
    if ( ! is_admin() && isset( $_GET['author'] ) ) {
        wp_redirect( home_url(), 301 );
        exit;
    }
} );


// ============================================================
// SNIPPET 2: Restrict REST API to authenticated users
// Title: "Security: Require auth for REST API"
// NOTE: Keep disabled if your theme/plugins rely on public REST endpoints
//       (e.g., block-based themes fetching posts client-side). Test first.
// ============================================================
add_filter( 'rest_authentication_errors', function ( $result ) {
    // Allow requests that are already authenticated
    if ( true === $result || is_wp_error( $result ) ) {
        return $result;
    }
    // Allow specific public namespaces if needed (uncomment and add as required)
    // $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    // if ( strpos( $request_uri, '/wp-json/wp/v2/posts' ) !== false ) {
    //     return $result; // allow public post reads
    // }
    if ( ! is_user_logged_in() ) {
        return new WP_Error(
            'rest_not_logged_in',
            'You must be logged in to access the REST API.',
            array( 'status' => 401 )
        );
    }
    return $result;
} );


// ============================================================
// SNIPPET 3: Remove WordPress version from HTML output
// Title: "Security: Remove WP version number"
// ============================================================
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'the_generator', '__return_empty_string' );
// Also remove from feed
add_filter( 'get_the_generator_rss2', '__return_empty_string' );


// ============================================================
// SNIPPET 4: Disable file editing from WP Admin
// Title: "Security: Disable theme/plugin editor"
// NOTE: Also add DISALLOW_FILE_EDIT to wp-config.php:
//       define('DISALLOW_FILE_EDIT', true);
// ============================================================
if ( ! defined( 'DISALLOW_FILE_EDIT' ) ) {
    define( 'DISALLOW_FILE_EDIT', true );
}


// ============================================================
// SNIPPET 5: Limit login attempts (basic, prefer LiteSpeed Cache Security)
// Title: "Security: Basic login lockout"
// ============================================================
add_filter( 'authenticate', function ( $user, $username, $password ) {
    if ( empty( $username ) || empty( $password ) ) {
        return $user;
    }
    $ip         = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $transient  = 'login_attempts_' . md5( $ip );
    $attempts   = (int) get_transient( $transient );
    $max        = 5;
    $lockout    = 15 * MINUTE_IN_SECONDS;

    if ( $attempts >= $max ) {
        return new WP_Error(
            'too_many_attempts',
            sprintf( 'Too many login attempts. Try again in 15 minutes.' )
        );
    }

    if ( is_wp_error( $user ) ) {
        set_transient( $transient, $attempts + 1, $lockout );
    } else {
        delete_transient( $transient );
    }

    return $user;
}, 30, 3 );


// ============================================================
// SNIPPET 6: Defer non-critical scripts (GA4 + Impact tracker)
// Title: "Performance: Defer third-party scripts"
// ============================================================
add_filter( 'script_loader_tag', function ( $tag, $handle, $src ) {
    $defer_handles = array(
        'google-tag-manager',
        'gtag',
        'google-analytics',
        'impact-cdn',
        // Add handle names as found in your theme/plugins
    );
    if ( in_array( $handle, $defer_handles, true ) ) {
        return str_replace( ' src=', ' defer src=', $tag );
    }
    return $tag;
}, 10, 3 );


// ============================================================
// SNIPPET 7: Add resource hints for third-party domains
// Title: "Performance: Resource hints preconnect"
// ============================================================
add_action( 'wp_head', function () {
    echo '<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>' . "\n";
    echo '<link rel="preconnect" href="https://www.google-analytics.com" crossorigin>' . "\n";
    echo '<link rel="dns-prefetch" href="//impactcdn.com">' . "\n";
}, 1 );


// ============================================================
// SNIPPET 8: Remove unnecessary REST API links from <head>
// Title: "Security: Remove REST API discovery links"
// ============================================================
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
remove_action( 'template_redirect', 'rest_output_link_header', 11 );
