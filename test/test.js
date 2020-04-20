const assert = require("assert");
const expect = require("chai").expect;
const request = require("supertest");

let hotelFilter = require("../helpers/hotelFilter");
let hotelsSample = require("../helpers/hotelsSample.json");

// TODO: split to different files

// * Excessively testing the hotelFilter function
describe("hotelFilter", function() {
  describe("Name Matching", function() {
    it("should return true if the hotel has the same name (case insensitive)", function() {
      assert.deepEqual(
        hotelFilter({ name: "the hilton" }, hotelsSample[0]),
        true
      );
    });
    it("should return false if name doesn't match", function() {
      assert.deepEqual(
        hotelFilter({ name: "not a real name" }, hotelsSample[0]),
        false
      );
    });
  });

  describe("City Matching", function() {
    it("should return true if the hotel is in the same city (case insensitive)", function() {
      assert.deepEqual(hotelFilter({ city: "vienna" }, hotelsSample[0]), true);
    });
    it("should return false if the hotel isn't in the same city", function() {
      assert.deepEqual(
        hotelFilter({ city: "not a real city" }, hotelsSample[0]),
        false
      );
    });
  });

  describe("Lowest Price", function() {
    it("should return true if the hotel has a higher price (or equal) than the lowestPrice given", function() {
      assert.deepEqual(
        hotelFilter({ lowestPrice: 100 }, hotelsSample[0]),
        true
      );
    });
    it("should return false if the hotel has a lower price than the lowestPrice given", function() {
      assert.deepEqual(
        hotelFilter({ lowestPrice: 100.001 }, hotelsSample[0]),
        false
      );
    });
  });

  describe("Highest Price", function() {
    it("should return true if the hotel has a lower price (or equal) than the highestPrice given", function() {
      assert.deepEqual(
        hotelFilter({ highestPrice: 100 }, hotelsSample[0]),
        true
      );
    });
    it("should return false if the hotel has a higher price than the highestPrice given", function() {
      assert.deepEqual(
        hotelFilter({ highestPrice: 99.99 }, hotelsSample[0]),
        false
      );
    });
  });

  describe("Starting Date", function() {
    it("should return true if the hotel has a date_start before (or equal) the given date_start", function() {
      assert.deepEqual(
        hotelFilter(
          { date_start: "2020-04-09T02:33:18.252Z" },
          hotelsSample[0]
        ),
        true
      );
    });
    it("should return false if the hotel has a date_start after the given date_start", function() {
      assert.deepEqual(
        hotelFilter(
          { date_start: "2020-04-09T02:33:18.251Z" },
          hotelsSample[0]
        ),
        false
      );
    });
  });

  describe("Ending Date", function() {
    it("should return true if the hotel has a date_end after (or equal) the given date_end", function() {
      assert.deepEqual(
        hotelFilter({ date_end: "2020-11-18T11:45:46.432Z" }, hotelsSample[0]),
        true
      );
    });
    it("should return false if the hotel has a date_end before the given date_end", function() {
      assert.deepEqual(
        hotelFilter({ date_end: "2020-11-18T11:45:46.433Z" }, hotelsSample[0]),
        false
      );
    });
  });
});

// * Testing the route response
describe("Express Server", function() {
  let server;

  beforeEach(function(done) {
    delete require.cache[require.resolve("../bin/www")];
    server = require("../bin/www");
    done();
  });

  afterEach(function(done) {
    server.close(err => {
      if (err) done(Error("Something went wrong closing the server"));
      console.log("Server closed successfully");
      done();
    });
  });

  describe("Hotels Endpoint", function() {
    this.timeout(5000);

    // Called once before any of the tests in this block begin.

    it("Should send back a JSON object", function(done) {
      request(server)
        .get("/hotels?name=notARealName")
        .set("Content-Type", "application/json")
        .expect(200)
        .expect("Content-Type", /json/, function(err, res) {
          if (err) {
            return done(err);
          }
          // callStatus = res.body.goodCall;
          // expect(callStatus).to.equal(true);
          // Done
          done();
        });
    });

    it("Should respond with 400 for invalid date_start", function(done) {
      request(server)
        .get("/hotels?date_start=notARealDate")
        .set("Content-Type", "application/json")
        .expect(400)
        .expect("Content-Type", /text/, function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.error.text).to.equal("date_start must be an ISO8601 date");
          // callStatus = res.body.goodCall;
          // expect(callStatus).to.equal(true);
          // Done
          done();
        });
    });

    it("Should respond with 400 for invalid date_end", function(done) {
      request(server)
        .get("/hotels?date_end=notARealDate")
        .set("Content-Type", "application/json")
        .expect(400)
        .expect("Content-Type", /text/, function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.error.text).to.equal("date_end must be an ISO8601 date");
          // callStatus = res.body.goodCall;
          // expect(callStatus).to.equal(true);
          // Done
          done();
        });
    });

    it("Should respond with 400 for invalid lowestPrice", function(done) {
      request(server)
        .get("/hotels?lowestPrice=badPrice")
        .set("Content-Type", "application/json")
        .expect(400)
        .expect("Content-Type", /text/, function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.error.text).to.equal("lowestPrice must be numeric");
          // callStatus = res.body.goodCall;
          // expect(callStatus).to.equal(true);
          // Done
          done();
        });
    });

    it("Should respond with 400 for invalid highestPrice", function(done) {
      request(server)
        .get("/hotels?highestPrice=badPrice")
        .set("Content-Type", "application/json")
        .expect(400)
        .expect("Content-Type", /text/, function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.error.text).to.equal("highestPrice must be numeric");
          // callStatus = res.body.goodCall;
          // expect(callStatus).to.equal(true);
          // Done
          done();
        });
    });
  });
});
