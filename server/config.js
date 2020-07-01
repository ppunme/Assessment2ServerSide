const path = require("path");
module.exports = {
  development: {
    sitename: "Beauty Venue",
    data: {
      speakers: path.join(__dirname, "data/services.json"),
      feedback: path.join(__dirname, "data/feedback.json"),
      users: path.join(__dirname, "data/users.json"),
    },
  },
  production: {
    sitename: "Beauty Venue",
    data: {
      speakers: path.join(__dirname, "data/services.json"),
      feedback: path.join(__dirname, "data/feedback.json"),
      users: path.join(__dirname, "data/users.json"),
    },
  },
};
