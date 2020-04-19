const express = require("express");
const axios = require("axios");
const _ = require("lodash");

let asyncMiddleware = require("../middleware/asyncMiddleware");
let hotelFilter = require("../helpers/hotelFilter");

let router = express.Router();

// TODO?: consider using some sort of cache for the api requrest
// ? when fetchig all the hotels (e.g: redis???)

// ? asynchrony in filtering and sorting to avoid blocking?

/* GET home page. */
router.get(
  "/hotels",
  asyncMiddleware(async function(req, res, next) {
    // * Use query params for filtering and sorting criteria
    
    // TODO: Validate the query params
    // respond with the appropriate code for invalid input
    // 
    let filter = req.query;
    if(filter.startDate)
      filter.startDate = new Date(req.query.startDate);
    if(filter.endDate)
      filter.endDate = new Date(req.query.endDate);


    // * Fetch all the hotels from their api endpoint
    let hotelsRes = await axios.get(
      "http://fake-hotel-api.herokuapp.com/api/hotels"
    );
    let hotels = hotelsRes.data;

    // * Filter the hotels by the criteria from the query params
    let filteredHotels = hotels.filter(hotel => hotelFilter(filter, hotel));

    // * Sort the filterd values according to the given sort param
    let sortedHotels = _.sortBy(filteredHotels, [req.query.sortBy])

    // TODO: try and optimize filtering and sorting

    // * Serialize to json and send in the response
    res.json(sortedHotels);
  })
);

module.exports = router;
