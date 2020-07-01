const express = require("express"); //import express
const path = require("path"); //Loads the node path module
const bodyParser = require("body-parser");

const createErrors = require("http-errors"); // This module parses JSON data that has been posted or sent to a endpoint.
const routes = require("./routes/routes"); //5. Loads routes module (Open Routes.js)
const configs = require("./config");

const ServiceService = require("./services/ServiceService"); //Loads the service services module
const FeedbackService = require("./services/FeedbackService"); //Loads the feedback services module
const PersonaliseService = require("./services/PersonaliseService"); //Loads the personalise services module

const app = express();
const config = configs[app.get("env")];

const serviceService = new ServiceService(config.data.services);
const feedbackService = new FeedbackService(config.data.feedback); //Creates a new services and passes in the url for the data from the config
const personaliseService = new PersonaliseService(config.data.users); //Creates a new services and passes in the url for the data from the config

app.set("view engine", "ejs"); //Defines the template engine we are using
if (app.get("env") === "development") {
  app.locals.pretty = true;
}

app.set("views", path.join(__dirname, "./views")); //The location on our views folder for out template engine

app.use(express.static("public")); // Creates routes for everything in our public folder

app.use(bodyParser.urlencoded({ extended: true }));

//Gets the service title for the menu
app.use(async (req, res, next) => {
  try {
    const title = await serviceService.getTitle();
    const name = await serviceService.getListShort();
    res.locals.serviceTitle = title;
    res.locals.serviceName = name;
    return next();
  } catch (err) {
    return next(err);
  }
});

//Loads routes
app.use(
  "/",
  routes({
    serviceService: serviceService,
    feedbackService: feedbackService,
    personaliseService: personaliseService,
  })
);

app.use("/", (req, res, next) => {
  return next(createErrors(404, "File not found"));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message; //Loads the error message into the response
  const status = err.status || 500; //Sets the error code in status
  res.locals.status = status; //loads the status into the response
  res.locals.error = req.app.get("env") === "development" ? err : {}; //Checks the env and if we are in development mode passes the error message
  res.status(status); //Sets status in response
  return res.render("error"); //renders the ejs error page
});

app.listen(3000);
module.export = app; //Exports the app instance
