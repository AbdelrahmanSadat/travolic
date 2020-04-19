// @ filter: object with optional keys of name, city, startDate,
// @  endDate, lowestPrice, highestPrice
// @ hotel: object with required keys name, city, date_start,
// @  date_end, price
// * returns true if the hotel matches the filter
function hotelFilter(filter, hotel) {
  // TODO?: use regex for case matching & better string matching or
  // TODO?: assume the query string to be properly capitalized or

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
    (filter.lowestPrice && filter.hightesPrice
      ? filter.lowestPrice < hotel.price &&
        filter.highestPrice > hotel.lowestPrice
      : true) &&
    (filter.startDate && filter.endDate
      ? filter.startDate > new Date(hotel.startDate) &&
        filter.endDate < new Date(hotel.endDate)
      : true)
  )
    return true;

  return false;
}

module.exports = hotelFilter;
