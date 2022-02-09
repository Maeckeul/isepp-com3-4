<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ISEPP_COM3_4' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '13m10C93&' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Vxy(gz|k>rFDDfPr)Xo+{|4bN^q>6mT^;K,Ln:^-)0~6>sa*6&[N&4=7Me+r+|zB');
define('SECURE_AUTH_KEY',  '-=GC]i#41j_(47@1&+C4S!19fC~0wJg(0:E9M,w66%N:Oi+Rtp}sTHwFgYTY+/n^');
define('LOGGED_IN_KEY',    'jxzj4a5nR1q/Z&,esOIZ$|qwjMUS+dcp+lALBka|y+n^Ad :lj?_gB&LXrntfUH2');
define('NONCE_KEY',        '8dT}Wt)x:A|#zFU}eSp}`i!fiif5pT.qFPXs1 $f8W)M6J0=+;y)GHuZd4CLIP6m');
define('AUTH_SALT',        '!w{RUe9/>|T2MSTwPpK4VjJ5G?X?z8`KnISMQ/QkPLR_@~$Th7+wu*=Qd{1(/iYt');
define('SECURE_AUTH_SALT', 'j->4]PDz+Y){?6bL<+)Xm/m{G-~)upHJi-i|Vkd|Q5`8$Ww?d)iF-<`Q91Ex60Z<');
define('LOGGED_IN_SALT',   '{<%=`GFa-bud,T0sP,H}N0d9Hsr-A<j?RCA 0+,WGFmDz`@VqVqVcsr{?i;/?|Dv');
define('NONCE_SALT',       'Mb-,M{u 2Agj|xK++R+!:bGd9ITm&) +D}Prdp(i|N7ECCs}>Uz+k2PatiB^+CEh');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

// L'url de la page d'accueil de mon site
define('WP_HOME','https://www.web-iti.com/isepp-com3-4/');
// l'url à laquel se trouve mon installation de WordPress
define('WP_SITEURL','https://www.web-iti.com/isepp-com3-4/wp');

// J'indique à WordPress comment il doit télécharger des fichiers
// Ici: de manière direct (sans passer par un serveur etc.)
define('FS_METHOD', 'direct');

// Je vais indiquer à WordPress où se trouve le "vrai" dossier "wp-content"
// Ici je spécifie l'url de mon dossier
define( 'WP_CONTENT_URL', 'https://www.web-iti.com/isepp-com3-4/content' );
// Ici le chemin physique vers le dossier
define( 'WP_CONTENT_DIR', dirname( ABSPATH ) . '/content' );

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
