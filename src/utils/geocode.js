const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmFhc2ltIiwiYSI6ImNrcmdpZzJsbzAzbDgycG81ZjlmYzF2MHMifQ.JdfGZlCNvR-b_RG4t0VzYw&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!body.features.length) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const {
        place_name: location,
        center: [longitude, latitude],
      } = body.features[0];
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
