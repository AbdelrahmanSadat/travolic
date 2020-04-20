const assert = require("assert");
const expect = require("chai").expect;
const appRoot = require("app-root-path");

let hotelFilter = require(appRoot + "/helpers/hotelFilter");
let hotelsSample = require(appRoot + "/helpers/hotelsSample.json");

// * Excessively testing the hotelFilter function
function hotelFilterTests() {
    describe("hotelFilter", function () {
        describe("Name Matching", function () {
            it("should return true if the hotel has the same name (case insensitive)", function () {
                assert.deepEqual(
                    hotelFilter({ name: "the hilton" }, hotelsSample[0]),
                    true
                );
            });
            it("should return false if name doesn't match", function () {
                assert.deepEqual(
                    hotelFilter({ name: "not a real name" }, hotelsSample[0]),
                    false
                );
            });
        });

        describe("City Matching", function () {
            it("should return true if the hotel is in the same city (case insensitive)", function () {
                assert.deepEqual(hotelFilter({ city: "vienna" }, hotelsSample[0]), true);
            });
            it("should return false if the hotel isn't in the same city", function () {
                assert.deepEqual(
                    hotelFilter({ city: "not a real city" }, hotelsSample[0]),
                    false
                );
            });
        });

        describe("Lowest Price", function () {
            it("should return true if the hotel has a higher price (or equal) than the lowestPrice given", function () {
                assert.deepEqual(
                    hotelFilter({ lowestPrice: 100 }, hotelsSample[0]),
                    true
                );
            });
            it("should return false if the hotel has a lower price than the lowestPrice given", function () {
                assert.deepEqual(
                    hotelFilter({ lowestPrice: 100.001 }, hotelsSample[0]),
                    false
                );
            });
        });

        describe("Highest Price", function () {
            it("should return true if the hotel has a lower price (or equal) than the highestPrice given", function () {
                assert.deepEqual(
                    hotelFilter({ highestPrice: 100 }, hotelsSample[0]),
                    true
                );
            });
            it("should return false if the hotel has a higher price than the highestPrice given", function () {
                assert.deepEqual(
                    hotelFilter({ highestPrice: 99.99 }, hotelsSample[0]),
                    false
                );
            });
        });

        describe("Starting Date", function () {
            it("should return true if the hotel has a date_start before (or equal) the given date_start", function () {
                assert.deepEqual(
                    hotelFilter(
                        { date_start: "2020-04-09T02:33:18.252Z" },
                        hotelsSample[0]
                    ),
                    true
                );
            });
            it("should return false if the hotel has a date_start after the given date_start", function () {
                assert.deepEqual(
                    hotelFilter(
                        { date_start: "2020-04-09T02:33:18.251Z" },
                        hotelsSample[0]
                    ),
                    false
                );
            });
        });

        describe("Ending Date", function () {
            it("should return true if the hotel has a date_end after (or equal) the given date_end", function () {
                assert.deepEqual(
                    hotelFilter({ date_end: "2020-11-18T11:45:46.432Z" }, hotelsSample[0]),
                    true
                );
            });
            it("should return false if the hotel has a date_end before the given date_end", function () {
                assert.deepEqual(
                    hotelFilter({ date_end: "2020-11-18T11:45:46.433Z" }, hotelsSample[0]),
                    false
                );
            });
        });
    });
}

module.exports = hotelFilterTests;