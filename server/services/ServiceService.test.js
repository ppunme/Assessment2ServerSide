//Test getting a list of services
const ServiceService = require("./ServiceService");

const ss = new ServiceService();

test("Got a list of services", () => {
  ss.getList().then((service) => {
    expect({
      name: service.name,
      shortname: service.shortname,
      title: service.title,
      summary: service.summary,
    });
  });
});
