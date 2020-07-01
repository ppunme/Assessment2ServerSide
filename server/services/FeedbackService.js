const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FeedbackService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async addEntry(name, title, message) {
    //Load the current data
    const data = await this.getData();

    //Add new data to the array
    data.unshift({ name, title, message });

    //Write the data to the file
    return writeFile(this.datafile, JSON.stringify(data));
  }

  //Returns a JSON file with all the data for feedback
  async getList() {
    const data = await this.getData();
    return data;
  }

  //Reads the JSON file and returns the data
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = FeedbackService; 
