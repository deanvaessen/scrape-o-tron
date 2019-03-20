/**
 * ScrapersEndpointAction.js
 *
 * This action returns an array of the available scrapers
 */

class ScrapersEndpointAction {
    constructor( dependencies, parameters ) {
        this.dependencies = dependencies;
        this.parameters = parameters;
    }

    /**
     * Launches the request to get the available scrapers
     *
     * @returns {promise}
     * @memberof ScrapersEndpointAction
     */
    launch = () => {
        const { scraper } = this.dependencies;

        return scraper.getAvailableScrapers( this.parameters );
    }

    /**
     * Finishes the current action
     *
     * @param {Object[]} result - An array of objects with slug and label of the scraper
     * @param {Object[]} result[].slug - Scraper slug
     * @param {Object[]} result[].label - Scraper label
     *
     * @returns {promise}
     * @memberof ScrapersEndpointAction
     */
    finish = ( result ) => {
        const { job } = this.dependencies;

        return job.respond( 200, "json", result );
    }
}

module.exports = ScrapersEndpointAction;
