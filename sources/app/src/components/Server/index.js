/**
 * index.js
 * Serves as the highest level representation of this component.
 * Exposes all public methods and handles loading/initialising of the component.
 */

import Endpoint from "./endpoints/GetHomePage";
import Component from "./Server";

class Server {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
        this.component;
    }

    load = () => this.component = new Component( this.dependencies, this.config )

    init = () => {
        this.component.init();

        this.endpoint = new Endpoint(
            {
                ...this.dependencies,
                express : this.getExpressInstance()
            },
            this.config
        );
        this.endpoint.init();
    }

    /**
     * Returns the active instance of express
     *
     * @returns {object}
     * @memberof Server
     */
    getExpressInstance = () => this.component.getExpressInstance()
}

module.exports = Server;