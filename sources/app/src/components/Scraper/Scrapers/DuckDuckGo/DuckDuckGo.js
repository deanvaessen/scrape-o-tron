/**
 * DuckDuckGo.js
 *
 * Implementation of a scraper tailored to DuckDuckGo.
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
    fetch = query => {
        const { request } = this.dependencies;

        return request( {
            url : this.url + query,
            headers : {
                "User-Agent" : "Mozilla/5.0 (Windows NT 6.1; WOW64)"
            }
        } );
    }

    /**
     * Parses the data returned by the fetch method
     *
     * @param {string} result - Html string of the fetch response
     * @param {String[]} fields - Requested fields
     *
     * @returns {Object[]}
     * @memberof DuckDuckGo
     */
    parse = ( result, fields ) => {
        const { $ } = this.dependencies;
        const hits = [];

        $( ".result__title > a", result ).each( ( i, el ) => {
            const title =  $( el ).text();
            let hit = {};
            let url = decodeURIComponent( $( el ).attr( "href" ) ).split( "=http" );
            url.shift();
            url.unshift( "http" );
            url = url.join( "" );

            if ( fields.includes( "title" ) ) hit.title = title;
            if ( fields.includes( "url" ) )  hit.url = url;

            hits.push( hit );
        } );

        return hits;
    }
}

export default DuckDuckGo;
