/**
 * Application wide utilities
 */

import path from "path";
import request from "request-promise-native";
import expressServer from "express";
import sanitize from "sanitize";
import Job from "./Job";

class Utils {
    constructor( config ) {
        this.config = config;
    }

    init() {
        return {
            request,
            path,
            sanitize,
            Job,
            expressServer
        };
    }
}

module.exports = Utils;