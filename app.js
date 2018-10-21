const express = require("express");
const app = express();
// HOT RELOADING Node.js
const morgan = require("morgan");
// Body-Parser for Better Reading Request and Response
const bodyParser = require("body-parser");

// API's Router
const productRoutes = require("./api/routes/products");

// MongoDB
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://" +
    process.env.MONGO_ATLAS_USERNAME +
    ":" +
    process.env.MONGO_ATLAS_PWD +
    "@mern-atm-shard-00-00-xgjmi.mongodb.net:27017,mern-atm-shard-00-01-xgjmi.mongodb.net:27017,mern-atm-shard-00-02-xgjmi.mongodb.net:27017/test?ssl=true&replicaSet=mern-atm-shard-0&authSource=admin&retryWrites=true",
  { useNewUrlParser: true }
);

// Morgan Middleware for request Logger.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
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

// Routes Which Should Handle Requests
app.use("/", productRoutes);

// All Undeclared Paths Should Go through this
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// module.exports.app = app;
module.exports = app;
