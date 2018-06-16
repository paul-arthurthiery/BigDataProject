var fs = require('fs');
var csv = require('fast-csv');
var path = require('path');
var siteHeaders = ["site_id", "industry", "sub_industry", "square_feet", "latitude", "longitude", "timezone", "timezone_offset"];
var consumptionHeaders = ["timestamp", "dttm_utc", "value", "estimated", "anomaly"];
const consumptionModel = require('../models/consumption.model');
const siteModel = require('../models/site.model');

var csvDumper = function() {

  this.dumpFolder = function(pathToFolder) {
    let folderPath = path.resolve(__dirname, '../' + pathToFolder);
    fs.readdir(folderPath, (err, filenames) => {
      if (err) {
        console.log(err);
        return err;
      }
      filenames.forEach((file) => {
        this.dumpFile(folderPath +"/"+ file);
      });
    });
  }

  this.dumpFile = function(pathToFile) {
    var stream = fs.createReadStream(pathToFile);
    if (pathToFile.includes('sites')) {
      csv.fromStream(stream, {headers: siteHeaders, renameHeaders:true}).on("data", (data) => {
        try {
          siteModel.create(data);
        } catch (err){
          return err;
        }
      }).on("end", function() {
        console.log("done with file "+pathToFile);
      });
    } else {
       csv.fromStream(stream, {headers: consumptionHeaders, renameHeaders:true}).on("data", (data) => {
         try {
          consumptionModel.create(data);
         } catch (err) {
           return err;
         }
       }).on("end", function() {
         console.log("done with file "+pathToFile);
       });
    }
  }
}


module.exports = csvDumper;
