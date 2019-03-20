/**
 * App.js
 *
 * Main instantiation of the application is done here
 */

import ServerComponent from "../Server";
import ScraperComponent from "../Scraper";
import Utils from "../../utils";

class App {
    constructor( config ) {
        this.utils = new Utils( config ).init();
        this.config = config;
        this.components = {};
        this.dependencies;
    }

    init = () => {
        // First instantiate the server because we need to have express be available to all other components
        this.initServer();

        // Then instantiate all other components
        this.initComponents();
    }

    initServer = () => {
        const server = new ServerComponent(
            {
                ...this.dependencies,
                ...this.utils,
            },
            this.config
        );

        server.load();
        server.init();

        this.dependencies = {
            ...this.dependencies,
            ...this.utils,
            express : server.getExpressInstance()
        };
    }

    initComponents = () => {
        const components = [
            ScraperComponent
        ];

        for ( const Component of components ) {
            const className = Component.prototype.constructor.name;
            const instantiatedName = className.split( "" )[0].toLowerCase() + className.slice( 1, className.length );

            this.components[instantiatedName] = new Component( this.dependencies, this.config );
        }

        // Have all interfaces load their dependencies
        for ( const component of Object.values( this.components ) ) {
            component.load( this.components );
        }

        // Initialise
        for ( const component of Object.values( this.components ) ) {
            component.init();
        }
    }
}

module.exports = App;