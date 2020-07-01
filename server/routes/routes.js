const express = require("express"); 
const servicesRoute = require("./services");
const feedbackRoute = require("./feedback");
const router = express.Router(); // load the router from express

//Exports route function and allows a param to be passed into the route
module.exports = param => {
  const { serviceService } = param;
  const { personaliseService } = param;

  //Home page route
  router.get("/", async (req, res, next) => {
    const servicesList = await serviceService.getListShort();

    const usersFavouriteService = await personaliseService.getUsersFavouriteService(
      "John_Doe"
    );

    const favouriteServiceArtwork = await serviceService.getArtworkForService(
      usersFavouriteService
    );

    const short = await personaliseService.getUsersFavouriteService("John_Doe");

    return res.render("index", {
      page: "home",
      servicesList,
      usersFavouriteService,
      short,
      artwork: favouriteServiceArtwork
    });
  });

  //Passes the param containing the service class into the remaining routes
  router.use("/services", servicesRoute(param));
  router.use("/feedback", feedbackRoute(param));

  return router;
};
