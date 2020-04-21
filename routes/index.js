const express = require("express");
const axios = require("axios");
const validator = require("validator");
const _ = require("lodash");
const appRoot = require("app-root-path");

let asyncMiddleware = require(appRoot + "/middleware/asyncMiddleware");
let hotelFilter = require(appRoot + "/helpers/hotelFilter");
let hotelQueryValidator = require(appRoot + "/helpers/hotelQueryValidator");

let router = express.Router();

router.get(
  "/hotels",
  asyncMiddleware(async function(req, res, next) {
    // * Use query params for filtering and sorting criteria
    // expects optional query string of name, city, date_start,
    // date_end, lowestPrice, highest price, & sortBy

    // * Validate the query params
    try {
      hotelQueryValidator(req.query);
    } catch (err) {
      return res.status(400).send(err.message);
    }

    // * Fetch all the hotels from their api endpoint
    let hotelsRes = await axios
      .get("http://fake-hotel-api.herokuapp.com/api/hotels")
      .catch(err =>
        res
          .status(424)
          .send("An error occured trying to reach the hotels endpoint")
      );
    let hotels = hotelsRes.data;

    // TODO?: see if any further error handling is needed

    // * Filter the hotels by the criteria from the query params
    let filteredHotels = hotels.filter(hotel => hotelFilter(req.query, hotel));

    // * Sort the filterd values according to the given sort param
    let sortedHotels = _.sortBy(filteredHotels, [req.query.sortBy]);

    // TODO: try and optimize filtering and sorting

    // * Serialize to json and send in the response
    res.json(sortedHotels);
  })
);

/* GET home page. */
router.get(
  "",
  asyncMiddleware(async function(req, res, next) {
    res.send("Hello :)");
  })
);

module.exports = router;
