/**
 * ScrapeRequestEndpoint.js
 *
 * The endpoint that will allow the front-end to request the scrape. The action itself is decoupled and fed into the endpoint.
 */

class ScrapeRequestEndpoint {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
    }

    init() {
        const { express, EndpointAction, Job } = this.dependencies;

        console.log( "Intialising endpoint /api/scrape" );

        //.e.g: /api/scrapers/duckduckgo?query=mySearchInput&field1=title&field2=url
        express.get( "/api/scrapers/:scraperName", ( req, res ) => {
            const { scraperName } = req.params;

            console.log( "info", `Scraper endpoint - Request for scraper ${scraperName}` );

            const parameters = {
                ...req.query,
                scraperName,
                query : req.query.query
            };

            const payload = {
                verify : {
                    mandatoryParameters : {
                        scraperName : parameters.scraperName,
                        query : parameters.query
                    }
                },
                req,
                res
            };

            new Job( payload, parameters, EndpointAction, this.dependencies ).work();
        } );
    }
}

module.exports = ScrapeRequestEndpoint;
