const request = require("request");

const forecast = (lng, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b03e65366563eb511cb56e44170cb56e&query=${lat},${lng}&units=m&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect ot weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions, humidity } =
        body.current;

      callback(
        undefined,
        `${weather_descriptions[0]}. The temperature is ${temperature}°C out. It feels like ${feelslike}°C. Humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
