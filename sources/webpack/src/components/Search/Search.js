/**
 * Search.js
 *
 * Component that holds the logic around the search feature
 */

import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import { FaSearchengin, FaSistrix, FaUndo } from "react-icons/fa";

class Search extends Component {
    static propTypes = {
        reset : PropTypes.func.isRequired,
        performSearch : PropTypes.func.isRequired,
        searchEngines : PropTypes.array.isRequired
    };

    initialState = {
        searchQuery : "",
        activeSearchEngine : null
    }

    state = this.initialState

    componentDidMount() {
        this.ensureSearchEngineSelection();
    }

    componentDidUpdate() {
        this.ensureSearchEngineSelection();
    }

    /**
     * Ensures we have a search engine selected
     *
     * @memberof Search
     */
    ensureSearchEngineSelection() {
        const { activeSearchEngine } = this.state;
        const { searchEngines } = this.props;

        if ( searchEngines.length > 0 && !activeSearchEngine ) this.selectSearchEngine( searchEngines[0].slug );
    }

    /**
     * Sets the component state to the user's input
     * @param {event} e - Fired input event
     *
     * @memberof Search
     */
    onInput = e => this.setState( { searchQuery : e.target.value } );

    /**
     * Returns a list of search engines to use for the query
     *
     * @returns {string} - HTML markup for component
     * @memberof Search
     */
    getSearchEngineOptions = () => {
        const { searchEngines } = this.props;

        return searchEngines.map( ( searchEngine, index ) => {
            const { slug, label } = searchEngine;

            return <option key={`searchEngine_${index}`} onClick={() => this.selectSearchEngine( slug ) }>{label}</option>;
        } );
    }

    /**
     * Handles the form submission
     *
     * @param {event} e
     * @memberof Search
     */
    handleFormSubmit = e => {
        const { searchQuery, activeSearchEngine } = this.state;
        const { performSearch } = this.props;

        e.preventDefault();
        performSearch( searchQuery, activeSearchEngine );
    }

    /**
     * Sets the current active search engine
     *
     * @memberof Search
     */
    selectSearchEngine = searchEngine => this.setState( { activeSearchEngine : searchEngine } )

    render() {
        const { reset } = this.props;
        const { searchQuery } = this.state;

        return (
            <div className="text-center">
                <FaSearchengin className="mb-5" size={100} />

                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Control
                                type="text"
                                placeholder="Enter a query"
                                value={searchQuery}
                                onChange={this.onInput}
                                className="mr-sm-2"
                            />
                        </Form.Group>

                        <Form.Group as={Col} sm={5} m={3} controlId="formGridState">
                            <Form.Control as="select">
                                { this.getSearchEngineOptions() }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit"><FaSistrix size={20} className="mr-1" /> Search</Button>
                    <Button className="ml-2" variant="danger" onClick={reset}><FaUndo size={15} className="mr-2" />Reset</Button>
                </Form>
            </div>
        );
    }
}

export default Search;
