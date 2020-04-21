// * Case insensitive comparison of two string
// @ returns true if they're the same & false / undefined otherwise
function ciCompare(a, b) {
  return a && b && a.toUpperCase() == b.toUpperCase();
}

// TODO?: add tests

module.exports = ciCompare;
