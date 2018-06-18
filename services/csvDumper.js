var fs = require('fs');
var csv = require('fast-csv');
var path = require('path');
var async = require('async');
var siteHeaders = [
  "siteId",
  "industry",
  "sub_industry",
  "square_feet",
  "latitude",
  "longitude",
  "timezone",
  "timezone_offset"
];
var consumptionHeaders = ["timestamp", "dttm_utc", "value", "estimated", "anomaly"];
const consumptionModel = require('../models/consumption.model');
const siteModel = require('../models/site.model');


var csvDumper = function() {

  this.dumpFolder = async function(pathToFolder) {
    let folderPath = path.resolve(__dirname, '../' + pathToFolder);
    var filenames = fs.readdirSync(folderPath);
    filenames.reverse();
    for (let file of filenames) {
      var insertedBatch = await this.dumpFile(folderPath + "/" + file, file);
      console.log('done with file '+file)
    }
  }

  this.dumpFile = function(pathToFile, filename) {
    var stream = fs.createReadStream(pathToFile);
    var batch = [];
    if (pathToFile.includes('sites')) {

      return new Promise((resolve, reject) => {
        console.log(pathToFile);

        csv.fromStream(stream, {
          headers: siteHeaders,
          renameHeaders: true
        }).on("data", (data) => {
          batch.push(data);
        }).on("end", async () => {
            await siteModel.insertMany(batch).then(() => {
               console.log("inserted "+pathToFile);
               return resolve(batch);
             }).catch((err) => {
               return reject(err);
             })
        });
      })

    } else {

      return new Promise((resolve, reject) => {
        console.log(pathToFile);
        let siteId = filename.slice(0, -4);
        csv.fromStream(stream, {
          headers: consumptionHeaders,
          renameHeaders: true
        }).on("data", (data) => {
          data.site = [{"siteId": siteId}];
          batch.push(data);
        }).on("end", async () => {
            await consumptionModel.insertMany(batch).then(() => {
               console.log("inserted "+pathToFile);
               return resolve(batch);
             }).catch((err) => {
               return reject(err);
            })
        });
      })
    }
  }
}

module.exports = csvDumper;
