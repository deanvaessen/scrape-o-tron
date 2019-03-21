const fs = require( "fs" );
const path = require( "path" );
const fetchResponseFixture = fs.readFileSync( path.resolve( __dirname, "./fetchResponseFixture.html" ), "utf8" );
import DuckDuckGo from "./DuckDuckGo";

const scraper = new DuckDuckGo( { $ : require( "cheerio" ) } );

describe( "DuckDuckGo scraper", () => {
    it( "Parses data correctly", () => {
        const fields = [ "title", "url" ];
        const correctParse = [
            {
                "title" : "Wikipedia",
                "url" : "https://www.wikipedia.org/",
            },
            {
                "title" : "Wikipedia, the free encyclopedia",
                "url" : "https://en.wikipedia.org/wiki/Main_Page",
            },
            {
                "title" : "Wikipedia (@Wikipedia) | Twitter",
                "url" : "https://twitter.com/Wikipedia",
            },
            {
                "title" : "Wikipedia",
                "url" : "https://simple.wikipedia.org/wiki/Main_Page",
            },
            {
                "title" : "Wikipedia - Apps on Google Play",
                "url" : "https://play.google.com/store/apps/details?id=org.wikipedia&hl=en_US",
            },
            {
                "title" : "Wikipedia - Home | Facebook",
                "url" : "https://www.facebook.com/wikipedia",
            },
            {
                "title" : "Wikipedia | Article about Wikipedia by The Free Dictionary",
                "url" : "https://encyclopedia2.thefreedictionary.com/Wikipedia",
            },
            {
                "title" : "Wikipedia (@wikipedia) • Instagram photos and videos",
                "url" : "https://www.instagram.com/wikipedia/",
            },
            {
                "title" : "Wikipedia | encyclopaedia | Britannica.com",
                "url" : "https://www.britannica.com/topic/Wikipedia",
            },
            {
                "title" : "Wikipedia - definition of Wikipedia by The Free Dictionary",
                "url" : "https://www.thefreedictionary.com/Wikipedia",
            }
        ];

        expect( scraper.parse( fetchResponseFixture, fields ) ).toEqual( correctParse );
    } );
} );
