/**
 * AlertMessage.js
 *
 * A customisable alert message
 */

import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import "./AlertMessage.scss";
import { FaExclamationTriangle } from "react-icons/fa";

class AlertMessage extends React.PureComponent {
    static propTypes = {
        variant : PropTypes.string.isRequired,
        intro : PropTypes.string.isRequired,
        message : PropTypes.string.isRequired,
        instruction : PropTypes.string,
        delay : PropTypes.string,
        sizeIsSmall : PropTypes.bool,
        dismissible : PropTypes.bool
    };

    /**
     * Returns a string of the applicable classes for the component
     *
     * @returns {string}
     * @memberof AlertMessage
     */
    getClasses = () => {
        const { sizeIsSmall, delay } = this.props;

        return `w-100 mb-0 alertMessage animated fadeInUp ${delay || ""} ${
            sizeIsSmall ? "alert-small" : ""
        }`;
    };

    render() {
        const { message, intro, variant, instruction, dismissible } = this.props;

        return (
            <Alert
                dismissible={dismissible}
                variant={variant}
                className={this.getClasses()}
                style={{ width : "100%" }}
            >
                <p className="mb-1">
                    <FaExclamationTriangle className="mr-2" />
                    {intro}
                </p>
                <p className="m-0">
                    <strong>{message}</strong>
                </p>
                {instruction && (
                    <p className="mt-2 mb-0">
                        <small>{instruction}</small>
                    </p>
                )}
            </Alert>
        );
    }
}

export default AlertMessage;