/**
 * Application wide utilities
 */

import path from "path";
import request from "request-promise-native";
import expressServer from "express";
import sanitize from "sanitize";
import cheerio from "cheerio";
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
            $ : cheerio,
            expressServer
        };
    }
}

module.exports = Utils;