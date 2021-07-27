const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engines and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Naasim Shareef",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Naasim Shareef",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some very helpful text",
    name: "Naasim Shareef",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMessage: "Help article not found",
    name: "Naasim Shareef",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMessage: "Page not found",
    name: "Naasim Shareef",
  });
});

app.listen(port, () => {
  console.log("Server is up at port ", port);
});
