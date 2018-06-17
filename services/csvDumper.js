var fs = require('fs');
const { exec } = require('child_process');
var path = require('path');
var async = require('async');
const consumptionModel = require('../models/consumption.model');
const siteModel = require('../models/site.model');
var db = require('../config/database.config');

var csvDumper = function() {

  this.dumpFolder = async function(pathToFolder) {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    let folderPath = path.resolve(__dirname, '../' + pathToFolder);
    var filenames = fs.readdirSync(folderPath);
    for (let file of filenames) {
      this.dumpFile(folderPath + "/" + file);
    }
  }

  this.dumpFile = function(pathToFile) {
    if(pathToFile.includes('sites')){
      exec('cd csv && mongoimport --db '+dbName+' --collection '+collectionName+
            ' --type csv --headerline --file '+fileName+'.csv', (err, stdout, stderr) => {
        if(err){
          console.log(err);
          return;
        }
      })
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  }
}

module.exports = csvDumper;
