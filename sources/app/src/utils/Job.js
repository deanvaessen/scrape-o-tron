/**
 * Job.js
 *
 * Represents an abstracted workflow for handling a request.
 * It is fed the request parameters and an action, and verifies the validity of the request.
 * It is also used to fire, complete, and if necessary error out the action in question (and communicate this).
 */

class Job {
    constructor( payload, parameters, EndpointAction, dependencies ) {
        this.dependencies = dependencies;
        this.payload = payload;
        this.parameters = parameters;
        this.res = payload.res;
        this.req = payload.req;
        this.action = new EndpointAction( { ...dependencies, job : this }, parameters );
    }

    work = () => {
        this.request()
        .then( () => this.launch() )
        .then( result => this.complete( result ) )
        .catch( err => this.error( err ) );
    }

    /**
     * Kicks off the job
     *
     * @returns {promise}
     * @memberof Job
     */
    request = () => Promise.resolve( this.verify( this.payload.verify ) )

    /**
     * Verifies the request (such as starting a verification of the payload)
     *
     * @returns {bool}
     * @memberof Job
     */
    verify = ( verifications ) => {
        const checks = [];
        const successes = [];
        const failures = [];

        if ( verifications.mandatoryParameters ) {
            checks.push( {
                name : "Payload verification",
                execute : this.verifyPayload,
                data : verifications.mandatoryParameters
            } );
        }

        for ( const check of checks ) {
            const errors = check.execute( check.data );
            const result = {
                name : check.name,
                errors
            };

            if ( errors.length == 0 ) successes.push( result );
            else failures.push( result );
        }

        if ( failures.length > 0 ) {
            const issues = failures.map( failure => failure.errors.join( ", " ) ).join( ", " );
            throw new Error( `Payload not ok! Issues: ${issues}` );
        }

        return true;
    }

    /**
     * Verifies the payload
     *
     * @returns {array}
     * @memberof Job
     */
    verifyPayload = ( parameters ) => {
        const errors = [];

        for ( const parameter in parameters ) {
            const value = parameters[parameter];

            if ( value === undefined || ( typeof value == "string" && value == "" ) ) {
                errors.push( `Parameter ${parameter} is missing!` );
            }
        }

        return errors;
    }

    /**
     * Launches the actual requested action
     *
     * @returns {promise}
     * @memberof Job
     */
    launch = () => {
        console.log( "Launching job" );

        return this.action.launch()
        .catch( err => this.error( err ) );
    }

    /**
     * Completes the current job
     *
     * @param {any} result - The result of the job
     * @memberof Job
     */
    complete = result => {
        console.log( "Completing job" );
        console.log( result );

        this.action.finish( result )
        .catch ( err => this.error ( err ) );
    }

    /**
     * Errors out the job
     *
     * @param {error} err - The error that spoiled all the fun...
     * @memberof Job
     */
    error = err => {
        console.log( "Error during operation!" );
        console.log( err );

        this.respond( 500, null, err?.message || err );
    }

    /**
     * Communicates to the client
     *
     * @param {number} code - The status code for the response
     * @param {string} responseType - Used to hook into express' methods.
     * If sending a JSON for example, this param would be "json" to send the data as a JSON via express
     *
     * @param {any} data - Any data to be sent to the client
     * @memberof Job
     */
    respond = ( code, responseType, data ) => {
        if ( !responseType ) this.res.status( code ).send( data );
        else this.res.status( code )[responseType]( data );

        return Promise.resolve();
    }
}

module.exports = Job;
