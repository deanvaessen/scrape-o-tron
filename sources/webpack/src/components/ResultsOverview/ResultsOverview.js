/**
 * ResultsOverview.js
 *
 * A customisable alert message
 */

import React from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

class ResultsOverview extends React.PureComponent {
    static propTypes = {
        fields : PropTypes.array.isRequired,
        results : PropTypes.array.isRequired
    };

    /**
     * Gets the table headers for the search result
     *
     * @returns {string} - HTML markup for component
     * @memberof ResultsOverview
     */
    getTableHeaders = () => {
        const { fields } = this.props;

        return fields.map( field => <th key={`result_header_${field}`}>{field}</th> );
    }

    /**
     * Gets the table rows for the search result
     *
     * @returns {string} - HTML markup for component
     * @memberof ResultsOverview
     */
    getTableRows = () => {
        const { results } = this.props;

        return results.map( ( row, rowIndex ) => {
            const key = `results__row-${rowIndex}`;
            const { title, url } = row;

            return (
                <tr key={key}>
                    <td>{title}</td>
                    <td>{url}</td>
                </tr>
            );
        } );
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {this.getTableHeaders()}
                    </tr>
                </thead>
                <tbody>
                    { this.getTableRows() }
                </tbody>
            </Table>
        );
    }
}

export default ResultsOverview;