/**
 * scrapers_endpoint.js
 *
 * The endpoint that will allow the front-end to request the scrape. The actual action is decoupled and fed into the endpoint.
 */

class Endpoint {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
    }

    init() {
        const { express, EndpointAction, Job } = this.dependencies;

        console.log( "Intialising endpoint /api/scrapers" );

        express.get( "/api/scrapers/", ( req, res ) => {
            console.log( "info", "Scrapers endpoint - Request to pull names of all scrapers" );

            const parameters = {};

            const payload = {
                verify : {},
                req,
                res
            };

            new Job( payload, parameters, EndpointAction, this.dependencies ).work();
        } );
    }
}

module.exports = Endpoint;