/**
 * ScrapeRequestEndpointAction.js
 *
 * Calls the scrapers to process a request
 */

class ScrapeRequestEndpointAction {
    constructor( dependencies, parameters ) {
        this.dependencies = dependencies;
        this.parameters = parameters;
    }

    /**
     * Launches the scrape
     *
     * @returns {promise}
     * @memberof ScrapeRequestEndpointAction
     */
    launch = () => {
        const { scraper } = this.dependencies;

        return scraper.scrape( this.parameters );
    }

    /**
     * Finishes the current action
     *
     * @param {Object[]} result - An array of objects with slug and label of the scraper
     * @param {Object[]} result[].slug - Scraper slug
     * @param {Object[]} result[].label - Scraper label
     *
     * @returns {promise}
     * @memberof ScrapeRequestEndpointAction
     */
    finish = ( result ) => {
        const { job } = this.dependencies;

        return job.respond( 200, "json", result );
    }
}

module.exports = ScrapeRequestEndpointAction;
