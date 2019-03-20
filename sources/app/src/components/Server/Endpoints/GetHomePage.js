/**
 * GetHomePage.js
 *
 * Endpoint for the server to serve the front-end
 *
 * @class Endpoint
 */

class Endpoint {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
    }

    init() {
        const { express } = this.dependencies;
        const { rootDir } = this.config;

        console.log( "Intialising endpoint /" );

        express.get( "/", ( req, res ) => {
            res.sendFile( "index.html", { root : `${rootDir}/public` } );
        } );
    }
}

module.exports = Endpoint;
