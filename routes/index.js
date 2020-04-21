const express = require("express");
const axios = require("axios");
const validator = require("validator");
const _ = require("lodash");
const appRoot = require("app-root-path");

let asyncMiddleware = require(appRoot + "/middleware/asyncMiddleware");
let hotelFilter = require(appRoot + "/helpers/hotelFilter");

let router = express.Router();

router.get(
  "/hotels",
  asyncMiddleware(async function(req, res, next) {
    // * Use query params for filtering and sorting criteria
    // expects optional query string of name, city, date_start,
    // date_end, lowestPrice, highest price, & sortBy

    // * Validate the query params
    // TODO: move to separate function
    if (req.query.date_start && !validator.isISO8601(req.query.date_start))
      return res.status(400).send("date_start must be an ISO8601 date");

    if (req.query.date_end && !validator.isISO8601(req.query.date_end))
      return res.status(400).send("date_end must be an ISO8601 date");

    if (req.query.lowestPrice && !validator.isNumeric(req.query.lowestPrice))
      return res.status(400).send("lowestPrice must be numeric");

    if (req.query.highestPrice && !validator.isNumeric(req.query.highestPrice))
      return res.status(400).send("highestPrice must be numeric");

    if (
      req.query.sortBy &&
      !(req.query.sortBy == "price" || req.query.sortBy == "name")
    )
      return res.status(400).send("sortBy must be one of 'price' or 'name'");

    // * Fetch all the hotels from their api endpoint
    let hotelsRes = await axios
      .get("http://fake-hotel-api.herokuapp.com/api/hotels")
      .catch(err =>
        res.status(424).send("An error occured trying to reach the hotels endpoint")
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
