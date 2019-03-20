/**
 * Scraper.js
 *
 * Base class for the scraper itself, connects to the individual scraper implementations (DuckDuckGo, Google, etc.)
 */
class Scraper {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
    }

    init = () => {}

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
    scrape = parameters => {
        const { scrapers } = this.dependencies;
        const { query, scraperName } = parameters;
        const fields = [];

        for ( const key in parameters ) {
            if ( key.includes( "field"  ) ) {
                fields.push( parameters[key] );
            }
        }

        const scraper = scrapers[scraperName];

        if ( !scraper ) throw Error( "Unknown scraper!" );

        return scraper.fetch( query )
            .then( result => scraper.parse( result, fields ) )
            .then( results => this.sortAlphabetically( results ) );
    }

    /**
     * Returns an overview of the available scrapers
     *
     * @returns {array} An array of objects with slug and label of the scraper
     * @memberof Scraper
     */
    getAvailableScrapers = () => Promise.resolve( this.config.SCRAPERS );

    /**
     * @param {Object[]} - results
     * @param {string} - results[].title
     * @param {string} - results[].name
     *
     * @returns {Object[]}
     * @memberof Scraper
     */
    sortAlphabetically = ( results ) => {

        return results.sort( ( a, b ) => {
            if( a.title.toLowerCase() < b.title.toLowerCase() ) return -1;
            if( a.title.toLowerCase() > b.title.toLowerCase() ) return 1;
            return 0;
        } );
    }
}

export default Scraper;