const db = require('./db');
const config = require('../config');
const helper = require('../helper');
var request = require('request');
async function getSites() {
  const rows = await db.query(
    `SELECT * FROM group_ where site  = 1 and type_ = 1`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {};
  return {
    data,
    meta
  }
}
async function getContentStructures() {
  const rows = await db.query(
    `SELECT * FROM ddmstructure where classNameId = 20134 and groupid=${config.config().siteId}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {};
  return {
    data,
    meta
  }
}

async function getRootDocuments() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/documents?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64"),
      }
    };
    request(options, function (error, response) {
      if (error){
        reject(error)
      };
      resolve(JSON.parse(response.body));
    });
  });
}
module.exports = {
  getContentStructures,
  getRootDocuments,
  getSites
}
