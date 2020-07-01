const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class PersonaliseService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  //Returns a list of all the data
  async getList() {
    const data = await this.getData();
    return data;
  }

  //Reads the data in the text file and returns it
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    if (!data) return [];
    return JSON.parse(data);
  }

  //Takes the users short name and returns the users favourite service
  async getUsersFavouriteService(shortname) {
    const data = await this.getData();
    const user = data.users.find(user => {
      return user.shortname === "John_Doe";
    });

    if (!user || !user.mostviewedService) return null;
    return user.mostviewedService;
  }
}
module.exports = PersonaliseService; //Exports the service
