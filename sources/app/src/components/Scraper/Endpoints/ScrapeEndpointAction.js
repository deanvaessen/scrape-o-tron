/**
 * ScrapeEndpointAction.js
 *
 * Calls the scrapers to process a request
 */

class ScrapeEndpointAction {
    constructor( dependencies, parameters ) {
        this.dependencies = dependencies;
        this.parameters = parameters;
    }

    /**
     * Launches the scrape
     *
     * @returns {promise}
     * @memberof ScrapeEndpointAction
     */
    launch = () => {
        const { scraper } = this.dependencies;

        return scraper.scrape( this.parameters );
    }

    /**
     * Finishes the current action
     *
     * @param {array} result - An array of objects with slug and label of the scraper
     *
     * @returns {promise}
     * @memberof ScrapeEndpointAction
     */
    finish = ( result ) => {
        const { job } = this.dependencies;

        return job.respond( 200, "json", result );
    }
}

module.exports = ScrapeEndpointAction;
