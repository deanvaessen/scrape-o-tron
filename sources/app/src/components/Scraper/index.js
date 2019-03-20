/**
 * index.js
 *
 * Serves as the highest level representation of the scraper component and ties the endpoints component methods together.
 * Exposes all public methods and handles loading/initialising of the component.
 *
 * It allows for pulling the available scrapers, and requesting a scrape.
 */

import Component from "./Scraper";
import ScrapersEndpoint from "./Endpoints/ScrapersEndpoint";
import ScrapersEndpointAction from "./Endpoints/ScrapersEndpointAction";
import ScrapeEndpointAction from "./Endpoints/ScrapeEndpointAction";
import ScrapeEndpoint from "./Endpoints/ScrapeEndpoint";
import DuckDuckGoScraper from "./Scrapers/DuckDuckGo";

class Scraper {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
        this.scrapeEndpoint;
        this.scrapersEndpoint;
        this.component;
    }

    /**
     * Loads in the application components and any parts of this component
     *
     * @param {components} - List of all the available components. See App.js
     * @memberof Scraper
     */
    load = ( components ) => {
        // Make the component aware of other application components
        this.dependencies = {
            ...this.dependencies,
            ...components
        };

        this.component = new Component( {
            ...this.dependencies,
            scrapers : {
                duckduckgo : new DuckDuckGoScraper( this.dependencies )
            }
        }, this.config );

        this.scrapeEndpoint = new ScrapeEndpoint(
            {
                ...this.dependencies,
                EndpointAction : ScrapeEndpointAction
            },
            this.config
        );

        this.scrapersEndpoint = new ScrapersEndpoint(
            {
                ...this.dependencies,
                EndpointAction : ScrapersEndpointAction
            },
            this.config
        );
    }

    init = () => {
        this.component.init();
        this.scrapeEndpoint.init();
        this.scrapersEndpoint.init();
    }

    /**
     * Starts the scrape
     *
     * @param {object} parameters - The scraping parameters
     * @param {string} parameters.query - The user input
     * @param {string} parameters.scraperName - The requested scraper
     * @param {string} parameters.field1 - Field 1 for the output
     * @param {string} parameters.field2 - Field 2 for the output
     *
     * @returns {promise}
     * @memberof Scraper
     */
    scrape = parameters => this.component.scrape( parameters )

    /**
     * Returns an overview of the available scrapers
     *
     * @returns {array} An array of objects with slug and label of the scraper
     * @memberof Scraper
     */
    getAvailableScrapers = () => this.component.getAvailableScrapers()
}

module.exports = Scraper;