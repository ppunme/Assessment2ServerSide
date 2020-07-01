const express = require("express");
const router = express.Router();

module.exports = param => {
  const { serviceService } = param;

  router.get("/", async (req, res, next) => {
    const servicesList = await serviceService.getList();
    const allArtwork = await serviceService.getAllArtwork();
    const short = await serviceService.getShortname();

    return res.render("services", {
      page: "All Services",
      servicesList,
      short,
      artwork: allArtwork
    });
  });

  router.get("/:name", async (req, res, next) => {
    try {
      const promises = [];

      promises.push(serviceService.getService(req.params.name));
      promises.push(serviceService.getArtworkForService(req.params.name));

      const result = await Promise.all(promises);

      //If the no data is returned
      if (!result[0]) {
        return next();
      }

      return res.render("servicesDetail", {
        page: req.params.name,
        service: result[0],
        artwork: result[1]
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
