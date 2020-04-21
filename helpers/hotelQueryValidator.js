const validator = require("validator");

// * Validates the /hotels query parameters
// @ returns true if they're all valid and throws and err otherwise

function hotelQueryValidator(query) {
  if (query.date_start && !validator.isISO8601(query.date_start))
    throw new Error("date_start must be an ISO8601 date");

  if (query.date_end && !validator.isISO8601(query.date_end))
    throw new Error("date_end must be an ISO8601 date");

  if (query.lowestPrice && !validator.isNumeric(query.lowestPrice))
    throw new Error("lowestPrice must be numeric");

  if (query.highestPrice && !validator.isNumeric(query.highestPrice))
    throw new Error("highestPrice must be numeric");

  return true;
}

module.exports = hotelQueryValidator;
