var axios = require('axios');
const dbConfig = require('../config/database.config.js');


exports.setSite = (site) => {
  axios.post('http://localhost:'+dbConfig.apiPort, site).then((res) => {
    console.log('added site without problem');
  }).catch((err) => {
    console.log(err);
    return err;
  })
}

exports.setConsumption = (consumption) => {
  axios.post('http://localhost:'+dbConfig.apiPort, consumption).then((res) => {
    console.log('added consumption without problem');
  }).catch((err) => {
    console.log(err);
    return err;
  })
}
