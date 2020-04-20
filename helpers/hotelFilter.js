// @ filter: object with optional keys of name, city, date_start,
// @  date_end, lowestPrice, highestPrice where date_start and
// @  date_end are date objects and the rest are strings
// @ hotel: object with required keys name, city, date_start,
// @  date_end, price where date_start and date_end are ISO8601
// @  dates; and rest are strings
// * returns true if the hotel matches the filter
function hotelFilter(filter, hotel) {
  // TODO?: use regex for case matching & better string matching or
  // TODO?: assume the query string to be properly capitalized

  // TODO: refactor
  if (
    (filter.name
      ? filter.name.toLowerCase() === hotel.name.toLowerCase()
      : true) &&
    // TODO?: not required, just for testing, remove
    (filter.country
      ? filter.country.toLowerCase() === hotel.country.toLowerCase()
      : true) &&
    (filter.city
      ? filter.city.toLowerCase() === hotel.city.toLowerCase()
      : true) &&
    (filter.lowestPrice ? filter.lowestPrice <= hotel.price : true) &&
    (filter.highestPrice ? filter.highestPrice >= hotel.price : true) &&
    (filter.date_start? new Date(filter.date_start) >= new Date(hotel.date_start): true)&&
    (filter.date_end? new Date(filter.date_end) <= new Date(hotel.date_end): true)
  )
    return true;

  return false;
}

module.exports = hotelFilter;
