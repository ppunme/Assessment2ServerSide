const express = require("express");
const router = express.Router();

module.exports = (param) => {
  const { feedbackService } = param;

  router.get("/", async (req, res, next) => {
    //Gets all of the feedback in the JSON file
    const feedbackList = await feedbackService.getList();
    try {
      //Renders the page and passes in the feedback data
      //success: req.query.success - Check if the form has been submitted successfully
      return res.render("feedback", {
        page: "Feedback",
        feedbackList,
        success: req.query.success,
      });
    } catch (err) {
      return err;
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const feedbackList = await feedbackService.getList(); //Pull in feedback data from JSON

      const fbName = req.body.fbName.trim();
      const fbTitle = req.body.fbTitle.trim();
      const fbMessage = req.body.fbMessage.trim();

      //If there is a validation error then it will reload the feedback page
      //Populate the fields that were filled in correctly
      if (!fbName || !fbTitle || !fbMessage) {
        return res.render("feedback", {
          page: "Feedback",
          error: true,
          fbName,
          fbTitle,
          fbMessage,
          feedbackList,
        });
      }
      //Call the addEntry function and write the data
      await feedbackService.addEntry(fbName, fbTitle, fbMessage);

      //Send the users to a page that indicates they have submitted successfully
      //Use a redirect
      return res.redirect("/feedback?success=true");
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
