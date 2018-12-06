const express = require("express");
const app = express();
// HOT RELOADING Node.js
const morgan = require("morgan");
// Body-Parser for Better Reading Request and Response
const bodyParser = require("body-parser");
// Custom Middleware
const validateUrl = require("./api/middlewares/validateUrl");

// API's Router
const productRoutes = require("./api/routes/products");
const authinticate = require("./api/routes/authenticate");

// MongoDB
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb://localhost:27017/atm_module`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB ..."))
  .catch(err => console.log("Couldn't connect to MongoDB ...", err));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());

// Allow CORS - Cross Origin Access Control
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, PUT, DELETE, PATCH, POST"
    );
    return res.status(200).json({});
  }
  next();
});

// Declared Routes.
app.use("/cards", productRoutes);
app.use("/", authinticate);

// All Undeclared Paths Should Go through this
app.use(validateUrl);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
