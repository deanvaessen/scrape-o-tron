/**
 * Server.js
 *
 * Server component that implements the express server
 * @class Server
 */
class Server {
    constructor( dependencies, config ) {
        this.dependencies = dependencies;
        this.config = config;
        this.express;
    }

    init = () => {
        const { expressServer, sanitize } = this.dependencies;
        const { rootDir, PORT_REST, HOST } = this.config;

        const expressApp = expressServer();
        const origin = process.env.NODE_ENV === "dev" ? `http://${HOST}:3000` : `http://${HOST}`; // In development, the port MUST match your webpack dev server's port!

        expressApp.use( sanitize.middleware );
        expressApp.use( ( req, res, next ) => {
            res.header( "Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT" );
            res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
            res.header( "Access-Control-Allow-Origin", origin );
            res.header( "Access-Control-Allow-Credentials", "true" );

            next();
        } );

        expressApp.use( expressServer.static( `${rootDir}/public` ) );

        expressApp.listen( PORT_REST, err => {
            if ( err ) {
                console.log( err );

                return;
            }

            console.log( `Backend is listening at port ${PORT_REST}` );
        } );

        this.express = expressApp;
    }

    /**
     * Returns the active instance of express
     *
     * @returns {object}
     * @memberof Server
     */
    getExpressInstance = () => this.express
}

export default Server;