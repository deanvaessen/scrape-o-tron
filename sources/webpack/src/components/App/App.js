/**
 * App.js
 *
 * Main application component for the front-end
 */

import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ResultsOverview from "../ResultsOverview";
import Search from "../Search";
import LoadingIndicator from "../LoadingIndicator";
import AlertMessage from "../AlertMessage";
import PropTypes from "prop-types";

class App extends Component {
    static propTypes = {
        config : PropTypes.object.isRequired
    };

    initialState = {
        requestedFields : [ "title", "url" ],
        isFetchingResults : false,
        isFetchingSearchEngines : false,
        searchEngines : [],
        searchResults : [],
        err : null
    }

    state = this.initialState;

    componentDidUpdate() {
        this.ensureSearchEngines();
    }

    componentDidMount() {
        this.ensureSearchEngines();
    }

    /**
     * Ensures that when the application has the available search engines loaded in
     *
     * @memberof App
     */
    ensureSearchEngines() {
        const { err, searchEngines, isFetchingSearchEngines } = this.state;

        if ( !err & searchEngines.length === 0 && !isFetchingSearchEngines ) this.getSearchEngines();
    }

    /**
     * Calls the back-end and updates the application state with the available search engines
     *
     * @memberof App
     */
    getSearchEngines = () => {
        const { config } = this.props;

        this.setState( { isFetchingSearchEngines : true } );

        fetch( `http://${config.HOST}:${config.PORT_REST}/api/scrapers` )
            .then( res => {
                if ( !res.ok ) throw res;

                return res.json();
            } )
            .then( data => this.setState( { searchEngines : data, isFetchingSearchEngines : false } ) )
            .catch( err => {
                if ( err.bodyUsed === undefined ) {
                    this.setState( { err : err.message, searchEngines : [], isFetchingSearchEngines : false } );

                    return;
                }

                err.text()
                    .then( message => this.setState( { err : message, searchEngines : [], isFetchingSearchEngines : false } ) );
            } );
    }

    /**
     * Gets the search input and passes this on to the back-end launch the scraping query
     * @param {string} query - Search query
     * @param {string} searchEngine - The search engine we want to use for our query
     *
     * @memberof App
     */
    performSearch = ( query, searchEngine ) => {
        const { requestedFields } = this.state;
        const { config } = this.props;

        this.setState( { err : null, searchResults : [], isFetchingResults : true } );
        const url = `http://${config.HOST}:${config.PORT_REST}/api/scrapers/${searchEngine}`
        + `?query=${encodeURIComponent( query )}`
        + `${requestedFields.map( ( field, index ) => `&field${index+1}=${field}` ).join( "" ) }`;

        fetch( url )
            .then( res => {
                if ( !res.ok ) throw res;

                return res.json();
            } )
            .then( data => this.setState( { searchResults : data, isFetchingResults : false } ) )
            .catch( err => {
                console.log( err );
                console.log( err.bodyUsed );
                if ( err.bodyUsed === undefined ) {
                    this.setState( { err : err.message, searchResults : [], isFetchingResults : false } );

                    return;
                }

                err.text()
                    .then( message => this.setState( { err : message, searchResults : [], isFetchingResults : false } ) );
            } );
    }

    /**
     * Resets the component state
     *
     * @memberof App
     */
    reset = () => this.setState( this.initialState )

    render() {
        const { err, isFetchingSearchEngines, isFetchingResults, searchEngines, searchResults, requestedFields } = this.state;

        return (
            <div className="App">
                {
                    err && (
                        <Row>
                            <Col sm={12} className="p-5">
                                <AlertMessage
                                    variant="danger"
                                    intro="Jumping Jahosafat!"
                                    message={err}
                                    instruction="Let's...try again?"
                                />
                            </Col>
                        </Row>
                    )
                }

                <Row>
                    <Col sm={12} md={8} className="p-5 mx-auto">
                        <Search
                            reset={this.reset}
                            searchEngines={searchEngines}
                            performSearch={this.performSearch}
                        />
                    </Col>
                </Row>

                {
                    searchResults.length > 0 &&
                    (
                        <Row>
                            <Col sm={12} md={8} className="mt-2 p-5 mx-auto">
                                <ResultsOverview
                                    fields={requestedFields}
                                    results={searchResults}
                                />
                            </Col>
                        </Row>
                    )
                }

                {
                    ( isFetchingSearchEngines || isFetchingResults ) &&
                    <LoadingIndicator />
                }
            </div>
        );
    }
}

export default App;
