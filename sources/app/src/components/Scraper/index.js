/**
 * index.js
 *
 * Serves as the highest level representation of the scraper component and ties the endpoints component methods together.
 * Exposes all public methods and handles loading/initialising of the component.
 *
 * It allows for pulling the available scrapers, and requesting a scrape.
 */

import Component from "./Scraper";
import ScrapeInfoEndpoint from "./Endpoints/ScrapeInfoEndpoint";
import ScrapeInfoEndpointAction from "./Endpoints/ScrapeInfoEndpointAction";
import ScrapeRequestEndpointAction from "./Endpoints/ScrapeRequestEndpointAction";
import ScrapeRequestEndpoint from "./Endpoints/ScrapeRequestEndpoint";
import DuckDuckGoScraper from "./Scrapers/DuckDuckGo";

class Scraper {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
        this.scrapeRequestEndpoint;
        this.scrapeInfoEndpoint;
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

        this.scrapeRequestEndpoint = new ScrapeRequestEndpoint(
            {
                ...this.dependencies,
                EndpointAction : ScrapeRequestEndpointAction
            },
            this.config
        );

        this.scrapeInfoEndpoint = new ScrapeInfoEndpoint(
            {
                ...this.dependencies,
                EndpointAction : ScrapeInfoEndpointAction
            },
            this.config
        );
    }

    init = () => {
        this.component.init();
        this.scrapeRequestEndpoint.init();
        this.scrapeInfoEndpoint.init();
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