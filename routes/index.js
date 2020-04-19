var express = require('express');
var router = express.Router();

// ? consider using some sort of cache for the api requrest
// ? when fetchig all the hotels (e.g: redis???)

/* GET home page. */
router.get('/hotels', function (req, res, next) {
  // * Use query params for filtering and sorting criteria
  // ? price range & date??? (specify a format)
  // put the query params in their own object for convenience?

  
  // TODO: Validate the query params
  // respond with the appropriate code for invalid input

  // * Fetch all the hotels from their api endpoint

  // * Filter the hotels by the criteria in the query params
  // if filtering field is defined, check against it

  // * Sort the filterd values according to the given sort param
  // use lodash's sortBy?

  // TODO: try and optimize filtering and sorting

  // * Serialize to json and send in the response

  res.send("Helloooo");
});

module.exports = router;
