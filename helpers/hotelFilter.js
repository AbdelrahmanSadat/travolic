const find = require("lodash").find;
const appRoot = require("app-root-path");

const ciCompare = require(appRoot + "/helpers/ciCompare");

// @ filter: object with optional keys of name, city, date_start,
// @  date_end, lowestPrice, highestPrice where date_start and
// @  date_end are date objects and the rest are strings
// @ hotel: object with required keys name, city, date_start,
// @  date_end, price where date_start and date_end are ISO8601
// @  dates; and rest are strings
// * returns true if the hotel matches the filter
function hotelFilter(filter, hotel) {
  if (!filter || !hotel || find(hotel, value => value === undefined))
    throw Error("Input Invalid");

  // TODO?: use regex for case matching & better string matching or
  // TODO?: assume the query string to be properly capitalized

  if (
    (filter.name && !ciCompare(filter.name, hotel.name)) ||
    (filter.city && !ciCompare(filter.city, hotel.city)) ||
    (filter.lowestPrice && filter.lowestPrice > hotel.price) ||
    (filter.highestPrice && filter.highestPrice < hotel.price) ||
    (filter.date_start && new Date(filter.date_start) < new Date(hotel.date_start)) ||
    (filter.date_end && new Date(filter.date_end) > new Date(hotel.date_end))
  )
    return false;

  return true;
}


module.exports = hotelFilter;
