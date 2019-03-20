/**
 * DuckDuckGo.js
 *
 * Implementation of a scraper tailered to DuckDuckGo.
 * Fetches, and parses a request.
 *
 * @class DuckDuckGo
 */

class DuckDuckGo {
    constructor( dependencies ) {
        this.dependencies = dependencies;
        this.url = "https://duckduckgo.com/html/?q=";
    }

    /**
     * Fetches the result of the user input
     *
     * @param {string} query - The user input
     *
     * @returns {promise}
     * @memberof DuckDuckGo
     */
    fetch( query ) {
        const { request } = this.dependencies;

        return request( {
            url : this.url + query,
            headers : {
                "User-Agent" : "Mozilla/5.0 (Windows NT 6.1; WOW64)"
            }
        } )
            .then( result => console.log( result ) );
    }

    parse( result ) {

        return result + " parsed";
    }
}

export default DuckDuckGo;
