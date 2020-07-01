const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

class ServiceService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getData() {
    //const data = await readFile(this.datafile, "utf8");
    const data = await readFile(__dirname + "/../data/services.json", "utf8");
    if (!data) {
      return [];
    }
    return JSON.parse(data).services;
  }

  async getTitle() {
    const data = await this.getData();
    return data.map(service => {
      return {
        shortname: service.shortname,
        title: service.title
      };
    });
  }

  async getShortname() {
    const data = await this.getData();
    return data.map(service => {
      return {
        shortname: service.shortname
      };
    });
  }

  async getList() {
    const data = await this.getData();
    return data.map(service => {
      return {
        name: service.name,
        shortname: service.shortname,
        title: service.title,
        summary: service.summary
      };
    });
  }

  async getListShort() {
    const data = await this.getData();

    return data.map(service => {
      return {
        name: service.name,
        shortname: service.shortname,
        title: service.title
      };
    });
  }

  async getService(shortname) {
    const data = await this.getData();
    //Searches for a matching shortname
    const service = data.find(service => {
      return service.shortname === shortname;
    });
    if (!service) return null;
    return {
      title: service.title,
      name: service.name,
      shortname: service.shortname,
      description: service.description
    };
  }

  async getArtworkForService(shortname) {
    const data = await this.getData();
    const service = data.find(service => {
      return service.shortname === shortname;
    });

    if (!service || !service.artwork) return null; //no match was found
    return service.artwork;
  }

  async getAllArtwork() {
    const data = await this.getData();
    const artworks = data.map(service => {
      return service.artwork;
    });

    var allArtwork = [];

    artworks.forEach(function(element) {
      allArtwork.push(...element);
    });

    return allArtwork;
  }
}
module.exports = ServiceService;
