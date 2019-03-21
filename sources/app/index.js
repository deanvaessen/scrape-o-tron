/**
 * index.js
 *
 * Entry point for the application
 */

require( "@babel/register" );
require( "@babel/polyfill" );

const App = require( "./src/components/App/App" );
let config = require( `./config/${process.env.NODE_ENV}.json` );
config.rootDir = require( "path" ).resolve( __dirname );

const application = new App( config );
application.init();