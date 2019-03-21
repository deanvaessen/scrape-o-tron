import Scraper from "./Scraper";
const scraper = new Scraper();

describe( "Scraper component", () => {
    it( "Sorts alphabetically", () => {
        const input = [
            {
                "title" : "z",
                "url" : "z_someUrl",
            },
            {
                "title" : "Zc",
                "url" : "Zc_someUrl",
            },
            {
                "title" : "Xa",
                "url" : "Xa_someUrl",
            },
            {
                "title" : "f",
                "url" : "f_someUrl",
            },
            {
                "title" : "1254a",
                "url" : "1254a_someUrl",
            },
            {
                "title" : "4",
                "url" : "4_someUrl",
            },
            {
                "title" : "| xdD",
                "url" : "|_someUrl",
            },
            {
                "title" : "abcde",
                "url" : "abcde_someUrl",
            },
            {
                "title" : "ffF",
                "url" : "ffF_someUrl",
            },
            {
                "title" : "F",
                "url" : "F_someUrl",
            }
        ];

        const expectedOutput = [
            {
                "title" : "1254a",
                "url" : "1254a_someUrl"
            },
            {
                "title" : "4",
                "url" : "4_someUrl"
            },
            {
                "title" : "abcde",
                "url" : "abcde_someUrl"
            },
            {
                "title" : "f",
                "url" : "f_someUrl"
            },
            {
                "title" : "F",
                "url" : "F_someUrl"
            },
            {
                "title" : "ffF",
                "url" : "ffF_someUrl"
            },
            {
                "title" : "Xa",
                "url" : "Xa_someUrl"
            },
            {
                "title" : "z",
                "url" : "z_someUrl"
            },
            {
                "title" : "Zc",
                "url" : "Zc_someUrl"
            },
            {
                "title" : "| xdD",
                "url" : "|_someUrl"
            }
        ];

        expect( scraper.sortAlphabetically( input ) ).toEqual( expectedOutput );
    } );
} );
