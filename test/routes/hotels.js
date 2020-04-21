const assert = require("assert");
const expect = require("chai").expect;
const request = require("supertest");
const appRoot = require("app-root-path");

// * Testing the route response
function hotelsRouteTests() {
  describe("Express Server", function() {
    let server;

    beforeEach(function(done) {
      delete require.cache[require.resolve(appRoot + "/bin/www")];
      server = require(appRoot + "/bin/www");
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

      it("Should send back a JSON object or 500 on hotels endpoint failure", function(done) {
        request(server)
          .get("/hotels?name=notARealName")
          .set("Content-Type", "application/json")
          .expect("Content-Type", /json|text/, function (err, res) {
            if (err) {
              return done(err);
            }
            if (res.status == 200 || res.status == 424)
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
            expect(res.error.text).to.equal(
              "date_start must be an ISO8601 date"
            );
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
}

module.exports = hotelsRouteTests;
