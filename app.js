const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
// const routes = require("./routes");
require("dotenv").config();

// routes and bodyparsers
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes.registerRoutes(app);

// health check
app.get("/health", (req, res) => {
  res.status(200).send("Redis project backend health check ....");
  console.log("\n\nRedis project backend live\n\n");
});

//root
app.get("/", (req, res) => {
  res.status(200).send("Redis order and client info api live");
});

module.exports = app;
