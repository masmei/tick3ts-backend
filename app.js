// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the Tick3ts API");
});

// Profiles ROUTES
const profileController = require("./controllers/profileController.js");
app.use("/profiles", profileController);

//Events ROUTES
const eventController = require("./controllers/eventController");
app.use("/events", eventController);

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });


// EXPORT
module.exports = app;